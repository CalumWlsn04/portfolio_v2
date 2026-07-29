import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { additionalProjects, experience, getProjectBySlug, projects } from './data/projects';
import './App.css';

const socials = { github: 'https://github.com/CalumWlsn04', linkedin: 'https://www.linkedin.com/in/calum-wilson004/', email: 'mailto:calum8285@gmail.com' };
const ArrowIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const ExternalIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M19 14v5H5V5h5" /></svg>;
const SectionHeading = ({ label, title, text }) => <div className="section-heading"><p className="eyebrow">{label}</p><div><h2>{title}</h2>{text && <p>{text}</p>}</div></div>;

function ScrollToLocation() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);
  return null;
}

function ProjectVisual({ project }) {
  if (project.accent === 'ml') return <div className="neural-visual"><div className="cell-cloud">{Array.from({ length: 19 }).map((_, i) => <i key={i} />)}</div><div className="model-score"><span>model_eval</span><strong>74.0%</strong><small>end-to-end CNN</small></div></div>;
  if (project.accent === 'pipeline') return <div className="pipeline-diagram"><span>API</span><i /><span>Dagster</span><i /><span>PySpark</span><i /><span>SQL</span></div>;
  return <div className="product-diagram"><div className="product-sidebar"><i /><i /><i /></div><div className="product-main"><span /><span /><div className="bars"><i /><i /><i /><i /></div></div></div>;
}

function HomePage() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  const reveal = { initial: reduceMotion ? false : { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .18 }, transition: { duration: .62 } };

  return <div className="site-shell">
    <motion.div className="scroll-progress" style={{ scaleX }} /><div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="site-header"><a className="brand" href="#top"><span>CW</span><span className="brand-name">Calum Wilson</span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}><a href="#work" onClick={() => setMenuOpen(false)}>Work</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a></nav>
      <div className="header-actions"><button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">{theme === 'dark' ? '☼' : '☾'}</button><a className="header-cta" href="#contact">Let’s talk <ArrowIcon /></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
    </header>

    <main>
      <section className="hero" id="top">
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
          <div className="availability"><span /> Open to software engineering opportunities</div>
          <h1>Engineering across <em>AI, data, and production systems.</em></h1>
          <p className="hero-intro">I’m Calum Wilson, a software engineer who moves comfortably between models, pipelines, APIs, infrastructure, and the products built on top of them.</p>
          <div className="hero-actions"><a className="button primary" href="#work">Explore featured work <ArrowIcon /></a><a className="button secondary" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a></div>
          <div className="hero-meta"><span>San Francisco · Washington, D.C.</span><span>Python · React · AWS · ML</span></div>
        </motion.div>
        <motion.div className="hero-panel" initial={reduceMotion ? false : { opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .12 }}>
          <div className="panel-topbar"><span /><span /><span /><p>engineering.profile</p></div>
          <div className="profile-stack"><p>01 / RANGE</p><h3>Models to infrastructure.</h3><div className="stack-map"><span>AI / ML</span><i /><span>Data</span><i /><span>Backend</span><i /><span>Cloud</span></div><p>02 / APPROACH</p><blockquote>Frame the constraint.<br />Design the system.<br />Measure the result.</blockquote></div>
          <div className="panel-status"><span><i /> available</span><span>2026</span></div>
        </motion.div>
      </section>

      <section className="work section" id="work"><motion.div {...reveal}><SectionHeading label="Featured work" title="Three projects. Three different layers of engineering." text="Each case study focuses on the problem, the design decision, and the result—not just the technology stack." /></motion.div>
        <div className="project-list">{projects.map((project, index) => <motion.article className="project" key={project.slug} {...reveal} transition={{ duration: .65, delay: index * .06 }}>
          <div className={`project-visual ${project.accent}`}><div className="visual-grid" /><div className="project-number">{project.number}</div><ProjectVisual project={project} /></div>
          <div className="project-copy"><p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="impact"><span>Outcome</span><p>{project.impact}</p></div><ul className="tags">{project.tech.map(t => <li key={t}>{t}</li>)}</ul><Link className="project-link" to={`/projects/${project.slug}`}>Read engineering case study <ArrowIcon /></Link></div>
        </motion.article>)}</div>
      </section>

      <section className="experience section" id="experience"><motion.div {...reveal}><SectionHeading label="Experience" title="Professional work across product, cloud, and data." /></motion.div><div className="experience-list">{experience.map((item, i) => <motion.article key={item.company} {...reveal}><span>0{i + 1}</span><div><p>{item.period}</p><h3>{item.company}</h3><h4>{item.role}</h4></div><p>{item.text}</p></motion.article>)}</div></section>

      <section className="more-work section"><motion.div {...reveal}><SectionHeading label="Additional projects" title="More systems explored in depth." /></motion.div><div className="more-grid">{additionalProjects.map(item => <motion.article key={item.title} {...reveal}><h3>{item.title}</h3><p>{item.text}</p><small>{item.tech}</small></motion.article>)}</div></section>

      <section className="about section" id="about"><motion.div {...reveal}><SectionHeading label="About" title="Broad interests, connected by one way of working." /></motion.div><div className="about-grid"><motion.div className="about-copy" {...reveal}><p className="large-copy">I’m most interested in problems that require moving between layers—from data and models to APIs, infrastructure, and the interface people use.</p><p>That range is intentional. Machine learning research, cloud and data engineering, backend systems, operating systems, and production application development each sharpen how I understand the others.</p><p>I care about maintainable systems, clear technical communication, and being able to explain why an engineering decision was made.</p></motion.div><div className="principles"><div><span>01</span><h3>Frame the constraint</h3><p>Good implementation starts with understanding what the system genuinely needs to accomplish.</p></div><div><span>02</span><h3>Design the flow</h3><p>Make the data path, ownership, tradeoffs, and failure modes explicit.</p></div><div><span>03</span><h3>Evaluate honestly</h3><p>Use evidence—including disappointing results—to improve the next decision.</p></div></div></div></section>

      <section className="contact section" id="contact"><motion.div className="contact-card" {...reveal}><div><p className="eyebrow">Start a conversation</p><h2>Building something technically ambitious?</h2><p>I’m interested in early-career software engineering roles across AI, backend, cloud, data, and product engineering.</p></div><div className="contact-actions"><a className="button primary light" href={socials.email}>Email Calum <ArrowIcon /></a><a className="button contact-link" href={socials.github} target="_blank" rel="noreferrer">View GitHub <ExternalIcon /></a></div></motion.div></section>
    </main>
    <footer><a className="brand" href="#top"><span>CW</span><span className="brand-name">Calum Wilson</span></a><p>Designed and built with React. © {new Date().getFullYear()}</p><div><a href={socials.github}>GitHub</a><a href={socials.linkedin}>LinkedIn</a></div></footer>
    <AnimatePresence>{menuOpen && <motion.div className="menu-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} />}</AnimatePresence>
  </div>;
}

