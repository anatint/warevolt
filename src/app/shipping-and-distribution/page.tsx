'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import { usePageCms, CmsRow } from '@/lib/cms';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import defaults from '@/content/shipping-distribution.json';

const INDIGO = '#4F1CF7';
const NAVY = '#1A1147';
const BODY = '#6B6A8C';

const ico = { stroke: INDIGO, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

const whyIcons = [
  // percent badge
  <><circle cx="12" cy="12" r="9" {...ico} /><path d="M9 15l6-6" {...ico} /><circle cx="9.3" cy="9.3" r="1" {...ico} /><circle cx="14.7" cy="14.7" r="1" {...ico} /></>,
  // shield + check
  <><path d="M12 3l7 2.6v5.7c0 4.4-3 7.6-7 9.2-4-1.6-7-4.8-7-9.2V5.6z" {...ico} /><path d="M9 12l2.2 2.2L15.2 10" {...ico} /></>,
  // no entry
  <><circle cx="12" cy="12" r="9" {...ico} /><path d="M5.7 5.7l12.6 12.6" {...ico} /></>,
  // connected nodes
  <><circle cx="12" cy="7" r="2" {...ico} /><circle cx="6" cy="17" r="2" {...ico} /><circle cx="18" cy="17" r="2" {...ico} /><path d="M11 8.8L7 15.2M13 8.8l4 6.4M8 17h8" {...ico} /></>,
  // gear
  <><circle cx="12" cy="12" r="3" {...ico} /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" {...ico} /><circle cx="12" cy="12" r="6.5" {...ico} /></>,
  // sync arrows
  <><path d="M4 11a8 8 0 0113.7-4.7L20 8.5M20 4v4.5h-4.5M20 13a8 8 0 01-13.7 4.7L4 15.5M4 20v-4.5h4.5" {...ico} /></>,
];

const stepIcons = [
  // storefront
  <><path d="M4 9l1.2-4h13.6L20 9M4 9h16M4 9v10h16V9M9 19v-5h6v5" {...ico} /></>,
  // box
  <><path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" {...ico} /><path d="M4 7.2l8 4.3 8-4.3M12 11.5V21" {...ico} /></>,
  // box (fulfil)
  <><path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" {...ico} /><path d="M4 7.2l8 4.3 8-4.3M12 11.5V21" {...ico} /></>,
  // device with pin
  <><rect x="5" y="3" width="14" height="14" rx="3" {...ico} /><path d="M12 14.5s-3-2.4-3-4.7a3 3 0 016 0c0 2.3-3 4.7-3 4.7z" {...ico} /><path d="M9 20h6" {...ico} /></>,
];

const svcIcons = [
  // truck
  <><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" {...ico} /><circle cx="7" cy="17.5" r="1.7" {...ico} /><circle cx="17" cy="17.5" r="1.7" {...ico} /></>,
  // box
  <><path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" {...ico} /><path d="M4 7.2l8 4.3 8-4.3M12 11.5V21" {...ico} /></>,
  // truck (small)
  <><path d="M3 7h10v9H3zM13 10h4l3 3v3h-7" {...ico} /><circle cx="7" cy="17.5" r="1.7" {...ico} /><circle cx="16.5" cy="17.5" r="1.7" {...ico} /></>,
  // warehouse
  <><path d="M3 10l9-6 9 6v10H3zM8 20v-6h8v6M8 14h8" {...ico} /></>,
  // delivery cart
  <><path d="M3 5h3l2 9h9l2-6H7" {...ico} /><circle cx="9.5" cy="18.5" r="1.5" {...ico} /><circle cx="16.5" cy="18.5" r="1.5" {...ico} /></>,
];

function Eyebrow({ children, color = INDIGO }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
      <span style={{ width: '26px', height: '2px', background: color, borderRadius: '2px', flexShrink: 0 }} />
      <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.16em', color, textTransform: 'uppercase' }}>{children}</span>
    </div>
  );
}

function CenterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '44px' }}>
      <span style={{ width: '28px', height: '2px', background: INDIGO, borderRadius: '2px' }} />
      <h2 style={{ fontSize: 'clamp(24px,2.4vw,32px)', fontWeight: 800, color: NAVY, letterSpacing: '-.02em', textAlign: 'center' }}>{children}</h2>
      <span style={{ width: '28px', height: '2px', background: INDIGO, borderRadius: '2px' }} />
    </div>
  );
}

