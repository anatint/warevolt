'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { CmsContent, CmsRow } from '@/lib/cms';
import { solutionsItems } from '@/components/SolutionsMenu';

/** Clean outline user/account icon (used for Login on mobile/tablet). */
export function UserIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 20c.9-3.6 3.9-5.5 7.5-5.5s6.6 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Content of the header "Login" button: the word on desktop, a user icon on mobile/tablet
 * (the word stays in the DOM, visually hidden, so the button keeps its accessible name).
 */
export function LoginLabel({ text }: { text: string }) {
  return (
    <>
      <span className="wv-login-text">{text}</span>
      <UserIcon className="wv-login-icon" size={24} />
    </>
  );
}

/** "Login" entry inside the mobile menu, with its user icon. */
export function LoginMenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="wv-login-menu-item" onClick={onClick}>
      <span className="wv-login-menu-ic">
        <UserIcon size={18} />
      </span>
      <span>{label}</span>
    </button>
  );
}

/** Grey "Menu ≡" pill that turns into "Close ×" while the menu is open. */
export function HamburgerIcon({ open }: { open: boolean }) {
  const line: React.CSSProperties = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transition: 'transform .25s ease, opacity .2s ease',
  };
  return (
    <span className="wv-menu-pill">
      <span>{open ? 'Close' : 'Menu'}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6" style={{ ...line, transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
        <line x1="3" y1="12" x2="21" y2="12" style={{ ...line, opacity: open ? 0 : 1 }} />
        <line x1="3" y1="18" x2="21" y2="18" style={{ ...line, transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
      </svg>
    </span>
  );
}

type Sub = { key: string; title: string; href: string };

function NavLink({ href, className, style, onClick, children }: { href: string; className?: string; style?: React.CSSProperties; onClick?: () => void; children: React.ReactNode }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} style={style} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} style={style} onClick={onClick}>
      {children}
    </a>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className="wv-mnav-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Accordion({ label, subs, open, onToggle, onNavigate }: { label: string; subs: Sub[]; open: boolean; onToggle: () => void; onNavigate: () => void }) {
  return (
    <div>
      <button type="button" className="wv-mnav-row" aria-expanded={open} onClick={onToggle}>
        <span>{label}</span>
        <Chevron open={open} />
      </button>
      <div className="wv-mnav-body" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="wv-mnav-sub-list">
            {subs.map((sub) =>
              sub.href ? (
                <NavLink key={sub.key} href={sub.href} className="wv-mnav-sub" onClick={onNavigate}>
                  {sub.title}
                </NavLink>
              ) : (
                <span key={sub.key} className="wv-mnav-sub" style={{ cursor: 'default' }}>
                  {sub.title}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The mobile / tablet menu. It is built from the SAME header data as the desktop navbar
 * (Wix "Header (All Pages)" collection), so a change to the desktop menu shows up here automatically:
 * Solutions and Technology become accordions with their existing sub-items, the rest are plain links.
 * Order: nav items, the "Speak to an expert" button, then Login.
 */
export function MobileNavMenu({
  header,
  items,
  onOpenPricing,
  onNavigate,
}: {
  header: CmsContent;
  items?: CmsRow[];
  onOpenPricing: () => void;
  onNavigate: () => void;
}) {
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpenKeys((o) => ({ ...o, [k]: !o[k] }));
  const navItems = items ?? header.list('nav');
  const solutions = solutionsItems(header);
  const mega = header.list('mega-menu');
  const login = header.one('actions', 'login');
  const cta = header.one('actions', 'cta');

  return (
    <>
      {navItems.map((item, idx) => {
        const key = item.key ?? String(idx);
        if (item.extra === 'solutions-menu') {
          return (
            <Accordion
              key={key}
              label={item.linkLabel ?? ''}
              subs={solutions.map((s) => ({ key: s.key, title: s.title, href: s.href }))}
              open={!!openKeys[key]}
              onToggle={() => toggle(key)}
              onNavigate={onNavigate}
            />
          );
        }
        if (item.extra === 'mega-menu') {
          return (
            <Accordion
              key={key}
              label={item.linkLabel ?? ''}
              subs={mega.map((m, i) => ({ key: m.key ?? String(i), title: m.title ?? '', href: m.linkUrl ?? '' }))}
              open={!!openKeys[key]}
              onToggle={() => toggle(key)}
              onNavigate={onNavigate}
            />
          );
        }
        if (item.extra === 'opens-pricing-modal') {
          return (
            <button
              key={key}
              type="button"
              className="wv-mnav-row"
              onClick={() => {
                onNavigate();
                onOpenPricing();
              }}
            >
              <span>{item.linkLabel ?? ''}</span>
            </button>
          );
        }
        return (
          <NavLink key={key} href={item.linkUrl ?? '#'} className="wv-mnav-row" style={item.extra === 'current-page' ? { fontWeight: 700 } : undefined} onClick={onNavigate}>
            <span>{item.linkLabel ?? ''}</span>
          </NavLink>
        );
      })}
      <NavLink href={cta.linkUrl || '/contact'} className="wv-mnav-cta" onClick={onNavigate}>
        {cta.linkLabel || 'Speak to an expert'}
      </NavLink>
      <LoginMenuItem
        label={login.linkLabel ?? ''}
        onClick={() => {
          onNavigate();
          onOpenPricing();
        }}
      />
    </>
  );
}
