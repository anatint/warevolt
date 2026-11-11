'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ShopShell from '@/components/shop/ShopShell';
import { trackMeta } from '@/lib/metaPixel';
import { checkoutUrl, getCart, imageUrl, removeLine, setLineQuantity, type Cart, type CartLine } from '@/lib/store';

function lineOptions(l: CartLine): string {
  return (l.descriptionLines ?? [])
    .map((d) => {
      const name = d.name?.translated ?? d.name?.original;
      const value = d.colorInfo?.translated ?? d.colorInfo?.original ?? d.plainText?.translated ?? d.plainText?.original;
      return name && value ? `${name}: ${value}` : '';
    })
    .filter(Boolean)
    .join(' · ');
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null | undefined>(undefined);
  const [busyLine, setBusyLine] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch(() => {
        setCart(null);
        setError('We couldn’t load your cart. Please refresh the page to try again.');
      });
  }, []);

  const lines = cart?.lineItems ?? [];

  const run = async (lineId: string, fn: () => Promise<Cart | undefined>) => {
    setBusyLine(lineId);
    setError('');
    try {
      setCart((await fn()) ?? null);
    } catch {
      setError('That change didn’t go through. Please try again.');
    } finally {
      setBusyLine(null);
    }
  };

  const onCheckout = async () => {
    setCheckingOut(true);
    setError('');
    try {
      const url = await checkoutUrl();
      trackMeta('InitiateCheckout', {
        content_ids: lines.map((l) => l.catalogReference?.catalogItemId),
        contents: lines.map((l) => ({ id: l.catalogReference?.catalogItemId, quantity: l.quantity })),
        num_items: lines.reduce((n, l) => n + (l.quantity ?? 0), 0),
        value: lines.reduce((sum, l) => sum + Number(l.price?.amount ?? 0) * (l.quantity ?? 0), 0),
        currency: cart?.currency ?? 'INR',
      });
      window.location.href = url;
    } catch {
      setError('We couldn’t start checkout. Please try again in a moment.');
      setCheckingOut(false);
    }
  };

  return (
    <ShopShell eyebrow="Shop" title="Your cart">
      <Link href="/shop/" className="shop-back">
        ← Continue shopping
      </Link>

      {error && (
        <p className="shop-note err" role="alert" style={{ marginBottom: 16 }}>
          {error}
        </p>
      )}

      {cart === undefined && (
        <div className="shop-cart" aria-busy="true">
          <div className="shop-skel" style={{ height: 280 }} />
          <div className="shop-skel" style={{ height: 240 }} />
        </div>
      )}

      {cart !== undefined && lines.length === 0 && !error && (
        <div className="shop-empty">
          <h2>Your cart is empty</h2>
          <p>Add a product from the shop and it will show up here.</p>
          <Link href="/shop/" className="shop-btn shop-btn-primary">
            Browse products
          </Link>
        </div>
      )}

      {lines.length > 0 && (
        <div className="shop-cart">
          <div className="shop-lines">
            {lines.map((l) => {
              const id = l._id!;
              const qty = l.quantity ?? 1;
              const busy = busyLine === id;
              const name = l.productName?.translated ?? l.productName?.original ?? '';
              const unit = Number(l.price?.amount ?? 0);
              const currency = cart?.currency ?? 'INR';
              const total = new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(unit * qty);
              return (
                <div className="shop-line" key={id} style={{ opacity: busy ? 0.55 : 1 }}>
                  {l.image ? <img src={imageUrl(l.image, 200, 200)} alt="" /> : <div />}
                  <div>
                    <div className="shop-line-name">{name}</div>
                    {lineOptions(l) && <div className="shop-line-meta">{lineOptions(l)}</div>}
                    <div className="shop-line-meta">{l.price?.formattedAmount} each</div>
                    {l.availability?.status === 'NOT_AVAILABLE' && <div className="shop-oos">No longer available</div>}
                    <div className="shop-line-actions">
                      <div className="shop-qty" role="group" aria-label={`Quantity of ${name}`}>
                        <button
                          aria-label="Decrease quantity"
                          disabled={busy || qty <= 1}
                          onClick={() => run(id, () => setLineQuantity(id, qty - 1))}
                        >
                          −
                        </button>
                        <output>{qty}</output>
                        <button
                          aria-label="Increase quantity"
                          disabled={busy || qty >= 99}
                          onClick={() => run(id, () => setLineQuantity(id, qty + 1))}
                        >
                          +
                        </button>
                      </div>
                      <button className="shop-link-btn" disabled={busy} onClick={() => run(id, () => removeLine(id))}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="shop-line-total">{total}</div>
                </div>
              );
            })}
          </div>

          <aside className="shop-summary" aria-label="Order summary">
            <h2>Order summary</h2>
            <div className="shop-summary-row">
              <span>Items</span>
              <span>{lines.reduce((n, l) => n + (l.quantity ?? 0), 0)}</span>
            </div>
            <div className="shop-summary-row total">
              <span>Subtotal</span>
              <span>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: cart?.currency ?? 'INR' }).format(
                  lines.reduce((sum, l) => sum + Number(l.price?.amount ?? 0) * (l.quantity ?? 0), 0)
                )}
              </span>
            </div>
            <button className="shop-btn shop-btn-primary" onClick={onCheckout} disabled={checkingOut || busyLine !== null}>
              {checkingOut ? 'Opening secure checkout…' : 'Checkout'}
            </button>
            <small>Shipping and taxes are calculated at checkout. Payment is handled securely by Wix.</small>
          </aside>
        </div>
      )}
    </ShopShell>
  );
}
