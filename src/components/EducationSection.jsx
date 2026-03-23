import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ACCENTS = ['#06b6d4', '#818cf8', '#a855f7'];

/* ── Animated counter that counts up when visible ── */
function AnimatedGrade({ text, inView }) {
  const [display, setDisplay] = useState(text);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const match = text.match(/([\d.]+)/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const isDecimal = match[1].includes('.');
    const prefix = text.slice(0, match.index);
    const suffix = text.slice(match.index + match[1].length);
    const duration = 1200;
    const start = performance.now();
    let raf;

    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      const val = ease * target;
      setDisplay(prefix + (isDecimal ? val.toFixed(2) : Math.round(val)) + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, text]);

  return <span>{display}</span>;
}

export default function EducationSection() {
  const { education: rawEducation } = portfolioData;
  const education = [...rawEducation].reverse(); // oldest → newest (left → right)
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [hoveredId, setHoveredId] = useState(null);

  // Extract short year labels from periods like "Aug '23 – Present" → "'23"
  const yearLabels = education.map(edu => {
    const m = edu.period.match(/'(\d{2})/);
    return m ? `20${m[1]}` : '';
  });

  return (
    <section id="education" style={{ padding: '8rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.04) 0%, transparent 60%)',
      }} />

      <div className="section-container" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          <span style={{
            fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#06b6d4',
          }}>
            ✦ Academic Journey
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily: "'Outfit'", fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
            textTransform: 'uppercase', color: '#fff', margin: '0 0 5rem',
            textAlign: 'center',
          }}
        >
          EDUCATION
        </motion.h2>

        {/* ── Horizontal Timeline ─────────────────────── */}
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>

          {/* === TOP ROW: cards that go ABOVE the line (index 0, 2) === */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingBottom: '0px', minHeight: '210px',
            position: 'relative',
          }}>
            {education.map((edu, i) => {
              const isAbove = i % 2 === 0;
              if (!isAbove) return <div key={edu.id} style={{ flex: '1 1 0', maxWidth: '380px' }} />;
              return (
                <div key={edu.id} style={{
                  flex: '1 1 0', maxWidth: '380px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'flex-end',
                }}>
                  <EducationCard
                    edu={edu} accent={ACCENTS[i]} inView={inView}
                    isHovered={hoveredId === edu.id}
                    onEnter={() => setHoveredId(edu.id)}
                    onLeave={() => setHoveredId(null)}
                    direction="above"
                    delay={0.3 + i * 0.2}
                  />
                  {/* Connector line from card to dot */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
                    style={{
                      width: '2px', height: '32px',
                      background: `linear-gradient(to bottom, ${ACCENTS[i]}40, ${ACCENTS[i]})`,
                      transformOrigin: 'top',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* === TIMELINE BAR with dots & year labels === */}
          <div style={{ position: 'relative', height: '50px' }}>
            {/* Main line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
              style={{
                position: 'absolute',
                top: '12px',
                left: 0, right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #06b6d4, #818cf8, #a855f7)',
                transformOrigin: 'left',
                borderRadius: '2px',
                boxShadow: '0 0 12px rgba(6,182,212,0.3), 0 0 24px rgba(129,140,248,0.15)',
              }}
            />

            {/* Arrow left — SCHOOL label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                position: 'absolute', left: '-60px', top: '4px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
              }}>←</span>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
              }}>SCHOOL</span>
            </motion.div>

            {/* Arrow right — COLLEGE label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              style={{
                position: 'absolute', right: '-70px', top: '4px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase',
              }}>COLLEGE</span>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
              }}>→</span>
            </motion.div>

            {/* Dots + year labels */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              display: 'flex', justifyContent: 'space-between',
            }}>
              {education.map((edu, i) => {
                const isHovered = hoveredId === edu.id;
                return (
                  <div key={edu.id} style={{
                    flex: '1 1 0', maxWidth: '380px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    {/* Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.15, type: 'spring' }}
                      style={{
                        width: '22px', height: '22px',
                        borderRadius: '50%',
                        background: ACCENTS[i],
                        border: '4px solid var(--clay-bg)',
                        boxShadow: `0 0 14px ${ACCENTS[i]}60, 0 0 6px ${ACCENTS[i]}40`,
                        flexShrink: 0,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                        zIndex: 5,
                        position: 'relative',
                      }}
                    />
                    {/* Year label */}
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 700,
                      color: ACCENTS[i], letterSpacing: '0.06em',
                      marginTop: '8px',
                    }}>
                      {yearLabels[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* === BOTTOM ROW: cards that go BELOW the line (index 1) === */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingTop: '0px', minHeight: '210px',
            position: 'relative',
          }}>
            {education.map((edu, i) => {
              const isBelow = i % 2 !== 0;
              if (!isBelow) return <div key={edu.id} style={{ flex: '1 1 0', maxWidth: '380px' }} />;
              return (
                <div key={edu.id} style={{
                  flex: '1 1 0', maxWidth: '380px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'flex-start',
                }}>
                  {/* Connector line from dot to card */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
                    style={{
                      width: '2px', height: '32px',
                      background: `linear-gradient(to bottom, ${ACCENTS[i]}, ${ACCENTS[i]}40)`,
                      transformOrigin: 'top',
                    }}
                  />
                  <EducationCard
                    edu={edu} accent={ACCENTS[i]} inView={inView}
                    isHovered={hoveredId === edu.id}
                    onEnter={() => setHoveredId(edu.id)}
                    onLeave={() => setHoveredId(null)}
                    direction="below"
                    delay={0.3 + i * 0.2}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive: stack vertically on mobile */}
      <style>{`
        @media (max-width: 768px) {
          /* Stack timeline vertically */
          #education .section-container > div:last-child {
            max-width: 100% !important;
          }

          /* Top/bottom card rows → vertical stack */
          #education .section-container > div:last-child > div:first-child,
          #education .section-container > div:last-child > div:last-child {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1rem;
            min-height: auto !important;
          }

          /* Timeline bar → vertical line */
          #education .section-container > div:last-child > div:nth-child(2) {
            display: none !important;
          }

          /* All card containers full width */
          #education .section-container > div:last-child > div > div {
            max-width: 100% !important;
            width: 100% !important;
          }

          /* Cards full width on mobile */
          #education [style*="maxWidth: '350px'"],
          #education [style*="max-width"] {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Glass card component ── */
function EducationCard({ edu, accent, inView, isHovered, onEnter, onLeave, direction, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'above' ? -30 : 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: direction === 'above' ? -30 : 30 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        padding: '1.5rem 1.6rem',
        borderRadius: '16px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '350px',
        /* Frosted glass */
        background: isHovered
          ? `linear-gradient(135deg, ${accent}20 0%, ${accent}0d 100%)`
          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isHovered
          ? `1px solid ${accent}55`
          : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isHovered
          ? `0 8px 32px ${accent}25, 0 0 16px ${accent}12, inset 0 1px 1px rgba(255,255,255,0.1)`
          : '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.06)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        transform: isHovered
          ? `translateY(${direction === 'above' ? '-6' : '6'}px) scale(1.03)`
          : 'translateY(0) scale(1)',
      }}
    >
      {/* Shine sweep */}
      <div style={{
        position: 'absolute', top: 0,
        left: isHovered ? '100%' : '-100%',
        width: '200%', height: '100%',
        background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0.1) 55%, transparent 65%)',
        transition: 'left 0.6s ease',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{edu.icon}</span>
          <h3 style={{
            margin: 0, fontSize: '0.92rem', fontWeight: 700,
            color: '#fff', lineHeight: 1.3,
          }}>
            {edu.institution}
          </h3>
        </div>

        <p style={{
          margin: '0 0 0.2rem', fontSize: '0.82rem',
          color: 'rgba(226,232,240,0.6)', fontWeight: 500,
        }}>
          {edu.degree}{edu.field ? ` — ${edu.field}` : ''}
        </p>

        <p style={{
          margin: '0 0 0.2rem', fontSize: '0.72rem',
          color: 'rgba(226,232,240,0.35)',
        }}>
          {edu.period}
        </p>

        <p style={{
          margin: '0 0 0.5rem', fontSize: '0.72rem',
          color: 'rgba(226,232,240,0.35)',
        }}>
          📍 {edu.location}
        </p>

        <div style={{
          display: 'inline-flex', padding: '0.25rem 0.7rem',
          borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700,
          color: accent,
          background: `${accent}12`,
          border: `1px solid ${accent}22`,
        }}>
          ⭐ <AnimatedGrade text={edu.grade} inView={inView} />
        </div>
      </div>
    </motion.div>
  );
}
