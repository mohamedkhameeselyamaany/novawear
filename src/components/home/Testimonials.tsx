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

const TOTAL_CARDS = testimonialsData.length;
const ANGLE_STEP = 360 / TOTAL_CARDS; // 60 degrees between each card

export const Testimonials: React.FC = () => {
  const { isRTL } = useLanguage();

  // Carousel state
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [stageDimensions, setStageDimensions] = useState({
    radius: 430,
    cardWidth: 360,
    perspective: 1200,
  });

  // Modal / Full Comment View state
  const [selectedComment, setSelectedComment] = useState<Testimonial | null>(null);
  const [failedAvatars, setFailedAvatars] = useState<Record<number, boolean>>({});

  // Refs for tracking drag & autoplay
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number>(0);
  const pointerStartAngle = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive radius, perspective, and card width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setStageDimensions({ radius: 210, cardWidth: 290, perspective: 850 });
      } else if (width < 1024) {
        setStageDimensions({ radius: 320, cardWidth: 320, perspective: 1050 });
      } else {
        setStageDimensions({ radius: 430, cardWidth: 360, perspective: 1200 });
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

  // Keyboard navigation & Esc key to close comment modal
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

  // Navigation handlers
  const rotateNext = useCallback(() => {
    const dir = isRTL ? 1 : -1;
    setRotationAngle((prev) => prev + dir * ANGLE_STEP);
  }, [isRTL]);

  const rotatePrev = useCallback(() => {
    const dir = isRTL ? -1 : 1;
    setRotationAngle((prev) => prev + dir * ANGLE_STEP);
  }, [isRTL]);

  // Autoplay management
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
        rotateNext();
      }, 3500);
    }
  }, [rotateNext, isPaused, isInView, isDragging, selectedComment]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [startAutoPlay]);

  const handleManualNext = () => {
    rotateNext();
    startAutoPlay();
  };

  const handleManualPrev = () => {
    rotatePrev();
    startAutoPlay();
  };

  // Pointer / Mouse / Touch Drag Mechanics
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only respond to main click / touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    pointerStartX.current = e.clientX;
    pointerStartAngle.current = rotationAngle;
    dragDistanceRef.current = 0;
    isDraggingRef.current = false;
    setIsDragging(true);

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

    const stageWidth = stageRef.current?.offsetWidth || 800;
    const dirFactor = isRTL ? -1 : 1;
    // Map pixels to degrees smoothly
    const degChange = (deltaX / stageWidth) * 160 * dirFactor;
    setRotationAngle(pointerStartAngle.current + degChange);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    setIsDragging(false);

    // If user dragged more than 6px, snap to the nearest 60-degree card angle
    if (dragDistanceRef.current > 6) {
      const nearestAngle = Math.round(rotationAngle / ANGLE_STEP) * ANGLE_STEP;
      setRotationAngle(nearestAngle);
      startAutoPlay();
      // Keep isDraggingRef active briefly to suppress accidental card click
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 120);
    } else {
      isDraggingRef.current = false;
    }
  };

  // Click on a comment card: View full review comment & snap carousel if needed
  const handleCardClick = (item: Testimonial, index: number) => {
    if (isDraggingRef.current) return;

    // Calculate how far this card is from the center
    const cardBaseAngle = index * ANGLE_STEP;
    const dir = isRTL ? -1 : 1;
    // Target rotation to bring this card directly to center
    const currentNearestSteps = Math.round(rotationAngle / ANGLE_STEP);
    // Find matching angle equivalent
    const targetAngle = -cardBaseAngle * dir;
    // Adjust to closest multiple of 360 to prevent large spin
    const deltaSteps = Math.round((targetAngle - rotationAngle) / 360);
    const smoothTargetAngle = targetAngle - deltaSteps * 360;

    setRotationAngle(smoothTargetAngle);
    setSelectedComment(item);
    startAutoPlay();
  };

  // Dot navigation
  const handleSelectDot = (dotIdx: number) => {
    const cardBaseAngle = dotIdx * ANGLE_STEP;
    const dir = isRTL ? -1 : 1;
    const targetAngle = -cardBaseAngle * dir;
    const deltaSteps = Math.round((targetAngle - rotationAngle) / 360);
    const smoothTargetAngle = targetAngle - deltaSteps * 360;
    setRotationAngle(smoothTargetAngle);
    startAutoPlay();
  };

  // Determine which card is currently active in the front center
  const normalizedRotation = ((-rotationAngle % 360) + 360) % 360;
  const dir = isRTL ? -1 : 1;
  const activeDotIndex =
    ((Math.round((rotationAngle * dir) / ANGLE_STEP) % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;

  const handleAvatarError = (id: number) => {
    setFailedAvatars((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      className="testimonials-section circular-carousel-root"
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
              ? 'شهادات حقيقية من نخبة أصحاب الذوق الرفيع. اسحب للتصفح واضغط على أي تعليق لقراءته بالكامل.'
              : 'Endorsements from our discerning clientele. Drag to rotate in 3D and click any comment to read full review.'}
          </p>
        </div>

        {/* 3D Circular Carousel Stage */}
        <div
          ref={stageRef}
          className={`circular-carousel-stage ${isDragging ? 'is-dragging' : ''}`}
          style={{ perspective: `${stageDimensions.perspective}px` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="circular-carousel-cylinder">
            {testimonialsData.map((item, index) => {
              // 3D cylindrical geometry calculation
              const cardBaseAngle = index * ANGLE_STEP;
              const dirMultiplier = isRTL ? -1 : 1;
              const currentTotalAngle = cardBaseAngle + rotationAngle * dirMultiplier;

              // Normalize angle into [-180, 180] range relative to camera
              let relativeAngle = ((currentTotalAngle % 360) + 360) % 360;
              if (relativeAngle > 180) relativeAngle -= 360;

              const rad = (relativeAngle * Math.PI) / 180;
              const R = stageDimensions.radius;

              // Cylindrical coordinates
              const x = Math.sin(rad) * R * dirMultiplier;
              const z = (Math.cos(rad) - 1) * R; // z <= 0
              const rotY = relativeAngle * 0.55 * dirMultiplier; // Gentle 3D perspective tilt

              // Continuous depth scaling and opacity
              const cosVal = Math.cos(rad);
              const scale = 0.82 + 0.24 * Math.max(0, cosVal); // 1.06 at center, ~0.82 at edge
              const opacity =
                Math.abs(relativeAngle) > 130
                  ? 0
                  : Math.max(0.2, Math.pow(Math.max(0, cosVal), 1.3));
              const zIndex = Math.round((cosVal + 1) * 20);
              const isActive = Math.abs(relativeAngle) < 25;
              const isPointerDisabled = Math.abs(relativeAngle) > 120;
              const hasAvatarFailed = failedAvatars[item.id];

              return (
                <div
                  key={item.id}
                  className={`circular-card-wrapper ${isActive ? 'is-active' : ''}`}
                  style={{
                    width: `${stageDimensions.cardWidth}px`,
                    marginLeft: `-${stageDimensions.cardWidth / 2}px`,
                    transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    pointerEvents: isPointerDisabled ? 'none' : 'auto',
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease',
                  }}
                  onClick={() => handleCardClick(item, index)}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${item.author} review - Click to view comment`}
                >
                  <article className="testimonial-card glass-panel circular-card-inner">
                    {/* Top Header: Avatar + Metadata */}
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
                            priority={item.id <= 3}
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

                    {/* Review Quote Snippet */}
                    <p className="testimonial-quote">
                      &ldquo;{isRTL ? item.quoteAr : item.quote}&rdquo;
                    </p>

                    {/* Interactive Click-to-view Action Hint */}
                    <div className="card-action-hint">
                      <span className="hint-text">
                        {isRTL ? 'اضغط لعرض التقييم بالكامل' : 'Click to view full review'}
                      </span>
                      <FiMaximize2 className="hint-icon" />
                    </div>

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

        {/* Navigation Controls: Direction-aware Arrows & Snap Dots */}
        <div className="testimonials-controls">
          {/* Previous Arrow Button */}
          <button
            type="button"
            className="slider-arrow-btn prev-btn"
            onClick={handleManualPrev}
            title={isRTL ? 'التقييم السابق' : 'Previous Testimonial'}
            aria-label={isRTL ? 'التقييم السابق' : 'Previous Testimonial'}
          >
            {isRTL ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
          </button>

          {/* Dots Indicator: 6 Reviews */}
          <div className="slider-dots-container" role="tablist">
            {testimonialsData.map((_, dotIdx) => {
              const isDotActive = dotIdx === activeDotIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  className={`slider-dot-btn ${isDotActive ? 'active' : ''}`}
                  onClick={() => handleSelectDot(dotIdx)}
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
            onClick={handleManualNext}
            title={isRTL ? 'التقييم التالي' : 'Next Testimonial'}
            aria-label={isRTL ? 'التقييم التالي' : 'Next Testimonial'}
          >
            {isRTL ? <FiChevronLeft size={22} /> : <FiChevronRight size={22} />}
          </button>
        </div>
      </div>

      {/* Full Comment / Review Details Modal Popup (Preserving Comments Functionality) */}
      {selectedComment && (
        <div
          className="comment-modal-backdrop"
          onClick={() => setSelectedComment(null)}
          role="dialog"
          aria-modal="true"
          aria-label={isRTL ? 'تفاصيل التقييم' : 'Review Details'}
        >
          <div
            className="comment-modal-card glass-panel animate-pop-in"
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
