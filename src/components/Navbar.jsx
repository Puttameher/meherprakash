import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2.5rem',
        maxWidth: '1300px',
        margin: '0 auto',
      }}>
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleNav(e, '#hero')} style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: '1.3rem',
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>
          MP
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                color: 'rgba(226, 232, 240, 0.8)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => e.target.style.color = '#00d4ff'}
              onMouseLeave={e => e.target.style.color = 'rgba(226, 232, 240, 0.8)'}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, '#contact')}
            className="btn-clay"
            style={{ padding: '0.5rem 1.4rem', fontSize: '0.85rem' }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#00d4ff',
            fontSize: '1.5rem',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--clay-surface)',
          borderTop: '1px solid var(--clay-border)',
          padding: '1rem 2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                color: 'rgba(226, 232, 240, 0.8)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
