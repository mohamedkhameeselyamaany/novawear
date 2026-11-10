'use client';

import React from 'react';
import { useLanguage, useCurrency } from '@/hooks';
import { getProductColor } from '@/utils/localizedProduct';
import { FiX } from 'react-icons/fi';

interface FilterToolbarProps {
  productCount: number;
  availableColors: string[];
  selectedColor: string;
  maxPrice: number;
  sortBy: string;
  hasActiveFilters: boolean;
  onSelectColor: (color: string) => void;
  onChangeMaxPrice: (price: number) => void;
  onSelectSort: (sort: string) => void;
  onResetFilters: () => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  productCount,
  availableColors,
  selectedColor,
  maxPrice,
  sortBy,
  hasActiveFilters,
  onSelectColor,
  onChangeMaxPrice,
  onSelectSort,
  onResetFilters,
}) => {
  const { isRTL } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <div className="catalog-toolbar glass-panel">
      <div className="toolbar-left">
        <span className="product-count-label">
          {isRTL ? (
            <>
              عرض <strong>{productCount}</strong> قطعة فاخرة
            </>
          ) : (
            <>
              Showing <strong>{productCount}</strong> creations
            </>
          )}
        </span>
        {hasActiveFilters && (
          <button type="button" className="clear-filters-btn" onClick={onResetFilters}>
            <FiX /> {isRTL ? 'إلغاء الفلاتر' : 'Reset Filters'}
          </button>
        )}
      </div>

      <div className="toolbar-right">
        {/* Color Selector */}
        {availableColors.length > 0 && (
          <div className="select-wrapper">
            <select
              value={selectedColor}
              onChange={(e) => onSelectColor(e.target.value)}
              className="toolbar-select"
              aria-label="Filter by color"
            >
              <option value="all">{isRTL ? 'كافة الألوان' : 'All Colors'}</option>
              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {getProductColor(color, isRTL)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price Range Slider */}
        <div className="price-slider-group">
          <label className="price-slider-label">
            {isRTL ? `أقصى سعر: ${formatPrice(maxPrice)}` : `Max Price: ${formatPrice(maxPrice)}`}
          </label>
          <input
            type="range"
            min="30"
            max="650"
            step="10"
            value={maxPrice}
            onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
            className="price-range-input"
            aria-label="Filter by maximum price"
          />
        </div>

        {/* Sort Selector */}
        <div className="select-wrapper">
          <select
            value={sortBy}
            onChange={(e) => onSelectSort(e.target.value)}
            className="toolbar-select sort-select"
            aria-label="Sort products"
          >
            <option value="featured">
              {isRTL ? 'المميز / الأكثر طلباً' : 'Featured / Bestsellers'}
            </option>
            <option value="price-low">
              {isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
            </option>
            <option value="price-high">
              {isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
            </option>
            <option value="rating">{isRTL ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
            <option value="newest">{isRTL ? 'الأحدث وصولاً' : 'New Arrivals'}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
