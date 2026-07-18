import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { portfolio } from './data'
import heroArt from './assets/data-landscape.png'
import './App.css'

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeJob, setActiveJob] = useState(0)

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <button className="brand" onClick={() => go('home')} aria-label="Retour à l’accueil"><span>{portfolio.initials}</span><small>Zoubida Lotfi<br />Portfolio</small></button>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navigation principale">
          <button onClick={() => go('impact')}>Impact</button>
          <button onClick={() => go('experience')}>Parcours</button>
          <button onClick={() => go('expertise')}>Expertise</button>
          <button onClick={() => go('contact')}>Contact</button>
        </nav>
        <a className="availability" href={`mailto:${portfolio.email}`}><i /> Disponible pour échanger</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu"><span /><span /></button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-personal-copy">
            <p className="hero-hello"><span aria-hidden="true">✦</span> Bonjour, je suis</p>
            <h1><span>Zoubida</span><em>Lotfi.</em></h1>
            <div className="hero-role-line">
              <p>Data Project Manager</p>
              <span>Basée à Paris<br />Expérience internationale</span>
            </div>
            <p className="hero-summary">Je pilote des projets data complexes et transforme les besoins métier en produits fiables, utiles et prêts à passer à l’échelle.</p>
            <div className="hero-actions">
              <button className="primary-link" onClick={() => go('experience')}>Voir mon parcours <Arrow /></button>
              <button className="secondary-link" onClick={() => go('impact')}>À propos de moi</button>
            </div>
          </div>
          <div className="hero-personal-visual">
            <div className="hero-art-frame">
              <img className="hero-art" src={heroArt} alt="Visualisation abstraite de flux de données internationaux" />
              <span className="visual-index">PORTFOLIO / 2026</span>
              <div className="visual-monogram" aria-hidden="true">ZL</div>
            </div>
            <div className="personal-proof">
              <span>En ce moment</span>
              <p>Je sécurise la qualité et le delivery d’un datamart international de près de <strong>40M d’entreprises.</strong></p>
            </div>
          </div>
          <p className="scroll-cue">DÉCOUVRIR MON PORTFOLIO <span>↓</span></p>
        </section>

        <section className="intro section" id="impact">
          <div className="section-label"><span>02</span> En quelques mots</div>
          <div className="intro-content">
            <p className="statement">Entre la complexité des systèmes et la clarté des décisions, <em>je construis le passage.</em></p>
            <p className="profile">{portfolio.profile}</p>
          </div>
          <div className="metrics">
            {portfolio.metrics.map((metric) => <article key={metric.value + metric.label}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.note}</p></article>)}
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="section-label light"><span>03</span> Expérience</div>
          <div className="section-heading">
            <h2>Du besoin métier<br /><em>à la mise en production.</em></h2>
            <p>Un parcours construit au cœur d’environnements data internationaux, là où rigueur technique et sens du collectif font la différence.</p>
          </div>
          <div className="experience-layout">
            <div className="job-tabs">
              {portfolio.experience.map((job, index) => <button key={job.title} className={activeJob === index ? 'active' : ''} onClick={() => setActiveJob(index)}><span>0{index + 1}</span><b>{job.title}</b><small>{job.dates}</small></button>)}
            </div>
            <article className="job-detail">
              <div className="job-top"><div><p>{portfolio.experience[activeJob].company}</p><h3>{portfolio.experience[activeJob].title}</h3></div><span>{portfolio.experience[activeJob].location}</span></div>
              <p className="job-intro">{portfolio.experience[activeJob].intro}</p>
              <ul>{portfolio.experience[activeJob].highlights.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="expertise section" id="expertise">
          <div className="section-label"><span>04</span> Mon terrain de jeu</div>
          <div className="section-heading dark"><h2>Une vision à 360°<br /><em>du projet data.</em></h2><p>Quatre dimensions complémentaires pour transformer une architecture complexe en produit fiable et lisible.</p></div>
          <div className="capability-grid">
            {portfolio.capabilities.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><div>{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></article>)}
          </div>
        </section>

        <section className="learning section">
          <div className="section-label"><span>05</span> Formation & langues</div>
          <div className="learning-grid">
            <h2>Comprendre<br />la technique.<br /><em>Parler métier.</em></h2>
            <div className="education-list">
              {portfolio.education.map((item, index) => <article key={item.school}><span>0{index + 1}</span><div><h3>{item.degree}</h3><b>{item.school} · {item.place}</b><p>{item.detail}</p></div></article>)}
              <div className="languages">{portfolio.languages.map((language) => <span key={language}>{language}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <p className="eyebrow"><span>06</span> Et maintenant ?</p>
          <h2>Un projet data<br />à faire avancer ?</h2>
          <p>Parlons objectifs, complexité et impact. Je serai ravie d’échanger avec vous.</p>
          <div className="contact-actions"><a href={`mailto:${portfolio.email}`}>Envoyer un email <Arrow /></a></div>
        </section>
      </main>

      <footer><span>{portfolio.initials}</span><p>© {new Date().getFullYear()} Zoubida Lotfi</p><button onClick={() => go('home')}>Retour en haut ↑</button></footer>
      <Analytics />
    </div>
  )
}

export default App
