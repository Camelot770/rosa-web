'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteEntry {
  bouquetId: number;
  name: string;
  price: number;
  oldPrice: number | null;
  image: string | null;
  collection: string;
  no: number;
}

interface FavoritesState {
  items: FavoriteEntry[];
  hydrated: boolean;
  has: (bouquetId: number) => boolean;
  toggle: (entry: FavoriteEntry) => void;
  add: (entry: FavoriteEntry) => void;
  remove: (bouquetId: number) => void;
  clear: () => void;
  setHydrated: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      has: (bouquetId) => get().items.some((i) => i.bouquetId === bouquetId),
      toggle: (entry) =>
        set((state) => {
          const exists = state.items.some((i) => i.bouquetId === entry.bouquetId);
          if (exists) {
            return { items: state.items.filter((i) => i.bouquetId !== entry.bouquetId) };
          }
          return { items: [entry, ...state.items] };
        }),
      add: (entry) =>
        set((state) => {
          if (state.items.some((i) => i.bouquetId === entry.bouquetId)) return state;
          return { items: [entry, ...state.items] };
        }),
      remove: (bouquetId) =>
        set((state) => ({ items: state.items.filter((i) => i.bouquetId !== bouquetId) })),
      clear: () => set({ items: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'rosa-favorites-v1',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
