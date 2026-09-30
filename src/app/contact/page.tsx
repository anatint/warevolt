'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PricingModal, { PricingFormData } from '@/components/PricingModal';
import SiteHeaderNav from '@/components/SiteHeaderNav';
import SiteFooter from '@/components/SiteFooter';
import { usePageCms, type CmsRow } from '@/lib/cms';
import contactDefaults from '@/content/contact.json';
import { saveSubmission } from '@/lib/submissions';

export default function ContactPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // All wording on this page comes from the "Contact Page" collection in Wix (bundled copy shows first).
  const cms = usePageCms('contact', contactDefaults as CmsRow[]);
  const hero = cms.one('hero', 'hero');
  const strip = (key: string) => cms.one('strip', key);
  const intro = cms.one('intro', 'intro');
  const field = (key: string) => cms.one('form-fields', key);
  const submitText = cms.one('form', 'submit');
  const success = cms.one('form', 'success');
  const india = cms.one('india', 'main');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    service: '',
    volume: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      const htmlEl = el as HTMLElement;
      const delay = parseInt(htmlEl.dataset.delay || '0', 10);
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(24px)';
      htmlEl.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

      const rect = htmlEl.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (alreadyVisible) {
        setTimeout(() => {
          htmlEl.style.opacity = '1';
          htmlEl.style.transform = 'translateY(0)';
        }, delay + 50);
      } else {
        fadeObserver.observe(htmlEl);
      }
    });

    return () => {
      fadeObserver.disconnect();
    };
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formLoading) return;
    setFormLoading(true);
    setFormError('');
    try {
      // Saved as a new item in the "Form Submissions" Wix collection.
      await saveSubmission({
        formSource: 'Contact Page Form',
        fullName: formData.fullName,
        workEmail: formData.workEmail,
        phone: formData.phone,
        companyName: formData.companyName,
        serviceInterestedIn: formData.service,
        monthlyOrderVolume: formData.volume,
        message: formData.message,
      });
      setFormSubmitted(true);
    } catch (err) {
      console.error('Contact form submission failed', err);
      setFormError('Sorry, we could not send your enquiry. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handlePricingSubmit = (data: PricingFormData) => {
    console.log('Pricing lead received from Contact Page:', data);
  };

  const faqs = cms.list('faqs').map((row) => ({ q: row.title ?? '', a: row.description ?? '' }));

  const serviceIcons = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18"></path>
          <path d="M5 21V7l8-4v18"></path>
          <path d="M19 21V11l-6-3"></path>
          <path d="M9 9v.01"></path>
          <path d="M9 12v.01"></path>
          <path d="M9 15v.01"></path>
          <path d="M9 18v.01"></path>
        </svg>
      ),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: '#1C1030', background: '#fff', overflowX: 'hidden' }}>
      {/* ══ HERO SECTION ══ */}
      <section
        id="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0B0619 0%, #1c0b40 45%, #10062a 100%)',
          minHeight: '730px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* Ambient Glows */}
        <div style={{ position: 'absolute', top: '-120px', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(124,58,237,.32) 0%, transparent 65%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(77,13,217,.38) 0%, transparent 65%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', left: '40%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(167,139,250,.18) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        {/* Header Navigation */}
        <SiteHeaderNav onOpenPricing={() => setPricingOpen(true)} />

        {/* Hero Body */}
        <div id="hero-body" style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', padding: '36px clamp(20px,5%,80px) 70px' }}>
          <div id="hero-grid" style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: '48px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 800, color: '#A78BFA', letterSpacing: '.09em', textTransform: 'uppercase', marginBottom: '16px' }}>
                <span style={{ width: '18px', height: '2px', background: '#A78BFA', borderRadius: '2px' }}></span>
                {hero.label}
              </div>
              <h1 style={{ fontSize: 'clamp(36px,4.2vw,58px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.03em', color: '#fff', maxWidth: '640px', marginBottom: '22px' }}>
                {hero.title}{' '}
                <span style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {hero.extra}
                </span>
              </h1>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.84)', lineHeight: 1.7, maxWidth: '560px', margin: 0 }}>
                {hero.description}
              </p>
            </div>

            {/* Right Visual: 3D Isometric Connected Warehouse & Orbiting Nodes */}
            <div id="hero-visual-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '440px' }}>
              <div style={{ position: 'absolute', width: '90%', height: '90%', background: 'radial-gradient(circle, rgba(124,58,237,.4) 0%, transparent 65%)', filter: 'blur(32px)' }}></div>
              
              <svg id="hero-visual-svg" width="100%" height="420" viewBox="0 0 540 420" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="whGradRoof" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#4D0DD9" />
                  </linearGradient>
                  <linearGradient id="whGradFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B1287" />
                    <stop offset="100%" stopColor="#1E0747" />
                  </linearGradient>
                  <linearGradient id="whGradSide" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5B21B6" />
                    <stop offset="100%" stopColor="#310E68" />
                  </linearGradient>
                  <linearGradient id="dockGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4D0DD9" stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ground Platform & Orbital Ring */}
                <ellipse cx="270" cy="270" rx="230" ry="110" stroke="rgba(167,139,250,0.22)" strokeWidth="2" strokeDasharray="6 6" fill="none" />
                <ellipse cx="270" cy="270" rx="170" ry="80" stroke="rgba(124,58,237,0.35)" strokeWidth="1.5" fill="none" />

                {/* Connecting Laser Beams */}
                <path d="M120 120 Q 180 180 270 230" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4" />
                <path d="M420 130 Q 360 180 270 230" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4" />
                <path d="M90 280 Q 180 260 270 240" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4" />
                <path d="M450 280 Q 360 260 270 240" stroke="#7C3AED" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4 4" />

                {/* Central 3D Isometric Warehouse Building */}
                <g transform="translate(270, 220)">
                  {/* Base / Foundation Shadow */}
                  <polygon points="-110,35 0,90 110,35 0,-20" fill="rgba(15,5,35,0.7)" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.8))" />
                  
                  {/* Left Facet Wall */}
                  <polygon points="-90,20 0,65 0,0 -90,-45" fill="url(#whGradSide)" />
                  {/* Right Facet Wall */}
                  <polygon points="0,65 90,20 90,-45 0,0" fill="url(#whGradFront)" />
                  
                  {/* Roof Top */}
                  <polygon points="-90,-45 0,0 90,-45 0,-90" fill="url(#whGradRoof)" />
                  
                  {/* Dock / Entrance Bay */}
                  <polygon points="-55,30 -15,50 -15,15 -55,-5" fill="url(#dockGlow)" />
                  <polygon points="15,50 55,30 55,-5 15,15" fill="url(#dockGlow)" />

                  {/* Windows / Lighting Accents */}
                  <polygon points="-75,-25 -60,-17 -60,-32 -75,-40" fill="#DDD6FE" opacity="0.8" />
                  <polygon points="-45,-10 -30,-2 -30,-17 -45,-25" fill="#DDD6FE" opacity="0.8" />
                  <polygon points="30,-2 45,-10 45,-25 30,-17" fill="#DDD6FE" opacity="0.8" />
                  <polygon points="60,-17 75,-25 75,-40 60,-32" fill="#DDD6FE" opacity="0.8" />

                  {/* Stored Pallets inside dock */}
                  <rect x="-42" y="24" width="10" height="12" rx="2" fill="#C4B5FD" transform="skewY(26)" />
                  <rect x="24" y="32" width="10" height="12" rx="2" fill="#C4B5FD" transform="skewY(-26)" />
                </g>

                {/* Floating Node 1: Package / Cube (Top Left) */}
                <g transform="translate(100, 70)" filter="url(#nodeGlow)">
                  <circle cx="28" cy="28" r="28" fill="#1E0E45" stroke="#7C3AED" strokeWidth="2" />
                  <g transform="translate(16, 16)">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </g>

                {/* Floating Node 2: Delivery Truck (Top Right) */}
                <g transform="translate(400, 80)" filter="url(#nodeGlow)">
                  <circle cx="28" cy="28" r="28" fill="#1E0E45" stroke="#7C3AED" strokeWidth="2" />
                  <g transform="translate(16, 17)">
                    <rect x="1" y="2" width="13" height="9" rx="1" stroke="#A78BFA" strokeWidth="1.8" fill="none" />
                    <path d="M14 6h4l3 3v2h-7V6z" stroke="#A78BFA" strokeWidth="1.8" fill="none" />
                    <circle cx="5" cy="14" r="2" stroke="#A78BFA" strokeWidth="1.5" />
                    <circle cx="17" cy="14" r="2" stroke="#A78BFA" strokeWidth="1.5" />
                  </g>
                </g>

                {/* Floating Node 3: Clipboard / Checklist (Bottom Left) */}
                <g transform="translate(70, 240)" filter="url(#nodeGlow)">
                  <circle cx="26" cy="26" r="26" fill="#1E0E45" stroke="#7C3AED" strokeWidth="2" />
                  <g transform="translate(16, 15)">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="#A78BFA" strokeWidth="1.8" />
                    <rect x="8" y="2" width="8" height="4" rx="1" stroke="#A78BFA" strokeWidth="1.8" />
                    <line x1="9" y1="12" x2="15" y2="12" stroke="#A78BFA" strokeWidth="1.5" />
                    <line x1="9" y1="16" x2="13" y2="16" stroke="#A78BFA" strokeWidth="1.5" />
                  </g>
                </g>

                {/* Floating Node 4: Location Pin (Bottom Right) */}
                <g transform="translate(430, 250)" filter="url(#nodeGlow)">
                  <circle cx="26" cy="26" r="26" fill="#1E0E45" stroke="#7C3AED" strokeWidth="2" />
                  <g transform="translate(17, 15)">
                    <path d="M18 9c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#A78BFA" strokeWidth="1.8" />
                    <circle cx="9" cy="9" r="3" stroke="#A78BFA" strokeWidth="1.8" />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TOP CONTACT INFO STRIP & "TELL US WHAT YOU'RE BUILDING" ══ */}
      <section id="contact-form-section" style={{ background: '#F7F6FB', padding: '0 clamp(20px,5%,80px) 90px', position: 'relative' }}>
        {/* Floating Contact Info Strip overlapping the hero */}
        <div id="contact-strip-wrapper" style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 20, transform: 'translateY(-50%)', marginBottom: '-10px' }}>
          <div
            data-animate
            style={{
              background: '#fff',
              borderRadius: '20px',
              boxShadow: '0 16px 48px rgba(15,7,35,0.08), 0 2px 8px rgba(0,0,0,0.03)',
              border: '1px solid rgba(124,58,237,0.1)',
              padding: '24px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              alignItems: 'center',
            }}
            id="contact-strip-grid"
          >
            {/* Item 1: Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '12.5px', color: '#6B6480', fontWeight: 600, marginBottom: '2px' }}>{strip('phone').label}</div>
                <a href={strip('phone').linkUrl} style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619', textDecoration: 'none' }}>
                  {strip('phone').title}
                </a>
              </div>
            </div>

            {/* Item 2: Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '12.5px', color: '#6B6480', fontWeight: 600, marginBottom: '2px' }}>{strip('email').label}</div>
                <a href={strip('email').linkUrl} style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619', textDecoration: 'none' }}>
                  {strip('email').title}
                </a>
              </div>
            </div>

            {/* Item 3: Address */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '12.5px', color: '#6B6480', fontWeight: 600, marginBottom: '2px' }}>{strip('address').label}</div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B0619', lineHeight: 1.4 }}>
                  {strip('address').title}
                </div>
              </div>
            </div>

            {/* Item 4: Response Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '12.5px', color: '#6B6480', fontWeight: 600, marginBottom: '2px' }}>{strip('response').label}</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B0619' }}>
                  {strip('response').title}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1440px', margin: '0 auto', paddingTop: '36px' }}>
          <div id="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '64px', alignItems: 'start' }}>
            {/* Left Column: Heading & Value Prop */}
            <div data-animate>
              <div style={{ width: '42px', height: '3px', background: '#4D0DD9', marginBottom: '20px', borderRadius: '2px' }}></div>
              <h2 style={{ fontSize: 'clamp(32px,3.5vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: '#0B0619', marginBottom: '20px' }}>
                {intro.title}{' '}
                <span style={{ color: '#4D0DD9' }}>{intro.extra}</span>
              </h2>
              <p style={{ fontSize: '16px', color: '#524B66', lineHeight: 1.75, marginBottom: '32px' }}>
                {intro.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cms.list('intro-points').map((row) => row.title).map((text, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#4D0DD9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#2B2538' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div
              id="contact-form-card"
              data-animate
              data-delay="80"
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '36px clamp(24px,4vw,44px)',
                boxShadow: '0 20px 50px rgba(15,7,35,0.06), 0 1px 4px rgba(0,0,0,0.02)',
                border: '1px solid rgba(124,58,237,0.08)',
              }}
            >
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0B0619', marginBottom: '10px' }}>{success.title}</h3>
                  <p style={{ fontSize: '15.5px', color: '#6B6480', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px' }}>
                    {success.description}
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ fullName: '', workEmail: '', phone: '', companyName: '', service: '', volume: '', message: '' });
                    }}
                    style={{ background: '#4D0DD9', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 28px', fontSize: '14.5px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {success.linkLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  {/* Row 1: Full Name & Work Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} id="form-row-1">
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                        {field('fullName').label} <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder={field('fullName').description}
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2DEED',
                          fontSize: '14.5px',
                          color: '#0B0619',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color .2s, box-shadow .2s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#4D0DD9';
                          e.target.style.boxShadow = '0 0 0 3px rgba(77,13,217,0.12)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2DEED';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                        {field('workEmail').label} <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="workEmail"
                        required
                        value={formData.workEmail}
                        onChange={handleFormChange}
                        placeholder={field('workEmail').description}
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2DEED',
                          fontSize: '14.5px',
                          color: '#0B0619',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color .2s, box-shadow .2s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#4D0DD9';
                          e.target.style.boxShadow = '0 0 0 3px rgba(77,13,217,0.12)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2DEED';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Company Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} id="form-row-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                        {field('phone').label} <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder={field('phone').description}
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2DEED',
                          fontSize: '14.5px',
                          color: '#0B0619',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color .2s, box-shadow .2s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#4D0DD9';
                          e.target.style.boxShadow = '0 0 0 3px rgba(77,13,217,0.12)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2DEED';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                        {field('company').label} <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleFormChange}
                        placeholder={field('company').description}
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2DEED',
                          fontSize: '14.5px',
                          color: '#0B0619',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'border-color .2s, box-shadow .2s',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#4D0DD9';
                          e.target.style.boxShadow = '0 0 0 3px rgba(77,13,217,0.12)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2DEED';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Interested In & Monthly Volume */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} id="form-row-3">
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                        {field('service').label} <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleFormChange}
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2DEED',
                          fontSize: '14.5px',
                          color: formData.service ? '#0B0619' : '#8E889E',
                          outline: 'none',
                          background: '#fff',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">{field('service').description}</option>
                        {cms.list('service-options').map((o) => (
                          <option key={o.key} value={o.title}>{o.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                        {field('volume').label} <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <select
                        name="volume"
                        required
                        value={formData.volume}
                        onChange={handleFormChange}
                        style={{
                          width: '100%',
                          padding: '13px 16px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2DEED',
                          fontSize: '14.5px',
                          color: formData.volume ? '#0B0619' : '#8E889E',
                          outline: 'none',
                          background: '#fff',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">{field('volume').description}</option>
                        {cms.list('volume-options').map((o, i) => (
                          <option key={o.key} value={['< 1,000 orders/month', '1,000 - 5,000 orders/month', '5,000 - 20,000 orders/month', '20,000+ orders/month'][i] ?? o.title}>{o.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div style={{ marginBottom: '26px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2B2538', marginBottom: '8px' }}>
                      {field('message').label} <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder={field('message').description}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid #E2DEED',
                        fontSize: '14.5px',
                        color: '#0B0619',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#4D0DD9';
                        e.target.style.boxShadow = '0 0 0 3px rgba(77,13,217,0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E2DEED';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {formError && (
                    <p role="alert" style={{ margin: '0 0 12px', fontSize: '13px', color: '#DC2626' }}>
                      {formError}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formLoading}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      background: '#4D0DD9',
                      color: '#fff',
                      padding: '16px 28px',
                      borderRadius: '12px',
                      fontSize: '15.5px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: formLoading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 8px 24px rgba(77,13,217,.35)',
                      transition: 'background .2s, transform .2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!formLoading) e.currentTarget.style.background = '#3B08AB';
                    }}
                    onMouseLeave={(e) => {
                      if (!formLoading) e.currentTarget.style.background = '#4D0DD9';
                    }}
                  >
                    {formLoading ? submitText.title : submitText.label}
                    {!formLoading && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    )}
                  </button>

                  {/* Privacy note */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '12.5px', color: '#7E7694' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    {submitText.description}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ "HOW CAN WE HELP?" SERVICE CARDS ══ */}
      <section id="services-section" style={{ padding: '80px clamp(20px,5%,80px)', background: '#fff' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>
          {/* Section Header with Accent Lines */}
          <div data-animate style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '44px' }}>
            <span style={{ width: '40px', height: '2px', background: '#7C3AED', borderRadius: '2px' }}></span>
            <h2 style={{ fontSize: 'clamp(28px,3vw,38px)', fontWeight: 800, color: '#0B0619', letterSpacing: '-.02em', margin: 0 }}>
              {cms.one('services-heading', 'heading').title}
            </h2>
            <span style={{ width: '40px', height: '2px', background: '#7C3AED', borderRadius: '2px' }}></span>
          </div>

          {/* 4 Cards Grid */}
          <div
            id="how-we-help-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            {cms.list('services').map((row, idx) => ({ title: row.title, desc: row.description, href: row.linkUrl || '#', icon: serviceIcons[idx]?.icon })).map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                data-animate
                data-delay={idx * 60}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#F9F8FD',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  textDecoration: 'none',
                  border: '1.5px solid #EFEBFF',
                  position: 'relative',
                  transition: 'transform .2s, box-shadow .2s, border-color .2s, background .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(77,13,217,0.12)';
                  e.currentTarget.style.borderColor = '#C4B5FD';
                  e.currentTarget.style.background = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#EFEBFF';
                  e.currentTarget.style.background = '#F9F8FD';
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B0619', lineHeight: 1.35, marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B6480', lineHeight: 1.65, marginBottom: '24px', flex: 1 }}>
                  {item.desc}
                </p>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6D28D9', marginLeft: 'auto' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ "WAREVOLT ACROSS INDIA" NETWORK BANNER ══ */}
      <section id="india-section" style={{ padding: '0 clamp(20px,5%,80px) 80px', background: '#fff' }}>
        <div
          id="india-network-card"
          data-animate
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            borderRadius: '28px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0B0619 0%, #1e0b48 50%, #0d0624 100%)',
            padding: '60px clamp(24px,5%,64px)',
            boxShadow: '0 30px 70px rgba(10,5,25,.4)',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

          <div id="india-network-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '36px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            {/* Left Column */}
            <div>
              <div style={{ width: '36px', height: '3px', background: '#A78BFA', marginBottom: '18px', borderRadius: '2px' }}></div>
              <h2 style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 800, color: '#fff', letterSpacing: '-.03em', lineHeight: 1.18, marginBottom: '14px' }}>
                {india.title}
              </h2>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#C4B5FD', marginBottom: '12px' }}>
                {india.label}
              </div>
              <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,.75)', lineHeight: 1.7, margin: 0 }}>
                {india.description}
              </p>
            </div>

            {/* Center: Glowing India Map with Connected Hubs */}
            <div id="india-network-map-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="280" viewBox="0 0 340 320" fill="none" style={{ maxWidth: '320px', overflow: 'visible' }}>
                <defs>
                  <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Stylized Futuristic India Map Outline */}
                <path
                  d="M170 30 L200 45 L220 70 L250 85 L260 110 L240 135 L280 145 L300 170 L280 190 L240 180 L230 205 L210 230 L180 280 L160 300 L145 280 L130 240 L110 210 L95 190 L85 160 L95 130 L120 120 L135 90 L145 55 Z"
                  fill="rgba(124,58,237,0.18)"
                  stroke="#7C3AED"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* Network Interconnection Lines */}
                <path d="M140 100 L115 170 L160 250 L220 220 L240 150 L140 100" stroke="#A78BFA" strokeWidth="1.5" strokeOpacity="0.8" />
                <path d="M115 170 L220 220" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 3" />
                <path d="M140 100 L160 250" stroke="#A78BFA" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="3 3" />
                <path d="M160 250 L150 285" stroke="#A78BFA" strokeWidth="1.5" />

                {/* Hub Node: Delhi NCR */}
                <circle cx="140" cy="100" r="5" fill="#fff" filter="url(#mapGlow)" />
                <circle cx="140" cy="100" r="10" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.8" />
                <text x="148" y="98" fill="#DDD6FE" fontSize="9" fontWeight="700">Delhi NCR</text>

                {/* Hub Node: Mumbai */}
                <circle cx="115" cy="170" r="6" fill="#fff" filter="url(#mapGlow)" />
                <circle cx="115" cy="170" r="12" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.8" />
                <text x="65" y="174" fill="#DDD6FE" fontSize="9" fontWeight="700">Mumbai</text>

                {/* Hub Node: Kolkata */}
                <circle cx="240" cy="150" r="5" fill="#fff" filter="url(#mapGlow)" />
                <text x="248" y="153" fill="#DDD6FE" fontSize="9" fontWeight="700">Kolkata</text>

                {/* Hub Node: Bengaluru / Hyderabad */}
                <circle cx="160" cy="230" r="5.5" fill="#fff" filter="url(#mapGlow)" />
                <circle cx="160" cy="230" r="11" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.8" />
                <text x="170" y="233" fill="#DDD6FE" fontSize="9" fontWeight="700">Bengaluru</text>

                {/* Hub Node: Chennai */}
                <circle cx="190" cy="255" r="4.5" fill="#fff" filter="url(#mapGlow)" />
                <text x="198" y="258" fill="#DDD6FE" fontSize="9" fontWeight="700">Chennai</text>

                {/* Hub Node: Kochi */}
                <circle cx="150" cy="285" r="5" fill="#fff" filter="url(#mapGlow)" />
                <text x="115" y="295" fill="#DDD6FE" fontSize="9" fontWeight="700">Kochi (HQ)</text>
              </svg>
            </div>

            {/* Right Column: 4 Feature Pills */}
            <div id="india-network-pills" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                  ),
                },
              ].map((item, idx) => ({ ...item, title: cms.list('india-points')[idx]?.title })).filter((item) => item.title).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '14px',
                    padding: '12px 18px',
                    color: '#fff',
                    fontSize: '13.5px',
                    fontWeight: 600,
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#6D28D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ "FREQUENTLY ASKED QUESTIONS" ══ */}
      <section id="faq-section" style={{ padding: '40px clamp(20px,5%,80px) 90px', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          {/* Section Header with Accent Lines */}
          <div data-animate style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '44px' }}>
            <span style={{ width: '40px', height: '2px', background: '#7C3AED', borderRadius: '2px' }}></span>
            <h2 style={{ fontSize: 'clamp(28px,3vw,38px)', fontWeight: 800, color: '#0B0619', letterSpacing: '-.02em', margin: 0 }}>
              {cms.one('faq-heading', 'heading').title}
            </h2>
            <span style={{ width: '40px', height: '2px', background: '#7C3AED', borderRadius: '2px' }}></span>
          </div>

          {/* 4 FAQ Accordion Cards in 2x2 Grid */}
          <div
            id="faq-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              textAlign: 'left',
            }}
          >
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  data-animate
                  data-delay={idx * 50}
                  style={{
                    background: '#F9F8FD',
                    border: `1.5px solid ${isOpen ? '#7C3AED' : '#EFEBFF'}`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'border-color .2s, box-shadow .2s',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B0619', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isOpen ? '#7C3AED' : '#EDE9FE',
                        color: isOpen ? '#fff' : '#6D28D9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform .25s ease, background .2s',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 22px', fontSize: '14.5px', color: '#5A546D', lineHeight: 1.7, borderTop: '1px solid #EFEBFF', paddingTop: '14px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══ FOOTER ══ */}
      <SiteFooter />

      {/* ══ PRICING / EXPERT MODAL ══ */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onSubmit={handlePricingSubmit}
      />

      {/* Responsive Inline Media Queries */}
      <style>{`
        /* ── 1280px and below (Small laptops & screens) ── */
        @media (max-width: 1280px) {
          #hero-grid {
            gap: 36px !important;
          }
          #contact-main-grid {
            gap: 48px !important;
          }
          #india-network-grid {
            gap: 28px !important;
          }
        }

        /* ── 1024px and below (Tablets landscape) ── */
        @media (max-width: 1024px) {
          #contact-strip-wrapper {
            transform: translateY(-36px) !important;
            margin-bottom: 8px !important;
          }
          #contact-strip-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px 24px !important;
            padding: 22px 24px !important;
          }
          #how-we-help-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          #india-network-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 32px !important;
          }
          #india-network-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #india-network-grid > div:first-child p {
            max-width: 520px;
          }
          #india-network-pills {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            text-align: left !important;
          }
        }

        /* ── 840px and below (Tablets portrait & large phones) ── */
        @media (max-width: 840px) {
          #hero-section {
            min-height: auto !important;
          }
          #hero-body {
            padding: 24px clamp(16px, 4%, 32px) 56px !important;
          }
          #hero-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            text-align: center;
          }
          #hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #hero-visual-wrap {
            min-height: 320px !important;
            width: 100% !important;
          }
          #hero-visual-svg {
            height: 320px !important;
            max-width: 440px !important;
          }
          #contact-strip-wrapper {
            transform: translateY(-28px) !important;
            margin-bottom: 12px !important;
          }
          #contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          #contact-form-section {
            padding-bottom: 60px !important;
          }
          #services-section {
            padding: 60px clamp(16px, 4%, 32px) !important;
          }
          #india-section {
            padding: 0 clamp(16px, 4%, 32px) 60px !important;
          }
          #faq-section {
            padding: 30px clamp(16px, 4%, 32px) 70px !important;
          }
          #faq-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }

        /* ── 640px and below (Standard mobile) ── */
        @media (max-width: 640px) {
          #contact-strip-wrapper {
            transform: translateY(-22px) !important;
            margin-bottom: 16px !important;
          }
          #contact-strip-grid {
            grid-template-columns: 1fr !important;
            padding: 18px 18px !important;
            gap: 16px !important;
            border-radius: 16px !important;
          }
          #form-row-1, #form-row-2, #form-row-3 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          #contact-form-card {
            padding: 24px 18px !important;
            border-radius: 18px !important;
          }
          #contact-form-card input,
          #contact-form-card select,
          #contact-form-card textarea {
            font-size: 16px !important;
            padding: 12px 14px !important;
          }
          #how-we-help-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          #india-network-card {
            padding: 36px 18px !important;
            border-radius: 20px !important;
          }
          #india-network-pills {
            grid-template-columns: 1fr !important;
          }
          #hero-visual-wrap {
            min-height: 250px !important;
          }
          #hero-visual-svg {
            height: 250px !important;
          }
          #faq-grid button {
            padding: 16px 18px !important;
          }
          #faq-grid > div > div:last-child {
            padding: 0 18px 16px !important;
          }
        }

        /* ── 420px and below (Compact mobile) ── */
        @media (max-width: 420px) {
          #hero-body h1 {
            font-size: 32px !important;
          }
          #hero-visual-wrap {
            min-height: 210px !important;
          }
          #hero-visual-svg {
            height: 210px !important;
          }
          #contact-form-card {
            padding: 20px 14px !important;
          }
          #contact-strip-grid {
            padding: 16px 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
