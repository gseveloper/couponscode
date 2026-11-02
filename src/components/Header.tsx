import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  PlusCircle,
  ShieldCheck,
  Lock,
  LogOut,
  Menu,
  X,
  Building2,
  Sparkles,
  Crown
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    isSuperAdmin,
    isStoreOwner,
    logout,
    setIsAdminModalOpen,
    setIsAdminDashboardOpen,
    setIsStoreRequestModalOpen,
    setIsStoreOwnerDashboardOpen,
    setIsSearchModalOpen,
    openSubmitModal,
    setSelectedStoreSlug,
    submissions,
    storeRequests
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const pendingRequestsCount = storeRequests.filter(r => r.status === 'pending').length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#101013]/95 backdrop-blur-md border-b border-[#2F3032]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* Left: Brand Logo & Desktop Nav */}
            <div className="flex items-center gap-3 sm:gap-6 min-w-0">
              <a
                href="#home"
                onClick={e => {
                  e.preventDefault();
                  setSelectedStoreSlug(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 sm:gap-2.5 text-decoration-none group cursor-pointer shrink-0"
              >
                {/* Brand Badge */}
                <div className="flex items-center gap-1.5 bg-[#03FF88] text-black px-2.5 sm:px-3 py-1 rounded-xl font-black tracking-tight text-sm sm:text-base shadow-sm group-hover:scale-105 transition-transform font-heading">
                  <span>couponscode</span>
                  <span className="text-[11px] bg-black text-[#03FF88] px-1.5 py-0.5 rounded-md font-mono font-bold">
                    .store
                  </span>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-1.5">
                <a
                  href="#stores"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedStoreSlug(null);
                    const el = document.getElementById('store-directory-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#D8D9DA] hover:text-white rounded-lg hover:bg-[#212327] transition-colors"
                >
                  All Stores
                </a>

                {/* Request Store CTA */}
                <button
                  type="button"
                  onClick={() => setIsStoreRequestModalOpen(true)}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#03FF88] hover:text-white rounded-lg hover:bg-[#212327] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#03FF88]" />
                  <span>Request Store</span>
                </button>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 bg-[#212327] hover:bg-[#2F3032] text-[#A3A6A8] hover:text-white border border-[#3a3d40] px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-inner cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#03FF88]" />
                <span className="hidden sm:inline">Search coupons...</span>
                <span className="sm:hidden text-xs">Search</span>
                <kbd className="hidden md:inline-block bg-[#17181a] border border-[#4E5255] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#A3A6A8]">
                  ⌘K
                </kbd>
              </button>

              {/* Submit Coupon CTA */}
              <button
                type="button"
                onClick={() => openSubmitModal()}
                className="hidden sm:flex items-center gap-1.5 bg-[#212327] hover:bg-[#2F3032] border border-[#4E5255] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#03FF88]" />
                <span>+ Submit Code</span>
              </button>

              {/* Multi-role Auth State Button */}
              {isAdmin ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsAdminDashboardOpen(true)}
                    className="flex items-center gap-1.5 bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer relative"
                  >
                    {isSuperAdmin ? <Crown className="w-3.5 h-3.5 text-black" /> : <ShieldCheck className="w-3.5 h-3.5 text-black" />}
                    <span className="hidden xs:inline">{isSuperAdmin ? 'Super Admin' : 'Editor'}</span>
                    {(pendingCount + pendingRequestsCount) > 0 && (
                      <span className="bg-[#FF4B33] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shadow">
                        {pendingCount + pendingRequestsCount}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 text-[#A3A6A8] hover:text-[#FF4B33] hover:bg-[#212327] rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : isStoreOwner ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsStoreOwnerDashboardOpen(true)}
                    className="flex items-center gap-1.5 bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-black" />
                    <span>Store Portal</span>
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 text-[#A3A6A8] hover:text-[#FF4B33] hover:bg-[#212327] rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#D8D9DA] hover:text-white bg-[#212327] hover:bg-[#2F3032] border border-[#3a3d40] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  title="Admin & Merchant Portal"
                >
                  <Lock className="w-3.5 h-3.5 text-[#03FF88]" />
                  <span>Portal Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#A3A6A8] hover:text-white hover:bg-[#212327] rounded-xl transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2F3032] bg-[#141518] px-4 py-4 space-y-2.5 animate-in slide-in-from-top duration-200">
            <button
              type="button"
              onClick={() => {
                setSelectedStoreSlug(null);
                setMobileMenuOpen(false);
                const el = document.getElementById('store-directory-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#D8D9DA] hover:text-white hover:bg-[#212327] rounded-xl transition-colors"
            >
              Browse All Stores
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsStoreRequestModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#03FF88] hover:bg-[#212327] rounded-xl transition-colors flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#03FF88]" />
              <span>Request / Register Store</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openSubmitModal();
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-white hover:bg-[#212327] rounded-xl transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[#03FF88]" />
              <span>Submit a Coupon Code</span>
            </button>

            {!currentUser && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-[#D8D9DA] hover:bg-[#212327] rounded-xl transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#03FF88]" />
                <span>Admin / Store Login</span>
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};
