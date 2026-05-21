'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { I } from './Icons';
import type { Bouquet } from '@/lib/bouquets-data';

interface AddToCartButtonProps {
  bouquet: Bouquet;
  variant?: 'primary' | 'outline';
  label?: string;
}

export function AddToCartButton({
  bouquet,
  variant = 'primary',
  label = 'В корзину',
}: AddToCartButtonProps) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const handle = () => {
    add({
      bouquetId: bouquet.id,
      name: bouquet.name,
      price: bouquet.price,
      oldPrice: bouquet.oldPrice,
      image: bouquet.images[0] ?? null,
      collection: bouquet.collection,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      className={`btn ${variant === 'outline' ? 'btn-outline' : ''}`}
      onClick={handle}
    >
      {added ? 'Добавлено ✓' : label}{' '}
      <span className="arrow">
        <I.Arrow />
      </span>
    </button>
  );
}
