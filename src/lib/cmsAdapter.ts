/**
 * Converts the content the website owner edits in Wix (one item per page collection, one field per
 * piece of content, e.g. "heroHeading") into the flat rows the page components read.
 *
 * The templates (src/content/cms-templates.json) say which CMS field feeds which piece of content.
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

/** [cmsFieldId | null, section, key, order, targetField, constantValue?] */
export type Entry = [string | null, string, string, number, string, string?];

export type Templates = {
  pages: Record<string, { name: string; id: string; entries: Entry[] }>;
  header: { id: string; entries: Entry[] };
  footer: { id: string; entries: Entry[] };
  popup: { id: string; entries: Entry[] };
};

const has = (v: unknown) => v !== undefined && v !== null && String(v).trim() !== '';
const CONTENT_FIELDS = ['label', 'title', 'description', 'image', 'imageAlt', 'linkLabel', 'linkUrl', 'extra'];

/**
 * Turns one CMS item into page rows.
 * `managed` lists every "section|key" that the CMS controls, so content the owner clears really disappears
 * instead of falling back to the bundled default.
 */
export function convertItem(
  entries: Entry[],
  item: Record<string, any> | undefined,
  page?: string,
): { rows: InternalRow[]; managed: Set<string> } {
  const managed = new Set<string>();
  const rows = new Map<string, Record<string, any>>();
  const consts = new Map<string, [string, string][]>();
  for (const [field, section, key, order, target, constant] of entries) {
    const id = `${section}|${key}`;
    managed.add(id);
    if (!rows.has(id)) rows.set(id, { ...(page ? { page } : {}), section, key, order });
    if (field === null) {
      if (!consts.has(id)) consts.set(id, []);
      consts.get(id)!.push([target, constant as string]);
    } else if (item && has(item[field])) {
      rows.get(id)![target] = typeof item[field] === 'string' ? item[field] : String(item[field]);
    }
  }
  const out: InternalRow[] = [];
  for (const [id, row] of rows) {
    if (!CONTENT_FIELDS.some((f) => has(row[f]))) continue; // empty: the owner left every field blank
    for (const [target, constant] of consts.get(id) ?? []) row[target] = constant;
    out.push(row as InternalRow);
  }
  return { rows: out, managed };
}
