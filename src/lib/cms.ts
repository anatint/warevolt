'use client';

import { useEffect, useMemo, useState } from 'react';
import { wixClient } from '@/lib/wixClient';

/**
 * One row of a page's Wix CMS collection. Every page collection shares this shape:
 * a row is a piece of content (a heading, a paragraph, a card, a list item, an image...)
 * that belongs to a `section` of the page and is sorted by `order`.
 */
export type CmsRow = {
  section: string;
  order?: number;
  key?: string;
  label?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  linkLabel?: string;
  linkUrl?: string;
  extra?: string;
};

/** Converts a Wix media reference (wix:image://v1/<id>/<name>) into a browser-loadable URL. */
export function wixImageUrl(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith('wix:image://v1/')) {
    const id = src.slice('wix:image://v1/'.length).split('/')[0].split('#')[0];
    return `https://static.wixstatic.com/media/${id}`;
  }
  return src;
}

function normalize(row: any): CmsRow {
  return { ...row, image: wixImageUrl(row.image) };
}

export type CmsContent = {
  rows: CmsRow[];
  /** All rows of a section, sorted by `order`. */
  list: (section: string) => CmsRow[];
  /** The first row of a section (or the row matching `key`), or an empty row. */
  one: (section: string, key?: string) => CmsRow;
};

/**
 * Loads a page's content from its Wix CMS collection in the browser.
 * The bundled `defaults` render first (so the static HTML is complete and SEO-friendly),
 * then are replaced by live CMS content as soon as it arrives. If Wix is unreachable
 * or the collection is empty, the defaults simply stay on screen.
 */
export function useCms(collectionId: string, defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    wixClient.items
      .query(collectionId)
      .ascending('order')
      .limit(1000)
      .find()
      .then((res) => {
        if (!cancelled && res.items.length > 0) setRows(res.items.map(normalize));
      })
      .catch((err) => console.warn(`CMS "${collectionId}" unavailable, using bundled content`, err));
    return () => {
      cancelled = true;
    };
  }, [collectionId]);

  return useMemo(() => {
    const list = (section: string) =>
      rows.filter((r) => r.section === section).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const one = (section: string, key?: string) =>
      list(section).find((r) => (key ? r.key === key : true)) ?? { section };
    return { rows, list, one };
  }, [rows]);
}
