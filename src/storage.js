import { QUESTOES } from './data.js';

// PROTÓTIPO: simulados ficam no localStorage do navegador. Em produção, use um backend/banco.
const KEY = 'pp_simulados';

const padrao = () => [{
  id: 'exemplo',
  titulo: 'Simulado gratuito · Saúde',
  gratuito: true,
  questoes: QUESTOES.map(({ id, tema, enunciado, alternativas, correta }) => ({ id, tema, enunciado, alternativas, correta })),
  criadoEm: new Date().toISOString(),
}];

export function getSimulados() {
  try {
    const l = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(l) && l.length) return l;
  } catch { /* usa o padrão */ }
  return padrao();
}

const salvar = (l) => localStorage.setItem(KEY, JSON.stringify(l));

// O simulado marcado como gratuito é o que o usuário faz no teste grátis.
export const getSimuladoGratuito = () => {
  const l = getSimulados();
  return l.find((s) => s.gratuito) || l[0];
};

export function adicionarSimulado(s) {
  const l = getSimulados();
  const base = s.gratuito ? l.map((x) => ({ ...x, gratuito: false })) : l;
  salvar([...base, { ...s, id: crypto.randomUUID(), criadoEm: new Date().toISOString() }]);
}

export const definirGratuito = (id) => salvar(getSimulados().map((s) => ({ ...s, gratuito: s.id === id })));

export function excluirSimulado(id) {
  const l = getSimulados().filter((s) => s.id !== id);
  if (l.length && !l.some((s) => s.gratuito)) l[0] = { ...l[0], gratuito: true };
  salvar(l);
}
