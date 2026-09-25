'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';

export default function OrderAndWarehouseManagementPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroMobileOpen, setHeroMobileOpen] = useState(false);
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [heroTechMenuOpen, setHeroTechMenuOpen] = useState(false);

  const techMegaMenu = [
    { label: 'Order & Warehouse Management', desc: 'From order to dispatch, every fulfillment workflow connected.', href: '/order-and-warehouse-management' },
    { label: 'Inventory & Returns Management', desc: 'Complete control of stock, movements, and returns across your network.', href: '/order-and-warehouse-management' },
    { label: 'Analytics & Reporting', desc: 'Turn fulfillment data into clear, actionable insights.', href: '/platform' },
  ];

  const orderCapabilities = [
    { title: 'Unified Order Dashboard', desc: 'Manage orders from every sales channel through a single operational view.' },
    { title: 'Multi-Channel Synchronization', desc: 'Automatically synchronize orders across your entire commerce ecosystem in real time.' },
    { title: 'Live Order Tracking', desc: 'Monitor every stage from order confirmation to picking, packing, shipping, and delivery.' },
    { title: 'Intelligent Order Prioritization', desc: 'Automatically prioritise orders using configurable business rules and SLA targets.' },
    { title: 'Bulk Processing & Automation', desc: 'Process thousands of orders with batch actions and automated workflows.' },
    { title: 'Split & Partial Fulfilment', desc: 'Support split shipments, partial fulfilments, and multi-location order routing.' },
    { title: 'B2B & Wholesale Workflows', desc: 'Configure dedicated fulfilment rules for wholesale, retail, and enterprise customers.' },
    { title: 'Order Search & Audit History', desc: 'Quickly locate orders, access complete audit trails, and generate packing slips and shipping documents instantly.' },
  ];

  const warehouseCapabilities = [
    { num: '01', title: 'Structured Goods Receiving', desc: 'Streamline inbound verification, discrepancy logging, and dock-to-stock processing.' },
    { num: '02', title: 'Put-Away Optimisation', desc: 'Guide inventory to the most efficient storage locations using configurable put-away rules.' },
    { num: '03', title: 'Bin & Location Management', desc: 'Manage inventory across warehouses, zones, aisles, racks, shelves, and bins with complete visibility.' },
    { num: '04', title: 'Optimised Picking Workflows', desc: 'Accelerate fulfilment with single, batch, wave, cluster, and zone picking strategies.' },
    { num: '05', title: 'Barcode-Verified Packing', desc: 'Validate every item before dispatch to improve fulfilment accuracy.' },
    { num: '06', title: 'Dispatch Management', desc: 'Coordinate staging, loading, and carrier handovers with complete operational visibility.' },
    { num: '07', title: 'Cycle Counting & Stock Adjustments', desc: 'Maintain inventory accuracy through continuous stock verification and reconciliation.' },
    { num: '08', title: 'Mobile Warehouse Operations', desc: 'Execute warehouse tasks seamlessly using handheld barcode scanners and mobile devices.' },
  ];

  useEffect(() => {
    // ── Floating Navbar scroll handling ──
    const nav = document.getElementById('wv-nav');
    const heroSection = document.getElementById('hero-section');
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      if (!nav) return;
      const y = window.scrollY;
      const pastHero = heroSection ? heroSection.getBoundingClientRect().bottom < 0 : y > 80;
      const scrollingUp = y < lastScrollY;
      lastScrollY = y;

      if (pastHero && scrollingUp) {
        nav.style.transform = 'translateY(0)';
        nav.style.opacity = '1';
        nav.style.background = 'rgba(11,6,25,0.95)';
        nav.style.backdropFilter = 'blur(20px)';
        (nav.style as any).webkitBackdropFilter = 'blur(20px)';
        nav.style.boxShadow = '0 1px 0 rgba(255,255,255,0.08)';
      } else {
        nav.style.transform = 'translateY(-100%)';
        nav.style.opacity = '0';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', fitMcRow);
      clearTimeout(t1);
      clearTimeout(t2);
      fadeObserver.disconnect();
    };
  }, []);

  const handlePricingSubmit = (data: PricingFormData) => {
    console.log('Pricing lead received from Order & Warehouse Management:', data);
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#1C1030', background: '#fff', overflowX: 'hidden' }}>
      {/* ══ FIXED SCROLL NAV ══ */}
      <nav
        id="wv-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '104px',
          transition: 'background .35s, box-shadow .35s, transform .4s, opacity .4s',
          transform: 'translateY(-100%)',
          opacity: 0,
          padding: '0 clamp(20px, 5%, 80px)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img src="/assets/warevolt-logo-transparent.png" alt="Warevolt" style={{ height: '120px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </Link>

          <div id="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <Link href="/#solutions" style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .3s' }}>
              Solutions
            </Link>

            <div
              id="tech-menu-wrap"
              style={{ position: 'relative', padding: '8px 0' }}
              onMouseEnter={() => setTechMenuOpen(true)}
              onMouseLeave={() => setTechMenuOpen(false)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setTechMenuOpen(!techMenuOpen);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '14.5px',
                  fontWeight: 500,
                  color: techMenuOpen ? '#fff' : 'rgba(255,255,255,.85)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color .3s',
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
                    transform: techMenuOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform .2s ease',
                  }}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {techMenuOpen && (
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
                    id="tech-mega-menu"
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
                        onClick={() => setTechMenuOpen(false)}
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

            <Link href="/#industries" style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .3s' }}>
              Sectors{' '}
              <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              onClick={() => setPricingOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', transition: 'color .3s', padding: 0 }}
            >
              Pricing
            </button>
            <Link href="/#projects" style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', transition: 'color .3s' }}>
              Track
            </Link>
          </div>

          <div id="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '28px', flexShrink: 0 }}>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: '14px', fontWeight: 400, whiteSpace: 'nowrap', transition: 'color .2s' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.19 6.19l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              +91 98765 43210
            </a>
            <button
              onClick={() => setPricingOpen(true)}
              style={{
                background: '#4D0DD9',
                color: '#fff',
                padding: '11px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background .2s, transform .2s',
              }}
            >
              Get a Quote{' '}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            id="nav-hamburger"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {mobileNavOpen && (
            <div
              id="nav-mobile-panel"
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
                boxShadow: '0 12px 30px rgba(0,0,0,.3)',
              }}
            >
              <Link href="/#solutions" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                Solutions
              </Link>
              <div style={{ padding: '14px 0 8px', color: '#fff', fontSize: '16px', fontWeight: 500 }}>Technology</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0 12px 14px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                {techMegaMenu.map((item, idx) => (
                  <Link key={idx} href={item.href} style={{ padding: '9px 0', color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link href="/#industries" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                Sectors
              </Link>
              <button
                onClick={() => { setPricingOpen(true); setMobileNavOpen(false); }}
                style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '14px 0', color: '#fff', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)' }}
              >
                Pricing
              </button>
              <Link href="/#projects" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>
                Track
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <section id="hero-section" style={{ position: 'relative', overflowX: 'hidden', background: 'linear-gradient(160deg,#0B0619 0%,#1E1240 60%,#0B0619 100%)' }}>
        <div style={{ position: 'absolute', top: '-160px', right: '-120px', width: '480px', height: '480px', background: 'radial-gradient(circle,rgba(123,91,251,.28) 0%,transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-180px', left: '-100px', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(77,13,217,.24) 0%,transparent 70%)', pointerEvents: 'none' }}></div>

        {/* Hero Nav */}
        <div style={{ position: 'relative', zIndex: 30, padding: '0 clamp(20px,5%,80px)' }}>
          <nav style={{ height: '110px', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img src="/assets/warevolt-logo-white.png" alt="Warevolt" style={{ height: '140px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </Link>

            <div id="hero-nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
              <Link href="/#solutions" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .2s', whiteSpace: 'nowrap' }}>
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
                    fontSize: '16px',
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

              <Link href="/#industries" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                Sectors{' '}
                <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <button
                onClick={() => setPricingOpen(true)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', transition: 'color .2s', whiteSpace: 'nowrap', padding: 0 }}
              >
                Pricing
              </button>
              <Link href="/#projects" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                Track
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexShrink: 0, marginLeft: 'auto' }}>
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
                  fontSize: '14px',
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
                  style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '14px 0', color: '#fff', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}
                >
                  Pricing
                </button>
                <Link href="/#projects" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>
                  Track
                </Link>
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
        <div id="hero-body" style={{ position: 'relative', zIndex: 10, padding: '70px clamp(20px,5%,80px) 110px' }}>
          <div id="hero-grid" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#A78BFA', marginBottom: '18px', textTransform: 'uppercase' }}>
                The Warevolt Platform
              </span>
              <h1 style={{ fontSize: 'clamp(34px, 4.4vw, 62px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', color: '#fff', marginBottom: '22px', maxWidth: '820px' }}>
                Order Management
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.75)', lineHeight: 1.7, maxWidth: '680px' }}>
                Today&apos;s commerce landscape moves faster and operates across more channels than ever before.
              </p>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
              <div style={{ position: 'absolute', width: '80%', height: '80%', background: 'radial-gradient(circle,rgba(139,107,255,.35) 0%,transparent 70%)', filter: 'blur(10px)' }}></div>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'float-a 6s ease-in-out infinite' }}>
                <div style={{ width: '110px', height: '44px', background: 'linear-gradient(135deg,#A78BFA,#7B5BFB)', borderRadius: '8px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 40px rgba(167,139,250,.6)', marginBottom: '-14px' }}></div>
                <div style={{ width: '170px', height: '44px', background: 'linear-gradient(135deg,#8B5CF6,#4D0DD9)', borderRadius: '8px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 50px rgba(139,92,246,.55)', marginBottom: '-14px' }}></div>
                <div style={{ width: '220px', height: '44px', background: 'linear-gradient(135deg,#7B5BFB,#3A0FD9)', borderRadius: '8px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 60px rgba(123,91,251,.5)', marginBottom: '-14px' }}></div>
                <div style={{ width: '260px', height: '44px', background: 'linear-gradient(135deg,#6D28D9,#2E0B8F)', borderRadius: '8px', transform: 'perspective(400px) rotateX(55deg)', boxShadow: '0 0 60px rgba(109,40,217,.45)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORDER MANAGEMENT ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div id="order-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <h2 data-animate style={{ fontSize: 'clamp(30px,3.2vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '12px' }}>
                Every Order. One Intelligent Workflow.
              </h2>
              <div style={{ width: '44px', height: '3px', background: '#4D0DD9', marginBottom: '22px' }}></div>
              <p data-animate data-delay="60" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '16px' }}>
                Managing orders across multiple sales channels shouldn&apos;t mean managing multiple systems. WareVolt Scale™ centralizes every order into a single intelligent workspace, giving your operations team complete visibility from order creation to final dispatch.
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: 0 }}>
                Whether orders originate from your online store, marketplaces, retail partners, or B2B channels, WareVolt Scale™ automates workflows, reduces manual intervention, and ensures every order moves through fulfillment quickly, accurately, and on time.
              </p>
            </div>

            <div id="order-diagram" data-animate data-delay="120" style={{ width: '100%' }}>
              <img src="/uploads/warevolt-scale-diagram-flat.png" alt="Warevolt Scale ecosystem diagram" style={{ width: '100%', height: 'auto', borderRadius: '26px', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '14px' }}>
            Key Capabilities
          </h2>
          <p data-animate data-delay="40" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.6, marginBottom: '36px' }}>
            With WareVolt Scale™ you have eyes on every order, everywhere.
          </p>
          <div id="order-cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'left' }}>
            {orderCapabilities.map((c, idx) => (
              <div key={idx} data-animate style={{ background: '#F5F3FC', borderRadius: '16px', padding: '26px 24px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B0619', lineHeight: 1.3, marginBottom: '12px' }}>{c.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WAREHOUSE MANAGEMENT ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#F5F3FC', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div data-animate style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '.08em', color: '#4D0DD9', textTransform: 'uppercase', marginBottom: '14px' }}>
              Warehouse Management
            </div>
            <h2 data-animate data-delay="30" style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
              Built for Elite Warehouse Productivity.
            </h2>
            <p data-animate data-delay="60" style={{ fontSize: '16px', color: '#3A3550', lineHeight: 1.75, maxWidth: '820px', margin: '0 auto' }}>
              Warehouse efficiency drives fulfillment performance. WareVolt Scale™ transforms warehouse operations with structured, repeatable, and intelligent workflows that reduce travel time, minimise picking errors, and maximise daily throughput. From inbound receiving and put-away to picking, packing, and dispatch, every warehouse movement is orchestrated through a single intelligent platform—keeping your operations organised, efficient, and ready to scale.
            </p>
          </div>
          <div data-animate data-delay="100" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(20,10,40,.16)', maxWidth: '427px', margin: '0 auto' }}>
            <img src="/uploads/pasted-1787544112877-0.png" alt="Warevolt Control Tower dashboard" style={{ display: 'block', width: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* ══ WAREHOUSE KEY CAPABILITIES ══ */}
      <section style={{ padding: '72px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '36px', textAlign: 'center' }}>
            Key Capabilities
          </h2>
          <div id="warehouse-cap-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 72px' }}>
            {warehouseCapabilities.map((c, idx) => (
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
                    SALES CHANNELS
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
                      <filter id="wvGlow" x="-200%" y="-200%" width="500%" height="500%">
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
                    <path id="wvline1" d="M-70 73.5 C 45 73.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 73.5 C 45 73.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvline2" d="M-70 146.5 C 45 146.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 146.5 C 45 146.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvline3" d="M-70 219.5 C 45 219.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 219.5 C 45 219.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvline4" d="M-70 292.5 C 45 292.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 292.5 C 45 292.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvline5" d="M-70 365.5 C 45 365.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 365.5 C 45 365.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <path id="wvline6" d="M-70 438.5 C 45 438.5, 55 248, 130 248" stroke="#7D6CFF" strokeWidth="6" fill="none" opacity=".12" />
                    <path d="M-70 438.5 C 45 438.5, 55 248, 130 248" stroke="#EFEBFF" strokeWidth="2" fill="none" opacity=".7" />
                    <g filter="url(#wvGlow)">
                      <rect x="126" y="244" width="8" height="8" fill="#fff" transform="rotate(45 130 248)" />
                    </g>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="0s"><mpath href="#wvline1" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin=".4s"><mpath href="#wvline2" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin=".8s"><mpath href="#wvline3" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.2s"><mpath href="#wvline4" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="1.6s"><mpath href="#wvline5" /></animateMotion></circle>
                    <circle r="3" fill="#fff"><animateMotion dur="2.8s" repeatCount="indefinite" begin="2s"><mpath href="#wvline6" /></animateMotion></circle>
                  </svg>
                </div>

                {/* Unified Order Feed Card */}
                <div style={{ flex: '0 0 360px', alignSelf: 'center', height: '420px', boxSizing: 'border-box', background: 'linear-gradient(160deg,rgba(205,185,235,.45),rgba(255,255,255,.92))', borderRadius: '20px', padding: '22px', boxShadow: '0 24px 60px rgba(0,0,0,.35),0 0 40px rgba(167,139,250,.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '.02em', color: '#0B0619' }}>UNIFIED ORDER FEED</span>
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
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>#AMZ-5421</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>2 sec ago</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row2 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731537374-0.png" alt="Flipkart" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>#FLP-9823</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>5 sec ago</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row3 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731732420-0.png" alt="Shopify" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>#SHP-7214</div></div>
                      </div>
                      <span style={{ fontSize: '11px', color: '#6B6480', whiteSpace: 'nowrap' }}>8 sec ago</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row4 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731671522-0.png" alt="Myntra" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>#MYN-1923</div></div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#F59E0B', fontWeight: 700, whiteSpace: 'nowrap' }}>Processing</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row5 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785731892932-0.png" alt="Blinkit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>#BLK-8821</div></div>
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#22C55E', fontWeight: 700, whiteSpace: 'nowrap' }}>Dispatched</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,.55)', borderRadius: '12px', padding: '10px 13px', opacity: 0, animation: 'dc-feed-row6 5.8s linear infinite' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                          <img src="/uploads/pasted-1785732016871-0.png" alt="Zepto" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div><div style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>#ZEP-3390</div></div>
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
                      Today, 16 May
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#7B5BFB', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Orders Today</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>2,857</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>↑ 18.6%</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#2F7BF6', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Processing</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>1,482</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>↑ 16.3%</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#22C55E', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Shipped</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>1,103</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>↑ 12.8%</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '10px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', marginBottom: '8px', minHeight: '22px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#7B5BFB', flexShrink: 0, marginTop: '1px' }}></span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: '#3A3550', lineHeight: 1.3 }}>Delivered</span>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>2,012</div>
                      <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#22C55E' }}>↑ 20.1%</div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0B0619' }}>Order Volume Trend</span>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: '#6B6480', background: '#F3F1FA', borderRadius: '6px', padding: '3px 7px' }}>This Week</span>
                    </div>
                    <svg width="100%" height="70" viewBox="0 0 300 70" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="feedAreaFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7B5BFB" stopOpacity=".35" />
                          <stop offset="100%" stopColor="#7B5BFB" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 45 L43 38 L86 50 L129 28 L172 12 L215 40 L258 24 L300 30 L300 70 L0 70 Z" fill="url(#feedAreaFill)" />
                      <path id="feedTrendLine" d="M0 45 L43 38 L86 50 L129 28 L172 12 L215 40 L258 24 L300 30" fill="none" stroke="#7B5BFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle r="4" fill="#7B5BFB">
                        <animateMotion dur="3.5s" repeatCount="indefinite">
                          <mpath href="#feedTrendLine" />
                        </animateMotion>
                      </circle>
                      <circle r="7" fill="#7B5BFB" opacity=".35">
                        <animateMotion dur="3.5s" repeatCount="indefinite">
                          <mpath href="#feedTrendLine" />
                        </animateMotion>
                      </circle>
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#9891AB', marginTop: '2px' }}>
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '8px' }}>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>Inventory Status</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#22C55E' }}>Healthy</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>SLA Performance</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0B0619' }}>96.4%</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>Dispatch Today</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0B0619' }}>97.8%</div>
                    </div>
                    <div style={{ background: '#fff', boxShadow: '0 4px 14px rgba(80,50,150,.08)', borderRadius: '10px', padding: '9px', minWidth: 0 }}>
                      <div style={{ fontSize: '8.5px', fontWeight: 600, color: '#3A3550', marginBottom: '4px', whiteSpace: 'nowrap' }}>Returns</div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#F59E0B' }}>1.2%</div>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="white" strokeWidth="1.5" />
                    <circle cx="4" cy="4" r="2" stroke="white" strokeWidth="1.5" />
                  </svg>
                </a>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="white" strokeWidth="1.5" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="/#about" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>About Us</Link>
                <Link href="/#solutions" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Solutions</Link>
                <Link href="/#projects" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Projects</Link>
                <Link href="/#industries" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Industries</Link>
                <a href="#" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Blog</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Solutions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="/order-and-warehouse-management" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Order &amp; Warehouse Management</Link>
                <Link href="/order-and-warehouse-management" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Inventory &amp; Returns Management</Link>
                <Link href="/platform" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Analytics &amp; Reporting</Link>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
                    <circle cx="12" cy="10" r="3" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontSize: '14px', lineHeight: 1.6 }}>123 Industrial Zone, Navi Mumbai, Maharashtra 400708</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.19 6.19l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>+91 98765 43210</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
                    <polyline points="22,6 12,13 2,6" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>hello@warevolt.in</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,.08)',
                    border: '1.5px solid rgba(255,255,255,.12)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#fff',
                    fontSize: '13.5px',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{
                    background: '#4D0DD9',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background .2s',
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)' }}>© 2026 Warevolt. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '28px' }}>
              <a href="#" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none', transition: 'color .2s' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none', transition: 'color .2s' }}>Terms of Service</a>
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
