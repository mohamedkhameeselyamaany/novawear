'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks';
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiX,
  FiMaximize2,
  FiAward,
} from 'react-icons/fi';
import './Testimonials.css';

export interface Testimonial {
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
  dateEn?: string;
  dateAr?: string;
}

export const testimonialsData: Testimonial[] = [
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
    dateEn: 'Verified Purchase • October 2026',
    dateAr: 'شراء موثق • أكتوبر 2026',
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
    dateEn: 'Verified Purchase • November 2026',
    dateAr: 'شراء موثق • نوفمبر 2026',
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
    dateEn: 'Verified Purchase • September 2026',
    dateAr: 'شراء موثق • سبتمبر 2026',
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
    dateEn: 'Verified Purchase • October 2026',
    dateAr: 'شراء موثق • أكتوبر 2026',
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
    dateEn: 'Verified Purchase • August 2026',
    dateAr: 'شراء موثق • أغسطس 2026',
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
    dateEn: 'Verified Purchase • November 2026',
    dateAr: 'شراء موثق • نوفمبر 2026',
  },
];

const TOTAL_ORIGINAL = testimonialsData.length;

// 4 cloned sets ensure seamless infinite looping in both forward and backward directions
const EXTENDED_SLIDES = [
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set0-${t.id}-${idx}` })),
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set1-${t.id}-${idx}` })),
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set2-${t.id}-${idx}` })),
  ...testimonialsData.map((t, idx) => ({ ...t, uniqueKey: `set3-${t.id}-${idx}` })),
];

const BASE_START_INDEX = TOTAL_ORIGINAL * 2; // Index 12 (start of Set 2)

export const Testimonials: React.FC = () => {
  const { isRTL } = useLanguage();

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(BASE_START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Modal / Full Comment View State
  const [selectedComment, setSelectedComment] = useState<Testimonial | null>(null);
  const [failedAvatars, setFailedAvatars] = useState<Record<number, boolean>>({});

  // Refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive visible count: 3 on desktop, 2 on tablet, 1 on mobile
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 680) {
        setVisibleCount(1);
      } else if (width < 1080) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver to pause autoplay when off-screen
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

  // Esc key listener to close comment modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedComment) {
        setSelectedComment(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComment]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedComment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedComment]);

  // Infinite Seamless Loop normalization on transition end
  const handleTransitionEnd = () => {
    // If we have advanced forward into Set 3 (>= 18), jump back to Set 2 (-6) seamlessly
    if (currentIndex >= TOTAL_ORIGINAL * 3) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - TOTAL_ORIGINAL);
    }
    // If we have advanced backward into Set 0 (< 6), jump forward to Set 1 (+6) seamlessly
    else if (currentIndex < TOTAL_ORIGINAL) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + TOTAL_ORIGINAL);
    }
  };

  // Re-enable smooth transition after an instantaneous boundary reset
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

  /**
   * Navigation directions:
   * In Arabic: Scrolls automatically from RIGHT to LEFT (من اليمين لليسار) -> step forward (+1)
   * In English: Scrolls automatically from LEFT to RIGHT (من اليسار لليمين) -> step backward (-1)
   */
  const stepForward = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const stepBackward = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Auto-play action according to language requirement
  const autoPlayStep = useCallback(() => {
    if (isRTL) {
      // Arabic: من اليمين لليسار (Right to Left)
      stepForward();
    } else {
      // English: من اليسار لليمين (Left to Right)
      stepBackward();
    }
  }, [isRTL, stepForward, stepBackward]);

  // Premium autoplay timer (2.8 seconds)
  const startAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
    }

    if (!isPaused && isInView && !isDragging && !selectedComment) {
      autoPlayTimerRef.current = setInterval(() => {
        autoPlayStep();
      }, 2800);
    }
  }, [autoPlayStep, isPaused, isInView, isDragging, selectedComment]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [startAutoPlay]);

  // Manual arrow navigation handlers
  const onManualNext = () => {
    if (isRTL) {
      stepForward();
    } else {
      stepBackward();
    }
    startAutoPlay();
  };

  const onManualPrev = () => {
    if (isRTL) {
      stepBackward();
    } else {
      stepForward();
    }
    startAutoPlay();
  };

  // Dot selection handler
  const onSelectDot = (dotIndex: number) => {
    setIsTransitioning(true);
    const targetCenterOffset = visibleCount === 3 ? 1 : 0;
    setCurrentIndex(BASE_START_INDEX + dotIndex - targetCenterOffset);
    startAutoPlay();
  };

  // Pointer / Touch Drag Mechanics
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    pointerStartX.current = e.clientX;
    dragDistanceRef.current = 0;
    isDraggingRef.current = false;
    setIsDragging(true);
    setIsTransitioning(false);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - pointerStartX.current;
    dragDistanceRef.current = Math.abs(deltaX);

    if (dragDistanceRef.current > 6) {
      isDraggingRef.current = true;
    }

    setDragOffsetPx(deltaX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    setIsDragging(false);
    setIsTransitioning(true);

    const viewportWidth = viewportRef.current?.offsetWidth || 1000;
    const cardWidthPx = viewportWidth / visibleCount;
    const dragDelta = dragOffsetPx;
    setDragOffsetPx(0);

    if (Math.abs(dragDelta) > cardWidthPx * 0.2 || dragDistanceRef.current > 50) {
      if (dragDelta < 0) {
        // Dragged left -> advance forward
        stepForward();
      } else {
        // Dragged right -> advance backward
        stepBackward();
      }
      startAutoPlay();

      setTimeout(() => {
        isDraggingRef.current = false;
      }, 100);
    } else {
      isDraggingRef.current = false;
    }
  };

  // Card click handler (opens full review modal)
  const handleCardClick = (item: Testimonial) => {
    if (isDraggingRef.current) return;
    setSelectedComment(item);
  };

  // Active card calculation
  const activeFocusOffset = visibleCount === 3 ? 1 : 0;
  const activeNormalizedId =
    (((currentIndex + activeFocusOffset) % TOTAL_ORIGINAL) + TOTAL_ORIGINAL) % TOTAL_ORIGINAL + 1;

  // Slide width and transform offset
  const cardWidthPercent = 100 / visibleCount;
  const baseOffsetPercent = currentIndex * cardWidthPercent;

  // Apply drag offset in pixels if currently dragging
  const transformStyle =
    dragOffsetPx !== 0
      ? `calc(-${baseOffsetPercent}% + ${dragOffsetPx}px)`
      : `-${baseOffsetPercent}%`;

  const handleAvatarError = (id: number) => {
    setFailedAvatars((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      className="testimonials-section regular-slider-root"
      aria-label={isRTL ? 'آراء نخبة عملائنا' : 'Client Testimonials'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
              ? 'شهادات حقيقية من نخبة أصحاب الذوق الرفيع. تقييمات موثقة تعكس فخامة الخامات وجودة التصميم الإيطالي.'
              : 'Endorsements from our discerning clientele. Verified reviews reflecting bespoke Italian luxury and artisanal craft.'}
          </p>
        </div>

        {/* Regular Side-by-Side Infinite Carousel Viewport */}
        <div
          ref={viewportRef}
          className={`testimonials-viewport ${isDragging ? 'is-dragging' : ''}`}
          dir="ltr"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className={`testimonials-slider-track ${!isTransitioning ? 'no-transition' : ''}`}
            style={{ transform: `translateX(${transformStyle})` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {EXTENDED_SLIDES.map((item, idx) => {
              const isActive =
                item.id === activeNormalizedId &&
                Math.abs(idx - (currentIndex + activeFocusOffset)) === 0;
              const hasAvatarFailed = failedAvatars[item.id];

              return (
                <div
                  key={item.uniqueKey}
                  className={`testimonial-slide-col ${isActive ? 'is-active' : ''}`}
                  style={{ width: `${cardWidthPercent}%` }}
                >
                  <article
                    className="testimonial-card glass-panel"
                    dir={isRTL ? 'rtl' : 'ltr'}
                    onClick={() => handleCardClick(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.author} review - Click to view full details`}
                  >
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
                            priority={idx >= BASE_START_INDEX && idx < BASE_START_INDEX + 3}
                          />
                        )}
                        <span
                          className={`avatar-initials ${!hasAvatarFailed ? 'fallback-only' : ''}`}
                        >
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
                          {isRTL ? item.roleAr : item.role} •{' '}
                          {isRTL ? item.locationAr : item.location}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div
                      className="testimonial-stars"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {[...Array(item.rating)].map((_, i) => (
                        <FiStar key={i} className="star-filled" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="testimonial-quote">
                      &ldquo;{isRTL ? item.quoteAr : item.quote}&rdquo;
                    </p>

                    {/* Interactive Action Hint */}
                    <div className="card-action-hint">
                      <span className="hint-text">
                        {isRTL ? 'اضغط لعرض التقييم بالكامل' : 'Click to view full review'}
                      </span>
                      <FiMaximize2 className="hint-icon" />
                    </div>

                    {/* Luxury Decorative Watermark Quote Mark */}
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
              const isDotActive = dotIdx === activeNormalizedId - 1;
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

      {/* Full Comment / Review Details Modal Popup */}
      {selectedComment && (
        <div
          className="comment-modal-backdrop"
          onClick={() => setSelectedComment(null)}
          role="dialog"
          aria-modal="true"
          aria-label={isRTL ? 'تفاصيل التقييم' : 'Review Details'}
        >
          <div
            className="comment-modal-card glass-panel"
            dir={isRTL ? 'rtl' : 'ltr'}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="comment-modal-close-btn"
              onClick={() => setSelectedComment(null)}
              aria-label={isRTL ? 'إغلاق' : 'Close'}
            >
              <FiX size={20} />
            </button>

            {/* Modal Header */}
            <div className="comment-modal-header">
              <div className="modal-avatar-frame">
                <Image
                  src={selectedComment.avatar}
                  alt={isRTL ? selectedComment.authorAr : selectedComment.author}
                  width={68}
                  height={68}
                  className="modal-avatar-img"
                  onError={() => handleAvatarError(selectedComment.id)}
                />
                <div className="avatar-gold-ring" />
              </div>

              <div className="modal-meta-info">
                <div className="modal-name-row">
                  <h3 className="modal-author-name">
                    {isRTL ? selectedComment.authorAr : selectedComment.author}
                  </h3>
                  {selectedComment.verified && (
                    <span className="verified-badge-large">
                      <FiCheckCircle />
                      <span>{isRTL ? 'عميل موثق' : 'Verified Client'}</span>
                    </span>
                  )}
                </div>
                <span className="modal-author-role">
                  {isRTL ? selectedComment.roleAr : selectedComment.role} •{' '}
                  {isRTL ? selectedComment.locationAr : selectedComment.location}
                </span>

                {/* Stars */}
                <div className="modal-stars-row">
                  {[...Array(selectedComment.rating)].map((_, i) => (
                    <FiStar key={i} className="star-filled" size={16} />
                  ))}
                  <span className="modal-rating-score">5.0 / 5.0</span>
                </div>
              </div>
            </div>

            <div className="modal-gold-divider" />

            {/* Full Quote */}
            <div className="comment-modal-body">
              <p className="modal-full-quote">
                &ldquo;{isRTL ? selectedComment.quoteAr : selectedComment.quote}&rdquo;
              </p>
            </div>

            {/* Modal Footer */}
            <div className="comment-modal-footer">
              <div className="modal-purchase-tag">
                <FiAward className="gold-text" />
                <span>
                  {isRTL
                    ? selectedComment.dateAr || 'شراء موثق • تشكيلة نوفا وير الفاخرة'
                    : selectedComment.dateEn || 'Verified Purchase • NOVA WEAR Haute Couture'}
                </span>
              </div>

              <button
                type="button"
                className="btn btn-outline modal-action-btn"
                onClick={() => setSelectedComment(null)}
              >
                {isRTL ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
