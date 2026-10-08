import type { Metadata } from 'next';
import seo from '@/content/seo.json';

export type SeoPage = keyof typeof seo;

/** Static <title>/<meta description> for a page. Editors can override them live from the Wix CMS (SEO fields). */
export function seoMetadata(page: SeoPage): Metadata {
  const { title, description } = seo[page];
  return { title, description, openGraph: { title, description, type: 'website' } };
}
