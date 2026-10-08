'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSiteHeader } from '@/lib/site';
import type { CmsRow } from '@/lib/cms';
import { SolutionsDropdown, SolutionsMobileList, solutionsItems } from '@/components/SolutionsMenu';
import { LoginLabel, LoginMenuItem, HamburgerIcon } from '@/components/MobileMenuBits';

const OPENS_PRICING = 'opens-pricing-modal';
const MEGA_MENU = 'mega-menu';
const SOLUTIONS_MENU = 'solutions-menu';

const navLinkStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 400,
  color: 'rgba(255,255,255,.92)',
  textDecoration: 'none',
  transition: 'color .2s',
  whiteSpace: 'nowrap',
};

const mobileLinkStyle: React.CSSProperties = {
  padding: '14px 0',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 500,
  borderBottom: '1px solid rgba(255,255,255,.08)',
};

/** Internal hrefs use next/link, everything else (#, mailto:, tel:, external) a plain anchor. */
function SmartLink({
  href,
  id,
  style,
  className,
  onClick,
  children,
}: {
  href: string;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith('/')) {
    return (
      <Link id={id} href={href} style={style} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a id={id} href={href} style={style} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export default function SiteHeaderNav({ onOpenPricing }: { onOpenPricing: () => void }) {
  const [heroMobileOpen, setHeroMobileOpen] = useState(false);
  const [heroTechMenuOpen, setHeroTechMenuOpen] = useState(false);
  const [stickyMobileOpen, setStickyMobileOpen] = useState(false);
  const [stickyTechOpen, setStickyTechOpen] = useState(false);
  const stickyRef = useRef<HTMLElement | null>(null);
  const header = useSiteHeader();

  const logo = header.one('brand', 'logo-light');
  const logoDark = header.one('brand', 'logo-dark');
  const navItems = header.list('nav');
  const megaMenu = header.list('mega-menu');
  const solutions = solutionsItems(header);
  const login = header.one('actions', 'login');
  const cta = header.one('actions', 'cta');
  const phone = header.one('actions', 'phone');

  const logoSrc = logo.image || '/assets/warevolt-logo-white.png';
  const logoHref = logo.linkUrl || '/';

  const renderDesktopItem = (item: CmsRow, idx: number, v: 'hero' | 'sticky' = 'hero') => {
    const sticky = v === 'sticky';
    const fs = sticky ? '14.5px' : '15px';
    const fw = sticky ? 500 : 400;
    const col = sticky ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.92)';
    const techOpen = sticky ? stickyTechOpen : heroTechMenuOpen;
    const setTech = sticky ? setStickyTechOpen : setHeroTechMenuOpen;
    if (item.extra === SOLUTIONS_MENU) {
      return (
        <SolutionsDropdown
          key={item.key ?? idx}
          label={item.linkLabel ?? ''}
          items={solutions}
          wrapId={`${v}-solutions-menu-wrap`}
          menuId={`${v}-solutions-mega-menu`}
          labelStyle={{ fontSize: fs, fontWeight: fw, color: col }}
        />
      );
    }
    if (item.extra === MEGA_MENU) {
      return (
        <div
          key={item.key ?? idx}
          id={`${v}-tech-menu-wrap`}
          style={{ position: 'relative', padding: '8px 0' }}
          onMouseEnter={() => setTech(true)}
          onMouseLeave={() => setTech(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setTech(!techOpen);
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: fs,
              fontWeight: fw,
              color: techOpen ? '#fff' : col,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color .2s',
              whiteSpace: 'nowrap',
            }}
          >
            {item.linkLabel ?? ''}{' '}
            <svg
              width="14"
              height="9"
              viewBox="0 0 10 6"
              fill="none"
              style={{
                opacity: 0.75,
                transform: techOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform .2s ease',
              }}
            >
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {techOpen && (
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
                id={`${v}-tech-mega-menu`}
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
                {megaMenu.map((m, i) => (
                  <SmartLink
                    key={m.key ?? i}
                    href={m.linkUrl ?? '#'}
                    onClick={() => setTech(false)}
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
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B0619', whiteSpace: 'nowrap', marginBottom: '3px' }}>{m.title ?? ''}</div>
                    <div style={{ fontSize: '12px', color: '#6B6480', lineHeight: 1.4 }}>{m.description ?? ''}</div>
                  </SmartLink>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (item.extra === OPENS_PRICING) {
      return (
        <button
          key={item.key ?? idx}
          onClick={onOpenPricing}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: fs,
            fontWeight: fw,
            color: col,
            transition: 'color .2s',
            whiteSpace: 'nowrap',
            padding: 0,
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = col)}
        >
          {item.linkLabel ?? ''}
        </button>
      );
    }

    return (
      <SmartLink key={item.key ?? idx} href={item.linkUrl ?? '#'} style={{ ...navLinkStyle, fontSize: fs, fontWeight: fw, color: col }}>
        {item.linkLabel ?? ''}
      </SmartLink>
    );
  };

  const renderMobileItem = (item: CmsRow, idx: number) => {
    if (item.extra === SOLUTIONS_MENU) {
      return <SolutionsMobileList key={item.key ?? idx} label={item.linkLabel ?? ''} items={solutions} onNavigate={() => setHeroMobileOpen(false)} />;
    }
    if (item.extra === MEGA_MENU) {
      return (
        <React.Fragment key={item.key ?? idx}>
          <div style={{ padding: '14px 0 8px', color: '#fff', fontSize: '16px', fontWeight: 500 }}>{item.linkLabel ?? ''}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0 12px 14px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            {megaMenu.map((m, i) => (
              <SmartLink key={m.key ?? i} href={m.linkUrl ?? '#'} style={{ padding: '9px 0', color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                {m.title ?? ''}
              </SmartLink>
            ))}
          </div>
        </React.Fragment>
      );
    }
    if (item.extra === OPENS_PRICING) {
      return (
        <button
          key={item.key ?? idx}
          onClick={() => {
            onOpenPricing();
            setHeroMobileOpen(false);
          }}
          style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: '14px 0', color: '#fff', fontSize: '16px', fontWeight: 500, fontFamily: 'inherit' }}
        >
          {item.linkLabel ?? ''}
        </button>
      );
    }
    return (
      <SmartLink key={item.key ?? idx} href={item.linkUrl ?? '#'} style={mobileLinkStyle}>
        {item.linkLabel ?? ''}
      </SmartLink>
    );
  };

  // Floating header: appears when scrolling back up after the hero has scrolled out of view (same behaviour as the home page).
  useEffect(() => {
    const nav = stickyRef.current;
    if (!nav) return;
    const heroSection = document.getElementById('hero-section');
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const pastHero = heroSection ? heroSection.getBoundingClientRect().bottom < 0 : y > 80;
      const scrollingUp = y < lastY;
      lastY = y;
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
        setStickyMobileOpen(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <div style={{ position: 'relative', zIndex: 30, padding: '0 clamp(20px,5%,80px)' }}>
      <nav style={{ height: '92px', maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px' }}>
        <SmartLink href={logoHref} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img id="hero-logo" src={logoSrc} alt={logo.imageAlt || 'Warevolt'} style={{ height: '110px', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </SmartLink>

        <div id="hero-nav-links" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
          {navItems.map((item, idx) => renderDesktopItem(item, idx, 'hero'))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '26px', flexShrink: 0, marginLeft: 'auto' }}>
          <button
            onClick={onOpenPricing}
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
          <SmartLink
            id="hero-cta"
            href={cta.linkUrl || '/contact'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#4D0DD9',
              color: '#fff',
              padding: '13px 28px',
              borderRadius: '12px',
              fontSize: '14.5px',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background .2s, transform .2s',
            }}
          >
            {cta.linkLabel || 'Speak to an expert'}
          </SmartLink>
        </div>

        <button
          onClick={() => setHeroMobileOpen(!heroMobileOpen)}
          id="hero-hamburger"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px' }}
        >
          <HamburgerIcon open={heroMobileOpen} />
        </button>

        {heroMobileOpen && (
          <div
            id="hero-mobile-panel" className="wv-menu-anim"
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
            {navItems.map(renderMobileItem)}
            <LoginMenuItem label={login.linkLabel ?? ''} onClick={() => { setHeroMobileOpen(false); onOpenPricing(); }} />
            {phone.linkLabel && (
              <a href={phone.linkUrl ?? '#'} style={{ marginTop: '8px', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, opacity: 0.8 }}>
                {phone.linkLabel}
              </a>
            )}
            <SmartLink
              href={cta.linkUrl || '/contact'}
              onClick={() => setHeroMobileOpen(false)}
              style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#4D0DD9',
                color: '#fff',
                padding: '13px 20px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {cta.linkLabel || 'Speak to an expert'}
            </SmartLink>
          </div>
        )}
      </nav>
    </div>

    <nav
      ref={stickyRef}
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
      <div style={{ maxWidth: '1440px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SmartLink href={logoHref} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img src={logoDark.image || '/assets/warevolt-logo-transparent.png'} alt={logoDark.imageAlt || 'Warevolt'} style={{ height: '120px', width: 'auto', objectFit: 'contain', display: 'block' }} />
        </SmartLink>

        <div id="sticky-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {navItems.map((item, idx) => renderDesktopItem(item, idx, 'sticky'))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '28px', flexShrink: 0 }}>
          <button
            id="sticky-login"
            onClick={onOpenPricing}
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
          <SmartLink
            id="sticky-cta"
            href={cta.linkUrl || '/contact'}
            style={{
              background: '#4D0DD9',
              color: '#fff',
              padding: '11px 24px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background .2s, transform .2s',
            }}
          >
            {cta.linkLabel || 'Speak to an expert'}{' '}
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path d="M1 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </SmartLink>
        </div>

        <button
          id="sticky-hamburger"
          aria-label="Toggle menu"
          onClick={() => setStickyMobileOpen(!stickyMobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', width: '40px', height: '40px', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px' }}
        >
          <HamburgerIcon open={stickyMobileOpen} />
        </button>
      </div>

      {stickyMobileOpen && (
        <div
          className="wv-menu-anim"
          onClick={() => setStickyMobileOpen(false)}
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
          {navItems.map(renderMobileItem)}
          <LoginMenuItem label={login.linkLabel ?? ''} onClick={() => { setStickyMobileOpen(false); onOpenPricing(); }} />
          {phone.linkLabel && (
            <a href={phone.linkUrl ?? '#'} style={{ marginTop: '8px', color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500, opacity: 0.8 }}>
              {phone.linkLabel}
            </a>
          )}
          <SmartLink
            href={cta.linkUrl || '/contact'}
            style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#4D0DD9',
              color: '#fff',
              padding: '13px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {cta.linkLabel || 'Speak to an expert'}
          </SmartLink>
        </div>
      )}
    </nav>
    </>
  );
}
