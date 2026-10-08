'use client';

import React from 'react';

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

/** Hamburger that morphs into an X while the menu is open. */
export function HamburgerIcon({ open }: { open: boolean }) {
  const line: React.CSSProperties = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transition: 'transform .25s ease, opacity .2s ease',
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" style={{ ...line, transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
      <line x1="3" y1="12" x2="21" y2="12" style={{ ...line, opacity: open ? 0 : 1 }} />
      <line x1="3" y1="18" x2="21" y2="18" style={{ ...line, transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
    </svg>
  );
}
