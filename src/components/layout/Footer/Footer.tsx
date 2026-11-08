'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo/Logo';
import { useToast, useLanguage } from '@/hooks';
import {
  FiMail,
  FiArrowRight,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiExternalLink,
  FiPhone,
} from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { success, warning } = useToast();
  const { isRTL, t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      warning(
        isRTL
          ? 'يرجى إدخال عنوان بريد إلكتروني صحيح.'
          : 'Please enter a valid email address.'
      );
      return;
    }
    setIsSubscribed(true);
    success(
      isRTL
        ? 'شكراً لاشتراكك في النشرة الإخبارية الحصرية لنوفا وير.'
        : 'Thank you for subscribing to the NOVA WEAR VIP Gazette.'
    );
    setEmail('');
  };

  return (
    <footer className="footer-root" role="contentinfo">
      {/* Value Badges Band */}
      <div className="footer-badges-band">
        <div className="footer-container badges-grid">
          <div className="badge-col">
            <FiTruck className="badge-ico" />
            <div>
              <h4 className="badge-h">
                {isRTL ? 'شحن سريع ومجاني' : 'WORLDWIDE EXPRESS'}
              </h4>
              <p className="badge-p">
                {isRTL
                  ? 'شحن مجاني على كافة الطلبات المؤهلة'
                  : 'Complimentary express dispatch on all qualifying orders'}
              </p>
            </div>
          </div>
          <div className="badge-col">
            <FiShield className="badge-ico" />
            <div>
              <h4 className="badge-h">
                {isRTL ? 'أصالة فاخرة مضمونة' : 'HAUTE AUTHENTICITY'}
              </h4>
              <p className="badge-p">
                {isRTL
                  ? 'خامات وأقمشة إيطالية طبيعية 100%'
                  : '100% verified Italian & luxury materials'}
              </p>
            </div>
          </div>
          <div className="badge-col">
            <FiRefreshCw className="badge-ico" />
            <div>
              <h4 className="badge-h">
                {isRTL ? 'استبدال واسترجاع ميسر' : 'EFFORTLESS RETURNS'}
              </h4>
              <p className="badge-p">
                {isRTL
                  ? 'فترة استرجاع مرنة خلال 14 يوماً'
                  : '14-day complimentary return & exchange window'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Multi-Column Grid */}
      <div className="footer-container footer-main-grid">
        {/* 1. Brand Section */}
        <div className="footer-col brand-col">
          <div className="footer-brand-logo">
            <Logo size="lg" />
          </div>
          <p className="brand-statement">
            {isRTL
              ? 'تجسد نوفا وير أرقى معايير الفخامة المعاصرة والخياطة الدقيقة. صممت قطعنا لأصحاب الذوق الرفيع الباحثين عن التميز والجاذبية في كل إطلالة.'
              : 'NOVA WEAR embodies modern luxury, master tailoring, and timeless elegance. Engineered for discerning individuals who wear their confidence.'}
          </p>

          {/* Social Media & Contact Channels */}
          <div className="footer-social-section">
            <span className="social-heading-label">
              {isRTL ? 'قنوات التواصل الرسمية:' : 'OFFICIAL CHANNELS:'}
            </span>
            <div className="social-pills">
              <a
                href="https://wa.me/201274664643"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp-btn"
                title="WhatsApp Contact"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="mailto:khameesmohamed942@gmail.com"
                className="social-btn email-btn"
                title="Email Concierge"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn facebook-btn"
                title="Facebook"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Links */}
        <div className="footer-col">
          <h4 className="footer-heading">
            {isRTL ? 'أقسام المتجر' : 'STORE COLLECTIONS'}
          </h4>
          <ul className="footer-nav-list">
            <li>
              <Link href="/" className="footer-nav-link">
                {isRTL ? 'الصفحة الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>
              <Link href="/men" className="footer-nav-link">
                {isRTL ? 'أزياء الرجال' : "Men's Fashion"}
              </Link>
            </li>
            <li>
              <Link href="/women" className="footer-nav-link">
                {isRTL ? 'أزياء النساء' : "Women's Fashion"}
              </Link>
            </li>
            <li>
              <Link href="/children" className="footer-nav-link">
                {isRTL ? 'أزياء الأطفال' : "Children's Fashion"}
              </Link>
            </li>
            <li>
              <Link href="/accessories" className="footer-nav-link">
                {isRTL ? 'الإكسسوارات الفاخرة' : 'Fine Accessories'}
              </Link>
            </li>
            <li>
              <Link href="/search" className="footer-nav-link">
                {isRTL ? 'البحث في الكتالوج' : 'Search Catalog'}
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Customer Care & Legal Links */}
        <div className="footer-col">
          <h4 className="footer-heading">
            {isRTL ? 'خدمة العملاء والسياسات' : 'CLIENT CARE & LEGAL'}
          </h4>
          <ul className="footer-nav-list">
            <li>
              <Link href="/privacy-policy" className="footer-nav-link highlight-legal">
                {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="footer-nav-link highlight-legal">
                {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </Link>
            </li>
            <li>
              <Link href="/cart" className="footer-nav-link">
                {isRTL ? 'سلة المشتريات' : 'Shopping Bag'}
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="footer-nav-link">
                {isRTL ? 'قائمة المفضلة' : 'Saved Wishlist'}
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="footer-nav-link">
                {isRTL ? 'إتمام الشراء' : 'Checkout Terminal'}
              </Link>
            </li>
            <li>
              <a href="tel:01274664643" className="footer-nav-link direct-contact">
                <FiPhone className="gold-text" /> 01274664643
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Newsletter Column */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">
            {isRTL ? 'النشرة البريدية الخاصة' : 'THE PRIVATE GAZETTE'}
          </h4>
          <p className="newsletter-desc">
            {isRTL
              ? 'اشترك لتصلك دعوات العروض الخاصة وتحديثات تشكيلاتنا الحصرية قبل طرحها رسمياً.'
              : 'Subscribe to receive private runway invites, seasonal capsule reveals, and exclusive luxury privileges.'}
          </p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-group">
              <FiMail className="mail-icon" />
              <input
                type="email"
                placeholder={
                  isRTL
                    ? 'أدخل بريدك الإلكتروني الشخصي...'
                    : 'Enter your private email...'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                aria-label="Email address for newsletter"
                required
              />
              <button
                type="submit"
                className="newsletter-submit-btn"
                aria-label={isRTL ? 'اشتراك' : 'Subscribe'}
              >
                <FiArrowRight style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
              </button>
            </div>
            {isSubscribed && (
              <p className="subscribe-success-text">
                {isRTL
                  ? '✨ شكراً لك! تم اشتراكك في النشرة الخاصة.'
                  : '✨ You are now subscribed to NOVA WEAR VIP Gazette.'}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Payment Badges & Dynamic Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-container bottom-bar-inner">
          <p className="copyright-text">
            {isRTL
              ? `© ${currentYear} NOVA WEAR. جميع الحقوق محفوظة.`
              : `© ${currentYear} NOVA WEAR. All Rights Reserved.`}
          </p>
          <div className="payment-badges">
            <span className="pay-badge">VODAFONE CASH</span>
            <span className="pay-badge">INSTAPAY</span>
            <span className="pay-badge">BEEPAY</span>
            <span className="pay-badge">MEEZA</span>
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">MASTERCARD</span>
          </div>
        </div>
      </div>

      {/* PHASE 13: Dedicated Developer Credit & Professional Attribution */}
      <div className="developer-attribution-bar">
        <div className="footer-container dev-credit-container">
          <p className="dev-credit-lead">
            {isRTL ? 'تم التصميم والتطوير بواسطة' : 'Designed & Developed by'}
          </p>
          <h3 className="dev-name">
            {isRTL ? 'المهندس محمد خميس' : 'MOHAMED KHAMIS'}
          </h3>
          <p className="dev-role">Front-End Developer &amp; UX Designer</p>

          <div className="dev-links-row">
            <a
              href="https://mohamed-khamis.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="dev-portfolio-link"
            >
              <span>{isRTL ? 'رابط الموقع الشخصي' : 'Portfolio Website'}</span>
              <FiExternalLink />
            </a>
            <span className="dev-dot-separator">•</span>
            <a href="mailto:khameesmohamed942@gmail.com" className="dev-contact-item">
              khameesmohamed942@gmail.com
            </a>
            <span className="dev-dot-separator">•</span>
            <a href="tel:01274664643" className="dev-contact-item">
              01274664643
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
