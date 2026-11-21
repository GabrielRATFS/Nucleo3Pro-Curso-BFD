import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { limparPaginas } from './parser.js';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

// Lê o texto selecionável do PDF no navegador (nada é enviado a servidor).
// Mantém uma linha por linha do PDF e remove cabeçalhos/rodapés repetidos.
export async function lerTextoPdf(arquivo) {
  const pdf = await pdfjs.getDocument({ data: await arquivo.arrayBuffer() }).promise;
  const paginas = [];
  for (let p = 1; p <= pdf.numPages; p += 1) {
    const conteudo = await (await pdf.getPage(p)).getTextContent();
    const linhas = [];
    let atual = '';
    for (const it of conteudo.items) {
      atual += it.str;
      if (it.hasEOL) { linhas.push(atual); atual = ''; } else atual += ' ';
    }
    if (atual.trim()) linhas.push(atual);
    paginas.push(linhas);
  }
  return limparPaginas(paginas);
}
