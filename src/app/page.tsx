'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import EditorialBanner from '@/components/home/EditorialBanner';
import Testimonials from '@/components/home/Testimonials';
import CategoryCard from '@/components/categories/CategoryCard/CategoryCard';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import { getFeaturedProducts, getTrendingProducts } from '@/data/products';
import { useLanguage } from '@/hooks';
import { FiArrowRight } from 'react-icons/fi';
import './home.css';

export default function HomePage() {
  const { isRTL, t } = useLanguage();
  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();

  const categories = [
    {
      name: isRTL ? 'أزياء الرجال' : "Men's Collection",
      subtitle: isRTL
        ? 'بليزرات صوف إيطالي، قطن بيمي، ودنيم فاخر'
        : 'Tailored blazers, Supima tees & selvedge denim',
      image: '/images/men/men-wool-blazer.webp',
      link: '/men',
      itemCount: 8,
    },
    {
      name: isRTL ? 'أزياء النساء' : "Women's Collection",
      subtitle: isRTL
        ? 'فساتين سهرة حريرية، ومعاطف كشمير وتنانير بليسيه'
        : 'Silk evening gowns, nappa leather & pleated skirts',
      image: '/images/women/women-evening-dress.webp',
      link: '/women',
      itemCount: 8,
    },
    {
      name: isRTL ? 'أزياء الأطفال' : "Kids' Collection",
      subtitle: isRTL
        ? 'أطقم كتان مريحة، وفساتين مناسبات للأطفال'
        : 'Linen sets, organic cotton tees & party dresses',
      image: '/images/children/children-boys-casual-set.webp',
      link: '/children',
      itemCount: 6,
    },
    {
      name: isRTL ? 'الإكسسوارات الفاخرة' : 'Haute Accessories',
      subtitle: isRTL
        ? 'ساعات يد كرونوغراف رجالية ومجوهرات نسائية مطلية بالذهب'
        : "Men's automatic watches & women's 18k jewelry",
      image: '/images/accessories/men/accessories-men-leather-watch.webp',
      link: '/accessories',
      itemCount: 12,
    },
  ];

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Category Spotlight */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            {isRTL ? 'الأقسام الرئيسية' : 'THE MAISONS'}
          </span>
          <h2 className="section-title">
            {isRTL ? 'استكشف التشكيلات حسب الفئة' : 'EXPLORE BY CATEGORY'}
          </h2>
          <div className="title-gold-bar mx-auto" />
        </div>

        <div className="category-grid">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} {...cat} />
          ))}
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            {isRTL ? 'المختارات الاستثنائية' : 'CURATED SELECTION'}
          </span>
          <h2 className="section-title">
            {isRTL ? 'القطع والتصاميم المميزة' : 'FEATURED CREATIONS'}
          </h2>
          <div className="title-gold-bar mx-auto" />
          <Link href="/men" className="view-all-link mt-2">
            <span>{isRTL ? 'عرض كافة التشكيلات' : 'VIEW ALL CREATIONS'}</span>
            <FiArrowRight style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
          </Link>
        </div>

        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Luxury Editorial Banner Component */}
      <EditorialBanner />

      {/* 5. Trending Collection */}
      <section className="section-padding container">
        <div className="section-header text-center">
          <span className="section-subtitle">
            {isRTL ? 'الأكثر طلباً هذا الموسم' : 'MOST COVETED'}
          </span>
          <h2 className="section-title">
            {isRTL ? 'التصاميم الأكثر رواجاً' : 'TRENDING NOW'}
          </h2>
          <div className="title-gold-bar mx-auto" />
          <Link href="/women" className="view-all-link mt-2">
            <span>{isRTL ? 'استكشف أزياء النساء' : 'EXPLORE WOMEN'}</span>
            <FiArrowRight style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }} />
          </Link>
        </div>

        <div className="products-grid">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Testimonials & Client Acclaim Component */}
      <Testimonials />
    </div>
  );
}
