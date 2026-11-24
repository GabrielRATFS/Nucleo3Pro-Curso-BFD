import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, getResultado, clearResultado } from '../auth.jsx';

export default function TesteUtilizado() {
  const { user } = useAuth();
  const nav = useNavigate();
  const r = getResultado(user.email);
  if (!r) return <Navigate to="/simulados" replace />;

  return (
    <div className="centro">
      <div className="card">
        <h1>Você já usou seu teste gratuito.</h1>
        <p>Cada pessoa tem direito a 1 simulado gratuito{r.titulo ? ` (você fez: ${r.titulo})` : ''}. Veja seu resultado ou continue treinando.</p>
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
          <button className="link" onClick={() => { clearResultado(user.email); nav('/simulados'); }}>
            Admin: refazer teste
          </button>
        )}
      </div>
    </div>
  );
}
