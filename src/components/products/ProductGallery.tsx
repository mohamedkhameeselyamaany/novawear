'use client';

import React from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  productName: string;
  activeImage: string;
  images: string[];
  discount?: number;
  onSelectImage: (img: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  productName,
  activeImage,
  images,
  discount,
  onSelectImage,
}) => {
  return (
    <div className="pdp-gallery-column">
      <div className="main-display-frame glass-panel">
        <Image
          src={activeImage}
          alt={productName}
          width={700}
          height={900}
          priority
          className="main-display-img"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {discount && (
          <span className="pdp-discount-badge">-{discount}% OFF</span>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images && images.length > 1 && (
        <div className="pdp-thumbnails-strip">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
              onClick={() => onSelectImage(img)}
              aria-label={`View angle ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                width={100}
                height={120}
                className="thumbnail-img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;

