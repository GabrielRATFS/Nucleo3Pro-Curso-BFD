// Sugere um grupo para cada tema, por palavras-chave (ex.: todas as "Urgências" viram "Urgência e Emergência").
// Palavras com até 4 letras precisam ser iguais; as maiores só precisam começar assim.
// O admin pode trocar o grupo de qualquer tema na tela de revisão do simulado.
const sem = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const GRUPOS_PADRAO = [
  'Urgência e Emergência',
  'Saúde da Mulher e da Criança',
  'Doenças e Agravos',
  'Cuidados e Procedimentos',
  'Biossegurança e Controle de Infecção',
  'Gestão, Ética e Legislação',
];

const REGRAS = [
  [GRUPOS_PADRAO[0], ['urgenc', 'emergenc', 'sbv', 'sav', 'trauma']],
  [GRUPOS_PADRAO[1], ['mulher', 'crianc', 'gestant', 'obstetric', 'neonat', 'imuniz']],
  [GRUPOS_PADRAO[2], ['doenc', 'hipertens', 'diabet', 'tubercul', 'hansen', 'oncolog', 'ists', 'ist']],
  [GRUPOS_PADRAO[3], ['fundament', 'cirurg', 'ferida', 'curativ', 'medicament', 'hemoterap', 'intensiv', 'uti', 'sae', 'pe', 'diagnost']],
  [GRUPOS_PADRAO[4], ['biosseguran', 'iras', 'grss', 'cme', 'infecc', 'esteril']],
  [GRUPOS_PADRAO[5], ['seguranca', 'legisl', 'etica', 'codigo', 'administr', 'gestao', 'auditoria']],
];

// Sem regra que combine, o próprio tema vira um grupo (e aparece como linha simples).
export function sugerirGrupo(tema) {
  const palavras = sem(tema).split(/[^a-z0-9]+/).filter(Boolean);
  const achou = REGRAS.find(([, kws]) => kws.some((k) => palavras.some((p) => (k.length <= 4 ? p === k : p.startsWith(k)))));
  return achou ? achou[0] : tema;
}
