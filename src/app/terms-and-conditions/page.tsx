'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks';
import arLegal from '@/locales/ar/legal.json';
import enLegal from '@/locales/en/legal.json';
import { FiFileText, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '@/app/legal.css';

export default function TermsAndConditionsPage() {
  const { isRTL } = useLanguage();
  const content = isRTL ? arLegal : enLegal;

  return (
    <div className="legal-page-root container">
      {/* Header */}
      <div className="legal-header">
        <span className="legal-breadcrumb">
          {isRTL ? 'نوفا وير / الشروط والضوابط' : 'NOVA WEAR / TERMS OF SERVICE'}
        </span>
        <h1 className="legal-title gold-gradient-text">{content.termsTitle}</h1>
        <p className="legal-subtitle">{content.termsSubtitle}</p>
        <span className="legal-meta-badge">{content.termsLastUpdated}</span>
      </div>

      {/* Main Content Card */}
      <div className="legal-content-card glass-panel">
        {content.termsSections.map((sec) => (
          <article key={sec.id} className="legal-section-block">
            <h2 className="legal-sec-title">
              <FiFileText className="gold-text" size={18} />
              <span>{sec.title}</span>
            </h2>
            <p className="legal-sec-content">{sec.content}</p>
          </article>
        ))}
      </div>

      {/* Footer Return Notice */}
      <div className="legal-footer-notice">
        <p>
          {isRTL
            ? 'تخضع جميع المعاملات عبر المتجر للشروط والأحكام المذكورة أعلاه. لأي أسئلة يرجى مراسلتنا عبر '
            : 'All boutique orders are governed by the terms stated above. For questions, please reach us at '}
          <strong>khameesmohamed942@gmail.com</strong>
          {isRTL ? ' أو هاتفياً: ' : ' or call '}
          <strong>01274664643</strong>.
        </p>
        <div className="mt-3">
          <Link href="/" className="btn btn-outline">
            {isRTL ? (
              <>
                <FiArrowRight /> العودة إلى المتجر
              </>
            ) : (
              <>
                <FiArrowLeft /> Return to Boutique
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

