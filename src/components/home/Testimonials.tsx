'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
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
  avatar: string;
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
    avatar: '/images/testimonials/avatar-1.jpg',
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
    avatar: '/images/testimonials/avatar-2.jpg',
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
    avatar: '/images/testimonials/avatar-3.jpg',
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
    avatar: '/images/testimonials/avatar-4.jpg',
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
    avatar: '/images/testimonials/avatar-5.jpg',
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
    avatar: '/images/testimonials/avatar-6.jpg',
  },
];

// 3 cloned sets create seamless infinite looping without visible jumps
const TOTAL_ORIGINAL = testimonialsData.length;
const EXTENDED_SLIDES = [
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set1-${t.id}-${idx}` })),
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set2-${t.id}-${idx}` })),
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set3-${t.id}-${idx}` })),
];

export const Testimonials: React.FC = () => {
  const { isRTL } = useLanguage();
  // Start at the beginning of Set 2 (index = TOTAL_ORIGINAL = 6)
  const [currentIndex, setCurrentIndex] = useState(TOTAL_ORIGINAL);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [failedAvatars, setFailedAvatars] = useState<Record<number, boolean>>({});

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // IntersectionObserver: Pause auto-play when section is out of viewport
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Seamless Infinite Looping: Normalize index when boundary is reached
  const handleTransitionEnd = () => {
    // If we've advanced into Set 3 (index >= 12), jump back to Set 2 (index - 6) without animation
    if (currentIndex >= TOTAL_ORIGINAL * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - TOTAL_ORIGINAL);
    }
    // If we've reversed into Set 1 (index < 6), jump forward to Set 2 (index + 6) without animation
    else if (currentIndex < TOTAL_ORIGINAL) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + TOTAL_ORIGINAL);
    }
  };

  // Re-enable smooth transition after instantaneous jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Premium 2.5 second autoplay timer with strict single-timer guarantee
  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
    }

    if (!isPaused && isInView) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 2500); // 2.5 seconds autoplay interval as requested
    }
  }, [handleNext, isPaused, isInView]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [startAutoPlay]);

  // Manual actions with graceful timer reset
  const onManualNext = () => {
    handleNext();
    startAutoPlay();
  };

  const onManualPrev = () => {
    handlePrev();
    startAutoPlay();
  };

  const onSelectDot = (dotIndex: number) => {
    setIsTransitioning(true);
    // Align so that active card matches selected dot
    const targetOffset = visibleCount === 3 ? 1 : 0;
    setCurrentIndex(TOTAL_ORIGINAL + dotIndex - targetOffset);
    startAutoPlay();
  };

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
        if (diff > 0) onManualNext();
        else onManualPrev();
      } else {
        if (diff > 0) onManualNext();
        else onManualPrev();
      }
    }
    touchStartX.current = null;
  };

  // Card Width & Transform Offset
  const cardWidthPercent = 100 / visibleCount;
  const offset = currentIndex * cardWidthPercent;
  const transformStyle = isRTL
    ? `translateX(${offset}%)`
    : `translateX(-${offset}%)`;

  // Determine active card for the luxury spotlight scale zoom (1.05 - 1.08)
  // On desktop (3 items visible), the center item (currentIndex + 1) is active
  // On mobile (1 item visible) or tablet (2 items), the leading card is active
  const activeFocusOffset = visibleCount === 3 ? 1 : 0;
  const activeNormalizedId = ((currentIndex + activeFocusOffset) % TOTAL_ORIGINAL) + 1;

  const handleAvatarError = (id: number) => {
    setFailedAvatars((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
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
            className={`testimonials-slider-track ${!isTransitioning ? 'no-transition' : ''}`}
            style={{ transform: transformStyle }}
            onTransitionEnd={handleTransitionEnd}
          >
            {EXTENDED_SLIDES.map((item, idx) => {
              // The card in focus receives the active scale zoom (approx 1.06)
              const isActive = item.id === activeNormalizedId && Math.abs(idx - (currentIndex + activeFocusOffset)) === 0;
              const hasAvatarFailed = failedAvatars[item.id];

              return (
                <div
                  key={item.uniqueKey}
                  className={`testimonial-slide-col ${isActive ? 'is-active' : ''}`}
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <article className="testimonial-card glass-panel">
                    {/* Top Header: Avatar + Meta */}
                    <div className="testimonial-card-header">
                      <div className="testimonial-avatar" aria-hidden="true">
                        {!hasAvatarFailed && (
                          <Image
                            src={item.avatar}
                            alt={isRTL ? item.authorAr : item.author}
                            width={54}
                            height={54}
                            className="avatar-photo"
                            onError={() => handleAvatarError(item.id)}
                            priority={idx >= TOTAL_ORIGINAL && idx < TOTAL_ORIGINAL + 3}
                          />
                        )}
                        <span className={`avatar-initials ${!hasAvatarFailed ? 'fallback-only' : ''}`}>
                          {item.initials}
                        </span>
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
            onClick={onManualPrev}
            title={isRTL ? 'التقييم السابق' : 'Previous Testimonial'}
            aria-label={isRTL ? 'التقييم السابق' : 'Previous Testimonial'}
          >
            {isRTL ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
          </button>

          {/* Dots Indicator: 6 original reviews */}
          <div className="slider-dots-container" role="tablist">
            {testimonialsData.map((_, dotIdx) => {
              const isDotActive = dotIdx === (activeNormalizedId - 1);
              return (
                <button
                  key={dotIdx}
                  type="button"
                  className={`slider-dot-btn ${isDotActive ? 'active' : ''}`}
                  onClick={() => onSelectDot(dotIdx)}
                  role="tab"
                  aria-selected={isDotActive}
                  aria-label={`Testimonial ${dotIdx + 1}`}
                />
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn next-btn"
            onClick={onManualNext}
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
