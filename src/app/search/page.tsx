'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard/ProductCard';
import { useLanguage } from '@/hooks';
import { FiSearch, FiXCircle, FiTrendingUp, FiClock } from 'react-icons/fi';
import './search.css';

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const { t, isRTL } = useLanguage();

  const [query, setQuery] = useState(queryParam);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const trendingTags = isRTL
    ? ['بليزر', 'صوف إيطالي', 'كشمير', 'فستان سهرة', 'ساعة ذهبية', 'حقيبة يد', 'جينز', 'جلد']
    : ['Blazer', 'Italian Wool', 'Cashmere', 'Evening Dress', 'Gold Watch', 'Handbag', 'Denim', 'Leather'];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('novawear_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [queryParam]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query.trim());
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (isHydrated) {
      const filtered = recentSearches.filter((item) => item.toLowerCase() !== query.trim().toLowerCase());
      const updated = [query.trim(), ...filtered].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('novawear_recent_searches', JSON.stringify(updated));
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    if (isHydrated) {
      const filtered = recentSearches.filter((item) => item.toLowerCase() !== tag.toLowerCase());
      const updated = [tag, ...filtered].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('novawear_recent_searches', JSON.stringify(updated));
    }
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('novawear_recent_searches');
  };

  return (
    <div className="search-page-wrapper container">
      <div className="search-header">
        <span className="search-breadcrumb">
          {isRTL ? 'نوفا وير / البحث الذكي' : 'NOVA WEAR / INTELLIGENT DISCOVERY'}
        </span>
        <h1 className="search-title gold-gradient-text">
          {isRTL ? 'البحث عن القطع الفاخرة' : 'SEARCH CREATIONS'}
        </h1>
        <p className="search-subtitle">
          {isRTL
            ? 'استكشف تشكيلاتنا الراقية بالبحث عن اسم القطعة، نوع القماش، أو التصنيف'
            : 'Explore our bespoke collections by garment name, material, or category.'}
        </p>
      </div>

      {/* Main Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-form-bar glass-panel">
        <FiSearch className="search-bar-icon" />
        <input
          type="text"
          placeholder={
            isRTL
              ? "ابحث عن 'بليزر صوف'، 'كشمير'، 'فستان'، 'ساعة ذهبية'..."
              : "Search by keyword, e.g. 'Wool Blazer', 'Cashmere', 'Dress', 'Gold Watch'..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoFocus
        />
        {query && (
          <button
            type="button"
            className="search-clear-x"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <FiXCircle size={20} />
          </button>
        )}
        <button type="submit" className="btn btn-primary search-btn">
          {isRTL ? 'بحث' : 'SEARCH'}
        </button>
      </form>

      {/* Discovery Tags & History */}
      <div className="search-suggestions-band">
        <div className="suggestion-section">
          <div className="suggestion-title-row">
            <FiTrendingUp className="gold-text" />
            <span>{isRTL ? 'الكلمات الأكثر بحثاً:' : 'POPULAR SEARCHES:'}</span>
          </div>
          <div className="tags-row">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="search-pill-btn"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div className="suggestion-section">
            <div className="suggestion-title-row justify-between">
              <div className="inline-flex items-center gap-1">
                <FiClock className="gold-text" />
                <span>{isRTL ? 'عمليات البحث الأخيرة:' : 'RECENT SEARCHES:'}</span>
              </div>
              <button type="button" className="clear-recents-link" onClick={clearHistory}>
                {isRTL ? 'مسح السجل' : 'Clear'}
              </button>
            </div>
            <div className="tags-row">
              {recentSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="search-pill-btn recent"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results Display */}
      {query.trim() && (
        <div className="search-results-section">
          <div className="search-results-header">
            <h2>
              {isRTL ? (
                <>
                  تم العثور على <strong>{results.length}</strong> قطعة مطابقة لـ &ldquo;{query}&rdquo;
                </>
              ) : (
                <>
                  Found <strong>{results.length}</strong> creations for &ldquo;{query}&rdquo;
                </>
              )}
            </h2>
          </div>

          {results.length > 0 ? (
            <div className="search-products-grid">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="search-no-results glass-panel">
              <div className="empty-search-icon">✧</div>
              <h3>{isRTL ? 'لم يتم العثور على نتائج مطابقة' : 'No matching creations found'}</h3>
              <p>
                {isRTL
                  ? `لم نتمكن من العثور على أي منتج يطابق بحثك "${query}". جرب البحث بكلمات أخرى أو تصفح الأقسام المقترحة أعلاه.`
                  : `We could not find any products matching your query "${query}". Try exploring our curated collections or trending tags.`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container py-12 text-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
