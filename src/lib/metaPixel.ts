/**
 * Meta (Facebook) Pixel for warevolt, loaded on every page from the root layout.
 * Every event is sent twice with the same event ID: by the browser pixel and,
 * through /api/meta-events (a Cloudflare Pages Function), by the Conversions API.
 * Meta keeps one copy of each.
 */
export const META_PIXEL_ID = '1017674128034912';

/** Base snippet from Meta: loads fbevents.js and initialises the pixel. Page views are sent by MetaPixelPageViews. */
export const metaPixelScript = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');`;

const CAPI_ENDPOINT = '/api/meta-events';

type Fbq = (command: 'track', event: string, params?: Record<string, unknown>, options?: { eventID: string }) => void;

function cookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function newEventId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Sends a standard Meta event from the browser pixel and the Conversions API. */
export function trackMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const eventId = newEventId();

  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === 'function') fbq('track', event, params, { eventID: eventId });

  // keepalive lets the request finish even when the page is navigating away (e.g. to checkout).
  fetch(CAPI_ENDPOINT, {
    method: 'POST',
    keepalive: true,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      event_name: event,
      event_id: eventId,
      event_source_url: window.location.href,
      fbp: cookie('_fbp'),
      fbc: cookie('_fbc'),
      custom_data: params,
    }),
  }).catch(() => {
    /* server copy is best-effort; the browser pixel still recorded it */
  });
}
