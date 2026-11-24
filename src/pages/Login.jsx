import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  if (user) return <Navigate to="/simulados" replace />;

  function enviar(e) {
    e.preventDefault();
    const r = login(email, senha);
    if (r.ok) nav(state?.from || '/simulados', { replace: true });
    else setErro(r.erro);
  }

  return (
    <div className="split">
      <div className="split-a">
        <h1>Seu simulado grátis está a um passo.</h1>
        <p>Entre para fazer o teste e receber sua nota com indicação de estudo.</p>
        <div className="aviso">Acesso restrito a administradores nesta fase.</div>
      </div>
      <div className="split-b">
        <form className="form" onSubmit={enviar}>
          <h2>Entrar</h2>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" required />
          {erro && <p className="erro" role="alert">{erro}</p>}
          <button className="btn btn-block">Entrar</button>
          <button type="button" className="btn btn-sec btn-block" disabled>Criar conta (em breve)</button>
        </form>
      </div>
    </div>
  );
}
