'use client';

import React from 'react';
import { useLanguage } from '@/hooks';
import { FiStar } from 'react-icons/fi';

interface Testimonial {
  id: number;
  author: string;
  authorAr: string;
  location: string;
  locationAr: string;
  quote: string;
  quoteAr: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    author: 'Tarek El-Alfy',
    authorAr: 'طارق الألفي',
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    quote:
      'The Italian wool blazer fits as though it was measured by a Milanese master tailor. The weight of the fabric and finish of the horn buttons are remarkable.',
    quoteAr:
      'البليزر الصوف الإيطالي مفصل بدقة استثنائية كأنه صُمم خصيصاً في ميلانو. جودة القماش والتشطيبات تشهد على الفخامة الحقيقية لنوفا وير.',
  },
  {
    id: 2,
    author: 'Sarah Al-Mansouri',
    authorAr: 'سارة المنصوري',
    location: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات',
    quote:
      'The backless silk gown is breathtaking. The fluid drape catches the light sublimely. NOVA WEAR is my new go-to for gala and black-tie evenings.',
    quoteAr:
      'الفستان الحريري قمة في الروعة والانسيابية. خياطة متقنة تمنح حضوراً آسراً في السهرات. نوفا وير أصبحت وجهتي الأولى للأناقة.',
  },
  {
    id: 3,
    author: 'Abdulaziz Al-Khaled',
    authorAr: 'عبد العزيز بن خالد',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    quote:
      'The 41mm gold watch has phenomenal presence. Sapphire crystal with a buttery leather strap. Exceptional luxury at an honest value.',
    quoteAr:
      'الساعة الذهبية ذات حضور استثنائي وفخامة لا تضاهى. زجاج ياقوتي وسير جلدي ناعم ومريح. تجربة تسوق راقية بكل المقاييس.',
  },
];

export const Testimonials: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            {isRTL ? 'آراء نخبة عملائنا' : 'CLIENT ACCLAIM'}
          </span>
          <h2 className="section-title">
            {isRTL ? 'تجربة نوفا وير الاستثنائية' : 'THE NOVA EXPERIENCE'}
          </h2>
          <div className="title-gold-bar mx-auto" />
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="testimonial-card glass-panel">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-quote">
                &ldquo;{isRTL ? item.quoteAr : item.quote}&rdquo;
              </p>
              <div className="testimonial-author">
                <strong>{isRTL ? item.authorAr : item.author}</strong>
                <span>{isRTL ? item.locationAr : item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
