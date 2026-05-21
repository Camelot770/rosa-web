'use client';

import type { MouseEvent } from 'react';
import { useFavorites, type FavoriteEntry } from '@/lib/favorites';
import type { Bouquet } from '@/lib/bouquets-data';

interface FavoriteToggleProps {
  bouquet: Bouquet;
  /** "card" — small absolute circle on a product card.
   *  "inline" — inline pill next to "Add to cart" on product detail. */
  variant?: 'card' | 'inline';
}

export function FavoriteToggle({ bouquet, variant = 'card' }: FavoriteToggleProps) {
  const hydrated = useFavorites((s) => s.hydrated);
  const isFav = useFavorites((s) => s.has(bouquet.id));
  const toggle = useFavorites((s) => s.toggle);

  const handle = (e: MouseEvent) => {
    // Don't navigate when this button lives inside a clickable card-Link.
    e.preventDefault();
    e.stopPropagation();
    const entry: FavoriteEntry = {
      bouquetId: bouquet.id,
      name: bouquet.name,
      price: bouquet.price,
      oldPrice: bouquet.oldPrice,
      image: bouquet.images[0] ?? null,
      collection: bouquet.collection,
      no: bouquet.no,
    };
    toggle(entry);
  };

  const active = hydrated && isFav;
  const label = active ? 'Удалить из избранного' : 'В избранное';

  if (variant === 'inline') {
    return (
      <button
        type="button"
        className={`fav-inline ${active ? 'active' : ''}`}
        onClick={handle}
        aria-pressed={active}
        aria-label={label}
        title={label}
      >
        <HeartIcon filled={active} />
        <span>{active ? 'В избранном' : 'В избранное'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`fav-card ${active ? 'active' : ''}`}
      onClick={handle}
      aria-pressed={active}
      aria-label={label}
      title={label}
    >
      <HeartIcon filled={active} />
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  );
}
