'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchBouquetLive, type ShopSettings } from './api';

export interface CartLine {
  bouquetId: number;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string | null;
  collection: string;
  qty: number;
}

/** The server rejects larger quantities. */
export const MAX_QTY = 50;

const fmt = (n: number) => n.toLocaleString('ru-RU');

export function courierCost(subtotal: number, settings: ShopSettings): number {
  return subtotal < settings.freeDeliveryFrom ? settings.deliveryPrice : 0;
}

interface CartState {
  lines: CartLine[];
  hydrated: boolean;
  /** What the last checks changed in the cart, shown until dismissed. Not persisted. */
  notices: string[];
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (bouquetId: number) => void;
  setQty: (bouquetId: number, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
  totalPrice: () => number;
  setHydrated: () => void;
  /** Sync lines with the API: refresh prices and names, drop what can no longer be ordered. */
  revalidate: () => Promise<void>;
  dismissNotices: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hydrated: false,
      notices: [],
      add: (line, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.bouquetId === line.bouquetId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.bouquetId === line.bouquetId
                  ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) }
                  : l,
              ),
            };
          }
          return { lines: [...state.lines, { ...line, qty: Math.min(MAX_QTY, qty) }] };
        }),
      remove: (bouquetId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.bouquetId !== bouquetId) })),
      setQty: (bouquetId, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.bouquetId === bouquetId ? { ...l, qty: Math.min(MAX_QTY, Math.max(0, qty)) } : l,
            )
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [], notices: [] }),
      totalQty: () => get().lines.reduce((s, l) => s + l.qty, 0),
      totalPrice: () => get().lines.reduce((s, l) => s + l.price * l.qty, 0),
      setHydrated: () => set({ hydrated: true }),
      revalidate: async () => {
        const ids = get().lines.map((l) => l.bouquetId);
        if (ids.length === 0) return;
        const live = await Promise.all(ids.map((id) => fetchBouquetLive(id)));
        const byId = new Map(ids.map((id, i) => [id, live[i]]));

        set((state) => {
          const found: string[] = [];
          const lines: CartLine[] = [];
          for (const line of state.lines) {
            const result = byId.get(line.bouquetId);
            // Added while we were asking, or the API did not answer: keep as is.
            if (!result || result.status === 'error') {
              lines.push(line);
              continue;
            }
            if (result.status === 'missing' || !result.orderable) {
              found.push(`«${line.name}» больше недоступен - убрали из корзины.`);
              continue;
            }
            const { bouquet } = result;
            if (bouquet.name !== line.name) {
              found.push(`«${line.name}» теперь называется «${bouquet.name}» - проверьте заказ.`);
            }
            if (bouquet.price !== line.price) {
              found.push(
                `Цена «${bouquet.name}» изменилась: было ${fmt(line.price)} ₽, стало ${fmt(bouquet.price)} ₽.`,
              );
            }
            lines.push({
              ...line,
              name: bouquet.name,
              price: bouquet.price,
              oldPrice: bouquet.oldPrice,
              image: bouquet.images[0] ?? line.image,
              collection: bouquet.collection,
            });
          }
          return {
            lines,
            notices: found.length ? Array.from(new Set([...state.notices, ...found])) : state.notices,
          };
        });
      },
      dismissNotices: () => set({ notices: [] }),
    }),
    {
      // v1 holds bouquet ids from the catalog before the API move: the same id
      // can now be a different bouquet at a different price.
      name: 'rosa-cart-v2',
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
        try {
          localStorage.removeItem('rosa-cart-v1');
        } catch {
          // Storage may be blocked; the old key is then just left alone.
        }
      },
    },
  ),
);
