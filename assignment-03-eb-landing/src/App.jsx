import "./App.css";

const TechCard = ({ title, desc, bullets }) => (
  <div className="card">
    <div className="cardHeader">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
    <ul>
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default function App() {
  const tech = [
    {
      title: "Vite + React",
      desc: "Base rápida para desarrollo y build.",
      bullets: [
        "Dev server veloz (HMR)",
        "Build optimizado para producción",
        "Componentes reutilizables",
      ],
    },
    {
      title: "Docker (multi-stage)",
      desc: "Empaquetamos la app en una imagen lista para desplegar.",
      bullets: [
        "Se construye con Node",
        "Se sirve con Nginx (estático)",
        "Reproducible en cualquier ambiente",
      ],
    },
    {
      title: "AWS Elastic Beanstalk",
      desc: "Servicio PaaS para desplegar sin complicarte con servidores.",
      bullets: [
        "Ambiente Docker en AL2/AL2023",
        "Maneja instancias y balanceo según config",
        "URL pública para verificar funcionamiento",
      ],
    },
    {
      title: "GitHub Actions (Pipeline)",
      desc: "Automatiza build y despliegue a Beanstalk.",
      bullets: [
        "Construye imagen",
        "Publica a ECR",
        "Crea versión y despliega en EB",
      ],
    },
    {
      title: "Doppler (Secretos)",
      desc: "Centraliza credenciales y las sincroniza a GitHub Secrets.",
      bullets: [
        "Evita credenciales hardcodeadas",
        "Permite rotación más fácil",
        "Sync automático con GitHub",
      ],
    },
    {
      title: "Husky + lint-staged",
      desc: "Reglas antes de hacer commit.",
      bullets: [
        "Corre ESLint automáticamente",
        "Evita commits con errores de estilo",
        "Mantiene el repo limpio",
      ],
    },
  ];

  return (
    <div className="page">
      <header className="hero">
        <div className="badge">assignment-03 · React Landing</div>
        <h1>Despliegue de Landing Page con Docker + AWS Elastic Beanstalk</h1>
        <p>
          Aplicación web estática creada con <b>Vite + React</b>, dockerizada y
          desplegada automáticamente usando <b>GitHub Actions</b>. Secretos manejados
          con <b>Doppler</b> y validaciones con <b>Husky</b>.
        </p>

        <div className="ctaRow">
          <a className="btn" href="#stack">Ver tecnologías</a>
          <a className="btn ghost" href="#how">Cómo funciona</a>
        </div>
      </header>

      <main className="container">
        <section id="stack" className="section">
          <h2>Stack usado</h2>
          <p className="muted">
            Esta landing es estática: no necesita backend. El objetivo es mostrar el flujo
            de CI/CD hacia Elastic Beanstalk con Docker.
          </p>

          <div className="grid">
            {tech.map((t) => (
              <TechCard key={t.title} {...t} />
            ))}
          </div>
        </section>

        <section id="how" className="section">
          <h2>Flujo de despliegue</h2>
          <div className="steps">
            <div className="step">
              <div className="stepNum">1</div>
              <div>
                <h3>Push a rama assignment-03</h3>
                <p>Al hacer push, se ejecuta el workflow de GitHub Actions.</p>
              </div>
            </div>

            <div className="step">
              <div className="stepNum">2</div>
              <div>
                <h3>Build de Docker</h3>
                <p>Se construye la imagen usando un Dockerfile multi-stage.</p>
              </div>
            </div>

            <div className="step">
              <div className="stepNum">3</div>
              <div>
                <h3>Push a ECR</h3>
                <p>La imagen se sube a Amazon ECR con un tag único por commit.</p>
              </div>
            </div>

            <div className="step">
              <div className="stepNum">4</div>
              <div>
                <h3>Deploy a Elastic Beanstalk</h3>
                <p>
                  Se crea una versión en Beanstalk con <code>Dockerrun.aws.json</code> apuntando a la imagen en ECR.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Hecho por <b>Ricardo Calderon 202308002</b> · Arquitectura de Sistemas II
        </p>
      </footer>
    </div>
  );
}