import { useRef, useState } from 'react';
import { lerPdfSimulado } from '../pdf.js';
import { parseQuestoes } from '../parser.js';
import { lerPlanilha, baixarModelo } from '../planilha.js';
import { sugerirGrupo } from '../grupos.js';
import { reduzirImagem } from '../imagens.js';
import { simulados } from '../storage.js';

let contador = 0;
const novoId = (p) => `${p}${Date.now()}-${(contador += 1)}`;
const vazia = () => ({ id: novoId('q'), grupoId: '', tema: '', enunciado: '', alternativas: ['', '', '', '', ''], correta: null, imagem: null });

// Converte questões salvas (grupo em texto) para o formato do editor (grupo por id, para poder renomear).
function paraEditor(questoes) {
  const grupos = [];
  const qs = questoes.map((q) => {
    const nome = (q.grupo || sugerirGrupo(q.tema || 'Geral')).trim();
    let g = grupos.find((x) => x.nome.toLowerCase() === nome.toLowerCase());
    if (!g) { g = { id: novoId('g'), nome }; grupos.push(g); }
    return { id: novoId('q'), grupoId: g.id, tema: q.tema ?? '', enunciado: q.enunciado, alternativas: q.alternativas, correta: q.correta, imagem: q.imagem ?? null };
  });
  return { grupos, qs };
}

