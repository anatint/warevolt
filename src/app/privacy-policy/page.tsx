'use client';

import React, { useState } from 'react';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import PricingModal from '@/components/PricingModal';
import { usePageCms, type CmsRow } from '@/lib/cms';
import privacyDefaults from '@/content/privacy-policy.json';

/**
 * Turns a section's plain text from the CMS into paragraphs and bullet lists:
 * a blank line starts a new paragraph, a line starting with • (or - / *) is a bullet.
 * When the section has a link, its link text inside the copy becomes the anchor.
 */
function PolicyText({ text, link }: { text?: string; link?: { label?: string; url?: string } }) {
  if (!text) return null;

  const withLink = (s: string, k: string | number) => {
    const label = link?.label?.trim();
    const url = link?.url?.trim();
    if (!label || !url || !s.includes(label)) return s;
    const [before, ...rest] = s.split(label);
    return (
      <React.Fragment key={k}>
        {before}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
        {rest.join(label)}
      </React.Fragment>
    );
  };

  const blocks: React.ReactNode[] = [];
  text
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .forEach((chunk, ci) => {
      let bullets: string[] = [];
      let para: string[] = [];
      const flushPara = () => {
        if (para.length) blocks.push(<p key={`p${ci}-${blocks.length}`}>{withLink(para.join(' '), 0)}</p>);
        para = [];
      };
      const flushList = () => {
        if (bullets.length)
          blocks.push(
            <ul key={`u${ci}-${blocks.length}`}>
              {bullets.map((b, i) => (
                <li key={i}>{withLink(b, i)}</li>
              ))}
            </ul>
          );
        bullets = [];
      };
      for (const raw of chunk.split('\n')) {
        const line = raw.trim();
        if (!line) continue;
        const m = line.match(/^[•\-*]\s*(.*)$/);
        if (m) {
          flushPara();
          if (m[1]) bullets.push(m[1]);
        } else {
          flushList();
          para.push(line);
        }
      }
      flushPara();
      flushList();
    });
  return <>{blocks}</>;
}

export default function PrivacyPolicyPage() {
  const [pricingOpen, setPricingOpen] = useState(false);

  // All wording on this page comes from the "Privacy Policy Page" collection in Wix (bundled copy shows first).
  const cms = usePageCms('privacy-policy', privacyDefaults as CmsRow[]);
  const hero = cms.one('hero', 'hero');
  const updatedLabel = cms.one('hero', 'updated-label').label || 'Last Updated';
  const sections = cms.list('policy').filter((s) => s.title || s.description);
  const contact = (key: string) => cms.one('contact', key);
  const company = contact('company');
  const email = contact('email');
  const phone = contact('phone');
  const website = contact('website');
  const closing = contact('closing');

  const anchor = (s: CmsRow) => `section-${s.key}`;

  return (
    <div className="pp-root">
      <section className="pp-hero">
        <div className="pp-glow pp-glow-a" />
        <div className="pp-glow pp-glow-b" />
        <SiteHeaderNav onOpenPricing={() => setPricingOpen(true)} />
        <div className="pp-hero-body">
          {hero.label && (
            <div className="pp-eyebrow">
              <span />
              {hero.label}
            </div>
          )}
          <h1>{hero.title}</h1>
          <p className="pp-meta">
            {hero.description && <strong>{hero.description}</strong>}
            {hero.description && hero.extra && <span aria-hidden="true"> · </span>}
            {hero.extra && (
              <>
                {updatedLabel}: {hero.extra}
              </>
            )}
          </p>
        </div>
      </section>

      <main className="pp-main">
        <nav className="pp-toc" aria-label="On this page">
          <p className="pp-toc-title">On this page</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.key ?? i}>
                <a href={`#${anchor(s)}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="pp-article">
          {sections.map((s, i) => {
            const isLast = i === sections.length - 1;
            return (
              <section key={s.key ?? i} id={anchor(s)} className="pp-section">
                <h2>
                  <span className="pp-num">{i + 1}.</span> {s.title}
                </h2>
                <PolicyText text={s.description} link={{ label: s.linkLabel, url: s.linkUrl }} />
                {isLast && (company.title || email.title || phone.title || website.title) && (
                  <address className="pp-contact">
                    {company.title && <strong>{company.title}</strong>}
                    {email.title && (
                      <span>
                        {email.label || 'Email'}: <a href={`mailto:${email.title.trim()}`}>{email.title}</a>
                      </span>
                    )}
                    {phone.title && (
                      <span>
                        {phone.label || 'Phone'}: <a href={`tel:${phone.title.replace(/[^\d+]/g, '')}`}>{phone.title}</a>
                      </span>
                    )}
                    {website.title && (
                      <span>
                        {website.label || 'Website'}: <a href={website.title.trim()}>{website.title}</a>
                      </span>
                    )}
                  </address>
                )}
                {isLast && closing.description && <p>{closing.description}</p>}
              </section>
            );
          })}
        </article>
      </main>

      <SiteFooter onOpenPricing={() => setPricingOpen(true)} />
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
}
