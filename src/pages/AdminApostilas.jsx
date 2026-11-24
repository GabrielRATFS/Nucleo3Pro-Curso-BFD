import { useRef, useState } from 'react';
import { lerPdfApostila } from '../pdf.js';
import { parseApostila } from '../apostila.js';
import { apostilas } from '../storage.js';

let contador = 0;
const secaoVazia = () => ({ id: `s${Date.now()}-${(contador += 1)}`, titulo: '', texto: '' });
const moeda = (v) => (v == null ? 'sem preço' : v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

export default function AdminApostilas() {
  const [lista, setLista] = useState(apostilas.todos);
  const [etapa, setEtapa] = useState('lista'); // lista | upload | revisao
  const [editandoId, setEditandoId] = useState(null);
  const [meta, setMeta] = useState({ titulo: '', tema: '', preco: '', paginas: null });
  const [secoes, setSecoes] = useState([]);
  const [aviso, setAviso] = useState('');
  const [erro, setErro] = useState('');
  const [lendo, setLendo] = useState(false);
  const [arrastando, setArrastando] = useState(false);
  const input = useRef(null);

  const atualizar = () => setLista(apostilas.todos());
  const abrirEditor = (m, s, a = '', id = null) => { setMeta(m); setSecoes(s); setAviso(a); setErro(''); setEditandoId(id); setEtapa('revisao'); };
  const criarManual = () => abrirEditor({ titulo: '', tema: '', preco: '', paginas: null }, [secaoVazia()]);
  const editar = (a) => abrirEditor(
    { titulo: a.titulo, tema: a.tema || '', preco: a.preco ?? '', paginas: a.paginas ?? null },
    a.secoes.map((s) => ({ ...s, id: `s${s.id}-${(contador += 1)}` })), '', a.id
  );

  async function processar(arquivo) {
    if (!arquivo) return;
    if (!arquivo.name.toLowerCase().endsWith('.pdf')) return setErro('Envie um arquivo PDF.');
    setErro('');
    setLendo(true);
    try {
      const paginas = await lerPdfApostila(arquivo);
      if (paginas.flat().map((l) => l.t).join('').replace(/\s/g, '').length < 50) throw new Error('Não encontrei texto selecionável. O PDF pode ser digitalizado (imagem).');
      const r = parseApostila(paginas);
      abrirEditor(
        { titulo: arquivo.name.replace(/\.pdf$/i, ''), tema: '', preco: '', paginas: r.paginas },
        r.secoes.map((s) => ({ ...s, id: `s${s.id}-${(contador += 1)}` })),
        `${r.secoes.length} seções encontradas em ${r.paginas} páginas. Confira os títulos e una ou exclua o que ficou errado.`
      );
    } catch (e) {
      setErro(e.message);
    } finally {
      setLendo(false);
    }
  }

  const editarS = (i, campo, v) => setSecoes((atual) => atual.map((s, k) => (k === i ? { ...s, [campo]: v } : s)));
  const unir = (i) => setSecoes((atual) => {
    const prev = atual[i - 1];
    const cur = atual[i];
    const texto = [prev.texto, cur.titulo, cur.texto].filter(Boolean).join('\n');
    return [...atual.slice(0, i - 1), { ...prev, texto }, ...atual.slice(i + 1)];
  });

  function salvar() {
    if (!meta.titulo.trim()) return setErro('Dê um título à apostila.');
    if (!secoes.length) return setErro('Adicione pelo menos uma seção.');
    const preco = meta.preco === '' ? null : Number(meta.preco);
    if (preco !== null && (Number.isNaN(preco) || preco < 0)) return setErro('Preço inválido.');
    for (let i = 0; i < secoes.length; i += 1) {
      if (!secoes[i].titulo.trim()) return setErro(`Seção ${i + 1}: falta o título.`);
      if (!secoes[i].texto.trim()) return setErro(`Seção ${i + 1}: falta o texto.`);
    }
    try {
      apostilas.salvar({
        id: editandoId || undefined,
        titulo: meta.titulo.trim(),
        tema: meta.tema.trim(),
        preco,
        paginas: meta.paginas,
        acesso: 'pago',
        secoes: secoes.map((s, i) => ({ id: i + 1, titulo: s.titulo.trim(), texto: s.texto.trim() })),
      });
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
          <div><h1>Apostilas</h1><p>Conteúdo pago: fica fora do teste gratuito.</p></div>
          <button className="btn" onClick={() => { setErro(''); setEtapa('upload'); }}>+ Nova apostila</button>
        </div>
        {!lista.length && <p className="meta">Nenhuma apostila cadastrada.</p>}
        {lista.map((a) => (
          <div className="card item" key={a.id}>
            <div>
              <b>{a.titulo}</b> <span className="badge">Conteúdo pago</span>
              <div className="meta">{a.secoes.length} seções · {a.paginas ?? '?'} páginas · {a.tema || 'sem tema'} · {moeda(a.preco)}</div>
            </div>
            <div className="item-acoes">
              <button className="link" onClick={() => editar(a)}>Editar</button>
              <button className="link" onClick={() => { if (window.confirm('Excluir esta apostila?')) { apostilas.excluir(a.id); atualizar(); } }}>Excluir</button>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (etapa === 'upload') {
    return (
      <>
        <h1>Nova apostila</h1>
        <div
          key="drop"
          className={'drop' + (arrastando ? ' sobre' : '')}
          onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
          onDragLeave={() => setArrastando(false)}
          onDrop={(e) => { e.preventDefault(); setArrastando(false); processar(e.dataTransfer.files[0]); }}
        >
          <p><b>Arraste o PDF da apostila aqui</b></p>
          <p>ou</p>
          <button className="btn" onClick={() => input.current.click()} disabled={lendo}>{lendo ? 'Lendo o PDF...' : 'Escolher arquivo'}</button>
          <input ref={input} type="file" accept=".pdf" hidden onChange={(e) => processar(e.target.files[0])} />
        </div>
        {erro && <p className="erro" role="alert">{erro}</p>}
        <div className="card dica">
          O PDF é dividido em seções pelos títulos (texto maior que o do corpo). Sem títulos, a divisão é por página.
          É lido no seu navegador, sem envio a servidor. Figuras e tabelas ainda não são extraídas.
        </div>
        <button className="link" onClick={criarManual}>Criar apostila manualmente</button>
        <button className="link" onClick={() => { setErro(''); setEtapa('lista'); }}>Voltar</button>
      </>
    );
  }

  return (
    <>
      <h1>{editandoId ? 'Editar apostila' : 'Revisar apostila'}</h1>
      <div key="meta" className="card">
        <label className="rot" htmlFor="a-titulo">Título da apostila</label>
        <input id="a-titulo" type="text" value={meta.titulo} onChange={(e) => setMeta({ ...meta, titulo: e.target.value })} />
        <label className="rot" htmlFor="a-tema">Tema geral</label>
        <input id="a-tema" type="text" value={meta.tema} onChange={(e) => setMeta({ ...meta, tema: e.target.value })} />
        <label className="rot" htmlFor="a-preco">Preço (R$)</label>
        <input id="a-preco" type="number" min="0" step="0.01" value={meta.preco} onChange={(e) => setMeta({ ...meta, preco: e.target.value })} />
        <p className="meta">Apostilas são conteúdo pago: não entram no teste gratuito nem aparecem na área de simulados.</p>
        {aviso && <p className="aviso-ok">{aviso}</p>}
      </div>

      {secoes.map((s, i) => (
        <div className="card q" key={s.id}>
          <div className="q-topo">
            <b>Seção {i + 1}</b>
            {i > 0 && <button className="link" onClick={() => unir(i)}>Unir com a anterior</button>}
            <button className="link" onClick={() => setSecoes(secoes.filter((_, k) => k !== i))}>Excluir</button>
          </div>
          <label className="rot" htmlFor={`st-${s.id}`}>Título da seção</label>
          <input id={`st-${s.id}`} type="text" value={s.titulo} onChange={(e) => editarS(i, 'titulo', e.target.value)} />
          <label className="rot" htmlFor={`sx-${s.id}`}>Texto</label>
          <textarea id={`sx-${s.id}`} rows={6} value={s.texto} onChange={(e) => editarS(i, 'texto', e.target.value)} />
        </div>
      ))}

      {erro && <p className="erro" role="alert">{erro}</p>}
      <div className="rodape">
        <button className="btn btn-sec" onClick={() => { setErro(''); setEtapa('lista'); }}>Cancelar</button>
        <button className="btn btn-sec" onClick={() => setSecoes([...secoes, secaoVazia()])}>+ Adicionar seção</button>
        <button className="btn" onClick={salvar}>Salvar apostila</button>
      </div>
    </>
  );
}
