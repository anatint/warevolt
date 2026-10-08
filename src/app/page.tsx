'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import defaults from '@/content/home.json';
import { usePageCms, CmsRow } from '@/lib/cms';
import { useSiteHeader } from '@/lib/site';
import { SolutionsDropdown, SolutionsMobileList, solutionsItems } from '@/components/SolutionsMenu';
import SiteFooter from '@/components/SiteFooter';
import { LoginLabel, HamburgerIcon, MobileNavMenu } from '@/components/MobileMenuBits';

export default function HomePage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroMobileOpen, setHeroMobileOpen] = useState(false);
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [heroTechMenuOpen, setHeroTechMenuOpen] = useState(false);

  const cms = usePageCms('home', defaults as CmsRow[]);
  // Testimonials section is switched on/off in the Wix CMS (HomePage > "Show Testimonials Section"); hidden unless set to true.
  const showTestimonials = cms.one('testimonials', 'visibility-toggle').extra === 'true';
  const header = useSiteHeader();
  const nav = (key: string) => header.one('nav', key);
  const login = header.one('actions', 'login');
  const cta = header.one('actions', 'cta');
  const phone = header.one('actions', 'phone');
  const logoLight = header.one('brand', 'logo-light');
  const logoDark = header.one('brand', 'logo-dark');
  const c = (section: string, key: string, field: keyof CmsRow): string => (cms.one(section, key)[field] as string | undefined) ?? '';

  const feedStatus: { color: string; bold?: boolean }[] = [
    { color: '#4B4460' },
    { color: '#4B4460' },
    { color: '#4B4460' },
    { color: '#7B5BFB', bold: true },
    { color: '#22C55E', bold: true },
  ];

  const whyIcons = [
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7.5" cy="18.5" r="1.6" stroke="#C9B8F5" strokeWidth="1.6" /><circle cx="17.5" cy="18.5" r="1.6" stroke="#C9B8F5" strokeWidth="1.6" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="#C9B8F5" strokeWidth="1.8" /><path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#C9B8F5" strokeWidth="1.8" /><path d="M9 12l2 2 4-4" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 16V8l8-4 8 4v8l-8 4-8-4z" stroke="#C9B8F5" strokeWidth="1.8" strokeLinejoin="round" /><path d="M4 8l8 4 8-4M12 12v8" stroke="#C9B8F5" strokeWidth="1.8" strokeLinejoin="round" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="#C9B8F5" strokeWidth="1.8" /><path d="M8 20h8M12 16v4" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" stroke="#C9B8F5" strokeWidth="1.8" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 20l6-6M14 4h6v6M20 4L10 14" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 8h5v5" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  ];
  const [ctVals, setCtVals] = useState({
    orders: 2857,
    processing: 1482,
    shipped: 1103,
    delivered: 2012,
    sla: 96.4,
    dispatch: 97.8,
    returns: 1.2,
  });

  const solutions = solutionsItems(header);
  const techMegaMenu = header.list('mega-menu').map((r) => ({ label: r.title ?? '', desc: r.description ?? '', href: r.linkUrl ?? '#' }));

  const testimonialGradients = [
    'linear-gradient(135deg,#4D0DD9,#8B6BFF)',
    'linear-gradient(135deg,#7B5BFB,#A78BFA)',
    'linear-gradient(135deg,#3A0FD9,#4D0DD9)',
  ];
  const testimonialsData = cms.list('testimonials-items').map((r, i) => ({
    company: r.title ?? '',
    quote: r.description ?? '',
    initials: (r.label ?? '').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    name: r.label ?? '',
    city: r.extra ?? '',
    avatarBg: testimonialGradients[i % testimonialGradients.length],
  }));

  const prevTesti = () => {
    setTestiIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const nextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const visibleTestimonials = [0, 1, 2].map(
    (i) => testimonialsData[(testiIndex + i) % Math.max(testimonialsData.length, 1)]
  ).filter(Boolean);

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

    // ── Animated counters ──
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseFloat(el.dataset.counter || '0');
          const decimals = (el.dataset.counter?.split('.')[1] || '').length;
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const startTime = performance.now();

          const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = (eased * target).toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          };

          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

    // ── Control Tower animation trigger ──
    let ctStarted = false;
    const animateControlTower = () => {
      const targets = { orders: 2857, processing: 1482, shipped: 1103, delivered: 2012, sla: 96.4, dispatch: 97.8, returns: 1.2 };
      const start = performance.now();
      const duration = 1400;

      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCtVals({
          orders: Math.round(targets.orders * eased),
          processing: Math.round(targets.processing * eased),
          shipped: Math.round(targets.shipped * eased),
          delivered: Math.round(targets.delivered * eased),
          sla: +(targets.sla * eased).toFixed(1),
          dispatch: +(targets.dispatch * eased).toFixed(1),
          returns: +(targets.returns * eased).toFixed(1),
        });
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const ctCheck = () => {
      if (ctStarted) return;
      const panel = document.getElementById('embed-tower-panel');
      if (panel) {
        const r = panel.getBoundingClientRect();
        if (r.height > 0 && r.top < window.innerHeight * 0.9 && r.bottom > 0) {
          ctStarted = true;
          animateControlTower();
          window.removeEventListener('scroll', ctCheck);
        }
      }
    };

    window.addEventListener('scroll', ctCheck, { passive: true });
    ctCheck();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', ctCheck);
    };
  }, []);

  return (
    <>
      {/* ══ STICKY FLOATING NAV ══ */}
      <nav
        id="wv-nav"
        className="wv-sticky-h110"
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
          padding: '0 clamp(20px,5%,80px)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <img
              className="wv-logo-d"
              src={logoDark.image || '/assets/warevolt-logo-transparent.png'}
              alt="Warevolt"
              style={{ height: '120px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
            <img
              className="wv-sticky-wlogo"
              src={logoLight.image || '/assets/warevolt-logo-white.png'}
              alt="Warevolt"
              style={{ height: '140px', width: 'auto', objectFit: 'contain', display: 'none' }}
            />
          </a>

          <div id="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <a
              href="/"
              style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', transition: 'color .3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
            >
              {nav('home').linkLabel ?? ''}
            </a>
            <SolutionsDropdown
              label={nav('solutions').linkLabel ?? ''}
              items={solutions}
              wrapId="solutions-menu-wrap"
              menuId="solutions-mega-menu"
              labelStyle={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', transition: 'color .3s' }}
            />

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
                {nav('technology').linkLabel ?? ''}{' '}
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
                      <a
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
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F5F3FC';
                          e.currentTarget.style.borderLeftColor = '#4D0DD9';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B0619', whiteSpace: 'nowrap', marginBottom: '3px' }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B6480', lineHeight: 1.4 }}>{item.desc}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href={nav('sectors').linkUrl ?? '#industries'}
              style={{
                fontSize: '14.5px',
                fontWeight: 500,
                color: 'rgba(255,255,255,.85)',
                textDecoration: 'none',
                transition: 'color .3s',
              }}
            >
              {nav('sectors').linkLabel ?? ''}
            </a>

            <button
              onClick={() => setPricingOpen(true)}
              style={{
                fontSize: '14.5px',
                fontWeight: 500,
                color: 'rgba(255,255,255,.85)',
                textDecoration: 'none',
                transition: 'color .3s',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
            >
              {nav('pricing').linkLabel ?? ''}
            </button>

          </div>

          <div id="nav-actions" className="wv-sticky-actions" style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '28px', flexShrink: 0 }}>
            <button
              id="nav-login"
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
              <LoginLabel text={login.linkLabel ?? ''} />
            </button>
            <Link
              id="nav-cta"
              href="/contact"
              style={{
                background: '#4D0DD9',
                color: '#fff',
                padding: '11px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                textDecoration: 'none',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background .2s, transform .2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3A0FD9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4D0DD9';
                e.currentTarget.style.transform = 'none';
              }}
            >
              {cta.linkLabel || 'Speak to an expert'}{' '}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <button
            id="nav-hamburger"
            aria-label="Toggle menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              background: 'none',
              border: 'none',
            }}
          >
            <HamburgerIcon open={mobileNavOpen} />
          </button>

          {mobileNavOpen && (
            <div
              id="nav-mobile-panel" className="wv-menu-anim"
              style={{
                display: 'flex',
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#0B0619',
                flexDirection: 'column',
                padding: '8px clamp(20px,5%,80px) 24px',
                gap: '2px',
                boxShadow: '0 12px 30px rgba(0,0,0,.3)',
              }}
            >
              <MobileNavMenu header={header} onOpenPricing={() => setPricingOpen(true)} onNavigate={() => setMobileNavOpen(false)} />
            </div>
          )}
        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <section id="hero-section" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#0B0619' }}>
        <div
          style={{
            position: 'absolute',
            inset: '-5%',
            backgroundImage: `url('${c('hero','hero-bg','image')}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            animation: 'hero-zoom 18s ease-out forwards',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,4,.35)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,.15) 45%,rgba(0,0,0,.35) 100%)', zIndex: 2, pointerEvents: 'none' }} />

        {/* Hero Nav */}
        <div style={{ position: 'relative', zIndex: 30, padding: '0 clamp(20px,5%,80px)' }}>
          <nav
            style={{
              height: '110px',
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              animation: 'fadeUp .6s ease .05s both',
            }}
          >
            <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              <img
                id="hero-logo"
                src={logoLight.image || '/assets/warevolt-logo-white.png'}
                alt="Warevolt"
                style={{ height: '140px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </a>

            <div id="hero-nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
              <a href="/" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                {nav('home').linkLabel ?? ''}
              </a>
              <SolutionsDropdown
                label={nav('solutions').linkLabel ?? ''}
                items={solutions}
                wrapId="hero-solutions-menu-wrap"
                menuId="hero-solutions-mega-menu"
                labelStyle={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)' }}
              />

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
                  {nav('technology').linkLabel ?? ''}{' '}
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
                        <a
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F5F3FC';
                            e.currentTarget.style.borderLeftColor = '#4D0DD9';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderLeftColor = 'transparent';
                            e.currentTarget.style.transform = 'none';
                          }}
                        >
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B0619', whiteSpace: 'nowrap', marginBottom: '3px' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B6480', lineHeight: 1.4 }}>{item.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href={nav('sectors').linkUrl ?? '#industries'}
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,.92)',
                  textDecoration: 'none',
                  transition: 'color .2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {nav('sectors').linkLabel ?? ''}
              </a>

              <button
                onClick={() => setPricingOpen(true)}
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,.92)',
                  textDecoration: 'none',
                  transition: 'color .2s',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.92)')}
              >
                {nav('pricing').linkLabel ?? ''}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '28px', flexShrink: 0, marginLeft: 'auto' }}>
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
                <LoginLabel text={login.linkLabel ?? ''} />
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
                  cursor: 'pointer',
                  border: 'none',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                  transition: 'background .2s, transform .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3A0FD9';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#4D0DD9';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {cta.linkLabel || 'Speak to an expert'}
              </Link>
            </div>

            <button
              id="hero-hamburger"
              aria-label="Toggle menu"
              onClick={() => setHeroMobileOpen(!heroMobileOpen)}
              style={{
                display: 'none',
                width: '40px',
                height: '40px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                marginLeft: '8px',
                background: 'none',
                border: 'none',
              }}
            >
              <HamburgerIcon open={heroMobileOpen} />
            </button>

            {heroMobileOpen && (
              <div
                id="hero-mobile-panel" className="wv-menu-anim"
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#0B0619',
                  flexDirection: 'column',
                  padding: '8px clamp(20px,5%,80px) 24px',
                  gap: '2px',
                  boxShadow: '0 12px 30px rgba(0,0,0,.4)',
                  zIndex: 40,
                }}
              >
                <MobileNavMenu header={header} onOpenPricing={() => setPricingOpen(true)} onNavigate={() => setHeroMobileOpen(false)} />
              </div>
            )}
          </nav>
        </div>

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, height: 'calc(100vh - 132px)', padding: '0 clamp(20px,5%,80px) 60px', display: 'flex' }}>
          <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ maxWidth: '900px' }}>
              <h1
                style={{
                  fontSize: 'clamp(30px,3.6vw,50px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-.02em',
                  color: '#fff',
                  marginBottom: '26px',
                  maxWidth: '820px',
                  textShadow: '0 2px 20px rgba(0,0,0,.6),0 1px 3px rgba(0,0,0,.8)',
                  animation: 'fadeUp .8s ease .2s both',
                }}
              >
                {c('hero','hero-title','title')}
              </h1>
              <p
                style={{
                  fontSize: '19px',
                  color: 'rgba(255,255,255,.9)',
                  lineHeight: 1.7,
                  maxWidth: '900px',
                  marginBottom: '40px',
                  textShadow: '0 2px 16px rgba(0,0,0,.65),0 1px 3px rgba(0,0,0,.8)',
                  animation: 'fadeUp .8s ease .32s both',
                }}
              >
                {c('hero','hero-description','description')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px', animation: 'fadeUp .8s ease .44s both', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPricingOpen(true)}
                  style={{
                    background: '#4D0DD9',
                    color: '#fff',
                    padding: '17px 36px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    transition: 'background .2s, transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3A0FD9';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(79,28,247,.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#4D0DD9';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {c('hero','hero-cta','linkLabel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT SECTION ══ */}
      <section id="about" style={{ position: 'relative', overflow: 'hidden', padding: '80px clamp(20px,5%,80px)' }}>
        <img
          src={c('about','about-watermark','image')}
          alt={c('about','about-watermark','imageAlt')}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '340px',
            maxWidth: '32%',
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.4,
            animation: 'logo-float 5s ease-in-out infinite',
          }}
        />
        <div
          id="about-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '88px',
            alignItems: 'center',
          }}
        >
          {/* Image */}
          <div data-animate style={{ position: 'relative' }}>
            <div style={{ borderRadius: '28px', overflow: 'hidden', aspectRatio: '4/3', background: 'linear-gradient(135deg,#C4B5FD,#7B5BFB)' }}>
              <img
                src={c('about','about-photo','image')}
                alt={c('about','about-photo','imageAlt')}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '28px', right: '28px', background: '#4F1CF7', color: '#fff', borderRadius: '20px', padding: '22px 26px' }}>
              <div style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>{c('about','about-years','title')}</div>
              <div style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8, marginTop: '5px' }}>{c('about','about-years','description')}</div>
            </div>
            <div style={{ position: 'absolute', top: '28px', left: '-24px', background: '#fff', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 12px 40px rgba(79,28,247,.12)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B6480', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '6px' }}>
                {c('about','about-iso','label')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#4F1CF7" strokeWidth="2" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0B0619' }}>{c('about','about-iso','title')}</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 data-animate data-delay="80" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px' }}>
              {c('about','about-title','title')}
            </h2>
            <p data-animate data-delay="130" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '24px' }}>
              {c('about','about-p1','description')}
            </p>
            <p data-animate data-delay="150" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '40px' }}>
              {c('about','about-p2','description')}
            </p>

            <div data-animate data-delay="180" id="about-badges" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '44px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3.5 20.5V9.5L12 3.8l8.5 5.7v11" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 20.5v-5h3.2v-3.2h4.3v8.2" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>{c('about','about-badge-1','title')}</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>{c('about','about-badge-1','description')}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3.5" width="18" height="12.5" rx="2" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16v3.5M8.5 20h7" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="7" y="10.5" width="2" height="3.2" rx=".6" fill="#3D1FF0" />
                    <rect x="11" y="8.2" width="2" height="5.5" rx=".6" fill="#3D1FF0" />
                    <rect x="15" y="6" width="2" height="7.7" rx=".6" fill="#3D1FF0" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>{c('about','about-badge-2','title')}</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>{c('about','about-badge-2','description')}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M2 9.5h4.5M1 12.5h5.5M3 15.5h3.5" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 16.5V7h7.2v9.5" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.2 10h3.3l2.5 3.2v3.3h-1.4" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.2 16.5H11.4" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9.6" cy="17.6" r="1.7" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="18.4" cy="17.6" r="1.7" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>{c('about','about-badge-3','title')}</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>{c('about','about-badge-3','description')}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="16" width="4" height="5" rx=".8" fill="#3D1FF0" />
                    <rect x="10" y="13" width="4" height="8" rx=".8" fill="#3D1FF0" />
                    <rect x="16" y="10" width="4" height="11" rx=".8" fill="#3D1FF0" />
                    <path d="M4 12C9 11.5 14 8.5 19 4M15.5 3.5h4v4" stroke="#3D1FF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>{c('about','about-badge-4','title')}</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>{c('about','about-badge-4','description')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTEGRATIONS LOGO STRIP ══ */}
      <section style={{ padding: '56px 0', background: '#fff', borderTop: '1px solid #F0EBF8', borderBottom: '1px solid #F0EBF8', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div style={{ display: 'flex', gap: '88px', alignItems: 'center', animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
            {[...cms.list('integrations'), ...cms.list('integrations')].map((r, i) => (
              <div key={i} style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src={r.image ?? ''} alt={r.imageAlt ?? ''} style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WAREHOUSE VISUAL SECTION ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', textAlign: 'center' }}>
          <div data-animate data-delay="60" style={{ maxWidth: '640px' }}>
            <h2 style={{ fontSize: 'clamp(30px,3vw,44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '18px' }}>
              {c('channels','channels-title','title')}
            </h2>
            <p style={{ fontSize: '16px', color: '#6B6480', lineHeight: 1.8 }}>
              {c('channels','channels-description','description')}
            </p>
          </div>
          <div data-animate data-delay="120" style={{ width: '100%', maxWidth: '900px', position: 'relative', animation: 'wh-center 8s cubic-bezier(.45,0,.55,1) infinite' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              id="wh-loop-video"
              style={{ width: '100%', display: 'block', borderRadius: '20px' }}
              src={c('channels','channels-video','image')}
            />
          </div>
        </div>
      </section>

      {/* ══ EMBEDDED TRACKING & CONTROL TOWER ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%, 300px),1fr))', gap: '64px', alignItems: 'center' }}>
            <div data-animate data-delay="60">
              <h2 style={{ fontSize: 'clamp(30px,3vw,44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px' }}>
                {c('control-tower','tower-title','title').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h2>
              <p style={{ fontSize: '16px', color: '#6B6480', lineHeight: 1.8, maxWidth: '420px', marginBottom: '26px' }}>
                {c('control-tower','tower-description','description')}
              </p>
            </div>

            <div id="embed-tower-panel" data-animate data-delay="110" style={{ position: 'relative', display: 'flex', minWidth: 0, padding: '20px 0 20px 60px' }}>
              {/* Floating order feed — video asset */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '20px',
                  width: '280px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 80px rgba(20,20,40,.15),0 8px 24px rgba(255,255,255,.12)',
                  zIndex: 2,
                  animation: 'float-b 4.5s ease-in-out infinite',
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', display: 'block' }}
                  src={c('control-tower','order-feed-video','image') || '/assets/order-feed.mp4'}
                />
              </div>

              {/* Main Control Tower Panel */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(255,255,255,.08)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,.35)',
                  boxShadow: '0 30px 80px rgba(20,10,40,.35),inset 0 1px 0 rgba(255,255,255,.4)',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{ flex: 1, padding: '22px 24px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <img src={c('control-tower','panel-logo','image')} alt={c('control-tower','panel-logo','imageAlt')} style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B0619', background: 'rgba(255,255,255,.5)', borderRadius: '8px', padding: '5px 10px', whiteSpace: 'nowrap' }}>
                      {c('control-tower','panel-logo','extra')}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '12px', marginBottom: '16px' }}>
                    {cms.list('tower-kpis').map((r, idx) => (
                      <div key={r.key ?? idx} style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '14px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                          <span style={{ width: '16px', height: '16px', borderRadius: '5px', background: r.extra, flexShrink: 0 }} />
                          <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#3A3550', whiteSpace: 'nowrap' }}>{r.title ?? ''}</span>
                        </div>
                        <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{[ctVals.orders, ctVals.processing, ctVals.shipped, ctVals.delivered][idx]?.toLocaleString()}</div>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>{r.description ?? ''}</div>
                      </div>
                    ))}
                  </div>

                  {/* Volume Trend Graph */}
                  <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>{c('control-tower','chart-title','title')}</span>
                      <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#3A3550', background: 'rgba(255,255,255,.5)', borderRadius: '6px', padding: '4px 9px' }}>
                        {c('control-tower','chart-title','extra')}
                      </span>
                    </div>
                    <svg width="100%" height="110" viewBox="0 0 460 110" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="towerAreaFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7B5BFB" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#7B5BFB" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 68 L66 58 L132 76 L198 42 L264 18 L330 60 L396 36 L460 46 L460 110 L0 110 Z" fill="url(#towerAreaFill)" />
                      <path id="towerTrendLine" d="M0 68 L66 58 L132 76 L198 42 L264 18 L330 60 L396 36 L460 46" fill="none" stroke="#7B5BFB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9891AB', marginTop: '4px' }}>
                      {cms.list('tower-days').map((r, i) => (<span key={i}>{r.title ?? ''}</span>))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
                    {cms.list('tower-metrics').map((r, idx) => (
                      <div key={r.key ?? idx} style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: '#3A3550', marginBottom: '6px' }}>{r.title ?? ''}</div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: r.extra }}>{[r.description ?? '', `${ctVals.sla}%`, `${ctVals.dispatch}%`, `${ctVals.returns}%`][idx]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <section style={{ padding: '0 clamp(20px,5%,80px) 32px' }}>
        <div
          data-animate
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            background: 'linear-gradient(120deg,#0B0619 0%,#3A1A8F 25%,#0B0619 50%,#4D0DD9 75%,#0B0619 100%)',
            backgroundSize: '300% 300%',
            animation: 'cta-gradient 5s ease-in-out infinite',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: '28px',
            padding: '64px clamp(24px,5%,72px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-100px', left: '5%', width: '340px', height: '340px', background: 'radial-gradient(circle,rgba(77,13,217,.35) 0%,transparent 65%)', pointerEvents: 'none', animation: 'glow-drift-a 7s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '-100px', right: '5%', width: '340px', height: '340px', background: 'radial-gradient(circle,rgba(124,91,251,.3) 0%,transparent 65%)', pointerEvents: 'none', animation: 'glow-drift-b 8s ease-in-out infinite' }} />

          <div id="stats-bar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px', position: 'relative' }}>
            {cms.list('stats').map((r, idx, arr) => (
              <div key={r.key ?? idx} style={{ padding: '0 32px', ...(idx < arr.length - 1 ? { borderRight: '1px solid rgba(255,255,255,.1)' } : {}) }}>
                <div data-counter={String(parseFloat(r.title ?? '0'))} data-suffix={(r.title ?? '').replace(/[0-9.]/g, '')} style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1, marginBottom: '16px' }}>
                  {r.title ?? ''}
                </div>
                <div style={{ fontSize: '15.5px', fontWeight: 500, color: 'rgba(255,255,255,.55)' }}>{r.description ?? ''}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REAL-TIME VISIBILITY ══ */}
      <section style={{ padding: '32px clamp(20px,5%,80px) 24px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '55%', backgroundImage: 'radial-gradient(circle,rgba(77,13,217,.22) 1.5px,transparent 1.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />
        <div id="visibility-grid" style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div id="visibility-text" data-animate style={{ paddingRight: '100px' }}>
            <h2 style={{ fontSize: 'clamp(30px,3.6vw,44px)', fontWeight: 800, color: '#0B0619', lineHeight: 1.15, letterSpacing: '-.02em', marginBottom: '20px', maxWidth: '9.6em' }}>
              {c('visibility','visibility-title','title')}
            </h2>
            <p style={{ fontSize: '16px', color: '#6B6480', lineHeight: 1.7, maxWidth: '420px', marginBottom: '32px' }}>
              {c('visibility','visibility-description','description')}
            </p>
          </div>

          <div data-animate data-delay="80" style={{ position: 'relative', paddingTop: '20px', marginLeft: 'auto', maxWidth: '520px' }}>
            <div style={{ position: 'relative', background: '#F4F1FB', borderRadius: '16px', boxShadow: '0 30px 70px rgba(20,10,50,.14)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', background: '#fff', borderBottom: '1px solid #EFEAFC' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E4DEF5' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E4DEF5' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E4DEF5' }} />
                <span style={{ marginLeft: '12px', background: '#F4F1FB', borderRadius: '999px', padding: '5px 16px', fontSize: '12px', color: '#6B6480' }}>
                  {c('visibility','browser-url','label')}
                </span>
              </div>
              <img src={c('visibility','dashboard-image','image')} alt={c('visibility','dashboard-image','imageAlt')} style={{ width: '100%', display: 'block' }} />
            </div>
            <div id="visibility-floating-img" style={{ position: 'absolute', top: 0, left: '-160px', width: '360px', height: '360px', borderRadius: '14px', boxShadow: '0 24px 50px rgba(20,10,50,.2)', overflow: 'hidden', animation: 'float-a 4s ease-in-out infinite' }}>
              <img src={c('visibility','journey-image','image')} alt={c('visibility','journey-image','imageAlt')} style={{ width: '100%', height: 'auto', display: 'block', animation: 'dc-card-scroll 16s ease-in-out infinite' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: '#F7F6FB' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '56px', textAlign: 'center', lineHeight: 1.1 }}>
            {c('how-it-works','how-title','title')}
          </h2>
          <div id="how-it-works-grid" data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, position: 'relative' }}>
            <div id="how-it-works-line" style={{ position: 'absolute', top: '19px', left: '38px', right: '38px', height: '2px', background: '#DCD5F5', zIndex: 0 }} />
            {cms.list('how-it-works').filter((r) => r.key?.startsWith('step-')).map((r, idx, arr) => (
              <div key={r.key ?? idx} style={{ position: 'relative', zIndex: 1, ...(idx < arr.length - 1 ? { paddingRight: '16px' } : {}) }}>
                <span style={{ display: 'flex', width: '38px', height: '38px', borderRadius: '50%', background: '#4D0DD9', color: '#fff', fontSize: '15px', fontWeight: 800, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>{r.label ?? ''}</span>
                <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>{r.title ?? ''}</div>
                <p style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.65 }}>{r.description ?? ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FULFILLMENT SERVICES ══ */}
      <section id="solutions" style={{ padding: '80px clamp(20px,5%,80px)', background: '#F5F3FE' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div data-animate style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '16px', lineHeight: 1.1 }}>
              {c('fulfillment','fulfillment-title','title')}
            </h2>
          </div>
          <div id="fulfillment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {cms.list('fulfillment').filter((r) => r.key?.startsWith('card-')).map((r, idx) => {
              const cardHref = r.linkUrl ?? '#';
              return (
                <Link
                  key={r.key ?? idx}
                  data-animate
                  data-delay={['0', '80', '160'][idx] ?? String(idx * 80)}
                  href={cardHref}
                  className="fulfillment-card"
                  style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <div className="fulfillment-img-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '20px', borderRadius: '14px', overflow: 'hidden' }}>
                    <img src={r.image ?? ''} alt={r.imageAlt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div className="fulfillment-arrow" style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', background: '#1A3ADB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M6 4h6v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0B0619', marginBottom: '10px' }}>{r.title ?? ''}</h3>
                  <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.7, marginBottom: '14px' }}>{r.description ?? ''}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PLATFORM / SCALE ══ */}
      <section id="technology" style={{ padding: '80px clamp(20px,5%,80px)', background: 'radial-gradient(circle at 12% 15%,#E4D4FF 0%,transparent 45%),radial-gradient(circle at 90% 10%,#FFD9A8 0%,transparent 40%),linear-gradient(160deg,#F3F0FC 0%,#FBFAFE 55%,#EDE9FF 100%)', position: 'relative', overflow: 'hidden' }}>
        <div id="platform-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ maxWidth: '760px' }}>
            <h2 data-animate data-delay="60" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '12px' }}>
              {c('platform','platform-title','title')}
            </h2>
            <p data-animate data-delay="120" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, margin: '0 auto 18px' }}>
              {c('platform','platform-description','description')}
            </p>
          </div>

          <div data-animate data-delay="100" style={{ width: '100%' }}>
            <img src={c('platform','platform-diagram','image')} alt={c('platform','platform-diagram','imageAlt')} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ══ SHIPPING & DISTRIBUTION ══ */}
      <section id="shipping" style={{ scrollMarginTop: '40px', padding: '80px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div id="why-grid" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div id="why-visual" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '620px' }}>
            <svg width="620" height="620" viewBox="0 0 480 480" style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none' }}>
              <circle cx="240" cy="240" r="230" stroke="#EDE9FF" strokeWidth="1.5" fill="none" />
              <circle cx="240" cy="240" r="170" stroke="#EDE9FF" strokeWidth="1.5" fill="none" />
              <circle cx="240" cy="240" r="110" stroke="#EDE9FF" strokeWidth="1.5" fill="none" />
            </svg>
            <img data-animate style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '620px', animation: 'float-a 5s ease-in-out infinite' }} src={c('shipping','shipping-image','image')} alt={c('shipping','shipping-image','imageAlt')} />
          </div>

          <div>
            <span data-animate style={{ display: 'inline-block', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#4D0DD9', marginBottom: '14px', textTransform: 'uppercase' }}>
              {c('shipping','shipping-eyebrow','label')}
            </span>
            <h2 data-animate data-delay="60" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '22px' }}>
              {c('shipping','shipping-title','title')}
            </h2>
            <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '16px', maxWidth: '520px' }}>
              {c('shipping','shipping-p1','description')}
            </p>
            <p data-animate data-delay="140" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '16px', maxWidth: '520px' }}>
              {c('shipping','shipping-p2','description')}
            </p>
            <p data-animate data-delay="180" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '28px', maxWidth: '520px' }}>
              {c('shipping','shipping-p3','description')}
            </p>
            <Link
              data-animate
              data-delay="220"
              href={c('shipping', 'shipping-cta', 'linkUrl') || '/shipping-and-distribution/'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4D0DD9', fontSize: '15px', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
            >
              {c('shipping', 'shipping-cta', 'linkLabel') || 'Learn More'}{' '}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ display: 'block', flexShrink: 0 }}>
                <path d="M1 1l5 5-5 5" stroke="#4D0DD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY BRANDS CHOOSE WAREVOLT ══ */}
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: 'linear-gradient(160deg,#0B0619 0%,#1E1240 60%,#0B0619 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div data-animate style={{ maxWidth: '760px', marginBottom: '56px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#B49CFC', marginBottom: '14px', textTransform: 'uppercase' }}>
              {c('why-brands','why-heading','label')}
            </span>
            <h2 style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#fff', marginBottom: '22px' }}>
              {c('why-brands','why-heading','title')}
            </h2>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,.6)', lineHeight: 1.8 }}>
              {c('why-brands','why-heading','description')}
            </p>
          </div>

          <div id="why-brands-grid" data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '56px' }}>
            {cms.list('why-brands-items').map((r, idx, arr) => (
              <div key={r.key ?? idx} style={{ display: 'flex', gap: '18px', padding: '24px 0', ...(idx < 6 ? { borderBottom: '1px solid rgba(255,255,255,.1)' } : {}) }}>
                <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {whyIcons[idx]}
                </span>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{r.title ?? ''}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>{r.description ?? ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      {showTestimonials && (
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 data-animate data-delay="60" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '64px' }}>
            {c('testimonials','testimonials-title','title')}
          </h2>

          <div id="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', textAlign: 'left', alignItems: 'stretch' }}>
            {visibleTestimonials.map((t, idx) => (
              <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#fff', borderRadius: '18px', padding: '28px', boxShadow: '0 20px 50px rgba(20,10,40,.06)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#C7C2D6', marginBottom: '16px' }}>{t.company}</div>
                  <p style={{ fontSize: '14.5px', color: '#3A3550', lineHeight: 1.7, marginBottom: '18px' }}>{t.quote}</p>
                  <div style={{ color: '#F5A623', fontSize: '15px', letterSpacing: '2px', marginBottom: '32px' }}>★★★★★</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '15px', flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#0B0619' }}>{t.name}</div>
                      <div style={{ fontSize: '12.5px', color: '#8B849C' }}>{t.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '56px' }}>
            <button
              onClick={prevTesti}
              aria-label="Previous testimonial"
              style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #E4DEF5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .2s' }}
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="#4D0DD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={nextTesti}
              aria-label="Next testimonial"
              style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #E4DEF5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .2s' }}
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="#4D0DD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </section>
      )}

      {/* ══ INDUSTRIES WE SERVE ══ */}
      <section id="industries" style={{ padding: '80px clamp(20px,5%,80px)', background: '#fff', scrollMarginTop: '40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div data-animate style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#4D0DD9', marginBottom: '14px', textTransform: 'uppercase' }}>
              {c('industries', 'industries-heading', 'label')}
            </span>
            <h2 style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '22px' }}>
              {c('industries', 'industries-heading', 'title')}
            </h2>
            <p style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, maxWidth: '780px', margin: '0 auto' }}>
              {c('industries', 'industries-heading', 'description')}
            </p>
          </div>

          <div id="industries-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
            {cms.list('industries').filter((r) => r.key?.startsWith('industry-')).map((r, idx) => (
              <div key={r.key ?? idx} data-animate data-delay={String((idx % 3) * 80)}>
                <div className="industry-tile" style={{ position: 'relative', width: '100%', aspectRatio: '1.55 / 1', borderRadius: '14px', overflow: 'hidden', background: '#2A2433', boxShadow: '0 8px 22px rgba(20,10,40,.10)' }}>
                  {r.image && <img src={r.image} alt={r.imageAlt ?? ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,26,.66) 0%, rgba(20,16,26,.38) 36%, rgba(20,16,26,0) 62%)' }} />
                  <div style={{ position: 'absolute', left: '24px', right: '24px', bottom: '22px', color: '#fff' }}>
                    <h3 style={{ fontSize: 'clamp(18px,1.7vw,22px)', fontWeight: 700, letterSpacing: '-.01em', marginBottom: '4px', lineHeight: 1.2 }}>{r.title ?? ''}</h3>
                    <p style={{ fontSize: 'clamp(13px,1.15vw,15px)', fontWeight: 400, color: 'rgba(255,255,255,.92)', lineHeight: 1.45, margin: 0 }}>{r.description ?? ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {c('industries', 'industries-cta', 'linkLabel') && (
            <div data-animate style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link
                href={c('industries', 'industries-cta', 'linkUrl') || '/contact'}
                className="industries-cta"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#4D0DD9', color: '#fff', padding: '15px 36px', borderRadius: '10px', fontSize: '14.5px', fontWeight: 700, textDecoration: 'none', transition: 'background .2s, transform .2s' }}
              >
                {c('industries', 'industries-cta', 'linkLabel')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section id="contact" style={{ padding: '80px clamp(20px,5%,80px)', background: 'linear-gradient(120deg,#1E0894 0%,#4F1CF7 20%,#9D7BFF 45%,#4F1CF7 70%,#1E0894 100%)', backgroundSize: '300% 300%', animation: 'cta-gradient 6s ease-in-out infinite', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(0,0,0,.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div data-animate style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '7px 18px', marginBottom: '28px', border: '1px solid rgba(255,255,255,.2)' }}>
            <div style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '.04em' }}>{c('cta','cta-badge','label')}</span>
          </div>

          <h2 data-animate data-delay="80" style={{ fontSize: 'clamp(38px,4.5vw,68px)', fontWeight: 800, letterSpacing: '-.035em', color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
            {c('cta','cta-title','title')}
          </h2>
          <p data-animate data-delay="130" style={{ fontSize: '17px', color: 'rgba(255,255,255,.75)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 48px' }}>
            {c('cta','cta-description','description')}
          </p>
          <div data-animate data-delay="180" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setPricingOpen(true)}
              style={{ background: '#fff', color: '#4F1CF7', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'transform .2s, box-shadow .2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {c('cta','cta-quote','linkLabel')}
            </button>
            <a
              href={c('cta','cta-call','linkUrl')}
              style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', color: '#fff', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.3)', transition: 'background .2s' }}
            >
              {c('cta','cta-call','linkLabel')}
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <SiteFooter onSubscribe={() => setPricingOpen(true)} />

      {/* ══ EXACT PRICING MODAL POPUP FROM CLAUDE DESIGN ══ */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />
    </>
  );
}
