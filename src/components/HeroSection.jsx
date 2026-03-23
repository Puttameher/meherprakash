import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

/* ── Count-up glass card ───────────────────────── */
function CountUpCard({ target, suffix = '', label }) {
  const [display, setDisplay] = useState('0');
  const [hovered, setHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const animRef = useRef(null);
  const cardRef = useRef(null);

  const animate = useCallback(() => {
    const isDecimal = target.includes('.');
    const hasSuffix = target.endsWith('+');
    const numericStr = hasSuffix ? target.slice(0, -1) : target;
    const end = parseFloat(numericStr);
    const duration = 1400; // ms
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * end;

      let formatted;
      if (isDecimal) {
        formatted = current.toFixed(2);
      } else {
        formatted = Math.round(current).toString();
      }
      if (hasSuffix) formatted += '+';
      setDisplay(formatted);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
  }, [target]);

  // Auto-trigger count-up when card scrolls into view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, hasAnimated]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.2rem 1.6rem',
        minWidth: '90px',
        borderRadius: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        /* ── Frosted glass ── */
        background: hovered
          ? 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(129,140,248,0.12) 50%, rgba(6,182,212,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(129,140,248,0.06) 50%, rgba(6,182,212,0.04) 100%)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: hovered
          ? '1px solid rgba(192,132,252,0.45)'
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow: hovered
          ? '0 8px 32px rgba(168,85,247,0.3), 0 0 20px rgba(129,140,248,0.15), inset 0 1px 1px rgba(255,255,255,0.15)'
          : '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.08)',
        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        transform: hovered ? 'translateY(-6px) scale(1.08)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Shine sweep on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: hovered ? '100%' : '-100%',
        width: '200%', height: '100%',
        background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 55%, transparent 65%)',
        transition: 'left 0.6s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        fontSize: '1.6rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #c084fc, #818cf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', lineHeight: 1,
        position: 'relative', zIndex: 1,
      }}>{display}</div>
      <div style={{
        fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)',
        fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', marginTop: '6px',
        position: 'relative', zIndex: 1,
      }}>{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '7rem 3rem 5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Soft ambient blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', left: '-10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Centered full-width headline ────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
        style={{ textAlign: 'center', marginBottom: '4rem', willChange: 'transform, opacity' }}
      >
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(2.8rem, 7vw, 8rem)',
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: '-0.035em',
          margin: 0,
          color: '#fff',
          textTransform: 'uppercase',
        }}>
          HI, I'M<br />
          <span style={{
            background: 'linear-gradient(130deg, #ffffff 0%, #c084fc 45%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            PUTTA<br />MEHER PRAKASH
          </span>
        </h1>
      </motion.div>

      {/* ── Bottom row: bio left + CTA right ─────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        {/* Left: tagline + bio */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
          style={{ maxWidth: '480px', willChange: 'transform, opacity' }}
        >
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: '0.9rem',
          }}>
            ML Developer · CS Engineer · AI Enthusiast 🚀
          </p>
          <p style={{
            fontSize: 'clamp(0.88rem, 1.4vw, 1rem)',
            color: 'rgba(255,255,255,0.35)',
            lineHeight: 1.8,
            margin: 0,
          }}>
            Building intelligent systems and full-stack applications at the
            intersection of Machine Learning and Software Engineering.
            B.Tech CSE at LPU · CGPA 8.07
          </p>

          {/* Stats — glassy count-up cards */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
            <CountUpCard target="3+" label="Projects" />
            <CountUpCard target="4" label="Certs" />
            <CountUpCard target="8.07" label="CGPA" />
          </div>
        </motion.div>

        {/* Right: buttons */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', willChange: 'transform, opacity' }}
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-cta-btn"
          >
            CONTACT ME ✦
          </a>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            VIEW PROJECTS ↓
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '3rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          color: 'rgba(255,255,255,0.18)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase',
        }}
      >
        <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.div>
        SCROLL
      </motion.div>

      <style>{`
        .hero-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.2rem;
          border-radius: 100px;
          background: linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(129,140,248,0.2) 50%, rgba(6,182,212,0.15) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 30px rgba(168,85,247,0.25),
                      0 1px 3px rgba(255,255,255,0.12) inset,
                      0 -1px 3px rgba(0,0,0,0.2) inset;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .hero-cta-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 200%; height: 100%;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 65%);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .hero-cta-btn:hover::before {
          left: 100%;
        }
        .hero-cta-btn:hover {
          transform: scale(1.08) translateY(-3px);
          box-shadow: 0 8px 40px rgba(168,85,247,0.4),
                      0 0 24px rgba(129,140,248,0.2),
                      0 1px 4px rgba(255,255,255,0.18) inset;
          border-color: rgba(255,255,255,0.35);
        }
        @media (max-width: 768px) {
          #hero { padding: 6rem 1.5rem 4rem; }
        }
      `}</style>
    </section>
  );
}
