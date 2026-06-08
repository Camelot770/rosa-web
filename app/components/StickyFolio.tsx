'use client';

import { useEffect, useState } from 'react';

/**
 * Floating magazine-folio chip — fixed bottom-left of the viewport,
 * always shows which "page" the user is currently reading (e.g.
 * "P.04 — Editorial"). On mount scans the DOM for every <section>
 * that contains a .page-marker (the in-page "P.XX — Section" header
 * each major section already prints) and watches scroll to figure
 * out which is currently dominant.
 *
 * Hidden on phones to avoid cluttering already-tight space.
 * Hidden when no section is in view (i.e. very top before Hero's
 * page-marker enters viewport, or very bottom past Subscribe).
 */
export function StickyFolio() {
  const [label, setLabel] = useState('');

  useEffect(() => {
    // Discover sections that have a page-marker — those are the ones
    // we want to track.  Capture the marker text once per section so
    // we don't re-read it on every scroll frame.
    const meta = Array.from(document.querySelectorAll('section, footer')).flatMap((s) => {
      const marker = s.querySelector('.page-marker');
      if (!marker) return [];
      const num = marker.querySelector('.num')?.textContent?.replace(/\s+/g, ' ').trim() || '';
      const lab = marker.querySelector('.lab')?.textContent?.replace(/[—\-\s]+/g, ' ').trim() || '';
      const text = [num, lab].filter(Boolean).join(' — ');
      return text ? [{ el: s, text }] : [];
    });
    if (meta.length === 0) return;

    let currentText = '';
    let raf = 0;

    const recompute = () => {
      raf = 0;
      // Find the section whose visible center is nearest to the upper
      // third of the viewport — that's the one the user is "reading".
      const targetY = window.innerHeight * 0.33;
      let bestIdx = -1;
      let bestDist = Infinity;
      meta.forEach((m, i) => {
        const r = m.el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return; // off-screen
        const center = (r.top + Math.min(r.bottom, window.innerHeight)) / 2;
        const dist = Math.abs(center - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      const next = bestIdx >= 0 ? meta[bestIdx].text : '';
      if (next !== currentText) {
        currentText = next;
        setLabel(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(recompute);
    };

    recompute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!label) return null;
  return (
    <aside className="sticky-folio" aria-hidden="true" suppressHydrationWarning>
      <span>{label}</span>
    </aside>
  );
}
