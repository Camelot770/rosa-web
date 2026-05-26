'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  /** Final integer value to animate to. */
  to: number;
  /** Animation duration in ms. Defaults to 1.4s — feels editorial without lagging. */
  duration?: number;
  /** Optional formatter for the displayed value (e.g. thousand separators). */
  formatter?: (n: number) => string;
  /** Optional suffix appended after the number (e.g. "%"). */
  suffix?: string;
}

/**
 * Counts from 0 to `to` once the element scrolls into view. Uses an
 * IntersectionObserver to defer the animation until visible (so the
 * count-up isn't wasted on users who never scroll there) and
 * easeOutCubic timing for a slight overshoot-free deceleration.
 *
 * The element is wrapped in a non-styled span so it can drop in
 * anywhere existing markup uses a number literal.
 */
export function AnimatedNumber({
  to,
  duration = 1400,
  formatter,
  suffix = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * to));
        if (p < 1) requestAnimationFrame(step);
        else setVal(to);
      };
      requestAnimationFrame(step);
    };

    // Trigger immediately if already in viewport on mount.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
      run();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  const display = formatter ? formatter(val) : String(val);
  return (
    <span ref={ref} suppressHydrationWarning>
      {display}
      {suffix}
    </span>
  );
}
