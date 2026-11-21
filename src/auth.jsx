import { createContext, useContext, useState } from 'react';
import { USUARIOS, LOGIN_LIBERADO_PARA } from './data.js';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

const KEY = 'pp_user';
const lerUser = () => {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(lerUser);

  function login(email, senha) {
    const u = USUARIOS.find((x) => x.email === email.trim().toLowerCase() && x.senha === senha);
    if (!u) return { ok: false, erro: 'E-mail ou senha incorretos.' };
    if (!LOGIN_LIBERADO_PARA.includes(u.role)) {
      return { ok: false, erro: 'O acesso está liberado apenas para administradores por enquanto.' };
    }
    const { senha: _omitida, ...seguro } = u;
    localStorage.setItem(KEY, JSON.stringify(seguro));
    setUser(seguro);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(KEY);
    setUser(null);
  }

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

// "1 teste por usuário": o resultado salvo por e-mail indica que o teste já foi usado.
const rk = (email) => `pp_resultado_${email}`;
export const getResultado = (email) => {
  try { return JSON.parse(localStorage.getItem(rk(email))); } catch { return null; }
};
export const saveResultado = (email, r) => localStorage.setItem(rk(email), JSON.stringify(r));
export const clearResultado = (email) => localStorage.removeItem(rk(email));