export default function AdminSimulados() {
  const [lista, setLista] = useState(simulados.todos);
  const [etapa, setEtapa] = useState('lista'); // lista | upload | revisao
  const [editandoId, setEditandoId] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [grupos, setGrupos] = useState([]);
  const [qs, setQs] = useState([]);
  const [aviso, setAviso] = useState('');
  const [erro, setErro] = useState('');
  const [lendo, setLendo] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const input = useRef(null);

  const atualizar = () => setLista(simulados.todos());
  const abrirEditor = (t, gs, q, a = '', id = null) => {
    setTitulo(t); setGrupos(gs); setQs(q); setAviso(a); setErro(''); setEditandoId(id); setEtapa('revisao');
  };
  const abrirUpload = () => { setErro(''); setEditandoId(null); setEtapa('upload'); };
  const criarManual = () => abrirEditor('', [], [vazia()]);
  const editar = (s) => { const e = paraEditor(s.questoes); abrirEditor(s.titulo, e.grupos, e.qs, '', s.id); };

  async function processar(arquivo) {
    if (!arquivo) return;
    const ext = arquivo.name.split('.').pop().toLowerCase();
    if (!['pdf', 'csv', 'xlsx'].includes(ext)) return setErro('Envie um PDF, CSV ou XLSX.');
    setErro('');
    setLendo(true);
    try {
      let r;
      if (ext === 'pdf') {
        const { texto, imagens } = await lerPdfSimulado(arquivo);
        if (texto.replace(/\s/g, '').length < 50) throw new Error('Não encontrei texto selecionável. O PDF pode ser digitalizado (imagem).');
        r = parseQuestoes(texto, imagens);
      } else {
        r = await lerPlanilha(arquivo, ext);
      }
      if (!r.questoes.length) throw new Error('Não identifiquei questões no arquivo. Você pode criar as questões manualmente.');
      const semGab = r.questoes.filter((q) => q.correta === null).length;
      const comImg = r.questoes.filter((q) => q.imagem).length;
      const e = paraEditor(r.questoes);
      abrirEditor(
        arquivo.name.replace(/\.(pdf|csv|xlsx)$/i, ''), e.grupos, e.qs,
        `${r.questoes.length} questões encontradas.` +
        (comImg ? ` ${comImg} com imagem.` : '') +
        (semGab ? ` ${semGab} sem gabarito: marque a resposta correta.` : '') +
        (r.ignoradas ? ` ${r.ignoradas} trechos ignorados.` : '')
      );
    } catch (e) {
      setErro(e.message);
    } finally {
      setLendo(false);
    }
  }

  // Grupos de tema (tema geral)
  const addGrupo = () => setGrupos([...grupos, { id: novoId('g'), nome: '' }]);
  const renomear = (id, nome) => setGrupos(grupos.map((g) => (g.id === id ? { ...g, nome } : g)));
  function removerGrupo(g) {
    const usos = qs.filter((q) => q.grupoId === g.id).length;
    if (usos && !window.confirm(`${usos} questões usam "${g.nome || 'este tema'}". Remover mesmo assim?`)) return;
    setGrupos(grupos.filter((x) => x.id !== g.id));
    setQs(qs.map((q) => (q.grupoId === g.id ? { ...q, grupoId: '' } : q)));
  }

  // Questões
  const editarQ = (i, campo, valor) => setQs((atual) => atual.map((q, k) => (k === i ? { ...q, [campo]: valor } : q)));
  const editarAlt = (i, j, v) => setQs((atual) => atual.map((q, k) => (k === i ? { ...q, alternativas: q.alternativas.map((a, m) => (m === j ? v : a)) } : q)));
  async function anexarImagem(i, arquivo) {
    if (!arquivo) return;
    try { editarQ(i, 'imagem', await reduzirImagem(arquivo)); } catch (e) { setErro(e.message); }
  }

  function salvar() {
    if (!titulo.trim()) return setErro('Dê um título ao simulado.');
    if (!qs.length) return setErro('Adicione pelo menos uma questão.');
    const nomes = grupos.map((g) => g.nome.trim().toLowerCase()).filter(Boolean);
    if (new Set(nomes).size !== nomes.length) return setErro('Há dois temas gerais com o mesmo nome.');
    const prontas = [];
    for (let i = 0; i < qs.length; i += 1) {
      const q = qs[i];
      const g = grupos.find((x) => x.id === q.grupoId);
      const idx = q.alternativas.map((a, k) => (a.trim() ? k : -1)).filter((k) => k >= 0);
      if (!g || !g.nome.trim()) return setErro(`Questão ${i + 1}: escolha o tema geral.`);
      if (!q.enunciado.trim()) return setErro(`Questão ${i + 1}: falta o enunciado.`);
      if (idx.length < 2) return setErro(`Questão ${i + 1}: preencha pelo menos 2 alternativas.`);
      if (q.correta === null || !idx.includes(q.correta)) return setErro(`Questão ${i + 1}: marque a alternativa correta.`);
      prontas.push({
        id: i + 1,
        grupo: g.nome.trim(),
        tema: q.tema.trim() || g.nome.trim(),
        enunciado: q.enunciado.trim(),
        alternativas: idx.map((k) => q.alternativas[k].trim()),
        correta: idx.indexOf(q.correta),
        ...(q.imagem ? { imagem: q.imagem } : {}),
      });
    }
    try {
      simulados.salvar({ id: editandoId || undefined, titulo: titulo.trim(), questoes: prontas });
    } catch (e) {
      return setErro(e.message);
    }
    atualizar();
    setErro('');
    setEtapa('lista');
  }

  if (etapa === 'lista') {
    return (
      <>
        <div className="admin-topo">
          <div><h1>Simulados</h1><p>Todos os simulados são gratuitos; cada pessoa faz apenas 1.</p></div>
          <button className="btn" onClick={abrirUpload}>+ Novo simulado</button>
        </div>
        {!lista.length && <p className="meta">Nenhum simulado cadastrado.</p>}
        {lista.map((s) => (
          <div className="card item" key={s.id}>
            <div>
              <b>{s.titulo}</b>
              <div className="meta">{s.questoes.length} questões · {[...new Set(s.questoes.map((q) => q.grupo || q.tema))].join(', ')}</div>
            </div>
            <div className="item-acoes">
              <button className="link" onClick={() => editar(s)}>Editar</button>
              <button className="link" onClick={() => { if (window.confirm('Excluir este simulado?')) { simulados.excluir(s.id); atualizar(); } }}>Excluir</button>
            </div>
          </div>
        ))}
      </>
    );
  }

  const passos = (
    <ol className="passos">
      <li className={etapa === 'upload' ? 'ativo' : 'feito'}>1 · Enviar arquivo</li>
      <li className={etapa === 'revisao' ? 'ativo' : ''}>2 · Revisar e salvar</li>
    </ol>
  );

  if (etapa === 'upload') {
    return (
      <>
        <h1>Novo simulado</h1>
        {passos}
        <div
          key="drop"
          className={'drop' + (arrastando ? ' sobre' : '')}
          onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
          onDragLeave={() => setArrastando(false)}
          onDrop={(e) => { e.preventDefault(); setArrastando(false); processar(e.dataTransfer.files[0]); }}
        >
          <p><b>Arraste o PDF ou a planilha do simulado aqui</b></p>
          <p>ou</p>
          <button className="btn" onClick={() => input.current.click()} disabled={lendo}>{lendo ? 'Lendo o arquivo...' : 'Escolher arquivo'}</button>
          <input ref={input} type="file" accept=".pdf,.csv,.xlsx" hidden onChange={(e) => processar(e.target.files[0])} />
        </div>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <div className="card dica">
          <b>PDF:</b> funciona melhor com questões numeradas (1., 2. …), alternativas a) a e) e gabarito no final.
          As figuras são recortadas do PDF e ligadas às questões; confira na revisão. É lido no seu navegador, sem envio a servidor.
          PDFs digitalizados (imagem) não funcionam.
          <br /><b>Planilha (.csv ou .xlsx):</b> colunas tema, enunciado, A, B, C, D, E e correta (a letra certa).
        </div>
        <button className="link" onClick={baixarModelo}>Baixar modelo de planilha</button>
        <button className="link" onClick={criarManual}>Criar questões manualmente</button>
        <button className="link" onClick={() => { setErro(''); setEtapa('lista'); }}>Voltar</button>
      </>
    );
  }

  return (
    <>
      <h1>{editandoId ? 'Editar simulado' : 'Revisar simulado'}</h1>
      {!editandoId && passos}
      <div key="meta" className="card">
        <label className="rot" htmlFor="titulo">Título do simulado</label>
        <input id="titulo" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        {aviso && <p className="aviso-ok">{aviso}</p>}
      </div>

      <div className="card">
        <b>Grupos de tema</b>
        <p className="meta">Crie os temas gerais (ex.: Urgência e Emergência). Depois, em cada questão, escolha o tema geral e, se quiser, uma subcategoria.</p>
        {grupos.map((g) => (
          <div className="gt" key={g.id}>
            <input type="text" aria-label="Nome do tema geral" placeholder="Nome do tema geral" value={g.nome} onChange={(e) => renomear(g.id, e.target.value)} />
            <span className="meta">{qs.filter((q) => q.grupoId === g.id).length} questões</span>
            <button className="link" onClick={() => removerGrupo(g)}>Remover</button>
          </div>
        ))}
        <button className="btn btn-sec btn-peq" onClick={addGrupo}>+ Adicionar tema</button>
      </div>

      {qs.map((q, i) => (
        <div className="card q" key={q.id}>
          <div className="q-topo">
            <b>Questão {i + 1}</b>
            <button className="link" onClick={() => setQs(qs.filter((_, k) => k !== i))}>Excluir</button>
          </div>
          <label className="rot" htmlFor={`g-${q.id}`}>Tema geral</label>
          <select id={`g-${q.id}`} value={q.grupoId} onChange={(e) => editarQ(i, 'grupoId', e.target.value)}>
            <option value="">Selecione…</option>
            {grupos.filter((g) => g.nome.trim()).map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
          </select>
          {q.grupoId && (
            <>
              <label className="rot" htmlFor={`t-${q.id}`}>Subcategoria (opcional)</label>
              <input id={`t-${q.id}`} type="text" value={q.tema} onChange={(e) => editarQ(i, 'tema', e.target.value)} />
            </>
          )}
          <label className="rot" htmlFor={`e-${q.id}`}>Enunciado</label>
          <textarea id={`e-${q.id}`} rows={3} value={q.enunciado} onChange={(e) => editarQ(i, 'enunciado', e.target.value)} />
          <div className="img-bloco">
            {q.imagem && <img className="thumb-q" src={q.imagem} alt={`Figura da questão ${i + 1}`} />}
            <label className="btn btn-sec btn-peq btn-arq">
              {q.imagem ? 'Trocar imagem' : 'Adicionar imagem'}
              <input type="file" accept="image/*" hidden onChange={(e) => { anexarImagem(i, e.target.files[0]); e.target.value = ''; }} />
            </label>
            {q.imagem && <button className="link" onClick={() => editarQ(i, 'imagem', null)}>Remover imagem</button>}
          </div>
          {q.alternativas.map((a, j) => (
            <label className="alt" key={j}>
              <input type="radio" name={`c${q.id}`} aria-label={`Alternativa ${'ABCDE'[j]} é a correta`} checked={q.correta === j} onChange={() => editarQ(i, 'correta', j)} />
              <b>{'ABCDE'[j]}</b>
              <input type="text" aria-label={`Texto da alternativa ${'ABCDE'[j]}`} value={a} onChange={(e) => editarAlt(i, j, e.target.value)} />
            </label>
          ))}
          {q.correta === null && <small className="alerta">Marque a alternativa correta.</small>}
        </div>
      ))}

      {erro && <p className="erro" role="alert">{erro}</p>}
      <div className="rodape">
        <button className="btn btn-sec" onClick={() => { setErro(''); setEtapa('lista'); }}>Cancelar</button>
        <button className="btn btn-sec" onClick={() => setQs([...qs, vazia()])}>+ Adicionar questão</button>
        <button className="btn" onClick={salvar}>Salvar simulado</button>
      </div>
    </>
  );
}
