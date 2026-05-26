'use client';

import { useEffect, useRef, useState } from 'react';

interface SectionScribeProps {
  /** Optional label printed in the gap between the line and its dot. */
  label?: string;
}

/**
 * Thin section divider that scribes a vermilion line from left to right
 * when the divider enters the viewport. Use sparingly between sections
 * to reinforce the "chapter break" feel of a magazine.
 *
 * Visual: a 1px vermilion line that grows from 0 to full width, with an
 * optional uppercase mono label sitting in the middle. The label is
 * static; only the line animates.
 */
export function SectionScribe({ label }: SectionScribeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || drawn) return;

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
      setDrawn(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [drawn]);

  return (
    <div
      ref={ref}
      className={`section-scribe ${drawn ? 'drawn' : ''}`}
      aria-hidden="true"
    >
      <span className="section-scribe-line section-scribe-line-l" />
      {label && <span className="section-scribe-label">{label}</span>}
      <span className="section-scribe-line section-scribe-line-r" />
    </div>
  );
}
