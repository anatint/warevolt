'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';

export default function D2CMarketplaceFulfillmentPage() {
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

  const d2cServices = [
    'Shopify Fulfillment',
    'WooCommerce Fulfillment',
    'Magento Fulfillment',
    'Custom Store Integrations',
    'Real-Time Order Synchronisation',
    'Inventory Management',
    'Pick, Pack & Ship',
    'Quality Inspection',
    'Same-Day Dispatch (where applicable)',
    'Custom Packaging',
    'Gift Inserts & Promotional Materials',
    'Returns Management',
    'Order Tracking & Notifications',
    'Performance Reporting',
  ];

  const compliancePoints = [
    'Marketplace-specific packaging standards',
    'Barcode and product label verification',
    'SKU and inventory validation',
    'Quality inspection before dispatch',
    'Shipment documentation',
    'Carton and pallet compliance',
    'SLA-based order processing',
    'Marketplace-ready shipment preparation',
  ];

  const faqs = [
    {
      q: 'Is Warevolt suitable for high-growth and enterprise e-commerce brands?',
      a: 'Yes. Warevolt is designed to support fast-growing brands managing increasing order volumes across multiple sales channels. Our fulfillment infrastructure, warehouse operations, and technology platform are built to help businesses scale without adding operational complexity.',
    },
    {
      q: 'Can Warevolt manage fulfillment across multiple online stores and marketplaces?',
      a: 'Yes. Warevolt centralizes fulfillment for Shopify, WooCommerce, Magento, Amazon, Flipkart, Myntra, Ajio, Nykaa, Meesho, and custom sales channels through a single operational platform. Orders, inventory, shipping, and returns are managed from one connected system, providing complete operational visibility.',
    },
    {
      q: 'How does Warevolt help businesses maintain fulfillment accuracy at scale?',
      a: 'Warevolt combines barcode-driven warehouse operations, standardized picking and packing workflows, quality control checkpoints, and real-time inventory synchronization to support consistent fulfillment performance. Warehouse operations follow documented Standard Operating Procedures (SOPs) and defined Service Level Agreements (SLAs) to ensure operational consistency as order volumes grow.',
    },
    {
      q: 'Can Warevolt support enterprise fulfillment requirements?',
      a: 'Yes. Warevolt supports enterprise fulfillment through structured warehouse processes, pallet and carton handling, scheduled dispatches, compliance-driven operations, and technology integrations. Our platform is designed to adapt to complex operational requirements while providing real-time visibility across inventory, orders, and shipments.',
    },
    {
      q: 'How does Warevolt integrate with existing business systems?',
      a: 'Warevolt integrates with leading e-commerce platforms, marketplaces, courier partners, and business applications through APIs and pre-built integrations. This enables automated order imports, inventory synchronization, shipment updates, and operational reporting without manual intervention.',
    },
    {
      q: 'Does Warevolt support marketplace compliance and preparation services?',
      a: 'Yes. Warevolt provides Amazon FBA preparation, Amazon Seller Flex support, Flipkart marketplace preparation, product labelling, quality inspections, packaging compliance, shipment preparation, and inventory reconciliation in accordance with marketplace operational requirements.',
    },
    {
      q: 'Can Warevolt accommodate seasonal demand and promotional peaks?',
      a: 'Yes. Our fulfillment operations are designed to support fluctuations in order volumes during product launches, festive sales, marketplace events, and promotional campaigns. Standardized warehouse workflows help maintain service levels during periods of increased demand.',
    },
    {
      q: 'What operational visibility does the Warevolt platform provide?',
      a: 'Warevolt Scale™ provides real-time visibility into inventory availability, order status, warehouse operations, shipping performance, returns, and operational KPIs through a centralized dashboard. Teams can monitor fulfillment activity and make informed operational decisions from a single platform.',
    },
    {
      q: 'How does Warevolt support business growth?',
      a: 'As businesses expand into new marketplaces, increase SKU counts, or experience higher order volumes, Warevolt provides scalable warehousing, fulfillment operations, and technology to support that growth. This allows brands to expand their sales channels without rebuilding their fulfillment processes.',
    },
    {
      q: 'Can Warevolt support custom operational requirements?',
      a: 'Yes. We work with businesses that require custom packaging, kitting, bundling, product labelling, quality inspections, marketplace-specific preparation, and tailored fulfillment workflows. Operational processes can be configured to align with your business requirements and service level expectations.',
    },
  ];

  useEffect(() => {
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
      window.removeEventListener('scroll', onScroll);
      fadeObserver.disconnect();
    };
  }, []);

  const handlePricingSubmit = (data: PricingFormData) => {
    console.log('Pricing lead received from D2C Fulfillment:', data);
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
              style={{ position: 'relative' }}
              onMouseEnter={() => setTechMenuOpen(true)}
              onMouseLeave={() => setTechMenuOpen(false)}
            >
              <Link href="/#technology" style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .3s' }}>
                Technology{' '}
                <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div
                id="tech-mega-menu"
                style={{
                  display: techMenuOpen ? 'flex' : 'none',
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '18px',
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(20,10,40,.25)',
                  padding: '24px 28px',
                  zIndex: 200,
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '340px',
                }}
              >
                {techMegaMenu.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
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
        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <section
        id="hero-section"
        style={{
          position: 'relative',
          overflowX: 'hidden',
          background: 'linear-gradient(120deg,#0B0619 0%,#251157 30%,#0B0619 55%,#3A1A8F 80%,#0B0619 100%)',
          backgroundSize: '300% 300%',
          animation: 'cta-gradient 10s ease-in-out infinite',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', left: '-6%', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(77,13,217,.32) 0%,transparent 65%)', pointerEvents: 'none', animation: 'glow-drift-a 8s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', bottom: '-140px', right: '-6%', width: '460px', height: '460px', background: 'radial-gradient(circle,rgba(124,91,251,.28) 0%,transparent 65%)', pointerEvents: 'none', animation: 'glow-drift-b 9s ease-in-out infinite' }}></div>

        {/* Main hero nav */}
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
                style={{ position: 'relative' }}
                onMouseEnter={() => setHeroTechMenuOpen(true)}
                onMouseLeave={() => setHeroTechMenuOpen(false)}
              >
                <Link href="/#technology" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                  Technology{' '}
                  <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div
                  id="hero-tech-mega-menu"
                  style={{
                    display: heroTechMenuOpen ? 'flex' : 'none',
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '18px',
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 24px 60px rgba(20,10,40,.25)',
                    padding: '24px 28px',
                    zIndex: 200,
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '340px',
                  }}
                >
                  {techMegaMenu.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
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
          </nav>
        </div>

        {/* Hero Body */}
        <div style={{ position: 'relative', zIndex: 10, padding: '60px clamp(20px,5%,80px) 90px' }}>
          <div id="d2c-hero-grid" style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <div data-animate style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,.6)', letterSpacing: '.04em', marginBottom: '20px' }}>
                Solutions / D2C &amp; Marketplace Fulfillment
              </div>
              <h1 data-animate data-delay="60" style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.03em', color: '#fff', maxWidth: '880px', marginBottom: '24px' }}>
                One fulfillment solution for your online store and every major marketplace.
              </h1>
              <p data-animate data-delay="120" style={{ fontSize: '17.5px', color: 'rgba(255,255,255,.82)', lineHeight: 1.75, maxWidth: '720px', marginBottom: '36px' }}>
                Manage inventory, automate order fulfillment, and ship nationwide through a single platform built for modern e-commerce.
              </p>
              <div data-animate data-delay="180" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: '#4D0DD9', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.28)', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Speak to an expert
                </button>
              </div>
            </div>
            <div data-animate data-delay="80" style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/uploads/D2C_MarketPlace_v4.png" alt="D2C and marketplace platforms illustration" style={{ width: '100%', maxWidth: '480px', height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLATFORM/MARKETPLACE LOGO STRIP ══ */}
      <section style={{ padding: '28px 0', background: '#fff', borderBottom: '1px solid #F0EBF8', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div style={{ display: 'flex', gap: '88px', alignItems: 'center', animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
            {[
              { src: '/uploads/pasted-1784528096970-0.png', alt: 'Shopify' },
              { src: '/uploads/pasted-1784528121293-0.png', alt: 'WooCommerce' },
              { src: '/uploads/pasted-1784528267724-0.png', alt: 'Magento' },
              { src: '/uploads/pasted-1784528144899-0.png', alt: 'Amazon' },
              { src: '/uploads/pasted-1784528167652-0.png', alt: 'Flipkart' },
              { src: '/uploads/pasted-1784528198760-0.png', alt: 'Myntra' },
              { src: '/uploads/pasted-1784528221498-0.png', alt: 'Ajio' },
              { src: '/uploads/pasted-1784528247214-0.png', alt: 'Nykaa' },
              { src: '/uploads/pasted-1784528096970-0.png', alt: 'Shopify' },
              { src: '/uploads/pasted-1784528121293-0.png', alt: 'WooCommerce' },
              { src: '/uploads/pasted-1784528267724-0.png', alt: 'Magento' },
              { src: '/uploads/pasted-1784528144899-0.png', alt: 'Amazon' },
              { src: '/uploads/pasted-1784528167652-0.png', alt: 'Flipkart' },
              { src: '/uploads/pasted-1784528198760-0.png', alt: 'Myntra' },
              { src: '/uploads/pasted-1784528221498-0.png', alt: 'Ajio' },
              { src: '/uploads/pasted-1784528247214-0.png', alt: 'Nykaa' },
            ].map((logo, idx) => (
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
            Connect your online store and marketplaces to a single fulfillment platform.
          </h2>
        </div>
      </section>

      {/* ══ D2C FULFILLMENT ══ */}
      <section id="d2c" style={{ position: 'relative', overflow: 'hidden', padding: '96px clamp(20px,5%,80px)', background: '#fff' }}>
        <div id="d2c-section-grid" style={{ position: 'relative', maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: '80px', alignItems: 'stretch' }}>
          <div data-animate style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(20,10,50,.1)', minHeight: '340px' }}>
            <img src="/uploads/D2C_Fulfillment_illustration.png" alt="D2C fulfillment platform illustration" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <h2 data-animate style={{ fontSize: 'clamp(30px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', lineHeight: 1.15, marginBottom: '20px' }}>
              D2C Fulfillment
            </h2>
            <p data-animate data-delay="30" style={{ fontSize: '19px', fontWeight: 600, color: '#fff', background: '#4F1CF7', lineHeight: 1.5, marginBottom: '28px', padding: '16px 20px', borderRadius: '12px' }}>
              Deliver a consistent post-purchase experience for every order placed through your online store.
            </p>
            <p data-animate data-delay="70" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '22px' }}>
              Warevolt supports brands selling through Shopify, WooCommerce, Magento, and custom e-commerce websites by connecting your storefront directly to our fulfillment platform. Orders are automatically imported, inventory is synchronised in real time, and every order moves through a structured fulfillment workflow—from picking and quality checks to packing, shipping, and returns.
            </p>
            <p data-animate data-delay="110" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '22px' }}>
              Whether you&apos;re shipping a few hundred orders each month or processing thousands of orders daily, Warevolt provides the operational infrastructure to help you maintain inventory accuracy, reduce manual processing, and dispatch orders on time. Our warehouse operations follow defined Standard Operating Procedures (SOPs) and Service Level Agreements (SLAs) to ensure consistent fulfillment quality and operational performance.
            </p>
            <p data-animate data-delay="150" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '26px' }}>
              Brands can also customize the customer experience with branded packaging, promotional inserts, gift wrapping, and other value-added services while maintaining complete visibility through the Warevolt platform.
            </p>
            <div data-animate data-delay="180" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0619' }}>Real-time sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0619' }}>SOP &amp; SLA driven</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4F1CF7" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0B0619' }}>Branded packaging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ D2C FULFILLMENT SERVICES ══ */}
      <section style={{ padding: '88px clamp(20px,5%,80px)', background: '#F5F3FE' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '48px', textAlign: 'center' }}>
            D2C Fulfillment Services
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

      {/* ══ MARKETPLACE FULFILLMENT ══ */}
      <section id="marketplace" style={{ position: 'relative', overflow: 'hidden', background: '#0B0619' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/uploads/pasted-1784525640761-0.png')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(11,6,25,.94) 0%,rgba(11,6,25,.82) 40%,rgba(11,6,25,.55) 65%,rgba(11,6,25,.3) 100%)', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', margin: '0 auto', padding: '110px clamp(20px,5%,80px)', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 data-animate style={{ fontSize: 'clamp(34px,4.2vw,58px)', fontWeight: 800, letterSpacing: '-.02em', lineHeight: 1.08, color: '#fff', marginBottom: '24px' }}>
              Marketplace Fulfillment
            </h2>
            <p data-animate data-delay="60" style={{ fontSize: '17px', fontWeight: 600, color: '#C9B8FF', lineHeight: 1.6, marginBottom: '22px', maxWidth: '460px' }}>
              Expand your marketplace operations without increasing operational complexity.
            </p>
            <p data-animate data-delay="100" style={{ fontSize: '15px', color: 'rgba(255,255,255,.72)', lineHeight: 1.85, maxWidth: '460px', marginBottom: '16px' }}>
              Warevolt helps brands fulfill orders across Amazon, Flipkart, Myntra, Ajio, Nykaa, Meesho, and other leading marketplaces from a single fulfillment operation. Inventory is centrally managed while orders are automatically processed according to each marketplace&apos;s shipping, packaging, and compliance requirements.
            </p>
            <p data-animate data-delay="140" style={{ fontSize: '15px', color: 'rgba(255,255,255,.72)', lineHeight: 1.85, maxWidth: '460px' }}>
              From inbound inventory to outbound dispatch, every shipment follows defined Standard Operating Procedures (SOPs) and Service Level Agreements (SLAs) to help maintain marketplace performance and seller metrics.
            </p>
          </div>
          <div id="marketplace-hero-tiles" data-animate data-delay="80" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#fff', letterSpacing: '.01em', lineHeight: 1.4 }}>
                Amazon · Flipkart · Myntra · Ajio · Nykaa · Meesho
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Single Operation</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>Centrally managed inventory across every channel</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>SOPs &amp; SLAs</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>Defined processes from inbound to dispatch</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: '18px', padding: '32px 28px', minHeight: '132px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Compliance-Ready</div>
              <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}>Built to each marketplace&apos;s requirements</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARKETPLACE COMPLIANCE ══ */}
      <section style={{ padding: '88px clamp(20px,5%,80px)', background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div data-animate style={{ maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '16px' }}>
              Marketplace Compliance
            </h2>
            <p style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8 }}>
              Every marketplace has its own operational standards. Warevolt helps brands maintain compliance through:
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
              Operational Excellence
            </h2>
            <p style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8 }}>
              Warevolt follows structured warehouse processes designed to support consistent marketplace performance.
            </p>
          </div>
          <div id="excellence-grid" data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <circle cx="12" cy="12" r="9" stroke="#4F1CF7" strokeWidth="1.4" />
                <path d="M12 7v5l3.5 2" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>SLA-Driven Order Processing</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Defined turnaround times govern every order from receipt to dispatch.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <path d="M6 3h9l3 3v15H6z" stroke="#4F1CF7" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M9 10h6M9 13.5h6M9 17h4" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Standard Operating Procedures</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Documented SOPs keep every warehouse process consistent and repeatable.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <path d="M9 12l2 2 4-4" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.84 4.7a3.4 3.4 0 001.95-.81 3.4 3.4 0 014.42 0 3.4 3.4 0 001.95.81 3.4 3.4 0 013.13 3.13 3.4 3.4 0 00.81 1.95 3.4 3.4 0 010 4.42 3.4 3.4 0 00-.81 1.95 3.4 3.4 0 01-3.13 3.13 3.4 3.4 0 00-1.95.81 3.4 3.4 0 01-4.42 0 3.4 3.4 0 00-1.95-.81 3.4 3.4 0 01-3.13-3.13 3.4 3.4 0 00-.81-1.95 3.4 3.4 0 010-4.42 3.4 3.4 0 00.81-1.95 3.4 3.4 0 013.13-3.13z" stroke="#4F1CF7" strokeWidth="1.4" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Quality Control Checkpoints</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Inspection points throughout the workflow catch errors before dispatch.</p>
            </div>
          </div>
          <div id="excellence-grid-2" data-animate data-delay="80" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <rect x="3" y="7" width="7" height="7" rx="1" stroke="#4F1CF7" strokeWidth="1.4" />
                <rect x="14" y="7" width="7" height="7" rx="1" stroke="#4F1CF7" strokeWidth="1.4" />
                <rect x="3" y="16" width="7" height="5" rx="1" stroke="#4F1CF7" strokeWidth="1.4" />
                <path d="M14 18h7" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Inventory Reconciliation</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Regular counts keep recorded and physical stock levels aligned.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <rect x="3" y="6" width="18" height="12" rx="1.5" stroke="#4F1CF7" strokeWidth="1.4" />
                <path d="M6.5 6v12M9.5 6v12M13 6v12M17 6v12" stroke="#4F1CF7" strokeWidth="1.4" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Batch &amp; Serial Tracking</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Traceability down to batch and serial level, where applicable.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <path d="M4 12a8 8 0 1114 5.5" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M4 12l0 5h5" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Returns Inspection &amp; Restocking</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Returned items are inspected and restocked accurately and quickly.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '22px' }}>
                <path d="M4 20V10M11 20V4M18 20v-7" stroke="#4F1CF7" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '17.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Performance Reporting</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.65 }}>Ongoing visibility into operations to support informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section style={{ padding: '96px clamp(20px,5%,80px)', background: '#fff' }}>
        <div id="faq-grid" style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: '56px', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <h2 data-animate style={{ fontSize: 'clamp(28px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', lineHeight: 1.15, marginBottom: '32px' }}>
              Frequently<br />Asked Questions
            </h2>
            <div data-animate data-delay="60" style={{ background: 'linear-gradient(160deg,#fff,#EDE7FF)', borderRadius: '18px', padding: '28px 26px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619', marginBottom: '8px' }}>Still have questions?</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.7, marginBottom: '20px' }}>Can&apos;t find the answer you&apos;re looking for? Send us an email and we&apos;ll get back to you.</p>
              <a href="mailto:hello@warevolt.in" style={{ display: 'inline-block', background: '#4F1CF7', color: '#fff', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none' }}>
                Send email
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '.04em' }}>Now onboarding new brands</span>
          </div>
          <h2 data-animate data-delay="80" style={{ fontSize: 'clamp(34px,4vw,58px)', fontWeight: 800, letterSpacing: '-.035em', color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
            Ready to unify your D2C and marketplace fulfillment?
          </h2>
          <p data-animate data-delay="130" style={{ fontSize: '16.5px', color: 'rgba(255,255,255,.75)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 44px' }}>
            Share your sales channels and order volumes, and our team will get back to you within 24 hours with a fulfillment plan.
          </p>
          <div data-animate data-delay="180" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPricingOpen(true)}
              style={{ background: '#fff', color: '#4F1CF7', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Get a Quote
            </button>
            <a href="tel:+919876543210" style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', color: '#fff', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.3)' }}>
              Call Us Now
            </a>
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
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="white" strokeWidth="1.5" /><circle cx="4" cy="4" r="2" stroke="white" strokeWidth="1.5" /></svg>
                </a>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <a href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="white" strokeWidth="1.5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="/#about" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>About Us</Link>
                <Link href="/#solutions" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Solutions</Link>
                <Link href="/#projects" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Projects</Link>
                <Link href="/#industries" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Industries</Link>
                <a href="#" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Blog</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Solutions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Link href="/order-and-warehouse-management" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Order &amp; Warehouse Management</Link>
                <Link href="/d2c-marketplace-fulfillment" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>D2C &amp; Marketplace Fulfillment</Link>
                <Link href="/platform" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Analytics &amp; Reporting</Link>
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
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ flex: 1, background: 'rgba(255,255,255,.08)', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '13.5px', outline: 'none' }}
                />
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{ background: '#4D0DD9', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 18px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </button>
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
