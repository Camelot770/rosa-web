'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  stamp: string;
  collection: string;
}

export function ProductGallery({ images, stamp, collection }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const hero = images[active];

  return (
    <div>
      <div className="product-photo">
        <span className="stamp-no">{stamp}</span>
        <span className="plate-tag">{collection}</span>
        <div className="image" style={hero ? { backgroundImage: `url("${hero}")` } : undefined} />
      </div>
      {images.length > 1 && (
        <div className="product-thumbs">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              aria-label={`Фото ${i + 1}`}
              aria-pressed={i === active}
              className={`thumb ${i === active ? 'active' : ''}`}
              style={{ backgroundImage: `url("${img}")` }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
