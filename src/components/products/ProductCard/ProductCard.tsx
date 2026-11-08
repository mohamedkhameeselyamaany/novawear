'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart, useWishlist, useCurrency, useToast, useLanguage } from '@/hooks';
import { FiHeart, FiShoppingBag, FiStar, FiCheck } from 'react-icons/fi';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { success, info } = useToast();
  const { t, isRTL } = useLanguage();

  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved) {
      removeFromWishlist(product.id);
      info(`${product.name} removed from your wishlist.`);
    } else {
      addToWishlist(product);
      success(`${product.name} saved to your wishlist!`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) return;

    setIsAdding(true);
    addToCart(
      product,
      1,
      product.sizes?.[0] || 'Standard',
      product.colors?.[0] || 'Default'
    );
    success(`Added ${product.name} to your shopping bag.`);
    setJustAdded(true);

    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setJustAdded(false), 1500);
    }, 400);
  };

  return (
    <article className="product-card glass-panel" aria-label={product.name}>
      <Link href={`/product/${product.id}`} className="product-card-inner">
        {/* Image Container with Badges */}
        <div className="product-image-box">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={520}
            className="product-img"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges Container */}
          <div className="product-badges-corner">
            {product.discount && (
              <span className="badge badge-discount">-{product.discount}%</span>
            )}
            {product.new && (
              <span className="badge badge-new">{isRTL ? 'جديد' : 'NEW'}</span>
            )}
            {product.bestseller && (
              <span className="badge badge-bestseller">
                {isRTL ? 'الأكثر طلباً' : 'BESTSELLER'}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            className={`wishlist-corner-btn ${isSaved ? 'saved' : ''}`}
            onClick={handleWishlistToggle}
            title={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <FiHeart size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          {/* Hover Quick Add Overlay */}
          <div className="quick-add-overlay">
            <button
              type="button"
              className={`quick-add-btn ${justAdded ? 'added' : ''}`}
              onClick={handleQuickAdd}
              disabled={!product.inStock || isAdding}
            >
              {justAdded ? (
                <>
                  <FiCheck /> {t('common.added', 'ADDED')}
                </>
              ) : (
                <>
                  <FiShoppingBag /> {product.inStock ? t('products.quickAdd', 'QUICK ADD') : t('common.outOfStock', 'OUT OF STOCK')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Meta & Info */}
        <div className="product-info-box">
          <div className="product-cat-row">
            <span className="product-subcategory">{product.subcategory}</span>
            <div className="product-rating">
              <FiStar className="star-icon" size={14} />
              <span className="rating-num">{product.rating.toFixed(1)}</span>
              <span className="reviews-num">({product.reviews})</span>
            </div>
          </div>

          <h3 className="product-title">{product.name}</h3>

          <div className="product-price-row">
            <span className="current-price gold-text">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="old-price">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;

