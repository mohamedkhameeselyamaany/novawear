'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/hooks';
import { FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import './Testimonials.css';

interface Testimonial {
  id: number;
  author: string;
  authorAr: string;
  role: string;
  roleAr: string;
  location: string;
  locationAr: string;
  quote: string;
  quoteAr: string;
  rating: number;
  initials: string;
  verified: boolean;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    author: 'Tarek El-Alfy',
    authorAr: 'طارق الألفي',
    role: 'Managing Partner',
    roleAr: 'شريك إداري ورائد أعمال',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    quote:
      'The Italian wool blazer fits as though it was measured by a Milanese master tailor. The weight of the fabric and finish of the horn buttons are remarkable.',
    quoteAr:
      'البليزر الصوف الإيطالي مفصل بدقة استثنائية كأنه صُمم خصيصاً في ميلانو. جودة القماش وتشطيبات الأزرار تشهد على الفخامة الحقيقية لعلامة نوفا وير.',
    rating: 5,
    initials: 'TA',
    verified: true,
  },
  {
    id: 2,
    author: 'Sarah Al-Mansouri',
    authorAr: 'سارة المنصوري',
    role: 'Creative Director',
    roleAr: 'مديرة إبداعية',
    location: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات',
    quote:
      'The backless silk gown is breathtaking. The fluid drape catches the light sublimely. NOVA WEAR is my new go-to for gala and black-tie evenings.',
    quoteAr:
      'الفستان الحريري قمة في الروعة والانسيابية. خياطة متقنة تمنح حضوراً آسراً في السهرات والمناسبات الكبرى. نوفا وير أصبحت وجهتي الأولى للأناقة.',
    rating: 5,
    initials: 'SM',
    verified: true,
  },
  {
    id: 3,
    author: 'Abdulaziz Al-Khaled',
    authorAr: 'عبد العزيز بن خالد',
    role: 'Private Investor',
    roleAr: 'مستثمر ورجل أعمال',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    quote:
      'The 41mm gold watch has phenomenal presence. Sapphire crystal with a buttery leather strap. Exceptional luxury at an honest value.',
    quoteAr:
      'الساعة الذهبية الأوتوماتيكية ذات حضور استثنائي وفخامة لا تضاهى. زجاج ياقوتي وسير جلدي ناعم ومريح. تجربة تسوق راقية بكل المقاييس.',
    rating: 5,
    initials: 'AK',
    verified: true,
  },
  {
    id: 4,
    author: 'Nourhan El-Sherif',
    authorAr: 'نورهان الشريف',
    role: 'Architect',
    roleAr: 'مهندسة معمارية',
    location: 'Alexandria, Egypt',
    locationAr: 'الإسكندرية، مصر',
    quote:
      'The Palermo grained calfskin bag exceeded all my expectations. The artisanal finishing and bespoke luxury packaging feel genuinely world-class.',
    quoteAr:
      'حقيبة باليرمو المصنوعة من جلد العجل المحبب فاقت توقعاتي تماماً. الاهتمام بأدق التفاصيل والبطانة والتغليف الفاخر يجعلك تشعر بأنك تقتني تحفة فنية.',
    rating: 5,
    initials: 'NE',
    verified: true,
  },
  {
    id: 5,
    author: 'Karim El-Shennawy',
    authorAr: 'كريم الشناوي',
    role: 'C-Suite Executive',
    roleAr: 'رئيس تنفيذي',
    location: 'Giza, Egypt',
    locationAr: 'الجيزة، مصر',
    quote:
      'The Supima cotton tees and Japanese selvedge denim are unbeatable. Immaculate durability, bespoke drape, and first-class courier delivery.',
    quoteAr:
      'تيشيرتات قطن سوبيما والجينز الياباني السيلفدج لا مثيل لهما. خامات مريحة ومظهر متماسك بعد الغسيل المتكرر، وتوصيل راقٍ وسريع للغاية.',
    rating: 5,
    initials: 'KS',
    verified: true,
  },
  {
    id: 6,
    author: 'Mariam Al-Kaabi',
    authorAr: 'مريم الكعبي',
    role: 'Jewelry Enthusiast',
    roleAr: 'خبيرة مجوهرات وأزياء',
    location: 'Abu Dhabi, UAE',
    locationAr: 'أبوظبي، الإمارات',
    quote:
      'The tennis bracelet and herringbone necklace are radiant masterpieces. Timeless craftsmanship with a contemporary glow. Truly magnificent.',
    quoteAr:
      'سوار التينيس المرصع بالألماس والعقد الذهبي 18 قيراط تحفة فنية حقيقية. بريق ساحر وتصميم أنيق يجمع بين الكلاسيكية والحداثة دون تكلف.',
    rating: 5,
    initials: 'MK',
    verified: true,
  },
];

