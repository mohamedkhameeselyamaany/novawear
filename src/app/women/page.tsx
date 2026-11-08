import React from 'react';
import type { Metadata } from 'next';
import CategoryCatalog from '@/components/categories/CategoryCatalog/CategoryCatalog';
import { getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: "Women's Haute Couture Collection | NOVA WEAR",
  description:
    'Explore exquisite Mulberry silk evening gowns, pure Mongolian cashmere coats, fine pleated skirts, and tailored trousers.',
};

export default function WomenPage() {
  const products = getProductsByCategory('women');
  const subcategories = ['Dresses', 'Tops', 'Blouses', 'Pants', 'Skirts', 'Jackets'];

  return (
    <CategoryCatalog
      title="Women's Collection"
      titleAr="أزياء النساء الفاخرة"
      subtitle="Haute couture gowns, virgin cashmere outerwear, fine silk blouses, and sculptured trousers designed for timeless grace."
      subtitleAr="فساتين سهرة راقية، معاطف كشمير طبيعي، بلوزات حريرية خالصة، وتنانير بليسيه تمنحك إطلالة فريدة مفعمة بالأنوثة."
      category="women"
      initialProducts={products}
      subcategories={subcategories}
    />
  );
}
