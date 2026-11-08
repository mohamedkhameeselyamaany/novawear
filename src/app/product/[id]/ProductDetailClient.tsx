'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart, useWishlist, useCurrency, useLanguage, useToast } from '@/hooks';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import ProductGallery from '@/components/products/ProductGallery';
import ProductAssurances from '@/components/products/ProductAssurances';
import {
  FiHeart,
  FiShoppingBag,
  FiStar,
  FiCheck,
  FiChevronRight,
  FiChevronLeft,
} from 'react-icons/fi';
import './productDetail.css';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { isRTL, t } = useLanguage();
  const { success, info, warning } = useToast();

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const isSaved = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isSaved) {
      removeFromWishlist(product.id);
      info(
        isRTL
          ? `تمت إزالة ${product.name} من قائمة المفضلة.`
          : `${product.name} removed from your wishlist.`
      );
    } else {
      addToWishlist(product);
      success(
        isRTL
          ? `تمت إضافة ${product.name} إلى قائمة المفضلة!`
          : `${product.name} saved to your wishlist!`
      );
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      warning(
        isRTL
          ? 'عذراً، هذه القطعة غير متوفرة في المخزون حالياً.'
          : 'This creation is currently out of stock.'
      );
      return;
    }

    setIsAdding(true);
    addToCart(product, quantity, selectedSize, selectedColor);
    success(
      isRTL
        ? `تمت إضافة (${quantity}) × ${product.name} إلى سلة المشتريات.`
        : `Added ${quantity} × ${product.name} to your shopping bag.`
    );
    setAddedSuccess(true);

    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 400);
  };

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'men':
        return isRTL ? 'أزياء الرجال' : "Men's Fashion";
      case 'women':
        return isRTL ? 'أزياء النساء' : "Women's Fashion";
      case 'children':
        return isRTL ? 'أزياء الأطفال' : "Children's Fashion";
      case 'accessories':
        return isRTL ? 'الإكسسوارات الفاخرة' : 'Fine Accessories';
      default:
        return cat;
    }
  };

  return (
    <div className="product-page-root container">
      {/* Breadcrumb */}
      <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" className="crumb-link">
          {isRTL ? 'الرئيسية' : 'Home'}
        </Link>
        {isRTL ? (
          <FiChevronLeft className="crumb-sep" />
        ) : (
          <FiChevronRight className="crumb-sep" />
        )}
        <Link href={`/${product.category}`} className="crumb-link capitalize">
          {getCategoryName(product.category)}
        </Link>
        {isRTL ? (
          <FiChevronLeft className="crumb-sep" />
        ) : (
          <FiChevronRight className="crumb-sep" />
        )}
        <span className="crumb-current">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="pdp-main-grid">
        {/* Left: Reusable Gallery Subcomponent */}
        <ProductGallery
          productName={product.name}
          activeImage={activeImage}
          images={product.images || [product.image]}
          discount={product.discount}
          onSelectImage={(img) => setActiveImage(img)}
        />

        {/* Right: Info & Purchase Controls */}
        <div className="pdp-info-column">
          <div className="pdp-header">
            <div className="pdp-meta-row">
              <span className="pdp-subcategory-tag">{product.subcategory}</span>
              <div className="pdp-rating">
                <FiStar className="gold-star" />
                <span className="rating-score">{product.rating.toFixed(1)}</span>
                <span className="reviews-count">
                  ({product.reviews} {isRTL ? 'تقييم' : 'reviews'})
                </span>
              </div>
            </div>

            <h1 className="pdp-title">{product.name}</h1>

            <div className="pdp-price-row">
              <span className="pdp-price-current">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="pdp-price-old">{formatPrice(product.oldPrice)}</span>
              )}
              <span className={`pdp-stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock
                  ? isRTL
                    ? '● متوفر في المخزون'
                    : '● In Stock & Ready to Ship'
                  : isRTL
                  ? '● نفدت الكمية'
                  : '● Sold Out'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="pdp-description-box">
            <p>{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="pdp-option-group">
              <label className="option-label">
                {isRTL ? 'اللون المختار:' : 'Color:'} <strong>{selectedColor}</strong>
              </label>
              <div className="color-pills-row">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-pill-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pdp-option-group">
              <div className="size-label-row">
                <label className="option-label">
                  {isRTL ? 'اختر المقاس:' : 'Select Size:'} <strong>{selectedSize}</strong>
                </label>
                <span className="size-guide-link">
                  {isRTL ? 'دليل المقاسات المعتمد' : 'Bespoke Fit Guide'}
                </span>
              </div>
              <div className="size-pills-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-pill-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="pdp-purchase-actions">
            <div className="quantity-counter">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`pdp-add-to-cart-btn ${addedSuccess ? 'success' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
            >
              {addedSuccess ? (
                <>
                  <FiCheck /> {isRTL ? 'تمت الإضافة للسلة' : 'ADDED TO SHOPPING BAG'}
                </>
              ) : (
                <>
                  <FiShoppingBag />{' '}
                  {product.inStock
                    ? isRTL
                      ? 'إضافة إلى سلة المشتريات'
                      : 'ADD TO SHOPPING BAG'
                    : isRTL
                    ? 'غير متوفر حالياً'
                    : 'OUT OF STOCK'}
                </>
              )}
            </button>

            <button
              type="button"
              className={`pdp-wishlist-btn ${isSaved ? 'saved' : ''}`}
              onClick={handleWishlistToggle}
              title={isSaved ? (isRTL ? 'إزالة من المفضلة' : 'Remove from Wishlist') : (isRTL ? 'إضافة للمفضلة' : 'Save to Wishlist')}
              aria-label="Toggle Wishlist"
            >
              <FiHeart size={22} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Reusable Assurances Subcomponent */}
          <ProductAssurances />
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="related-header text-center">
            <span className="section-subtitle">
              {isRTL ? 'مختارات متناسقة' : 'COMPLEMENTARY STYLES'}
            </span>
            <h2 className="section-title">
              {isRTL ? 'قطع وتصاميم قد تعجبك' : 'YOU MAY ALSO DESIRE'}
            </h2>
            <div className="title-gold-bar mx-auto" />
          </div>
          <div className="related-grid">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailClient;
