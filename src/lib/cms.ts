'use client';

import { useEffect, useMemo, useState } from 'react';
import { wixClient } from '@/lib/wixClient';
import { convertItem, type Entry, type InternalRow, type Templates } from '@/lib/cmsAdapter';
import templatesJson from '@/content/cms-templates.json';

const templates = templatesJson as unknown as Templates;

/**
 * One piece of content as the page components read it. The website owner never sees this shape:
 * in the Wix dashboard each page has ONE collection (e.g. "Home Page") whose fields are grouped by section
 * (heroHeading, aboutParagraph1 ...), and src/lib/cmsAdapter.ts converts that item into this flat form.
 */
export type CmsRow = InternalRow;

/** Converts a Wix media reference (wix:image://v1/<id>/<name>) into a browser-loadable URL. */
export function wixImageUrl(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith('wix:image://v1/')) {
    const id = src.slice('wix:image://v1/'.length).split('/')[0].split('#')[0];
    return `https://static.wixstatic.com/media/${id}`;
  }
  if (src.startsWith('wix:video://v1/')) {
    const id = src.slice('wix:video://v1/'.length).split('/')[0].split('#')[0];
    return `https://video.wixstatic.com/video/${id}/720p/mp4/file.mp4`;
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

function toContent(rows: CmsRow[]): CmsContent {
  const list = (section: string) =>
    rows.filter((r) => r.section === section).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const one = (section: string, key?: string) =>
    list(section).find((r) => (key ? r.key === key : true)) ?? { section };
  return { rows, list, one };
}

/** Reads the single item of a collection and converts its fields into rows. */
const itemCache = new Map<string, Promise<Record<string, any> | undefined>>();

async function loadItem(collectionId: string, entries: Entry[], page?: string) {
  // One request per collection, even when several components on the page need it (e.g. the pricing pop-up).
  if (!itemCache.has(collectionId)) {
    itemCache.set(
      collectionId,
      wixClient.items
        .query(collectionId)
        .limit(1)
        .find()
        .then((res) => res.items[0] as Record<string, any> | undefined)
        .catch((err) => {
          itemCache.delete(collectionId);
          throw err;
        }),
    );
  }
  const item = await itemCache.get(collectionId);
  if (!item) return null;
  const { rows, managed } = convertItem(entries, item, page);
  return { rows: rows.map((r) => ({ ...r, image: wixImageUrl(r.image) })), managed };
}

/**
 * Everything the CMS controls replaces the bundled default; anything the CMS does not manage keeps its default.
 * Content the owner clears in Wix disappears instead of falling back.
 */
function mergeManaged(defaults: CmsRow[], live: { rows: CmsRow[]; managed: Set<string> }): CmsRow[] {
  return [...defaults.filter((r) => !live.managed.has(`${r.section}|${r.key}`)), ...live.rows];
}

/**
 * Loads a page's content from its one Wix collection (Home Page, Platform Page ...).
 * The bundled `defaults` render first (the static HTML is complete and SEO-friendly), then live CMS content
 * replaces them as soon as it arrives. If Wix is unreachable, the defaults stay on screen.
 */
export function usePageCms(page: string, defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    const def = templates.pages[page];
    if (!def) return;
    loadItem(def.id, def.entries, page)
      .then((live) => {
        if (!cancelled && live) setRows(mergeManaged(defaults, live));
      })
      .catch((err) => console.warn(`CMS "${def.id}" unavailable, using bundled content`, err));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return useMemo(() => toContent(rows), [rows]);
}

/** Loads a common (all pages) collection: "Header", "Footer" or "PopupForm". */
export function useCommonCms(collectionId: 'Header' | 'Footer' | 'PopupForm', defaults: CmsRow[]): CmsContent {
  const [rows, setRows] = useState<CmsRow[]>(defaults);

  useEffect(() => {
    let cancelled = false;
    const def = collectionId === 'Header' ? templates.header : collectionId === 'Footer' ? templates.footer : templates.popup;
    loadItem(def.id, def.entries)
      .then((live) => {
        if (!cancelled && live) setRows(mergeManaged(defaults, live));
      })
      .catch((err) => console.warn(`CMS "${def.id}" unavailable, using bundled content`, err));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId]);

  return useMemo(() => toContent(rows), [rows]);
}
