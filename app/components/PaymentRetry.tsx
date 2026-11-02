'use client';

import { useEffect, useState } from 'react';
import { I } from './Icons';
import { readOrderToken, startGuestPayment } from '@/lib/payment';

interface PaymentRetryProps {
  orderId: number;
  label: string;
}

/**
 * Reopens the YooKassa payment for an order made in this browser tab. Without
 * the order's token (another device, older server) it renders nothing and the
 * page's text sends the customer to the phone instead.
 */
export function PaymentRetry({ orderId, label }: PaymentRetryProps) {
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setToken(readOrderToken(orderId));
  }, [orderId]);

  if (!token) return null;

  const retry = async () => {
    setBusy(true);
    setError(null);
    const payment = await startGuestPayment(orderId, token);
    if (payment.ok) {
      window.location.href = payment.url;
      return;
    }
    setError(payment.error);
    setBusy(false);
  };

  return (
    <div className="payment-retry">
      <button type="button" className="btn btn-vermilion" onClick={retry} disabled={busy}>
        {busy ? 'Открываем оплату…' : label}{' '}
        <span className="arrow">
          <I.Arrow />
        </span>
      </button>
      {error ? <div className="checkout-error">{error}</div> : null}
    </div>
  );
}
