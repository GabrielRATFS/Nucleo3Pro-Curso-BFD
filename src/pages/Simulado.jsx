import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth, getResultado, saveResultado } from '../auth.jsx';
import { simulados } from '../storage.js';
import { sugerirGrupo } from '../grupos.js';
import '../simulados.css';

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function Simulado() {
  const { user } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();
  const [sim] = useState(() => simulados.obter(id));
  const QUESTOES = sim?.questoes ?? [];
  const [i, setI] = useState(0);
  const [resp, setResp] = useState({});
  const [seg, setSeg] = useState(0);
  const [lista, setLista] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeg((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Ao trocar de questão, volta ao topo da página.
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [i]);

  // 1 simulado gratuito por pessoa: quem já fez vai para a tela de teste utilizado.
  if (getResultado(user.email)) return <Navigate to="/teste-utilizado" replace />;
  if (!QUESTOES.length) return <Navigate to="/simulados" replace />;

  const q = QUESTOES[i];
  const respondidas = Object.keys(resp).length;
  const faltam = QUESTOES.length - respondidas;

  function finalizar() {
    if (faltam && !window.confirm(`Faltam ${faltam} questões. Finalizar mesmo assim?`)) return;
    const porTema = [...new Set(QUESTOES.map((x) => x.tema))].map((tema) => {
      const qs = QUESTOES.filter((x) => x.tema === tema);
      const acertos = qs.filter((x) => resp[x.id] === x.correta).length;
      return { tema, grupo: qs[0].grupo || sugerirGrupo(tema), acertos, total: qs.length, pct: Math.round((acertos / qs.length) * 100) };
    });
    const acertos = porTema.reduce((s, t) => s + t.acertos, 0);
    saveResultado(user.email, {
      simuladoId: sim.id,
      titulo: sim.titulo,
      nota: Math.round((acertos / QUESTOES.length) * 100) / 10,
      acertos,
      total: QUESTOES.length,
      porTema,
      data: new Date().toISOString(),
      segundos: seg,
    });
    nav('/resultado', { replace: true });
  }

  return (
    <div className="sim">
      <div className="sim-bar">
        <span>{sim.titulo}</span>
        <span>Tempo: {fmt(seg)}</span>
      </div>
      <div className="sim-corpo">
        <section className="sim-main">
          <div className="sim-topo">
            <b>Questão {i + 1} de {QUESTOES.length}</b>
            <button className="link nav-toggle" onClick={() => setLista(!lista)}>Ver questões</button>
          </div>
          <div className="prog"><div style={{ width: `${(respondidas / QUESTOES.length) * 100}%` }} /></div>
          <div className="card">
            <small>{q.tema}</small>
            <p className="enun">{q.enunciado}</p>
            {q.imagem && <img className="q-img" src={q.imagem} alt={`Figura da questão ${i + 1}`} />}
            {q.alternativas.map((a, k) => (
              <button key={k} className={'op' + (resp[q.id] === k ? ' sel' : '')} onClick={() => setResp({ ...resp, [q.id]: k })}>
                <b>{'ABCDE'[k]}</b> &nbsp; {a}
              </button>
            ))}
          </div>
          <div className="acoes">
            <button className="btn btn-sec" disabled={i === 0} onClick={() => setI(i - 1)}>Anterior</button>
            {i < QUESTOES.length - 1
              ? <button className="btn" onClick={() => setI(i + 1)}>Próxima</button>
              : <button className="btn" onClick={finalizar}>Finalizar simulado</button>}
          </div>
        </section>
        <aside className={'sim-nav' + (lista ? ' aberta' : '')}>
          <b>Navegação</b>
          <div className="nums">
            {QUESTOES.map((x, k) => (
              <button
                key={x.id}
                className={'num' + (resp[x.id] !== undefined ? ' feita' : '') + (k === i ? ' atual' : '')}
                onClick={() => { setI(k); setLista(false); }}
              >
                {k + 1}
              </button>
            ))}
          </div>
          <p className="leg">Azul: respondida · Borda amarela: atual</p>
          <button className="btn btn-block" onClick={finalizar}>Finalizar simulado</button>
        </aside>
      </div>
    </div>
  );
}
