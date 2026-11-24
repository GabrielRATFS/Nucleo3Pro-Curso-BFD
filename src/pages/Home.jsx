import { Link } from 'react-router-dom';

const PASSOS = [
  ['1 · Faça o simulado', 'Questões no estilo da prova, com cronômetro.'],
  ['2 · Receba sua nota', 'Veja seu desempenho geral e por tema.'],
  ['3 · Siga seu plano', 'Cursos e apostilas indicados para você.'],
];

const DIFERENCIAIS = [
  ['Estratégia', 'Método estruturado, não estudo solto.'],
  ['Simulados', 'Focados no que realmente cai.'],
  ['Professores especialistas', 'Quem vive concurso.'],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-txt">
          <h1>Não é sobre estudar mais. É sobre estudar certo.</h1>
          <p>Faça um simulado gratuito de saúde e descubra onde focar seus estudos.</p>
          <Link className="btn btn-lg" to="/simulados">Começar simulado grátis</Link>
          <small>1 teste gratuito por pessoa · Resultado na hora</small>
          <div className="aviso">Acesso liberado apenas para administradores nesta fase.</div>
        </div>
        <div className="foto">[Foto: estudante ou profissional da saúde]</div>
      </section>

      <section className="secao">
        <h2>Como funciona</h2>
        <div className="grid3">
          {PASSOS.map(([t, d]) => (
            <div className="card" key={t}><b>{t}</b><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="secao">
        <div className="grid3">
          {DIFERENCIAIS.map(([t, d]) => (
            <div className="card dif" key={t}><b>{t}</b><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Seu plano de aprovação começa aqui.</h2>
        <Link className="btn btn-lg" to="/simulados">Fazer meu teste grátis</Link>
      </section>
    </>
  );
}
