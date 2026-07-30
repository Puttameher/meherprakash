import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

/* ── Dark clay accent tints per card ── */
const CLAY_TINTS = [
  { accent: '#a855f7', shadow: 'rgba(168,85,247,0.2)', tag: '#c084fc', num: '#a855f7' },
  { accent: '#818cf8', shadow: 'rgba(129,140,248,0.2)', tag: '#a5b4fc', num: '#818cf8' },
  { accent: '#06b6d4', shadow: 'rgba(6,182,212,0.2)',   tag: '#67e8f9', num: '#22d3ee' },
];

const TECH_LIST = [
  'Python','LangChain','LangGraph','PyTorch','Scikit-Learn','C++',
  'Agentic AI','Groq API','Power BI','Jupyter','VS Code','GitHub','TypeScript','SQL',
];

function ProjectCard({ project, i, inView, tint }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        animation: inView ? `cardFlipIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards ${0.1 + i * 0.15}s` : 'none',
        height: '100%',
        minHeight: '520px',
        perspective: '1200px'
      }}
    >
      <div
        className="project-tilt-wrapper"
        onMouseMove={e => {
          if (isFlipped) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
          const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
          e.currentTarget.style.setProperty('--rx', `${rotateX}deg`);
          e.currentTarget.style.setProperty('--ry', `${rotateY}deg`);
        }}
        onMouseLeave={e => {
          e.currentTarget.style.setProperty('--rx', '0deg');
          e.currentTarget.style.setProperty('--ry', '0deg');
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`project-flipper ${isFlipped ? 'is-flipped' : ''}`}>
          
          {/* FRONT */}
          <div className="project-glass-card front-face" style={{ '--hover-glow': tint.shadow.replace('0.2', '0.3') }}>
            <div className="glass-noise" />
            
            {/* Top Half: Image and Pill */}
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '200px',
              flexShrink: 0,
              overflow: 'hidden', 
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              {project.image && (
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              
              {/* Specular wash on top of image */}
              <div className="glass-highlight" />

              {/* 03 Pill style */}
              <div style={{
                position: 'absolute', top: '1.2rem', left: '1.2rem',
                padding: '0.4rem 0.8rem',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em',
                color: '#fff', zIndex: 2
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Bottom Half: Text Content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* Accent blob moved behind text */}
              <div style={{
                position: 'absolute', top: '0', right: '0',
                width: '150px', height: '150px', borderRadius: '50%',
                background: `radial-gradient(circle, ${tint.shadow.replace('0.2', '0.06')} 0%, transparent 70%)`,
                pointerEvents: 'none',
                transform: 'translate(30%, -30%)'
              }} />

              <h3 style={{
                fontFamily: "'Outfit'",
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '0.65rem',
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7, marginBottom: '1rem',
                display: '-webkit-box', WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.4rem', marginTop: 'auto' }}>
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

              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-clay-btn"
                    style={{ '--btn-accent': tint.accent, '--btn-shadow': tint.shadow }}
                    onClick={e => e.stopPropagation()}
                  >
                    ⬡ GitHub →
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-clay-btn"
                    style={{ '--btn-accent': '#10b981', '--btn-shadow': 'rgba(16,185,129,0.2)' }}
                    onClick={e => e.stopPropagation()}
                  >
                    ⬡ Live Demo →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="project-glass-card back-face" style={{ '--hover-glow': tint.shadow.replace('0.2', '0.3') }}>
            <div className="glass-noise" />
            {/* Accent blob on back */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: `radial-gradient(circle, ${tint.shadow.replace('0.2', '0.1')} 0%, transparent 70%)`,
              pointerEvents: 'none', zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                 <div>
                   <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: tint.tag, marginBottom: '0.4rem', opacity: 0.7 }}>Behind the Scenes</div>
                   <h3 style={{ fontFamily: "'Outfit'", fontSize: '1.3rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{project.title}</h3>
                 </div>
                 <div style={{ 
                   width: '36px', height: '36px', borderRadius: '50%',
                   background: `rgba(255,255,255,0.06)`,
                   border: `1px solid ${tint.accent}40`,
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   fontSize: '1rem', color: tint.accent, flexShrink: 0
                 }}>↩</div>
               </div>
               
               {project.details ? (
                 <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.65, flex: 1, overflowY: 'auto' }}>
                   <p style={{ fontWeight: 800, color: tint.tag, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>⬡ Core Architecture</p>
                   <ul style={{ paddingLeft: '1rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                     {project.details.whatItDoes.slice(0, 3).map((item, idx) => (
                       <li key={idx} style={{ listStyleType: 'disc' }}>{item}</li>
                     ))}
                   </ul>
                   <p style={{ fontWeight: 800, color: tint.tag, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>⬡ Key Highlights</p>
                   <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                     {project.details.keyHighlights.slice(0, 3).map((item, idx) => (
                       <li key={idx} style={{ listStyleType: 'disc' }}>{item}</li>
                     ))}
                   </ul>
                 </div>
               ) : (
                 <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.8, flex: 1 }}>
                   <p>Built with <strong style={{ color: '#fff' }}>{project.tech.join(', ')}</strong>.</p>
                   <p style={{ marginTop: '1rem' }}>This project emphasizes high-performance ML pipelines, clean architecture, and real-world impact through data-driven insights.</p>
                   <p style={{ marginTop: '1rem', opacity: 0.6 }}>Period: {project.period}</p>
                 </div>
               )}
               
               <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                 {project.github && (
                   <a href={project.github} target="_blank" rel="noopener noreferrer"
                     className="project-clay-btn"
                     style={{ '--btn-accent': tint.accent, '--btn-shadow': tint.shadow }}
                     onClick={e => e.stopPropagation()}>
                     ⬡ GitHub →
                   </a>
                 )}
                 {project.liveDemo && (
                   <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                     className="project-clay-btn"
                     style={{ '--btn-accent': '#10b981', '--btn-shadow': 'rgba(16,185,129,0.2)' }}
                     onClick={e => e.stopPropagation()}>
                     ⬡ Live Demo →
                   </a>
                 )}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

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
          gridAutoRows: '660px',
          gap: '1.6rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} inView={inView} tint={CLAY_TINTS[i % CLAY_TINTS.length]} />
          ))}
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

        /* Card Container (Base Shape & Physics) */
        .project-tilt-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          cursor: pointer;
          --rx: 0deg;
          --ry: 0deg;
          --s: 1;
          transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--s));
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .project-tilt-wrapper:hover {
          --s: 1.02;
        }
        .project-tilt-wrapper:active {
          --s: 0.95;
        }

        .project-flipper {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .project-flipper.is-flipped {
          transform: rotateY(180deg);
        }

        .project-glass-card {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          
          /* Liquid Glass Material */
          background: linear-gradient(145deg, rgba(30,30,40,0.65) 0%, rgba(15,15,22,0.55) 50%, rgba(20,20,30,0.6) 100%);
          backdrop-filter: blur(36px) saturate(190%) brightness(1.05);
          -webkit-backdrop-filter: blur(36px) saturate(190%) brightness(1.05);
          
          /* Luminous Edge Lighting */
          border: 1px solid rgba(255,255,255,0.18);
          border-top: 1px solid rgba(255,255,255,0.3);
          
          /* Multi-layer Shadow */
          box-shadow: 0 8px 24px -10px rgba(0,0,0,0.4), 0 0 10px rgba(0,0,0,0.05) inset, 0 0 0 0.5px rgba(255,255,255,0.05);
          transition: box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .project-tilt-wrapper:hover .project-glass-card {
          box-shadow: 0 15px 40px -15px rgba(0,0,0,0.5), 0 0 25px var(--hover-glow, rgba(255,255,255,0.05)), 0 0 0 1px rgba(255,255,255,0.1);
        }

        .back-face {
          transform: rotateY(180deg);
        }

        /* Layer 1: Tactile Noise Grain */
        .glass-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          opacity: 0.025;
          mix-blend-mode: overlay;
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }

        /* Layer 2: Specular Highlight Wash */
        .glass-highlight {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 45%;
          background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 35%, transparent 100%);
          pointer-events: none;
          border-top-left-radius: inherit;
          border-top-right-radius: inherit;
          z-index: 1;
        }

        /* Advanced Keyframe Animations */
        @keyframes cardFlipIn {
          0% { opacity: 0; transform: perspective(1200px) rotateY(90deg) scale(0.8); }
          50% { opacity: 1; transform: perspective(1200px) rotateY(-8deg) scale(1.02); }
          75% { transform: perspective(1200px) rotateY(3deg) scale(1); }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) scale(1); }
        }
      `}</style>
    </section>
  );
}
