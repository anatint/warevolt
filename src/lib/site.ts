'use client';

import { useEffect } from 'react';
import headerDefaults from '@/content/sections/SiteHeader.json';
import footerDefaults from '@/content/sections/SiteFooter.json';
import popupDefaults from '@/content/sections/PopupForm.json';
import { useCommonCms, type CmsContent, type CmsRow } from '@/lib/cms';

/**
 * The shared site Header, loaded from the common "Header (All Pages)" Wix collection.
 * Groups (section): brand (logos + favicon), nav (menu items), mega-menu (Technology dropdown), actions (login, CTA, phone).
 */
export function useSiteHeader(): CmsContent {
  const header = useCommonCms('Header', headerDefaults as CmsRow[]);
  const favicon = header.one('brand', 'favicon').image;

  // Browser-tab icon, editable in the Header collection ("headerFavicon" field).
  useEffect(() => {
    if (!favicon) return;
    document.querySelectorAll('link[rel~="icon"]').forEach((el) => el.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.head.appendChild(link);
  }, [favicon]);

  return header;
}

/**
 * The shared site Footer, loaded from the common "Footer (All Pages)" Wix collection.
 * Groups (section): brand, quick-links, solution-links, contact, newsletter, legal.
 */
export function useSiteFooter(): CmsContent {
  return useCommonCms('Footer', footerDefaults as CmsRow[]);
}

/**
 * The pricing pop-up form, loaded from the common "Popup Form (All Pages)" Wix collection.
 * Groups (section): intro, fields (labels + placeholders), submit, success.
 */
export function useSitePopup(): CmsContent {
  return useCommonCms('PopupForm', popupDefaults as CmsRow[]);
}
