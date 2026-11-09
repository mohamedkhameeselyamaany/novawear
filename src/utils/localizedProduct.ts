import { Product } from '@/types/product';
import arProductsData from '@/locales/ar/productsData.json';

type ProductsDataMap = Record<
  string,
  {
    name: string;
    subcategory: string;
    description: string;
    colors?: Record<string, string>;
  }
>;

const AR_DATA = arProductsData as ProductsDataMap;

// Fallback dictionary for subcategories in Arabic
export const SUBCATEGORY_TRANSLATIONS_AR: Record<string, string> = {
  Jackets: 'جاكيتات وبليزرات',
  'T-Shirts': 'تيشيرتات فاخرة',
  Shirts: 'قمصان راقية',
  Pants: 'بناطيل كلاسيكية',
  Jeans: 'جينز فاخر',
  Hoodies: 'هوديز كاجوال',
  Dresses: 'فساتين سهرة',
  Tops: 'توبات أنيقة',
  Blouses: 'بلوزات حرير',
  Skirts: 'تنانير بليسيه',
  "Boys' Clothing": 'ملابس أولاد',
  "Girls' Clothing": 'ملابس بنات',
  "Kids' T-Shirts": 'تيشيرتات أطفال',
  "Kids' Pants": 'بناطيل أطفال',
  "Kids' Sets": 'أطقم أطفال',
  Watches: 'ساعات سويسرية',
  Wallets: 'محافظ جلدية',
  Sunglasses: 'نظارات شمسية',
  Belts: 'أحزمة جلدية',
  Bags: 'حقائب سفر',
  Handbags: 'حقائب يد نسائية',
  Jewelry: 'مجوهرات فاخرة',
  Necklaces: 'عقود وسلاسل',
  Bracelets: 'أساور ذهبية',
};

// Fallback dictionary for common color names in Arabic
export const COLOR_TRANSLATIONS_AR: Record<string, string> = {
  'Onyx Black': 'أسود ملكي',
  'Midnight Navy': 'كحلي داكن',
  Charcoal: 'رمادي فحمي',
  'Jet Black': 'أسود فاحم',
  'Pure White': 'أبيض ناصع',
  'Slate Gray': 'رمادي صخري',
  'Raw Indigo': 'أزرق نيلي أصلي',
  'Washed Blue': 'أزرق مغسول',
  'Faded Gray': 'رمادي مائل',
  'Crisp White': 'أبيض ناصع',
  'Sky Blue': 'أزرق سماوي',
  'Soft Pink': 'وردي هادئ',
  Khaki: 'بيج خاكي',
  Navy: 'كحلي كلاسيكي',
  Olive: 'زيتوني هادئ',
  Black: 'أسود كلاسيكي',
  'Vintage Brown': 'بني عتيق',
  'Burgundy Red': 'عنابي داكن',
  Heather: 'رمادي مشجر',
  'Cream White': 'أبيض كريمي',
  'Camel Tan': 'جملي دافئ',
  Heathered: 'رمادي مائل',
  Sage: 'أخضر ميرمية',
  Emerald: 'أخضر زمردي',
  Sapphire: 'أزرق ياقوتي',
  Ruby: 'أحمر ياقوتي',
  'Floral Print': 'منقوش بالزهور',
  'Sunny Yellow': 'أصفر مشرق',
  'Ivory White': 'أبيض عاجي',
  Blush: 'وردي هادئ',
  Cognac: 'بني كونياك',
  Espresso: 'بني إسبريسو',
  Tan: 'بيج جملي',
  Caramel: 'كراميل دافئ',
  'Gold & Steel': 'ذهب أصفر وفولاذ',
  'Rose Gold': 'ذهب وردي',
  Gold: 'ذهب أصفر 18 قيراط',
  Silver: 'فضة إسترليني',
  Diamond: 'ألماس برّاق',
  Tortoise: 'تورتويز كلاسيكي',
  Pearl: 'لؤلؤ طبيعي',
  Beige: 'بيج كلاسيكي',
  Default: 'الافتراضي',
  Standard: 'قياسي',
};

/**
 * Returns localized product name
 */
export function getProductName(product: Product, isRTL: boolean): string {
  if (isRTL) {
    if (product.nameAr) return product.nameAr;
    const item = AR_DATA[String(product.id)];
    if (item?.name) return item.name;
  }
  return product.name;
}

/**
 * Returns localized product description
 */
export function getProductDescription(product: Product, isRTL: boolean): string {
  if (isRTL) {
    if (product.descriptionAr) return product.descriptionAr;
    const item = AR_DATA[String(product.id)];
    if (item?.description) return item.description;
  }
  return product.description;
}

/**
 * Returns localized subcategory name
 */
export function getProductSubcategory(product: Product, isRTL: boolean): string {
  if (isRTL) {
    if (product.subcategoryAr) return product.subcategoryAr;
    const item = AR_DATA[String(product.id)];
    if (item?.subcategory) return item.subcategory;
    if (SUBCATEGORY_TRANSLATIONS_AR[product.subcategory]) {
      return SUBCATEGORY_TRANSLATIONS_AR[product.subcategory];
    }
  }
  return product.subcategory;
}

/**
 * Returns localized color name
 */
export function getProductColor(
  color: string,
  isRTL: boolean,
  productId?: number
): string {
  if (!color) return '';
  if (isRTL) {
    if (productId) {
      const item = AR_DATA[String(productId)];
      if (item?.colors && item.colors[color]) {
        return item.colors[color];
      }
    }
    if (COLOR_TRANSLATIONS_AR[color]) {
      return COLOR_TRANSLATIONS_AR[color];
    }
  }
  return color;
}
