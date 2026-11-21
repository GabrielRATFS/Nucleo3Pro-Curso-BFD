import Papa from 'papaparse';
import { readSheet } from 'read-excel-file/browser';

// Colunas aceitas (sem acento e sem diferenciar maiúsculas): tema, enunciado, A a E e correta.
const sem = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const NOMES = {
  tema: ['tema', 'disciplina', 'assunto', 'materia'],
  enunciado: ['enunciado', 'pergunta', 'questao'],
  correta: ['correta', 'gabarito', 'resposta'],
};
const cel = (v) => String(v ?? '').trim();

// Converte linhas (cabeçalho + dados) em questões. Separada da leitura do arquivo para ser testável.
export function converterLinhas(linhas) {
  const cab = (linhas[0] || []).map(sem);
  const iTema = cab.findIndex((c) => NOMES.tema.includes(c));
  const iEnun = cab.findIndex((c) => NOMES.enunciado.includes(c));
  const iCorr = cab.findIndex((c) => NOMES.correta.includes(c));
  const iAlts = [...'abcde'].map((L) => cab.findIndex((c) => new RegExp(`^(?:alternativa |alt |opcao )?${L}$`).test(c)));
  if (iEnun < 0 || iAlts[0] < 0 || iAlts[1] < 0) {
    throw new Error('Não encontrei as colunas obrigatórias: enunciado, A e B. Baixe o modelo para ver o formato.');
  }
  const alts = iAlts.filter((i) => i >= 0);

  const questoes = [];
  let ignoradas = 0;
  linhas.slice(1).forEach((l) => {
    if (!l.some((c) => cel(c))) return; // linha em branco
    const enunciado = cel(l[iEnun]);
    const alternativas = alts.map((i) => cel(l[i]));
    if (!enunciado || alternativas.filter(Boolean).length < 2) { ignoradas += 1; return; }
    const c = 'ABCDE'.indexOf(cel(iCorr >= 0 ? l[iCorr] : '').toUpperCase().charAt(0));
    questoes.push({
      id: questoes.length + 1,
      tema: (iTema >= 0 && cel(l[iTema])) || 'Geral',
      enunciado,
      alternativas,
      correta: c >= 0 && c < alternativas.length ? c : null,
    });
  });
  return { questoes, ignoradas };
}

// CSV do Excel em português costuma vir em Windows-1252: tenta UTF-8 e, se falhar, usa esse.
async function lerCsv(arquivo) {
  const buf = await arquivo.arrayBuffer();
  let texto;
  try { texto = new TextDecoder('utf-8', { fatal: true }).decode(buf); } catch { texto = new TextDecoder('windows-1252').decode(buf); }
  return Papa.parse(texto, { skipEmptyLines: true }).data; // detecta ; ou , sozinho
}

export async function lerPlanilha(arquivo, ext) {
  return converterLinhas(ext === 'xlsx' ? await readSheet(arquivo) : await lerCsv(arquivo));
}

export function baixarModelo() {
  const csv = 'tema;enunciado;A;B;C;D;E;correta\nAnatomia;Qual osso forma o braço?;Fêmur;Úmero;Tíbia;Rádio;Ulna;B\n';
  const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'modelo-simulado.csv' });
  a.click();
  URL.revokeObjectURL(url);
}
