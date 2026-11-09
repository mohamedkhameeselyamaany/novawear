'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, useCurrency, useLanguage, useToast } from '@/hooks';
import { getProductName, getProductSubcategory, getProductColor } from '@/utils/localizedProduct';
import ShippingProgressBar from '@/components/cart/ShippingProgressBar';
import CartSummaryCard from '@/components/cart/CartSummaryCard';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import './cart.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { isRTL, t } = useLanguage();
  const { info } = useToast();

  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const subtotal = getCartTotal();
  const freeShippingThreshold = 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const discountAmount = subtotal * (discountPercent / 100);
  const tax = (subtotal - discountAmount + shippingCost) * 0.1;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper container">
        <div className="cart-empty-box glass-panel">
          <div className="empty-bag-icon">
            <FiShoppingBag />
          </div>
          <h1 className="empty-cart-title">
            {isRTL ? 'سلة المشتريات فارغة حالياً' : 'YOUR SHOPPING BAG IS EMPTY'}
          </h1>
          <p className="empty-cart-text">
            {isRTL
              ? 'استكشف أحدث مجموعاتنا الفاخرة وأضف لمساتك المميزة إلى سلتك.'
              : 'Discover our latest haute couture creations and timeless luxury essentials.'}
          </p>
          <div className="empty-cart-actions">
            <Link href="/men" className="btn btn-primary">
              {isRTL ? 'تسوق أزياء الرجال' : 'SHOP MEN'}
            </Link>
            <Link href="/women" className="btn btn-outline">
              {isRTL ? 'تسوق أزياء النساء' : 'SHOP WOMEN'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper container">
      <div className="cart-header">
        <h1 className="cart-main-title gold-gradient-text">
          {isRTL ? 'سلة المشتريات' : 'SHOPPING BAG'}
        </h1>
        <p className="cart-count-subtitle">
          {isRTL
            ? `مراجعة القطع المختارة (${cart.reduce((c, i) => c + i.quantity, 0)} قطعة)`
            : `Review your selected items (${cart.reduce((c, i) => c + i.quantity, 0)})`}
        </p>
      </div>

      {/* Free Shipping Progress Indicator Component */}
      <ShippingProgressBar subtotal={subtotal} threshold={freeShippingThreshold} />

      <div className="cart-split-layout">
        {/* Left: Cart Items Table */}
        <div className="cart-items-column">
          <div className="cart-items-table-wrap glass-panel">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>{isRTL ? 'المنتج' : 'PRODUCT'}</th>
                  <th>{isRTL ? 'السعر' : 'PRICE'}</th>
                  <th>{isRTL ? 'الكمية' : 'QUANTITY'}</th>
                  <th>{isRTL ? 'الإجمالي' : 'SUBTOTAL'}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}>
                    {/* Product Cell */}
                    <td className="product-col">
                      <div className="item-cell-info">
                        <div className="item-img-wrap">
                          <Image
                            src={item.image}
                            alt={getProductName(item as any, isRTL)}
                            width={90}
                            height={115}
                            className="item-table-img"
                          />
                        </div>
                        <div className="item-details">
                          <Link href={`/product/${item.id}`} className="item-name-link">
                            {getProductName(item as any, isRTL)}
                          </Link>
                          <span className="item-subcat">
                            {getProductSubcategory(item as any, isRTL)}
                          </span>
                          <div className="item-variant-tags">
                            {item.selectedSize && (
                              <span className="variant-tag">
                                {isRTL ? `المقاس: ${item.selectedSize}` : `Size: ${item.selectedSize}`}
                              </span>
                            )}
                            {item.selectedColor && (
                              <span className="variant-tag">
                                {isRTL
                                  ? `اللون: ${getProductColor(item.selectedColor, isRTL, item.id)}`
                                  : `Color: ${item.selectedColor}`}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="price-col">
                      <span className="table-price">{formatPrice(item.price)}</span>
                    </td>

                    {/* Quantity */}
                    <td className="quantity-col">
                      <div className="cart-qty-counter">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cart-qty-num">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Subtotal */}
                    <td className="total-col">
                      <span className="table-subtotal-price gold-text">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </td>

                    {/* Remove Action */}
                    <td className="action-col">
                      <button
                        type="button"
                        className="table-trash-btn"
                        onClick={() => {
                          const itemName = getProductName(item as any, isRTL);
                          removeFromCart(item.id, item.selectedSize, item.selectedColor);
                          info(
                            isRTL
                              ? `تمت إزالة "${itemName}" من حقيبة التسوق.`
                              : `Removed "${itemName}" from your bag.`
                          );
                        }}
                        title={isRTL ? 'إزالة' : 'Remove Item'}
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-footer-actions">
            <Link href="/" className="btn btn-secondary">
              {isRTL ? 'متابعة التسوق' : 'CONTINUE SHOPPING'}
            </Link>
            <button
              type="button"
              className="clear-bag-btn"
              onClick={() => {
                clearCart();
                info(isRTL ? 'تم إفراغ سلة المشتريات.' : 'Shopping bag cleared.');
              }}
            >
              {isRTL ? 'إفراغ السلة بالكامل' : 'Clear Entire Bag'}
            </button>
          </div>
        </div>

        {/* Right: Order Summary Card Component */}
        <div className="order-summary-column">
          <CartSummaryCard
            subtotal={subtotal}
            shippingCost={shippingCost}
            tax={tax}
            total={total}
            discountPercent={discountPercent}
            discountAmount={discountAmount}
            onApplyDiscount={(percent) => setDiscountPercent(percent)}
          />
        </div>
      </div>
    </div>
  );
}
