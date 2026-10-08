'use client';

import React, { useEffect, useState } from 'react';

type Box = { x: number; y: number; w: number; h: number; nw: number; nh: number };
const cache = new Map<string, Promise<Box | null>>();

// Finds the visible (non-transparent, non-white) area of a logo so empty margins don't change its apparent size.
function measure(src: string): Promise<Box | null> {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve) => {
        const im = new Image();
        im.crossOrigin = 'anonymous';
        im.onload = () => {
          try {
            const sc = Math.min(1, 500 / im.naturalWidth);
            const w = Math.max(1, Math.round(im.naturalWidth * sc));
            const h = Math.max(1, Math.round(im.naturalHeight * sc));
            const c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            const ctx = c.getContext('2d');
            if (!ctx) return resolve(null);
            ctx.drawImage(im, 0, 0, w, h);
            const d = ctx.getImageData(0, 0, w, h).data;
            let x0 = w, y0 = h, x1 = -1, y1 = -1;
            for (let y = 0; y < h; y++) {
              for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                const white = d[i] > 238 && d[i + 1] > 238 && d[i + 2] > 238;
                if (d[i + 3] > 24 && !white) {
                  if (x < x0) x0 = x;
                  if (x > x1) x1 = x;
                  if (y < y0) y0 = y;
                  if (y > y1) y1 = y;
                }
              }
            }
            if (x1 < x0 || y1 < y0) return resolve(null);
            resolve({ x: x0 / w, y: y0 / h, w: (x1 - x0 + 1) / w, h: (y1 - y0 + 1) / h, nw: im.naturalWidth, nh: im.naturalHeight });
          } catch {
            resolve(null);
          }
        };
        im.onerror = () => resolve(null);
        im.src = src;
      }),
    );
  }
  return cache.get(src)!;
}

/** Renders a logo so its visible artwork fits the same boxW x boxH area as every other logo in the strip. */
export default function TrimmedLogo({ src, alt, boxW = 140, boxH = 38 }: { src: string; alt: string; boxW?: number; boxH?: number }) {
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (src) measure(src).then((b) => !cancelled && setBox(b));
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!box) {
    return <img src={src} alt={alt} style={{ maxWidth: `${boxW}px`, maxHeight: `${boxH}px`, width: 'auto', height: 'auto', objectFit: 'contain' }} />;
  }

  const contentAspect = (box.w * box.nw) / (box.h * box.nh);
  const cw = Math.min(boxW, boxH * contentAspect);
  const ch = cw / contentAspect;
  const iw = cw / box.w;
  const ih = (iw * box.nh) / box.nw;

  return (
    <div style={{ position: 'relative', width: `${boxW}px`, height: `${boxH}px`, flexShrink: 0 }}>
      <img
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          maxWidth: 'none',
          width: `${iw}px`,
          height: `${ih}px`,
          left: `${(boxW - cw) / 2 - box.x * iw}px`,
          top: `${(boxH - ch) / 2 - box.y * ih}px`,
        }}
      />
    </div>
  );
}
