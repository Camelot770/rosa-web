'use client';

import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';

interface SplitProps {
  children: ReactNode | ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
}

export function Split({ children, as: Tag = 'span', className = '', delay = 0 }: SplitProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fb = setTimeout(() => setShown(true), 2200 + delay);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95) {
      setTimeout(() => setShown(true), delay);
      return () => clearTimeout(fb);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(fb);
    };
  }, [delay]);

  const lines = Array.isArray(children) ? children : [children];

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="sl">
          <span
            className={shown ? 'in' : ''}
            style={{ transitionDelay: `${i * 90}ms` }}
            dangerouslySetInnerHTML={{ __html: typeof l === 'string' ? l : '' }}
          />
        </span>
      ))}
    </Tag>
  );
}

interface RProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function R({ children, delay = 0, as: Tag = 'div', className = '' }: RProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fb = setTimeout(() => setShown(true), 2200 + delay);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
      setTimeout(() => setShown(true), delay);
      return () => clearTimeout(fb);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(fb);
    };
  }, [delay]);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={`r ${className} ${shown ? 'in' : ''}`}>
      {children}
    </Tag>
  );
}
