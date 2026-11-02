'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INTERVAL_MS = 5_000;
/** Stop asking eventually: an abandoned payment stays pending for a long time. */
const GIVE_UP_AFTER_MS = 10 * 60 * 1000;

/** Re-renders the server page while the payment status is still unknown. */
export function StatusAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      if (Date.now() - startedAt > GIVE_UP_AFTER_MS) {
        clearInterval(timer);
        return;
      }
      if (document.visibilityState === 'visible') router.refresh();
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [router]);

  return null;
}
