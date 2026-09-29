'use client';

import headerDefaults from '@/content/sections/SiteHeader.json';
import footerDefaults from '@/content/sections/SiteFooter.json';
import { useCommonCms, type CmsContent, type CmsRow } from '@/lib/cms';

/**
 * The shared site Header, loaded from the common "Header (All Pages)" Wix collection.
 * Groups (section): brand (logos), nav (menu items), mega-menu (Technology dropdown), actions (login, CTA, phone).
 */
export function useSiteHeader(): CmsContent {
  return useCommonCms('Header', headerDefaults as CmsRow[]);
}

/**
 * The shared site Footer, loaded from the common "Footer (All Pages)" Wix collection.
 * Groups (section): brand, quick-links, solution-links, contact, newsletter, legal.
 */
export function useSiteFooter(): CmsContent {
  return useCommonCms('Footer', footerDefaults as CmsRow[]);
}
