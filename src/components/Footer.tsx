import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Building2, Ticket, PlusCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setSelectedStoreSlug,
    setIsAdminModalOpen,
    isAdmin,
    isStoreOwner,
    setIsAdminDashboardOpen,
    setIsStoreOwnerDashboardOpen,
    setIsStoreRequestModalOpen,
    openSubmitModal
  } = useApp();

  return (
    <footer className="bg-[#0b0b0d] border-t border-[#2F3032] mt-16 text-[#A3A6A8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#03FF88] text-black font-black px-2 py-0.5 rounded text-sm font-heading">
                couponscode
              </span>
              <span className="text-white font-bold text-sm font-mono">.store</span>
            </div>
            <p className="text-[#A3A6A8] text-xs leading-relaxed">
              Find 100% verified working coupon codes for your favorite online stores. Tested by real shoppers at checkout.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17181c] border border-[#2F3032] text-[11px] text-[#03FF88] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Verified Working Codes</span>
            </div>
          </div>

          {/* Popular Stores */}
          <div>
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Popular Stores
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'KFC Pakistan', slug: 'kfc.com.pk' },
                { name: 'Daraz PK', slug: 'daraz.pk' },
                { name: 'Cheezious', slug: 'cheezious.com' },
                { name: 'Serena Hotels', slug: 'serenahotels.com' },
                { name: 'PC Hotels', slug: 'pchotels.com' },
                { name: 'Khaadi', slug: 'pk.khaadi.com' },
                { name: 'Foodpanda', slug: 'foodpanda.pk' }
              ].map(st => (
                <li key={st.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStoreSlug(st.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {st.name} Promo Codes
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Merchant Solutions */}
          <div>
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#03FF88]" />
              <span>For Store Owners</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => setIsStoreRequestModalOpen(true)}
                  className="hover:text-white text-[#03FF88] transition-colors cursor-pointer flex items-center gap-1.5 font-semibold"
                >
                  <span>Request / Register Your Store</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Merchant Portal Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openSubmitModal()}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3 h-3 text-[#03FF88]" />
                  <span>Submit a Coupon Code</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Operator Access */}
          <div>
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Operator Access
            </h4>
            <div className="space-y-3">
              <p className="text-[11px] text-[#A3A6A8]">
                Restricted portal for Super Admin (gseveloper) and Sub-Admin editors to approve stores and moderate codes.
              </p>
              {isAdmin ? (
                <button
                  type="button"
                  onClick={() => setIsAdminDashboardOpen(true)}
                  className="bg-[#03FF88] text-black font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              ) : isStoreOwner ? (
                <button
                  type="button"
                  onClick={() => setIsStoreOwnerDashboardOpen(true)}
                  className="bg-[#03FF88] text-black font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Store Portal</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="bg-[#212327] hover:bg-[#2F3032] border border-[#4E5255] text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#03FF88]" />
                  <span>Portal Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-[#2F3032] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© {new Date().getFullYear()} couponscode.store. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[#A3A6A8] flex-wrap justify-center">
            <span>Verified by real checkouts</span>
            <span>•</span>
            <span>Simple, Fast & Free</span>
            <span>•</span>
            <span className="text-[#03FF88] font-semibold">100% Working Codes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
