import React from 'react';

type PriceData = {
  price?: number | null;
  discountedPrice?: number | null;
  formatted?: { price?: string | null; discountedPrice?: string | null } | null;
} | null | undefined;

/** Shows the selling price, with the original struck through when there's a discount. */
export default function Price({ data }: { data: PriceData }) {
  if (!data) return null;
  const onSale = data.discountedPrice != null && data.price != null && data.discountedPrice < data.price;
  return (
    <div className="shop-price">
      <span>{onSale ? data.formatted?.discountedPrice : data.formatted?.price}</span>
      {onSale && <s>{data.formatted?.price}</s>}
    </div>
  );
}
