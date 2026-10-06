'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { CmsContent } from '@/lib/cms';

export type SolutionsItem = { key: string; title: string; description: string; href: string };

/** Items of the Solutions dropdown, edited in the Wix "Header (All Pages)" collection. An item without a link is shown but not clickable. */
export function solutionsItems(header: CmsContent): SolutionsItem[] {
  return header.list('solutions-menu').map((r, i) => ({
    key: r.key ?? String(i),
    title: r.title ?? '',
    description: r.description ?? '',
    href: r.linkUrl ?? '',
  }));
}

type LabelStyle = {
  fontSize: string;
  fontWeight: number;
  color: string;
  openColor?: string;
  transition?: string;
};

/**
 * Desktop "Solutions" dropdown. Same look and behaviour as the Technology dropdown:
 * opens on hover (or click), white rounded card, items highlight with a purple left bar and a small nudge.
 */
export function SolutionsDropdown({
  label,
  items,
  labelStyle,
  wrapId,
  menuId,
}: {
  label: string;
  items: SolutionsItem[];
  labelStyle: LabelStyle;
  wrapId?: string;
  menuId?: string;
}) {
  const [open, setOpen] = useState(false);

  const itemStyle: React.CSSProperties = {
    display: 'block',
    textDecoration: 'none',
    padding: '10px 14px',
    borderRadius: '8px',
    borderLeft: '3px solid transparent',
    transition: 'background .2s, border-color .2s, transform .2s',
  };
  const hoverOn = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = '#F5F3FC';
    e.currentTarget.style.borderLeftColor = '#4D0DD9';
    e.currentTarget.style.transform = 'translateX(4px)';
  };
  const hoverOff = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.borderLeftColor = 'transparent';
    e.currentTarget.style.transform = 'none';
  };

  const content = (item: SolutionsItem) => (
    <>
      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B0619', whiteSpace: 'nowrap', marginBottom: item.description ? '3px' : 0 }}>{item.title}</div>
      {item.description && <div style={{ fontSize: '12px', color: '#6B6480', lineHeight: 1.4 }}>{item.description}</div>}
    </>
  );

  return (
    <div id={wrapId} style={{ position: 'relative', padding: '8px 0' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: labelStyle.fontSize,
          fontWeight: labelStyle.fontWeight,
          color: open ? labelStyle.openColor ?? '#fff' : labelStyle.color,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: labelStyle.transition ?? 'color .2s',
          whiteSpace: 'nowrap',
        }}
      >
        {label}{' '}
        <svg
          width="14"
          height="9"
          viewBox="0 0 10 6"
          fill="none"
          style={{ opacity: 0.75, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: '8px', zIndex: 200 }}>
          <div
            id={menuId}
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
            {items.map((item) =>
              item.href ? (
                item.href.startsWith('/') ? (
                  <Link key={item.key} href={item.href} onClick={() => setOpen(false)} style={itemStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    {content(item)}
                  </Link>
                ) : (
                  <a key={item.key} href={item.href} onClick={() => setOpen(false)} style={itemStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                    {content(item)}
                  </a>
                )
              ) : (
                // No link yet (e.g. "Shipping & Distribution"): shown, but not clickable.
                <div key={item.key} style={{ ...itemStyle, cursor: 'default' }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  {content(item)}
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Mobile version: the label followed by its items, indented underneath (same pattern as the Technology list on mobile).
 * `borderColor` / `onNavigate` let each page keep its own panel styling and close the panel after a tap.
 */
export function SolutionsMobileList({
  label,
  items,
  borderColor = 'rgba(255,255,255,.08)',
  onNavigate,
}: {
  label: string;
  items: SolutionsItem[];
  borderColor?: string;
  onNavigate?: () => void;
}) {
  const linkStyle: React.CSSProperties = { padding: '9px 0', color: 'rgba(255,255,255,.72)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 };
  return (
    <>
      <div style={{ padding: '14px 0 8px', color: '#fff', fontSize: '16px', fontWeight: 500 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 0 12px 14px', borderBottom: `1px solid ${borderColor}` }}>
        {items.map((item) =>
          item.href ? (
            item.href.startsWith('/') ? (
              <Link key={item.key} href={item.href} onClick={onNavigate} style={linkStyle}>
                {item.title}
              </Link>
            ) : (
              <a key={item.key} href={item.href} onClick={onNavigate} style={linkStyle}>
                {item.title}
              </a>
            )
          ) : (
            <span key={item.key} style={{ ...linkStyle, cursor: 'default' }}>
              {item.title}
            </span>
          ),
        )}
      </div>
    </>
  );
}
