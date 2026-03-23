import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

/* ── Dark clay accent tints per card ── */
const CLAY_TINTS = [
  { accent: '#a855f7', shadow: 'rgba(168,85,247,0.2)', tag: '#c084fc', num: '#a855f7' },
  { accent: '#818cf8', shadow: 'rgba(129,140,248,0.2)', tag: '#a5b4fc', num: '#818cf8' },
  { accent: '#06b6d4', shadow: 'rgba(6,182,212,0.2)',   tag: '#67e8f9', num: '#22d3ee' },
];

const TECH_LIST = [
  'Python','TensorFlow','Scikit-Learn','React','C++','Java',
  'Git','SQL','Power BI','Jupyter','VS Code','GitHub',
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px', amount: 0.1 });
  const { projects } = portfolioData;

  return (
    <section id="projects" ref={ref} style={{ padding: '6rem 0', position: 'relative' }}>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 50% at 20% 40%, rgba(168,85,247,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 80% 70%, rgba(129,140,248,0.04) 0%, transparent 70%)
        `,
      }} />

      <div style={{ padding: '0 3rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0 }}
          style={{ fontFamily: "'Outfit'", fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a855f7', marginBottom: '0.8rem', textAlign: 'center' }}
        >
          ✦ My Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily: "'Outfit'", fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
            textTransform: 'uppercase', color: '#fff', margin: '0 0 3rem', textAlign: 'center',
          }}
        >
          PROJECTS
        </motion.h2>
      </div>

      {/* Tech marquee strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.1, delay: 0.15 }}
        style={{
          overflow: 'hidden',
          borderTop: '1px solid rgba(168,85,247,0.15)',
          borderBottom: '1px solid rgba(168,85,247,0.15)',
          background: 'rgba(168,85,247,0.03)',
          padding: '0.85rem 0',
          marginBottom: '3rem',
          position: 'relative',
        }}
      >
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'100px', zIndex:2, background:'linear-gradient(90deg, var(--clay-bg) 0%, transparent 100%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'100px', zIndex:2, background:'linear-gradient(270deg, var(--clay-bg) 0%, transparent 100%)', pointerEvents:'none' }} />
        <div style={{ display:'flex', animation:'techMarquee 24s linear infinite', width:'max-content', willChange: 'transform', transform: 'translateZ(0)' }}>
          {[...TECH_LIST, ...TECH_LIST].map((t, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'1.6rem', padding:'0 2rem', borderRight:'1px solid rgba(168,85,247,0.12)', whiteSpace:'nowrap' }}>
              <span style={{ fontSize:'0.8rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.65)' }}>{t}</span>
              <span style={{ color:'#a855f7', fontSize:'0.55rem' }}>✦</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Clay project cards */}
      <div style={{ padding: '0 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.6rem',
        }}>
          {projects.map((project, i) => {
            const tint = CLAY_TINTS[i % CLAY_TINTS.length];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1.2, delay: 0.1 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  cursor: 'pointer',
                  background: 'var(--clay-surface)',
                  border: '1px solid var(--clay-border)',
                  boxShadow: `8px 8px 28px rgba(0,0,0,0.5), -4px -4px 12px rgba(255,255,255,0.02), 0 0 0 0.5px ${tint.shadow}`,
                  transition: 'box-shadow 0.35s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `12px 12px 36px rgba(0,0,0,0.6), -5px -5px 16px rgba(255,255,255,0.03), 0 0 24px ${tint.shadow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `8px 8px 28px rgba(0,0,0,0.5), -4px -4px 12px rgba(255,255,255,0.02), 0 0 0 0.5px ${tint.shadow}`;
                }}
              >
                {/* Accent blob */}
                <div style={{
                  position: 'absolute', top: '-40px', right: '-40px',
                  width: '200px', height: '200px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${tint.shadow.replace('0.2', '0.08')} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{
                  position: 'absolute', top: '1.5rem', left: '1.5rem',
                  fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: tint.num, opacity: 0.6,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{
                    fontFamily: "'Outfit'",
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.65rem',
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.8, marginBottom: '1.25rem', maxWidth: '380px',
                  }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.4rem' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{
                        padding: '0.26rem 0.72rem',
                        borderRadius: '100px',
                        background: 'var(--clay-surface-2)',
                        border: '1px solid var(--clay-border)',
                        fontSize: '0.72rem', color: tint.tag, fontWeight: 700,
                        letterSpacing: '0.03em',
                        boxShadow: '2px 2px 6px rgba(0,0,0,0.3), -1px -1px 4px rgba(255,255,255,0.01)',
                      }}>{t}</span>
                    ))}
                  </div>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-clay-btn"
                      style={{ '--btn-accent': tint.accent, '--btn-shadow': tint.shadow }}
                    >
                      ⬡ View on GitHub →
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes techMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .project-clay-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.3rem;
          border-radius: 100px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.14);
          color: var(--btn-accent, #c084fc);
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
          box-shadow: 0 3px 16px rgba(0,0,0,0.2),
                      0 1px 2px rgba(255,255,255,0.08) inset;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.2s ease,
                      border-color 0.3s ease;
        }
        .project-clay-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 200%; height: 100%;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.1) 55%, transparent 65%);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .project-clay-btn:hover::before {
          left: 100%;
        }
        .project-clay-btn:hover {
          transform: scale(1.06) translateY(-2px);
          box-shadow: 0 5px 24px rgba(0,0,0,0.3), 0 0 20px var(--btn-shadow, rgba(168,85,247,0.15)),
                      0 1px 3px rgba(255,255,255,0.12) inset;
          border-color: rgba(255,255,255,0.25);
        }
      `}</style>
    </section>
  );
}
