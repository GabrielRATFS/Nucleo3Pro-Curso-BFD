import { useState } from 'react';
import { sugerirGrupo } from './grupos.js';
import './desempenho.css';

const percentual = (acertos, total) => (total ? Math.round((acertos / total) * 100) : 0);

function Barra({ valor }) {
  return (
    <div className="trilho mini">
      <i className={valor < 50 ? 'baixo' : ''} style={{ width: `${valor}%` }} />
    </div>
  );
}

// Agrupa os temas (ex.: 4 temas de urgência em "Urgência e Emergência") e deixa cada grupo abrir e fechar.
export default function DesempenhoPorTema({ porTema }) {
  const grupos = [];
  porTema.forEach((t) => {
    const nome = t.grupo || sugerirGrupo(t.tema);
    let g = grupos.find((x) => x.nome === nome);
    if (!g) { g = { nome, itens: [], acertos: 0, total: 0 }; grupos.push(g); }
    g.itens.push(t);
    g.acertos += t.acertos;
    g.total += t.total;
  });

  const expansiveis = grupos.filter((g) => g.itens.length > 1).map((g) => g.nome);
  const [abertos, setAbertos] = useState([]);
  const alternar = (nome) => setAbertos(abertos.includes(nome) ? abertos.filter((x) => x !== nome) : [...abertos, nome]);

  return (
    <div className="card desemp">
      <div className="desemp-topo">
        <b>Desempenho por tema</b>
        {expansiveis.length > 0 && (
          <div>
            <button className="link" onClick={() => setAbertos(expansiveis)}>Expandir tudo</button>
            <button className="link" onClick={() => setAbertos([])}>Recolher tudo</button>
          </div>
        )}
      </div>

      {grupos.map((g, i) => {
        const pct = percentual(g.acertos, g.total);
        const fracos = g.itens.filter((t) => t.pct < 50).length;
        const aberto = abertos.includes(g.nome);

        if (g.itens.length === 1) {
          return (
            <div className="grupo" key={g.nome}>
              <div className="grupo-cab">
                <span className="seta" />
                <span className="nome">{g.nome}</span>
                <Barra valor={pct} />
                <b className="pct">{pct}%</b>
              </div>
            </div>
          );
        }
        return (
          <div className="grupo" key={g.nome}>
            <button className="grupo-cab" aria-expanded={aberto} aria-controls={`grupo-${i}`} onClick={() => alternar(g.nome)}>
              <span className="seta" aria-hidden="true">{aberto ? '▾' : '▸'}</span>
              <span className="nome">{g.nome} <small>({g.itens.length} temas)</small></span>
              {fracos > 0 && <span className="fraco">{fracos} abaixo de 50%</span>}
              <Barra valor={pct} />
              <b className="pct">{pct}%</b>
            </button>
            {aberto && (
              <div className="grupo-itens" id={`grupo-${i}`}>
                {g.itens.map((t) => (
                  <div className="sub" key={t.tema}>
                    <span>{t.tema}</span>
                    <Barra valor={t.pct} />
                    <b className="pct">{t.pct}%</b>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
