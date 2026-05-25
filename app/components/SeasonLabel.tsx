'use client';

import { useEffect, useState } from 'react';
import { currentSeason, type SeasonInfo } from '@/lib/season';

interface Props {
  /** "full" → "Сезон 17 · Май 2026" · "plate" → "Сезон 17" */
  format?: 'full' | 'plate';
}

export function SeasonLabel({ format = 'full' }: Props) {
  // SSR-safe: render whatever the server's clock says, then re-check on the
  // client after mount in case the page was statically cached past a month
  // boundary. suppressHydrationWarning swallows the (harmless) clock-skew
  // diff between server and client first paint.
  const [d, setD] = useState<SeasonInfo>(() => currentSeason());

  useEffect(() => {
    setD(currentSeason());
  }, []);

  if (format === 'plate') {
    return <span suppressHydrationWarning>Сезон {d.season}</span>;
  }
  return (
    <span suppressHydrationWarning>
      Сезон {d.season} · {d.month} {d.year}
    </span>
  );
}
