import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { Search, X, ShieldCheck, Tag, ArrowRight, Store as StoreIcon } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    stores,
    coupons,
    setSelectedStoreSlug,
    openRevealModal
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  // Global Keyboard listener for CMD+K or ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Results
  const matchingStores = cleanQ
    ? stores.filter(
        s =>
          s.name.toLowerCase().includes(cleanQ) ||
          s.slug.toLowerCase().includes(cleanQ) ||
          s.category.toLowerCase().includes(cleanQ)
      )
    : [];

  const matchingCoupons = cleanQ
    ? coupons.filter(
        c =>
          c.code.toLowerCase().includes(cleanQ) ||
          c.discount.toLowerCase().includes(cleanQ) ||
          c.storeName.toLowerCase().includes(cleanQ) ||
          c.description.toLowerCase().includes(cleanQ)
      )
    : [];

  const popularStores = stores.slice(0, 6);
  const trendingCoupons = coupons.filter(c => c.isTopPick || c.healthScore >= 95).slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setIsSearchModalOpen(false)}
      className="fixed inset-0 z-[9200] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#2F3032] border border-[#4E5255] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#3a3d40] flex items-center gap-3 bg-[#212327]">
          <Search className="w-5 h-5 text-[#03FF88] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search any store, brand, or promo code (e.g. Daraz, Vistaprint, 15WELCOME)..."
            className="w-full bg-transparent text-white placeholder-[#A3A6A8] text-base outline-none font-medium"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#A3A6A8] hover:text-white p-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(false)}
            className="text-[#A3A6A8] hover:text-white p-1.5 rounded-lg hover:bg-[#2F3032]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-5 overflow-y-auto space-y-6">
          {cleanQ ? (
            /* Searched state */
            <div className="space-y-5">
              {/* Stores found */}
              <div>
                <h4 className="text-xs font-bold text-[#A3A6A8] uppercase tracking-wider mb-2.5">
                  Stores ({matchingStores.length})
                </h4>
                {matchingStores.length === 0 ? (
                  <p className="text-xs text-[#A3A6A8] italic">No matching stores found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingStores.map(store => (
                      <div
                        key={store.id}
                        onClick={() => {
                          setSelectedStoreSlug(store.slug);
                          setIsSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#212327] hover:bg-[#1a1b1d] border border-[#3a3d40] hover:border-[#03FF88]/50 flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={store.logo}
                            alt={store.name}
                            className="w-8 h-8 rounded-lg object-contain bg-white p-1 shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="text-sm font-bold text-white truncate">{store.name}</h5>
                            <span className="text-[11px] text-[#A3A6A8] truncate block">
                              {store.domain}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#03FF88] shrink-0">
                          {store.verifiedCodesCount} codes
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Coupons found */}
              <div>
                <h4 className="text-xs font-bold text-[#A3A6A8] uppercase tracking-wider mb-2.5">
                  Matching Codes ({matchingCoupons.length})
                </h4>
                {matchingCoupons.length === 0 ? (
                  <p className="text-xs text-[#A3A6A8] italic">No matching coupons found.</p>
                ) : (
                  <div className="space-y-2">
                    {matchingCoupons.map(coupon => (
                      <div
                        key={coupon.id}
                        onClick={() => {
                          openRevealModal(coupon);
                          setIsSearchModalOpen(false);
                        }}
                        className="p-3 rounded-xl bg-[#212327] hover:bg-[#1a1b1d] border border-[#3a3d40] hover:border-[#03FF88]/50 flex items-center justify-between gap-3 cursor-pointer transition-all"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{coupon.storeName}</span>
                            <span className="font-mono text-xs font-black text-[#03FF88] bg-black/60 px-2 py-0.5 rounded border border-[#03FF88]/30">
                              {coupon.code}
                            </span>
                            <span className="text-xs font-bold text-[#FFBC13]">{coupon.discount}</span>
                          </div>
                          <p className="text-xs text-[#A3A6A8] truncate mt-1">
                            {coupon.description}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#03FF88] shrink-0">Show Code &rarr;</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Default pre-search preview */
            <div className="space-y-6">
              {/* Popular Stores */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Popular Stores
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {popularStores.map(store => (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => {
                        setSelectedStoreSlug(store.slug);
                        setIsSearchModalOpen(false);
                      }}
                      className="p-3 rounded-xl bg-[#212327] hover:bg-[#1a1b1d] border border-[#3a3d40] hover:border-[#03FF88]/40 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="w-6 h-6 rounded object-contain bg-white p-0.5"
                        />
                        <span className="text-sm font-bold text-white group-hover:text-[#03FF88] truncate">
                          {store.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#A3A6A8] font-mono">
                        {store.verifiedCodesCount} verified codes
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Coupons */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Trending Verified Coupons
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {trendingCoupons.map(coupon => (
                    <div
                      key={coupon.id}
                      onClick={() => {
                        openRevealModal(coupon);
                        setIsSearchModalOpen(false);
                      }}
                      className="p-3 rounded-xl bg-[#212327] hover:bg-[#1a1b1d] border border-[#3a3d40] hover:border-[#03FF88]/50 flex items-center justify-between cursor-pointer transition-all"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{coupon.storeName}</div>
                        <div className="text-sm font-black text-[#03FF88] font-mono mt-0.5">
                          {coupon.discount}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] bg-[#03FF88]/15 text-[#03FF88] font-bold px-2 py-0.5 rounded">
                          {coupon.healthScore}% Health
                        </span>
                        <div className="text-[11px] text-[#A3A6A8] mt-1 font-mono">{coupon.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                  Explore by Category
                </div>
                <div className="flex flex-wrap gap-2">
                  {INITIAL_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setQuery(cat.name)}
                      className="px-3 py-1.5 rounded-full bg-[#212327] hover:bg-[#1a1b1d] border border-[#4E5255] text-xs font-medium text-[#D8D9DA] hover:text-white transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
