'use client';

import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  type?: 'card' | 'text' | 'image' | 'avatar' | 'title';
  count?: number;
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  count = 1,
  width,
  height,
}) => {
  const elements = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton skeleton-${type}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  ));

  return <>{elements}</>;
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card skeleton-card-container">
      <div className="skeleton skeleton-image" style={{ aspectRatio: '3 / 4' }} />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        <div className="skeleton skeleton-title" style={{ width: '85%' }} />
        <div className="skeleton skeleton-text" style={{ width: '30%' }} />
      </div>
    </div>
  );
};

export default Skeleton;

