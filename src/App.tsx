import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { LiveFeedTerminal } from './components/LiveFeedTerminal';
import { StoreCard } from './components/StoreCard';
import { StoreDetailView } from './components/StoreDetailView';
import { CouponCard } from './components/CouponCard';
import { CouponRevealModal } from './components/CouponRevealModal';
import { SubmitCouponModal } from './components/SubmitCouponModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { StoreRequestModal } from './components/StoreRequestModal';
import { StoreOwnerDashboardModal } from './components/StoreOwnerDashboardModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { Store } from './types';
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Percent,
  PlusCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Building2,
  Utensils,
  Shirt,
  Laptop,
  Hotel,
  Home,
  Code,
  Grid,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  const {
    stores,
    coupons,
    selectedStore,
    setSelectedStoreSlug,
    setIsSearchModalOpen,
    setIsStoreRequestModalOpen,
    openSubmitModal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Categories with distinct icons
  const CATEGORIES = [
    { id: 'all', name: 'All Stores', icon: Grid },
    { id: 'food-restaurants', name: 'Food & Dining', icon: Utensils },
    { id: 'fashion', name: 'Fashion & Apparel', icon: Shirt },
    { id: 'hotels-travel', name: 'Hotels & Travel', icon: Hotel },
    { id: 'devices', name: 'Tech & Mobiles', icon: Laptop },
    { id: 'home-garden', name: 'Home & Groceries', icon: Home },
    { id: 'software', name: 'Software & Printing', icon: Code }
  ];

  // Filtered stores
  const filteredStores = stores.filter(store => {
    const matchesCategory = activeCategory === 'all' || store.category === activeCategory;
    const matchesQuery =
      !searchQuery ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.topDeal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Trending top verified coupon tickets
  const trendingCoupons = coupons
    .filter(c => c.isVerified)
    .slice(0, 6);

  const faqs = [
    {
      q: 'How does couponscode.store verify coupon codes?',
      a: 'Every coupon code is verified before being published. Shoppers vote with Yes/No feedback on whether the code gave them a discount at checkout, and our moderation team regularly audits coupon health.'
    },
    {
      q: 'Can merchants register their store?',
      a: 'Yes! Click "Request Store" in the header to submit your store domain, logo, and owner email. Once approved by Super Admin or Editor, you will receive login credentials to manage and submit official store coupons.'
    },
    {
      q: 'Are these coupons 100% free to copy?',
      a: 'Yes, completely free forever. You can copy any promo code with a single click, without creating an account or paying any fees.'
    },
    {
      q: 'How do I apply a copied coupon code?',
      a: 'Click "Show code" on any coupon ticket to copy it to your clipboard. Then visit the merchant store, proceed to the checkout payment page, and paste the code into the Promo Code or Voucher box.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#101013] text-[#EAF0F7] flex flex-col font-sans selection:bg-[#03FF88] selection:text-black">
      {/* Dynamic SEO Title, Meta Tags & Schema.org JSON-LD */}
      <SEOHead />

      {/* Responsive Header */}
      <Header />

      {/* Main Content: Store Detail View OR Home Landing */}
      <main className="flex-1">
        {selectedStore ? (
          <StoreDetailView store={selectedStore} />
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {/* HERO SECTION */}
            <section className="pt-10 sm:pt-16 pb-6 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1E22] border border-[#2F3032] text-xs sm:text-sm font-semibold text-white mb-5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#03FF88] animate-pulse shrink-0" />
                <span>
                  Testing <strong className="text-[#03FF88]">100% verified promo codes</strong> across {stores.length} top stores
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-[1.1] mb-4">
                Coupon codes that <br className="hidden sm:inline" />
                <span className="text-[#03FF88]">actually work.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#A3A6A8] max-w-xl mx-auto mb-6 leading-relaxed">
                Pick a store, click a ticket, and the verified promo code is yours. Copy instantly and save on your online shopping.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative mb-6">
                <div className="flex items-center gap-2.5 bg-[#1C1E22] border-2 border-[#2F3032] hover:border-[#03FF88]/70 focus-within:border-[#03FF88] rounded-2xl p-2.5 sm:p-3 text-left transition-all shadow-xl">
                  <Search className="w-5 h-5 text-[#03FF88] ml-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search any store or discount (e.g. KFC, Daraz, Serena, Khaadi)..."
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#A3A6A8] outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#A3A6A8] hover:text-white px-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Category Chips with Icons */}
              <div className="flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#03FF88] text-black shadow-md'
                          : 'bg-[#1C1E22] hover:bg-[#25272c] text-[#D8D9DA] hover:text-white border border-[#2F3032]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#03FF88]'}`} />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STORES DIRECTORY */}
            <section id="store-directory-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                    {activeCategory === 'all' ? 'Popular Stores' : CATEGORIES.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <p className="text-xs text-[#A3A6A8] mt-0.5">
                    Showing {filteredStores.length} stores with tested promo codes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsStoreRequestModalOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#03FF88] hover:underline cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Request Your Store</span>
                </button>
              </div>

              {filteredStores.length === 0 ? (
                <div className="p-12 text-center bg-[#17181c] border border-dashed border-[#2F3032] rounded-3xl space-y-2">
                  <p className="text-sm font-semibold text-white">No store matches "{searchQuery}".</p>
                  <p className="text-xs text-[#A3A6A8]">Try a different search query or request your store to be listed.</p>
                  <button
                    type="button"
                    onClick={() => setIsStoreRequestModalOpen(true)}
                    className="mt-2 inline-flex items-center gap-1.5 bg-[#03FF88] text-black font-extrabold text-xs px-4 py-2 rounded-xl"
                  >
                    Request to Add Store
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {filteredStores.map(store => (
                    <StoreCard key={store.id} store={store} />
                  ))}
                </div>
              )}
            </section>

            {/* TRENDING TOP-PICK COUPON TICKETS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-bold text-[#03FF88] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#03FF88]" />
                    <span>Trending Deals</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                    Verified Working Promo Codes
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingCoupons.map(coupon => {
                  const store = stores.find(s => s.id === coupon.storeId);
                  return (
                    <CouponCard
                      key={coupon.id}
                      coupon={coupon}
                      storeLogo={store?.logo}
                      showStoreName={true}
                    />
                  );
                })}
              </div>
            </section>

            {/* LIVE VERIFICATION ENGINE STREAM */}
            <LiveFeedTerminal />

            {/* SIMPLE SHOPPER FAQ */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center mb-8">
                <h2 className="text-xl sm:text-3xl font-extrabold text-white font-heading">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-[#A3A6A8] mt-1">
                  Everything you need to know about using couponscode.store.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-[#2F3032] rounded-2xl bg-[#17181c] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-[#03FF88] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#A3A6A8] shrink-0 transition-transform ${
                          openFaqIndex === idx ? 'rotate-180 text-[#03FF88]' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#A3A6A8] leading-relaxed border-t border-[#2F3032]/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
      <CouponRevealModal />
      <SubmitCouponModal />
      <AdminLoginModal />
      <AdminDashboard />
      <StoreRequestModal />
      <StoreOwnerDashboardModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
}
