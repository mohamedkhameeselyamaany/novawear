'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks';
import arLegal from '@/locales/ar/legal.json';
import enLegal from '@/locales/en/legal.json';
import { FiShield, FiLock, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '@/app/legal.css';

export default function PrivacyPolicyPage() {
  const { isRTL } = useLanguage();
  const content = isRTL ? arLegal : enLegal;

  return (
    <div className="legal-page-root container">
      {/* Header */}
      <div className="legal-header">
        <span className="legal-breadcrumb">
          {isRTL ? 'نوفا وير / الخصوصية والأمان' : 'NOVA WEAR / DATA GOVERNANCE'}
        </span>
        <h1 className="legal-title gold-gradient-text">{content.privacyTitle}</h1>
        <p className="legal-subtitle">{content.privacySubtitle}</p>
        <span className="legal-meta-badge">{content.privacyLastUpdated}</span>
      </div>

      {/* Main Content Card */}
      <div className="legal-content-card glass-panel">
        {content.privacySections.map((sec) => (
          <article key={sec.id} className="legal-section-block">
            <h2 className="legal-sec-title">
              <FiShield className="gold-text" size={18} />
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
            ? 'لأي استفسارات قانونية أو متعلقة بسياسة الخصوصية، يرجى التواصل مع فريق الخصوصية عبر '
            : 'For legal queries regarding your data protection, contact our privacy officer at '}
          <strong>khameesmohamed942@gmail.com</strong>
          {isRTL ? ' أو هاتفياً: ' : ' or telephone: '}
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

