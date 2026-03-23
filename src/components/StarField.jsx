import { useMemo } from 'react';

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1.5 + 0.5,
    duration: `${Math.random() * 4 + 2}s`,
    delay: `${Math.random() * 4}s`,
    opacity: Math.random() * 0.35 + 0.2,
  }));
}

export default function StarField() {
  const stars = useMemo(() => generateStars(100), []);

  return (
    <div className="stars-container" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            '--duration': star.duration,
            '--delay': star.delay,
          }}
        />
      ))}
      {/* Nebula blobs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '55%',
        right: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
