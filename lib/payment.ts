'use client';

import { API_BASE, fetchWithTimeout } from './api';
import { CONTACTS } from './contacts';

export const NETWORK_ERROR = `Не удалось связаться с сервером. Проверьте интернет и попробуйте ещё раз или позвоните: ${CONTACTS.phone}.`;
const GENERIC_ERROR = `Не удалось оформить заказ. Попробуйте ещё раз или позвоните: ${CONTACTS.phone}.`;
const PAYMENT_ERROR = `Не удалось открыть оплату. Попробуйте ещё раз или позвоните: ${CONTACTS.phone}.`;

/** Long enough for a cold API; a retry after this could duplicate the order. */
export const ORDER_TIMEOUT_MS = 30_000;

/**
 * Text for a failed API call. Russian messages from the server are written
 * for customers and shown as they are; older English ones are translated here
 * so the customer never sees "Invalid phone".
 */
export function orderErrorText(raw: unknown, fallback: string = GENERIC_ERROR): string {
  const msg = typeof raw === 'string' ? raw : '';
  if (/[а-яё]/i.test(msg)) return msg;
  if (/phone/i.test(msg)) return 'Проверьте номер телефона: нужно от 10 до 15 цифр.';
  if (/email/i.test(msg)) return 'Проверьте e-mail: похоже, в адресе опечатка.';
  if (/firstName/i.test(msg)) return 'Укажите имя: от 2 до 60 символов.';
  if (/address/i.test(msg)) return 'Укажите улицу и дом для доставки.';
  if (/bouquet|out of stock/i.test(msg)) {
    return `Один из букетов больше недоступен. Проверьте корзину или позвоните: ${CONTACTS.phone}.`;
  }
  return fallback;
}

const tokenKey = (orderId: number) => `rosa-order-token-${orderId}`;

/** Lets the thank-you page in this tab reopen the payment for the order. */
export function rememberOrderToken(orderId: number, token: string | undefined) {
  if (!token) return;
  try {
    sessionStorage.setItem(tokenKey(orderId), token);
  } catch {
    // Storage may be blocked; the retry button just won't be offered.
  }
}

export function readOrderToken(orderId: number): string | null {
  try {
    return sessionStorage.getItem(tokenKey(orderId));
  } catch {
    return null;
  }
}

export type PaymentStart = { ok: true; url: string } | { ok: false; error: string };

/** Ask the server for a YooKassa link. Repeat calls return the same pending payment. */
export async function startGuestPayment(
  orderId: number,
  token: string | undefined,
): Promise<PaymentStart> {
  try {
    const res = await fetchWithTimeout(
      `${API_BASE}/api/payment/create-guest`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          orderId,
          token,
          returnUrl: `${window.location.origin}/thank-you?orderId=${orderId}`,
        }),
      },
      ORDER_TIMEOUT_MS,
    );
    const data = await res.json().catch(() => ({}));
    if (res.ok && typeof data.confirmationUrl === 'string' && data.confirmationUrl.length > 0) {
      return { ok: true, url: data.confirmationUrl };
    }
    return { ok: false, error: orderErrorText(data.error, PAYMENT_ERROR) };
  } catch {
    return { ok: false, error: NETWORK_ERROR };
  }
}
