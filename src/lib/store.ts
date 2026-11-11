'use client';

/**
 * Browser-side Wix Stores + eCom layer for the static shop pages.
 * The site is a static export, so everything here runs in the visitor's browser
 * with an anonymous visitor session (OAuth tokens kept in localStorage so the cart survives reloads).
 */
import { createClient, OAuthStrategy, media, type Tokens } from '@wix/sdk';
import { products } from '@wix/stores';
import { currentCart, checkout } from '@wix/ecom';
import { clientId } from '@/lib/wixClient';

/** Wix Stores app id, used as the catalog reference when adding items to the cart. */
const STORES_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
const TOKENS_KEY = 'wv_wix_tokens';
export const CART_EVENT = 'wv-cart-changed';

function readTokens(): Tokens | undefined {
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    return raw ? (JSON.parse(raw) as Tokens) : undefined;
  } catch {
    return undefined;
  }
}

function makeClient() {
  return createClient({
    modules: { products, currentCart, checkout },
    auth: OAuthStrategy({ clientId, tokens: readTokens() }),
  });
}

let client: ReturnType<typeof makeClient> | null = null;
function wix() {
  if (!client) client = makeClient();
  return client;
}

/** Persist the visitor session after each call so the same cart is reused next visit. */
function saveTokens() {
  try {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(wix().auth.getTokens()));
  } catch {
    /* storage blocked: cart just won't survive a reload */
  }
}

async function call<T>(fn: (c: ReturnType<typeof makeClient>) => Promise<T>): Promise<T> {
  const result = await fn(wix());
  saveTokens();
  return result;
}

// ── Types ──────────────────────────────────────────────────────────────

export type Product = products.Product;
export type Cart = currentCart.Cart;
export type CartLine = currentCart.LineItem;

/** Turns a Wix image (https or wix:image:// URI) into a sized https URL. */
export function imageUrl(src: string | undefined | null, w = 800, h = 800): string {
  if (!src) return '';
  if (src.startsWith('wix:image://')) {
    try {
      return media.getScaledToFillImageUrl(src, w, h, {});
    } catch {
      return media.getImageUrl(src).url;
    }
  }
  return src;
}

/** Strips the HTML Wix stores in product descriptions down to plain paragraphs. */
export function descriptionParagraphs(html: string | undefined | null): string[] {
  if (!html) return [];
  return html
    .replace(/<\/(p|li|div|h\d)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

// ── Catalog ────────────────────────────────────────────────────────────

export async function listProducts(): Promise<Product[]> {
  const res = await call((c) => c.products.queryProducts().limit(100).find());
  return res.items.filter((p) => p.visible !== false);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await call((c) => c.products.queryProducts().eq('slug', slug).limit(1).find());
  return res.items[0] ?? null;
}

/** The variant matching the chosen options, for products that manage variants. */
export function findVariant(product: Product, chosen: Record<string, string>) {
  return product.variants?.find((v) =>
    Object.entries(v.choices ?? {}).every(([name, value]) => chosen[name] === value)
  );
}

// ── Cart ───────────────────────────────────────────────────────────────

function notify(cart: Cart | null | undefined) {
  const count = cart?.lineItems?.reduce((n, l) => n + (l.quantity ?? 0), 0) ?? 0;
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: { count } }));
}

/** Current visitor cart, or null when none has been created yet. */
export async function getCart(): Promise<Cart | null> {
  try {
    const cart = await call((c) => c.currentCart.getCurrentCart());
    return cart;
  } catch (err: unknown) {
    // A visitor with no cart yet gets a 404 (OWNED_CART_NOT_FOUND); treat that as empty.
    const msg = err instanceof Error ? err.message : String(err);
    if (/not.?found|OWNED_CART_NOT_FOUND|404/i.test(msg)) return null;
    throw err;
  }
}

export async function addToCart(product: Product, chosen: Record<string, string>, quantity: number) {
  const variant = product.manageVariants ? findVariant(product, chosen) : undefined;
  const options = variant?._id
    ? { variantId: variant._id }
    : Object.keys(chosen).length
      ? { options: chosen }
      : {};
  const res = await call((c) =>
    c.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: { appId: STORES_APP_ID, catalogItemId: product._id!, options },
          quantity,
        },
      ],
    })
  );
  notify(res.cart);
  return res.cart;
}

export async function setLineQuantity(lineId: string, quantity: number) {
  const res = await call((c) =>
    c.currentCart.updateCurrentCartLineItemQuantity([{ _id: lineId, quantity }])
  );
  notify(res.cart);
  return res.cart;
}

export async function removeLine(lineId: string) {
  const res = await call((c) => c.currentCart.removeLineItemsFromCurrentCart([lineId]));
  notify(res.cart);
  return res.cart;
}

export async function cartCount(): Promise<number> {
  const cart = await getCart();
  return cart?.lineItems?.reduce((n, l) => n + (l.quantity ?? 0), 0) ?? 0;
}

/** Creates a checkout from the cart and returns its URL on the warevolt Wix site's own checkout page. */
export async function checkoutUrl(): Promise<string> {
  const { checkoutId } = await call((c) => c.currentCart.createCheckoutFromCurrentCart({ channelType: currentCart.ChannelType.WEB }));
  const { checkoutUrl: url } = await call((c) => c.checkout.getCheckoutUrl(checkoutId!));
  return url!;
}
