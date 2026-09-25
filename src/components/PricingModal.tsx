'use client';

import React, { useState } from 'react';

export interface PricingFormData {
  name: string;
  email: string;
  phone: string;
  orders: string;
  count: string;
  company: string;
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: PricingFormData) => void;
  onSubmit?: (data: PricingFormData) => void;
}

export default function PricingModal({ isOpen, onClose, onSubmitSuccess, onSubmit }: PricingModalProps) {
  const [pricingSubmitted, setPricingSubmitted] = useState<boolean>(false);
  const [pricingForm, setPricingForm] = useState<PricingFormData>({
    name: '',
    email: '',
    phone: '',
    orders: '',
    count: '',
    company: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPricingSubmitted(true);
    if (onSubmitSuccess) {
      onSubmitSuccess(pricingForm);
    }
    if (onSubmit) {
      onSubmit(pricingForm);
    }
  };

  const handleFieldChange = (field: keyof PricingFormData, value: string) => {
    setPricingForm((prev) => ({ ...prev, [field]: value }));
  };

  const getInputStyle = (fieldName: string): React.CSSProperties => {
    const isFocused = focusedField === fieldName;
    return {
      width: '100%',
      background: isFocused ? '#fff' : '#F8F6FD',
      border: isFocused ? '1.5px solid #4D0DD9' : '1.5px solid #EBE5FA',
      boxShadow: isFocused ? '0 0 0 3px rgba(77,13,217,.12)' : 'none',
      borderRadius: '12px',
      padding: '13px 14px',
      color: '#1C1030',
      fontSize: '14.5px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color .2s, box-shadow .2s, background .2s',
      boxSizing: 'border-box',
    };
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(20,10,40,.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'pricingFadeIn .2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        id="pricing-modal-card"
        style={{
          background: '#fff',
          borderRadius: '24px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(20,10,40,.4)',
          animation: 'pricingFadeUp .25s ease',
          fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
          boxSizing: 'border-box',
        }}
      >
        {/* Header Gradient */}
        <div
          style={{
            background: 'linear-gradient(135deg,#4D0DD9,#7B5BFB)',
            padding: '26px 32px 48px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Circles */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-30px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.08)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-70px',
              right: '60px',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.06)',
              pointerEvents: 'none',
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,.18)',
              color: '#fff',
              fontSize: '16px',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background .2s',
              zIndex: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
          >
            &#10005;
          </button>

          {/* Warevolt Logo */}
          <img
            src="/assets/warevolt-logo-white.png"
            alt="Warevolt"
            style={{
              height: '112px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              marginLeft: '-8px',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>

        {/* Modal Body Container */}
        <div style={{ padding: '0 32px 32px', marginTop: '-48px', position: 'relative' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 12px 30px rgba(20,10,40,.1)',
              padding: '28px 24px',
            }}
          >
            {pricingSubmitted ? (
              /* Success State */
              <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#EEE8FD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12l6 6L20 6"
                      stroke="#4D0DD9"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1C1030',
                    marginBottom: '8px',
                  }}
                >
                  Thanks &mdash; we&apos;ll be in touch
                </h3>
                <p style={{ fontSize: '14.5px', color: '#6B6480', lineHeight: 1.6 }}>
                  Our team will reach out with pricing details shortly.
                </p>
              </div>
            ) : (
              /* Form State */
              <div>
                {/* Badge */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#EEE8FD',
                    color: '#4D0DD9',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '.4px',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    marginBottom: '14px',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
                      stroke="#4D0DD9"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle cx="7" cy="7" r="1.4" fill="#4D0DD9" />
                  </svg>
                  Custom pricing
                </span>

                {/* Heading */}
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#1C1030',
                    marginBottom: '6px',
                    letterSpacing: '-.4px',
                  }}
                >
                  Get <span style={{ color: '#4D0DD9' }}>pricing</span>
                </h3>
                <p
                  style={{
                    fontSize: '14.5px',
                    color: '#6B6480',
                    marginBottom: '22px',
                    lineHeight: 1.55,
                  }}
                >
                  Share a few details and our team will send tailored pricing for your fulfillment volume.
                </p>

                {/* Form Fields */}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  {/* Full name */}
                  <div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1C1030',
                        marginBottom: '6px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                          stroke="#4D0DD9"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="7" r="4" stroke="#4D0DD9" strokeWidth="2" />
                      </svg>
                      Full name<span style={{ color: '#4D0DD9' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={pricingForm.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your full name"
                      style={getInputStyle('name')}
                    />
                  </div>

                  {/* Work email address */}
                  <div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1C1030',
                        marginBottom: '6px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4D0DD9" strokeWidth="2" />
                        <path
                          d="M4 6l8 7 8-7"
                          stroke="#4D0DD9"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Work email address<span style={{ color: '#4D0DD9' }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={pricingForm.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@company.com"
                      style={getInputStyle('email')}
                    />
                  </div>

                  {/* Phone number */}
                  <div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1C1030',
                        marginBottom: '6px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z"
                          stroke="#4D0DD9"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Phone number<span style={{ color: '#4D0DD9' }}>*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={pricingForm.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+91 98765 43210"
                      style={getInputStyle('phone')}
                    />
                  </div>

                  {/* Orders */}
                  <div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1C1030',
                        marginBottom: '6px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                          stroke="#4D0DD9"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.27 6.96L12 12l8.73-5.04M12 22.08V12"
                          stroke="#4D0DD9"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Orders
                    </label>
                    <input
                      type="text"
                      value={pricingForm.orders}
                      onChange={(e) => handleFieldChange('orders', e.target.value)}
                      onFocus={() => setFocusedField('orders')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Amazon, Flipkart"
                      style={getInputStyle('orders')}
                    />
                  </div>

                  {/* Count */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1C1030',
                        marginBottom: '6px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <line x1="4" y1="9" x2="20" y2="9" stroke="#4D0DD9" strokeWidth="2" />
                        <line x1="4" y1="15" x2="20" y2="15" stroke="#4D0DD9" strokeWidth="2" />
                        <line x1="10" y1="3" x2="8" y2="21" stroke="#4D0DD9" strokeWidth="2" />
                        <line x1="16" y1="3" x2="14" y2="21" stroke="#4D0DD9" strokeWidth="2" />
                      </svg>
                      Count<span style={{ color: '#4D0DD9' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={pricingForm.count}
                      onChange={(e) => handleFieldChange('count', e.target.value)}
                      onFocus={() => setFocusedField('count')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. 5,000 / month"
                      style={getInputStyle('count')}
                    />
                  </div>

                  {/* Company name */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: '#1C1030',
                        marginBottom: '6px',
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="7" width="18" height="14" rx="2" stroke="#4D0DD9" strokeWidth="2" />
                        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#4D0DD9" strokeWidth="2" />
                      </svg>
                      Company name<span style={{ color: '#4D0DD9' }}>*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={pricingForm.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your company"
                      style={getInputStyle('company')}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    style={{
                      gridColumn: '1 / -1',
                      marginTop: '6px',
                      background: 'linear-gradient(135deg,#4D0DD9,#7B5BFB)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '15px 24px',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'opacity .2s, transform .15s',
                      fontFamily: 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 2L11 13"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2l-7 20-4-9-9-4 20-7z"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Submit request
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>

                {/* Privacy disclaimer */}
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    color: '#9B94AC',
                    marginTop: '16px',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#9B94AC" strokeWidth="1.8" />
                    <path d="M8 11V7a4 4 0 018 0v4" stroke="#9B94AC" strokeWidth="1.8" />
                  </svg>
                  Your information is secure and will only be used to provide you with a quote.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
