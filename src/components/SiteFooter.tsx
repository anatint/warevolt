'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteFooter } from '@/lib/site';

const linkStyle: React.CSSProperties = { fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' };
const legalLinkStyle: React.CSSProperties = { fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' };
const headingStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#fff',
  letterSpacing: '.07em',
  textTransform: 'uppercase',
  marginBottom: '24px',
};
const socialStyle: React.CSSProperties = {
  width: '38px',
  height: '38px',
  background: 'rgba(255,255,255,.08)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background .2s',
};

/** Internal hrefs use next/link, everything else (#, mailto:, tel:, external) a plain anchor. */
function SmartLink({ href, style, children }: { href?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const h = href || '#';
  if (h.startsWith('/')) {
    return (
      <Link href={h} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={h} style={style}>
      {children}
    </a>
  );
}

export default function SiteFooter({ onSubscribe }: { onSubscribe?: () => void } = {}) {
  const footer = useSiteFooter();

  const logo = footer.one('brand', 'logo');
  const description = footer.one('brand', 'description');
  const quickLinks = footer.list('quick-links');
  const solutionLinks = footer.list('solution-links');
  const contact = footer.list('contact');
  const newsletter = footer.one('newsletter');
  const legal = footer.list('legal');

  // order 0 = column heading row, everything else is a link
  const headingOf = (rows: typeof quickLinks) => rows.find((r) => r.order === 0 || r.key === 'heading')?.title ?? '';
  const linksOf = (rows: typeof quickLinks) => rows.filter((r) => !(r.order === 0 || r.key === 'heading'));

  const contactHeading = headingOf(contact);
  const contactRows = linksOf(contact);
  const contactByKey = (key: string) => contactRows.find((r) => r.key === key)?.description ?? '';

  const copyright = legal.find((r) => r.key === 'copyright');
  const legalLinks = legal.filter((r) => r.key !== 'copyright');

  return (
    <footer style={{ background: '#0B0619', padding: '80px clamp(20px,5%,80px) 40px', color: 'rgba(255,255,255,.6)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '60px', marginBottom: '64px' }}>
          <div>
            <div style={{ display: 'inline-block', marginBottom: '20px' }}>
              <img
                src={logo.image || '/uploads/warevolt-logo-footer-transparent.png'}
                alt={logo.imageAlt || 'Warevolt'}
                style={{ height: '88px', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.8, marginBottom: '28px', maxWidth: '280px' }}>{description.description ?? ''}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={socialStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="#" style={socialStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" /></svg>
              </a>
              <a href="#" style={socialStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="4" cy="4" r="2" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>{headingOf(quickLinks)}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {linksOf(quickLinks).map((r, i) => (
                <SmartLink key={r.key ?? i} href={r.linkUrl} style={linkStyle}>
                  {r.linkLabel ?? ''}
                </SmartLink>
              ))}
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>{headingOf(solutionLinks)}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {linksOf(solutionLinks).map((r, i) => (
                <SmartLink key={r.key ?? i} href={r.linkUrl} style={linkStyle}>
                  {r.linkLabel ?? ''}
                </SmartLink>
              ))}
            </div>
          </div>

          <div>
            <h4 style={headingStyle}>{contactHeading}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /><circle cx="12" cy="10" r="3" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /></svg>
                <span style={{ fontSize: '14px', lineHeight: 1.6 }}>{contactByKey('address')}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.19 6.19l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /></svg>
                <span style={{ fontSize: '14px' }}>{contactByKey('phone')}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /><polyline points="22,6 12,13 2,6" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /></svg>
                <span style={{ fontSize: '14px' }}>{contactByKey('email')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder={newsletter.label ?? ''}
                style={{ flex: 1, background: 'rgba(255,255,255,.08)', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '13.5px', outline: 'none' }}
              />
              <button onClick={onSubscribe} style={{ background: '#4D0DD9', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 18px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {newsletter.linkLabel ?? ''}
              </button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)' }}>{copyright?.description ?? ''}</p>
          <div style={{ display: 'flex', gap: '28px' }}>
            {legalLinks.map((r, i) => (
              <SmartLink key={r.key ?? i} href={r.linkUrl} style={legalLinkStyle}>
                {r.linkLabel ?? ''}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
