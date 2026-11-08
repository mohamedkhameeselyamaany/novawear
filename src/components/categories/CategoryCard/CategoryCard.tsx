'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks';
import { FiArrowRight } from 'react-icons/fi';
import './CategoryCard.css';

interface CategoryCardProps {
  name: string;
  subtitle?: string;
  image: string;
  link: string;
  itemCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  subtitle,
  image,
  link,
  itemCount,
}) => {
  const { isRTL } = useLanguage();

  return (
    <Link href={link} className="category-card" aria-label={`Browse ${name}`}>
      <div className="category-image-wrap">
        <Image
          src={image}
          alt={name}
          width={600}
          height={750}
          className="category-bg-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="category-gradient-overlay" />
      </div>

      <div className="category-info-overlay">
        {itemCount !== undefined && (
          <span className="category-item-count">
            {isRTL ? `${itemCount} تصميم` : `${itemCount} STYLES`}
          </span>
        )}
        <h3 className="category-name">{name}</h3>
        {subtitle && <p className="category-desc">{subtitle}</p>}
        <div className="category-explore-pill">
          <span>{isRTL ? 'استكشف التشكيلة' : 'EXPLORE'}</span>
          <FiArrowRight
            className="arrow-icon"
            style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}
          />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
