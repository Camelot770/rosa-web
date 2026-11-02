'use client';

import { useCart } from '@/lib/cart';

/** Tells the customer what the cart check changed: removed lines, new prices. */
export function CartNotices() {
  const notices = useCart((s) => s.notices);
  const dismiss = useCart((s) => s.dismissNotices);

  if (notices.length === 0) return null;
  return (
    <div className="checkout-error cart-notices" role="status">
      {notices.map((notice) => (
        <div key={notice}>{notice}</div>
      ))}
      <button type="button" className="cart-notices-close" onClick={dismiss}>
        Понятно
      </button>
    </div>
  );
}
