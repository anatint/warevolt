'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackMeta } from '@/lib/metaPixel';

/** What kind of contact a link starts, or null if it's an ordinary link. */
function contactMethod(href: string): 'whatsapp' | 'call' | 'email' | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith('tel:')) return 'call';
  if (h.startsWith('mailto:')) return 'email';
  if (h.startsWith('whatsapp:') || /(^|\/\/)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|chat\.whatsapp\.com)\b/.test(h)) return 'whatsapp';
  return null;
}

/**
 * Site-wide Meta events:
 * - PageView on first load and on every in-app page change (Next.js links don't reload the page).
 * - Contact when any WhatsApp, call or email link is clicked, wherever it is on the page
 *   (header, footer, contact page, CMS content).
 */
export default function MetaPixelPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    trackMeta('PageView');
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!link) return;
      const method = contactMethod(link.getAttribute('href') ?? '');
      if (method) trackMeta('Contact', { content_name: method });
    };
    // Capture phase, so it still runs if a component stops the click from bubbling.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
