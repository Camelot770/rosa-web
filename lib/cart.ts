'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartLine {
  bouquetId: number;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string | null;
  collection: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  hydrated: boolean;
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (bouquetId: number) => void;
  setQty: (bouquetId: number, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
  totalPrice: () => number;
  setHydrated: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hydrated: false,
      add: (line, qty = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.bouquetId === line.bouquetId);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.bouquetId === line.bouquetId ? { ...l, qty: l.qty + qty } : l,
              ),
            };
          }
          return { lines: [...state.lines, { ...line, qty }] };
        }),
      remove: (bouquetId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.bouquetId !== bouquetId) })),
      setQty: (bouquetId, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.bouquetId === bouquetId ? { ...l, qty: Math.max(0, qty) } : l))
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      totalQty: () => get().lines.reduce((s, l) => s + l.qty, 0),
      totalPrice: () => get().lines.reduce((s, l) => s + l.price * l.qty, 0),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'rosa-cart-v1',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
