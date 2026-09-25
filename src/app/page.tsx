'use client';

import React, { useState, useEffect, useRef } from 'react';
import PricingModal, { PricingFormData } from '@/components/PricingModal';

export default function HomePage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroMobileOpen, setHeroMobileOpen] = useState(false);
  const [techMenuOpen, setTechMenuOpen] = useState(false);
  const [heroTechMenuOpen, setHeroTechMenuOpen] = useState(false);

  const [ctVals, setCtVals] = useState({
    orders: 2857,
    processing: 1482,
    shipped: 1103,
    delivered: 2012,
    sla: 96.4,
    dispatch: 97.8,
    returns: 1.2,
  });

  const techMegaMenu = [
    { label: 'Order & Warehouse Management', desc: 'From order to dispatch, every fulfillment workflow connected.', href: '/order-and-warehouse-management' },
    { label: 'Inventory & Returns Management', desc: 'Complete control of stock, movements, and returns across your network.', href: '/order-and-warehouse-management' },
    { label: 'Analytics & Reporting', desc: 'Turn fulfillment data into clear, actionable insights.', href: '/platform' },
  ];

  const testimonialsData = [
    { company: 'Reliance Retail', quote: 'Warevolt delivered our 200,000 sq ft distribution center two weeks ahead of schedule with flawless execution.', initials: 'RK', name: 'Rahul Kumar', city: 'Los Angeles', avatarBg: 'linear-gradient(135deg,#4D0DD9,#8B6BFF)' },
    { company: 'Mahindra Components', quote: 'The PEB structure for our plant was engineered to perfection — workmanship and support were world-class.', initials: 'PS', name: 'Priya Sharma', city: 'California', avatarBg: 'linear-gradient(135deg,#7B5BFB,#A78BFA)' },
    { company: 'Sun Pharma', quote: 'Warevolt understood our compliance needs and delivered a state-of-the-art facility that passed every inspection.', initials: 'AM', name: 'Arun Menon', city: 'California', avatarBg: 'linear-gradient(135deg,#3A0FD9,#4D0DD9)' },
    { company: 'Tata Logistics', quote: 'Their team scaled our cold storage capacity in record time without a single day of downtime.', initials: 'SK', name: 'Sanjay Kapoor', city: 'Mumbai', avatarBg: 'linear-gradient(135deg,#4D0DD9,#8B6BFF)' },
    { company: 'Godrej Industries', quote: 'Precision engineering and transparent communication throughout — exactly what we needed for our expansion.', initials: 'NV', name: 'Neha Verma', city: 'Pune', avatarBg: 'linear-gradient(135deg,#7B5BFB,#A78BFA)' },
    { company: 'Adani Wilmar', quote: 'From design to handover, Warevolt made a complex warehouse project feel effortless.', initials: 'RP', name: 'Ravi Patel', city: 'Ahmedabad', avatarBg: 'linear-gradient(135deg,#3A0FD9,#4D0DD9)' },
  ];

  const prevTesti = () => {
    setTestiIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const nextTesti = () => {
    setTestiIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const visibleTestimonials = [0, 1, 2].map(
    (i) => testimonialsData[(testiIndex + i) % testimonialsData.length]
  );

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
              src="/assets/warevolt-logo-transparent.png"
              alt="Warevolt"
              style={{ height: '120px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </a>

          <div id="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            <a
              href="#solutions"
              style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', transition: 'color .3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}
            >
              Solutions
            </a>

            <div
              id="tech-menu-wrap"
              style={{ position: 'relative' }}
              onMouseEnter={() => setTechMenuOpen(true)}
              onMouseLeave={() => setTechMenuOpen(false)}
            >
              <a
                href="#technology"
                style={{
                  fontSize: '14.5px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,.85)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color .3s',
                }}
              >
                Technology{' '}
                <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {techMenuOpen && (
                <div
                  id="tech-mega-menu"
                  style={{
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
              )}
            </div>

            <a
              href="#industries"
              style={{
                fontSize: '14.5px',
                fontWeight: 500,
                color: 'rgba(255,255,255,.85)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color .3s',
              }}
            >
              Sectors{' '}
              <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
              Pricing
            </button>

            <a
              href="#projects"
              style={{ fontSize: '14.5px', fontWeight: 500, color: 'rgba(255,255,255,.85)', textDecoration: 'none', transition: 'color .3s' }}
            >
              Track
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexShrink: 0 }}>
            <a
              href="tel:+919876543210"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,.85)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 400,
                whiteSpace: 'nowrap',
                transition: 'color .2s',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.12 1.16 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.19 6.19l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
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
                cursor: 'pointer',
                border: 'none',
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
              Get a Quote{' '}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {mobileNavOpen && (
            <div
              id="nav-mobile-panel"
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
              <a href="#solutions" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                Solutions
              </a>
              <a href="#technology" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                Technology
              </a>
              <a href="#industries" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                Sectors
              </a>
              <button
                onClick={() => { setPricingOpen(true); setMobileNavOpen(false); }}
                style={{ padding: '14px 0', color: '#fff', textAlign: 'left', background: 'none', border: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.1)', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Pricing
              </button>
              <a href="#projects" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>
                Track
              </a>
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
            backgroundImage: "url('/uploads/pasted-1784525640761-0.png')",
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
                src="/assets/warevolt-logo-white.png"
                alt="Warevolt"
                style={{ height: '140px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </a>

            <div id="hero-nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
              <a href="#solutions" style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,.92)', textDecoration: 'none', transition: 'color .2s', whiteSpace: 'nowrap' }}>
                Solutions
              </a>

              <div
                id="hero-tech-menu-wrap"
                style={{ position: 'relative' }}
                onMouseEnter={() => setHeroTechMenuOpen(true)}
                onMouseLeave={() => setHeroTechMenuOpen(false)}
              >
                <a
                  href="#technology"
                  style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,.92)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color .2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Technology{' '}
                  <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {heroTechMenuOpen && (
                  <div
                    id="hero-tech-mega-menu"
                    style={{
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
                )}
              </div>

              <a
                href="#industries"
                style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,.92)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color .2s',
                  whiteSpace: 'nowrap',
                }}
              >
                Sectors{' '}
                <svg width="14" height="9" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.75 }}>
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                Pricing
              </button>
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
                Speak to an expert
              </button>
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {heroMobileOpen && (
              <div
                id="hero-mobile-panel"
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
                <a href="#solutions" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  Solutions
                </a>
                <a href="#technology" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  Technology
                </a>
                <a href="#industries" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  Sectors
                </a>
                <button
                  onClick={() => { setPricingOpen(true); setHeroMobileOpen(false); }}
                  style={{ padding: '14px 0', color: '#fff', textAlign: 'left', background: 'none', border: 'none', fontSize: '16px', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.08)', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Pricing
                </button>
                <a href="#projects" style={{ padding: '14px 0', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>
                  Track
                </a>
                <a href="tel:+919876543210" style={{ marginTop: '8px', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, opacity: 0.8 }}>
                  +91 98765 43210
                </a>
                <button
                  onClick={() => { setPricingOpen(true); setHeroMobileOpen(false); }}
                  style={{ marginTop: '12px', background: '#4D0DD9', color: '#fff', padding: '13px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}
                >
                  Speak to an expert
                </button>
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
                Scale Faster with Pan-India eCommerce Fulfillment &amp; 3PL
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
                Headquartered in Kochi, Warevolt powers inventory management, warehousing, order fulfillment, shipping, and nationwide distribution for modern D2C, B2B, retail, marketplace, and quick commerce businesses.
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
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT SECTION ══ */}
      <section id="about" style={{ position: 'relative', overflow: 'hidden', padding: '80px clamp(20px,5%,80px)' }}>
        <img
          src="/uploads/pasted-1784523250294-0_1-removebg-preview 1-7ae9daee.png"
          alt=""
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
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80"
                alt="Warehouse photo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '28px', right: '28px', background: '#4F1CF7', color: '#fff', borderRadius: '20px', padding: '22px 26px' }}>
              <div style={{ fontSize: '38px', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1 }}>25+</div>
              <div style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8, marginTop: '5px' }}>Years of Excellence</div>
            </div>
            <div style={{ position: 'absolute', top: '28px', left: '-24px', background: '#fff', borderRadius: '16px', padding: '14px 18px', boxShadow: '0 12px 40px rgba(79,28,247,.12)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B6480', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '6px' }}>
                ISO Certified
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#4F1CF7" strokeWidth="2" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0B0619' }}>Verified Quality</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 data-animate data-delay="80" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px' }}>
              About
            </h2>
            <p data-animate data-delay="130" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '24px' }}>
              We build reliable fulfillment solutions that help businesses move products efficiently, safely, and on time. With 25+ years of industry experience, we combine proven processes, quality materials, and technology-driven execution to deliver consistent results for Indian and global brands.
            </p>
            <p data-animate data-delay="150" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '40px' }}>
              Our commitment goes beyond completing an order. From planning and production to quality checks and delivery, every stage is managed with precision and accountability. We follow international standards, prioritize safety, and ensure every project is delivered according to agreed timelines.
            </p>

            <div data-animate data-delay="180" id="about-badges" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '44px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#4F1CF7" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>International Standards</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>ISO certified materials and processes</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#4F1CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>On-Time Delivery</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>Milestone-driven project execution</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4F1CF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>Safety First</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>Zero-incident site management</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                <div style={{ width: '38px', height: '38px', background: '#F0EEFF', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V12l4 2" stroke="#4F1CF7" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="10" stroke="#4F1CF7" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B0619', marginBottom: '4px' }}>25+ Years</div>
                  <div style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.5 }}>Deep domain expertise</div>
                </div>
              </div>
            </div>

            <a
              data-animate
              data-delay="220"
              href="#"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4F1CF7', fontSize: '15px', fontWeight: 600, textDecoration: 'none', transition: 'gap .2s' }}
            >
              Learn More About Us{' '}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1l5 5-5 5" stroke="#4F1CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══ INTEGRATIONS LOGO STRIP ══ */}
      <section style={{ padding: '56px 0', background: '#fff', borderTop: '1px solid #F0EBF8', borderBottom: '1px solid #F0EBF8', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)', maskImage: 'linear-gradient(to right,transparent 0%,#000 12%,#000 88%,transparent 100%)' }}>
          <div style={{ display: 'flex', gap: '88px', alignItems: 'center', animation: 'marquee 30s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528096970-0.png" alt="Shopify" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528121293-0.png" alt="WooCommerce" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528144899-0.png" alt="Amazon" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528167652-0.png" alt="Flipkart" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528198760-0.png" alt="Myntra" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528221498-0.png" alt="Ajio" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528247214-0.png" alt="Nykaa" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528267724-0.png" alt="Magento" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528096970-0.png" alt="Shopify" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528121293-0.png" alt="WooCommerce" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528144899-0.png" alt="Amazon" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528167652-0.png" alt="Flipkart" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528198760-0.png" alt="Myntra" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528221498-0.png" alt="Ajio" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528247214-0.png" alt="Nykaa" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
            <div style={{ width: '170px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><img src="/uploads/pasted-1784528267724-0.png" alt="Magento" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} /></div>
          </div>
        </div>
      </section>

      {/* ══ WAREHOUSE VISUAL SECTION ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', textAlign: 'center' }}>
          <div data-animate data-delay="60" style={{ maxWidth: '640px' }}>
            <h2 style={{ fontSize: 'clamp(30px,3vw,44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '18px' }}>
              Sell Anywhere. Fulfill Everywhere.
            </h2>
            <p style={{ fontSize: '16px', color: '#6B6480', lineHeight: 1.8 }}>
              Connect your e-commerce, marketplaces, retail, B2B, and quick commerce channels into a single, automated fulfillment network.
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
              src="/uploads/warehouse loop.mp4"
            />
          </div>
        </div>
      </section>

      {/* ══ EMBEDDED TRACKING & CONTROL TOWER ══ */}
      <section style={{ padding: '100px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '64px', alignItems: 'center' }}>
            <div data-animate data-delay="60">
              <h2 style={{ fontSize: 'clamp(30px,3vw,44px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px' }}>
                Every order is a promise.<br />We keep it.
              </h2>
              <p style={{ fontSize: '16px', color: '#6B6480', lineHeight: 1.8, maxWidth: '420px', marginBottom: '26px' }}>
                Every order represents a commitment to your customer. Warevolt powers the journey from checkout to doorstep by combining intelligent software, efficient warehouse operations, and seamless shipping integrations - ensuring every shipment is accurate, fast, and dependable.
              </p>
            </div>

            <div id="embed-tower-panel" data-animate data-delay="110" style={{ position: 'relative', display: 'flex', minWidth: 0, padding: '20px 0 20px 60px' }}>
              {/* Floating order feed */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '20px',
                  width: '280px',
                  background: 'rgba(255,255,255,.12)',
                  backdropFilter: 'blur(45px) saturate(180%) brightness(1.1)',
                  WebkitBackdropFilter: 'blur(45px) saturate(180%) brightness(1.1)',
                  border: '1px solid rgba(255,255,255,.45)',
                  borderRadius: '22px',
                  padding: '16px',
                  boxShadow: '0 30px 80px rgba(20,20,40,.15),0 8px 24px rgba(255,255,255,.12),inset 0 1px 0 rgba(255,255,255,.5)',
                  zIndex: 2,
                  overflow: 'hidden',
                  animation: 'float-b 4.5s ease-in-out infinite',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '70%', height: '55%', background: 'radial-gradient(circle at 25% 20%,rgba(255,255,255,.12),transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '.02em', color: '#0B0619' }}>UNIFIED ORDER FEED</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#22C55E' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px rgba(34,197,94,.55)', animation: 'dc-live-pulse 1.6s ease-out infinite' }} />
                    Live
                  </span>
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', marginBottom: '8px', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.35)', borderRadius: '14px', animation: 'dc-feed5-row1 4.8s linear infinite' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/uploads/pasted-1785731347143-0.png" alt="Amazon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B0619' }}>#AMZ-5421</div>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', color: '#4B4460', whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7B5BFB' }} />2 sec ago
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', marginBottom: '8px', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.35)', borderRadius: '14px', animation: 'dc-feed5-row2 4.8s linear infinite' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/uploads/pasted-1785731537374-0.png" alt="Flipkart" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B0619' }}>#FLP-9823</div>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', color: '#4B4460', whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7B5BFB' }} />5 sec ago
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', marginBottom: '8px', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.35)', borderRadius: '14px', animation: 'dc-feed5-row3 4.8s linear infinite' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/uploads/pasted-1785731732420-0.png" alt="Shopify" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B0619' }}>#SHP-7214</div>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', color: '#4B4460', whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7B5BFB' }} />8 sec ago
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', marginBottom: '8px', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.35)', borderRadius: '14px', animation: 'dc-feed5-row4 4.8s linear infinite' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/uploads/pasted-1785731671522-0.png" alt="Myntra" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B0619' }}>#MYN-1923</div>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', color: '#7B5BFB', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7B5BFB' }} />Processing
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,.35)', borderRadius: '14px', animation: 'dc-feed5-row5 4.8s linear infinite' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/uploads/pasted-1785731892932-0.png" alt="Blinkit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B0619' }}>#BLK-8821</div>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10.5px', color: '#22C55E', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }} />Dispatched
                    </span>
                  </div>
                </div>
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
                    <img src="/assets/warevolt-mark.svg" alt="Warevolt" style={{ height: '26px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#0B0619', background: 'rgba(255,255,255,.5)', borderRadius: '8px', padding: '5px 10px', whiteSpace: 'nowrap' }}>
                      Today, 16 May
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '14px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#7B5BFB', flexShrink: 0 }} />
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#3A3550', whiteSpace: 'nowrap' }}>Orders Today</span>
                      </div>
                      <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{ctVals.orders.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>↑ 18.6%</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '14px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#2F7BF6', flexShrink: 0 }} />
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#3A3550', whiteSpace: 'nowrap' }}>Processing</span>
                      </div>
                      <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{ctVals.processing.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>↑ 16.3%</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '14px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#22C55E', flexShrink: 0 }} />
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#3A3550', whiteSpace: 'nowrap' }}>Shipped</span>
                      </div>
                      <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{ctVals.shipped.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>↑ 12.8%</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '14px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                        <span style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#7B5BFB', flexShrink: 0 }} />
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#3A3550', whiteSpace: 'nowrap' }}>Delivered</span>
                      </div>
                      <div style={{ fontSize: '19px', fontWeight: 800, color: '#0B0619' }}>{ctVals.delivered.toLocaleString()}</div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#22C55E' }}>↑ 20.1%</div>
                    </div>
                  </div>

                  {/* Volume Trend Graph */}
                  <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B0619' }}>Order Volume Trend</span>
                      <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#3A3550', background: 'rgba(255,255,255,.5)', borderRadius: '6px', padding: '4px 9px' }}>
                        This Week
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
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: '#3A3550', marginBottom: '6px' }}>Inventory Status</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#22C55E' }}>Healthy</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: '#3A3550', marginBottom: '6px' }}>SLA Performance</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B0619' }}>{ctVals.sla}%</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: '#3A3550', marginBottom: '6px' }}>Dispatch Today</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B0619' }}>{ctVals.dispatch}%</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: '#3A3550', marginBottom: '6px' }}>Returns</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#F59E0B' }}>{ctVals.returns}%</div>
                    </div>
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
            <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,.1)' }}>
              <div data-counter="99.5" data-suffix="%" style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1, marginBottom: '16px' }}>
                99.5%
              </div>
              <div style={{ fontSize: '15.5px', fontWeight: 500, color: 'rgba(255,255,255,.55)' }}>Inventory Accuracy</div>
            </div>
            <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,.1)' }}>
              <div data-counter="99.8" data-suffix="%" style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1, marginBottom: '16px' }}>
                99.8%
              </div>
              <div style={{ fontSize: '15.5px', fontWeight: 500, color: 'rgba(255,255,255,.55)' }}>Order Accuracy</div>
            </div>
            <div style={{ padding: '0 32px', borderRight: '1px solid rgba(255,255,255,.1)' }}>
              <div data-counter="45" data-suffix="+" style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1, marginBottom: '16px' }}>
                45+
              </div>
              <div style={{ fontSize: '15.5px', fontWeight: 500, color: 'rgba(255,255,255,.55)' }}>Channel Integrations</div>
            </div>
            <div style={{ padding: '0 32px' }}>
              <div data-counter="100" data-suffix="%" style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 800, color: '#fff', letterSpacing: '-.02em', lineHeight: 1, marginBottom: '16px' }}>
                100%
              </div>
              <div style={{ fontSize: '15.5px', fontWeight: 500, color: 'rgba(255,255,255,.55)' }}>Same-Day Dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REAL-TIME VISIBILITY ══ */}
      <section style={{ padding: '32px clamp(20px,5%,80px) 24px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '55%', backgroundImage: 'radial-gradient(circle,rgba(77,13,217,.22) 1.5px,transparent 1.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div data-animate>
            <h2 style={{ fontSize: 'clamp(30px,3.6vw,44px)', fontWeight: 800, color: '#0B0619', lineHeight: 1.15, letterSpacing: '-.02em', marginBottom: '20px' }}>
              Real-time visibility across every warehouse
            </h2>
            <p style={{ fontSize: '16px', color: '#6B6480', lineHeight: 1.7, maxWidth: '440px', marginBottom: '32px' }}>
              Track stock levels, order status and dispatch progress from a single dashboard — updated the moment it happens on the floor.
            </p>
          </div>

          <div data-animate data-delay="80" style={{ position: 'relative', paddingTop: '20px', marginLeft: 'auto', maxWidth: '520px' }}>
            <div style={{ position: 'relative', background: '#F4F1FB', borderRadius: '16px', boxShadow: '0 30px 70px rgba(20,10,50,.14)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 18px', background: '#fff', borderBottom: '1px solid #EFEAFC' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E4DEF5' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E4DEF5' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E4DEF5' }} />
                <span style={{ marginLeft: '12px', background: '#F4F1FB', borderRadius: '999px', padding: '5px 16px', fontSize: '12px', color: '#6B6480' }}>
                  🔒 dashboard.warevolt.in
                </span>
              </div>
              <img src="/assets/control-tower-dashboard.png" alt="Warevolt Control Tower dashboard" style={{ width: '100%', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', top: 0, left: '-210px', width: '360px', height: '360px', borderRadius: '14px', boxShadow: '0 24px 50px rgba(20,10,50,.2)', overflow: 'hidden', animation: 'float-a 4s ease-in-out infinite' }}>
              <img src="/assets/order-journey-screenshot.png" alt="Order journey steps" style={{ width: '100%', height: 'auto', display: 'block', animation: 'dc-card-scroll 16s ease-in-out infinite' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: '#F7F6FB' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h2 data-animate style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '56px', textAlign: 'center', lineHeight: 1.1 }}>
            How It Works
          </h2>
          <div data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '19px', left: '38px', right: '38px', height: '2px', background: '#DCD5F5', zIndex: 0 }} />
            <div style={{ position: 'relative', zIndex: 1, paddingRight: '16px' }}>
              <span style={{ display: 'flex', width: '38px', height: '38px', borderRadius: '50%', background: '#4D0DD9', color: '#fff', fontSize: '15px', fontWeight: 800, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>1</span>
              <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Connect Your Sales Channels</div>
              <p style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.65 }}>Integrate your D2C store, online marketplaces, ERP, or custom platforms. Orders and inventory synchronize automatically in real time.</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, paddingRight: '16px' }}>
              <span style={{ display: 'flex', width: '38px', height: '38px', borderRadius: '50%', background: '#4D0DD9', color: '#fff', fontSize: '15px', fontWeight: 800, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>2</span>
              <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Send Us Your Inventory</div>
              <p style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.65 }}>We receive, inspect, and store your inventory using standardized warehouse processes, ensuring accurate tracking.</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, paddingRight: '16px' }}>
              <span style={{ display: 'flex', width: '38px', height: '38px', borderRadius: '50%', background: '#4D0DD9', color: '#fff', fontSize: '15px', fontWeight: 800, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>3</span>
              <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Automate Order Flow</div>
              <p style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.65 }}>Orders from every connected sales channel are automatically routed to our fulfillment platform.</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, paddingRight: '16px' }}>
              <span style={{ display: 'flex', width: '38px', height: '38px', borderRadius: '50%', background: '#4D0DD9', color: '#fff', fontSize: '15px', fontWeight: 800, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>4</span>
              <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Pick, Pack &amp; Dispatch</div>
              <p style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.65 }}>Barcode verification, standardized SOPs, and quality checks, shipped through your preferred carrier.</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'flex', width: '38px', height: '38px', borderRadius: '50%', background: '#4D0DD9', color: '#fff', fontSize: '15px', fontWeight: 800, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>5</span>
              <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', marginBottom: '8px' }}>Monitor &amp; Scale</div>
              <p style={{ fontSize: '13px', color: '#6B6480', lineHeight: 1.65 }}>Track inventory, orders, shipments, returns, and performance in real time as your business grows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FULFILLMENT SERVICES ══ */}
      <section id="solutions" style={{ padding: '80px clamp(20px,5%,80px)', background: '#F5F3FE' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div data-animate style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '16px', lineHeight: 1.1 }}>
              Our Fulfillment Services
            </h2>
          </div>
          <div id="fulfillment-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            <a data-animate data-delay="0" href="/d2c-marketplace-fulfillment" style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '20px', borderRadius: '14px', overflow: 'hidden' }}>
                <img src="/assets/d2c-marketplace.jpg" alt="D2C & Marketplace Fulfillment" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'card-zoom 9s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', background: '#1A3ADB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M6 4h6v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0B0619', marginBottom: '10px' }}>D2C &amp; Marketplace Fulfillment</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.7, marginBottom: '14px' }}>One fulfillment solution for your online store and every major marketplace.</p>
            </a>

            <a data-animate data-delay="80" href="/order-and-warehouse-management" style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '20px', borderRadius: '14px', overflow: 'hidden' }}>
                <img src="/assets/b2b-fulfillment.jpg" alt="B2B Fulfillment" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'card-zoom 10s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', background: '#1A3ADB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M6 4h6v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0B0619', marginBottom: '10px' }}>Order &amp; Warehouse Management</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.7, marginBottom: '14px' }}>From order creation to final dispatch, every fulfillment workflow connected in one intelligent platform.</p>
            </a>

            <div data-animate data-delay="160" style={{ cursor: 'pointer' }} onClick={() => setPricingOpen(true)}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', marginBottom: '20px', borderRadius: '14px', overflow: 'hidden' }}>
                <img src="/assets/quick-commerce.jpg" alt="Quickcommerce Fulfillment" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'card-zoom 8.5s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', background: '#1A3ADB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M6 4h6v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0B0619', marginBottom: '10px' }}>Quickcommerce Fulfillment</h3>
              <p style={{ fontSize: '13.5px', color: '#6B6480', lineHeight: 1.7, marginBottom: '14px' }}>Dark-store-ready micro-fulfillment for 10-30 minute delivery promises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PLATFORM / SCALE ══ */}
      <section id="technology" style={{ padding: '80px clamp(20px,5%,80px)', background: 'radial-gradient(circle at 12% 15%,#E4D4FF 0%,transparent 45%),radial-gradient(circle at 90% 10%,#FFD9A8 0%,transparent 40%),linear-gradient(160deg,#F3F0FC 0%,#FBFAFE 55%,#EDE9FF 100%)', position: 'relative', overflow: 'hidden' }}>
        <div id="platform-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ maxWidth: '760px' }}>
            <h2 data-animate data-delay="60" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '12px' }}>
              One Platform. Absolute Control.
            </h2>
            <p data-animate data-delay="120" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, margin: '0 auto 18px' }}>
              Warevolt Scale™ is the intelligent fulfillment platform that powers every Warevolt operation. It brings together order management, inventory management, warehouse operations, shipping, returns, and analytics into a single connected platform—giving your business complete visibility and control over every stage of fulfillment.
            </p>
          </div>

          <div data-animate data-delay="100" style={{ width: '100%' }}>
            <img src="/uploads/warevolt-scale-ecosystem-diagram-v2.png" alt="Warevolt Scale ecosystem diagram" style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ══ SHIPPING & DISTRIBUTION ══ */}
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div id="why-grid" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div id="why-visual" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '620px' }}>
            <svg width="620" height="620" viewBox="0 0 480 480" style={{ position: 'absolute', zIndex: 0, pointerEvents: 'none' }}>
              <circle cx="240" cy="240" r="230" stroke="#EDE9FF" strokeWidth="1.5" fill="none" />
              <circle cx="240" cy="240" r="170" stroke="#EDE9FF" strokeWidth="1.5" fill="none" />
              <circle cx="240" cy="240" r="110" stroke="#EDE9FF" strokeWidth="1.5" fill="none" />
            </svg>
            <img data-animate style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '620px', animation: 'float-a 5s ease-in-out infinite' }} src="/uploads/Group 9.png" alt="Warevolt operations dashboard" />
          </div>

          <div>
            <span data-animate style={{ display: 'inline-block', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#4D0DD9', marginBottom: '14px', textTransform: 'uppercase' }}>
              Shipping &amp; Distribution
            </span>
            <h2 data-animate data-delay="60" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '22px' }}>
              Flexible Shipping. Built Around Your Business.
            </h2>
            <p data-animate data-delay="100" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '16px', maxWidth: '520px' }}>
              Every business ships differently. Some fulfill thousands of eCommerce orders every day, while others move pallets of inventory between factories, distributors, retail stores, and warehouses. Warevolt gives you the flexibility to manage both through a single fulfillment partner.
            </p>
            <p data-animate data-delay="140" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '16px', maxWidth: '520px' }}>
              For Ecommerce shipments, our Bring Your Own Account (BYOA) model lets you continue using your preferred shipping platform or courier accounts. For larger inventory movements, our managed freight network connects you with trusted transport partners across India for Full Truckload (FTL), Part Truckload (PTL), and Less Than Truckload (LTL) shipments.
            </p>
            <p data-animate data-delay="180" style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.8, marginBottom: '28px', maxWidth: '520px' }}>
              Whether you&apos;re shipping a single parcel or an entire truckload, Warevolt provides the technology, operational expertise, and nationwide logistics network to move your inventory efficiently, accurately, and at scale.
            </p>
            <button
              data-animate
              data-delay="220"
              onClick={() => setPricingOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#4D0DD9', fontSize: '15px', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
            >
              Learn More{' '}
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none" style={{ display: 'block', flexShrink: 0 }}>
                <path d="M1 1l5 5-5 5" stroke="#4D0DD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ WHY BRANDS CHOOSE WAREVOLT ══ */}
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: 'linear-gradient(160deg,#0B0619 0%,#1E1240 60%,#0B0619 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div data-animate style={{ maxWidth: '760px', marginBottom: '56px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 800, letterSpacing: '.08em', color: '#B49CFC', marginBottom: '14px', textTransform: 'uppercase' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B49CFC' }} />
              Why Brands Choose Warevolt
            </span>
            <h2 style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.03em', color: '#fff', marginBottom: '22px' }}>
              Logistics Built for Control, Visibility, and Scale
            </h2>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,.6)', lineHeight: 1.8 }}>
              Warevolt combines intelligent fulfillment, flexible shipping, nationwide distribution, and connected technology into one scalable logistics platform—helping your business grow without operational complexity.
            </p>
          </div>

          <div data-animate data-delay="60" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '56px' }}>
            <div style={{ display: 'flex', gap: '18px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7.5" cy="18.5" r="1.6" stroke="#C9B8F5" strokeWidth="1.6" /><circle cx="17.5" cy="18.5" r="1.6" stroke="#C9B8F5" strokeWidth="1.6" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Flexible Shipping (BYOA)</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Keep your preferred shipping platform, courier partners, and negotiated rates with our Bring Your Own Account (BYOA) model. Enjoy complete flexibility without platform lock-in.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="#C9B8F5" strokeWidth="1.8" /><path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Dedicated Account Manager</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Work with a dedicated logistics expert who understands your products, fulfillment requirements, and growth goals—from onboarding through long-term expansion.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#C9B8F5" strokeWidth="1.8" /><path d="M9 12l2 2 4-4" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Inventory Accuracy</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Protect your inventory with barcode-driven operations, real-time stock visibility, cycle counting, and multi-point quality checks.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 16V8l8-4 8 4v8l-8 4-8-4z" stroke="#C9B8F5" strokeWidth="1.8" strokeLinejoin="round" /><path d="M4 8l8 4 8-4M12 12v8" stroke="#C9B8F5" strokeWidth="1.8" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Accurate Weight &amp; Dimensions</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Every shipment is verified for weight and volumetric dimensions before dispatch to reduce billing discrepancies and improve shipping cost accuracy.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="#C9B8F5" strokeWidth="1.8" /><path d="M8 20h8M12 16v4" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Connected Technology</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Integrate your eCommerce stores, marketplaces, ERP, and shipping platforms into one centralized fulfillment ecosystem.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" stroke="#C9B8F5" strokeWidth="1.8" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Nationwide Distribution</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Manage everything from eCommerce parcel fulfillment to FTL, PTL, and LTL freight through a single logistics partner.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 20l6-6M14 4h6v6M20 4L10 14" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Operational Excellence</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Standardized SOPs, barcode verification, and automated warehouse workflows ensure faster, more consistent, and highly accurate fulfillment.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '18px', padding: '24px 0' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(123,91,251,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 4 8-8" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 8h5v5" stroke="#C9B8F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Built to Scale</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.55)', lineHeight: 1.7 }}>Whether you&apos;re growing your D2C business, expanding into marketplaces, or supplying retail channels, Warevolt scales alongside your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ padding: '80px clamp(20px,5%,80px)', background: '#F7F6FB', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 data-animate data-delay="60" style={{ fontSize: 'clamp(34px,3.5vw,54px)', fontWeight: 800, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '64px' }}>
            What Our Clients Say
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

      {/* ══ CTA BANNER ══ */}
      <section id="contact" style={{ padding: '80px clamp(20px,5%,80px)', background: 'linear-gradient(120deg,#1E0894 0%,#4F1CF7 20%,#9D7BFF 45%,#4F1CF7 70%,#1E0894 100%)', backgroundSize: '300% 300%', animation: 'cta-gradient 6s ease-in-out infinite', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(0,0,0,.15) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div data-animate style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '7px 18px', marginBottom: '28px', border: '1px solid rgba(255,255,255,.2)' }}>
            <div style={{ width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', animation: 'pulse-dot 2s infinite' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '.04em' }}>Now taking new projects</span>
          </div>

          <h2 data-animate data-delay="80" style={{ fontSize: 'clamp(38px,4.5vw,68px)', fontWeight: 800, letterSpacing: '-.035em', color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
            Let&apos;s Build Your Next Warehouse Together.
          </h2>
          <p data-animate data-delay="130" style={{ fontSize: '17px', color: 'rgba(255,255,255,.75)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 48px' }}>
            Share your project requirements and our team will get back to you within 24 hours with a detailed plan.
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
              Get a Quote
            </button>
            <a
              href="tel:+91-9876543210"
              style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', color: '#fff', padding: '16px 36px', borderRadius: '12px', fontSize: '15.5px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.3)', transition: 'background .2s' }}
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#0B0619', padding: '80px clamp(20px,5%,80px) 40px', color: 'rgba(255,255,255,.6)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div id="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: '60px', marginBottom: '64px' }}>
            {/* Brand */}
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

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="#about" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>About Us</a>
                <a href="#solutions" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Solutions</a>
                <a href="#projects" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Projects</a>
                <a href="#industries" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Industries</a>
                <a href="#" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}>Blog</a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: '24px' }}>Solutions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a href="/order-and-warehouse-management" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Order &amp; Warehouse Management</a>
                <a href="/order-and-warehouse-management" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Inventory &amp; Returns Management</a>
                <a href="/d2c-marketplace-fulfillment" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>D2C &amp; Marketplace Fulfillment</a>
                <a href="/platform" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s' }}>Analytics &amp; Reporting</a>
              </div>
            </div>

            {/* Contact */}
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

              {/* Newsletter */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ flex: 1, background: 'rgba(255,255,255,.08)', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '13.5px', fontFamily: 'inherit', outline: 'none' }}
                />
                <button
                  style={{ background: '#4D0DD9', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 18px', fontSize: '13.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)' }}>© 2026 Warevolt. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '28px' }}>
              <a href="#" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '13.5px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ EXACT PRICING MODAL POPUP FROM CLAUDE DESIGN ══ */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />
    </>
  );
}
