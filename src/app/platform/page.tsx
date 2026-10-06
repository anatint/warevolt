'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import { usePageCms, CmsRow } from '@/lib/cms';
import { useSiteHeader } from '@/lib/site';
import { SolutionsDropdown, SolutionsMobileList, solutionsItems } from '@/components/SolutionsMenu';
import SiteFooter from '@/components/SiteFooter';
import defaults from '@/content/platform.json';

export default function PlatformPage() {
  const cms = usePageCms('platform', defaults as CmsRow[]);
  const T = (section: string, key: string) => cms.one(section, key).title ?? '';
  const D = (section: string, key: string) => cms.one(section, key).description ?? '';
  const header = useSiteHeader();
  const headerLogo = header.one('brand', 'logo-light');
  const headerLogin = header.one('actions', 'login');
  const headerCta = header.one('actions', 'cta');
  const phone = header.one('actions', 'phone');
  const solutions = solutionsItems(header);
  const solutionsLabel = header.one('nav', 'solutions').linkLabel ?? 'Solutions';
  // Shared nav (minus the Technology mega-menu) with this page's own bold 'Platform' link after Solutions.
  const navItems: CmsRow[] = [];
  header.list('nav').forEach((item) => {
    if (item.extra === 'mega-menu') return;
    navItems.push(item);
    if (item.key === 'solutions') navItems.push({ section: 'nav', key: 'platform', linkLabel: 'Platform', linkUrl: '#platform', extra: 'current-page' } as CmsRow);
  });
  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroMobileOpen, setHeroMobileOpen] = useState(false);
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [heroTechMenuOpen, setHeroTechMenuOpen] = useState(false);

  const techMegaMenu = [
    { label: 'Order & Warehouse Management', desc: 'From order to dispatch, every fulfillment workflow connected.', href: '/order-and-warehouse-management' },
    { label: 'Inventory & Returns Management', desc: 'Complete control of stock, movements, and returns across your network.', href: '/inventory-and-returns-management' },
    { label: 'Analytics & Reporting', desc: 'Turn fulfillment data into clear, actionable insights.', href: '/analytics-and-reporting' },
  ];

  const orderCapabilities = cms.list('capabilities-cards').map((r) => ({ title: r.title ?? '', desc: r.description ?? '' }));

  const warehouseStock = cms.list('warehouse-stock').map((r) => ({ name: r.title ?? '', pct: r.description ?? '' }));

  const channelNodes = cms.list('channel-nodes');
  const channelBenefits = cms.list('channel-benefits');
  const kpi = (i: number) => cms.one('modern-kpis', 'kpi-' + i);
  const invKpi = (i: number) => cms.one('inventory-kpis', 'kpi-' + i);
  const chartDates = cms.list('modern-chart-dates');

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
    console.log('Pricing lead received from Platform Page:', data);
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
            <Link href="/" style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', transition: 'color .3s' }}>
              Home
            </Link>
            <SolutionsDropdown
              label={solutionsLabel}
              items={solutions}
              wrapId="solutions-menu-wrap"
              menuId="solutions-mega-menu"
              labelStyle={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', transition: 'color .3s' }}
            />
            <Link href="#platform" style={{ fontSize: '14.5px', fontWeight: 700, color: '#fff', textDecoration: 'none', transition: 'color .3s' }}>
              Platform
            </Link>
            <Link href="/#industries" style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', transition: 'color .3s' }}>
              Sectors
            </Link>
            <button
              onClick={() => setPricingOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14.5px',
                fontWeight: 500,
                color: 'rgba(255,255,255,.85)',
                transition: 'color .3s',
                padding: 0,
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
            >
              Pricing
            </button>
          </div>

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
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero-section" style={{ position: 'relative', overflowX: 'hidden', background: 'linear-gradient(160deg,#0B0619 0%,#1E1240 60%,#0B0619 100%)' }}>
        <div style={{ position: 'absolute', top: '-160px', right: '-120px', width: '480px', height: '480px', background: 'radial-gradient(circle,rgba(123,91,251,.28) 0%,transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-180px', left: '-100px', width: '420px', height: '420px', background: 'radial-gradient(circle,rgba(77,13,217,.24) 0%,transparent 70%)', pointerEvents: 'none' }}></div>

        {/* Main Nav */}
        <div style={{ position: 'relative', zIndex: 30, padding: '0 clamp(20px,5%,80px)' }}>
          <nav style={{ height: '110px', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img id="hero-logo" src={headerLogo.image || '/assets/warevolt-logo-white.png'} alt={headerLogo.imageAlt || 'Warevolt'} style={{ height: '140px', width: 'auto', objectFit: 'contain', display: 'block' }} />
            </Link>

            <div id="ph-nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
              {navItems.map((item, idx) => {
                if (item.extra === 'solutions-menu') {
                  return (
                    <SolutionsDropdown
                      key={item.key ?? idx}
                      label={item.linkLabel ?? ''}
                      items={solutions}
                      wrapId="hero-solutions-menu-wrap"
                      menuId="hero-solutions-mega-menu"
                      labelStyle={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)' }}
                    />
                  );
                }
                if (item.extra === 'opens-pricing-modal') {
                  return (
                    <button
                      key={item.key ?? idx}
                      onClick={() => setPricingOpen(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
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
                      {item.linkLabel ?? ''}
                    </button>
                  );
                }
                const current = item.extra === 'current-page';
                return (
                  <Link key={item.key ?? idx} href={item.linkUrl ?? '#'} style={{ fontSize: '16px', fontWeight: current ? 700 : 400, color: current ? '#fff' : 'rgba(255,255,255,.92)', textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                    {item.linkLabel ?? ''}
                  </Link>
                );
              })}
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
                {headerLogin.linkLabel ?? ''}
              </button>
              <Link
                id="hero-cta"
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#4D0DD9',
                  color: '#fff',
                  padding: '13px 28px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background .2s, transform .2s',
                }}
              >
                {headerCta.linkLabel || 'Speak to an expert'}
              </Link>
            </div>

            <button
              onClick={() => setHeroMobileOpen(!heroMobileOpen)}
              id="ph-hamburger"
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {heroMobileOpen && (
              <div
                id="ph-mobile-panel"
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
                {navItems.map((item, idx) => {
                  if (item.extra === 'solutions-menu') {
                    return <SolutionsMobileList key={item.key ?? idx} label={item.linkLabel ?? ''} items={solutions} onNavigate={() => setHeroMobileOpen(false)} />;
                  }
                  if (item.extra === 'opens-pricing-modal') {
                    return (
                      <button
                        key={item.key ?? idx}
                        onClick={() => { setPricingOpen(true); setHeroMobileOpen(false); }}
                        style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '14px 0', color: '#fff', fontSize: '16px', fontWeight: 500, fontFamily: 'inherit' }}
                      >
                        {item.linkLabel ?? ''}
                      </button>
                    );
                  }
                  return (
                    <Link key={item.key ?? idx} href={item.linkUrl ?? '#'} style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                      {item.linkLabel ?? ''}
                    </Link>
                  );
                })}
                {phone.linkLabel && (
                  <a href={phone.linkUrl ?? '#'} style={{ marginTop: '8px', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, opacity: 0.8 }}>
                    {phone.linkLabel}
                  </a>
                )}
                <Link
                  href="/contact"
                  onClick={() => setHeroMobileOpen(false)}
                  style={{
                    marginTop: '12px',
                    background: '#4D0DD9',
                    color: '#fff',
                    padding: '13px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {headerCta.linkLabel || 'Speak to an expert'}
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Hero Body */}
        <div style={{ position: 'relative', zIndex: 10, padding: '70px clamp(20px,5%,80px) 110px' }}>
          <div id="platform-hero-grid" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#A78BFA', marginBottom: '18px', textTransform: 'uppercase' }}>
                {T('hero', 'hero-eyebrow')}
              </span>
              <h1 style={{ fontSize: 'clamp(34px,4.4vw,62px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-.03em', color: '#fff', marginBottom: '22px', maxWidth: '820px' }}>
                {T('hero', 'hero-title')}
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.75)', lineHeight: 1.7, maxWidth: '680px' }}>
                {D('hero', 'hero-description')}
              </p>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
              <img src={cms.one('hero', 'hero-image').image ?? ''} alt={cms.one('hero', 'hero-image').imageAlt ?? ''} style={{ width: '100%', height: 'auto', borderRadius: '14px', boxShadow: '0 30px 80px rgba(20,10,40,.4)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MODERN COMMERCE ══ */}
      <section id="platform" style={{ padding: '100px clamp(20px,5%,80px) 100px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '20px', top: '60px', width: '220px', height: '280px', background: '#F4F3F8', borderRadius: '20px', transform: 'rotate(18deg)', zIndex: 0, animation: 'float-a 6s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', right: '100px', top: '150px', width: '110px', height: '110px', transform: 'rotate(45deg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', zIndex: 0, animation: 'float-a 6s ease-in-out infinite .3s' }}>
          <div style={{ background: '#fff', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }}></div>
          <div style={{ background: '#fff', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }}></div>
          <div style={{ background: '#fff', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }}></div>
          <div style={{ background: '#fff', clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' }}></div>
        </div>
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
            <h2 data-animate style={{ fontSize: 'clamp(26px,2.7vw,40px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '14px' }}>
              {T('modern-commerce', 'title')}
            </h2>
          </div>
          <div id="modern-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'stretch' }}>
            <div data-animate style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '16px', boxShadow: '0 12px 32px rgba(20,10,40,.06)', padding: '20px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', marginBottom: '14px' }}>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '30px', height: '30px', background: '#EDE9FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12z" stroke="#7B5BFB" strokeWidth="1.8" strokeLinejoin="round" /><path d="M6 6L4.5 3H2" stroke="#7B5BFB" strokeWidth="1.8" strokeLinecap="round" /><circle cx="8" cy="20" r="1.4" fill="#7B5BFB" /><circle cx="18" cy="20" r="1.4" fill="#7B5BFB" /></svg>
                  </div>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{kpi(1).title}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#0B0619', marginBottom: '5px' }}>{kpi(1).description}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>{kpi(1).extra}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '30px', height: '30px', background: '#E4F2FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2F7BF6" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="#2F7BF6" strokeWidth="1.8" /><circle cx="12" cy="12" r="0.8" fill="#2F7BF6" /></svg>
                  </div>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{kpi(2).title}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#0B0619', marginBottom: '5px' }}>{kpi(2).description}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>{kpi(2).extra}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '30px', height: '30px', background: '#E4F9EC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#22C55E" strokeWidth="1.7" strokeLinejoin="round" /><path d="M12 22V12M3 7L12 12L21 7" stroke="#22C55E" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{kpi(3).title}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#0B0619', marginBottom: '5px' }}>{kpi(3).description}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>{kpi(3).extra}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '30px', height: '30px', background: '#FDECD8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#F97316" strokeWidth="1.8" /><path d="M12 7V12L15.5 14" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" /></svg>
                  </div>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{kpi(4).title}</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#0B0619', marginBottom: '5px' }}>{kpi(4).description}</div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#E11D48' }}>{kpi(4).extra}</div>
                </div>
              </div>
              <div style={{ background: '#F7F6FB', borderRadius: '14px', padding: '14px 16px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#3A3550', marginBottom: '8px' }}>{T('modern-chart', 'chart-title')}</div>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', left: '78%', top: '14px', background: '#4D0DD9', color: '#fff', fontSize: '10px', fontWeight: 700, borderRadius: '6px', padding: '3px 8px' }}>{T('modern-chart', 'chart-badge')}</span>
                  <svg width="100%" height="120" viewBox="0 0 700 220" preserveAspectRatio="none" style={{ display: 'block', overflow: 'hidden' }}>
                    <defs>
                      <linearGradient id="phAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7B5BFB" stopOpacity=".35" />
                        <stop offset="100%" stopColor="#7B5BFB" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M40,106 L140,70 L240,98 L340,86 L440,82 L540,90 L640,54 L640,210 L40,210 Z" fill="url(#phAreaGrad)" stroke="none" />
                    <path d="M40,106 L140,70 L240,98 L340,86 L440,82 L540,90 L640,54" fill="none" stroke="#7B5BFB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="640" cy="54" r="5" fill="#4D0DD9" />
                  </svg>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: '#9891AB', marginTop: '2px' }}>
                  {chartDates.map((d, idx) => (<span key={idx}>{d.title}</span>))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0, justifyContent: 'center' }}>
              <p data-animate style={{ fontSize: '15px', color: '#6B6480', lineHeight: 1.7 }}>
                {D('modern-commerce', 'paragraph-1')}
              </p>
              <p data-animate data-delay="60" style={{ fontSize: '15px', color: '#6B6480', lineHeight: 1.7 }}>
                {D('modern-commerce', 'paragraph-2')}
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15px', color: '#6B6480', lineHeight: 1.7 }}>
                {D('modern-commerce', 'paragraph-3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORDER MANAGEMENT ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div id="order-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '72px', alignItems: 'center' }}>
            <div>
              <h2 data-animate style={{ fontSize: 'clamp(30px,3.2vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '12px' }}>
                {T('order-management', 'title')}
              </h2>
              <div style={{ width: '44px', height: '3px', background: '#4D0DD9', marginBottom: '22px' }}></div>
              <p data-animate data-delay="60" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: '16px' }}>
                {D('order-management', 'paragraph-1')}
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.85, marginBottom: 0 }}>
                {D('order-management', 'paragraph-2')}
              </p>
            </div>

            <div id="order-diagram" data-animate data-delay="120" style={{ position: 'relative', width: '100%' }}>
              <img src={cms.one('order-management', 'diagram').image ?? ''} alt={cms.one('order-management', 'diagram').imageAlt ?? ''} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ KEY CAPABILITIES ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '14px' }}>
            {T('key-capabilities', 'title')}
          </h2>
          <p data-animate data-delay="40" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.6, marginBottom: '48px' }}>
            {D('key-capabilities', 'subtitle')}
          </p>
          <div id="platform-cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', textAlign: 'left' }}>
            {orderCapabilities.map((c, idx) => (
              <div key={idx} data-animate style={{ background: '#F5F3FC', borderRadius: '16px', padding: '26px 24px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B0619', lineHeight: 1.3, marginBottom: '12px' }}>{c.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MULTI-CHANNEL WAREHOUSE ══ */}
      <section style={{ padding: '0 clamp(20px,5%,80px) 100px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'relative', background: '#fff', borderRadius: '24px', boxShadow: '0 30px 80px rgba(20,10,40,.1)', padding: '20px 40px 24px' }}>
            <div id="modern-commerce-corners" style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
              <svg viewBox="0 0 760 620" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} preserveAspectRatio="none">
                <line x1="150" y1="130" x2="300" y2="230" stroke="#C9C0EA" strokeWidth="1.5" strokeDasharray="5 5" />
                <line x1="610" y1="130" x2="460" y2="230" stroke="#C9C0EA" strokeWidth="1.5" strokeDasharray="5 5" />
                <line x1="150" y1="490" x2="300" y2="400" stroke="#C9C0EA" strokeWidth="1.5" strokeDasharray="5 5" />
                <line x1="610" y1="490" x2="460" y2="400" stroke="#C9C0EA" strokeWidth="1.5" strokeDasharray="5 5" />
              </svg>

              <div style={{ position: 'absolute', left: 0, top: 0, width: '150px', textAlign: 'center', zIndex: 1 }}>
                <div style={{ width: '112px', height: '88px', margin: '0 auto 12px', background: '#F7F6FB', borderRadius: '12px', boxShadow: '0 12px 24px rgba(20,10,40,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="46" height="40" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#4D0DD9" strokeWidth="1.6" /><path d="M8 21h8M12 17v4" stroke="#4D0DD9" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.06em', color: '#0B0619' }}>{channelNodes[0]?.title ?? ''}</div>
              </div>

              <div style={{ position: 'absolute', right: 0, top: 0, width: '150px', textAlign: 'center', zIndex: 1 }}>
                <div style={{ width: '112px', height: '88px', margin: '0 auto 12px', background: '#F7F6FB', borderRadius: '12px', boxShadow: '0 12px 24px rgba(20,10,40,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="46" height="40" viewBox="0 0 24 24" fill="none"><path d="M3 9l1-5h16l1 5" stroke="#4D0DD9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 9v11h16V9" stroke="#4D0DD9" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 20v-6h6v6" stroke="#4D0DD9" strokeWidth="1.6" /></svg>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.06em', color: '#0B0619' }}>{channelNodes[1]?.title ?? ''}</div>
              </div>

              <img src={cms.one('channel-warehouse', 'warehouse-image').image ?? ''} alt={cms.one('channel-warehouse', 'warehouse-image').imageAlt ?? ''} style={{ display: 'block', width: '100%', margin: '20px auto 0', position: 'relative', zIndex: 1 }} />

              <div style={{ position: 'absolute', left: 0, bottom: '70px', width: '150px', textAlign: 'center', zIndex: 1 }}>
                <div style={{ width: '112px', height: '88px', margin: '0 auto 12px', background: '#F7F6FB', borderRadius: '12px', boxShadow: '0 12px 24px rgba(20,10,40,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="42" height="38" viewBox="0 0 24 24" fill="none"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#4D0DD9" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 22V12M3 7L12 12L21 7" stroke="#4D0DD9" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.06em', color: '#0B0619' }}>{channelNodes[2]?.title ?? ''}</div>
              </div>

              <div style={{ position: 'absolute', right: 0, bottom: '70px', width: '150px', textAlign: 'center', zIndex: 1 }}>
                <div style={{ width: '112px', height: '88px', margin: '0 auto 12px', background: '#F7F6FB', borderRadius: '12px', boxShadow: '0 12px 24px rgba(20,10,40,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="42" height="38" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#4D0DD9" strokeWidth="1.6" /><path d="M12 7v5l3.5 2" stroke="#4D0DD9" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.06em', color: '#0B0619' }}>{channelNodes[3]?.title ?? ''}</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', background: '#F7F6FB', borderRadius: '16px', padding: '14px 28px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#4D0DD9" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.03em', color: '#3A3550' }}>{channelBenefits[0]?.title ?? ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.5" stroke="#4D0DD9" strokeWidth="1.7" /><circle cx="12" cy="12" r="8.5" stroke="#4D0DD9" strokeWidth="1.7" /></svg>
                <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.03em', color: '#3A3550' }}>{channelBenefits[1]?.title ?? ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L20 5V12C20 17 16.5 20.5 12 22C7.5 20.5 4 17 4 12V5L12 2Z" stroke="#4D0DD9" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.03em', color: '#3A3550' }}>{channelBenefits[2]?.title ?? ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 19V13M11 19V9M18 19V5" stroke="#4D0DD9" strokeWidth="1.7" strokeLinecap="round" /></svg>
                <span style={{ fontSize: '11.5px', fontWeight: 800, letterSpacing: '.03em', color: '#3A3550' }}>{channelBenefits[3]?.title ?? ''}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INVENTORY MANAGEMENT ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div id="inventory-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '56px', alignItems: 'center' }}>
            <div data-animate data-delay="120" style={{ background: '#fff', border: '1px solid #EFEBFA', borderRadius: '16px', boxShadow: '0 12px 32px rgba(20,10,40,.06)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0B0619' }}>{T('inventory-dashboard', 'panel-title')}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#22C55E' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }}></span>{T('inventory-dashboard', 'panel-status')}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '14px' }}>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '26px', height: '26px', background: '#EDE9FF', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#4D0DD9" strokeWidth="1.7" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{invKpi(1).title}</div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{invKpi(1).description}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '26px', height: '26px', background: '#E4F9EC', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{invKpi(2).title}</div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{invKpi(2).description}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '26px', height: '26px', background: '#FDECD8', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01" stroke="#F97316" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="#F97316" strokeWidth="1.8" /></svg>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{invKpi(3).title}</div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{invKpi(3).description}</div>
                </div>
                <div style={{ background: '#fff', border: '1px solid #F0EDF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ width: '26px', height: '26px', background: '#FDE4E4', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" /></svg>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#6B6480', marginBottom: '4px' }}>{invKpi(4).title}</div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{invKpi(4).description}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '12px' }}>
                <div style={{ background: '#F7F6FB', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#3A3550', marginBottom: '12px' }}>{T('inventory-dashboard', 'stock-title')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {warehouseStock.map((w, idx) => (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#6B6480', marginBottom: '4px' }}>
                          <span>{w.name}</span>
                          <span style={{ fontWeight: 700, color: '#0B0619' }}>{w.pct}</span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(11,6,25,.08)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg,#7B5BFB,#A78BFA)', width: w.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#F7F6FB', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#3A3550', alignSelf: 'flex-start' }}>{T('inventory-dashboard', 'sync-title')}</div>
                  <div style={{ position: 'relative', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="70" height="70" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#EDE9FF" strokeWidth="10" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#4D0DD9" strokeWidth="10" strokeLinecap="round" pathLength="100" strokeDasharray="99.4 100" transform="rotate(-90 50 50)" />
                    </svg>
                    <span style={{ position: 'absolute', fontSize: '16px', fontWeight: 800, color: '#1a1230' }}>{T('inventory-dashboard', 'sync-value')}</span>
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#8A8397', textAlign: 'center' }}>{T('inventory-dashboard', 'sync-caption')}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 data-animate style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '12px' }}>
                {T('inventory-management', 'title')}
              </h2>
              <div style={{ width: '44px', height: '3px', background: '#4D0DD9', marginBottom: '22px' }}></div>
              <p data-animate data-delay="60" style={{ fontSize: '15px', color: '#6B6480', lineHeight: 1.65, marginBottom: '16px' }}>
                {D('inventory-management', 'paragraph-1')}
              </p>
              <p data-animate data-delay="100" style={{ fontSize: '15px', color: '#6B6480', lineHeight: 1.65 }}>
                {D('inventory-management', 'paragraph-2')}
              </p>
            </div>
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
