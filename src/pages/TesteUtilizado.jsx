import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, getResultado, clearResultado } from '../auth.jsx';

export default function TesteUtilizado() {
  const { user } = useAuth();
  const nav = useNavigate();
  const r = getResultado(user.email);
  if (!r) return <Navigate to="/simulado" replace />;

  return (
    <div className="centro">
      <div className="card">
        <h1>Você já usou seu teste gratuito.</h1>
        <p>Cada conta tem 1 simulado gratuito. Veja seu resultado ou continue treinando.</p>
        <div className="stats">
          <div><b>{String(r.nota).replace('.', ',')}</b>Nota</div>
          <div><b>{r.acertos}/{r.total}</b>Acertos</div>
          <div><b>{new Date(r.data).toLocaleDateString('pt-BR')}</b>Feito em</div>
        </div>
        <div className="botoes">
          <Link className="btn btn-sec" to="/resultado">Ver meu resultado</Link>
          <button className="btn" disabled>Ver planos de simulados (em breve)</button>
        </div>
        {user.role === 'admin' && (
          <button className="link" onClick={() => { clearResultado(user.email); nav('/simulado'); }}>
            Admin: refazer teste
          </button>
        )}
      </div>
    </div>
  );
}
