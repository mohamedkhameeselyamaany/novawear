'use client';

import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useLanguage } from '@/hooks';
import './ScrollToTop.css';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Appears after scrolling more than 250px
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''} ${isRTL ? 'pos-right' : 'pos-left'}`}
      aria-label={isRTL ? 'العودة إلى أعلى الصفحة' : 'Scroll to top'}
      title={isRTL ? 'العودة إلى أعلى الصفحة' : 'Scroll to top'}
    >
      <FiArrowUp className="scroll-arrow-icon" />
    </button>
  );
};

export default ScrollToTop;
