import { useEffect, useRef, useState } from 'react';

export default function DotCursor() {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'cursor-hide';
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(!!(el?.matches('a, button, [role="button"], input') || el?.closest('a, button')));
    };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      document.body.style.cursor = '';
      document.getElementById('cursor-hide')?.remove();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: isPointer ? '16px' : '12px',
        height: isPointer ? '16px' : '12px',
        borderRadius: '50%',
        background: isPointer ? '#a855f7' : '#ffffff',
        boxShadow: isPointer
          ? '0 0 10px rgba(168,85,247,0.9), 0 0 20px rgba(168,85,247,0.5)'
          : '0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.4)',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        transition: 'background 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s',
      }}
    />
  );
}
