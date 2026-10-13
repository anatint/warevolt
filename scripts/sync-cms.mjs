// Refreshes the bundled default content (src/content/*.json) from the live Wix CMS, so the statically
// exported HTML already contains the real images/text on first paint (no flash of old defaults).
// Runs before every build (npm "prebuild"). If Wix is unreachable the existing files are kept.
import { readFileSync, writeFileSync } from 'node:fs';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const root = new URL('../src/content/', import.meta.url);
const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '565ec5eb-181b-46e2-903c-3a82062e152a';
const wix = createClient({ modules: { items }, auth: OAuthStrategy({ clientId }) });
const templates = JSON.parse(readFileSync(new URL('cms-templates.json', root), 'utf8'));

const FILES = {
  home: 'home.json',
  platform: 'platform.json',
  'order-warehouse': 'order-warehouse.json',
  'inventory-returns': 'inventory-returns.json',
  'analytics-reporting': 'analytics-reporting.json',
  'd2c-marketplace': 'd2c-marketplace.json',
  'quick-ecommerce': 'quick-ecommerce.json',
  contact: 'contact.json',
  'b2b-isometric': 'b2b-isometric.json',
  'shipping-distribution': 'shipping-distribution.json',
};

const has = (v) => v !== undefined && v !== null && String(v).trim() !== '';
const CONTENT_FIELDS = ['label', 'title', 'description', 'image', 'imageAlt', 'linkLabel', 'linkUrl', 'extra'];

// Same conversions as src/lib/cms.ts + src/lib/cmsAdapter.ts.
function mediaToString(v) {
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) {
    const first = v[0];
    if (typeof first === 'string') return first;
    if (first && typeof first.src === 'string') return first.src;
    return '';
  }
  return String(v);
}
function wixImageUrl(src) {
  if (!src) return undefined;
  if (src.startsWith('wix:image://v1/')) return `https://static.wixstatic.com/media/${src.slice(15).split('/')[0].split('#')[0]}`;
  if (src.startsWith('wix:video://v1/')) return `https://video.wixstatic.com/video/${src.slice(15).split('/')[0].split('#')[0]}/720p/mp4/file.mp4`;
  return src;
}
function convertItem(entries, item, page) {
  const managed = new Set();
  const rows = new Map();
  const consts = new Map();
  for (const [field, section, key, order, target, constant] of entries) {
    const id = `${section}|${key}`;
    managed.add(id);
    if (!rows.has(id)) rows.set(id, { ...(page ? { page } : {}), section, key, order });
    if (field === null) {
      if (!consts.has(id)) consts.set(id, []);
      consts.get(id).push([target, constant]);
    } else if (item && has(item[field])) {
      rows.get(id)[target] = mediaToString(item[field]);
    }
  }
  const out = [];
  for (const [id, row] of rows) {
    if (!CONTENT_FIELDS.some((f) => has(row[f]))) continue;
    for (const [target, constant] of consts.get(id) ?? []) row[target] = constant;
    out.push(row);
  }
  return { rows: out, managed };
}

async function sync(file, collectionId, entries, page) {
  const path = new URL(file, root);
  const defaults = JSON.parse(readFileSync(path, 'utf8'));
  const res = await wix.items.query(collectionId).limit(1).find();
  const item = res.items[0];
  if (!item) throw new Error('collection is empty');
  const { rows, managed } = convertItem(entries, item, page);
  const live = rows.map((r) => ({ ...r, image: wixImageUrl(r.image) }));
  const merged = [...defaults.filter((r) => !managed.has(`${r.section}|${r.key}`)), ...live];
  merged.forEach((r) => r.image === undefined && delete r.image);
  writeFileSync(path, JSON.stringify(merged, null, 1) + '\n');
  return merged.length;
}

const jobs = [
  ...Object.entries(templates.pages).map(([page, d]) => [FILES[page], d.id, d.entries, page]),
  ['sections/SiteHeader.json', templates.header.id, templates.header.entries],
  ['sections/SiteFooter.json', templates.footer.id, templates.footer.entries],
  ['sections/PopupForm.json', templates.popup.id, templates.popup.entries],
];

for (const [file, id, entries, page] of jobs) {
  try {
    const n = await sync(file, id, entries, page);
    console.log(`[sync-cms] ${file}: ${n} rows from "${id}"`);
  } catch (err) {
    console.warn(`[sync-cms] ${file}: kept bundled content (${err?.message ?? err})`);
  }
}
