'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import {
  products as allProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getNewArrivals,
  getTrendingProducts,
  getBestSellers,
  getRelatedProducts,
  searchProducts,
} from '../data/products';
import { Product, MainCategory, Subcategory, AccessoriesGender } from '../types/product';

interface ProductContextType {
  products: Product[];
  getProductById: (id: number | string) => Product | undefined;
  getProductsByCategory: (category: MainCategory, subcategory?: Subcategory, gender?: AccessoriesGender) => Product[];
  getFeaturedProducts: () => Product[];
  getNewArrivals: () => Product[];
  getTrendingProducts: () => Product[];
  getBestSellers: () => Product[];
  getRelatedProducts: (category: MainCategory, productId: number) => Product[];
  searchProducts: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ProductContext.Provider
      value={{
        products: allProducts,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getNewArrivals,
        getTrendingProducts,
        getBestSellers,
        getRelatedProducts,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

