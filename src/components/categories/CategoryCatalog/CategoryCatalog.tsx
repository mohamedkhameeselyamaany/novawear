'use client';

import React, { useState, useMemo } from 'react';
import { Product, MainCategory, AccessoriesGender } from '@/types/product';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import SubcategoryPills from './SubcategoryPills';
import FilterToolbar from './FilterToolbar';
import { useLanguage } from '@/hooks';
import './CategoryCatalog.css';

interface CategoryCatalogProps {
  title: string;
  titleAr?: string;
  subtitle: string;
  subtitleAr?: string;
  category: MainCategory;
  initialProducts: Product[];
  subcategories: string[];
  genderTabOptions?: { id: AccessoriesGender; label: string; labelAr?: string }[];
}

export const CategoryCatalog: React.FC<CategoryCatalogProps> = ({
  title,
  titleAr,
  subtitle,
  subtitleAr,
  category,
  initialProducts,
  subcategories,
  genderTabOptions,
}) => {
  const { isRTL } = useLanguage();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<AccessoriesGender | 'all'>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(650);

  // Extract all available colors from initial products
  const availableColors = useMemo(() => {
    const colorsSet = new Set<string>();
    initialProducts.forEach((p) => {
      p.colors?.forEach((c) => colorsSet.add(c));
    });
    return Array.from(colorsSet);
  }, [initialProducts]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Gender filter (for accessories)
    if (category === 'accessories' && selectedGender !== 'all') {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Color filter
    if (selectedColor !== 'all') {
      result = result.filter((p) => p.colors?.includes(selectedColor));
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }

    return result;
  }, [initialProducts, category, selectedGender, selectedSubcategory, maxPrice, selectedColor, sortBy]);

  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedGender('all');
    setSelectedColor('all');
    setMaxPrice(650);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedSubcategory !== 'all' ||
    selectedGender !== 'all' ||
    selectedColor !== 'all' ||
    maxPrice < 650;

  const displayTitle = isRTL && titleAr ? titleAr : title;
  const displaySubtitle = isRTL && subtitleAr ? subtitleAr : subtitle;

  return (
    <div className="catalog-wrapper container">
      {/* Page Header - Centered for Phase 10 */}
      <div className="catalog-header text-center">
        <span className="catalog-breadcrumb">
          {isRTL ? 'نوفا وير / التشكيلات الفاخرة' : 'NOVA WEAR / COLLECTIONS'}
        </span>
        <h1 className="catalog-title gold-gradient-text">{displayTitle}</h1>
        <p className="catalog-subtitle">{displaySubtitle}</p>
        <div className="catalog-gold-line mx-auto" />
      </div>

      {/* Gender Sub-Tabs (Exclusively for Accessories category) */}
      {genderTabOptions && genderTabOptions.length > 0 && (
        <div className="gender-tabs-strip">
          <button
            type="button"
            className={`gender-tab-btn ${selectedGender === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGender('all')}
          >
            {isRTL
              ? `كافة الإكسسوارات (${initialProducts.length})`
              : `All Accessories (${initialProducts.length})`}
          </button>
          {genderTabOptions.map((g) => {
            const count = initialProducts.filter((p) => p.gender === g.id).length;
            const tabLabel = isRTL && g.labelAr ? g.labelAr : g.label;
            return (
              <button
                key={g.id}
                type="button"
                className={`gender-tab-btn ${selectedGender === g.id ? 'active' : ''}`}
                onClick={() => setSelectedGender(g.id)}
              >
                {tabLabel} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Subcategory Pills Component */}
      <SubcategoryPills
        subcategories={subcategories}
        selectedSubcategory={selectedSubcategory}
        onSelectSubcategory={(subcat) => setSelectedSubcategory(subcat)}
      />

      {/* Filter and Sort Toolbar Component */}
      <FilterToolbar
        productCount={filteredProducts.length}
        availableColors={availableColors}
        selectedColor={selectedColor}
        maxPrice={maxPrice}
        sortBy={sortBy}
        hasActiveFilters={hasActiveFilters}
        onSelectColor={(color) => setSelectedColor(color)}
        onChangeMaxPrice={(price) => setMaxPrice(price)}
        onSelectSort={(sort) => setSortBy(sort)}
        onResetFilters={resetFilters}
      />

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="catalog-products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty-state glass-panel">
          <div className="empty-icon-wrap">✧</div>
          <h3>
            {isRTL
              ? 'لم يتم العثور على قطع تطابق معايير التصفية'
              : 'No creations found matching your criteria'}
          </h3>
          <p>
            {isRTL
              ? 'يرجى تجربة تعديل نطاق السعر، أو اختيار فئة فرعية أخرى، أو مسح فلاتر الألوان.'
              : 'Try adjusting your price range, subcategory, or active color filters.'}
          </p>
          <button type="button" className="btn btn-primary" onClick={resetFilters}>
            {isRTL ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCatalog;
