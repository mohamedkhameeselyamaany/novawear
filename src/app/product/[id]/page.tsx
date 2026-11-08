import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductById, getRelatedProducts, products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | NOVA WEAR',
    };
  }

  return {
    title: `${product.name} | NOVA WEAR`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NOVA WEAR`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.category, product.id);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}

