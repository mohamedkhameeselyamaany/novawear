'use client';

import React from 'react';
import { useCurrency, useLanguage } from '@/hooks';

interface ShippingProgressBarProps {
  subtotal: number;
  threshold?: number;
}

export const ShippingProgressBar: React.FC<ShippingProgressBarProps> = ({
  subtotal,
  threshold = 100,
}) => {
  const { formatPrice } = useCurrency();
  const { isRTL } = useLanguage();
  const progressPercent = Math.min((subtotal / threshold) * 100, 100);
  const remaining = Math.max(0, threshold - subtotal);
  const qualifies = subtotal >= threshold;

  return (
    <div className="shipping-progress-banner glass-panel">
      <p className="shipping-progress-msg">
        {qualifies ? (
          <span className="gold-text font-semibold">
            {isRTL
              ? '✨ تهانينا! طلبك مؤهل الآن للشحن السريع المجاني الفاخر.'
              : '✨ Congratulations! Your order qualifies for Complimentary Express Shipping.'}
          </span>
        ) : (
          <span>
            {isRTL ? (
              <>
                أضف بقيمة <strong className="gold-text">{formatPrice(remaining)}</strong> إضافية للحصول على شحن سريع ومجاني!
              </>
            ) : (
              <>
                Add <strong className="gold-text">{formatPrice(remaining)}</strong> more to unlock Complimentary White-Glove Shipping!
              </>
            )}
          </span>
        )}
      </p>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
};

export default ShippingProgressBar;
