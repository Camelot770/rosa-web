import type { Bouquet, Collection } from './bouquets-data';

const fmt = (n: number) => n.toLocaleString('ru-RU');

function pluralBouquet(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'букет';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'букета';
  return 'букетов';
}

/** "37 букетов", "2 букета". */
export function bouquetsLabel(n: number): string {
  return `${n} ${pluralBouquet(n)}`;
}

/** "7 букетов · 1 400–2 500 ₽", empty when the collection has no bouquets. */
export function collectionCaption(bouquets: Bouquet[], collection: Collection): string {
  const prices = bouquets.filter((b) => b.collection === collection).map((b) => b.price);
  if (!prices.length) return '';
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  return `${bouquetsLabel(prices.length)} · ${lo === hi ? fmt(lo) : `${fmt(lo)}–${fmt(hi)}`} ₽`;
}
