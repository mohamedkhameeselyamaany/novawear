'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrency, useLanguage, useToast } from '@/hooks';
import { FiTag, FiArrowRight, FiShield } from 'react-icons/fi';

interface CartSummaryCardProps {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  discountPercent: number;
  discountAmount: number;
  onApplyDiscount: (percent: number) => void;
}

export const CartSummaryCard: React.FC<CartSummaryCardProps> = ({
  subtotal,
  shippingCost,
  tax,
  total,
  discountPercent,
  discountAmount,
  onApplyDiscount,
}) => {
  const { formatPrice } = useCurrency();
  const { isRTL } = useLanguage();
  const { success, warning } = useToast();
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'NOVA20' || code === 'SUMMER2026') {
      onApplyDiscount(20);
      success(isRTL ? 'تم تطبيق خصم 20% بنجاح!' : '20% VIP promotion successfully applied!');
    } else if (code === 'GOLD10') {
      onApplyDiscount(10);
      success(isRTL ? 'تم تطبيق خصم 10% بنجاح!' : '10% VIP promotion successfully applied!');
    } else {
      warning(isRTL ? 'رمز القسيمة غير صحيح أو منتهي الصلاحية.' : 'Invalid or expired promotional code.');
    }
  };

  return (
    <div className="summary-card glass-panel">
      <h2 className="summary-title">{isRTL ? 'ملخص الحساب' : 'ORDER SUMMARY'}</h2>

      {/* Promo Code Form */}
      <form onSubmit={handleApplyPromo} className="promo-input-group">
        <div className="promo-input-wrap">
          <FiTag className="promo-tag-icon" />
          <input
            type="text"
            placeholder={isRTL ? 'كود الخصم (مثال: NOVA20)' : 'Promo Code (e.g. NOVA20)'}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="promo-input"
            aria-label="Promotional Code"
          />
        </div>
        <button type="submit" className="btn btn-outline promo-apply-btn">
          {isRTL ? 'تطبيق' : 'APPLY'}
        </button>
      </form>

      <div className="summary-breakdown">
        <div className="summary-row">
          <span>{isRTL ? 'المجموع الجزئي' : 'Subtotal'}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discountPercent > 0 && (
          <div className="summary-row discount-row">
            <span>{isRTL ? `خصم خاص (${discountPercent}%)` : `VIP Discount (${discountPercent}%)`}</span>
            <span className="discount-amount">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>{isRTL ? 'الشحن السريع المقدر' : 'Estimated Express Shipping'}</span>
          <span>
            {shippingCost === 0 ? (
              <strong className="free-shipping-text">{isRTL ? 'مجاني' : 'FREE'}</strong>
            ) : (
              formatPrice(shippingCost)
            )}
          </span>
        </div>

        <div className="summary-row">
          <span>{isRTL ? 'ضريبة القيمة المضافة (10%)' : 'Estimated VAT / Tax (10%)'}</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="summary-divider" />

        <div className="summary-row summary-total-row">
          <span>{isRTL ? 'المجموع الإجمالي' : 'Estimated Total'}</span>
          <span className="total-gold-price">{formatPrice(total)}</span>
        </div>
      </div>

      <Link href="/checkout" className="btn btn-primary checkout-btn">
        <span>{isRTL ? 'المتابعة للدفع وإتمام الطلب' : 'PROCEED TO CHECKOUT'}</span>
        <FiArrowRight style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
      </Link>

      <div className="checkout-trust-guarantee">
        <FiShield className="trust-shield-icon" />
        <span>
          {isRTL
            ? 'دفع مشفر بأعلى معايير الأمان 256-Bit SSL وضمان أصالة 100%'
            : '256-Bit SSL Encrypted Checkout & 100% Authentic Guarantee'}
        </span>
      </div>
    </div>
  );
};

export default CartSummaryCard;
