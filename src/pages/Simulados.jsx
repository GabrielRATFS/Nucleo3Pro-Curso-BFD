import { Link } from 'react-router-dom';
import { useAuth, getResultado } from '../auth.jsx';
import { simulados } from '../storage.js';
import '../simulados.css';

export default function Simulados() {
  const { user } = useAuth();
  const lista = simulados.todos();
  const usado = getResultado(user.email);

  return (
    <section className="secao cat">
      <h1>Simulados</h1>
      <p>Todos os simulados são gratuitos, mas cada pessoa pode fazer apenas 1. Escolha com cuidado.</p>
      {usado && (
        <div className="uso">
          <b>Você já usou seu simulado gratuito{usado.titulo ? ` (${usado.titulo})` : ''}.</b>{' '}
          <Link to="/resultado">Ver meu resultado</Link>
        </div>
      )}
      {!lista.length && <p>Nenhum simulado disponível ainda.</p>}
      <div className="grid3">
        {lista.map((s) => (
          <div className="card" key={s.id}>
            <b>{s.titulo}</b>
            <p>{s.questoes.length} questões · {[...new Set(s.questoes.map((q) => q.grupo || q.tema))].join(', ')}</p>
            {usado ? (
              <button className="btn" disabled>Teste já utilizado</button>
            ) : (
              <Link
                className="btn"
                to={`/simulado/${s.id}`}
                onClick={(e) => { if (!window.confirm(`Você só pode fazer 1 simulado gratuito. Iniciar "${s.titulo}"?`)) e.preventDefault(); }}
              >
                Fazer simulado
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
