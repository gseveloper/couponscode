import React, { useState } from 'react';
import { Store, Coupon } from '../types';
import { useApp } from '../context/AppContext';
import { CouponCard } from './CouponCard';
import {
  Star,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Plus,
  HelpCircle,
  Truck,
  RotateCcw,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Building2
} from 'lucide-react';

interface StoreDetailViewProps {
  store: Store;
}

export const StoreDetailView: React.FC<StoreDetailViewProps> = ({ store }) => {
  const { coupons, setSelectedStoreSlug, openSubmitModal, voteProTip, setIsStoreRequestModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'coupons' | 'hacks' | 'faq'>('coupons');

  const storeCoupons = coupons.filter(c => c.storeId === store.id);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 animate-in fade-in duration-200">
      {/* Breadcrumb Nav */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#A3A6A8] mb-5 overflow-x-auto whitespace-nowrap pb-1"
      >
        <button
          type="button"
          onClick={() => setSelectedStoreSlug(null)}
          className="hover:text-white transition-colors cursor-pointer"
        >
          couponscode.store
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#4E5255] shrink-0" />
        <span className="capitalize">{store.category.replace('-', ' & ')}</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#4E5255] shrink-0" />
        <span className="text-white font-semibold truncate">{store.name} Coupon Codes</span>
      </nav>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Sidebar: Store Profile */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-[#17181c] border border-[#2F3032] rounded-3xl p-5 space-y-4 shadow-xl">
            {/* Logo Card */}
            <div className="h-28 bg-white rounded-2xl p-3 flex items-center justify-center overflow-hidden shadow-inner border border-[#3a3d40]">
              <img
                src={store.logo}
                alt={`${store.name} logo`}
                className="max-h-full max-w-full object-contain"
                loading="eager"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white font-heading">
                {store.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-[#FFBC13]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#D8D9DA] font-semibold">
                  {store.rating} ({store.totalRatings} verified reviews)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A3A6A8] leading-relaxed">{store.description}</p>

            {/* Savings Intel */}
            {store.savingsIntel && (
              <div className="pt-3 border-t border-[#2F3032] space-y-1">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#03FF88]" />
                  <span>Savings Tip</span>
                </div>
                <p className="text-xs text-[#D8D9DA] leading-relaxed">{store.savingsIntel}</p>
              </div>
            )}

            {/* Direct Shop Link */}
            <a
              href={store.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md cursor-pointer text-decoration-none"
            >
              <span>Visit {store.name}</span>
              <ExternalLink className="w-4 h-4 text-black" />
            </a>
          </div>

          {/* Submit Coupon CTA for this store */}
          <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032] text-center space-y-2">
            <div className="text-xs font-bold text-white">Have a working code for {store.name}?</div>
            <p className="text-[11px] text-[#A3A6A8]">
              Share it with shoppers and help everyone save.
            </p>
            <button
              type="button"
              onClick={() => openSubmitModal(store.id)}
              className="w-full bg-[#2F3032] hover:bg-[#3a3d40] text-[#03FF88] border border-[#03FF88]/30 text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Code for {store.name}</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content: Tickets */}
        <div className="lg:col-span-8 space-y-5">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#2F3032] pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('coupons')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'coupons'
                  ? 'bg-[#03FF88] text-black shadow'
                  : 'bg-[#1C1E22] text-[#D8D9DA] hover:text-white'
              }`}
            >
              Coupon Codes ({storeCoupons.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hacks')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'hacks'
                  ? 'bg-[#03FF88] text-black shadow'
                  : 'bg-[#1C1E22] text-[#D8D9DA] hover:text-white'
              }`}
            >
              Shopping Hacks ({store.proTips?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-[#03FF88] text-black shadow'
                  : 'bg-[#1C1E22] text-[#D8D9DA] hover:text-white'
              }`}
            >
              FAQ
            </button>
          </div>

          {/* TAB 1: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-3.5">
              {storeCoupons.length === 0 ? (
                <div className="p-12 text-center bg-[#17181c] border border-dashed border-[#2F3032] rounded-3xl space-y-3">
                  <ShieldCheck className="w-10 h-10 text-[#03FF88] mx-auto opacity-70" />
                  <h3 className="text-base font-bold text-white">No Active Promo Codes Right Now</h3>
                  <p className="text-xs text-[#A3A6A8] max-w-sm mx-auto">
                    We test daily for new discount codes for {store.name}. Have a code that worked for you?
                  </p>
                  <button
                    type="button"
                    onClick={() => openSubmitModal(store.id)}
                    className="bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Submit a Code
                  </button>
                </div>
              ) : (
                storeCoupons.map(coupon => (
                  <CouponCard
                    key={coupon.id}
                    coupon={coupon}
                    storeLogo={store.logo}
                    showStoreName={false}
                  />
                ))
              )}
            </div>
          )}

          {/* TAB 2: HACKS */}
          {activeTab === 'hacks' && (
            <div className="space-y-3">
              {store.proTips && store.proTips.length > 0 ? (
                store.proTips.map(tip => (
                  <div
                    key={tip.id}
                    className="p-4 rounded-2xl bg-[#17181c] border border-[#2F3032] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between text-[#A3A6A8]">
                      <span className="font-bold text-[#03FF88] flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-[#03FF88]" />
                        Tip by @{tip.user}
                      </span>
                      <span>{tip.date}</span>
                    </div>
                    <p className="text-white text-sm leading-relaxed italic">"{tip.text}"</p>
                    <div className="flex items-center gap-3 pt-2 text-[#A3A6A8]">
                      <button
                        type="button"
                        onClick={() => voteProTip(store.id, tip.id, true)}
                        className="hover:text-[#03FF88] flex items-center gap-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful ({tip.upvotes})</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-[#17181c] border border-[#2F3032] rounded-2xl text-xs text-[#A3A6A8]">
                  No insider tips submitted yet for {store.name}.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#17181c] border border-[#2F3032] space-y-1.5 text-xs">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#03FF88]" />
                  <span>How do I use a coupon code at {store.name}?</span>
                </h4>
                <p className="text-[#A3A6A8] leading-relaxed">
                  Click the "Show code" button on any coupon ticket above to reveal and copy your code. Add your items to your shopping cart on {store.name}, proceed to checkout, and look for the "Promo Code" or "Voucher" box. Paste the code and tap Apply to receive your instant discount.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#17181c] border border-[#2F3032] space-y-1.5 text-xs">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#03FF88]" />
                  <span>Are these {store.name} coupon codes verified?</span>
                </h4>
                <p className="text-[#A3A6A8] leading-relaxed">
                  Yes, each code is tested by our verification team and backed by real shopper upvotes. You can see the real-time success rate on each coupon card before copying.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
