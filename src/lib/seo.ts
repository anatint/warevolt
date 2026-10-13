import type { Metadata } from 'next';
import seo from '@/content/seo.json';

export type SeoPage = keyof typeof seo;

export const SITE_URL = 'https://warevolt.com';
export const SITE_NAME = 'Warevolt';
export const OG_IMAGE = '/assets/warevolt-logo-transparent.png';

/** Static <title>/<meta description>/canonical/social tags for a page. Editors can override title/description live from the Wix CMS (SEO fields). */
export function seoMetadata(page: SeoPage): Metadata {
  const { title, description, path } = seo[page];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, type: 'website', url: path, siteName: SITE_NAME, images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  };
}

/** Every indexable page path, for the sitemap. */
export const SEO_PATHS: string[] = Object.values(seo).map((p) => p.path);
