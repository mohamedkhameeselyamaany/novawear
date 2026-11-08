'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrency, useLanguage } from '@/hooks';
import { FiCheckCircle, FiClock, FiShield } from 'react-icons/fi';

interface OrderConfirmationModalProps {
  orderNumber: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  itemsCount: number;
  total: number;
  paymentMethod: string;
  paymentReference?: string;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderNumber,
  fullName,
  email,
  address,
  city,
  country,
  itemsCount,
  total,
  paymentMethod,
  paymentReference,
}) => {
  const { formatPrice } = useCurrency();
  const { isRTL } = useLanguage();

  const isManualTransfer =
    paymentMethod === 'vodafone_cash' ||
    paymentMethod === 'instapay' ||
    paymentMethod === 'beepay';

  const isCOD = paymentMethod === 'cod';

  const getPaymentName = () => {
    switch (paymentMethod) {
      case 'vodafone_cash':
        return isRTL ? 'فودافون كاش (Vodafone Cash)' : 'Vodafone Cash Wallet';
      case 'instapay':
        return isRTL ? 'إنستاباي (InstaPay IPN)' : 'InstaPay Direct IPN';
      case 'beepay':
        return isRTL ? 'بي باي (BeePay)' : 'BeePay Merchant Network';
      case 'meeza':
        return isRTL ? 'بطاقة ميزة الوطنية' : 'Meeza National Debit Card';
      case 'credit_card':
        return isRTL ? 'بطاقة فيزا / ماستركارد' : 'Visa / Mastercard';
      case 'cod':
        return isRTL ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery (COD)';
      default:
        return paymentMethod;
    }
  };

  const getOrderStatus = () => {
    if (isManualTransfer) {
      return {
        label: isRTL ? 'طلب مسجل — بانتظار مطابقة التحويل' : 'Order Placed — Pending Transfer Verification',
        icon: <FiClock className="gold-text" />,
        isPending: true,
      };
    }
    if (isCOD) {
      return {
        label: isRTL ? 'طلب مؤكد — الدفع عند الاستلام' : 'Order Confirmed — Cash on Delivery',
        icon: <FiCheckCircle className="gold-text" />,
        isPending: false,
      };
    }
    return {
      label: isRTL ? 'تم تأكيد الطلب واعتماد الدفع' : 'Payment Authorized — Order Confirmed',
      icon: <FiShield className="gold-text" />,
      isPending: false,
    };
  };

  const status = getOrderStatus();

  return (
    <div className="order-success-modal glass-panel animate-fade-in">
      <div className="success-badge-wrap">
        <FiCheckCircle className="check-gold-icon" />
      </div>

      <span className="order-confirmation-tag">
        {isRTL ? 'تم تسجيل طلبك بنجاح' : 'ORDER PLACED SUCCESSFULLY'}
      </span>
      <h1 className="success-title">
        {isRTL ? `شكراً لاختيارك نوفا وير، ${fullName}` : `THANK YOU, ${fullName.toUpperCase()}`}
      </h1>

      <p className="order-number-banner">
        {isRTL ? 'الرقم المرجعي للطلب:' : 'Order Reference:'}{' '}
        <strong className="gold-text">{orderNumber}</strong>
      </p>

      <div className="order-status-notice glass-panel">
        <div className="status-header-row">
          {status.icon}
          <strong>{status.label}</strong>
        </div>
        <p className="status-details-text">
          {isManualTransfer
            ? isRTL
              ? `تم تسجيل بيانات التحويل عبر ${getPaymentName()}${
                  paymentReference ? ` (المرجع: ${paymentReference})` : ''
                }. سيقوم فريقنا بمطابقة التحويل وتأكيد الشحن خلال 30 دقيقة.`
              : `Your transfer reference via ${getPaymentName()}${
                  paymentReference ? ` (${paymentReference})` : ''
                } has been logged. Our concierge will reconcile the transaction within 30 minutes.`
            : isRTL
            ? `تم إرسال تفاصيل فاتورة طلبك كاملة إلى بريدك الإلكتروني ${email}. سيقوم مندوبنا بالتواصل معك هاتفياً قبل موعد التسليم.`
            : `A comprehensive receipt has been dispatched to ${email}. Our courier will contact your mobile prior to scheduled delivery.`}
        </p>
      </div>

      <div className="order-summary-pill-box">
        <div className="pill-item">
          <span>{isRTL ? 'القطع المطلوبة:' : 'Items Ordered:'}</span>
          <strong>{isRTL ? `${itemsCount} قطع` : `${itemsCount} Items`}</strong>
        </div>
        <div className="pill-item">
          <span>{isRTL ? 'وسيلة الدفع:' : 'Payment Method:'}</span>
          <strong className="gold-text">{getPaymentName()}</strong>
        </div>
        <div className="pill-item">
          <span>{isRTL ? 'عنوان التسليم:' : 'Delivery Address:'}</span>
          <strong>
            {address}, {city}, {country}
          </strong>
        </div>
        <div className="pill-item">
          <span>{isRTL ? 'المجموع النهائي المستحق:' : 'Total Payable:'}</span>
          <strong className="gold-text">{formatPrice(total)}</strong>
        </div>
      </div>

      <div className="success-modal-actions">
        <Link href="/" className="btn btn-primary">
          {isRTL ? 'العودة للتسوق في المتجر' : 'RETURN TO BOUTIQUE'}
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
