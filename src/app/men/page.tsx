import React from 'react';
import type { Metadata } from 'next';
import CategoryCatalog from '@/components/categories/CategoryCatalog/CategoryCatalog';
import { getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: "Men's Sartorial Collection | NOVA WEAR",
  description:
    'Discover bespoke Italian wool blazers, luxury Supima tees, Japanese selvedge denim, and tailored chinos for the discerning gentleman.',
};

export default function MenPage() {
  const products = getProductsByCategory('men');
  const subcategories = ['Jackets', 'T-Shirts', 'Jeans', 'Shirts', 'Pants', 'Hoodies'];

  return (
    <CategoryCatalog
      title="Men's Collection"
      titleAr="أزياء الرجال الفاخرة"
      subtitle="Bespoke tailoring, virgin wool blazers, Supima cotton tees & Japanese selvedge denim crafted with uncompromising discipline."
      subtitleAr="خياطة إيطالية متقنة، بليزرات صوف طبيعي، تيشيرتات قطن بيمي، ودنيم فاخر مصمم بأعلى معايير الأناقة."
      category="men"
      initialProducts={products}
      subcategories={subcategories}
    />
  );
}
