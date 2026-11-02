import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { ChevronDown, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const FindDealsDropdown: React.FC = () => {
  const { stores, coupons, setSelectedStoreSlug, openRevealModal } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('fashion');

  const activeCategory = INITIAL_CATEGORIES.find(c => c.slug === activeCategorySlug) || INITIAL_CATEGORIES[0];
  const categoryStores = stores.filter(s => s.category === activeCategorySlug);
  const categoryCoupons = coupons.filter(c => {
    const st = stores.find(s => s.id === c.storeId);
    return st && st.category === activeCategorySlug;
  }).slice(0, 4);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white rounded-lg hover:bg-[#212327] transition-colors"
        aria-expanded={isOpen}
      >
        <span>Find Deals</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Invisible bridge for hover stability */}
      {isOpen && <div className="absolute top-full left-0 w-full h-3 z-40" />}

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-50 flex flex-row bg-[#2F3032] border border-[#3a3d40] rounded-2xl shadow-2xl overflow-hidden max-w-[92vw] w-[860px]">
          {/* Categories Column */}
          <div className="w-[260px] bg-[#2F3032] p-3 flex flex-col gap-1 border-r border-[#3a3d40] shrink-0">
            <div className="px-3 py-1 text-xs font-bold text-[#A3A6A8] uppercase tracking-wider">
              Browse Categories
            </div>
            <div className="flex-1 overflow-y-auto max-h-[380px] space-y-1 pr-1">
              {INITIAL_CATEGORIES.map(cat => {
                const isSelected = cat.slug === activeCategorySlug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-all text-left ${
                      isSelected
                        ? 'bg-[#212327] text-white shadow-inner border border-[#4E5255]/50'
                        : 'text-[#D8D9DA] hover:bg-[#212327]/60 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-xs text-[#A3A6A8] ml-2 shrink-0">{cat.subcategories.length}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Merchants & Featured Deals */}
          <div className="flex-1 bg-black p-4 flex flex-row gap-4 overflow-hidden">
            {/* Merchant Column */}
            <div className="w-[210px] flex flex-col shrink-0">
              <div className="text-xs font-bold text-[#A3A6A8] uppercase tracking-wider mb-2">
                Top {activeCategory.name} Stores
              </div>
              <div className="flex-1 overflow-y-auto max-h-[340px] space-y-1">
                {categoryStores.length === 0 ? (
                  <div className="text-xs text-[#A3A6A8] p-3">No stores currently in this category.</div>
                ) : (
                  categoryStores.map(store => (
                    <button
                      key={store.id}
                      type="button"
                      onClick={() => {
                        setSelectedStoreSlug(store.slug);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-left text-sm font-medium text-white hover:bg-[#2F3032] transition-colors group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="w-6 h-6 rounded-md object-contain bg-white p-0.5 shrink-0"
                        />
                        <span className="truncate text-xs font-semibold">{store.name}</span>
                      </div>
                      <span className="text-[11px] text-[#03FF88] shrink-0 font-mono">
                        {store.verifiedCodesCount} codes
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Featured Deals Column */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="text-xs font-bold text-[#A3A6A8] uppercase tracking-wider mb-2">
                Verified Codes ({categoryCoupons.length})
              </div>
              <div className="grid grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {categoryCoupons.length === 0 ? (
                  <div className="col-span-2 text-xs text-[#A3A6A8] p-4 text-center border border-[#2F3032] rounded-xl">
                    No active verified codes in this category right now.
                  </div>
                ) : (
                  categoryCoupons.map(coupon => (
                    <div
                      key={coupon.id}
                      onClick={() => {
                        openRevealModal(coupon);
                        setIsOpen(false);
                      }}
                      className="p-3 rounded-xl bg-[#2F3032] hover:bg-[#212327] border border-[#3a3d40] hover:border-[#03FF88]/50 cursor-pointer transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-white font-mono bg-black/40 px-2 py-0.5 rounded border border-[#4E5255]">
                          {coupon.discount}
                        </span>
                        <span className="text-[10px] text-[#03FF88] flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3 h-3" /> {coupon.healthScore}%
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white line-clamp-1">
                        {coupon.storeName}
                      </div>
                      <div className="text-[11px] text-[#A3A6A8] line-clamp-1">
                        {coupon.description}
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-[#4E5255]/40 text-[11px]">
                        <span className="font-mono text-[#D8D9DA]">{coupon.code}</span>
                        <span className="text-[#03FF88] font-bold">Copy</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
