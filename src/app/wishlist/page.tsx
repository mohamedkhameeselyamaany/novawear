'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist, useCart, useLanguage, useToast } from '@/hooks';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import './wishlist.css';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isRTL, t } = useLanguage();
  const { success, info } = useToast();

  const handleMoveAllToBag = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((p) => {
      addToCart(p, 1, p.sizes?.[0] || 'Standard', p.colors?.[0] || 'Default');
    });
    success(
      isRTL
        ? `تم نقل كافة القطع المحفوظة (${wishlist.length} قطع) إلى سلة المشتريات.`
        : `Transferred all ${wishlist.length} saved creations to your shopping bag.`
    );
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page-wrapper container">
        <div className="wishlist-empty-box glass-panel">
          <div className="empty-heart-icon">
            <FiHeart />
          </div>
          <h1 className="wishlist-empty-title">
            {isRTL ? 'قائمة المفضلة فارغة حالياً' : 'YOUR WISHLIST IS EMPTY'}
          </h1>
          <p className="wishlist-empty-text">
            {isRTL
              ? 'احفظ القطع الفاخرة التي تعجبك هنا لتتمكن من مراجعتها وطلبها في أي وقت.'
              : 'Curate your personal haute couture sanctuary. Save pieces you adore to review anytime.'}
          </p>
          <div className="wishlist-empty-actions">
            <Link href="/men" className="btn btn-primary">
              {isRTL ? 'استكشف أزياء الرجال' : 'EXPLORE MEN'}
            </Link>
            <Link href="/women" className="btn btn-outline">
              {isRTL ? 'استكشف أزياء النساء' : 'EXPLORE WOMEN'}
            </Link>
            <Link href="/accessories" className="btn btn-secondary">
              {isRTL ? 'الإكسسوارات الفاخرة' : 'ACCESSORIES'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page-wrapper container">
      <div className="wishlist-header-row text-center">
        <div>
          <span className="wishlist-breadcrumb">
            {isRTL ? 'نوفا وير / مجموعتك المفضلة' : 'NOVA WEAR / PRIVATE CURATION'}
          </span>
          <h1 className="wishlist-title gold-gradient-text">
            {isRTL ? 'القطع المحفوظة في المفضلة' : 'SAVED CREATIONS'}
          </h1>
          <p className="wishlist-subtitle">
            {isRTL ? (
              <>
                قمت بحفظ <strong>{wishlist.length}</strong> قطعة مميزة في قائمتك المفضلة.
              </>
            ) : (
              <>
                You have saved <strong>{wishlist.length}</strong> exclusive pieces to your wishlist.
              </>
            )}
          </p>
        </div>

        <div className="wishlist-actions-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleMoveAllToBag}
          >
            <FiShoppingBag /> {isRTL ? 'نقل الكل إلى السلة' : 'MOVE ALL TO BAG'}
          </button>
          <button
            type="button"
            className="btn btn-secondary clear-wishlist-btn"
            onClick={() => {
              clearWishlist();
              info(isRTL ? 'تم مسح قائمة المفضلة.' : 'Wishlist cleared.');
            }}
          >
            <FiTrash2 /> {isRTL ? 'مسح المفضلة' : 'CLEAR ALL'}
          </button>
        </div>
      </div>

      <div className="wishlist-products-grid">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
