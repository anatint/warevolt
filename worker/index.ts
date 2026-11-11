/**
 * Cloudflare Worker for warevolt.com.
 * Serves the static Next.js export (./out, via the ASSETS binding) and handles
 * the one server route the site needs: POST /api/meta-events (Meta Conversions API).
 */
import { handleMetaEvent, type Env as MetaEnv } from './meta-events';

interface Env extends MetaEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/meta-events' || pathname === '/api/meta-events/') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
      }
      return handleMetaEvent(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
