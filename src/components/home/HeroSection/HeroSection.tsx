'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks';
import { FiArrowRight, FiShield, FiTruck, FiAward } from 'react-icons/fi';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const { isRTL, t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-background-wrapper">
        <Image
          src="/images/men/men-wool-blazer.webp"
          alt="NOVA WEAR Haute Couture Collection"
          fill
          priority
          className="hero-bg-image"
          sizes="100vw"
        />
        <div className="hero-dark-overlay" />
      </div>

      <div className="hero-content-container">
        <div className="hero-badge">
          <span className="badge-sparkle">✦</span>
          <span>
            {isRTL ? 'تشكيلة خريف وشتاء 2026 الحصرية' : 'AUTUMN / WINTER 2026 EDIT'}
          </span>
          <span className="badge-sparkle">✦</span>
        </div>

        <h1 className="hero-title">
          {isRTL ? (
            <>
              الفخامة تبدأ من <br />
              <span className="gold-shimmer-text">حضورك وأناقتك</span>
            </>
          ) : (
            <>
              WEAR YOUR <br />
              <span className="gold-shimmer-text">CONFIDENCE</span>
            </>
          )}
        </h1>

        <p className="hero-subtitle">
          {isRTL
            ? 'اكتشف مفهوماً جديداً للأناقة المعاصرة من خلال الخياطة الهندسية الدقيقة، والأقمشة الإيطالية الفاخرة، والقطع الخالدة.'
            : 'Discover modern luxury redefined through architectural tailoring, master-crafted silhouettes, and virgin Italian fabrics.'}
        </p>

        <div className="hero-cta-group">
          <Link href="/men" className="btn btn-hero btn-hero-gold">
            <span>{isRTL ? 'تسوق أزياء الرجال' : 'SHOP MEN'}</span>
            <FiArrowRight style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
          </Link>
          <Link href="/women" className="btn btn-hero btn-hero-outline">
            <span>{isRTL ? 'تسوق أزياء النساء' : 'SHOP WOMEN'}</span>
            <FiArrowRight style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
          </Link>
          <Link href="/accessories" className="btn btn-hero btn-hero-ghost">
            <span>{isRTL ? 'الإكسسوارات الفاخرة' : 'ACCESSORIES'}</span>
          </Link>
        </div>

        {/* Value Propositions Strip */}
        <div className="hero-perks-strip">
          <div className="perk-item">
            <FiTruck className="perk-icon" />
            <div className="perk-text">
              <strong>{isRTL ? 'شحن سريع ومجاني' : 'Complimentary Express'}</strong>
              <span>{isRTL ? 'على الطلبات المؤهلة' : 'On qualifying orders'}</span>
            </div>
          </div>
          <div className="perk-item">
            <FiShield className="perk-icon" />
            <div className="perk-text">
              <strong>{isRTL ? 'أصالة فاخرة 100%' : 'Haute Authenticity'}</strong>
              <span>{isRTL ? 'أقمشة إيطالية معتمدة' : 'Verified provenance'}</span>
            </div>
          </div>
          <div className="perk-item">
            <FiAward className="perk-icon" />
            <div className="perk-text">
              <strong>{isRTL ? 'خياطة وتفصيل راقٍ' : 'Bespoke Atelier'}</strong>
              <span>{isRTL ? 'أعلى معايير الجودة' : 'Master craftsmanship'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
