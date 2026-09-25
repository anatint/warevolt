import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { products, collections } from '@wix/stores';
import { currentCart, checkout, orders } from '@wix/ecom';

export const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '565ec5eb-181b-46e2-903c-3a82062e152a';

/**
 * Creates and returns a Wix Headless Client instance configured for Warevolt.
 * Configured with OAuthStrategy and Wix Stores, Ecom, and Data (CMS) modules.
 */
export function getWixClient(tokens?: any) {
  return createClient({
    modules: {
      items,
      products,
      collections,
      currentCart,
      checkout,
      orders,
    },
    auth: OAuthStrategy({
      clientId,
      tokens: tokens || undefined,
    }),
  });
}

export type WixClientType = ReturnType<typeof getWixClient>;
export const wixClient = getWixClient();

