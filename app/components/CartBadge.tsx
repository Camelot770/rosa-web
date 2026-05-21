'use client';

import { useCart } from '@/lib/cart';

export function CartBadge() {
  const hydrated = useCart((s) => s.hydrated);
  const count = useCart((s) => (s.hydrated ? s.lines.reduce((n, l) => n + l.qty, 0) : 0));
  // Avoid hydration mismatch: render 0 on server, real count after hydration.
  return <span className="cart-badge">{hydrated ? count : 0}</span>;
}
