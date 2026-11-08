'use client';

import React from 'react';
import { useLanguage } from '@/hooks';
import { FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';

export const ProductAssurances: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="pdp-assurances-box glass-panel">
      <div className="assurance-item">
        <FiTruck className="assurance-icon" />
        <div>
          <strong>
            {isRTL ? 'شحن سريع ومجاني' : 'Complimentary Express Delivery'}
          </strong>
          <span>
            {isRTL
              ? 'تغليف هدايا فاخر وتوصيل آمن حتى باب منزلك.'
              : 'Orders dispatched within 24 hours in luxury signature packaging.'}
          </span>
        </div>
      </div>
      <div className="assurance-item">
        <FiRefreshCw className="assurance-icon" />
        <div>
          <strong>
            {isRTL ? 'استبدال واسترجاع ميسر' : '14-Day Hassle-Free Returns'}
          </strong>
          <span>
            {isRTL
              ? 'ضمان كامل للمشتريات مع إمكانية المعاينة عند الاستلام.'
              : 'Complimentary return courier collection with every order.'}
          </span>
        </div>
      </div>
      <div className="assurance-item">
        <FiShield className="assurance-icon" />
        <div>
          <strong>
            {isRTL ? 'أصالة وجودة مضمونة 100%' : '100% Certified Authenticity'}
          </strong>
          <span>
            {isRTL
              ? 'خامات طبيعية إيطالية مفحوصة بدقة لضمان أعلى معايير الفخامة.'
              : 'Hand-inspected with certified raw material provenance.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductAssurances;
