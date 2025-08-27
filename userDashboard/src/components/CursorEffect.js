import React, { useEffect, useRef } from 'react';

const CursorEffect = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (window.innerWidth < 768) return; // Only show on desktop
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'rgba(255,255,255,0.15)',
        boxShadow: '0 0 24px 8px #fff, 0 0 64px 16px #fff',
        mixBlendMode: 'exclusion',
        transition: 'background 0.2s, box-shadow 0.2s',
        backdropFilter: 'blur(2px)',
        display: window.innerWidth < 768 ? 'none' : 'block',
      }}
      className="everhigh-cursor-effect"
    />
  );
};

export default CursorEffect; 