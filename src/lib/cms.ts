'use client';

import { useEffect, useMemo, useState } from 'react';
import { wixClient } from '@/lib/wixClient';
import { toInternalRows, type InternalRow, type Templates } from '@/lib/cmsAdapter';
import templatesJson from '@/content/cms-templates.json';

const templates = templatesJson as unknown as Templates;

/**
 * One piece of content as the page components read it. The website owner never sees this shape:
 * in the Wix dashboard they edit the friendly collections (Hero Section, Cards & Lists, Header ...),
 * and src/lib/cmsAdapter.ts converts those rows into this flat form.
 */
export type CmsRow = InternalRow;

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

/** Wix collections that hold the content of the individual pages (each row has a "Page Name"). */
export const PAGE_COLLECTIONS = [
  'HeroSection',
  'TextImageSections',
  'CardsAndLists',
  'FaqSection',
  'LogoSection',
  'CtaSection',
  'TestimonialsSection',
  'DashboardDemoSection',
] as const;

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

/** Reads a friendly collection from Wix (optionally only one page's rows) and converts it for the pages. */
async function loadCollection(collectionId: string, pageName?: string): Promise<CmsRow[]> {
  let q = wixClient.items.query(collectionId);
  if (pageName) q = q.eq('pageName', pageName);
  const res = await q.limit(1000).find();
  return toInternalRows(collectionId, res.items as any[], templates).map((r) => ({ ...r, image: wixImageUrl(r.image) }));
}

/**
 * Loads all of one page's content from the section-wise Wix CMS collections
 * (Hero Section, Text & Image Sections, Cards & Lists, FAQ, Logos, Call To Action, Testimonials, Dashboard Demo),
 * filtered by the page's name. The bundled `defaults` render first (the static HTML is complete and SEO-friendly),
 * then live CMS content replaces them section by section as soon as it arrives.
 * If Wix is unreachable, the defaults simply stay on screen.
 */
export function usePageCms(page: string, defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    const pageName = templates.pages[page];
    Promise.allSettled(PAGE_COLLECTIONS.map((id) => loadCollection(id, pageName))).then((results) => {
      if (cancelled) return;
      const live = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
      results.forEach((r, i) => {
        if (r.status === 'rejected') console.warn(`CMS "${PAGE_COLLECTIONS[i]}" unavailable, using bundled content`, r.reason);
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

/** Loads a whole common (all pages) collection: "Header" or "Footer". */
export function useCommonCms(collectionId: string, defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    loadCollection(collectionId)
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
