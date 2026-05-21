'use client';

import { useEffect, useState } from 'react';

export function Intro() {
  const [gone, setGone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setGone(true), 2300);
    const r = setTimeout(() => setRemoved(true), 3700);
    const release = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2500);
    return () => {
      clearTimeout(t);
      clearTimeout(r);
      clearTimeout(release);
    };
  }, []);

  if (removed) return null;
  return (
    <div className={`intro ${gone ? 'gone' : ''}`}>
      <div className="intro-issue">№ 001 · Май 2026</div>
      <div className="intro-name">
        <em>Роза</em> Цветов
      </div>
      <div className="intro-bar" />
      <div className="intro-meta">— Editorial · est. 2017 · Tatarstan —</div>
    </div>
  );
}
