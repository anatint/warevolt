'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';

export default function InventoryAndReturnsManagementPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [heroMobileOpen, setHeroMobileOpen] = useState(false);
  const [heroTechMenuOpen, setHeroTechMenuOpen] = useState(false);

  const techMegaMenu = [
    { label: 'Order & Warehouse Management', desc: 'From order to dispatch, every fulfillment workflow connected.', href: '/order-and-warehouse-management' },
    { label: 'Inventory & Returns Management', desc: 'Complete control of stock, movements, and returns across your network.', href: '/inventory-and-returns-management' },
    { label: 'Analytics & Reporting', desc: 'Turn fulfillment data into clear, actionable insights.', href: '/analytics-and-reporting' },
  ];

  const inventoryCapabilities = [
    { title: 'Live Inventory Overview', desc: 'Monitor real-time stock levels across every warehouse and storage location.' },
    { title: 'Multi-Channel Inventory Synchronization', desc: 'Automatically synchronize inventory across your online store, marketplaces, retail, and B2B channels in real time.' },
    { title: 'SKU-Level Traceability', desc: 'Track inventory by SKU, serial number, batch, lot, and expiry date.' },
    { title: 'Inventory Availability', desc: 'Instantly view available, allocated, reserved, damaged, and incoming inventory.' },
    { title: 'Bin & Location Management', desc: 'Locate every item with precise warehouse, zone, aisle, rack, shelf, and bin visibility.' },
    { title: 'Automated Inventory Updates', desc: 'Keep stock accurate with real-time updates from receiving, picking, packing, dispatch, returns, and stock adjustments.' },
    { title: 'Inventory Ageing & Valuation', desc: 'Identify slow-moving inventory, monitor stock ageing, and evaluate inventory value.' },
    { title: 'Low Stock Alerts & Replenishment', desc: 'Configure intelligent reorder points and proactive stock alerts to prevent stockouts.' },
    { title: 'Inventory Intelligence', desc: 'Analyse inventory health, optimise safety stock, forecast demand, and make smarter replenishment decisions with real-time insights.' },
  ];

  const returnsCapabilities = [
    { num: '01', title: 'Return Request Management', desc: 'Automated RMA generation, tied to your existing customer-facing portal.' },
    { num: '02', title: 'Lifecycle Tracking', desc: 'Full visibility into inbound return transit and warehouse arrival.' },
    { num: '03', title: 'Quality Inspection Workflows', desc: 'Standardized grading protocols for every returned item.' },
    { num: '04', title: 'Intelligent Inventory Recovery', desc: 'Automated rules routing goods to restock, refurbishment, or recycling.' },
    { num: '05', title: 'Deep Returns Analytics', desc: 'Root-cause visibility by product category, vendor, or reason code.' },
  ];

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

        {/* Hero Nav */}
        <div style={{ position: 'relative', zIndex: 30, padding: '0 clamp(20px,5%,80px)' }}>
          <nav style={{ height: '92px', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img id="hero-logo" src="/assets/warevolt-logo-white.png" alt="Warevolt" style={{ height: '110px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </Link>

            <div id="hero-nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
              <Link href="/" style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                Home
              </Link>
              <Link href="/#solutions" style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                Solutions
              </Link>

              <div
                id="hero-tech-menu-wrap"
                style={{ position: 'relative', padding: '8px 0' }}
                onMouseEnter={() => setHeroTechMenuOpen(true)}
                onMouseLeave={() => setHeroTechMenuOpen(false)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setHeroTechMenuOpen(!heroTechMenuOpen);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: heroTechMenuOpen ? '#fff' : 'rgba(255,255,255,.92)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color .2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Technology{' '}
                  <svg
                    width="14"
                    height="9"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{
                      opacity: 0.75,
                      transform: heroTechMenuOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform .2s ease',
                    }}
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {heroTechMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      paddingTop: '8px',
                      zIndex: 200,
                    }}
                  >
                    <div
                      id="hero-tech-mega-menu"
                      style={{
                        background: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 24px 60px rgba(20,10,40,.25)',
                        padding: '24px 28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        minWidth: '340px',
                      }}
                    >
                      {techMegaMenu.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setHeroTechMenuOpen(false)}
                          style={{
                            display: 'block',
                            textDecoration: 'none',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            borderLeft: '3px solid transparent',
                            transition: 'background .2s, border-color .2s, transform .2s',
                          }}
                          className="hover:bg-[#F5F3FC] hover:border-l-[#4D0DD9] hover:translate-x-1"
                        >
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B0619', whiteSpace: 'nowrap', marginBottom: '3px' }}>{item.label}</div>
                          <div style={{ fontSize: '12px', color: '#6B6480', lineHeight: 1.4 }}>{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/#industries" style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                Sectors
              </Link>
              <button
                onClick={() => setPricingOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,.92)',
                  transition: 'color .2s',
                  whiteSpace: 'nowrap',
                  padding: 0,
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.92)')}
              >
                Pricing
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '26px', flexShrink: 0, marginLeft: 'auto' }}>
              <button
                onClick={() => setPricingOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,.9)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  padding: '8px 0',
                  transition: 'color .2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.9)')}
              >
                Login
              </button>
              <button
                id="hero-cta"
                onClick={() => setPricingOpen(true)}
                style={{
                  background: '#4D0DD9',
                  color: '#fff',
                  padding: '13px 28px',
                  borderRadius: '12px',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background .2s, transform .2s',
                }}
              >
                Speak to an expert
              </button>
            </div>

            <button
              onClick={() => setHeroMobileOpen(!heroMobileOpen)}
              id="hero-hamburger"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {heroMobileOpen && (
              <div
                id="hero-mobile-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#0B0619',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px clamp(20px,5%,80px) 24px',
                  gap: '2px',
                  boxShadow: '0 12px 30px rgba(0,0,0,.4)',
                  zIndex: 40,
                }}
              >
                <Link href="/" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  Home
                </Link>
                <Link href="/#solutions" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  Solutions
                </Link>
                <div style={{ padding: '14px 0 8px', color: '#fff', fontSize: '16px', fontWeight: 500 }}>Technology</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0 12px 14px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  {techMegaMenu.map((item, idx) => (
                    <Link key={idx} href={item.href} style={{ padding: '9px 0', color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link href="/#industries" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  Sectors
                </Link>
                <button
                  onClick={() => { setPricingOpen(true); setHeroMobileOpen(false); }}
                  style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '14px 0', color: '#fff', fontSize: '16px', fontWeight: 500, fontFamily: 'inherit' }}
                >
                  Pricing
                </button>
                <a href="tel:+919876543210" style={{ marginTop: '8px', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, opacity: 0.8 }}>
                  +91 98765 43210
                </a>
                <button
                  onClick={() => { setPricingOpen(true); setHeroMobileOpen(false); }}
                  style={{ marginTop: '12px', background: '#4D0DD9', color: '#fff', padding: '13px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', textAlign: 'center' }}
                >
                  Speak to an expert
                </button>
              </div>
            )}
          </nav>
        </div>

        {/* Hero Body */}
        <div id="hero-body" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', padding: '16px clamp(20px,5%,80px) 28px' }}>
          <div id="hero-grid" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '52px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,.68)', letterSpacing: '.04em', marginBottom: '14px' }}>
                Solutions / Inventory &amp; Returns Management
              </div>
              <h1 style={{ fontSize: 'clamp(34px,3.8vw,52px)', fontWeight: 800, lineHeight: 1.14, letterSpacing: '-.03em', color: '#fff', maxWidth: '880px', marginBottom: '20px' }}>
                Inventory &amp; Returns Management
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.86)', lineHeight: 1.68, maxWidth: '740px', marginBottom: '32px' }}>
                WareVolt Scale™ brings order, inventory, warehouse, shipping, and returns data into a single operational view — giving leadership the metrics to run the business proactively, not reactively.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: '#4D0DD9', color: '#fff', padding: '14px 30px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.28)', color: '#fff', padding: '14px 30px', borderRadius: '12px', fontSize: '14.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Speak to an expert
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
                Real-Time Visibility. Zero Discrepancies.
              </h2>
              <div style={{ width: '44px', height: '3px', background: '#4D0DD9', marginBottom: '22px' }}></div>
              <p data-animate data-delay="60" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '16px' }}>
                Inventory is the foundation of efficient fulfilment. WareVolt Scale™ provides a single, real-time view of every SKU across your entire warehouse network, ensuring accurate stock levels, faster fulfilment, and complete inventory confidence.
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: 0 }}>
                From receiving and put-away to picking, dispatch, and returns, every inventory movement is automatically synchronised in real time. Keep inventory aligned across every connected sales channel, eliminate overselling, optimize replenishment, and make faster, data-driven inventory decisions.
              </p>
            </div>

            <div id="order-diagram" data-animate data-delay="120" style={{ width: '100%' }}>
              <img src="/uploads/warevolt-scale-diagram-flat.png" alt="Warevolt Inventory ecosystem diagram" style={{ width: '100%', height: 'auto', borderRadius: '26px', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '14px' }}>
            What the platform offers
          </h2>
          <p data-animate data-delay="40" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.6, marginBottom: '36px' }}>
            Precision control across every stock movement and storage location.
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
              Reverse Logistics &amp; QC
            </div>
            <h2 data-animate data-delay="30" style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
              Turn Returns into Recovered Revenue.
            </h2>
            <p data-animate data-delay="60" style={{ fontSize: '16px', color: '#3A3550', lineHeight: 1.75, maxWidth: '820px', margin: '0 auto' }}>
              Customer returns shouldn&apos;t drain your bottom line. WareVolt Scale™ accelerates reverse logistics with standardized dockside verification, SOP-driven quality grading, and automated restock pipelines. Whether re-bagging saleable units or handling vendor returns, our structured reverse workflow ensures minimal value loss and rapid return-to-shelf turnaround.
            </p>
          </div>
          <div data-animate data-delay="100" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(20,10,40,.16)', maxWidth: '427px', margin: '0 auto' }}>
            <img src="/uploads/pasted-1787544112877-0.png" alt="Warevolt Returns Control dashboard" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* ══ RETURNS KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '36px', textAlign: 'center' }}>
            What the platform offers
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
                    CHANNELS &amp; HUBS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { src: '/uploads/pasted-1785731347143-0.png', alt: 'Amazon' },
                      { src: '/uploads/pasted-1785731537374-0.png', alt: 'Flipkart' },
                      { src: '/uploads/pasted-1785731732420-0.png', alt: 'Shopify' },
                      { src: '/uploads/pasted-1785731671522-0.png', alt: 'Myntra' },
                      { src: '/uploads/pasted-1785731892932-0.png', alt: 'Blinkit' },
                      { src: '/uploads/pasted-1785732016871-0.png', alt: 'Zepto' },
                    ].map((ch, idx) => (
                      <div key={idx} style={{ width: '63px', height: '63px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '13px', padding: '8px', backdropFilter: 'blur(16px)', boxShadow: '0 10px 26px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.1)', boxSizing: 'border-box' }}>
                        <div style={{ width: '47px', height: '47px', borderRadius: '10px', overflow: 'hidden', margin: '0 auto' }}>
                          <img src={ch.src} alt={ch.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                    <span style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '.02em', color: '#0B0619' }}>INVENTORY &amp; RETURNS FEED</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 700, color: '#0B0619', background: '#fff', borderRadius: '999px', padding: '5px 12px', boxShadow: '0 4px 10px rgba(0,0,0,.1)' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }}></span>Live
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row1 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731347143-0.png" alt="Amazon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>SKU-7721 Stock Replenished</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>2 sec ago</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row2 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731537374-0.png" alt="Flipkart" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>RMA #RET-4819 Inspected (Grade A)</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>5 sec ago</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row3 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731732420-0.png" alt="Shopify" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>Inventory Allocated to Hub-02</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>8 sec ago</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row4 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731671522-0.png" alt="Myntra" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>RMA #RET-4822 Quality Check</div></div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#F59E0B', fontWeight: 700, whiteSpace: 'nowrap' }}>Grading</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row5 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731892932-0.png" alt="Blinkit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>Re-shelved for Dispatch</div></div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#22C55E', fontWeight: 700, whiteSpace: 'nowrap' }}>Restocked</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row6 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785732016871-0.png" alt="Zepto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>Cycle Count Confirmed 100%</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>Just now</span>
                    </div>
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
                    <img src="/assets/warevolt-mark.svg" alt="Warevolt" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#0B0619', background: '#F3F1FA', borderRadius: '8px', padding: '4px 8px', whiteSpace: 'nowrap' }}>
                      Live Network Sync
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#7B5BFB', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Total SKUs</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>14,290</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>↑ Active</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#2F7BF6', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>In-Transit</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>2,410</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>On Time</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#22C55E', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Restocked</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>98.4%</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>Same Day</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#7B5BFB', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Accuracy</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>99.9%</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>Cycle Count</div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0B0619' }}>Inventory Velocity &amp; Replenishment</span>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: '#6B6480', background: '#F3F1FA', borderRadius: '6px', padding: '3px 7px' }}>Weekly Rate</span>
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
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px' }}>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>Stock Health</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#22C55E' }}>Optimal</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>Restock SLA</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0B0619' }}>&lt; 24 Hrs</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>RTO Rate</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#22C55E' }}>1.4%</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>Recovery</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#4D0DD9' }}>94.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#0B0619', padding: '80px clamp(20px,5%,80px) 40px', color: 'rgba(255,255,255,.6)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '60px', marginBottom: '64px' }}>
            <div>
              <div style={{ display: 'inline-block', marginBottom: '20px' }}>
                <img src="/uploads/warevolt-logo-footer-transparent.png" alt="Warevolt" style={{ height: '88px', objectFit: 'contain', display: 'block' }} />
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.8, marginBottom: '28px', maxWidth: '280px' }}>
                Premium industrial infrastructure company specializing in warehouses, PEB structures, and cold storage solutions across India.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" /></svg>
                </a>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="4" cy="4" r="2" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="/" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Home</Link>
                <Link href="/#about" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>About Us</Link>
                <Link href="/#solutions" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Solutions</Link>
                <Link href="/#projects" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Projects</Link>
                <Link href="/#industries" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Industries</Link>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Solutions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="/order-and-warehouse-management/" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Order &amp; Warehouse Management</Link>
                <Link href="/d2c-marketplace-fulfillment/" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>D2C &amp; Marketplace Fulfillment</Link>
                <Link href="/inventory-and-returns-management/" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Inventory &amp; Returns Management</Link>
                <Link href="/analytics-and-reporting/" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Analytics &amp; Reporting</Link>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /><circle cx="12" cy="10" r="3" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /></svg>
                  <span style={{ fontSize: '14px', lineHeight: 1.6 }}>123 Industrial Zone, Navi Mumbai, Maharashtra 400708</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.19 6.19l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /></svg>
                  <span style={{ fontSize: '14px' }}>+91 98765 43210</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /><polyline points="22,6 12,13 2,6" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" /></svg>
                  <span style={{ fontSize: '14px' }}>hello@warevolt.in</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Enter your email" style={{ flex: 1, background: 'rgba(255,255,255,.08)', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '13.5px', outline: 'none' }} />
                <button style={{ background: '#4D0DD9', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 18px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)' }}>© 2026 Warevolt. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '28px' }}>
              <a href="#" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ EXACT PRICING POPUP MODAL ══ */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onSubmit={handlePricingSubmit}
      />
    </div>
  );
}
