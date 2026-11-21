// Extrai questões de um texto já lido do PDF (uma linha do PDF = uma linha de texto).
// Formato esperado: "1. Enunciado... a) ... b) ..." e, opcionalmente, "Gabarito" no final.
// É heurístico: por isso o admin sempre revisa o resultado antes de salvar.

const limpa = (s) => s.replace(/\s+/g, ' ').trim();
const LETRAS = 'ABCDE';
const norm = (l) => l.replace(/\d+/g, '#').replace(/\s+/g, ' ').trim();
const RE_Q = /^\s*(?:quest[ãa]o\s*)?(\d{1,3})\s*[.)\-–:]\s+/i;
const MARCA_ALT = /^\s*\(?[a-eA-E]\s*[).]\s/;

// Remove linhas que se repetem em metade das páginas (cabeçalho e rodapé).
export function limparPaginas(paginas) {
  const cont = new Map();
  paginas.forEach((ls) => new Set(ls.map(norm).filter(Boolean)).forEach((k) => cont.set(k, (cont.get(k) || 0) + 1)));
  const min = Math.max(3, Math.ceil(paginas.length / 2));
  return paginas.map((ls) => ls.filter((l) => (cont.get(norm(l)) || 0) < min)).flat().join('\n');
}

function extrairAlternativas(seg) {
  const achados = [...seg.matchAll(/(?:^|\s)\(?([a-eA-E])\s*[).](?=\s)/g)].map((m) => ({
    L: m[1].toUpperCase(), ini: m.index, fim: m.index + m[0].length,
  }));
  // Usa o último "A)" que tenha um "B)" depois (ignora "vitamina A." no enunciado).
  const iA = achados.map((x, i) => (x.L === 'A' ? i : -1)).filter((i) => i >= 0)
    .reverse().find((i) => achados.slice(i + 1).some((x) => x.L === 'B'));
  if (iA === undefined) return null;
  const apos = achados.slice(iA);
  const escolhidos = [];
  for (const L of LETRAS) {
    const x = apos.find((y) => y.L === L);
    if (!x) break;
    escolhidos.push(x);
  }
  if (escolhidos.length < 2) return null;
  // Em PDFs com 2 colunas a ordem no texto é a, d, b, e, c: o trecho vai até o próximo marcador, em qualquer ordem.
  const porPosicao = [...escolhidos].sort((p, q) => p.ini - q.ini);
  return {
    enunciado: limpa(seg.slice(0, porPosicao[0].ini)),
    alternativas: escolhidos.map((x) => {
      const prox = porPosicao[porPosicao.indexOf(x) + 1];
      return limpa(seg.slice(x.fim, prox ? prox.ini : seg.length));
    }),
  };
}

export function parseQuestoes(bruto) {
  let texto = bruto.replace(/\r/g, '').replace(/[ \t]+/g, ' ');

  // Gabarito: última ocorrência da palavra, lendo pares "número + letra".
  const gab = {};
  const gi = texto.toLowerCase().lastIndexOf('gabarito');
  if (gi > 0) {
    const achados = [...texto.slice(gi).matchAll(/(\d{1,3})\s*[-–:.)]?\s*\(?([A-Ea-e])\)?(?![a-zà-ú])/g)];
    if (achados.length >= 2) {
      texto = texto.slice(0, gi);
      for (const m of achados) gab[Number(m[1])] = m[2].toUpperCase();
    }
  }

  // Marcadores de questão (por linha): o número precisa crescer, o que descarta listas internas "1. 2. 3.".
  const linhas = texto.split('\n');
  const marcas = [];
  let ult = 0;
  linhas.forEach((l, i) => {
    const m = l.match(RE_Q);
    const n = m && Number(m[1]);
    if (m && n > ult && n <= ult + 5) { ult = n; marcas.push({ i, n, ini: m[0].length }); }
  });

  // Título de seção: linha curta, sem pontuação final, logo antes de uma questão. Vira o "tema".
  const titulo = (j) => {
    const t = linhas[j].trim();
    return t && t.length <= 80 && /^[A-ZÀ-Ú]/.test(t) && !/[.;:,?!]$/.test(t) && !RE_Q.test(t) && !MARCA_ALT.test(t) ? t : null;
  };

  const questoes = [];
  let ignoradas = 0;
  let tema = 'Geral';
  marcas.forEach((m, k) => {
    let j = m.i - 1;
    while (j >= 0 && !linhas[j].trim()) j -= 1;
    if (j > (marcas[k - 1]?.i ?? -1) && titulo(j)) tema = titulo(j);

    const fim = marcas[k + 1]?.i ?? linhas.length;
    let seg = [linhas[m.i].slice(m.ini), ...linhas.slice(m.i + 1, fim)].join('\n');
    // Remove o título da próxima seção, que aparece no fim deste trecho.
    const prox = marcas[k + 1];
    if (prox) {
      let q = prox.i - 1;
      while (q > m.i && !linhas[q].trim()) q -= 1;
      if (q > m.i && titulo(q)) seg = [linhas[m.i].slice(m.ini), ...linhas.slice(m.i + 1, q)].join('\n');
    }

    let letra = null;
    const inline = seg.match(/(?:gabarito|resposta)\s*:\s*\(?([A-Ea-e])\)?(?![a-zà-ú])/i);
    if (inline) { letra = inline[1].toUpperCase(); seg = seg.replace(inline[0], ' '); }

    const r = extrairAlternativas(seg);
    if (!r || !r.enunciado) { ignoradas += 1; return; }

    letra = letra || gab[m.n] || null;
    const c = letra ? LETRAS.indexOf(letra) : -1;
    questoes.push({
      id: questoes.length + 1,
      numero: m.n,
      tema: limpa(tema),
      enunciado: r.enunciado,
      alternativas: r.alternativas,
      correta: c >= 0 && c < r.alternativas.length ? c : null,
    });
  });

  return { questoes, ignoradas };
}
