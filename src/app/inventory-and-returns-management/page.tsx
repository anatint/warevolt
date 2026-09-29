'use client';

import React, { useState, useEffect } from 'react';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import { usePageCms, CmsRow } from '@/lib/cms';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import defaults from '@/content/inventory-returns.json';

export default function InventoryAndReturnsManagementPage() {
  const cms = usePageCms('inventory-returns', defaults as CmsRow[]);
  const [pricingOpen, setPricingOpen] = useState(false);
  const isCard = (r: CmsRow) => !!r.key && r.key.startsWith('card-');
  const inventoryCapabilities = cms.list('key-capabilities').filter(isCard).map((r) => ({ title: r.title ?? '', desc: r.description ?? '' }));
  const returnsCapabilities = cms.list('returns-capabilities').filter(isCard).map((r) => ({ num: r.label ?? '', title: r.title ?? '', desc: r.description ?? '' }));
  const hero = {
    eyebrow: cms.one('hero', 'hero-eyebrow'),
    title: cms.one('hero', 'hero-title'),
    desc: cms.one('hero', 'hero-description'),
    cta1: cms.one('hero', 'hero-cta-primary'),
    cta2: cms.one('hero', 'hero-cta-secondary'),
  };
  const overviewTitle = cms.one('overview', 'overview-title');
  const overviewP1 = cms.one('overview', 'overview-paragraph-1');
  const overviewP2 = cms.one('overview', 'overview-paragraph-2');
  const overviewImg = cms.one('overview', 'overview-image');
  const capHeader = cms.one('key-capabilities', 'header');
  const retEyebrow = cms.one('returns-intro', 'returns-eyebrow');
  const retTitle = cms.one('returns-intro', 'returns-title');
  const retDesc = cms.one('returns-intro', 'returns-description');
  const retImg = cms.one('returns-intro', 'returns-image');
  const retCapHeader = cms.one('returns-capabilities', 'header');
  const chHeading = cms.one('automation-channels', 'heading');
  const channels = cms.list('automation-channels').filter((r) => !!r.key && r.key.startsWith('channel-'));
  const feedTitle = cms.one('automation-feed', 'feed-title');
  const feedStatus = cms.one('automation-feed', 'feed-status');
  const feedRows = cms.list('automation-feed').filter((r) => !!r.key && r.key.startsWith('feed-row-'));
  const panelLogo = cms.one('automation-panel', 'panel-logo');
  const panelBadge = cms.one('automation-panel', 'panel-badge');
  const chart = cms.one('automation-panel', 'chart');
  const chartDays = (chart.description ?? '').split(',');
  const kpis = cms.list('automation-kpis');
  const stats = cms.list('automation-stats');

  useEffect(() => {
    // ── Fade-up on scroll ──
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

    // ── Auto scale automation diagram row on resize ──
    const fitMcRow = () => {
      const wrap = document.getElementById('mc-automation-row-wrap');
      const row = document.getElementById('mc-automation-row');
      if (!wrap || !row) return;
      row.style.transform = 'scale(1)';
      const naturalW = row.scrollWidth;
      const naturalH = row.scrollHeight;
      const available = wrap.parentElement ? wrap.parentElement.clientWidth : wrap.clientWidth;
      const scale = Math.min(1, available / naturalW);
      row.style.transform = `scale(${scale})`;
      wrap.style.height = `${naturalH * scale}px`;
    };

    window.addEventListener('resize', fitMcRow, { passive: true });
    fitMcRow();
    const t1 = setTimeout(fitMcRow, 100);
    const t2 = setTimeout(fitMcRow, 500);

    return () => {
      window.removeEventListener('resize', fitMcRow);
      clearTimeout(t1);
      clearTimeout(t2);
      fadeObserver.disconnect();
    };
  }, []);

  const handlePricingSubmit = (data: PricingFormData) => {
    console.log('Pricing lead received from Inventory & Returns Management:', data);
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

        <SiteHeaderNav onOpenPricing={() => setPricingOpen(true)} />

        {/* Hero Body */}
        <div id="hero-body" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', padding: '16px clamp(20px,5%,80px) 28px' }}>
          <div id="hero-grid" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '52px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,.68)', letterSpacing: '.04em', marginBottom: '14px' }}>
                {hero.eyebrow.title ?? ''}
              </div>
              <h1 style={{ fontSize: 'clamp(34px,3.8vw,52px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.03em', color: '#fff', maxWidth: '880px', marginBottom: '20px' }}>
                {hero.title.title ?? ''}
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.86)', lineHeight: 1.68, maxWidth: '740px', marginBottom: '32px' }}>
                {hero.desc.description ?? ''}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: '#4D0DD9', color: '#fff', padding: '14px 30px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {hero.cta1.linkLabel ?? ''}
                </button>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.28)', color: '#fff', padding: '14px 30px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {hero.cta2.linkLabel ?? ''}
                </button>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '360px' }}>
              <div style={{ position: 'absolute', width: '94%', height: '94%', background: 'radial-gradient(circle,rgba(139,107,255,.45) 0%,transparent 70%)', filter: 'blur(24px)' }}></div>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '155px', height: '48px', background: 'linear-gradient(135deg,#A78BFA,#7B5BFB)', borderRadius: '12px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 46px rgba(167,139,250,.68)', marginBottom: '-15px' }}></div>
                <div style={{ width: '220px', height: '48px', background: 'linear-gradient(135deg,#8B5CF6,#4D0DD9)', borderRadius: '12px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 54px rgba(139,92,246,.62)', marginBottom: '-15px' }}></div>
                <div style={{ width: '285px', height: '48px', background: 'linear-gradient(135deg,#7B5BFB,#3A0FD9)', borderRadius: '12px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 62px rgba(123,91,251,.58)', marginBottom: '-15px' }}></div>
                <div style={{ width: '350px', height: '48px', background: 'linear-gradient(135deg,#6D28D9,#2E0B8F)', borderRadius: '12px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 62px rgba(109,40,217,.52)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INVENTORY MANAGEMENT ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div id="order-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <h2 data-animate style={{ fontSize: 'clamp(30px,3.2vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '12px' }}>
                {overviewTitle.title ?? ''}
              </h2>
              <div style={{ width: '44px', height: '3px', background: '#4D0DD9', marginBottom: '22px' }}></div>
              <p data-animate data-delay="60" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '16px' }}>
                {overviewP1.description ?? ''}
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: 0 }}>
                {overviewP2.description ?? ''}
              </p>
            </div>

            <div id="order-diagram" data-animate data-delay="120" style={{ width: '100%' }}>
              <img src={overviewImg.image ?? ''} alt={overviewImg.imageAlt ?? ''} style={{ width: '100%', height: 'auto', borderRadius: '26px', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '14px' }}>
            {capHeader.title ?? ''}
          </h2>
          <p data-animate data-delay="40" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.6, marginBottom: '36px' }}>
            {capHeader.description ?? ''}
          </p>
          <div id="order-cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'left' }}>
            {inventoryCapabilities.map((c, idx) => (
              <div key={idx} data-animate style={{ background: '#F5F3FC', borderRadius: '16px', padding: '26px 24px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B0619', lineHeight: 1.3, marginBottom: '12px' }}>{c.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RETURNS MANAGEMENT ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#F5F3FC', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div data-animate style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.08em', color: '#4D0DD9', textTransform: 'uppercase', marginBottom: '14px' }}>
              {retEyebrow.label ?? ''}
            </div>
            <h2 data-animate data-delay="30" style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
              {retTitle.title ?? ''}
            </h2>
            <p data-animate data-delay="60" style={{ fontSize: '16px', color: '#3A3550', lineHeight: 1.75, maxWidth: '820px', margin: '0 auto' }}>
              {retDesc.description ?? ''}
            </p>
          </div>
          <div data-animate data-delay="100" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(20,10,40,.16)', maxWidth: '427px', margin: '0 auto' }}>
            <img src={retImg.image ?? ''} alt={retImg.imageAlt ?? ''} style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* ══ RETURNS KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '36px', textAlign: 'center' }}>
            {retCapHeader.title ?? ''}
          </h2>
          <div id="warehouse-cap-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 72px' }}>
            {returnsCapabilities.map((c, idx) => (
              <div key={idx} data-animate style={{ display: 'grid', gridTemplateColumns: '38px 1fr', gap: '18px', padding: '26px 0', borderTop: '1px solid #E6E2F2' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#4D0DD9', letterSpacing: '.06em', paddingTop: '3px' }}>{c.num}</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B0619', lineHeight: 1.3, marginBottom: '8px' }}>{c.title}</h3>
                  <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AUTOMATION ══ */}
      <section id="automation-section" style={{ padding: '0 clamp(20px,5%,80px) 72px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            data-animate
            data-delay="100"
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              background: 'linear-gradient(120deg,#0B0619 0%,#3A1A8F 25%,#0B0619 50%,#4D0DD9 75%,#0B0619 100%)',
              backgroundSize: '300% 300%',
              animation: 'cta-gradient 12s ease infinite',
              boxShadow: '0 40px 90px rgba(10,5,25,.5)',
              padding: '56px clamp(24px,5%,72px)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 90%,rgba(20,180,140,.2) 0%,transparent 45%),radial-gradient(circle at 85% 15%,rgba(30,140,210,.2) 0%,transparent 45%)', pointerEvents: 'none' }}></div>
            <div id="mc-automation-row-wrap" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
              <div id="mc-automation-row" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', gap: 0, width: 'fit-content', margin: '0 auto', transformOrigin: 'top left' }}>
                {/* Sales Channels Column */}
                <div style={{ flex: '0 0 87px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '.1em', color: '#fff', marginBottom: '22px', display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {chHeading.title ?? ''}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {channels.map((ch, idx) => (
                      <div key={idx} style={{ width: '63px', height: '63px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '13px', padding: '8px', backdropFilter: 'blur(16px)', boxShadow: '0 10px 26px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1)', boxSizing: 'border-box' }}>
                        <div style={{ width: '47px', height: '47px', borderRadius: '10px', overflow: 'hidden', margin: '0 auto' }}>
                          <img src={ch.image ?? ''} alt={ch.imageAlt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SVG Flow lines */}
                <div style={{ flex: '0 0 130px', position: 'relative' }}>
                  <svg width="100%" height="100%" viewBox="0 0 130 496" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <filter id="wvGlowInv" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3.5" result="b" />
                        <feMerge>
                          <feMergeNode in="b" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <circle cx="65" cy="248" r="48" stroke="rgba(255,255,255,.07)" strokeWidth="1" fill="none" />
                    <circle cx="65" cy="248" r="76" stroke="rgba(255,255,255,.06)" strokeWidth="1" fill="none" />
                    <circle cx="65" cy="248" r="104" stroke="rgba(255,255,255,.05)" strokeWidth="1" fill="none" />
                    <path id="wvlineInv1" d="M-70 73.5 C 45 73.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 73.5 C 45 73.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvlineInv2" d="M-70 146.5 C 45 146.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 146.5 C 45 146.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvlineInv3" d="M-70 219.5 C 45 219.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 219.5 C 45 219.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvlineInv4" d="M-70 292.5 C 45 292.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 292.5 C 45 292.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvlineInv5" d="M-70 365.5 C 45 365.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 365.5 C 45 365.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvlineInv6" d="M-70 438.5 C 45 438.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 438.5 C 45 438.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <g filter="url(#wvGlowInv)">
                      <rect x="126" y="244" width="8" height="8" fill="#fff" transform="rotate(45 130 248)" />
                    </g>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0s"><mpath href="#wvlineInv1" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin=".4s"><mpath href="#wvlineInv2" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin=".8s"><mpath href="#wvlineInv3" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.2s"><mpath href="#wvlineInv4" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.6s"><mpath href="#wvlineInv5" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="2s"><mpath href="#wvlineInv6" /></animateMotion></circle>
                  </svg>
                </div>

                {/* Unified Inventory Feed Card */}
                <div style={{ flex: '0 0 360px', alignSelf: 'center', height: '420px', boxSizing: 'border-box', background: 'linear-gradient(160deg,rgba(205,185,235,.45),rgba(255,255,255,.92))', borderRadius: '20px', padding: '22px', boxShadow: '0 24px 60px rgba(0,0,0,.35),0 0 40px rgba(167,139,250,.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '.02em', color: '#0B0619' }}>{feedTitle.title ?? ''}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 700, color: '#0B0619', background: '#fff', borderRadius: '999px', padding: '5px 12px', boxShadow: '0 4px 10px rgba(0,0,0,.1)' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }}></span>{feedStatus.title ?? ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {feedRows.map((fr, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: `dc-feed-row${idx + 1} 5.8s linear infinite` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                          <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                            <img src={fr.image ?? ''} alt={fr.imageAlt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                          <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>{fr.title ?? ''}</div></div>
                        </div>
                        {fr.label ? (
                          <span style={{ fontSize: '11.5px', color: fr.label, fontWeight: 700, whiteSpace: 'nowrap' }}>{fr.extra ?? ''}</span>
                        ) : (
                          <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>{fr.extra ?? ''}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting arrow line */}
                <div style={{ flex: '0 0 70px', alignSelf: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="16" viewBox="0 0 48 16" style={{ filter: 'drop-shadow(0 0 6px #7D6CFF)' }}>
                    <line x1="0" y1="8" x2="48" y2="8" stroke="#7D6CFF" strokeWidth="3" strokeLinecap="round" opacity=".4" />
                    <line x1="0" y1="8" x2="48" y2="8" stroke="#EFEBFF" strokeWidth="2" strokeLinecap="round" />
                    <circle cy="8" r="3.5" fill="#fff">
                      <animate attributeName="cx" values="0;48;0" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>

                {/* Control Tower Panel */}
                <div
                  id="mc-control-tower-panel"
                  style={{
                    flex: '0 0 400px',
                    alignSelf: 'center',
                    background: 'linear-gradient(160deg,#E3DCFB,#D9D0F7)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 20px 50px rgba(0,0,0,.3),0 0 60px rgba(167,139,250,.6)',
                    animation: 'dc-panel-glow 3s ease-in-out infinite, dc-panel-float 4s ease-in-out infinite',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <img src={panelLogo.image ?? ''} alt={panelLogo.imageAlt ?? ''} style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#0B0619', background: '#F3F1FA', borderRadius: '8px', padding: '4px 8px', whiteSpace: 'nowrap' }}>
                      {panelBadge.title ?? ''}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px', marginBottom: '12px' }}>
                    {kpis.map((k, idx) => (
                      <div key={idx} style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: k.label ?? '#7B5BFB', flexShrink: 0, marginTop: '1px' }}></span>
                          <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>{k.title ?? ''}</span>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>{k.description ?? ''}</div>
                        <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>{k.extra ?? ''}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0B0619' }}>{chart.title ?? ''}</span>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: '#6B6480', background: '#F3F1FA', borderRadius: '6px', padding: '3px 7px' }}>{chart.extra ?? ''}</span>
                    </div>
                    <svg width="100%" height="70" viewBox="0 0 300 70" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="feedAreaFillInv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7B5BFB" stopOpacity=".35" />
                          <stop offset="100%" stopColor="#7B5BFB" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 45 L43 38 L86 50 L129 28 L172 12 L215 40 L258 24 L300 30 L300 70 L0 70 Z" fill="url(#feedAreaFillInv)" />
                      <path id="feedTrendLineInv" d="M0 45 L43 38 L86 50 L129 28 L172 12 L215 40 L258 24 L300 30" fill="none" stroke="#7B5BFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle r="4" fill="#7B5BFB">
                        <animateMotion dur="3.5s" repeatCount="indefinite">
                          <mpath href="#feedTrendLineInv" />
                        </animateMotion>
                      </circle>
                      <circle r="7" fill="#7B5BFB" opacity=".35">
                        <animateMotion dur="3.5s" repeatCount="indefinite">
                          <mpath href="#feedTrendLineInv" />
                        </animateMotion>
                      </circle>
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#9891AB', marginTop: '2px' }}>
                      {chartDays.map((d, i) => (<span key={i}>{d}</span>))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px' }}>
                    {stats.map((st, idx) => (
                      <div key={idx} style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                        <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>{st.title ?? ''}</div>
                        <div style={{ fontSize: '11.5px', fontWeight: 800, color: st.label ?? '#0B0619' }}>{st.description ?? ''}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <SiteFooter />

      {/* ══ EXACT PRICING POPUP MODAL ══ */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onSubmit={handlePricingSubmit}
      />
    </div>
  );
}
