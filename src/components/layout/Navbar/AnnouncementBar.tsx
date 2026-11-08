'use client';

import React from 'react';
import { useLanguage } from '@/hooks';

export const AnnouncementBar: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        {isRTL ? (
          <>
            <span>✨ شحن سريع ومجاني لكافة الطلبات | تشكيلة شتاء 2026 الحصرية متوفرة الآن</span>
            <span className="announcement-divider">•</span>
            <span>
              استخدم كود الخصم <strong className="gold-code">NOVA20</strong> للحصول على خصم 20%
            </span>
          </>
        ) : (
          <>
            <span>✨ COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER $100 | WINTER 2026 CAPSULE</span>
            <span className="announcement-divider">•</span>
            <span>
              USE CODE <strong className="gold-code">NOVA20</strong> FOR 20% PRIVILEGE
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;
