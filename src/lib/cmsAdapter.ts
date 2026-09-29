/**
 * Converts the client-friendly Wix CMS collections (Hero Section, Cards & Lists, Header, Footer ...)
 * into the flat internal rows the page components read.
 *
 * The friendly collections are what the website owner sees and edits in the Wix dashboard
 * (plain field names such as "Heading", "Description", "Button Text").
 * The templates (src/content/cms-templates.json) describe how each friendly row expands to internal rows.
 * This file is pure (no imports) so it can be unit-tested with plain Node.
 */

export type InternalRow = {
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

type Row = Record<string, any>;
type SpecRow = { section: string; key: string; order: number; map: Record<string, string>; set?: Record<string, string> };
type ListSpec = { section: string; prefix: string; map: Record<string, string>; rows: { key: string; order: number }[] };
type TypedSpec = { section: string; prefix: string; map: Record<string, string>; set?: Record<string, string>; rows: { section: string; key: string; order: number; set?: Record<string, string> }[] };

export type Templates = {
  pages: Record<string, string>;
  records: Record<string, Record<string, any>>;
  lists: Record<string, Record<string, Record<string, ListSpec>>>;
  typed: Record<string, Record<string, TypedSpec>>;
};

/** Collections that describe one row of content per page/section, expanded into several internal rows. */
export const RECORD_COLLECTIONS = ['HeroSection', 'CtaSection', 'TextImageSections'] as const;
/** Collections where every friendly row is one item (card, logo, question ...) inside a section. */
export const LIST_COLLECTIONS = ['CardsAndLists', 'LogoSection', 'FaqSection', 'TestimonialsSection', 'DashboardDemoSection'] as const;
/** Common (all pages) collections where each row has an "Item Type". */
export const TYPED_COLLECTIONS = ['Header', 'Footer'] as const;

const has = (v: unknown) => v !== undefined && v !== null && String(v).trim() !== '';
const norm = (s: unknown) => String(s ?? '').trim().toLowerCase();
const ord = (r: Row) => (typeof r.order === 'number' ? r.order : Number(r.order ?? 0));

export function pageSlugFor(templates: Templates, pageName: unknown): string | undefined {
  const n = norm(pageName);
  return Object.keys(templates.pages).find((slug) => norm(templates.pages[slug]) === n);
}

function fill(target: Row, map: Record<string, string>, friendly: Row) {
  for (const [internalField, slot] of Object.entries(map)) {
    const v = friendly[slot];
    if (has(v)) target[internalField] = typeof v === 'string' ? v : String(v);
  }
}

function hasContent(r: Row) {
  return ['label', 'title', 'description', 'image', 'imageAlt', 'linkLabel', 'linkUrl', 'extra'].some((f) => has(r[f]));
}

/** Expands friendly rows of one collection into the internal rows the pages use. */
export function toInternalRows(collection: string, friendlyRows: Row[], templates: Templates): InternalRow[] {
  const out: InternalRow[] = [];

  if ((RECORD_COLLECTIONS as readonly string[]).includes(collection)) {
    for (const f of friendlyRows) {
      const slug = pageSlugFor(templates, f.pageName);
      if (!slug) continue;
      const pageSpec = templates.records[collection]?.[slug];
      if (!pageSpec) continue;
      // Hero / CTA: one spec per page. Text & Image Sections: one spec per section name.
      const spec: { rows: SpecRow[] } | undefined =
        collection === 'TextImageSections'
          ? Object.entries(pageSpec).find(([name]) => norm(name) === norm(f.sectionName))?.[1]
          : pageSpec;
      if (!spec) continue;
      for (const sr of spec.rows) {
        const row: Row = { page: slug, section: sr.section, key: sr.key, order: sr.order, ...(sr.set ?? {}) };
        fill(row, sr.map, f);
        if (hasContent(row)) out.push(row as InternalRow);
      }
    }
    return out;
  }

  if ((LIST_COLLECTIONS as readonly string[]).includes(collection)) {
    const groups = new Map<string, { slug: string; spec: ListSpec; rows: Row[] }>();
    for (const f of friendlyRows) {
      const slug = pageSlugFor(templates, f.pageName);
      if (!slug) continue;
      const pageSpecs = templates.lists[collection]?.[slug];
      if (!pageSpecs) continue;
      // Only some collections have a "section name"; the others have exactly one list per page.
      const entry = Object.entries(pageSpecs).find(([name]) => (f.sectionName === undefined && f.panelName === undefined) || norm(name) === norm(f.sectionName ?? f.panelName));
      if (!entry) continue;
      const gk = slug + '|' + entry[0];
      if (!groups.has(gk)) groups.set(gk, { slug, spec: entry[1], rows: [] });
      groups.get(gk)!.rows.push(f);
    }
    for (const g of groups.values()) {
      const rows = [...g.rows].sort((a, b) => ord(a) - ord(b));
      rows.forEach((f, i) => {
        const n = g.spec.rows.length;
        const s = g.spec.rows[i] ?? { key: `${g.spec.prefix}-${i + 1}`, order: (g.spec.rows[n - 1]?.order ?? n) + (i - n + 1) };
        const row: Row = { page: g.slug, section: g.spec.section, key: s.key, order: s.order };
        fill(row, g.spec.map, f);
        if (hasContent(row)) out.push(row as InternalRow);
      });
    }
    return out;
  }

  if ((TYPED_COLLECTIONS as readonly string[]).includes(collection)) {
    const byType = new Map<string, Row[]>();
    for (const f of friendlyRows) {
      const t = Object.keys(templates.typed[collection] ?? {}).find((k) => norm(k) === norm(f.itemType));
      if (!t) continue;
      if (!byType.has(t)) byType.set(t, []);
      byType.get(t)!.push(f);
    }
    for (const [t, rows] of byType) {
      const spec = templates.typed[collection][t];
      [...rows].sort((a, b) => ord(a) - ord(b)).forEach((f, i) => {
        const s = spec.rows[i] ?? { section: spec.section, key: `${spec.prefix}-${i + 1}`, order: 100 + i };
        const row: Row = { section: s.section, key: s.key, order: s.order, ...(s.set ?? spec.set ?? {}) };
        fill(row, spec.map, f);
        if (hasContent(row)) out.push(row as InternalRow);
      });
    }
    return out;
  }

  return out;
}
