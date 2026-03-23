import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const contactLinks = [
  { icon: '📧', label: 'Email', value: 'meherpra5@gmail.com', href: 'mailto:meherpra5@gmail.com', color: '#00d4ff' },
  { icon: '💼', label: 'LinkedIn', value: 'putta-meher-prakash', href: 'https://linkedin.com/in/putta-meher-prakash', color: '#0077b5' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/Puttameher', href: 'https://github.com/Puttameher', color: '#6e5494' },
  { icon: '📱', label: 'Phone', value: '+91 6304276594', href: 'tel:+916304276594', color: '#a855f7' },
];

const inputStyle = {
  width: '100%',
  padding: '0.85rem 1.2rem',
  background: 'var(--clay-surface-2)',
  border: '1px solid var(--clay-border)',
  borderRadius: '16px',
  color: '#e2e8f0',
  fontSize: '0.92rem',
  fontFamily: 'Outfit, Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
  boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.3), inset -2px -2px 6px rgba(255,255,255,0.02)',
};

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'b8551717-a1f6-436e-a9f5-accce7923aff',
          name: form.name, email: form.email, message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(''), 4000);
    }
  };

  const focusStyle = (field) => focused === field
    ? { borderColor: 'rgba(168,85,247,0.5)', boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.3), inset -2px -2px 6px rgba(255,255,255,0.02), 0 0 0 3px rgba(168,85,247,0.12)' }
    : {};

  return (
    <section id="contact" style={{ padding: '8rem 2rem 6rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 80%, rgba(99,102,241,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.3), rgba(168,85,247,0.3), transparent)',
      }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a855f7' }}>
            Let's Connect
          </span>
          <h2 style={{
            fontFamily: "'Outfit'", fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9,
            textTransform: 'uppercase', color: '#fff', margin: '0.5rem 0 3rem',
          }}>GET IN TOUCH</h2>
          <p style={{ fontSize: '1.05rem', color: 'rgba(226,232,240,0.6)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Whether it's a collaboration, opportunity, or just a hello — I'm always open to connecting!
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '3rem', alignItems: 'stretch',
        }} className="contact-grid">

          {/* Left: contact links + CV */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1.2, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.1rem 1.5rem',
                  background: 'var(--clay-surface)',
                  border: '1px solid var(--clay-border)',
                  borderRadius: '20px',
                  color: '#e2e8f0',
                  textDecoration: 'none', fontWeight: 500,
                  boxShadow: `5px 5px 18px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02)`,
                  transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(6px) translateY(-2px)';
                  e.currentTarget.style.boxShadow = `7px 7px 24px rgba(0,0,0,0.6), -4px -4px 14px rgba(255,255,255,0.03), 0 0 16px ${link.color}18`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = `5px 5px 18px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02)`;
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '14px',
                  background: `${link.color}15`, border: '1px solid var(--clay-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.15rem', flexShrink: 0,
                  boxShadow: `3px 3px 8px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.01)`,
                }}>
                  {link.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: link.color, marginBottom: '0.1rem' }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'rgba(226,232,240,0.85)' }}>{link.value}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'rgba(226,232,240,0.3)' }}>→</div>
              </motion.a>
            ))}

            {/* Download CV card */}
            <motion.a
              href="/cv.pdf"
              download="Putta_Meher_Prakash_CV.pdf"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.5 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1.2rem',
                padding: '1.4rem 1.8rem',
                background: 'var(--clay-surface)',
                border: '1px solid var(--clay-border)',
                borderRadius: '20px',
                textDecoration: 'none', flexGrow: 1,
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
                boxShadow: 'var(--clay-shadow-md)',
                transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(6px) translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--clay-shadow-lg)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'var(--clay-shadow-md)';
              }}
            >
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(0,212,255,0.1))',
                border: '1px solid rgba(168,85,247,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '3px 3px 10px rgba(0,0,0,0.3), -2px -2px 6px rgba(255,255,255,0.02)',
              }}>
                📄
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#a855f7', marginBottom: '0.2rem' }}>
                  Curriculum Vitae
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.15rem' }}>
                  Download My CV
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(226,232,240,0.45)' }}>
                  PDF · Updated 2025
                </div>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(168,85,247,0.15)',
                border: '1px solid rgba(168,85,247,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', color: '#c084fc', flexShrink: 0,
                boxShadow: '2px 2px 6px rgba(0,0,0,0.3), -1px -1px 4px rgba(255,255,255,0.01)',
              }}>
                ↓
              </div>
            </motion.a>
          </motion.div>

          {/* Right: Email form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{
              background: 'var(--clay-surface)',
              border: '1px solid var(--clay-border)',
              borderRadius: '24px',
              padding: '2.2rem',
              position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--clay-shadow-md)',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '60%', height: '40%',
              background: 'radial-gradient(ellipse at top left, rgba(0,212,255,0.04), transparent)',
              pointerEvents: 'none',
            }} />

            <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
              🚀 Send a Message
            </h3>
            <p style={{ margin: '0 0 1.6rem', fontSize: '0.85rem', color: 'rgba(226,232,240,0.5)', lineHeight: 1.6 }}>
              Fill in the form and I'll get back to you soon!
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(226,232,240,0.5)', marginBottom: '0.4rem' }}>
                  Your Name
                </label>
                <input name="name" type="text" placeholder="John Doe" value={form.name}
                  onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                  required style={{ ...inputStyle, ...focusStyle('name') }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(226,232,240,0.5)', marginBottom: '0.4rem' }}>
                  Your Email
                </label>
                <input name="email" type="email" placeholder="john@example.com" value={form.email}
                  onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                  required style={{ ...inputStyle, ...focusStyle('email') }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(226,232,240,0.5)', marginBottom: '0.4rem' }}>
                  Message
                </label>
                <textarea name="message" placeholder="Hey Meher, I'd love to collaborate on..." value={form.message}
                  onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  required rows={4}
                  style={{ ...inputStyle, ...focusStyle('message'), resize: 'vertical', minHeight: '110px' }}
                />
              </div>

              <button type="submit" className="btn-clay" disabled={status === 'sending'}
                style={{
                  width: '100%', justifyContent: 'center', padding: '0.9rem',
                  fontSize: '0.95rem', marginTop: '0.4rem', border: 'none', cursor: 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? '✅ Message Sent!' : status === 'error' ? '❌ Try Again' : 'Send Message →'}
              </button>
            </form>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: '1rem',
              marginTop: '1.5rem', paddingTop: '1.5rem',
              borderTop: '1px solid var(--clay-border)',
            }}>
              {[
                { href: 'https://linkedin.com/in/putta-meher-prakash', icon: '💼', label: 'LinkedIn' },
                { href: 'https://github.com/Puttameher', icon: '🐙', label: 'GitHub' },
                { href: 'mailto:meherpra5@gmail.com', icon: '📧', label: 'Email' },
              ].map((social) => (
                <a key={social.label} href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer" title={social.label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'var(--clay-surface-2)',
                    border: '1px solid var(--clay-border)',
                    fontSize: '1.1rem', textDecoration: 'none',
                    boxShadow: '3px 3px 10px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.02)',
                    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '4px 4px 14px rgba(0,0,0,0.5), -3px -3px 8px rgba(255,255,255,0.03)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '3px 3px 10px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.02)';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            textAlign: 'center', marginTop: '6rem', paddingTop: '3rem',
            borderTop: '1px solid rgba(0,212,255,0.08)',
            color: 'rgba(226,232,240,0.35)', fontSize: '0.85rem',
          }}
        >
          <p style={{ margin: 0 }}>
            Designed &amp; Built by{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontWeight: 600,
            }}>
              Putta Meher Prakash
            </span>
            {' '}· 2025
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(226,232,240,0.3); }
      `}</style>
    </section>
  );
}
