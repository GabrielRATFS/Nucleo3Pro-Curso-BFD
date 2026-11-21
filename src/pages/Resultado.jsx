import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth, getResultado, clearResultado } from '../auth.jsx';
import { faixa, ofertas } from '../ofertas.js';
import DesempenhoPorTema from '../DesempenhoPorTema.jsx';

function Lista({ titulo, itens, rotulo }) {
  if (!itens.length) return null;
  return (
    <section className="secao">
      <h2>{titulo}</h2>
      <div className="grid3">
        {itens.map((o) => (
          <div className="card" key={o.nome}>
            <div className="thumb" />
            <b>{o.nome}</b>
            <p>{o.desc}</p>
            <button className="btn">{rotulo}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Resultado() {
  const { user } = useAuth();
  const nav = useNavigate();
  const r = getResultado(user.email);
  if (!r) return <Navigate to="/simulado" replace />;

  const f = faixa(r.nota);
  const { cursos, apostilas } = ofertas(r.porTema, user.interesses || [], f.id);
  const blocos = {
    cursos: <Lista key="c" titulo="Cursos para você" itens={cursos} rotulo="Ver curso" />,
    apostilas: <Lista key="a" titulo="Apostilas para reforçar" itens={apostilas} rotulo="Ver apostila" />,
  };
  // A faixa define o que aparece primeiro: apostilas (base/evolução) ou cursos (avançado).
  const ordem = f.primeiro === 'cursos' ? ['cursos', 'apostilas'] : ['apostilas', 'cursos'];

  return (
    <>
      <section className="hero res-hero">
        <div className="nota"><b>{String(r.nota).replace('.', ',')}</b><span>de 10</span></div>
        <div>
          <h1>Seu resultado no simulado</h1>
          <p>Você acertou {r.acertos} de {r.total} questões. {f.titulo}</p>
        </div>
      </section>

      <section className="secao">
        <DesempenhoPorTema porTema={r.porTema} />
      </section>

      {ordem.map((k) => blocos[k])}

      <section className="secao">
        <div className="banner">
          <div><b>Seu teste gratuito foi utilizado.</b><div>Continue treinando com os simulados completos.</div></div>
          <button className="btn" disabled>Ver planos de simulados (em breve)</button>
        </div>
        {user.role === 'admin' && (
          <button className="link" onClick={() => { clearResultado(user.email); nav('/simulado'); }}>
            Admin: refazer teste
          </button>
        )}
      </section>
    </>
  );
}
