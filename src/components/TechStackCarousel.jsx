import { portfolioData } from '../data/portfolioData';
import { useEffect, useRef } from 'react';

/* ─── Per-card accent colour ─── */
const accentColors = [
  '#00d4ff', '#7c3aed', '#10b981', '#f59e0b',
  '#ef4444', '#3b82f6', '#ec4899', '#14b8a6',
  '#84cc16', '#f97316', '#a855f7', '#06b6d4',
  '#e11d48', '#22c55e', '#eab308', '#8b5cf6',
  '#0ea5e9', '#d946ef',
];

const techStack = [
  { name: 'Python',           logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++',              logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'TypeScript',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'PyTorch',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'LangChain',        logo: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4' },
  { name: 'LangGraph',        logo: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4' },
  { name: 'Scikit-Learn',     logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
  { name: 'Power BI',         logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
  { name: 'Git',              logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub',           logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Jupyter',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
  { name: 'NumPy',            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Pandas',           logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'SQL / DBMS',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'VS Code',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Next.js',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Groq API',         logo: 'https://avatars.githubusercontent.com/u/145992193?s=200&v=4' },
  { name: 'Agentic AI',       logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='bg' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23a855f7'/%3E%3Cstop offset='100%25' stop-color='%234f46e5'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='32' fill='url(%23bg)' opacity='0.15'/%3E%3Ccircle cx='32' cy='20' r='4' fill='%23a855f7'/%3E%3Ccircle cx='18' cy='30' r='4' fill='%23818cf8'/%3E%3Ccircle cx='46' cy='30' r='4' fill='%23818cf8'/%3E%3Ccircle cx='24' cy='44' r='4' fill='%2306b6d4'/%3E%3Ccircle cx='40' cy='44' r='4' fill='%2306b6d4'/%3E%3Ccircle cx='32' cy='36' r='5' fill='%23fff' opacity='0.9'/%3E%3Cline x1='32' y1='24' x2='32' y2='31' stroke='%23a855f7' stroke-width='1.5'/%3E%3Cline x1='22' y1='30' x2='27' y2='34' stroke='%23818cf8' stroke-width='1.5'/%3E%3Cline x1='42' y1='30' x2='37' y2='34' stroke='%23818cf8' stroke-width='1.5'/%3E%3Cline x1='28' y1='40' x2='28' y2='44' stroke='%2306b6d4' stroke-width='1.5'/%3E%3Cline x1='36' y1='40' x2='36' y2='44' stroke='%2306b6d4' stroke-width='1.5'/%3E%3C/svg%3E" },
];

const globalStyle = `
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.clay-track-left {
  display: flex;
  width: max-content;
  will-change: transform;
  transform: translateZ(0);
  animation: marquee-left 42s linear infinite;
}
.clay-track-right {
  display: flex;
  width: max-content;
  will-change: transform;
  transform: translateZ(0);
  animation: marquee-right 38s linear infinite;
}
.clay-track-left:hover,
.clay-track-right:hover {
  animation-play-state: paused;
}
.clay-skill-card {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  user-select: none;
  background: var(--clay-surface);
  border: 1px solid var(--clay-border);
  transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
              box-shadow 0.28s ease;
}
.clay-skill-card:hover {
  transform: scale(1.08) translateY(-5px);
}
.clay-skill-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
  transition: transform 0.28s ease;
  position: relative;
  z-index: 2;
}
.clay-skill-card:hover .clay-skill-logo {
  transform: scale(1.12) rotate(-4deg);
}
.clay-skill-name {
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
  padding: 0 10px;
  line-height: 1.2;
  letter-spacing: 0.03em;
  color: rgba(226,232,240,0.85);
  position: relative;
  z-index: 2;
}
`;

export default function TechStackCarousel() {
  const styleRef = useRef(false);

  useEffect(() => {
    if (styleRef.current) return;
    styleRef.current = true;
    const el = document.createElement('style');
    el.textContent = globalStyle;
    document.head.appendChild(el);
  }, []);

  const half = Math.ceil(techStack.length / 2);
  const row1 = [...techStack.slice(0, half), ...techStack.slice(0, half)];
  const row2 = [...techStack.slice(half), ...techStack.slice(half)];

  return (
    <section id="skills" style={{
      padding: '8rem 0 6rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '5%',
        width: 450, height: 450, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', position: 'relative', zIndex: 10 }}>
        <span style={{
          fontSize: '0.78rem', fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#00d4ff',
        }}>Tech Stack</span>
        <h2 style={{
          fontFamily: "'Outfit'", fontSize: 'clamp(3rem, 9vw, 7.5rem)',
          fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
          textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0 1rem',
        }}>
          SKILLS &amp; TOOLS
        </h2>
        <p style={{ color: 'rgba(226,232,240,0.45)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Technologies I work with
        </p>
      </div>

      {/* Edge fades */}
      {['left','right'].map(side => (
        <div key={side} style={{
          position: 'absolute', top: 0, bottom: 0, [side]: 0,
          width: 130,
          background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, var(--clay-bg) 0%, transparent 100%)`,
          zIndex: 5, pointerEvents: 'none',
        }} />
      ))}

      {/* Row 1 → left */}
      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 4, paddingBottom: '1.2rem' }}>
        <div className="clay-track-left">
          {row1.map((tech, i) => {
            const accent = accentColors[i % accentColors.length];
            return (
              <div
                key={`r1-${tech.name}-${i}`}
                className="clay-skill-card"
                style={{
                  boxShadow: `6px 6px 20px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02), 0 0 0 0.5px ${accent}20`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `8px 8px 28px rgba(0,0,0,0.6), -4px -4px 14px rgba(255,255,255,0.03), 0 0 20px ${accent}30`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `6px 6px 20px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02), 0 0 0 0.5px ${accent}20`;
                }}
              >
                <img src={tech.logo} alt={tech.name} className="clay-skill-logo" loading="lazy"
                  onError={e => { e.currentTarget.style.opacity = '0.3'; }} />
                <span className="clay-skill-name">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2 → right */}
      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 4, paddingTop: '0.4rem' }}>
        <div className="clay-track-right">
          {row2.map((tech, i) => {
            const accent = accentColors[(i + 4) % accentColors.length];
            return (
              <div
                key={`r2-${tech.name}-${i}`}
                className="clay-skill-card"
                style={{
                  boxShadow: `6px 6px 20px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02), 0 0 0 0.5px ${accent}20`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `8px 8px 28px rgba(0,0,0,0.6), -4px -4px 14px rgba(255,255,255,0.03), 0 0 20px ${accent}30`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `6px 6px 20px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02), 0 0 0 0.5px ${accent}20`;
                }}
              >
                <img src={tech.logo} alt={tech.name} className="clay-skill-logo" loading="lazy"
                  onError={e => { e.currentTarget.style.opacity = '0.3'; }} />
                <span className="clay-skill-name">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom skill pills */}
      <div style={{
        marginTop: '3.5rem',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '0.8rem',
        padding: '0 2rem',
        position: 'relative', zIndex: 10,
      }}>
        {[...portfolioData.skills.languages, ...portfolioData.skills.tools].map((skill) => (
          <span key={skill} style={{
            padding: '0.45rem 1.1rem',
            background: 'var(--clay-surface)',
            border: '1px solid var(--clay-border)',
            borderRadius: '100px',
            fontSize: '0.8rem',
            color: 'rgba(226,232,240,0.8)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            boxShadow: 'var(--clay-shadow-sm)',
          }}>{skill}</span>
        ))}
      </div>
    </section>
  );
}
