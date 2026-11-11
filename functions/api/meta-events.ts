/**
 * Cloudflare Pages Function: POST /api/meta-events
 *
 * Relays browser pixel events to the Meta Conversions API so they are also
 * recorded server-side (survives ad blockers / iOS tracking limits). Meta
 * de-duplicates them with the browser pixel using the shared event_id.
 *
 * The access token is never shipped to the browser. Set it as an encrypted
 * secret in Cloudflare: Pages project > Settings > Variables and Secrets >
 * META_CAPI_TOKEN. For local testing put it in .dev.vars (gitignored).
 */

interface Env {
  META_CAPI_TOKEN?: string;
  META_PIXEL_ID?: string;
  META_GRAPH_VERSION?: string;
  /** Optional: a test code from Events Manager > Test events, to see events there while testing. */
  META_TEST_EVENT_CODE?: string;
}

type Ctx = { request: Request; env: Env };

const DEFAULT_PIXEL_ID = '1017674128034912';
const ALLOWED_EVENTS = new Set(['PageView', 'ViewContent', 'AddToCart', 'InitiateCheckout', 'Search', 'Lead', 'Contact']);
const ALLOWED_HOSTS = [/(^|\.)warevolt\.com$/, /(^|\.)warevolt\.pages\.dev$/, /^localhost$/, /^127\.0\.0\.1$/];
const MAX_BODY = 8 * 1024;

interface IncomingEvent {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  fbp?: string;
  fbc?: string;
  custom_data?: Record<string, unknown>;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

function hostAllowed(url: string | null): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname;
    return ALLOWED_HOSTS.some((re) => re.test(host));
  } catch {
    return false;
  }
}

/** Keeps only the custom_data fields Meta uses for these events. */
function cleanCustomData(data: Record<string, unknown> | undefined) {
  if (!data || typeof data !== 'object') return undefined;
  const out: Record<string, unknown> = {};
  if (typeof data.value === 'number' && Number.isFinite(data.value)) out.value = data.value;
  if (typeof data.currency === 'string') out.currency = data.currency.slice(0, 3).toUpperCase();
  if (typeof data.content_name === 'string') out.content_name = data.content_name.slice(0, 200);
  if (typeof data.content_type === 'string') out.content_type = data.content_type.slice(0, 20);
  if (typeof data.num_items === 'number') out.num_items = data.num_items;
  if (Array.isArray(data.content_ids)) out.content_ids = data.content_ids.filter((x) => typeof x === 'string').slice(0, 50);
  if (Array.isArray(data.contents)) {
    out.contents = data.contents
      .filter((c): c is { id: string; quantity?: number } => !!c && typeof (c as { id?: unknown }).id === 'string')
      .slice(0, 50)
      .map((c) => ({ id: c.id, quantity: typeof c.quantity === 'number' ? c.quantity : 1 }));
  }
  return Object.keys(out).length ? out : undefined;
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  const token = env.META_CAPI_TOKEN;
  if (!token) return json(503, { error: 'Conversions API is not configured' });

  // Only accept events sent from the site's own pages.
  if (!hostAllowed(request.headers.get('origin')) && !hostAllowed(request.headers.get('referer'))) {
    return json(403, { error: 'Forbidden' });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { error: 'Payload too large' });

  let ev: IncomingEvent;
  try {
    ev = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  if (!ev.event_name || !ALLOWED_EVENTS.has(ev.event_name)) return json(400, { error: 'Unsupported event' });
  if (!ev.event_id || typeof ev.event_id !== 'string' || ev.event_id.length > 100) return json(400, { error: 'Missing event_id' });
  if (!hostAllowed(ev.event_source_url ?? null)) return json(400, { error: 'Invalid event_source_url' });

  const userData: Record<string, string> = {
    client_user_agent: request.headers.get('user-agent') ?? '',
  };
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) userData.client_ip_address = ip;
  if (typeof ev.fbp === 'string' && ev.fbp.startsWith('fb.')) userData.fbp = ev.fbp.slice(0, 200);
  if (typeof ev.fbc === 'string' && ev.fbc.startsWith('fb.')) userData.fbc = ev.fbc.slice(0, 500);

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: ev.event_name,
        event_id: ev.event_id,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: ev.event_source_url,
        user_data: userData,
        custom_data: cleanCustomData(ev.custom_data),
      },
    ],
  };
  if (env.META_TEST_EVENT_CODE) payload.test_event_code = env.META_TEST_EVENT_CODE;

  const pixelId = env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
  const version = env.META_GRAPH_VERSION || 'v24.0';
  const res = await fetch(
    `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }
  );

  if (!res.ok) {
    // Log Meta's reason server-side (visible in Cloudflare logs), but don't leak it to the browser.
    console.error('Meta CAPI error', res.status, (await res.text()).slice(0, 500));
    return json(502, { error: 'Upstream error' });
  }
  return json(200, { ok: true });
}
