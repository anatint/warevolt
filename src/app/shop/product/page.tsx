'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ShopShell from '@/components/shop/ShopShell';
import Price from '@/components/shop/Price';
import { addToCart, descriptionParagraphs, findVariant, getProductBySlug, imageUrl, type Product } from '@/lib/store';
import { trackMeta } from '@/lib/metaPixel';

function ProductView() {
  const slug = useSearchParams().get('slug') ?? '';
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [note, setNote] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      return;
    }
    setProduct(undefined);
    getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        if (p) {
          document.title = `${p.name} | Warevolt Shop`;
          trackMeta('ViewContent', {
            content_ids: [p._id],
            content_name: p.name,
            content_type: 'product',
            value: p.priceData?.discountedPrice ?? p.priceData?.price,
            currency: p.priceData?.currency ?? 'INR',
          });
        }
      })
      .catch(() => setProduct(null));
  }, [slug]);

  const options = product?.productOptions ?? [];
  const gallery = product?.media?.items?.filter((m) => m.image?.url) ?? [];
  const allChosen = options.every((o) => chosen[o.name ?? '']);
  const variant = product && product.manageVariants && allChosen ? findVariant(product, chosen) : undefined;
  const priceData = variant?.variant?.priceData ?? product?.priceData;
  const inStock = variant ? variant.stock?.inStock !== false : product?.stock?.inventoryStatus !== 'OUT_OF_STOCK';

  // Show the colour's own photo when a choice carries one.
  const mainImage = useMemo(() => {
    for (const o of options) {
      const choice = o.choices?.find((c) => c.description === chosen[o.name ?? '']);
      const url = choice?.media?.mainMedia?.image?.url;
      if (url) return url;
    }
    return gallery[activeImg]?.image?.url ?? product?.media?.mainMedia?.image?.url;
  }, [options, chosen, gallery, activeImg, product]);

  if (product === undefined) {
    return (
      <div className="shop-pdp" aria-busy="true">
        <div className="shop-skel" style={{ aspectRatio: '1' }} />
        <div>
          <div className="shop-skel" style={{ height: 40, width: '70%', marginBottom: 16 }} />
          <div className="shop-skel" style={{ height: 28, width: '30%', marginBottom: 32 }} />
          <div className="shop-skel" style={{ height: 120 }} />
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="shop-empty">
        <h2>Product not found</h2>
        <p>This product may have been removed or the link is incorrect.</p>
        <Link href="/shop/" className="shop-btn shop-btn-primary">
          Back to the shop
        </Link>
      </div>
    );
  }

  const onAdd = async () => {
    if (!allChosen) {
      const missing = options.find((o) => !chosen[o.name ?? '']);
      setNote({ kind: 'err', text: `Choose a ${missing?.name?.toLowerCase()} first.` });
      return;
    }
    setAdding(true);
    setNote(null);
    try {
      const cart = await addToCart(product, chosen, qty);
      if (!cart?.lineItems?.length) throw new Error('not added');
      const unit = priceData?.discountedPrice ?? priceData?.price ?? 0;
      trackMeta('AddToCart', {
        content_ids: [product._id],
        content_name: product.name,
        content_type: 'product',
        contents: [{ id: product._id, quantity: qty }],
        value: unit * qty,
        currency: priceData?.currency ?? 'INR',
      });
      setNote({ kind: 'ok', text: `Added ${qty} to your cart.` });
    } catch {
      setNote({ kind: 'err', text: 'We couldn’t add this to your cart. Please try again.' });
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Link href="/shop/" className="shop-back">
        ← All products
      </Link>
      <div className="shop-pdp">
        <div>
          <div className="shop-gallery-main">
            {mainImage && <img src={imageUrl(mainImage, 1000, 1000)} alt={product.name ?? ''} />}
          </div>
          {gallery.length > 1 && (
            <div className="shop-thumbs">
              {gallery.map((m, i) => (
                <button
                  key={m._id ?? i}
                  className="shop-thumb"
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={i === activeImg && !options.some((o) => o.choices?.find((c) => c.description === chosen[o.name ?? ''])?.media?.mainMedia)}
                  onClick={() => {
                    setActiveImg(i);
                    // A thumbnail click should win over the colour photo.
                    setChosen((c) => {
                      const next = { ...c };
                      for (const o of options) if (o.optionType === 'color') delete next[o.name ?? ''];
                      return next;
                    });
                  }}
                >
                  <img src={imageUrl(m.image!.url, 160, 160)} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="shop-pdp-info">
          <h2>{product.name}</h2>
          <Price data={priceData} />

          {options.map((o) => {
            const name = o.name ?? '';
            const isColor = o.optionType === 'color';
            return (
              <div className="shop-opt" key={name} role="group" aria-label={name}>
                <div className="shop-opt-label">
                  {name}
                  {chosen[name] && <span>: {chosen[name]}</span>}
                </div>
                <div className={isColor ? 'shop-swatches' : 'shop-chips'}>
                  {o.choices
                    ?.filter((c) => c.visible !== false)
                    .map((c) => {
                      const label = c.description ?? '';
                      const pressed = chosen[name] === label;
                      const disabled = c.inStock === false;
                      const pick = () => {
                        setChosen((prev) => ({ ...prev, [name]: label }));
                        setNote(null);
                      };
                      return isColor ? (
                        <button
                          key={label}
                          className="shop-swatch"
                          style={{ background: c.value ?? '#ccc' }}
                          aria-label={label}
                          title={label}
                          aria-pressed={pressed}
                          disabled={disabled}
                          onClick={pick}
                        />
                      ) : (
                        <button key={label} className="shop-chip" aria-pressed={pressed} disabled={disabled} onClick={pick}>
                          {label}
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}

          <div className="shop-buy">
            <div className="shop-qty" role="group" aria-label="Quantity">
              <button aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => q - 1)}>
                −
              </button>
              <output aria-live="polite">{qty}</output>
              <button aria-label="Increase quantity" disabled={qty >= 99} onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <button className="shop-btn shop-btn-primary" onClick={onAdd} disabled={adding || !inStock}>
              {!inStock ? 'Out of stock' : adding ? 'Adding…' : 'Add to cart'}
            </button>
          </div>
          <div className={`shop-note ${note?.kind ?? ''}`} role="status">
            {note?.text}
            {note?.kind === 'ok' && (
              <>
                {' '}
                <Link href="/shop/cart/" style={{ color: '#4D0DD9', fontWeight: 700 }}>
                  View cart →
                </Link>
              </>
            )}
          </div>

          {product.description && (
            <div className="shop-desc">
              {descriptionParagraphs(product.description).map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ProductPage() {
  return (
    <ShopShell eyebrow="Shop" title="Product details">
      <Suspense fallback={null}>
        <ProductView />
      </Suspense>
    </ShopShell>
  );
}
