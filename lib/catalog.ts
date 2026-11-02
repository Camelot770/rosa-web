// Catalog loader for server-rendered pages.
//
// A cold API must not fail `next build`, so during the build we fall back to
// the bundled snapshot. At runtime we rethrow instead: Next keeps serving the
// last good ISR page and anything without one shows app/error.tsx. Swapping in
// the snapshot at runtime would put bouquet ids into links and carts that the
// API may not know.

import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { fetchBouquets } from './api';
import { BOUQUETS, type Bouquet } from './bouquets-data';

export function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD;
}

export async function loadCatalog(page: string): Promise<Bouquet[]> {
  try {
    return await fetchBouquets();
  } catch (err) {
    if (!isBuildPhase()) throw err;
    console.warn(`[${page}] API unavailable during build, using bundled snapshot:`, err);
    return BOUQUETS;
  }
}