function ArchitectureFlow({ items }) { return <div className="architecture-flow">{items.map((item, i) => <div className="flow-unit" key={item}><span>{String(i + 1).padStart(2, '0')}</span><strong>{item}</strong>{i < items.length - 1 && <i>→</i>}</div>)}</div>; }

function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/" replace />;
  const currentIndex = projects.findIndex(item => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <div className="site-shell project-page-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="site-header project-header"><Link className="brand" to="/"><span>CW</span><span className="brand-name">Calum Wilson</span></Link><Link className="header-cta" to="/#work">All projects <ArrowIcon /></Link></header>
    <main className="case-study">
      <section className="case-hero"><Link className="back-link" to="/#work">← Back to featured work</Link><p className="eyebrow">{project.eyebrow}</p><h1>{project.title}</h1><p className="case-lede">{project.overview}</p><div className="case-meta"><div><span>Role</span><strong>{project.role}</strong></div><div><span>Context</span><strong>{project.context}</strong></div><div><span>Year</span><strong>{project.year}</strong></div></div></section>
      <section className="metrics-row">{project.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</section>

      <section className="story-grid">
        <article><span>01 · Problem</span><h2>What had to change</h2><p>{project.challenge}</p></article>
        <article><span>02 · Constraint</span><h2>What shaped the design</h2><p>{project.constraint}</p></article>
        <article><span>03 · Decision</span><h2>The engineering choice</h2><p>{project.decision}</p></article>
      </section>

      <section className="case-section architecture-section"><p className="eyebrow">System architecture</p><h2>How information moved through the work.</h2><p className="section-intro">The diagram is intentionally simple: each stage represents a separate responsibility that could be reasoned about, tested, and improved independently.</p><ArchitectureFlow items={project.architecture} />{project.secondaryArchitecture && <><h3 className="secondary-title">Contrastive pre-training path</h3><ArchitectureFlow items={project.secondaryArchitecture} /></>}</section>
      <section className="case-section case-approach"><p className="eyebrow">Implementation</p><h2>From problem framing to evaluation.</h2><ol>{project.steps.map(step => <li key={step.title}><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>

      <section className="result-panel"><div><p className="eyebrow">Result</p><h2>What the work demonstrated</h2></div><p>{project.resultSummary}</p><div className="result-callout"><span>Primary outcome</span><strong>{project.impact}</strong></div></section>

      <section className="lesson-card"><p className="eyebrow">Key lesson</p><blockquote>{project.insight}</blockquote></section>
      <section className="case-next"><div><p className="eyebrow">Next case study</p><h2>{nextProject.title}</h2><p>{nextProject.description}</p></div><div className="next-actions">{project.paper && <a className="button secondary" href={project.paper} target="_blank" rel="noreferrer">Read full research report <ExternalIcon /></a>}<Link className="button primary" to={`/projects/${nextProject.slug}`}>Continue to project {nextProject.number} <ArrowIcon /></Link></div></section>
    </main>
  </div>;
}

export default function App() { return <BrowserRouter><ScrollToLocation /><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/:slug" element={<ProjectPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>; }
