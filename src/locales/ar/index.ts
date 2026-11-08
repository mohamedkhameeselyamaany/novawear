import common from './common.json';
import navigation from './navigation.json';
import home from './home.json';
import products from './products.json';
import cart from './cart.json';
import checkout from './checkout.json';
import footer from './footer.json';
import legal from './legal.json';

export const ar = {
  common,
  navigation,
  nav: navigation, // backwards-compatible alias
  home,
  hero: home, // backwards-compatible alias
  categories: {
    featured: home.categoriesTitle,
    men: navigation.men,
    women: navigation.women,
    children: navigation.children,
    accessories: navigation.accessories,
    viewAll: common.viewAll,
  },
  products,
  cart,
  checkout,
  footer,
  legal,
  search: {
    title: 'البحث عن المنتجات',
    placeholder: 'ابحث عن الملابس، الأحذية، الساعات...',
    trending: 'الكلمات الأكثر بحثاً',
    recent: 'عمليات البحث الأخيرة',
    noResults: 'لم نجد أي نتائج تطابق الكلمة المكتوبة.',
  },
  wishlist: {
    title: 'قائمة الرغبات',
    empty: 'قائمة رغباتك فارغة',
    moveToCart: 'نقل إلى السلة',
    remove: 'إزالة',
  },
};

export default ar;

