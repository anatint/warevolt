'use client';

import headerDefaults from '@/content/sections/SiteHeader.json';
import footerDefaults from '@/content/sections/SiteFooter.json';
import { useCommonCms, type CmsContent, type CmsRow } from '@/lib/cms';

/**
 * The shared site Header, loaded from the common "SiteHeader" Wix collection.
 * Groups (section): brand (logos), nav (menu items), mega-menu (Technology dropdown), actions (login, CTA, phone).
 */
export function useSiteHeader(): CmsContent {
  return useCommonCms('SiteHeader', headerDefaults as CmsRow[]);
}

/**
 * The shared site Footer, loaded from the common "SiteFooter" Wix collection.
 * Groups (section): brand, quick-links, solution-links, contact, newsletter, legal.
 */
export function useSiteFooter(): CmsContent {
  return useCommonCms('SiteFooter', footerDefaults as CmsRow[]);
}
