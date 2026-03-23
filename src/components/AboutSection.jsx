import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Dark clay decorative shapes
const CLAY_DECO = [
  {
    id: 'blob1',
    style: { top: '10%', left: '3%' },
    element: (
      <div style={{
        width: '80px', height: '80px',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        background: 'linear-gradient(135deg, #818cf8, #6366f1)',
        boxShadow: '6px 6px 18px rgba(129,140,248,0.25), -3px -3px 10px rgba(255,255,255,0.02)',
        animation: 'floatA 6s ease-in-out infinite',
      }} />
    ),
  },
  {
    id: 'blob2',
    style: { top: '12%', right: '2%' },
    element: (
      <div style={{
        width: '90px', height: '90px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        boxShadow: '6px 6px 18px rgba(6,182,212,0.25), -3px -3px 10px rgba(255,255,255,0.02)',
        animation: 'floatB 8s ease-in-out infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '50px', height: '50px',
          borderRadius: '50%',
          background: 'var(--clay-bg)',
          boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.3), inset -2px -2px 6px rgba(255,255,255,0.02)',
        }} />
      </div>
    ),
  },
  {
    id: 'blob3',
    style: { bottom: '18%', left: '2%' },
    element: (
      <div style={{
        width: '60px', height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        boxShadow: '5px 5px 14px rgba(245,158,11,0.2), -3px -3px 8px rgba(255,255,255,0.02)',
        animation: 'floatC 7s ease-in-out infinite',
      }} />
    ),
  },
  {
    id: 'blob4',
    style: { bottom: '20%', right: '3%' },
    element: (
      <div style={{
        width: '64px', height: '64px',
        borderRadius: '22px',
        background: 'linear-gradient(135deg, #ec4899, #db2777)',
        boxShadow: '5px 5px 14px rgba(236,72,153,0.2), -3px -3px 8px rgba(255,255,255,0.02)',
        animation: 'floatA 9s ease-in-out infinite',
        transform: 'rotate(15deg)',
      }} />
    ),
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px', amount: 0.15 });

  return (
    <section id="about" ref={ref} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>

      {CLAY_DECO.map(({ id, style, element }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ position: 'absolute', zIndex: 1, ...style }}
        >
          {element}
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.0, delay: 0.1 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: '#a855f7',
          marginBottom: '1.5rem', position: 'relative', zIndex: 5,
        }}
      >
        ✦ Who I Am
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(4rem, 12vw, 9.5rem)',
          fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.85,
          textTransform: 'uppercase', color: '#ffffff',
          margin: '0 0 3rem 0', position: 'relative', zIndex: 5,
        }}
      >
        ABOUT<br />
        <span style={{
          background: 'linear-gradient(130deg, #c084fc 0%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>ME</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(255,255,255,0.55)', lineHeight: 1.85,
          maxWidth: '640px', margin: '0 auto 1.8rem',
          position: 'relative', zIndex: 5,
        }}
      >
        I'm a Computer Science Engineering student at LPU with a CGPA of 8.07,
        passionate about Machine Learning, AI, and full-stack development.
        My expertise spans Python, ML frameworks, and web technologies.
        I thrive on building applications that are both technically sound and user-centric —
        always aiming for clean, impactful, and maintainable code.
      </motion.p>

      {/* Info pills — dark clay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.1, delay: 0.4 }}
        style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
          justifyContent: 'center', marginBottom: '2.5rem',
          position: 'relative', zIndex: 5,
        }}
      >
        {[
          ['🎓', 'B.Tech CSE, LPU'],
          ['📍', 'Guntur, AP, India'],
          ['💡', 'ML · AI · Full-Stack Dev'],
          ['✉️', 'meherpra5@gmail.com'],
        ].map(([icon, text]) => (
          <div key={text} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1.1rem', borderRadius: '100px',
            background: 'var(--clay-surface)',
            border: '1px solid var(--clay-border)',
            fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)',
            boxShadow: 'var(--clay-shadow-sm)',
          }}>
            {icon} {text}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.0, delay: 0.5 }}
        style={{ position: 'relative', zIndex: 5 }}
      >
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="btn-clay"
          style={{ padding: '0.9rem 2rem', fontSize: '0.95rem', letterSpacing: '0.08em' }}
        >
          CONTACT ME ✦
        </a>
      </motion.div>

      <style>{`
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-18px) rotate(8deg);} }
        @keyframes floatB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-22px);} }
        @keyframes floatC { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-14px) scale(1.08);} }
      `}</style>
    </section>
  );
}