export const Testimonials: React.FC = () => {
  const { isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1080) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = testimonialsData.length;
  const maxIndex = Math.max(0, total - visibleCount);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Continuous gentle auto-scroll
  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
    }

    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Touch Handlers for Mobile Swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (isRTL) {
        // In RTL, positive diff (swipe left) moves to next
        if (diff > 0) handleNext();
        else handlePrev();
      } else {
        // In LTR, positive diff (swipe left) moves to next
        if (diff > 0) handleNext();
        else handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Calculate sliding transform offset
  const cardWidthPercent = 100 / visibleCount;
  const offset = activeIndex * cardWidthPercent;
  const transformStyle = isRTL
    ? `translateX(${offset}%)`
    : `translateX(-${offset}%)`;

  return (
    <section
      className="testimonials-section"
      aria-label={isRTL ? 'آراء نخبة عملائنا' : 'Client Testimonials'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-subtitle gold-gradient-text">
            {isRTL ? 'آراء نخبة عملائنا' : 'CLIENT ACCLAIM'}
          </span>
          <h2 className="section-title">
            {isRTL ? 'تجربة نوفا وير الاستثنائية' : 'THE NOVA WEAR EXPERIENCE'}
          </h2>
          <div className="title-gold-bar mx-auto" />
          <p className="testimonials-lead-text">
            {isRTL
              ? 'شهادات حقيقية من نخبة أصحاب الذوق الرفيع الذين اختاروا تصاميمنا الفاخرة.'
              : 'Endorsements from our discerning clientele who value modern sartorial perfection.'}
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div className="testimonials-viewport">
          <div
            className="testimonials-slider-track"
            style={{ transform: transformStyle }}
          >
            {testimonialsData.map((item, idx) => {
              const isCurrent = idx >= activeIndex && idx < activeIndex + visibleCount;
              return (
                <div
                  key={item.id}
                  className={`testimonial-slide-col ${isCurrent ? 'is-active' : ''}`}
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <article className="testimonial-card glass-panel">
                    {/* Top Header: Avatar + Meta */}
                    <div className="testimonial-card-header">
                      <div className="testimonial-avatar" aria-hidden="true">
                        <span className="avatar-initials">{item.initials}</span>
                        <div className="avatar-gold-ring" />
                      </div>
                      <div className="testimonial-client-meta">
                        <div className="client-name-row">
                          <h3 className="client-name">
                            {isRTL ? item.authorAr : item.author}
                          </h3>
                          {item.verified && (
                            <span
                              className="verified-badge"
                              title={isRTL ? 'مشتري موثق' : 'Verified Client'}
                            >
                              <FiCheckCircle className="verified-icon" />
                              <span className="verified-text">
                                {isRTL ? 'موثق' : 'Verified'}
                              </span>
                            </span>
                          )}
                        </div>
                        <span className="client-role">
                          {isRTL ? item.roleAr : item.role} • {isRTL ? item.locationAr : item.location}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="testimonial-stars" aria-label={`${item.rating} out of 5 stars`}>
                      {[...Array(item.rating)].map((_, i) => (
                        <FiStar key={i} className="star-filled" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="testimonial-quote">
                      &ldquo;{isRTL ? item.quoteAr : item.quote}&rdquo;
                    </p>

                    {/* Luxury Decorative Watermark */}
                    <div className="testimonial-quote-mark" aria-hidden="true">
                      &rdquo;
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls: Arrows & Indicators */}
        <div className="testimonials-controls">
          {/* Previous Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn prev-btn"
            onClick={handlePrev}
            title={isRTL ? 'التقييم السابق' : 'Previous Testimonial'}
            aria-label={isRTL ? 'التقييم السابق' : 'Previous Testimonial'}
          >
            {isRTL ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots-container" role="tablist">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`slider-dot-btn ${dotIdx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(dotIdx)}
                role="tab"
                aria-selected={dotIdx === activeIndex}
                aria-label={`Slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn next-btn"
            onClick={handleNext}
            title={isRTL ? 'التقييم التالي' : 'Next Testimonial'}
            aria-label={isRTL ? 'التقييم التالي' : 'Next Testimonial'}
          >
            {isRTL ? <FiChevronLeft size={22} /> : <FiChevronRight size={22} />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
