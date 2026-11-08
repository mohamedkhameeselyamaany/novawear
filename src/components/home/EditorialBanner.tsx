'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks';
import { FiCheckCircle } from 'react-icons/fi';

export const EditorialBanner: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <section className="editorial-banner-section">
      <div className="editorial-container container">
        <div className="editorial-text-col">
          <span className="editorial-badge">
            {isRTL ? 'مجموعة التصاميم المعمارية' : 'THE ARCHITECTURAL CAPSULE'}
          </span>
          <h2 className="editorial-title">
            {isRTL ? (
              <>
                صُنعت بإتقان وشغف. <br />
                لتُرتدى <span className="gold-text">بتميز وتألق</span>.
              </>
            ) : (
              <>
                CRAFTED WITH INTENT. <br />
                WORN WITH <span className="gold-text">DISTINCTION</span>.
              </>
            )}
          </h2>
          <p className="editorial-desc">
            {isRTL
              ? 'كل قطعة في نوفا وير نتاج التزام صارم بأعلى معايير جودة الأقمشة. نستورد خاماتنا حصرياً من أرقى مصانع الصوف الإيطالية، والحرير الطبيعي الخالص، لضمان استدامة القطعة وراحتها وتفردها.'
              : 'Every NOVA WEAR garment is born from a rigorous dedication to fabric integrity. We source exclusively from family-owned Biella wool mills, Como silk weavers, and certified artisans to ensure longevity, fit, and timeless sophistication.'}
          </p>
          <div className="editorial-perks-list">
            <div className="editorial-perk">
              <FiCheckCircle className="gold-text" />
              <span>
                {isRTL
                  ? 'خامات طبيعية نقية 100% دون أي مساومة'
                  : 'Zero Compromise on Raw Material Purity'}
              </span>
            </div>
            <div className="editorial-perk">
              <FiCheckCircle className="gold-text" />
              <span>
                {isRTL
                  ? 'معايير خياطة وتفصيل إيطالية متطورة'
                  : 'Full-Canvas & Half-Canvas Tailoring Standards'}
              </span>
            </div>
            <div className="editorial-perk">
              <FiCheckCircle className="gold-text" />
              <span>
                {isRTL
                  ? 'خدمة استبدال وتوصيل هدايا راقية'
                  : 'Complimentary Bespoke Alterations & Sizing Service'}
              </span>
            </div>
          </div>
          <Link href="/accessories" className="btn btn-primary mt-4">
            {isRTL ? 'استكشف الإكسسوارات الفاخرة' : 'DISCOVER ACCESSORIES'}
          </Link>
        </div>

        <div className="editorial-image-col">
          <div className="editorial-image-frame">
            <Image
              src="/images/accessories/women/accessories-women-gold-necklace.webp"
              alt="Haute Joaillerie & Accessories"
              width={500}
              height={600}
              className="editorial-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
