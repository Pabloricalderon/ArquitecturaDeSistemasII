import "./App.css";

const tech = [
  { name: "React", desc: "Componentes, UI declarativa y estado para una landing moderna." },
  { name: "Vite", desc: "Dev server rápido y build optimizado para producción." },
  { name: "Docker", desc: "Empaqueta la app en un contenedor reproducible." },
  { name: "Nginx", desc: "Sirve los archivos estáticos del build (dist) en el contenedor final." },
  { name: "GitHub Actions", desc: "Automatiza build + push de la imagen en cada commit." },
  { name: "Doppler", desc: "Gestión de secretos y sync automático hacia GitHub Actions." },
];

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="badge">ASSIGNMENT-04</div>
        <h1>Landing Page Dockerizada (React + Vite)</h1>
        <p>
          Aplicación web <strong>estática</strong> con interfaz agradable.
          Objetivo: construir imagen Docker y publicarla en Docker Hub con CI/CD.
        </p>

        <div className="ctaRow">
          <a className="btn" href="#stack">Ver tecnologías</a>
          <a className="btn ghost" href="#pipeline">Ver pipeline</a>
        </div>
      </header>

      <main className="container">
        <section id="stack" className="card">
          <h2>Tecnologías utilizadas</h2>
          <div className="grid">
            {tech.map((t) => (
              <article key={t.name} className="tile">
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pipeline" className="card">
          <h2>CI/CD (GitHub Actions → Docker Hub)</h2>
          <ul className="list">
            <li>En cada commit, el workflow construye la imagen.</li>
            <li>Publica dos tags: <code>latest</code> y <code>SHA</code> del commit.</li>
            <li>Las imágenes anteriores quedan solo con su <code>SHA</code>.</li>
          </ul>
          <div className="note">
            Tip: el tag <code>latest</code> siempre “se mueve” al último commit.
          </div>
        </section>

        <section className="card">
          <h2>Estructura esperada</h2>
          <pre className="codeBlock">{`/ (repo)
  /src
  /public
  Dockerfile
  .dockerignore
  .github/workflows/dockerhub.yml
  README.md
  /docs/screenshots
    app.png
    dockerhub-tags.png`}</pre>
        </section>
      </main>

      <footer className="footer">
        <span>Hecho para Assignment-04 por Ricardo Calderon 202308002 • React + Vite • Docker Hub</span>
      </footer>
    </div>
  );
}