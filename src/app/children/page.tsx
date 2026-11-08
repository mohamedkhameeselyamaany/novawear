import React from 'react';
import type { Metadata } from 'next';
import CategoryCatalog from '@/components/categories/CategoryCatalog/CategoryCatalog';
import { getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: "Children's Luxury Collection | NOVA WEAR",
  description:
    'Discover gentle organic fabrics, luxury kids linen sets, and charming celebration dresses tailored with care.',
};

export default function ChildrenPage() {
  const products = getProductsByCategory('children');
  const subcategories = ["Boys' Clothing", "Girls' Clothing", "Kids' T-Shirts", "Kids' Pants", "Kids' Sets"];

  return (
    <CategoryCatalog
      title="Children's Luxury Collection"
      titleAr="أزياء الأطفال الفاخرة"
      subtitle="Gentle organic fabrics, bespoke linen coordinates, and festive ensembles designed with elevated comfort and luxury."
      subtitleAr="أقمشة قطنية عضوية فائقة النعومة، أطقم كتان مريحة، وتصاميم أنيقة تجمع بين الفخامة والراحة المطلقة للأطفال."
      category="children"
      initialProducts={products}
      subcategories={subcategories}
    />
  );
}
