// PROTÓTIPO: dados e credenciais ficam no front só para demonstração.
// Em produção, login e checagem de perfil precisam acontecer em um backend.

// Perfis que podem entrar agora. Para abrir aos alunos depois, basta incluir 'aluno'.
export const LOGIN_LIBERADO_PARA = ['admin'];

export const USUARIOS = [
  { email: 'admin@preparapro.com', senha: 'admin123', nome: 'Admin', role: 'admin', interesses: ['Anatomia', 'Farmacologia'] },
  { email: 'aluno@exemplo.com', senha: 'aluno123', nome: 'Aluno', role: 'aluno', interesses: ['Legislação SUS'] },
];

export const TEMAS = ['Anatomia', 'Legislação SUS', 'Farmacologia'];

// [tema, índice da alternativa correta]. Trocar pelos textos reais das questões assim que houverem exemplos.
export const QUESTOES = [
  ['Anatomia', 1], ['Anatomia', 3],
  ['Legislação SUS', 0], ['Legislação SUS', 2],
  ['Farmacologia', 4], ['Farmacologia', 1],
].map(([tema, correta], i) => ({
  id: i + 1,
  tema,
  correta,
  enunciado: `[Enunciado da questão ${i + 1}]`,
  alternativas: 'ABCDE'.split('').map((l) => `[Alternativa ${l}]`),
}));

const catalogo = (tipo) =>
  Object.fromEntries(TEMAS.map((t) => [t, { nome: `[${tipo} de ${t}]`, desc: '[Descrição curta]' }]));

export const CURSOS = catalogo('Curso');
export const APOSTILAS = catalogo('Apostila');
