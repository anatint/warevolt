'use client';

import { useEffect, useMemo, useState } from 'react';
import { wixClient } from '@/lib/wixClient';

/**
 * One row of content in a Wix CMS collection. Every section collection shares this shape:
 * a row is a piece of content (a heading, a paragraph, a card, a list item, an image...)
 * that belongs to a `section` and is sorted by `order`.
 * Collections that are reused across pages also carry a `page` field.
 */
export type CmsRow = {
  page?: string;
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

export type CmsContent = {
  rows: CmsRow[];
  /** All rows of a section, sorted by `order`. */
  list: (section: string) => CmsRow[];
  /** The first row of a section (or the row matching `key`), or an empty row. */
  one: (section: string, key?: string) => CmsRow;
};

/** Wix collections that hold reusable, section-wise page content. Each row carries a `page` field. */
export const SECTION_COLLECTIONS = [
  'PageHero',
  'ContentBlocks',
  'FeatureCards',
  'Faqs',
  'LogoStrip',
  'DashboardDemo',
  'CtaBanner',
  'Testimonials',
] as const;

function normalize(row: any): CmsRow {
  return { ...row, image: wixImageUrl(row.image) };
}

function toContent(rows: CmsRow[]): CmsContent {
  const list = (section: string) =>
    rows.filter((r) => r.section === section).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const one = (section: string, key?: string) =>
    list(section).find((r) => (key ? r.key === key : true)) ?? { section };
  return { rows, list, one };
}

/**
 * Overlays live CMS rows on top of bundled defaults, section by section:
 * a section present in the CMS replaces the bundled version, everything else keeps the defaults.
 */
function mergeBySection(defaults: CmsRow[], live: CmsRow[]): CmsRow[] {
  const liveSections = new Set(live.map((r) => r.section));
  return [...defaults.filter((r) => !liveSections.has(r.section)), ...live];
}

async function queryAll(collectionId: string, filter?: { page: string }): Promise<CmsRow[]> {
  let q = wixClient.items.query(collectionId);
  if (filter) q = q.eq('page', filter.page);
  const res = await q.ascending('order').limit(1000).find();
  return res.items.map(normalize);
}

/**
 * Loads all of one page's content from the section-wise Wix CMS collections
 * (Hero, Content Blocks, Feature Cards, FAQs, Logo Strips, Dashboard Demo, CTA Banners, Testimonials),
 * filtered by `page`. The bundled `defaults` render first (the static HTML is complete and SEO-friendly),
 * then live CMS content replaces them section by section as soon as it arrives.
 * If Wix is unreachable, the defaults simply stay on screen.
 */
export function usePageCms(page: string, defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled(SECTION_COLLECTIONS.map((id) => queryAll(id, { page }))).then((results) => {
      if (cancelled) return;
      const live = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
      results.forEach((r, i) => {
        if (r.status === 'rejected') console.warn(`CMS "${SECTION_COLLECTIONS[i]}" unavailable, using bundled content`, r.reason);
      });
      if (live.length > 0) setRows(mergeBySection(defaults, live));
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return useMemo(() => toContent(rows), [rows]);
}

/** Loads a whole common (page-independent) collection such as the shared Header or Footer. */
export function useCommonCms(collectionId: string, defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    queryAll(collectionId)
      .then((live) => {
        if (!cancelled && live.length > 0) setRows(mergeBySection(defaults, live));
      })
      .catch((err) => console.warn(`CMS "${collectionId}" unavailable, using bundled content`, err));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId]);

  return useMemo(() => toContent(rows), [rows]);
}
