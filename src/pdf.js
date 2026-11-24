import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { lerPdf } from './pdfCore.js';
import { limparPaginas } from './parser.js';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const criarCanvas = (width, height) => Object.assign(document.createElement('canvas'), { width, height });
const ler = async (arquivo, comImagens) =>
  lerPdf(pdfjs, new Uint8Array(await arquivo.arrayBuffer()), { criarCanvas, comImagens });

// Simulado: texto sem cabeçalho/rodapé repetidos + figuras recortadas (ligadas às questões pelo parser).
export async function lerPdfSimulado(arquivo) {
  const { paginas, imagens } = await ler(arquivo, true);
  return { texto: limparPaginas(paginas.map((p) => p.map((l) => l.t))), imagens };
}

// Apostila: linhas com o tamanho da fonte, usadas para achar títulos de capítulos.
export async function lerPdfApostila(arquivo) {
  return (await ler(arquivo, false)).paginas;
}
