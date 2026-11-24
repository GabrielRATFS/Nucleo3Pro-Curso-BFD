import { QUESTOES } from './data.js';
import { sugerirGrupo } from './grupos.js';

// PROTÓTIPO: tudo fica no localStorage do navegador. Em produção, use um backend/banco.
const lerLista = (chave) => {
  try {
    const l = JSON.parse(localStorage.getItem(chave));
    return Array.isArray(l) ? l : null;
  } catch { return null; }
};

const gravar = (chave, lista) => {
  try { localStorage.setItem(chave, JSON.stringify(lista)); } catch {
    throw new Error('Não coube no armazenamento do navegador. Remova imagens ou reduza o conteúdo.');
  }
};

function colecao(chave, inicial = () => []) {
  const todos = () => lerLista(chave) ?? inicial();
  return {
    todos,
    obter: (id) => todos().find((x) => x.id === id),
    salvar(item) {
      const lista = todos();
      const agora = new Date().toISOString();
      const i = item.id ? lista.findIndex((x) => x.id === item.id) : -1;
      const novo = i >= 0
        ? { ...lista[i], ...item, atualizadoEm: agora }
        : { ...item, id: crypto.randomUUID(), criadoEm: agora };
      gravar(chave, i >= 0 ? lista.map((x, k) => (k === i ? novo : x)) : [...lista, novo]);
    },
    excluir: (id) => gravar(chave, todos().filter((x) => x.id !== id)),
  };
}

const exemplo = () => [{
  id: 'exemplo',
  titulo: 'Simulado de exemplo · Saúde',
  questoes: QUESTOES.map(({ id, tema, enunciado, alternativas, correta }) => ({
    id, tema, grupo: sugerirGrupo(tema), enunciado, alternativas, correta,
  })),
  criadoEm: new Date().toISOString(),
}];

// Todos os simulados são gratuitos, mas cada pessoa pode fazer só 1 (regra aplicada pelo resultado salvo).
export const simulados = colecao('pp_simulados', exemplo);
// Apostilas são conteúdo pago: ficam separadas e nunca entram no teste gratuito.
export const apostilas = colecao('pp_apostilas');
