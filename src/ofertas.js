import { CURSOS, APOSTILAS } from './data.js';

// Faixas de nota (sugestão inicial: validar com a PreparaPro).
export function faixa(nota) {
  if (nota < 5) return { id: 'base', titulo: 'Vamos construir sua base.', primeiro: 'apostilas' };
  if (nota < 7.5) return { id: 'evolucao', titulo: 'Você está no caminho. Falta direção.', primeiro: 'apostilas' };
  return { id: 'avancado', titulo: 'Bom resultado. Agora é refinar.', primeiro: 'cursos' };
}

// Regras por tema: <50% apostila; 50-69% apostila (+ curso se for interesse); >=70% curso se for interesse.
// Na faixa "base", temas de interesse também ganham curso introdutório.
const gen = (tipo, t) => ({ nome: `[${tipo} de ${t}]`, desc: '[Descrição curta]' });

export function ofertas(porTema, interesses, faixaId) {
  const cursos = [];
  const apostilas = [];
  for (const { tema, pct } of porTema) {
    const interesse = interesses.includes(tema);
    if (pct < 50) {
      apostilas.push(tema);
      if (interesse && faixaId === 'base') cursos.push(tema);
    } else if (pct < 70) {
      apostilas.push(tema);
      if (interesse) cursos.push(tema);
    } else if (interesse) {
      cursos.push(tema);
    }
  }
  return {
    cursos: cursos.slice(0, 3).map((t) => CURSOS[t] || gen('Curso', t)),
    apostilas: apostilas.slice(0, 3).map((t) => APOSTILAS[t] || gen('Apostila', t)),
  };
}
