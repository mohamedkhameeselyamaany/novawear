import { Product, MainCategory, Subcategory, AccessoriesGender } from '../types/product';
import arProductsData from '../locales/ar/productsData.json';

const AR_DATA = arProductsData as Record<
  string,
  { name?: string; description?: string; subcategory?: string; colors?: Record<string, string> }
>;

export const products: Product[] = [
  // ==========================================
  // MEN'S FASHION
  // ==========================================
  {
    id: 101,
    name: 'Sartorial Italian Wool Blazer',
    category: 'men',
    subcategory: 'Jackets',
    price: 349.99,
    oldPrice: 449.99,
    discount: 22,
    description: 'Precision-tailored from virgin Italian wool, featuring structured natural shoulders, notch lapels, and a half-canvas construction for effortless elegance.',
    image: '/images/men/men-wool-blazer.webp',
    images: [
      '/images/men/men-wool-blazer.webp',
      '/images/men/men-cotton-shirt.webp',
      '/images/men/men-chinos-pants.webp',
    ],
    rating: 4.9,
    reviews: 142,
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    colors: ['Onyx Black', 'Midnight Navy', 'Charcoal'],
    inStock: true,
    new: true,
    bestseller: true,
  },
  {
    id: 102,
    name: 'Heavyweight Supima Cotton T-Shirt',
    category: 'men',
    subcategory: 'T-Shirts',
    price: 54.99,
    oldPrice: 69.99,
    discount: 21,
    description: 'Engineered with 100% American extra-long staple Supima cotton. Offers an ultra-soft hand feel, reinforced collar ribbing, and a tailored contemporary drape.',
    image: '/images/men/men-black-tshirt.webp',
    images: [
      '/images/men/men-black-tshirt.webp',
      '/images/men/men-blue-jeans.webp',
    ],
    rating: 4.8,
    reviews: 218,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Jet Black', 'Pure White', 'Slate Gray'],
    inStock: true,
    bestseller: true,
  },
  {
    id: 103,
    name: 'Selvedge Slim-Taper Denim Jeans',
    category: 'men',
    subcategory: 'Jeans',
    price: 139.99,
    oldPrice: 179.99,
    discount: 22,
    description: 'Crafted on vintage shuttle looms from 13.5oz Japanese denim. Features red selvedge ID, custom branded copper hardware, and a modern slim-taper silhouette.',
    image: '/images/men/men-blue-jeans.webp',
    images: [
      '/images/men/men-blue-jeans.webp',
      '/images/men/men-black-tshirt.webp',
    ],
    rating: 4.7,
    reviews: 184,
    sizes: ['30', '31', '32', '33', '34', '36'],
    colors: ['Raw Indigo', 'Washed Blue', 'Faded Gray'],
    inStock: true,
    trending: true,
  },
  {
    id: 104,
    name: 'Royal Oxford Egyptian Cotton Shirt',
    category: 'men',
    subcategory: 'Shirts',
    price: 119.99,
    oldPrice: 149.99,
    discount: 20,
    description: 'Woven from 120s two-ply Egyptian Giza cotton with a pinpoint basket weave. Features a semi-spread collar, mother-of-pearl buttons, and rounded barrel cuffs.',
    image: '/images/men/men-cotton-shirt.webp',
    images: [
      '/images/men/men-cotton-shirt.webp',
      '/images/men/men-wool-blazer.webp',
    ],
    rating: 4.9,
    reviews: 96,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Crisp White', 'Sky Blue', 'Soft Pink'],
    inStock: true,
    new: true,
  },
  {
    id: 105,
    name: 'Stretch Gabardine Tailored Chinos',
    category: 'men',
    subcategory: 'Pants',
    price: 109.99,
    oldPrice: 139.99,
    discount: 21,
    description: 'Refined flat-front chinos woven with breathable cotton and subtle elastane stretch. Features an interior curtain waistband and clean pressed front creases.',
    image: '/images/men/men-chinos-pants.webp',
    images: [
      '/images/men/men-chinos-pants.webp',
      '/images/men/men-cotton-shirt.webp',
    ],
    rating: 4.6,
    reviews: 115,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki Stone', 'Olive Drab', 'Deep Navy'],
    inStock: true,
  },
  {
    id: 106,
    name: 'Full-Grain Lambskin Biker Jacket',
    category: 'men',
    subcategory: 'Jackets',
    price: 499.99,
    oldPrice: 650.00,
    discount: 23,
    description: 'Supple Italian lambskin leather jacket with asymmetrical heavy-gauge antiqued brass zippers, quilted silk lining, and tailored sleeve gussets.',
    image: '/images/men/men-leather-jacket.webp',
    images: [
      '/images/men/men-leather-jacket.webp',
      '/images/men/men-black-tshirt.webp',
    ],
    rating: 5.0,
    reviews: 73,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Obsidian Black', 'Espresso Brown'],
    inStock: true,
    trending: true,
  },
  {
    id: 107,
    name: 'French Terry Minimalist Urban Hoodie',
    category: 'men',
    subcategory: 'Hoodies',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    description: '450 GSM looped-back French terry hoodie with double-layered hood, kangaroo pocket, ribbed side gussets, and gold-tipped cotton drawstrings.',
    image: '/images/men/men-urban-hoodie.webp',
    images: [
      '/images/men/men-urban-hoodie.webp',
      '/images/men/men-blue-jeans.webp',
    ],
    rating: 4.8,
    reviews: 204,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Oatmeal Heather', 'Deep Black', 'Forest Green'],
    inStock: true,
  },
  {
    id: 108,
    name: 'Pure Mongolian Cashmere Crewneck',
    category: 'men',
    subcategory: 'Jackets',
    price: 229.99,
    oldPrice: 289.99,
    discount: 20,
    description: 'Grade-A 100% Mongolian cashmere knit to an ultra-plush 12-gauge tension. Exceptionally insulating yet remarkably lightweight and breathable.',
    image: '/images/men/men-cashmere-sweater.webp',
    images: [
      '/images/men/men-cashmere-sweater.webp',
      '/images/men/men-chinos-pants.webp',
    ],
    rating: 4.9,
    reviews: 132,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Camel Heather', 'Charcoal', 'Midnight Blue'],
    inStock: true,
    bestseller: true,
  },

  // ==========================================
  // WOMEN'S FASHION
  // ==========================================
  {
    id: 201,
    name: 'Silk Crepe Backless Evening Gown',
    category: 'women',
    subcategory: 'Dresses',
    price: 389.99,
    oldPrice: 489.99,
    discount: 20,
    description: 'Sculptural silhouette cut from fluid silk crepe with an alluring open cowl back, gentle side slit, and delicate gold-tone chain shoulder embellishments.',
    image: '/images/women/women-evening-dress.webp',
    images: [
      '/images/women/women-evening-dress.webp',
      '/images/accessories/women/accessories-women-gold-necklace.webp',
    ],
    rating: 5.0,
    reviews: 167,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald Green', 'Champagne Gold', 'Noir Black'],
    inStock: true,
    new: true,
    bestseller: true,
  },
  {
    id: 202,
    name: 'Tiered Linen-Silk Summer Midi Dress',
    category: 'women',
    subcategory: 'Dresses',
    price: 189.99,
    oldPrice: 239.99,
    discount: 21,
    description: 'Airy linen-silk blend featuring romantic puff sleeves, a smocked bodice, and a tiered cascading hemline perfect for sun-drenched coastal days.',
    image: '/images/women/women-summer-dress.webp',
    images: [
      '/images/women/women-summer-dress.webp',
      '/images/accessories/women/accessories-women-cat-eye-sunglasses.webp',
    ],
    rating: 4.7,
    reviews: 149,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Terracotta', 'Ivory White', 'Sunset Yellow'],
    inStock: true,
    trending: true,
  },
  {
    id: 203,
    name: 'Mulberry Silk Satin Tie-Neck Blouse',
    category: 'women',
    subcategory: 'Blouses',
    price: 159.99,
    oldPrice: 199.99,
    discount: 20,
    description: 'Lustrous 19-momme mulberry silk featuring an elongated necktie that can be styled as a pussy-bow or left draped. French cuffs with subtle gold buttons.',
    image: '/images/women/women-silk-blouse.webp',
    images: [
      '/images/women/women-silk-blouse.webp',
      '/images/women/women-tailored-trousers.webp',
    ],
    rating: 4.8,
    reviews: 112,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pearl Ivory', 'Blush Rose', 'Black Onyx'],
    inStock: true,
  },
  {
    id: 204,
    name: 'Sculpted Nappa Leather Moto Jacket',
    category: 'women',
    subcategory: 'Jackets',
    price: 449.99,
    oldPrice: 580.00,
    discount: 22,
    description: 'An iconic silhouette re-imagined in butter-soft nappa leather. Features high-shine gold hardware, contoured seams, and a satin-twill inner lining.',
    image: '/images/women/women-leather-jacket.webp',
    images: [
      '/images/women/women-leather-jacket.webp',
      '/images/women/women-tailored-trousers.webp',
    ],
    rating: 4.9,
    reviews: 88,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Midnight Black', 'Cognac Tan'],
    inStock: true,
    bestseller: true,
  },
  {
    id: 205,
    name: 'High-Rise Wide-Leg Wool Trousers',
    category: 'women',
    subcategory: 'Pants',
    price: 169.99,
    oldPrice: 219.99,
    discount: 23,
    description: 'Structured wool-blend trousers with sharp front pleats, slant pockets, and a fluid wide-leg hem designed to pair seamlessly with heels or loafers.',
    image: '/images/women/women-tailored-trousers.webp',
    images: [
      '/images/women/women-tailored-trousers.webp',
      '/images/women/women-silk-blouse.webp',
    ],
    rating: 4.6,
    reviews: 94,
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Camel Melange', 'Onyx Black', 'Off-White'],
    inStock: true,
  },
  {
    id: 206,
    name: 'Architectural Sunray Pleated Skirt',
    category: 'women',
    subcategory: 'Skirts',
    price: 139.99,
    oldPrice: 179.99,
    discount: 22,
    description: 'High-waisted midi skirt with precision-set sunray accordion pleats that catch the light with every movement. Features a concealed side zip.',
    image: '/images/women/women-pleated-skirt.webp',
    images: [
      '/images/women/women-pleated-skirt.webp',
      '/images/women/women-ribbed-knit-top.webp',
    ],
    rating: 4.8,
    reviews: 130,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Burnished Bronze', 'Onyx Black', 'Navy'],
    inStock: true,
    trending: true,
  },
  {
    id: 207,
    name: 'Fine-Ribbed Cashmere-Silk Knit Top',
    category: 'women',
    subcategory: 'Tops',
    price: 119.99,
    oldPrice: 149.99,
    discount: 20,
    description: 'A second-skin layer spun from 70% silk and 30% cashmere with tactile micro-ribbing. Ideal for elevated everyday layering.',
    image: '/images/women/women-ribbed-knit-top.webp',
    images: [
      '/images/women/women-ribbed-knit-top.webp',
      '/images/women/women-pleated-skirt.webp',
    ],
    rating: 4.7,
    reviews: 176,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Warm Sand', 'Espresso', 'Ivory'],
    inStock: true,
  },
  {
    id: 208,
    name: 'Double-Breasted Cashmere Wrap Coat',
    category: 'women',
    subcategory: 'Jackets',
    price: 529.99,
    oldPrice: 689.99,
    discount: 23,
    description: 'Unlined double-faced cashmere and virgin wool coat handcrafted with artisanal pick-stitching, generous notch lapels, and a self-tie belt.',
    image: '/images/women/women-cashmere-coat.webp',
    images: [
      '/images/women/women-cashmere-coat.webp',
      '/images/accessories/women/accessories-women-luxury-handbag.webp',
    ],
    rating: 5.0,
    reviews: 64,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Royal Camel', 'Charcoal Heather'],
    inStock: true,
    new: true,
    bestseller: true,
  },

  // ==========================================
  // CHILDREN'S FASHION
  // ==========================================
  {
    id: 301,
    name: 'Junior Tailored Linen Blazer & Shorts Set',
    category: 'children',
    subcategory: 'Kids\' Sets',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    description: 'Preppy two-piece occasion set made from soft, pre-washed breathable linen. Comfortable elastic waistband on shorts and gentle cotton lining.',
    image: '/images/children/children-boys-casual-set.webp',
    images: [
      '/images/children/children-boys-casual-set.webp',
      '/images/children/children-cotton-tshirt.webp',
    ],
    rating: 4.9,
    reviews: 82,
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Sand Beige', 'Nautical Navy'],
    inStock: true,
    new: true,
  },
  {
    id: 302,
    name: 'Little Petals Broderie Anglaise Dress',
    category: 'children',
    subcategory: 'Girls\' Clothing',
    price: 74.99,
    oldPrice: 94.99,
    discount: 21,
    description: 'Delicate organic cotton dress with intricate floral eyelet embroidery, scalloped hem, ruffled sleeves, and soft inner voilé lining.',
    image: '/images/children/children-girls-floral-dress.webp',
    images: [
      '/images/children/children-girls-floral-dress.webp',
    ],
    rating: 4.8,
    reviews: 95,
    sizes: ['3Y', '5Y', '7Y', '9Y', '11Y'],
    colors: ['Pastel Yellow', 'Powder Pink', 'Cloud White'],
    inStock: true,
    bestseller: true,
  },
  {
    id: 303,
    name: 'Organic Cotton Breton Stripe Tee',
    category: 'children',
    subcategory: 'Kids\' T-Shirts',
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    description: 'GOTS-certified 100% organic cotton tee with classic yarn-dyed nautical stripes, shoulder snaps for easy changing, and tagless comfort.',
    image: '/images/children/children-cotton-tshirt.webp',
    images: [
      '/images/children/children-cotton-tshirt.webp',
      '/images/children/children-denim-pants.webp',
    ],
    rating: 4.7,
    reviews: 134,
    sizes: ['2Y', '4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Navy / White', 'Red / White'],
    inStock: true,
  },
  {
    id: 304,
    name: 'Comfort-Stretch Kids Denim Joggers',
    category: 'children',
    subcategory: 'Kids\' Pants',
    price: 49.99,
    oldPrice: 64.99,
    discount: 23,
    description: 'Durable stretch denim pants with ribbed cotton drawstring waistband and elasticated cuffs. Specially reinforced at the knees for playful days.',
    image: '/images/children/children-denim-pants.webp',
    images: [
      '/images/children/children-denim-pants.webp',
      '/images/children/children-cotton-tshirt.webp',
    ],
    rating: 4.6,
    reviews: 110,
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Medium Vintage Wash', 'Deep Indigo'],
    inStock: true,
  },
  {
    id: 305,
    name: 'Plush Fleece Zip Hoodie & Trackpants Set',
    category: 'children',
    subcategory: 'Kids\' Sets',
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    description: 'Cozy two-piece lounge suit made of ultra-soft brushed fleece with kangaroo pockets, ribbed trimmings, and signature NOVA WEAR metallic embroidery.',
    image: '/images/children/children-warm-hoodie-set.webp',
    images: [
      '/images/children/children-warm-hoodie-set.webp',
    ],
    rating: 4.9,
    reviews: 156,
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Oatmeal Heather', 'Dusty Rose', 'Slate Blue'],
    inStock: true,
    trending: true,
  },
  {
    id: 306,
    name: 'Sparkle Tulle Tiered Holiday Party Dress',
    category: 'children',
    subcategory: 'Girls\' Clothing',
    price: 84.99,
    oldPrice: 109.99,
    discount: 23,
    description: 'Magical party dress featuring multiple tiers of soft glitter tulle, a satin bow at the waist, and a 100% gentle cotton protective lining.',
    image: '/images/children/children-girls-party-dress.webp',
    images: [
      '/images/children/children-girls-party-dress.webp',
    ],
    rating: 5.0,
    reviews: 77,
    sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['Rose Gold', 'Snow White'],
    inStock: true,
    new: true,
  },

  // ==========================================
  // ACCESSORIES — MEN'S ACCESSORIES
  // ==========================================
  {
    id: 401,
    name: 'Sovereign Automatic Leather Watch',
    category: 'accessories',
    subcategory: 'Watches',
    gender: 'men',
    price: 429.99,
    oldPrice: 550.00,
    discount: 22,
    description: '41mm 316L stainless steel case with sapphire crystal glass, 24-jewel Japanese automatic movement, 42-hour power reserve, and Italian alligator-embossed leather strap.',
    image: '/images/accessories/men/accessories-men-leather-watch.webp',
    images: [
      '/images/accessories/men/accessories-men-leather-watch.webp',
      '/images/accessories/men/accessories-men-classic-wallet.webp',
    ],
    rating: 4.9,
    reviews: 118,
    colors: ['Cognac Leather / Silver', 'Black Leather / Gold'],
    inStock: true,
    new: true,
    bestseller: true,
  },
  {
    id: 402,
    name: 'Vachetta Leather Bi-Fold Wallet',
    category: 'accessories',
    subcategory: 'Wallets',
    gender: 'men',
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    description: 'Handcrafted from vegetable-tanned Italian Vachetta leather that patinas richly over time. 8 card slots, dual currency compartments, and RFID blocking lining.',
    image: '/images/accessories/men/accessories-men-classic-wallet.webp',
    images: [
      '/images/accessories/men/accessories-men-classic-wallet.webp',
    ],
    rating: 4.8,
    reviews: 210,
    colors: ['Rich Tan', 'Midnight Black', 'Dark Chocolate'],
    inStock: true,
    bestseller: true,
  },
  {
    id: 403,
    name: 'Titanium Polarized Aviator Sunglasses',
    category: 'accessories',
    subcategory: 'Sunglasses',
    gender: 'men',
    price: 149.99,
    oldPrice: 189.99,
    discount: 21,
    description: 'Featherlight Japanese titanium frame with teardrop polarized nylon lenses, anti-reflective inner coating, and 100% UVA/UVB protection.',
    image: '/images/accessories/men/accessories-men-aviator-sunglasses.webp',
    images: [
      '/images/accessories/men/accessories-men-aviator-sunglasses.webp',
    ],
    rating: 4.7,
    reviews: 143,
    colors: ['Brushed Gold / G15 Green', 'Matte Black / Smoke'],
    inStock: true,
    trending: true,
  },
  {
    id: 404,
    name: 'Reversible Tuscan Leather Belt',
    category: 'accessories',
    subcategory: 'Belts',
    gender: 'men',
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    description: '35mm full-grain leather belt featuring a rotating brushed palladium buckle. Reverses effortlessly from classic black to warm cognac brown.',
    image: '/images/accessories/men/accessories-men-leather-belt.webp',
    images: [
      '/images/accessories/men/accessories-men-leather-belt.webp',
    ],
    rating: 4.6,
    reviews: 98,
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Black / Cognac Dual Tone'],
    inStock: true,
  },
  {
    id: 405,
    name: 'Voyager Leather Weekender Duffle Bag',
    category: 'accessories',
    subcategory: 'Bags',
    gender: 'men',
    price: 329.99,
    oldPrice: 420.00,
    discount: 21,
    description: 'Generous 45L travel duffle crafted in pull-up oil-waxed leather with antique brass hardware, reinforced top handles, padded shoulder strap, and waterproof shoe compartment.',
    image: '/images/accessories/men/accessories-men-duffle-bag.webp',
    images: [
      '/images/accessories/men/accessories-men-duffle-bag.webp',
      '/images/accessories/men/accessories-men-leather-watch.webp',
    ],
    rating: 5.0,
    reviews: 62,
    colors: ['Heritage Brown', 'Onyx Black'],
    inStock: true,
    trending: true,
  },
  {
    id: 406,
    name: 'Chronograph 18k Gold Plated Timepiece',
    category: 'accessories',
    subcategory: 'Watches',
    gender: 'men',
    price: 499.99,
    oldPrice: 650.00,
    discount: 23,
    description: 'Polished 18k yellow gold PVD coated casing with sunburst champagne dial, three subdials for split-second chronograph timing, and integrated link bracelet with butterfly clasp.',
    image: '/images/accessories/men/accessories-men-gold-chronograph.webp',
    images: [
      '/images/accessories/men/accessories-men-gold-chronograph.webp',
    ],
    rating: 4.9,
    reviews: 89,
    colors: ['Pure Gold / Champagne Dial'],
    inStock: true,
    new: true,
    bestseller: true,
  },

  // ==========================================
  // ACCESSORIES — WOMEN'S ACCESSORIES
  // ==========================================
  {
    id: 501,
    name: 'Palermo Grained Calfskin Top-Handle Bag',
    category: 'accessories',
    subcategory: 'Handbags',
    gender: 'women',
    price: 369.99,
    oldPrice: 469.99,
    discount: 21,
    description: 'Structured silhouette in scratch-resistant grained calfskin leather with polished gold padlock closure, detachable crossbody strap, and microfiber suede lining.',
    image: '/images/accessories/women/accessories-women-luxury-handbag.webp',
    images: [
      '/images/accessories/women/accessories-women-luxury-handbag.webp',
      '/images/accessories/women/accessories-women-leather-clutch.webp',
    ],
    rating: 5.0,
    reviews: 145,
    colors: ['Warm Almond', 'Classic Noir', 'Burgundy Wine'],
    inStock: true,
    new: true,
    bestseller: true,
  },
  {
    id: 502,
    name: 'Aurelia 18K Solid Gold Herringbone Necklace',
    category: 'accessories',
    subcategory: 'Necklaces',
    gender: 'women',
    price: 289.99,
    oldPrice: 360.00,
    discount: 20,
    description: 'Silky, liquid-metal drape 4mm herringbone chain crafted in Italy from 18k gold vermeil over sterling silver. 16-inch length with 2-inch extender and lobster clasp.',
    image: '/images/accessories/women/accessories-women-gold-necklace.webp',
    images: [
      '/images/accessories/women/accessories-women-gold-necklace.webp',
      '/images/accessories/women/accessories-women-diamond-bracelet.webp',
    ],
    rating: 4.9,
    reviews: 182,
    colors: ['18K Yellow Gold'],
    inStock: true,
    bestseller: true,
  },
  {
    id: 503,
    name: 'Lumière Pavé Lab-Grown Diamond Tennis Bracelet',
    category: 'accessories',
    subcategory: 'Bracelets',
    gender: 'women',
    price: 419.99,
    oldPrice: 549.99,
    discount: 24,
    description: 'A timeless continuous river of 3.0 cttw brilliant-cut lab-grown diamonds (F-G color, VS clarity) set into four-prong basket mountings in solid 14k white gold.',
    image: '/images/accessories/women/accessories-women-diamond-bracelet.webp',
    images: [
      '/images/accessories/women/accessories-women-diamond-bracelet.webp',
      '/images/accessories/women/accessories-women-gold-necklace.webp',
    ],
    rating: 5.0,
    reviews: 79,
    colors: ['14K White Gold', '14K Yellow Gold'],
    inStock: true,
    trending: true,
  },
  {
    id: 504,
    name: 'Milanese Oversized Cat-Eye Sunglasses',
    category: 'accessories',
    subcategory: 'Sunglasses',
    gender: 'women',
    price: 139.99,
    oldPrice: 179.99,
    discount: 22,
    description: 'Hand-cut Italian Mazzucchelli acetate frame with beveled edges, gold micro-star temple rivets, and gradient tint Carl Zeiss lenses with 100% UV filtration.',
    image: '/images/accessories/women/accessories-women-cat-eye-sunglasses.webp',
    images: [
      '/images/accessories/women/accessories-women-cat-eye-sunglasses.webp',
    ],
    rating: 4.8,
    reviews: 124,
    colors: ['Havana Tortoise', 'High-Gloss Black'],
    inStock: true,
  },
  {
    id: 505,
    name: 'Evening Envelope Pleated Leather Clutch',
    category: 'accessories',
    subcategory: 'Handbags',
    gender: 'women',
    price: 179.99,
    oldPrice: 229.99,
    discount: 22,
    description: 'Flawlessly gathered lambskin pouch clutch with magnetic frame closure, internal zip pocket, and optional delicate serpentine gold shoulder chain.',
    image: '/images/accessories/women/accessories-women-leather-clutch.webp',
    images: [
      '/images/accessories/women/accessories-women-leather-clutch.webp',
      '/images/accessories/women/accessories-women-luxury-handbag.webp',
    ],
    rating: 4.7,
    reviews: 91,
    colors: ['Metallic Champagne', 'Onyx Black', 'Cream'],
    inStock: true,
  },
  {
    id: 506,
    name: 'Freshwater Baroque Pearl Drop Earrings',
    category: 'accessories',
    subcategory: 'Jewelry',
    gender: 'women',
    price: 119.99,
    oldPrice: 159.99,
    discount: 25,
    description: 'One-of-a-kind natural organic baroque freshwater pearls suspended from organic molten gold vermeil huggie hoops. Hypoallergenic titanium ear posts.',
    image: '/images/accessories/women/accessories-women-pearl-earrings.webp',
    images: [
      '/images/accessories/women/accessories-women-pearl-earrings.webp',
      '/images/accessories/women/accessories-women-gold-necklace.webp',
    ],
    rating: 4.9,
    reviews: 138,
    colors: ['18K Gold Vermeil / Natural Pearl'],
    inStock: true,
    trending: true,
  },
];

