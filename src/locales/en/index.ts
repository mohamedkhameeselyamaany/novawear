import common from './common.json';
import navigation from './navigation.json';
import home from './home.json';
import products from './products.json';
import cart from './cart.json';
import checkout from './checkout.json';
import footer from './footer.json';
import legal from './legal.json';

export const en = {
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
    title: 'Search Catalog',
    placeholder: 'Search haute couture, tailoring, watches...',
    trending: 'Trending Searches',
    recent: 'Recent Queries',
    noResults: 'No sartorial pieces found matching your query.',
  },
  wishlist: {
    title: 'Saved Wishlist',
    empty: 'Your wishlist is currently empty',
    moveToCart: 'Move to Shopping Bag',
    remove: 'Remove',
  },
};

export default en;

