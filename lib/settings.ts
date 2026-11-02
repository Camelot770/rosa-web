'use client';

import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_SHOP_SETTINGS, fetchShopSettings, type ShopSettings } from './api';

/** Delivery prices and the minimum order as set in the admin panel. */
export function useShopSettings() {
  const [settings, setSettings] = useState<ShopSettings>(DEFAULT_SHOP_SETTINGS);

  const refresh = useCallback(async () => {
    const fresh = await fetchShopSettings();
    if (fresh) setSettings(fresh);
    return fresh;
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { settings, refresh };
}
