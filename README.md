# NOVA WEAR — Haute Couture & Modern Luxury Fashion

**NOVA WEAR** is a high-end luxury fashion e-commerce storefront engineered with Next.js 15 (App Router), TypeScript, React 19, and a bespoke Black & Gold visual identity.

---

## 🌟 Architecture & Technology Stack

- **Framework**: Next.js 15.5+ (App Router, Server Components by default, selective Client Components)
- **Language**: TypeScript 5.9+ (Strict type-checking, strongly typed data models)
- **UI & Styling**: Pure modern CSS Architecture with luxury Black & Gold CSS variables (`--primary-gold: #C8A963`, `--primary-black: #0D0D0D`), Cairo & Poppins typography, and backdrop glassmorphism.
- **State & Shopping Logic**:
  - `CartContext`: Full cart lifecycle with local storage persistence, variant tracking (size/color), free shipping threshold calculation, promo codes.
  - `WishlistContext`: Real-time wishlist management with animated badges and fast add/remove.
  - `CurrencyContext`: Multi-currency converter & formatter (USD, EUR, EGP, SAR).
  - `LanguageContext`: Bilingual English & Arabic localization with instant RTL/LTR switching.
  - `ToastContext`: Luxury feedback toast alerts for shopping actions.
- **Image Pipeline**: High-resolution genuine fashion photography optimized in WebP format, organized locally in `public/images/`.

---

## 📂 Project Structure

```
novawear/
├── public/
│   └── images/
│       ├── men/                      # Verified men's fashion photography
│       ├── women/                    # Verified women's fashion photography
│       ├── children/                 # Verified kids' fashion photography
│       └── accessories/
│           ├── men/                  # Verified men's accessories (watches, wallets, bags)
│           └── women/                # Verified women's accessories (handbags, 18k jewelry)
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with fonts, metadata, providers, nav, footer
│   │   ├── page.tsx                  # Luxury Homepage (Hero, Categories, Featured, Trending)
│   │   ├── men/                      # Men's Sartorial Collection
│   │   ├── women/                    # Women's Haute Couture Collection
│   │   ├── children/                 # Children's Luxury Collection
│   │   ├── accessories/              # Independent Men's & Women's Accessories
│   │   ├── product/[id]/             # Product Detail Page (SSG pre-rendered, gallery, size/color)
│   │   ├── cart/                     # Interactive Shopping Bag & Free Shipping Meter
│   │   ├── wishlist/                 # Saved Wishlist with Quick-to-Bag
│   │   ├── checkout/                 # Simulated Encrypted Checkout & Confirmation Modal
│   │   ├── search/                   # Instant Keyword Search with Trending Tags & History
│   │   ├── sitemap.ts                # Dynamic XML Sitemap generator
│   │   ├── robots.ts                 # Dynamic robots.txt
│   │   └── globals.css               # Global Black & Gold design tokens & utilities
│   ├── components/                   # Modular Reusable UI Components
│   │   ├── common/                   # Shared atomic components (Logo, Toast, Loading, Skeleton)
│   │   ├── layout/                   # Structural layout (Navbar, Footer, Providers, AnnouncementBar, MobileNavDrawer)
│   │   ├── home/                     # Homepage exclusive sections (HeroSection, EditorialBanner, Testimonials)
│   │   ├── products/                 # Product display (ProductCard, ProductGallery, ProductAssurances)
│   │   ├── categories/               # Catalog navigation (CategoryCard, CategoryCatalog, SubcategoryPills, FilterToolbar)
│   │   ├── cart/                     # Shopping bag widgets (ShippingProgressBar, CartSummaryCard)
│   │   └── checkout/                 # Checkout elements (OrderConfirmationModal)
│   ├── context/                      # React State Providers (Cart, Wishlist, Currency, Theme, Language, Toast, Product)
│   ├── hooks/                        # Centralized custom hooks (useCart, useWishlist, useCurrency, etc.)
│   ├── data/
│   │   └── products.ts               # Strongly-typed product catalog across all 5 destinations
│   ├── types/
│   │   ├── product.ts                # TypeScript product and category interfaces
│   │   └── cart.ts                   # Cart items, address, and order interfaces
│   ├── locales/                      # Bilingual i18n dictionaries (ar.json, en.json)
│   └── utils/
│       └── colors.ts                 # Color palette utility
├── eslint.config.mjs                 # Flat ESLint 9 configuration
├── next.config.mjs                   # Next.js configuration
├── tsconfig.json                     # Strict TypeScript compiler configuration
└── package.json                      # Cleaned dependencies (purged legacy CRA packages)
```

---

## 🚀 Getting Started

### 1. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 2. Type Check

```bash
npx tsc --noEmit
```

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 💎 Business Classification & Product Hierarchy

1. **MEN — Men's Fashion**: Blazers, T-Shirts, Selvedge Denim, Oxford Shirts, Chinos, Lambskin Jackets, Urban Hoodies, Cashmere Sweaters.
2. **WOMEN — Women's Fashion**: Silk Crepe Evening Gowns, Summer Midi Dresses, Mulberry Silk Blouses, Nappa Moto Jackets, Tailored Trousers, Pleated Skirts, Ribbed Knit Tops, Double-Breasted Cashmere Coats.
3. **CHILDREN — Kids' Fashion**: Linen Blazer & Shorts Sets, Broderie Anglaise Dresses, Organic Breton Tees, Denim Joggers, Fleece Zip Sets, Holiday Party Dresses.
4. **ACCESSORIES — Fashion Accessories**:
   - **Men's Accessories**: Automatic Watches, Vachetta Leather Wallets, Titanium Sunglasses, Reversible Belts, Weekender Duffle Bags, Gold Chronographs.
   - **Women's Accessories**: Grained Calfskin Top-Handle Bags, 18k Solid Gold Herringbone Necklaces, Lab-Grown Diamond Tennis Bracelets, Cat-Eye Sunglasses, Evening Clutches, Baroque Pearl Earrings.

---

## 🔒 Administrative Systems Removal

As per engineering specifications, the legacy CRA administrative dashboard (`/admin`), authentication mock endpoints (`/login`, `/register`, `/profile`), and admin mutators have been completely decommissioned. The storefront is a standalone, customer-facing luxury shopping destination.
