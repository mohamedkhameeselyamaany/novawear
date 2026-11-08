'use client';

import React from 'react';
import Link from 'next/link';
import { CurrencyCode, CURRENCY_CONFIGS } from '@/context/CurrencyContext';
import { FiGlobe, FiSun, FiMoon } from 'react-icons/fi';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavDrawerProps {
  navLinks: NavLink[];
  pathname: string;
  isDark: boolean;
  isRTL: boolean;
  currency: CurrencyCode;
  currencies: CurrencyCode[];
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onSelectCurrency: (code: CurrencyCode) => void;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  navLinks,
  pathname,
  isDark,
  isRTL,
  currency,
  currencies,
  onToggleTheme,
  onToggleLanguage,
  onSelectCurrency,
  onClose,
}) => {
  return (
    <div className="mobile-drawer glass-panel animate-fade-in">
      <div className="mobile-drawer-inner">
        <div className="mobile-nav-list">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mobile-drawer-footer">
          <div className="mobile-actions-row">
            <button
              type="button"
              className="mobile-action-pill"
              onClick={onToggleLanguage}
              aria-label={isRTL ? 'Switch to English' : 'التحويل للعربية'}
            >
              <FiGlobe /> {isRTL ? 'English' : 'العربية'}
            </button>
            <button
              type="button"
              className="mobile-action-pill"
              onClick={onToggleTheme}
              aria-label={isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
            >
              {isDark ? <FiSun /> : <FiMoon />} {isDark ? (isRTL ? 'فاتح' : 'Light') : (isRTL ? 'داكن' : 'Dark')}
            </button>
          </div>

          <div className="mobile-currency-row">
            <span className="mobile-label">{isRTL ? 'العملة:' : 'Currency:'}</span>
            <div className="mobile-currency-buttons">
              {currencies.map((curr) => {
                const conf = CURRENCY_CONFIGS[curr];
                return (
                  <button
                    key={curr}
                    type="button"
                    className={`curr-btn ${curr === currency ? 'active' : ''}`}
                    onClick={() => onSelectCurrency(curr)}
                  >
                    {isRTL ? conf?.symbolAr || curr : curr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavDrawer;
