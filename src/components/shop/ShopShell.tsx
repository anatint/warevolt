'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import PricingModal from '@/components/PricingModal';
import { CART_EVENT, cartCount } from '@/lib/store';

/** Shared frame for the shop pages: dark header band, page title, footer, and a floating cart button. */
export default function ShopShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    cartCount().then(setCount).catch(() => {});
    const onChange = (e: Event) => setCount((e as CustomEvent<{ count: number }>).detail.count);
    window.addEventListener(CART_EVENT, onChange);
    return () => window.removeEventListener(CART_EVENT, onChange);
  }, []);

  return (
    <div className="shop-root">
      <section className="shop-hero">
        <div className="shop-glow shop-glow-a" />
        <div className="shop-glow shop-glow-b" />
        <SiteHeaderNav onOpenPricing={() => setPricingOpen(true)} />
        <div className="shop-hero-body">
          <div className="shop-eyebrow">
            <span />
            {eyebrow}
          </div>
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </section>

      <main className="shop-main">{children}</main>

      <SiteFooter onOpenPricing={() => setPricingOpen(true)} />
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />

      <Link href="/shop/cart/" className="shop-cart-fab" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span>Cart</span>
        {count > 0 && <b>{count}</b>}
      </Link>
    </div>
  );
}
