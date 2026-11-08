export type MainCategory = 'men' | 'women' | 'children' | 'accessories';

export type MenSubcategory = 'T-Shirts' | 'Shirts' | 'Pants' | 'Jeans' | 'Jackets' | 'Hoodies';
export type WomenSubcategory = 'Dresses' | 'Tops' | 'Blouses' | 'Pants' | 'Skirts' | 'Jackets';
export type ChildrenSubcategory = "Boys' Clothing" | "Girls' Clothing" | "Kids' T-Shirts" | "Kids' Pants" | "Kids' Sets";
export type MenAccessoriesSubcategory = 'Watches' | 'Wallets' | 'Sunglasses' | 'Belts' | 'Bags';
export type WomenAccessoriesSubcategory = 'Handbags' | 'Jewelry' | 'Necklaces' | 'Bracelets' | 'Sunglasses';

export type AccessoriesGender = 'men' | 'women';

export type Subcategory =
  | MenSubcategory
  | WomenSubcategory
  | ChildrenSubcategory
  | MenAccessoriesSubcategory
  | WomenAccessoriesSubcategory;

export interface Product {
  id: number;
  name: string;
  category: MainCategory;
  subcategory: Subcategory;
  gender?: AccessoriesGender; // Specifically for accessories to partition men vs women accessories
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  discount?: number;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  new?: boolean;
  trending?: boolean;
  bestseller?: boolean;
}

export interface CategoryInfo {
  id: MainCategory;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  subcategories: string[];
}