// ==========================================
// DATA ACCESS & HELPER FUNCTIONS
// ==========================================

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: number | string): Product | undefined => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return products.find((p) => p.id === numericId);
};

export const getProductsByCategory = (
  category: MainCategory,
  subcategory?: Subcategory,
  gender?: AccessoriesGender
): Product[] => {
  return products.filter((p) => {
    if (p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (category === 'accessories' && gender && p.gender !== gender) return false;
    return true;
  });
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.bestseller || p.new).slice(0, 8);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.new);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter((p) => p.trending);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.bestseller);
};

export const getRelatedProducts = (category: MainCategory, currentId: number): Product[] => {
  return products
    .filter((p) => p.category === category && p.id !== currentId)
    .slice(0, 4);
};

const ARABIC_SEARCH_MAPPINGS: Record<string, string[]> = {
  'بدلة': ['blazer', 'suit', 'wool'],
  'بليزر': ['blazer'],
  'جاكيت': ['jacket', 'blazer', 'coat', 'leather'],
  'سترة': ['jacket', 'sweater'],
  'معطف': ['coat', 'jacket', 'cashmere'],
  'بالطو': ['coat'],
  'تيشيرت': ['t-shirt', 'tee', 'cotton'],
  'تي شيرت': ['t-shirt', 'cotton'],
  'قميص': ['shirt', 'cotton', 'silk'],
  'بنطلون': ['pants', 'trousers', 'chinos', 'jeans'],
  'سروال': ['pants', 'trousers'],
  'جينز': ['jeans', 'denim'],
  'هودي': ['hoodie'],
  'كشمير': ['cashmere'],
  'صوف': ['wool'],
  'قطن': ['cotton'],
  'جلد': ['leather'],
  'حرير': ['silk'],
  'فستان': ['dress'],
  'بلوزة': ['blouse', 'top'],
  'تنورة': ['skirt'],
  'جيبة': ['skirt'],
  'أطفال': ['children', 'boys', 'girls', 'kids'],
  'اطفال': ['children', 'boys', 'girls', 'kids'],
  'بنات': ['girls', 'dress'],
  'أولاد': ['boys', 'pants'],
  'اولاد': ['boys', 'pants'],
  'إكسسوارات': ['accessories', 'watch', 'bag', 'jewelry', 'sunglasses'],
  'اكسسوارات': ['accessories', 'watch', 'bag', 'jewelry'],
  'ساعة': ['watch', 'chronograph'],
  'ساعات': ['watches'],
  'محفظة': ['wallet'],
  'نظارة': ['sunglasses'],
  'نظارات': ['sunglasses'],
  'حزام': ['belt'],
  'حقيبة': ['bag', 'handbag', 'clutch'],
  'شنطة': ['bag', 'handbag'],
  'سوار': ['bracelet'],
  'إسورة': ['bracelet'],
  'اسورة': ['bracelet'],
  'قلادة': ['necklace'],
  'عقد': ['necklace'],
  'حلق': ['earrings'],
  'أقراط': ['earrings'],
  'ذهب': ['gold'],
  'ذهبي': ['gold'],
  'ماس': ['diamond'],
  'ألماس': ['diamond'],
  'لؤلؤ': ['pearl'],
  'رجال': ['men'],
  'رجالي': ['men'],
  'نساء': ['women'],
  'نسائي': ['women'],
  'حريمي': ['women'],
};

export const searchProducts = (query: string): Product[] => {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();

  // Find mapped english terms if query is arabic
  const mappedTerms: string[] = [];
  for (const [arWord, enEquivalents] of Object.entries(ARABIC_SEARCH_MAPPINGS)) {
    if (q.includes(arWord) || arWord.includes(q)) {
      mappedTerms.push(...enEquivalents);
    }
  }

  return products.filter((p) => {
    const arItem = AR_DATA[String(p.id)];
    const arColors = arItem?.colors ? Object.values(arItem.colors).join(' ') : '';
    const textTarget = (
      p.name +
      ' ' +
      (p.nameAr || arItem?.name || '') +
      ' ' +
      p.description +
      ' ' +
      (p.descriptionAr || arItem?.description || '') +
      ' ' +
      p.category +
      ' ' +
      p.subcategory +
      ' ' +
      (p.subcategoryAr || arItem?.subcategory || '') +
      ' ' +
      (p.colors ? p.colors.join(' ') : '') +
      ' ' +
      arColors
    ).toLowerCase();

    // Direct match
    if (textTarget.includes(q)) return true;

    // Mapped Arabic-English match
    if (mappedTerms.some((term) => textTarget.includes(term))) {
      return true;
    }

    return false;
  });
};

