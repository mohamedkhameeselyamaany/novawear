'use client';

import React from 'react';
import { useLanguage } from '@/hooks';

interface SubcategoryPillsProps {
  subcategories: string[];
  selectedSubcategory: string;
  onSelectSubcategory: (subcat: string) => void;
}

const SUBCAT_AR: Record<string, string> = {
  'Jackets': 'جاكيتات وبليزرات',
  'T-Shirts': 'تيشيرتات فاخرة',
  'Shirts': 'قمصان راقية',
  'Pants': 'بناطيل كلاسيكية',
  'Jeans': 'جينز فاخر',
  'Hoodies': 'هوديز كاجوال',
  'Dresses': 'فساتين سهرة',
  'Tops': 'توبات أنيقة',
  'Blouses': 'بلوزات حرير',
  'Skirts': 'تنانير بليسيه',
  "Boys' Clothing": 'ملابس أولاد',
  "Girls' Clothing": 'ملابس بنات',
  "Kids' T-Shirts": 'تيشيرتات أطفال',
  "Kids' Pants": 'بناطيل أطفال',
  "Kids' Sets": 'أطقم أطفال',
  'Watches': 'ساعات سويسرية',
  'Wallets': 'محافظ جلدية',
  'Sunglasses': 'نظارات شمسية',
  'Belts': 'أحزمة جلدية',
  'Bags': 'حقائب سفر',
  'Handbags': 'حقائب يد نسائية',
  'Jewelry': 'مجوهرات فاخرة',
  'Necklaces': 'عقود وسلاسل',
  'Bracelets': 'أساور ذهبية',
};

export const SubcategoryPills: React.FC<SubcategoryPillsProps> = ({
  subcategories,
  selectedSubcategory,
  onSelectSubcategory,
}) => {
  const { isRTL } = useLanguage();

  return (
    <div className="subcategories-pills-bar">
      <button
        type="button"
        className={`subcat-pill ${selectedSubcategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectSubcategory('all')}
      >
        {isRTL ? 'كافة القطع' : 'All Items'}
      </button>
      {subcategories.map((subcat) => (
        <button
          key={subcat}
          type="button"
          className={`subcat-pill ${selectedSubcategory === subcat ? 'active' : ''}`}
          onClick={() => onSelectSubcategory(subcat)}
        >
          {isRTL ? SUBCAT_AR[subcat] || subcat : subcat}
        </button>
      ))}
    </div>
  );
};

export default SubcategoryPills;
