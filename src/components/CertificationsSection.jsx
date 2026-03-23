import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

function FlipCard({ cert, index, inView }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1.1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: '1200px', height: '340px', cursor: 'pointer' }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          borderRadius: '24px',
          background: 'var(--clay-surface)',
          border: '1px solid var(--clay-border)',
          padding: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          overflow: 'hidden',
          boxShadow: `6px 6px 24px rgba(0,0,0,0.5), -3px -3px 12px rgba(255,255,255,0.02), 0 0 0 0.5px ${cert.color}20`,
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '130px', height: '130px',
            background: `radial-gradient(circle at top right, ${cert.color}12, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute', top: '1rem', right: '1rem',
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: `rgba(255,255,255,0.3)`,
          }}>
            Hover to view ↻
          </div>

          <div style={{
            width: '58px', height: '58px', borderRadius: '18px',
            background: `${cert.color}15`,
            border: '1px solid var(--clay-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.9rem', flexShrink: 0,
            boxShadow: `3px 3px 10px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.02)`,
          }}>
            {cert.icon}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 800, color: '#fff', lineHeight: 1.25 }}>{cert.name}</h3>
            <p style={{ margin: 0, fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{cert.provider}</p>
          </div>

          <div style={{
            alignSelf: 'flex-start', padding: '0.25rem 0.75rem',
            background: `${cert.color}12`, border: '1px solid var(--clay-border)',
            borderRadius: '100px', fontSize: '0.72rem', color: cert.color,
            fontWeight: 700, letterSpacing: '0.04em',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.3), -1px -1px 4px rgba(255,255,255,0.01)',
          }}>
            {cert.date}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {[
              { href: cert.url, label: '🔗 View', target: '_blank' },
              { href: cert.image, label: '⬇ Download', download: `${cert.provider.replace(/\s/g,'_')}_Certificate.png` },
            ].map((btn, bi) => (
              <a
                key={bi}
                href={btn.href}
                target={btn.target}
                download={btn.download}
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
                  padding: '0.45rem 0', borderRadius: '100px',
                  background: `rgba(255,255,255,0.06)`, border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  color: cert.color, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.06) inset',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: `8px 8px 32px rgba(0,0,0,0.6), -4px -4px 14px rgba(255,255,255,0.02)`,
          border: '1px solid var(--clay-border)',
        }}>
          <img src={cert.image} alt={cert.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '1rem',
            background: 'linear-gradient(0deg, rgba(11,11,20,0.95) 0%, transparent 100%)',
            display: 'flex', gap: '0.6rem',
          }}>
            <a href={cert.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="btn-clay"
              style={{ flex: 1, justifyContent: 'center', padding: '0.5rem 0', fontSize: '0.78rem' }}
            >
              🔗 View Certificate
            </a>
            <a href={cert.image} download={`${cert.provider.replace(/\s/g,'_')}_Certificate.png`}
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0.5rem 1rem', borderRadius: '100px',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: '#fff', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.06) inset',
                transition: 'transform 0.2s, border-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
            >
              ⬇
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const { certifications } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px', amount: 0.1 });

  return (
    <section id="certifications" style={{ padding: '6rem 3rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0 }}
          style={{ fontFamily: "'Outfit'", fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a855f7', marginBottom: '0.8rem', textAlign: 'center' }}
        >
          ✦ Credentials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily: "'Outfit'", fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
            textTransform: 'uppercase', color: '#fff', margin: '0 0 3.5rem', textAlign: 'center',
          }}
        >
          CERTIFICATIONS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem', marginBottom: '2.5rem', letterSpacing: '0.04em', textAlign: 'center' }}
        >
          Hover over a card to see the certificate ↻
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {certifications.map((cert, i) => (
            <FlipCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
