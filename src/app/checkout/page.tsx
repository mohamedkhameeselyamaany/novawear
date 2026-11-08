'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, useCurrency, useLanguage, useToast } from '@/hooks';
import OrderConfirmationModal from '@/components/checkout/OrderConfirmationModal';
import {
  FiLock,
  FiCreditCard,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiSend,
  FiDollarSign,
  FiCheck,
} from 'react-icons/fi';
import './checkout.css';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { isRTL, t } = useLanguage();
  const { success, warning } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Egypt',
    city: '',
    address: '',
    deliveryNotes: '',
    paymentMethod: 'vodafone_cash', // Default Egyptian payment method
    // Mobile wallets / IPN details
    senderWallet: '',
    instapayRef: '',
    // Card fields
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState('');
  const [finalOrderSummary, setFinalOrderSummary] = useState<{
    itemsCount: number;
    total: number;
  } | null>(null);

  const subtotal = getCartTotal();
  const freeShippingThreshold = 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const tax = (subtotal + shippingCost) * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim()
    ) {
      warning(
        isRTL
          ? 'يرجى إكمال جميع حقول الشحن والتوصيل المطلوبة (*).'
          : 'Please complete all mandatory shipping address fields (*).'
      );
      return;
    }

    // Specific Payment Validations
    if (formData.paymentMethod === 'vodafone_cash' && !formData.senderWallet.trim()) {
      warning(
        isRTL
          ? 'يرجى إدخال رقم المحفظة التي قمت بالتحويل منها.'
          : 'Please enter your sender Vodafone Cash wallet number.'
      );
      return;
    }

    if (formData.paymentMethod === 'instapay' && !formData.instapayRef.trim()) {
      warning(
        isRTL
          ? 'يرجى إدخال الرقم المرجعي أو اسم الحساب المحول منه عبر إنستاباي.'
          : 'Please enter your InstaPay transaction reference or sender name.'
      );
      return;
    }

    if (
      (formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'meeza') &&
      (!formData.cardNumber.trim() ||
        !formData.cardName.trim() ||
        !formData.cardExpiry.trim() ||
        !formData.cardCvv.trim())
    ) {
      warning(
        isRTL
          ? 'يرجى إدخال كافة بيانات البطاقة البنكية المطلوبة.'
          : 'Please enter all mandatory payment card credentials.'
      );
      return;
    }

    setIsSubmitting(true);

    // Realistic processing simulation
    setTimeout(() => {
      const generatedOrderNum = 'NW-' + Math.floor(100000 + Math.random() * 900000);
      setCompletedOrderNumber(generatedOrderNum);
      setFinalOrderSummary({
        itemsCount: cart.reduce((c, i) => c + i.quantity, 0),
        total,
      });
      clearCart();
      setIsSubmitting(false);
      setOrderCompleted(true);
      success(
        isRTL ? 'تم تسجيل وتأكيد طلبك بنجاح!' : 'Your order has been placed successfully!'
      );
    }, 1200);
  };

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="checkout-page-root container">
        <div className="empty-checkout-box glass-panel">
          <FiShoppingBag className="empty-ico" />
          <h2>{isRTL ? 'سلة المشتريات فارغة' : 'YOUR SHOPPING BAG IS EMPTY'}</h2>
          <p>
            {isRTL
              ? 'يرجى إضافة قطع فاخرة إلى سلتك قبل المتابعة لإتمام الطلب والدفع.'
              : 'Please add creations to your bag before proceeding to checkout.'}
          </p>
          <Link href="/men" className="btn btn-primary mt-3">
            {isRTL ? 'استكشف المجموعات' : 'EXPLORE COLLECTIONS'}
          </Link>
        </div>
      </div>
    );
  }

  // Order Confirmation View
  if (orderCompleted && finalOrderSummary) {
    return (
      <div className="checkout-page-root container">
        <OrderConfirmationModal
          orderNumber={completedOrderNumber}
          fullName={formData.fullName}
          email={formData.email}
          address={formData.address}
          city={formData.city}
          country={formData.country}
          itemsCount={finalOrderSummary.itemsCount}
          total={finalOrderSummary.total}
          paymentMethod={formData.paymentMethod}
          paymentReference={
            formData.paymentMethod === 'vodafone_cash'
              ? formData.senderWallet
              : formData.paymentMethod === 'instapay'
              ? formData.instapayRef
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="checkout-page-root container">
      <div className="checkout-header">
        <span className="checkout-breadcrumb">
          {isRTL ? 'نوفا وير / إتمام الشراء الآمن' : 'NOVA WEAR / SECURE CHECKOUT'}
        </span>
        <h1 className="checkout-title gold-gradient-text">
          {isRTL ? 'إتمام الشراء والدفع' : 'SECURE CHECKOUT'}
        </h1>
        <p className="checkout-subtitle">
          {isRTL
            ? 'أدخل بيانات التوصيل واختر وسيلة الدفع المناسبة لإتمام طلبك'
            : 'Complete your delivery and payment details in our encrypted terminal.'}
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="checkout-split-grid">
        {/* Left Column: Delivery & Payment Details */}
        <div className="checkout-form-column">
          {/* Step 1: Shipping Address */}
          <section className="form-card glass-panel">
            <div className="card-heading-row">
              <span className="step-num">1</span>
              <h2 className="card-title">
                {isRTL ? 'بيانات الشحن وعنوان التسليم' : 'SHIPPING DESTINATION'}
              </h2>
            </div>

            <div className="form-fields-grid">
              <div className="field-group full-width">
                <label className="field-label">
                  {isRTL ? 'الاسم الكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder={isRTL ? 'مثال: أحمد محمد علي' : 'e.g. Johnathan Doe'}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {isRTL ? 'رقم الهاتف المحمول *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder={isRTL ? '01012345678 أو 01212345678' : '+20 1012345678'}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {isRTL ? 'الدولة *' : 'Country *'}
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="checkout-input"
                >
                  <option value="Egypt">{isRTL ? 'مصر (Egypt)' : 'Egypt'}</option>
                  <option value="United Arab Emirates">
                    {isRTL ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}
                  </option>
                  <option value="Saudi Arabia">
                    {isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
                  </option>
                  <option value="Kuwait">{isRTL ? 'الكويت' : 'Kuwait'}</option>
                  <option value="International">
                    {isRTL ? 'شحن دولي (دولة أخرى)' : 'International Destination'}
                  </option>
                </select>
              </div>

              <div className="field-group">
                <label className="field-label">
                  {isRTL ? 'المدينة / المحافظة *' : 'City / Governorate *'}
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder={isRTL ? 'مثال: القاهرة، الجيزة، الإسكندرية...' : 'e.g. Cairo, Giza, Alexandria'}
                  value={formData.city}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="field-group full-width">
                <label className="field-label">
                  {isRTL ? 'العنوان بالتفصيل *' : 'Street Address *'}
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder={
                    isRTL
                      ? 'اسم الشارع، رقم العمارة، رقم الشقة، علامة مميزة'
                      : 'Street name, building number, apartment/suite, prominent landmark'
                  }
                  value={formData.address}
                  onChange={handleInputChange}
                  className="checkout-input"
                />
              </div>

              <div className="field-group full-width">
                <label className="field-label">
                  {isRTL ? 'ملاحظات إضافية للتوصيل (اختياري)' : 'Delivery Instructions (Optional)'}
                </label>
                <textarea
                  name="deliveryNotes"
                  rows={2}
                  placeholder={
                    isRTL
                      ? 'أي تعليمات خاصة لمندوب الشحن أو مواعيد التسليم المفضلة...'
                      : 'Special notes for the courier or preferred delivery hours...'
                  }
                  value={formData.deliveryNotes}
                  onChange={handleInputChange}
                  className="checkout-input checkout-textarea"
                />
              </div>
            </div>
          </section>

          {/* Step 2: Payment Method Selection */}
          <section className="form-card glass-panel">
            <div className="card-heading-row">
              <span className="step-num">2</span>
              <h2 className="card-title">
                {isRTL ? 'اختيار وسيلة الدفع' : 'PAYMENT METHOD'}
              </h2>
            </div>

            <div className="payment-options-grid">
              {/* Vodafone Cash */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === 'vodafone_cash' ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="vodafone_cash"
                  checked={formData.paymentMethod === 'vodafone_cash'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <FiSmartphone className="pay-option-icon" />
                <div className="pay-option-text">
                  <strong>{isRTL ? 'فودافون كاش (Vodafone Cash)' : 'Vodafone Cash'}</strong>
                  <span>{isRTL ? 'تحويل فوري عبر المحفظة' : 'Instant mobile wallet transfer'}</span>
                </div>
              </label>

              {/* InstaPay */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === 'instapay' ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="instapay"
                  checked={formData.paymentMethod === 'instapay'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <FiSend className="pay-option-icon" />
                <div className="pay-option-text">
                  <strong>{isRTL ? 'إنستاباي (InstaPay IPN)' : 'InstaPay Direct IPN'}</strong>
                  <span>{isRTL ? 'تحويل لحظي مباشر للبنك' : 'Instant bank network transfer'}</span>
                </div>
              </label>

              {/* BeePay */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === 'beepay' ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="beepay"
                  checked={formData.paymentMethod === 'beepay'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <span className="pay-badge-code">BEE</span>
                <div className="pay-option-text">
                  <strong>{isRTL ? 'بي باي (BeePay)' : 'BeePay Merchant'}</strong>
                  <span>{isRTL ? 'سداد بمنافذ Bee المعتمدة' : 'Pay at certified BeePay outlets'}</span>
                </div>
              </label>

              {/* Meeza Card */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === 'meeza' ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="meeza"
                  checked={formData.paymentMethod === 'meeza'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <span className="pay-badge-code">MEEZA</span>
                <div className="pay-option-text">
                  <strong>{isRTL ? 'بطاقة ميزة الوطنية' : 'Meeza National Card'}</strong>
                  <span>{isRTL ? 'دفع إلكتروني مباشر' : 'Egypt national debit card'}</span>
                </div>
              </label>

              {/* Visa / MasterCard */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === 'credit_card' ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <FiCreditCard className="pay-option-icon" />
                <div className="pay-option-text">
                  <strong>{isRTL ? 'فيزا / ماستركارد' : 'Visa / Mastercard'}</strong>
                  <span>{isRTL ? 'بوابة دفع بنكية مشفرة' : 'Encrypted 256-bit gateway'}</span>
                </div>
              </label>

              {/* Cash On Delivery */}
              <label
                className={`payment-option-card ${
                  formData.paymentMethod === 'cod' ? 'active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <FiDollarSign className="pay-option-icon" />
                <div className="pay-option-text">
                  <strong>{isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery (COD)'}</strong>
                  <span>{isRTL ? 'سداد نقدي عند وصول الشحنة' : 'Pay upon courier arrival'}</span>
                </div>
              </label>
            </div>

            {/* Dynamic Payment Method Instructions / Inputs */}
            {formData.paymentMethod === 'vodafone_cash' && (
              <div className="payment-instructions-box glass-panel animate-fade-in">
                <div className="instructions-header">
                  <FiSmartphone className="gold-text" />
                  <strong>
                    {isRTL ? 'تعليمات السداد عبر فودافون كاش:' : 'Vodafone Cash Instructions:'}
                  </strong>
                </div>
                <p className="instructions-text">
                  {isRTL
                    ? 'يرجى تحويل إجمالي قيمة الطلب إلى رقم المحفظة الرسمي المعتمد لمتجر نوفا وير: '
                    : 'Please transfer the exact total order amount to our verified merchant wallet: '}
                  <strong className="gold-text">01274664643</strong>
                </p>
                <div className="field-group full-width mt-2">
                  <label className="field-label">
                    {isRTL ? 'رقم المحفظة المُحوّل منها *' : 'Sender Wallet Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    name="senderWallet"
                    required
                    placeholder={isRTL ? 'مثال: 010xxxxxxxx' : '010xxxxxxxx or 012xxxxxxxx'}
                    value={formData.senderWallet}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
              </div>
            )}

            {formData.paymentMethod === 'instapay' && (
              <div className="payment-instructions-box glass-panel animate-fade-in">
                <div className="instructions-header">
                  <FiSend className="gold-text" />
                  <strong>
                    {isRTL ? 'تعليمات السداد عبر إنستاباي:' : 'InstaPay Instructions:'}
                  </strong>
                </div>
                <p className="instructions-text">
                  {isRTL
                    ? 'يرجى إرسال المبلغ عبر تطبيق InstaPay إلى المعرف: '
                    : 'Send payment via InstaPay app to IPA address: '}
                  <strong className="gold-text">novawear@instapay</strong>
                  {isRTL ? ' أو إلى رقم الهاتف: ' : ' or mobile: '}
                  <strong className="gold-text">01274664643</strong>
                </p>
                <div className="field-group full-width mt-2">
                  <label className="field-label">
                    {isRTL ? 'اسم الحساب أو الرقم المرجعي للتحويل *' : 'Sender Account Name / Reference ID *'}
                  </label>
                  <input
                    type="text"
                    name="instapayRef"
                    required
                    placeholder={isRTL ? 'اسم صاحب الحساب أو كود العملية' : 'Account name or transaction ID'}
                    value={formData.instapayRef}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
              </div>
            )}

            {formData.paymentMethod === 'beepay' && (
              <div className="payment-instructions-box glass-panel animate-fade-in">
                <p className="instructions-text">
                  {isRTL
                    ? 'توجه لأي منفذ أو ماكينة BeePay واطلب السداد لحساب تاجر NOVA WEAR بكود الخدمة: '
                    : 'Visit any certified BeePay terminal and quote merchant NOVA WEAR payment code: '}
                  <strong className="gold-text">88902</strong>
                </p>
              </div>
            )}

            {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'meeza') && (
              <div className="card-details-box animate-fade-in">
                <div className="field-group full-width">
                  <label className="field-label">
                    {isRTL ? 'الاسم كما هو مدون على البطاقة *' : 'Name on Card *'}
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    required
                    placeholder="Ahmed M. Ali"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>

                <div className="field-group full-width">
                  <label className="field-label">
                    {isRTL ? 'رقم البطاقة البنكية *' : 'Card Number *'}
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    placeholder="•••• •••• •••• 4242"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">
                    {isRTL ? 'تاريخ الانتهاء (MM/YY) *' : 'Expiry (MM/YY) *'}
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    required
                    placeholder="12/28"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">
                    {isRTL ? 'رمز الأمان (CVV) *' : 'CVV / CVC *'}
                  </label>
                  <input
                    type="password"
                    name="cardCvv"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={formData.cardCvv}
                    onChange={handleInputChange}
                    className="checkout-input"
                  />
                </div>
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div className="payment-instructions-box glass-panel animate-fade-in">
                <p className="instructions-text">
                  {isRTL
                    ? 'سيتم تحصيل إجمالي قيمة الطلب نقداً بواسطة مندوب الشحن والتوصيل عند استلام الشحنة وتفحص القطع.'
                    : 'The total order amount will be settled in cash directly with the courier upon delivery and inspection.'}
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Order Review */}
        <div className="checkout-summary-column">
          <div className="summary-sticky-card glass-panel">
            <h3 className="summary-title">
              {isRTL ? `ملخص الطلب (${cart.length} قطع)` : `BAG REVIEW (${cart.length})`}
            </h3>

            <div className="checkout-items-mini-list">
              {cart.map((item, idx) => (
                <div key={idx} className="mini-item-row">
                  <div className="mini-item-img-frame">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={55}
                      height={70}
                      className="mini-img"
                    />
                  </div>
                  <div className="mini-item-info">
                    <h4 className="mini-name">{item.name}</h4>
                    <span className="mini-meta">
                      {isRTL
                        ? `الكمية: ${item.quantity} ${item.selectedSize ? `| المقاس: ${item.selectedSize}` : ''}`
                        : `Qty: ${item.quantity} ${item.selectedSize ? `| Size: ${item.selectedSize}` : ''}`}
                    </span>
                    <span className="mini-price gold-text">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="checkout-math-box">
              <div className="math-row">
                <span>{isRTL ? 'المجموع الجزئي' : 'Subtotal'}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="math-row">
                <span>{isRTL ? 'الشحن والتوصيل' : 'Express Courier Shipping'}</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="free-text">{isRTL ? 'مجاني' : 'FREE'}</strong>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="math-row">
                <span>{isRTL ? 'الضريبة التقديرية (10%)' : 'Estimated VAT / Tax (10%)'}</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="summary-divider" />
              <div className="math-row total-row">
                <span>{isRTL ? 'المجموع الإجمالي' : 'Order Total'}</span>
                <span className="total-gold-num">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary place-order-btn"
            >
              {isSubmitting ? (
                <span>{isRTL ? 'جاري معالجة الطلب...' : 'PROCESSING ORDER...'}</span>
              ) : (
                <>
                  <FiLock />{' '}
                  {isRTL
                    ? `تأكيد وإتمام الطلب (${formatPrice(total)})`
                    : `PLACE ORDER (${formatPrice(total)})`}
                </>
              )}
            </button>

            <div className="checkout-footer-notes">
              <FiShield className="gold-text" />
              <p>
                {isRTL
                  ? 'جميع المعاملات مؤمنة ومشفرة بأعلى معايير 256-Bit SSL. يتم تأكيد الطلبات فور مراجعة تفاصيل التحويل.'
                  : 'All transactions are strictly encrypted with 256-Bit SSL. Orders are confirmed upon reconciliation.'}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
