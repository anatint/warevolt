'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ShopShell from '@/components/shop/ShopShell';
import Price from '@/components/shop/Price';
import { imageUrl, listProducts, type Product } from '@/lib/store';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name';

const priceOf = (p: Product) => p.priceData?.discountedPrice ?? p.priceData?.price ?? 0;

export default function ShopPage() {
  const [items, setItems] = useState<Product[] | null>(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('featured');

  useEffect(() => {
    listProducts()
      .then(setItems)
      .catch(() => setError('We couldn’t load the products right now. Please refresh the page to try again.'));
  }, []);

  const shown = useMemo(() => {
    if (!items) return [];
    const q = query.trim().toLowerCase();
    const list = q ? items.filter((p) => (p.name ?? '').toLowerCase().includes(q)) : [...items];
    if (sort === 'price-asc') list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === 'price-desc') list.sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === 'name') list.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    return list;
  }, [items, query, sort]);

  return (
    <ShopShell eyebrow="Shop" title="Shop" intro="Browse the catalogue, add what you need to your cart and check out securely.">
      <div className="shop-toolbar">
        <div className="shop-count" aria-live="polite">
          {items ? `${shown.length} product${shown.length === 1 ? '' : 's'}` : 'Loading products…'}
        </div>
        <div className="shop-controls">
          <input
            className="shop-input"
            type="search"
            placeholder="Search products"
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="shop-select" aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="shop-empty" role="alert">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!items && !error && (
        <div className="shop-grid" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="shop-skel" style={{ aspectRatio: '0.78' }} />
          ))}
        </div>
      )}

      {items && shown.length === 0 && (
        <div className="shop-empty">
          <h2>No products found</h2>
          <p>{query ? `Nothing matches “${query}”. Try a different search.` : 'There are no products in the store yet.'}</p>
          {query && (
            <button className="shop-btn shop-btn-ghost" onClick={() => setQuery('')}>
              Clear search
            </button>
          )}
        </div>
      )}

      {shown.length > 0 && (
        <div className="shop-grid">
          {shown.map((p) => {
            const img = imageUrl(p.media?.mainMedia?.image?.url, 600, 600);
            const out = p.stock?.inventoryStatus === 'OUT_OF_STOCK';
            return (
              <Link key={p._id} href={`/shop/product/?slug=${encodeURIComponent(p.slug ?? '')}`} className="shop-card">
                <div className="shop-card-media">
                  {img && <img src={img} alt={p.name ?? ''} loading="lazy" />}
                  {p.ribbon && <span className="shop-ribbon">{p.ribbon}</span>}
                </div>
                <div className="shop-card-body">
                  <div className="shop-card-name">{p.name}</div>
                  <Price data={p.priceData} />
                  {out && <div className="shop-oos">Out of stock</div>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </ShopShell>
  );
}
