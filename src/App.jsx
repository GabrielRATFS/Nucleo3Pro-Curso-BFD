import { useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './auth.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Simulado from './pages/Simulado.jsx';
import Resultado from './pages/Resultado.jsx';
import TesteUtilizado from './pages/TesteUtilizado.jsx';
import Admin from './pages/Admin.jsx';

function Header() {
  const { user, logout } = useAuth();
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={fechar}>PREPARA<b>PRO</b></Link>
      <button className="menu-btn" aria-label="Menu" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
        &#9776;
      </button>
      <nav className={'nav' + (aberto ? ' aberta' : '')}>
        <NavLink to="/simulado" onClick={fechar}>Simulados</NavLink>
        {user?.role === 'admin' && <NavLink to="/admin" onClick={fechar}>Admin</NavLink>}
        {user ? (
          <>
            <span>Olá, {user.nome}</span>
            <button className="btn btn-sec" onClick={() => { logout(); fechar(); }}>Sair</button>
          </>
        ) : (
          <Link className="btn" to="/entrar" onClick={fechar}>Entrar</Link>
        )}
      </nav>
    </header>
  );
}

// Só deixa passar quem está logado; os demais vão para /entrar.
function RequireAuth({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  return user ? children : <Navigate to="/entrar" state={{ from: loc.pathname }} replace />;
}

// Só administradores acessam /admin (no protótipo a checagem é no front; em produção, valide no backend).
function RequireAdmin({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) return <Navigate to="/entrar" state={{ from: loc.pathname }} replace />;
  return user.role === 'admin' ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/simulado" element={<RequireAuth><Simulado /></RequireAuth>} />
          <Route path="/resultado" element={<RequireAuth><Resultado /></RequireAuth>} />
          <Route path="/teste-utilizado" element={<RequireAuth><TesteUtilizado /></RequireAuth>} />
          <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">PreparaPro · Cursos e Concursos · Protótipo</footer>
    </>
  );
}
