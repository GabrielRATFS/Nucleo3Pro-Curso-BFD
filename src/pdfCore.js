// Leitura de PDF: linhas de texto (com posição e tamanho da fonte) e figuras recortadas da página.
// Recebe a biblioteca pdf.js e uma função criarCanvas para funcionar no navegador e em testes.
const mult = (m, n) => [
  m[0] * n[0] + m[1] * n[2], m[0] * n[1] + m[1] * n[3],
  m[2] * n[0] + m[3] * n[2], m[2] * n[1] + m[3] * n[3],
  m[4] * n[0] + m[5] * n[2] + n[4], m[4] * n[1] + m[5] * n[3] + n[5],
];

async function linhasDaPagina(pagina) {
  const { items } = await pagina.getTextContent();
  const linhas = [];
  let t = '';
  let y = 0;
  let h = 0;
  for (const it of items) {
    if (!t) { y = it.transform[5]; h = 0; }
    t += it.str;
    h = Math.max(h, Math.abs(it.transform[3]) || it.height || 0);
    if (it.hasEOL) { linhas.push({ t, y, h }); t = ''; } else t += ' ';
  }
  if (t.trim()) linhas.push({ t, y, h });
  return linhas;
}

// Acompanha a matriz de transformação do PDF para saber onde cada imagem é desenhada.
async function figuras(pdfjs, pagina) {
  const { OPS } = pdfjs;
  const ops = await pagina.getOperatorList();
  const [, vy0, , vy1] = pagina.view;
  let ctm = [1, 0, 0, 1, 0, 0];
  const pilha = [];
  const achadas = [];
  ops.fnArray.forEach((fn, i) => {
    if (fn === OPS.save) pilha.push(ctm);
    else if (fn === OPS.restore) ctm = pilha.pop() || ctm;
    else if (fn === OPS.transform) ctm = mult(ops.argsArray[i], ctm);
    else if (fn === OPS.paintImageXObject || fn === OPS.paintInlineImageXObject) {
      const xs = [0, 1].flatMap((u) => [0, 1].map((v) => ctm[0] * u + ctm[2] * v + ctm[4]));
      const ys = [0, 1].flatMap((u) => [0, 1].map((v) => ctm[1] * u + ctm[3] * v + ctm[5]));
      const r = { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
      const rel = ((r.y0 + r.y1) / 2 - vy0) / (vy1 - vy0);
      // Ignora ícones pequenos e a faixa do cabeçalho/rodapé (logo da editora, por exemplo).
      if (r.x1 - r.x0 >= 50 && r.y1 - r.y0 >= 30 && rel > 0.06 && rel < 0.92) achadas.push(r);
    }
  });
  return achadas;
}

export async function lerPdf(pdfjs, dados, { criarCanvas, comImagens = true }) {
  const pdf = await pdfjs.getDocument({ data: dados, verbosity: 0 }).promise;
  const paginas = [];
  const candidatas = [];
  for (let n = 1; n <= pdf.numPages; n += 1) {
    const pg = await pdf.getPage(n);
    paginas.push(await linhasDaPagina(pg));
    candidatas.push(comImagens ? await figuras(pdfjs, pg) : []);
  }

  // Figuras na mesma posição em metade das páginas (logo, fundo) são descartadas.
  const chave = (r) => [r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0].map(Math.round).join(',');
  const cont = new Map();
  candidatas.forEach((rs) => new Set(rs.map(chave)).forEach((k) => cont.set(k, (cont.get(k) || 0) + 1)));
  const min = Math.max(3, Math.ceil(pdf.numPages / 2));

  const imagens = [];
  for (let n = 0; n < paginas.length; n += 1) {
    const rs = candidatas[n].filter((r) => cont.get(chave(r)) < min).sort((a, b) => b.y0 + b.y1 - (a.y0 + a.y1));
    if (!rs.length) continue;
    const pg = await pdf.getPage(n + 1);
    const vp = pg.getViewport({ scale: 2 });
    const tela = criarCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
    await pg.render({ canvasContext: tela.getContext('2d'), viewport: vp }).promise;
    for (const r of rs) {
      const t = vp.transform; // PDF -> pixels da página renderizada
      const ponto = (px, py) => [t[0] * px + t[2] * py + t[4], t[1] * px + t[3] * py + t[5]];
      const [ax, ay] = ponto(r.x0, r.y0);
      const [bx, by] = ponto(r.x1, r.y1);
      const x = Math.max(0, Math.min(ax, bx) - 4);
      const y = Math.max(0, Math.min(ay, by) - 4);
      const w = Math.min(tela.width - x, Math.abs(bx - ax) + 8);
      const h = Math.min(tela.height - y, Math.abs(by - ay) + 8);
      const dw = Math.round(Math.min(w, 900));
      const c = criarCanvas(dw, Math.round((h * dw) / w));
      c.getContext('2d').drawImage(tela, x, y, w, h, 0, 0, c.width, c.height);
      // O marcador entra no texto na altura da figura; o parser liga a figura à questão daquele trecho.
      const cy = (r.y0 + r.y1) / 2;
      // (a ordem do PDF nem sempre é de cima para baixo: usa a linha mais próxima acima da figura)
      let pos = -1;
      let dist = Infinity;
      paginas[n].forEach((l, i) => {
        if (l.y >= cy && l.y - cy < dist && !l.t.includes('\u0002')) { dist = l.y - cy; pos = i; }
      });
      paginas[n].splice(pos + 1, 0, { t: `\u0002${imagens.length}\u0002`, y: cy, h: 0 });
      imagens.push(c.toDataURL('image/jpeg', 0.85));
    }
  }
  return { paginas, imagens };
}
