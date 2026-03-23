import { useEffect, useRef, useState } from 'react';

export default function GlowingPath() {
  const pathRef = useRef(null);
  const [dashOffset, setDashOffset] = useState(1);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    path.style.strokeDasharray = total;
    path.style.strokeDashoffset = total;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      path.style.strokeDashoffset = total * (1 - progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden',
    }} aria-hidden="true">
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="glow-path">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00d4ff', stopOpacity: 0.8 }} />
            <stop offset="40%" style={{ stopColor: '#6366f1', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>

        {/* Background dim path */}
        <path
          d="M 15 0 Q 85 120 15 250 Q -15 380 75 500 Q 115 620 25 750 Q -10 880 85 1000"
          fill="none"
          stroke="rgba(99,102,241,0.08)"
          strokeWidth="0.8"
        />

        {/* Animated glowing path */}
        <path
          ref={pathRef}
          d="M 15 0 Q 85 120 15 250 Q -15 380 75 500 Q 115 620 25 750 Q -10 880 85 1000"
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="0.6"
          filter="url(#glow-path)"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
