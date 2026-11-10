'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/common/Logo/Logo';
import { useCart, useWishlist, useCurrency, useLanguage, useTheme } from '@/hooks';
import type { CurrencyCode } from '@/context/CurrencyContext';
import AnnouncementBar from './AnnouncementBar';
import MobileNavDrawer from './MobileNavDrawer';
import {
  FiSearch,
  FiShoppingBag,
  FiHeart,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
  FiGlobe,
} from 'react-icons/fi';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const { toggleLanguage, t, isRTL } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
  }, [pathname]);

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const navLinks = [
    { href: '/', label: t('navigation.home', 'الرئيسية') },
    { href: '/men', label: t('navigation.men', 'أزياء الرجال') },
    { href: '/women', label: t('navigation.women', 'أزياء النساء') },
    { href: '/children', label: t('navigation.children', 'أزياء الأطفال') },
    { href: '/accessories', label: t('navigation.accessories', 'الإكسسوارات الفاخرة') },
  ];

  const isLinkActive = (targetHref: string) => {
    if (!pathname) return targetHref === '/';
    let current = pathname;
    if (current.startsWith('/novawear')) {
      current = current.slice('/novawear'.length) || '/';
    }
    current = current.replace(/\/$/, '') || '/';
    const target = targetHref.replace(/\/$/, '') || '/';

    if (target === '/') {
      return current === '/';
    }
    return current === target || current.startsWith(`${target}/`);
  };

  const currencies: CurrencyCode[] = ['EGP', 'USD', 'EUR', 'SAR', 'AED'];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Luxury Announcement Bar Component */}
      <AnnouncementBar />

      <nav className="navbar-container" aria-label="Main Navigation">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <Logo size="sm" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="navbar-links desktop-only">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-gold-underline" />
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Currency Switcher */}
          <div className="currency-selector-wrapper">
            <button
              type="button"
              className="action-icon-btn currency-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              title="Select Currency"
              aria-label="Select Currency"
            >
              <span className="currency-code">{currency}</span>
            </button>
            {currencyDropdownOpen && (
              <div className="currency-dropdown glass-card animate-fade-in">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    className={`currency-option ${curr === currency ? 'active' : ''}`}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            className="action-icon-btn lang-toggle-btn"
            onClick={toggleLanguage}
            title={isRTL ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle Language"
          >
            <FiGlobe size={18} />
            <span className="lang-label">{isRTL ? 'EN' : 'عربي'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            className="action-icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Search Button */}
          <Link
            href="/search"
            className="action-icon-btn search-link"
            title={t('nav.search', 'Search')}
            aria-label="Search Catalog"
          >
            <FiSearch size={20} />
          </Link>

          {/* Wishlist Button */}
          <Link
            href="/wishlist"
            className="action-icon-btn wishlist-link"
            title={t('nav.wishlist', 'Wishlist')}
            aria-label="Wishlist"
          >
            <FiHeart size={20} />
            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
          </Link>

          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="action-icon-btn cart-link"
            title={t('nav.cart', 'Cart')}
            aria-label="Shopping Cart"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && <span className="action-badge pulse">{cartCount}</span>}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-hamburger-btn mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Component */}
      {mobileMenuOpen && (
        <MobileNavDrawer
          navLinks={navLinks}
          pathname={pathname}
          isDark={isDark}
          isRTL={isRTL}
          currency={currency}
          currencies={currencies}
          onToggleTheme={toggleTheme}
          onToggleLanguage={toggleLanguage}
          onSelectCurrency={setCurrency}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
