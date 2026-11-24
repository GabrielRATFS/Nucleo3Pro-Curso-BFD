import { useState } from 'react';
import AdminSimulados from './AdminSimulados.jsx';
import AdminApostilas from './AdminApostilas.jsx';
import '../admin.css';

export default function Admin() {
  const [aba, setAba] = useState('simulados');
  return (
    <div className="admin">
      <div className="abas" role="tablist">
        {[['simulados', 'Simulados'], ['apostilas', 'Apostilas']].map(([id, nome]) => (
          <button key={id} role="tab" aria-selected={aba === id} className={'aba' + (aba === id ? ' ativa' : '')} onClick={() => setAba(id)}>
            {nome}
          </button>
        ))}
      </div>
      {aba === 'simulados' ? <AdminSimulados /> : <AdminApostilas />}
    </div>
  );
}
