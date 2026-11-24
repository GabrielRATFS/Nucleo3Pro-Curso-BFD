// Transforma as linhas de um PDF de apostila em seções (capítulos).
// Títulos = linhas curtas com fonte maior que a do corpo do texto. Sem títulos, divide por página.
const norm = (l) => l.replace(/\d+/g, '#').replace(/\s+/g, ' ').trim();
const junta = (a, b) => {
  if (!a) return b;
  if (/-$/.test(a) && /^[a-zà-ú]/.test(b)) return a.slice(0, -1) + b;
  return a + (/[.:;!?]$/.test(a) ? '\n' : ' ') + b;
};

export function parseApostila(paginas) {
  // Cabeçalho e rodapé: linhas que se repetem em metade das páginas.
  const cont = new Map();
  paginas.forEach((p) => new Set(p.map((l) => norm(l.t)).filter(Boolean)).forEach((k) => cont.set(k, (cont.get(k) || 0) + 1)));
  const min = Math.max(3, Math.ceil(paginas.length / 2));
  const linhas = paginas.flatMap((p, n) =>
    p.filter((l) => l.t.trim() && (cont.get(norm(l.t)) || 0) < min).map((l) => ({ h: l.h, t: l.t.replace(/\s+/g, ' ').trim(), pagina: n + 1 })));

  // Tamanho do corpo = tamanho de fonte que mais aparece (por quantidade de letras).
  const peso = new Map();
  linhas.forEach((l) => peso.set(Math.round(l.h), (peso.get(Math.round(l.h)) || 0) + l.t.length));
  const corpo = [...peso.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
  const ehTitulo = (l) => corpo > 0 && l.h >= corpo * 1.15 && l.t.length <= 100 && !/[.;,]$/.test(l.t);

  let secoes = [];
  let atual = null;
  let tituloAntes = false;
  for (const l of linhas) {
    if (ehTitulo(l)) {
      if (atual && tituloAntes && !atual.texto) atual.titulo += ` ${l.t}`; // título em duas linhas
      else { atual = { titulo: l.t, texto: '' }; secoes.push(atual); }
      tituloAntes = true;
    } else {
      if (!atual) { atual = { titulo: 'Introdução', texto: '' }; secoes.push(atual); }
      atual.texto = junta(atual.texto, l.t);
      tituloAntes = false;
    }
  }

  if (secoes.length < 2) {
    secoes = [];
    linhas.forEach((l) => {
      let s = secoes.find((x) => x.pagina === l.pagina);
      if (!s) { s = { titulo: `Página ${l.pagina}`, texto: '', pagina: l.pagina }; secoes.push(s); }
      s.texto = junta(s.texto, l.t);
    });
  }
  return { secoes: secoes.map((s, i) => ({ id: i + 1, titulo: s.titulo, texto: s.texto })), paginas: paginas.length };
}
