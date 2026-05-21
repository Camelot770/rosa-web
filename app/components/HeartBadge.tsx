'use client';

import { useFavorites } from '@/lib/favorites';

export function HeartBadge() {
  const hydrated = useFavorites((s) => s.hydrated);
  const count = useFavorites((s) => (s.hydrated ? s.items.length : 0));
  return <span className="cart-badge">{hydrated ? count : 0}</span>;
}
