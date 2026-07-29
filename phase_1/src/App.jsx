import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { getProjectBySlug, projects } from './data/projects';
import './App.css';

const capabilities = [
  {
    title: 'Backend & data',
    text: 'APIs, data modeling, ETL workflows, relational databases, and reliable automation.',
    tools: 'Python · SQL · Dagster · REST',
  },
  {
    title: 'Cloud & infrastructure',
    text: 'Cloud cost visibility, containerized systems, dashboards, and operational tooling.',
    tools: 'Kubernetes · AWS · Grafana · Docker',
  },
  {
    title: 'Product engineering',
    text: 'Responsive interfaces and full-stack applications shaped around real user workflows.',
    tools: 'React · JavaScript · HTML · CSS',
  },
];

const socials = {
  github: 'https://github.com/CalumWlsn04',
  linkedin: 'https://www.linkedin.com/in/calum-wilson004/',
  email: 'mailto:calumwilson004@gmail.com',
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M19 13v6H5V5h6" /></svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5V19M6.5 5.5v.01M10.5 19v-6a3.5 3.5 0 0 1 7 0v6M10.5 9v10" /></svg>
);

function SectionHeading({ label, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const reveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.65 } };

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Calum Wilson home">
          <span>CW</span>
          <span className="brand-name">Calum Wilson</span>
        </a>

        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☼' : '☾'}</span>
          </button>
          <a className="header-cta" href="#contact">Let’s talk <ArrowIcon /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            <span /><span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <div className="availability"><span /> Open to software engineering opportunities</div>
            <h1>Building practical software for <em>complex systems.</em></h1>
            <p className="hero-intro">
              I’m Calum Wilson, a computer science undergraduate focused on backend development, data engineering, cloud infrastructure, and thoughtful product experiences.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">Explore my work <ArrowIcon /></a>
              <a className="button secondary" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a>
            </div>
            <div className="hero-meta">
              <span>Based in the United States</span>
              <span>Python · SQL · React · Kubernetes</span>
            </div>
          </motion.div>

          <motion.div className="hero-panel" initial={reduceMotion ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.12 }}>
            <div className="panel-topbar"><span /><span /><span /><p>calum.profile.ts</p></div>
            <pre aria-label="Developer profile code"><code><span className="code-muted">01</span> <span className="code-purple">const</span> engineer = {'{'}
{`\n`}<span className="code-muted">02</span>   name: <span className="code-green">'Calum Wilson'</span>,
{`\n`}<span className="code-muted">03</span>   focus: [
{`\n`}<span className="code-muted">04</span>     <span className="code-green">'backend systems'</span>,
{`\n`}<span className="code-muted">05</span>     <span className="code-green">'data pipelines'</span>,
{`\n`}<span className="code-muted">06</span>     <span className="code-green">'cloud infrastructure'</span>
{`\n`}<span className="code-muted">07</span>   ],
{`\n`}<span className="code-muted">08</span>   approach: <span className="code-green">'learn → build → refine'</span>,
{`\n`}<span className="code-muted">09</span>   status: <span className="code-orange">'ready for the next challenge'</span>
{`\n`}<span className="code-muted">10</span> {'}'};</code></pre>
            <div className="panel-status"><span><i /> system.ready</span><span>2026</span></div>
          </motion.div>

          <a className="scroll-cue" href="#work"><span>Scroll to work</span><i /></a>
        </section>

        <section className="work section" id="work">
          <motion.div {...reveal}>
            <SectionHeading label="Selected work" title="Projects built around real constraints." text="A selection of data, infrastructure, and full-stack work focused on making complex information useful." />
          </motion.div>

          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article className="project" key={project.title} {...reveal} transition={{ duration: 0.65, delay: index * 0.06 }}>
                <div className={`project-visual ${project.accent}`}>
                  <div className="visual-grid" />
                  <div className="project-number">{project.number}</div>
                  {project.accent === 'pipeline' && <div className="pipeline-diagram"><span>API</span><i /><span>Dagster</span><i /><span>SQL</span></div>}
                  {project.accent === 'cloud' && <div className="cloud-diagram"><span className="ring ring-one" /><span className="ring ring-two" /><strong>42%</strong><small>cost visibility</small></div>}
                  {project.accent === 'product' && <div className="product-diagram"><span /><span /><span /><div /></div>}
                </div>
                <div className="project-copy">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="impact"><span>Outcome</span><p>{project.impact}</p></div>
                  <ul className="tags">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                  <Link className="project-link" to={`/projects/${project.slug}`}>Read case study <ArrowIcon /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <motion.div {...reveal}>
            <SectionHeading label="About" title="Curious by default. Practical by design." />
          </motion.div>
          <div className="about-grid">
            <motion.div className="about-copy" {...reveal}>
              <p className="large-copy">I like working where software meets messy, real-world systems—turning APIs, infrastructure data, and user requirements into tools people can actually rely on.</p>
              <p>I’m currently completing my computer science degree while deepening my experience across backend engineering, data platforms, cloud tooling, and modern web development. I care about clear thinking, maintainable code, and understanding the reason behind a technical decision.</p>
              <p>My best work comes from learning quickly, asking good questions, and iterating until the result feels simple.</p>
              <div className="about-links">
                <a href={socials.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub <ExternalIcon /></a>
                <a href={socials.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon /> LinkedIn <ExternalIcon /></a>
              </div>
            </motion.div>
            <div className="capabilities">
              {capabilities.map((item, index) => (
                <motion.div className="capability" key={item.title} {...reveal} transition={{ duration: 0.55, delay: index * 0.07 }}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <small>{item.tools}</small>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <motion.div className="contact-card" {...reveal}>
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h2>Have an opportunity or an interesting problem?</h2>
              <p>I’m interested in software engineering internships, early-career roles, and projects where I can contribute, learn quickly, and build useful systems.</p>
            </div>
            <div className="contact-actions">
              <a className="button primary light" href={socials.email}>Email Calum <ArrowIcon /></a>
              <a className="button contact-link" href={socials.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ExternalIcon /></a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top"><span>CW</span><span className="brand-name">Calum Wilson</span></a>
        <p>Designed and built with React. © {new Date().getFullYear()}</p>
        <div><a href={socials.github} target="_blank" rel="noreferrer">GitHub</a><a href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
      </footer>

      <AnimatePresence>{menuOpen && <motion.div className="menu-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />}</AnimatePresence>
    </div>
  );
}


function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="site-shell project-page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header project-header">
        <Link className="brand" to="/" aria-label="Calum Wilson home">
          <span>CW</span>
          <span className="brand-name">Calum Wilson</span>
        </Link>
        <Link className="header-cta" to="/#work">All projects <ArrowIcon /></Link>
      </header>

      <main className="case-study">
        <section className="case-hero">
          <Link className="back-link" to="/#work">← Back to selected work</Link>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="case-lede">{project.overview}</p>
          <ul className="tags case-tags">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
        </section>

        <section className="case-grid">
          <article className="case-section">
            <p className="eyebrow">The challenge</p>
            <h2>Turning a real constraint into a dependable system.</h2>
            <p>{project.challenge}</p>
          </article>

          <aside className="case-outcome">
            <span>Outcome</span>
            <p>{project.impact}</p>
          </aside>
        </section>

        <section className="case-section case-approach">
          <p className="eyebrow">Engineering approach</p>
          <h2>How the work was structured.</h2>
          <ol>
            {project.approach.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="case-next">
          <p>This is the first routed case-study template. We can now replace this starter content with the deeper Breeze, PII, Freestone, and xv6 write-ups.</p>
          <Link className="button primary" to="/#contact">Start a conversation <ArrowIcon /></Link>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
