'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import { usePageCms, CmsRow } from '@/lib/cms';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import defaults from '@/content/b2b-isometric.json';

export default function B2BIsometricPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const cms = usePageCms('b2b-isometric', defaults as CmsRow[]);

  const d2cServices = cms.list('d2c-services').filter((r) => r.key !== 'services-title').map((r) => r.title ?? '');

  const compliancePoints = cms.list('compliance').filter((r) => r.key !== 'compliance-title').map((r) => r.title ?? '');

  const faqs = cms.list('faq').filter((r) => (r.key ?? '').startsWith('faq-') && r.key !== 'faq-title' && r.key !== 'faq-help').map((r) => ({ q: r.title ?? '', a: r.description ?? '' }));
  const excellenceIcons = [
    <><circle cx="12" cy="12" r="9" stroke="#4F1CF7" strokeWidth="1.4" /><path d="M12 7v5l3.5 2" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>,
    <><path d="M6 3h9l3 3v15H6z" stroke="#4F1CF7" strokeWidth="1.4" strokeLinejoin="round" /><path d="M9 10h6M9 13.5h6M9 17h4" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" /></>,
    <><path d="M9 12l2 2 4-4" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.84 4.7a3.4 3.4 0 001.95-.81 3.4 3.4 0 014.42 0 3.4 3.4 0 001.95.81 3.4 3.4 0 013.13 3.13 3.4 3.4 0 00.81 1.95 3.4 3.4 0 010 4.42 3.4 3.4 0 00-.81 1.95 3.4 3.4 0 01-3.13 3.13 3.4 3.4 0 00-1.95.81 3.4 3.4 0 01-4.42 0 3.4 3.4 0 00-1.95-.81 3.4 3.4 0 01-3.13-3.13 3.4 3.4 0 00-.81-1.95 3.4 3.4 0 010-4.42 3.4 3.4 0 00.81-1.95 3.4 3.4 0 013.13-3.13z" stroke="#4F1CF7" strokeWidth="1.4" /></>,
    <><rect x="3" y="7" width="7" height="7" rx="1" stroke="#4F1CF7" strokeWidth="1.4" /><rect x="14" y="7" width="7" height="7" rx="1" stroke="#4F1CF7" strokeWidth="1.4" /><rect x="3" y="16" width="7" height="5" rx="1" stroke="#4F1CF7" strokeWidth="1.4" /><path d="M14 18h7" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" /></>,
    <><rect x="3" y="6" width="18" height="12" rx="1.5" stroke="#4F1CF7" strokeWidth="1.4" /><path d="M6.5 6v12M9.5 6v12M13 6v12M17 6v12" stroke="#4F1CF7" strokeWidth="1.4" /></>,
    <><path d="M4 12a8 8 0 1114 5.5" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" /><path d="M4 12l0 5h5" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></>,
    <><path d="M4 20V10M11 20V4M18 20v-7" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" /></>,
  ];
  const excellenceCards = cms.list('excellence').filter((r) => (r.key ?? '').startsWith('card-'));

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const delay = parseInt(htmlEl.dataset.delay || '0', 10);
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(28px)';
      htmlEl.style.transition = `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`;

      const rect = htmlEl.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (alreadyVisible) {
        setTimeout(() => {
          htmlEl.style.opacity = '1';
          htmlEl.style.transform = 'translateY(0)';
        }, delay + 60);
      } else {
        fadeObserver.observe(htmlEl);
      }
    });

    return () => {
      fadeObserver.disconnect();
    };
  }, []);

  const handlePricingSubmit = (data: PricingFormData) => {
    console.log('Pricing lead received from B2B Isometric Fulfillment:', data);
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#1C1030', background: '#fff', overflowX: 'hidden' }}>
      {/* ══ HERO SECTION ══ */}
      <section
        id="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(120deg,#0B0619 0%,#251157 40%,#160A38 70%,#0B0619 100%)',
          minHeight: '750px',
          height: '750px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <style>{`
          @media (min-width: 901px) {
            #hero-section {
              height: 750px !important;
              min-height: 750px !important;
            }
          }
          @media (max-width: 900px) {
            #hero-section {
              height: auto !important;
              min-height: 750px !important;
            }
          }
        `}</style>
        <div style={{ position: 'absolute', top: '-100px', left: '-6%', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(77,13,217,.32) 0%,transparent 65%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-140px', right: '-6%', width: '460px', height: '460px', background: 'radial-gradient(circle,rgba(124,91,251,.28) 0%,transparent 65%)', pointerEvents: 'none' }}></div>

        {/* Main hero nav */}
        <SiteHeaderNav onOpenPricing={() => setPricingOpen(true)} />

        {/* Hero Body */}
        <div id="hero-body" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', padding: '16px clamp(20px,5%,80px) 28px' }}>
          <div id="d2c-hero-grid" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '52px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,.68)', letterSpacing: '.04em', marginBottom: '14px' }}>
                {cms.one('hero', 'hero-eyebrow').title ?? ''}
              </div>
              <h1 style={{ fontSize: 'clamp(34px,3.8vw,52px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.03em', color: '#fff', maxWidth: '880px', marginBottom: '20px' }}>
                {cms.one('hero', 'hero-title').title ?? ''}
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.85)', lineHeight: 1.68, maxWidth: '740px', marginBottom: '32px' }}>
                {cms.one('hero', 'hero-description').description ?? ''}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: '#4D0DD9', color: '#fff', padding: '14px 30px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {cms.one('hero', 'hero-cta-primary').linkLabel ?? ''}
                </button>
                <Link
                  href="/contact"
                  style={{ background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.28)', color: '#fff', padding: '14px 30px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  {cms.one('hero', 'hero-cta-secondary').linkLabel ?? ''}
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={cms.one('hero', 'hero-image').image} alt={cms.one('hero', 'hero-image').imageAlt ?? ''} style={{ width: '100%', maxWidth: '470px', maxHeight: '360px', height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLATFORM/MARKETPLACE LOGO STRIP ══ */}
      <section style={{ padding: '28px 0', background: '#fff', borderBottom: '1px solid #F0EBF8', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div style={{ display: 'flex', gap: '88px', alignItems: 'center', animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
            {[...cms.list('logo-strip'), ...cms.list('logo-strip')].map((r) => ({ src: r.image, alt: r.imageAlt ?? r.title ?? '' })).map((logo, idx) => (
              <div key={idx} style={{ width: '160px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={logo.src} alt={logo.alt} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTRO STATEMENT ══ */}
      <section style={{ padding: '76px clamp(20px,5%,80px)', background: '#F7F6FB' }}>
        <div data-animate style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px,2.6vw,36px)', fontWeight: 800, lineHeight: 1.3, letterSpacing: '-.02em', color: '#0B0619' }}>
            {cms.one('intro', 'intro-title').title ?? ''}
          </h2>
        </div>
      </section>

      {/* ══ B2B FULFILLMENT ══ */}
      <section id="d2c" style={{ position: 'relative', overflow: 'hidden', padding: '96px clamp(20px,5%,80px)', background: '#fff' }}>
        <div id="d2c-section-grid" style={{ position: 'relative', maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: '80px', alignItems: 'stretch' }}>
          <div data-animate style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(20,10,50,.1)', minHeight: '340px' }}>
            <img src={cms.one('d2c-fulfillment', 'd2c-image').image} alt={cms.one('d2c-fulfillment', 'd2c-image').imageAlt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <h2 data-animate style={{ fontSize: 'clamp(30px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', lineHeight: 1.15, marginBottom: '20px' }}>
              {cms.one('d2c-fulfillment', 'd2c-title').title ?? ''}
            </h2>
            <p data-animate data-delay="30" style={{ fontSize: '19px', fontWeight: 600, color: '#fff', background: '#4F1CF7', lineHeight: 1.5, marginBottom: '28px', padding: '16px 20px', borderRadius: '12px' }}>
              {cms.one('d2c-fulfillment', 'd2c-highlight').description ?? ''}
            </p>
            <p data-animate data-delay="70" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '22px' }}>
              {cms.one('d2c-fulfillment', 'd2c-paragraph-1').description ?? ''}
            </p>
            <p data-animate data-delay="110" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '22px' }}>
              {cms.one('d2c-fulfillment', 'd2c-paragraph-2').description ?? ''}
            </p>
            <p data-animate data-delay="150" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '26px' }}>
              {cms.one('d2c-fulfillment', 'd2c-paragraph-3').description ?? ''}
            </p>
            <div data-animate data-delay="180" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0619' }}>{cms.one('d2c-fulfillment', 'd2c-badge-1').title ?? ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0619' }}>{cms.one('d2c-fulfillment', 'd2c-badge-2').title ?? ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0619' }}>{cms.one('d2c-fulfillment', 'd2c-badge-3').title ?? ''}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ B2B FULFILLMENT SERVICES ══ */}
      <section style={{ padding: '88px clamp(20px,5%,80px)', background: '#F5F3FE' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '48px', textAlign: 'center' }}>
            {cms.one('d2c-services', 'services-title').title ?? ''}
          </h2>
          <div id="d2c-services-grid" data-animate data-delay="60" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            {d2cServices.map((service, idx) => (
              <div
                key={idx}
                style={{
                  flex: '0 1 calc(33.333% - 11px)',
                  minWidth: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: '#fff',
                  borderRadius: '14px',
                  padding: '16px 18px',
                  boxShadow: '0 6px 18px rgba(20,10,50,.05)',
                  transition: 'transform .2s, box-shadow .2s',
                }}
              >
                <div style={{ width: '34px', height: '34px', background: '#F0EEFF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: '14.5px', fontWeight: 600, color: '#0B0619', lineHeight: 1.4 }}>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ B2B DISTRIBUTION ══ */}
      <section id="marketplace" style={{ position: 'relative', overflow: 'hidden', background: '#0B0619' }}>
        <div role="img" aria-label={cms.one('marketplace', 'marketplace-background').imageAlt} style={{ position: 'absolute', inset: 0, backgroundImage: `url('${cms.one('marketplace', 'marketplace-background').image ?? ''}')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(11,6,25,.94) 0%,rgba(11,6,25,.82) 40%,rgba(11,6,25,.55) 65%,rgba(11,6,25,.3) 100%)', zIndex: 1 }}></div>
        <div id="marketplace-section-grid" style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', padding: '110px clamp(20px,5%,80px)', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 data-animate style={{ fontSize: 'clamp(34px,4.2vw,58px)', fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.08, color: '#fff', marginBottom: '24px' }}>
              {cms.one('marketplace', 'marketplace-title').title ?? ''}
            </h2>
            <p data-animate data-delay="60" style={{ fontSize: '17px', fontWeight: 600, color: '#C9B8FF', lineHeight: 1.6, marginBottom: '22px', maxWidth: '460px' }}>
              {cms.one('marketplace', 'marketplace-highlight').description ?? ''}
            </p>
            <p data-animate data-delay="100" style={{ fontSize: '15px', color: 'rgba(255,255,255,.72)', lineHeight: 1.85, maxWidth: '460px', marginBottom: '16px' }}>
              {cms.one('marketplace', 'marketplace-paragraph-1').description ?? ''}
            </p>
            <p data-animate data-delay="140" style={{ fontSize: '15px', color: 'rgba(255,255,255,.72)', lineHeight: 1.85, maxWidth: '460px' }}>
              {cms.one('marketplace', 'marketplace-paragraph-2').description ?? ''}
            </p>
          </div>
          <div id="marketplace-hero-tiles" data-animate data-delay="80" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#fff', letterSpacing: '.01em', lineHeight: 1.4 }}>
                {cms.one('marketplace', 'tile-1').title ?? ''}
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{cms.one('marketplace', 'tile-2').title ?? ''}</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>{cms.one('marketplace', 'tile-2').description ?? ''}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{cms.one('marketplace', 'tile-3').title ?? ''}</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>{cms.one('marketplace', 'tile-3').description ?? ''}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{cms.one('marketplace', 'tile-4').title ?? ''}</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>{cms.one('marketplace', 'tile-4').description ?? ''}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPLIANCE ══ */}
      <section style={{ padding: '88px clamp(20px,5%,80px)', background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div data-animate style={{ maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '16px' }}>
              {cms.one('compliance', 'compliance-title').title ?? ''}
            </h2>
            <p style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8 }}>
              {cms.one('compliance', 'compliance-title').description ?? ''}
            </p>
          </div>
          <div id="compliance-grid" data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '1000px', margin: '0 auto' }}>
            {compliancePoints.map((point, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '18px 20px',
                  borderBottom: idx < 6 ? '1px solid #E4DEF5' : 'none',
                  borderRight: idx % 2 === 0 ? '1px solid #E4DEF5' : 'none',
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0B0619' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPERATIONAL EXCELLENCE ══ */}
      <section style={{ padding: '88px clamp(20px,5%,80px)', background: '#F7F6FB' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div data-animate style={{ maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '16px' }}>
              {cms.one('excellence', 'excellence-title').title ?? ''}
            </h2>
            <p style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8 }}>
              {cms.one('excellence', 'excellence-title').description ?? ''}
            </p>
          </div>
          <div id="excellence-grid" data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {excellenceCards.slice(0, 3).map((c, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                  {excellenceIcons[0 + idx]}
                </svg>
                <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>{c.title ?? ''}</h3>
                <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>{c.description ?? ''}</p>
              </div>
            ))}
          </div>
          <div id="excellence-grid-2" data-animate data-delay="80" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '24px' }}>
            {excellenceCards.slice(3, 7).map((c, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                  {excellenceIcons[3 + idx]}
                </svg>
                <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>{c.title ?? ''}</h3>
                <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>{c.description ?? ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ padding: '96px clamp(20px,5%,80px)', background: '#fff' }}>
        <div id="faq-grid" style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: '56px', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <h2 data-animate style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', lineHeight: 1.15, marginBottom: '32px' }}>
              {(cms.one('faq', 'faq-title').title ?? '').split('\n').map((line, i) => (
                <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
              ))}
            </h2>
            <div data-animate data-delay="60" style={{ background: 'linear-gradient(160deg,#fff,#EDE7FF)', borderRadius: '18px', padding: '28px 26px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619', marginBottom: '8px' }}>{cms.one('faq', 'faq-help').title ?? ''}</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.7, marginBottom: '20px' }}>{cms.one('faq', 'faq-help').description ?? ''}</p>
              <a href={cms.one('faq', 'faq-help').linkUrl} style={{ display: 'inline-block', background: '#4F1CF7', color: '#fff', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                {cms.one('faq', 'faq-help').linkLabel ?? ''}
              </a>
            </div>
          </div>
          <div data-animate data-delay="60">
            {faqs.map((faq, idx) => (
              <details key={idx} className="faq-item" style={{ background: '#F7F6FB', borderRadius: '12px', padding: '16px 20px', marginBottom: '10px' }}>
                <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', fontSize: '15px', fontWeight: 600, color: '#0B0619' }}>
                  {faq.q}
                  <span className="faq-plus" style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', background: '#F0EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="11" height="7" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="#4F1CF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <p style={{ color: '#6B6480', lineHeight: 1.75, marginTop: '10px', paddingRight: '20px', fontSize: '13.5px' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section
        id="contact"
        style={{
          padding: '80px clamp(20px,5%,80px)',
          background: 'linear-gradient(120deg,#1E0894 0%,#4F1CF7 20%,#9D7BFF 45%,#4F1CF7 70%,#1E0894 100%)',
          backgroundSize: '300% 300%',
          animation: 'cta-gradient 6s ease-in-out infinite',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(0,0,0,.15) 0%,transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div data-animate style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '7px 18px', marginBottom: '28px', border: '1px solid rgba(255,255,255,.2)' }}>
            <div style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }}></div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '.04em' }}>{cms.one('cta', 'cta-badge').title ?? ''}</span>
          </div>
          <h2 data-animate data-delay="80" style={{ fontSize: 'clamp(34px,4vw,58px)', fontWeight: 800, letterSpacing: '-.035em', color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
            {cms.one('cta', 'cta-title').title ?? ''}
          </h2>
          <p data-animate data-delay="130" style={{ fontSize: '16.5px', color: 'rgba(255,255,255,.75)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 44px' }}>
            {cms.one('cta', 'cta-description').description ?? ''}
          </p>
          <div data-animate data-delay="180" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPricingOpen(true)}
              style={{ background: '#fff', color: '#4F1CF7', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              {cms.one('cta', 'cta-primary').linkLabel ?? ''}
            </button>
            <a href={cms.one('cta', 'cta-call').linkUrl} style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', color: '#fff', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.3)' }}>
              {cms.one('cta', 'cta-call').linkLabel ?? ''}
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <SiteFooter onSubscribe={() => setPricingOpen(true)} />

      {/* ══ EXACT PRICING POPUP MODAL ══ */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onSubmit={handlePricingSubmit}
      />
    </div>
  );
}
