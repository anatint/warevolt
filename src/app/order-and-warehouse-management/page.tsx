'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import { usePageCms, CmsRow } from '@/lib/cms';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import defaults from '@/content/order-warehouse.json';

export default function InventoryAndReturnsManagementPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const cms = usePageCms('order-warehouse', defaults as CmsRow[]);

  const inventoryCapabilities = cms.list('capabilities').map((r) => ({ title: r.title ?? '', desc: r.description ?? '' }));

  const returnsCapabilities = cms.list('warehouse-capabilities').map((r) => ({ num: r.label ?? '', title: r.title ?? '', desc: r.description ?? '' }));

  const introImage = cms.one('intro', 'intro-image');
  const capHeading = cms.one('capabilities-heading');
  const whIntro = cms.one('warehouse-intro', 'warehouse-description');
  const whEyebrow = cms.one('warehouse-intro', 'warehouse-eyebrow');
  const whTitle = cms.one('warehouse-intro', 'warehouse-title');
  const whImage = cms.one('warehouse-intro', 'warehouse-image');
  const whCapHeading = cms.one('warehouse-capabilities-heading');
  const channelsHeading = cms.one('automation-channels-heading');
  const feedHeading = cms.one('automation-feed-heading');
  const panel = cms.one('automation-panel-heading');
  const chart = cms.one('automation-chart');
  const kpiColors = ['#7B5BFB', '#2F7BF6', '#22C55E', '#7B5BFB'];
  const statColors = ['#22C55E', '#0B0619', '#22C55E', '#4D0DD9'];

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
                {cms.one('hero', 'hero-eyebrow').label ?? ''}
              </div>
              <h1 style={{ fontSize: 'clamp(34px,3.8vw,52px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.03em', color: '#fff', maxWidth: '880px', marginBottom: '20px' }}>
                {cms.one('hero', 'hero-title').title ?? ''}
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.86)', lineHeight: 1.68, maxWidth: '740px', marginBottom: '32px' }}>
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
                {cms.one('intro', 'intro-title').title ?? ''}
              </h2>
              <div style={{ width: '44px', height: '3px', background: '#4D0DD9', marginBottom: '22px' }}></div>
              <p data-animate data-delay="60" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '16px' }}>
                {cms.one('intro', 'intro-paragraph-1').description ?? ''}
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: 0 }}>
                {cms.one('intro', 'intro-paragraph-2').description ?? ''}
              </p>
            </div>

            <div id="order-diagram" data-animate data-delay="120" style={{ width: '100%' }}>
              <img src={introImage.image ?? ''} alt={introImage.imageAlt ?? ''} style={{ width: '100%', height: 'auto', borderRadius: '26px', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '14px' }}>
            {capHeading.title ?? ''}
          </h2>
          <p data-animate data-delay="40" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.6, marginBottom: '36px' }}>
            {capHeading.description ?? ''}
          </p>
          <div id="order-cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'left' }}>
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
              {whEyebrow.label ?? ''}
            </div>
            <h2 data-animate data-delay="30" style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
              {whTitle.title ?? ''}
            </h2>
            <p data-animate data-delay="60" style={{ fontSize: '16px', color: '#3A3550', lineHeight: 1.75, maxWidth: '820px', margin: '0 auto' }}>
              {whIntro.description ?? ''}
            </p>
          </div>
          <div data-animate data-delay="100" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(20,10,40,.16)', maxWidth: '427px', margin: '0 auto' }}>
            <img src={whImage.image ?? ''} alt={whImage.imageAlt ?? ''} style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* ══ RETURNS KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '36px', textAlign: 'center' }}>
            {whCapHeading.title ?? ''}
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
        <div data-animate data-delay="100" style={{ maxWidth: '1291px', margin: '0 auto' }}>
          <img src="/assets/cms/order-automation.webp" alt="Order &amp; Warehouse automation — unified inventory feed and order routing panel" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

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