const iconCircle: React.CSSProperties = {
  width: '46px',
  height: '46px',
  borderRadius: '50%',
  background: '#EEEBFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(160deg,#FFFFFF 0%,#FAF9FF 100%)',
  border: '1px solid #ECE8FA',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(79,28,247,.06)',
};

const primaryBtn: React.CSSProperties = {
  background: '#4D0DD9',
  color: '#fff',
  padding: '14px 28px',
  borderRadius: '12px',
  fontSize: '14.5px',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  transition: 'background .2s, transform .2s',
};

const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ShippingAndDistributionPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const cms = usePageCms('shipping-distribution', defaults as CmsRow[]);
  const one = (section: string, key: string) => cms.one(section, key);
  const list = (section: string, prefix: string) => cms.list(section).filter((r) => (r.key ?? '').startsWith(prefix));

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
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setTimeout(() => {
          htmlEl.style.opacity = '1';
          htmlEl.style.transform = 'translateY(0)';
        }, delay + 60);
      } else {
        fadeObserver.observe(htmlEl);
      }
    });
    return () => fadeObserver.disconnect();
  }, []);

  const handlePricingSubmit = (data: PricingFormData) => {
    console.log('Pricing lead received from Shipping & Distribution:', data);
  };

  const logos = list('byoa', 'logo-');
  const logoStyle = (i: number): React.CSSProperties => {
    const base: React.CSSProperties = { background: '#fff', borderRadius: '10px', boxShadow: '0 4px 14px rgba(79,28,247,.08)', padding: '10px 14px', fontSize: '13px', fontWeight: 800, letterSpacing: '-.01em', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' };
    if (i === 0) return { ...base, color: '#2B1B6B', textTransform: 'lowercase', fontWeight: 700 };
    if (i === 1) return { ...base, color: '#111', letterSpacing: '.02em' };
    if (i === 2) return { ...base, color: '#0A5BC4', fontStyle: 'italic', fontWeight: 900 };
    if (i === 3) return { ...base, color: '#D4252F', fontWeight: 800 };
    return { ...base, color: '#8A87AA', fontWeight: 600, background: 'rgba(255,255,255,.7)' };
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#1C1030', background: '#fff', overflowX: 'hidden' }}>
      <style>{`
        .sd-split { display: grid; gap: 56px; align-items: center; }
        .sd-hero-grid { grid-template-columns: 1fr; }
        .sd-hero-grid > div { max-width: 520px; }
        .sd-partner-grid { grid-template-columns: .9fr 1.1fr; }
        .sd-byoa-grid { grid-template-columns: 1fr 1fr; }
        .sd-freight-grid { grid-template-columns: .95fr 1.05fr; }
        .sd-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .sd-steps { display: grid; grid-template-columns: 1fr 24px 1fr 24px 1fr 24px 1fr; gap: 8px; align-items: stretch; }
        .sd-svc-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .sd-guidance { display: flex; align-items: center; gap: 24px; }
        .sd-banner { display: flex; align-items: center; gap: 28px; }
        @media (min-width: 1101px) { .sd-h1 span { white-space: nowrap; } }
        @media (max-width: 1100px) {
          .sd-svc-grid { grid-template-columns: repeat(3, 1fr); }
          .sd-steps { grid-template-columns: 1fr 1fr; gap: 16px; }
          .sd-steps > .sd-step-arrow { display: none; }
        }
        @media (max-width: 900px) {
          .sd-hero-grid, .sd-partner-grid, .sd-byoa-grid, .sd-freight-grid { grid-template-columns: 1fr; gap: 36px; }
          .sd-why-grid { grid-template-columns: 1fr 1fr; }
          .sd-guidance, .sd-banner { flex-direction: column; align-items: flex-start; }
          #hero-section { height: auto !important; min-height: 0 !important; background-size: 170% auto !important; background-position: 88% 100% !important; }
          .sd-hero-body { padding-bottom: 270px !important; }
        }
        @media (max-width: 640px) {
          .sd-why-grid, .sd-steps, .sd-svc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section
        id="hero-section"
        className="sd-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `url(${one('hero', 'image').image}) right center / cover no-repeat, #0B0637`,
          minHeight: '680px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        <SiteHeaderNav onOpenPricing={() => setPricingOpen(true)} />

        <div className="sd-hero-body" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', padding: '24px clamp(20px,5%,80px) 56px' }}>
          <div className="sd-split sd-hero-grid" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
            <div>
              <Eyebrow color="#A78BFA">{one('hero', 'eyebrow').title}</Eyebrow>
              <h1 className="sd-h1" style={{ fontSize: 'clamp(30px,2.75vw,42px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.03em', marginBottom: '26px' }}>
                <span style={{ color: '#fff', display: 'block' }}>{one('hero', 'title-1').title}</span>
                <span style={{ color: '#B9A6FF', display: 'block' }}>{one('hero', 'title-2').title}</span>
              </h1>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.82)', lineHeight: 1.7, maxWidth: '500px', marginBottom: '16px' }}>{one('hero', 'p1').description}</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.82)', lineHeight: 1.7, maxWidth: '500px', marginBottom: '32px' }}>{one('hero', 'p2').description}</p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => setPricingOpen(true)} style={primaryBtn}>
                  {one('hero', 'btn-primary').linkLabel} <Arrow />
                </button>
                <a
                  href="#one-partner"
                  style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,.35)', color: '#fff', padding: '14px 28px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}
                >
                  {one('hero', 'btn-secondary').linkLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ONE FULFILMENT PARTNER ══ */}
      <section id="one-partner" style={{ padding: '84px clamp(20px,5%,80px)', background: '#FBFAFF', scrollMarginTop: '40px' }}>
        <div className="sd-split sd-partner-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-animate>
            <Eyebrow>{one('partner', 'eyebrow').title}</Eyebrow>
            <h2 style={{ fontSize: 'clamp(26px,2.3vw,34px)', fontWeight: 800, lineHeight: 1.18, letterSpacing: '-.02em', color: NAVY, marginBottom: '22px', whiteSpace: 'pre-line' }}>
              {one('partner', 'title').title}{' '}<span style={{ color: INDIGO }}>{one('partner', 'title-accent').title}</span>
            </h2>
            <p style={{ fontSize: '15.5px', color: BODY, lineHeight: 1.8, maxWidth: '520px', marginBottom: '34px' }}>{one('partner', 'description').description}</p>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '34px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2z" {...ico} strokeWidth={1.3} /><path d="M4 7.2l8 4.3 8-4.3M12 11.5V21" {...ico} strokeWidth={1.3} /></svg>
                <span style={{ fontSize: '14.5px', fontWeight: 700, color: NAVY, maxWidth: '110px', lineHeight: 1.35 }}>{one('partner', 'item-1').title}</span>
              </div>
              <span style={{ color: '#B8B3D8', alignSelf: 'center', fontSize: '18px' }}>→</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <svg width="46" height="42" viewBox="0 0 28 24" fill="none"><path d="M2 5h13v11H2zM15 9h5l4 4v3h-9" {...ico} strokeWidth={1.3} /><circle cx="7" cy="18" r="2" {...ico} strokeWidth={1.3} /><circle cx="19.5" cy="18" r="2" {...ico} strokeWidth={1.3} /></svg>
                <span style={{ fontSize: '14.5px', fontWeight: 700, color: NAVY, lineHeight: 1.35 }}>
                  {one('partner', 'item-2').title}
                  <br />
                  <span style={{ fontWeight: 500, color: BODY }}>{one('partner', 'item-2').description}</span>
                </span>
              </div>
            </div>
          </div>
          <div data-animate data-delay="80">
            <img src={one('partner', 'image').image} alt={one('partner', 'image').imageAlt ?? ''} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '18px', boxShadow: '0 30px 70px rgba(40,20,120,.14)' }} />
          </div>
        </div>
      </section>

      {/* ══ BYOA ══ */}
      <section style={{ padding: '84px clamp(20px,5%,80px)', background: 'linear-gradient(180deg,#F4F1FF 0%,#EFEBFF 100%)' }}>
        <div className="sd-split sd-byoa-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-animate>
            <Eyebrow>{one('byoa', 'eyebrow').title}</Eyebrow>
            <h2 style={{ fontSize: 'clamp(26px,2.3vw,34px)', fontWeight: 800, lineHeight: 1.18, letterSpacing: '-.02em', color: NAVY, marginBottom: '20px', whiteSpace: 'pre-line' }}>{one('byoa', 'title').title}</h2>
            <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#2A1B7A', marginBottom: '16px' }}>{one('byoa', 'subtitle').title}</h3>
            <p style={{ fontSize: '15.5px', color: BODY, lineHeight: 1.8, maxWidth: '540px', marginBottom: '30px' }}>{one('byoa', 'description').description}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {logos.map((l, i) => (
                <span key={l.key ?? i} style={logoStyle(i)}>
                  {i === 0 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 18L12 4l8 14-8-3z" fill="#5B2BE0" /></svg>}
                  {l.title}
                </span>
              ))}
            </div>
          </div>
          <div data-animate data-delay="80">
            <img src={one('byoa', 'image').image} alt={one('byoa', 'image').imageAlt ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ══ WHY BYOA ══ */}
      <section style={{ padding: '84px clamp(20px,5%,80px) 40px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-animate>
            <CenterHeading>{one('why', 'heading').title}</CenterHeading>
          </div>
          <div className="sd-why-grid" data-animate data-delay="60">
            {list('why', 'card-').map((c, i) => (
              <div key={c.key ?? i} style={{ ...cardStyle, padding: '28px 28px 30px' }}>
                <div style={{ ...iconCircle, marginBottom: '20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{whyIcons[i]}</svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: NAVY, marginBottom: '10px', lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ fontSize: '14px', color: BODY, lineHeight: 1.7 }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW BYOA WORKS ══ */}
      <section style={{ padding: '40px clamp(20px,5%,80px) 84px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-animate>
            <CenterHeading>{one('how', 'heading').title}</CenterHeading>
          </div>
          <div className="sd-steps" data-animate data-delay="60">
            {list('how', 'step-').map((s, i, arr) => (
              <React.Fragment key={s.key ?? i}>
                <div style={{ ...cardStyle, background: 'linear-gradient(160deg,#F8F6FF 0%,#F2EFFF 100%)', padding: '22px 22px 26px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ ...iconCircle, width: '40px', height: '40px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{stepIcons[i]}</svg>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: INDIGO, border: `1.5px solid #D9D0FF`, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: NAVY, marginBottom: '8px', lineHeight: 1.35 }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: BODY, lineHeight: 1.65 }}>{s.description}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="sd-step-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: INDIGO }}>
                    <Arrow size={16} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Shipping partner guidance */}
          <div className="sd-guidance" data-animate data-delay="100" style={{ marginTop: '28px', background: 'linear-gradient(120deg,#F1EDFF 0%,#EAE5FF 100%)', border: '1px solid #E3DCFF', borderRadius: '16px', padding: '26px 32px' }}>
            <div style={{ ...iconCircle, width: '56px', height: '56px', background: '#fff' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" {...ico} /><path d="M5 19c.8-3.4 3.5-5 7-5s6.2 1.6 7 5M4 12v2.5M20 12v2.5" {...ico} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: NAVY, marginBottom: '6px' }}>{one('guidance', 'block').title}</h3>
              <p style={{ fontSize: '14px', color: '#4A4670', lineHeight: 1.65, maxWidth: '760px' }}>{one('guidance', 'block').description}</p>
            </div>
            <Link href={one('guidance', 'block').linkUrl || '/contact'} style={primaryBtn}>
              {one('guidance', 'block').linkLabel} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MANAGED FREIGHT NETWORK ══ */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '84px clamp(20px,5%,80px)', background: 'linear-gradient(120deg,#0B0619 0%,#1A0E45 50%,#0F0828 100%)' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '2%', width: '520px', height: '520px', background: 'radial-gradient(circle,rgba(99,60,255,.3) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div className="sd-split sd-freight-grid" style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>
          <div data-animate>
            <Eyebrow color="#A78BFA">{one('freight', 'eyebrow').title}</Eyebrow>
            <h2 style={{ fontSize: 'clamp(28px,2.6vw,38px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.025em', color: '#fff', marginBottom: '22px', whiteSpace: 'pre-line' }}>{one('freight', 'title').title}</h2>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,.78)', lineHeight: 1.75, maxWidth: '540px', marginBottom: '16px' }}>{one('freight', 'p1').description}</p>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,.78)', lineHeight: 1.75, maxWidth: '540px' }}>{one('freight', 'p2').description}</p>
          </div>
          <div data-animate data-delay="80" style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={one('freight', 'image').image}
              alt={one('freight', 'image').imageAlt ?? ''}
              style={{ width: '100%', maxWidth: '640px', height: 'auto', display: 'block', WebkitMaskImage: 'radial-gradient(ellipse at center,#000 58%,transparent 98%)', maskImage: 'radial-gradient(ellipse at center,#000 58%,transparent 98%)' }}
            />
          </div>
        </div>
      </section>

      {/* ══ FREIGHT SERVICES + CLOSING BANNERS ══ */}
      <section style={{ padding: '84px clamp(20px,5%,80px) 84px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div data-animate>
            <CenterHeading>{one('services', 'heading').title}</CenterHeading>
          </div>
          <div className="sd-svc-grid" data-animate data-delay="60">
            {list('services', 'card-').map((c, i) => (
              <div key={c.key ?? i} style={{ ...cardStyle, background: 'linear-gradient(160deg,#FBFAFF 0%,#F4F1FF 100%)', padding: '24px 22px 26px' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '18px' }}>{svcIcons[i]}</svg>
                <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: NAVY, marginBottom: '10px', lineHeight: 1.35 }}>{c.title}</h3>
                <p style={{ fontSize: '13px', color: BODY, lineHeight: 1.65 }}>{c.description}</p>
              </div>
            ))}
          </div>

          {/* Dark banner */}
          <div className="sd-banner" data-animate data-delay="80" style={{ marginTop: '36px', background: 'linear-gradient(110deg,#150C3B 0%,#22126B 100%)', borderRadius: '14px', padding: '34px 40px', border: '1px solid rgba(255,255,255,.06)' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(124,91,251,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M14 4c3.5.2 6 2.7 6 6-2.4 3.8-5.2 6-9 7.2L6.8 13c1.2-3.8 3.4-6.6 7.2-9zM9 15l-4 4M7.5 12.5L4 12l2-2.5M11.5 16.5L12 20l2.5-2" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="14.6" cy="9.4" r="1.4" stroke="#fff" strokeWidth="1.4" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '.16em', color: '#A78BFA', marginBottom: '8px' }}>{one('cta-dark', 'block').label}</div>
              <h3 style={{ fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 800, color: '#fff', letterSpacing: '-.01em', marginBottom: '8px' }}>{one('cta-dark', 'block').title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.72)', lineHeight: 1.65, maxWidth: '760px' }}>{one('cta-dark', 'block').description}</p>
            </div>
            <button onClick={() => setPricingOpen(true)} style={{ ...primaryBtn, background: '#5B21F5' }}>
              {one('cta-dark', 'block').linkLabel} <Arrow />
            </button>
          </div>

          {/* Light banner */}
          <div className="sd-banner" data-animate data-delay="100" style={{ marginTop: '20px', background: 'linear-gradient(110deg,#F6F3FF 0%,#EAE4FF 100%)', borderRadius: '14px', padding: '30px 40px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.2" {...ico} /><circle cx="12" cy="4.5" r="1.6" {...ico} /><circle cx="12" cy="19.5" r="1.6" {...ico} /><circle cx="4.5" cy="8" r="1.6" {...ico} /><circle cx="19.5" cy="8" r="1.6" {...ico} /><circle cx="4.5" cy="16" r="1.6" {...ico} /><circle cx="19.5" cy="16" r="1.6" {...ico} /><path d="M12 6.1v3.7M12 14.2v3.7M5.8 8.8l4.3 2.2M13.9 13l4.3 2.2M18.2 8.8L13.9 11M10.1 13l-4.3 2.2" {...ico} /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 'clamp(20px,2vw,26px)', fontWeight: 800, color: NAVY, marginBottom: '6px' }}>{one('cta-light', 'block').title}</h3>
              <p style={{ fontSize: '14px', color: BODY }}>{one('cta-light', 'block').description}</p>
            </div>
            <Link href={one('cta-light', 'block').linkUrl || '/contact'} style={primaryBtn}>
              {one('cta-light', 'block').linkLabel} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <SiteFooter onSubscribe={() => setPricingOpen(true)} />

      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} onSubmit={handlePricingSubmit} />
    </div>
  );
}
