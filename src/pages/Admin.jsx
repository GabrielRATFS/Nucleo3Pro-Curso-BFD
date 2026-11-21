import { useRef, useState } from 'react';
import { lerTextoPdf } from '../pdf.js';
import { parseQuestoes } from '../parser.js';
import { lerPlanilha, baixarModelo } from '../planilha.js';
import { GRUPOS_PADRAO, sugerirGrupo } from '../grupos.js';
import { getSimulados, adicionarSimulado, definirGratuito, excluirSimulado } from '../storage.js';
import '../admin.css';

const vazia = (id) => ({ id, tema: 'Geral', enunciado: '', alternativas: ['', '', '', '', ''], correta: null });

export default function Admin() {
  const [lista, setLista] = useState(getSimulados);
  const [etapa, setEtapa] = useState('lista'); // lista | upload | revisao
  const [meta, setMeta] = useState({ titulo: '', gratuito: false });
  const [qs, setQs] = useState([]);
  const [aviso, setAviso] = useState('');
  const [erro, setErro] = useState('');
  const [lendo, setLendo] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const input = useRef(null);
  const temas = [...new Set(qs.map((q) => q.tema).filter(Boolean))];

  const grupoDoTema = (t) => qs.find((q) => q.tema === t)?.grupo ?? sugerirGrupo(t);
  const setGrupoTema = (t, g) => setQs(qs.map((q) => (q.tema === t ? { ...q, grupo: g } : q)));
  const atualizar = () => setLista(getSimulados());
  const abrirUpload = () => { setErro(''); setAviso(''); setEtapa('upload'); };
  const criarManual = () => { setQs([vazia(1)]); setMeta({ titulo: '', gratuito: false }); setAviso(''); setErro(''); setEtapa('revisao'); };

  async function processar(arquivo) {
    if (!arquivo) return;
    const ext = arquivo.name.split('.').pop().toLowerCase();
    if (!['pdf', 'csv', 'xlsx'].includes(ext)) return setErro('Envie um PDF, CSV ou XLSX.');
    setErro('');
    setLendo(true);
    try {
      let r;
      if (ext === 'pdf') {
        const texto = await lerTextoPdf(arquivo);
        if (texto.replace(/\s/g, '').length < 50) throw new Error('Não encontrei texto selecionável. O PDF pode ser digitalizado (imagem).');
        r = parseQuestoes(texto);
      } else {
        r = await lerPlanilha(arquivo, ext);
      }
      if (!r.questoes.length) throw new Error('Não identifiquei questões no arquivo. Você pode criar as questões manualmente.');
      const semGab = r.questoes.filter((q) => q.correta === null).length;
      setQs(r.questoes.map((q) => ({ ...q, grupo: sugerirGrupo(q.tema) })));
      setMeta({ titulo: arquivo.name.replace(/\.(pdf|csv|xlsx)$/i, ''), gratuito: false });
      setAviso(
        `${r.questoes.length} questões encontradas.` +
        (semGab ? ` ${semGab} sem gabarito: marque a resposta correta.` : '') +
        (r.ignoradas ? ` ${r.ignoradas} trechos ignorados.` : '')
      );
      setEtapa('revisao');
    } catch (e) {
      setErro(e.message);
    } finally {
      setLendo(false);
    }
  }

  const editarQ = (i, campo, valor) => setQs(qs.map((q, k) => (k === i ? { ...q, [campo]: valor } : q)));
  const editarAlt = (i, j, v) => editarQ(i, 'alternativas', qs[i].alternativas.map((a, k) => (k === j ? v : a)));

  function salvar() {
    if (!meta.titulo.trim()) return setErro('Dê um título ao simulado.');
    const prontas = [];
    for (let i = 0; i < qs.length; i += 1) {
      const q = qs[i];
      const idx = q.alternativas.map((a, k) => (a.trim() ? k : -1)).filter((k) => k >= 0);
      if (!q.enunciado.trim()) return setErro(`Questão ${i + 1}: falta o enunciado.`);
      if (idx.length < 2) return setErro(`Questão ${i + 1}: preencha pelo menos 2 alternativas.`);
      if (q.correta === null || !idx.includes(q.correta)) return setErro(`Questão ${i + 1}: marque a alternativa correta.`);
      prontas.push({
        id: i + 1,
        tema: q.tema.trim() || 'Geral',
        grupo: q.grupo?.trim() || sugerirGrupo(q.tema.trim() || 'Geral'),
        enunciado: q.enunciado.trim(),
        alternativas: idx.map((k) => q.alternativas[k].trim()),
        correta: idx.indexOf(q.correta),
      });
    }
    if (!prontas.length) return setErro('Adicione pelo menos uma questão.');
    adicionarSimulado({ titulo: meta.titulo.trim(), gratuito: meta.gratuito, questoes: prontas });
    atualizar();
    setErro('');
    setEtapa('lista');
  }

  if (etapa === 'lista') {
    return (
      <div className="admin">
        <div className="admin-topo">
          <div><h1>Simulados</h1><p>Gerencie os simulados do site.</p></div>
          <button className="btn" onClick={abrirUpload}>+ Novo simulado</button>
        </div>
        {lista.map((s) => (
          <div className="card item" key={s.id}>
            <div>
              <b>{s.titulo}</b>
              <div className="meta">{s.questoes.length} questões · {[...new Set(s.questoes.map((q) => q.tema))].join(', ')}</div>
            </div>
            <div className="item-acoes">
              {s.gratuito
                ? <span className="badge">Teste gratuito</span>
                : <button className="link" onClick={() => { definirGratuito(s.id); atualizar(); }}>Definir como gratuito</button>}
              <button className="link" onClick={() => { if (window.confirm('Excluir este simulado?')) { excluirSimulado(s.id); atualizar(); } }}>Excluir</button>
            </div>
          </div>
        ))}
        <p className="meta">O simulado marcado como gratuito é o que o usuário faz no teste grátis.</p>
      </div>
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
      <div className="admin">
        <h1>Novo simulado</h1>
        {passos}
        <div
          className={'drop' + (arrastando ? ' sobre' : '')}
          onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
          onDragLeave={() => setArrastando(false)}
          onDrop={(e) => { e.preventDefault(); setArrastando(false); processar(e.dataTransfer.files[0]); }}
        >
          <p><b>Arraste o PDF ou a planilha do simulado aqui</b></p>
          <p>ou</p>
          <button className="btn" onClick={() => input.current.click()} disabled={lendo}>{lendo ? 'Lendo o PDF...' : 'Escolher arquivo'}</button>
          <input ref={input} type="file" accept=".pdf,.csv,.xlsx" hidden onChange={(e) => processar(e.target.files[0])} />
        </div>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <div className="card dica">
          <b>PDF:</b> funciona melhor com questões numeradas (1., 2. …), alternativas a) a e) e gabarito no final.
          É lido no seu navegador, sem envio a servidor. PDFs digitalizados (imagem) não funcionam.
          <br /><b>Planilha (.csv ou .xlsx):</b> colunas tema, enunciado, A, B, C, D, E e correta (a letra certa).
        </div>
        <button className="link" onClick={baixarModelo}>Baixar modelo de planilha</button>
        <button className="link" onClick={criarManual}>Criar questões manualmente</button>
        <button className="link" onClick={() => { setErro(''); setEtapa('lista'); }}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="admin">
      <h1>Revisar simulado</h1>
      {passos}
      <div className="card">
        <label htmlFor="titulo">Título do simulado</label>
        <input id="titulo" type="text" value={meta.titulo} onChange={(e) => setMeta({ ...meta, titulo: e.target.value })} />
        <label className="check">
          <input type="checkbox" checked={meta.gratuito} onChange={(e) => setMeta({ ...meta, gratuito: e.target.checked })} />
          Usar como teste gratuito
        </label>
        {aviso && <p className="aviso-ok">{aviso}</p>}
        <p className="meta">Confira cada questão e marque o círculo da alternativa correta.</p>
      </div>
      <div className="card">
        <b>Grupos dos temas</b>
        <p className="meta">Agrupe temas parecidos. No resultado, cada grupo aparece recolhido e o aluno abre o que quiser.</p>
        {temas.map((t) => (
          <label className="gt" key={t}>
            <span>{t}</span>
            <input type="text" list="grupos" aria-label={`Grupo de ${t}`} value={grupoDoTema(t)} onChange={(e) => setGrupoTema(t, e.target.value)} />
          </label>
        ))}
        <datalist id="grupos">{[...new Set([...GRUPOS_PADRAO, ...qs.map((q) => q.grupo).filter(Boolean)])].map((g) => <option key={g} value={g} />)}</datalist>
      </div>
      <datalist id="temas">{temas.map((t) => <option key={t} value={t} />)}</datalist>
      {qs.map((q, i) => (
        <div className="card q" key={q.id}>
          <div className="q-topo">
            <b>Questão {i + 1}</b>
            <input list="temas" className="tema" aria-label="Tema" placeholder="Tema" value={q.tema} onChange={(e) => editarQ(i, 'tema', e.target.value)} />
            <button className="link" onClick={() => setQs(qs.filter((_, k) => k !== i))}>Excluir</button>
          </div>
          <textarea rows={3} aria-label="Enunciado" value={q.enunciado} onChange={(e) => editarQ(i, 'enunciado', e.target.value)} />
          {q.alternativas.map((a, j) => (
            <label className="alt" key={j}>
              <input type="radio" name={`c${q.id}`} checked={q.correta === j} onChange={() => editarQ(i, 'correta', j)} />
              <b>{'ABCDE'[j]}</b>
              <input type="text" value={a} onChange={(e) => editarAlt(i, j, e.target.value)} />
            </label>
          ))}
          {q.correta === null && <small className="alerta">Marque a alternativa correta.</small>}
        </div>
      ))}
      {erro && <p className="erro" role="alert">{erro}</p>}
      <div className="rodape">
        <button className="btn btn-sec" onClick={() => { setErro(''); setEtapa('lista'); }}>Cancelar</button>
        <button className="btn btn-sec" onClick={() => setQs([...qs, vazia(Date.now())])}>+ Adicionar questão</button>
        <button className="btn" onClick={salvar}>Salvar simulado</button>
      </div>
    </div>
  );
}
