import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store, Coupon } from '../types';
import {
  Building2,
  X,
  Plus,
  Ticket,
  Clock,
  CheckCircle2,
  ExternalLink,
  LogOut,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const StoreOwnerDashboardModal: React.FC = () => {
  const {
    isStoreOwnerDashboardOpen,
    setIsStoreOwnerDashboardOpen,
    currentUser,
    loggedInStore,
    coupons,
    submissions,
    submitUserCoupon,
    logout,
    showToast
  } = useApp();

  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isStoreOwnerDashboardOpen || !currentUser || !loggedInStore) return null;

  const storeCoupons = coupons.filter(c => c.storeId === loggedInStore.id);
  const pendingStoreSubmissions = submissions.filter(
    s => s.storeId === loggedInStore.id && s.status === 'pending'
  );

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discount) return;

    submitUserCoupon({
      storeId: loggedInStore.id,
      code: code.trim().toUpperCase(),
      discount: discount.trim(),
      title: title.trim() || `${discount.trim()} at ${loggedInStore.name}`,
      description: description.trim() || `Official promo code submitted by ${loggedInStore.name}`,
      submittedBy: currentUser.name || loggedInStore.name,
      submittedEmail: currentUser.email,
      submitterRole: 'store_owner'
    });

    setCode('');
    setDiscount('');
    setTitle('');
    setDescription('');
    setShowAddForm(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9600] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-[#17181c] border border-[#3a3d40] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#1C1E22] px-6 py-4 border-b border-[#2F3032] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-[#3a3d40] shadow">
              <img
                src={loggedInStore.logo}
                alt={loggedInStore.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-heading truncate">
                  {loggedInStore.name} Merchant Portal
                </h2>
                <span className="text-[10px] font-mono bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded font-bold uppercase">
                  Verified Store
                </span>
              </div>
              <p className="text-xs text-[#A3A6A8] truncate">
                Logged in as {currentUser.email} • Manage official coupons
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={logout}
              className="text-xs text-[#A3A6A8] hover:text-[#FF4B33] flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#212327] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button
              type="button"
              onClick={() => setIsStoreOwnerDashboardOpen(false)}
              className="text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#212327] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032]">
              <div className="text-xs text-[#A3A6A8]">Active Live Codes</div>
              <div className="text-2xl font-black text-[#03FF88] mt-1 font-mono">
                {storeCoupons.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032]">
              <div className="text-xs text-[#A3A6A8]">Pending Moderation</div>
              <div className="text-2xl font-black text-[#FFBC13] mt-1 font-mono">
                {pendingStoreSubmissions.length}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032] col-span-2 sm:col-span-1">
              <div className="text-xs text-[#A3A6A8]">Store Rating</div>
              <div className="text-2xl font-black text-white mt-1 font-mono">
                ⭐ {loggedInStore.rating}
              </div>
            </div>
          </div>

          {/* Action Callout */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Store Coupon Codes
              </h3>
              <p className="text-xs text-[#A3A6A8]">
                Upload new promo codes. All store submissions are reviewed by Super Admin or Sub-Admin before going live.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>{showAddForm ? 'Close Form' : 'Upload New Coupon'}</span>
            </button>
          </div>

          {/* Upload Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddCoupon}
              className="p-5 rounded-2xl bg-[#1C1E22] border border-[#03FF88]/40 space-y-3.5 text-xs animate-in fade-in"
            >
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-[#03FF88]" />
                <span>Upload Official Store Coupon</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">Promo Code *</label>
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="e.g. WINTER30"
                    required
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white font-mono uppercase outline-none focus:border-[#03FF88]"
                  />
                </div>

                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">
                    Discount Amount *
                  </label>
                  <input
                    type="text"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    placeholder="e.g. 30% Off or Rs. 500 Off"
                    required
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">Offer Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. 30% Off Winter Warmers Collection"
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                />
              </div>

              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">
                  Terms & Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Valid across all unstitched items with min spend of..."
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88] resize-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold px-5 py-2 rounded-xl transition-all cursor-pointer shadow"
                >
                  Submit for Admin Approval
                </button>
              </div>
            </form>
          )}

          {/* Pending Review List */}
          {pendingStoreSubmissions.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#FFBC13] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Your Submissions Awaiting Admin Approval ({pendingStoreSubmissions.length})</span>
              </div>
              {pendingStoreSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-xl bg-[#212327] border border-[#FFBC13]/30 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#03FF88] bg-black/60 px-2 py-0.5 rounded border border-[#03FF88]/30">
                        {sub.code}
                      </span>
                      <span className="text-[#FFBC13] font-bold">{sub.discount}</span>
                      <span className="text-[10px] bg-[#FFBC13]/15 text-[#FFBC13] px-2 py-0.5 rounded font-semibold">
                        In Review
                      </span>
                    </div>
                    <p className="text-white/90 text-xs">{sub.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Live Coupons */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#03FF88]" />
              <span>Published Live Coupons ({storeCoupons.length})</span>
            </div>

            {storeCoupons.length === 0 ? (
              <div className="p-8 text-center bg-[#1C1E22] border border-dashed border-[#3a3d40] rounded-2xl text-xs text-[#A3A6A8]">
                No published coupons yet. Click "Upload New Coupon" above to add your first deal.
              </div>
            ) : (
              <div className="space-y-2.5">
                {storeCoupons.map(coupon => (
                  <div
                    key={coupon.id}
                    className="p-3.5 rounded-xl bg-[#1C1E22] border border-[#2F3032] flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#03FF88] bg-black/60 px-2.5 py-0.5 rounded border border-[#03FF88]/30">
                          {coupon.code}
                        </span>
                        <span className="text-white font-bold">{coupon.discount}</span>
                        {coupon.isVerified && (
                          <span className="text-[10px] bg-[#03FF88]/15 text-[#03FF88] px-2 py-0.5 rounded font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[#A3A6A8] text-xs">{coupon.title}</p>
                    </div>
                    <div className="text-right text-[11px] text-[#A3A6A8]">
                      <span>{coupon.totalUses} uses</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
