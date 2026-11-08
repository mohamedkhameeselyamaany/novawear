import React from 'react';
import type { Metadata } from 'next';
import CategoryCatalog from '@/components/categories/CategoryCatalog/CategoryCatalog';
import { getProductsByCategory } from '@/data/products';
import { AccessoriesGender } from '@/types/product';

export const metadata: Metadata = {
  title: 'Fine Accessories Collection | NOVA WEAR',
  description:
    "Explore independent Men's and Women's luxury accessories: Swiss automatic chronographs, full-grain Italian leather goods, and 18k gold-vermeil jewelry.",
};

export default function AccessoriesPage() {
  const products = getProductsByCategory('accessories');
  const subcategories = ['Watches', 'Wallets', 'Handbags', 'Jewelry', 'Sunglasses', 'Belts', 'Bags'];

  const genderTabOptions: { id: AccessoriesGender; label: string; labelAr: string }[] = [
    { id: 'men', label: "Men's Accessories", labelAr: 'إكسسوارات رجالية' },
    { id: 'women', label: "Women's Accessories", labelAr: 'إكسسوارات نسائية' },
  ];

  return (
    <CategoryCatalog
      title="Haute Accessories Collection"
      titleAr="مجموعة الإكسسوارات الفاخرة"
      subtitle="Swiss automatic watches, 18k gold vermeil jewelry, full-grain Italian leather goods, and UV400 eyewear partitioned strictly for men and women."
      subtitleAr="ساعات سويسرية أوتوماتيكية، مجوهرات مطلية بالذهب عيار 18، محافظ وحقائب جلد طبيعي، ونظارات شمسية فاخرة."
      category="accessories"
      initialProducts={products}
      subcategories={subcategories}
      genderTabOptions={genderTabOptions}
    />
  );
}
