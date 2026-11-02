import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store } from '../types';
import { Building2, X, Upload, Image as ImageIcon, CheckCircle2, Lock, Mail, Globe, Sparkles } from 'lucide-react';

export const StoreRequestModal: React.FC = () => {
  const { isStoreRequestModalOpen, setIsStoreRequestModalOpen, submitStoreRequest, showToast } = useApp();

  const [storeName, setStoreName] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState<Store['category']>('fashion');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [topDeal, setTopDeal] = useState('20% Off');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isStoreRequestModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        setLogo(result);
        showToast({
          type: 'success',
          title: 'Logo Uploaded',
          message: 'Image converted and ready to submit.'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !domain || !ownerEmail) return;

    setIsSubmitting(true);

    const logoUrl =
      logo.trim() ||
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=120&auto=format&fit=crop&q=80';

    submitStoreRequest({
      storeName: storeName.trim(),
      domain: domain.trim(),
      category,
      logo: logoUrl,
      description: description.trim() || `${storeName} official online shopping store.`,
      topDeal: topDeal.trim() || 'Verified Codes',
      ownerName: ownerName.trim() || 'Store Manager',
      ownerEmail: ownerEmail.trim().toLowerCase(),
      ownerPassword: ownerPassword.trim() || 'StorePass2026!'
    });

    setIsSubmitting(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9500] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-[#17181c] border border-[#3a3d40] rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1C1E22] px-6 py-4 border-b border-[#2F3032] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#03FF88] text-black flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                Request / Register Your Store
              </h2>
              <p className="text-xs text-[#A3A6A8]">
                Publish your store on couponscode.store & get merchant access.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsStoreRequestModalOpen(false)}
            className="text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#212327] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#03FF88]/10 border border-[#03FF88]/30 text-xs text-[#D8D9DA] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#03FF88] shrink-0 mt-0.5" />
            <p>
              Once approved by our admin, your store will be live. You will receive an automated email confirmation with your login details to manage and add coupon codes directly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Store Basics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">
                  Store / Brand Name *
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  placeholder="e.g. Royal Sweets, Sana Safinaz"
                  required
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                />
              </div>

              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">
                  Website / Domain URL *
                </label>
                <input
                  type="text"
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  placeholder="e.g. royalsweets.pk"
                  required
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">Category *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as Store['category'])}
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                >
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="food-restaurants">Food & Dining</option>
                  <option value="devices">Electronics & Tech</option>
                  <option value="hotels-travel">Hotels & Tourism</option>
                  <option value="home-garden">Groceries & Home</option>
                  <option value="software">Software & Services</option>
                </select>
              </div>

              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">Top Offer Headline</label>
                <input
                  type="text"
                  value={topDeal}
                  onChange={e => setTopDeal(e.target.value)}
                  placeholder="e.g. Flat 25% Off Storewide"
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                />
              </div>
            </div>

            {/* Logo Upload Box */}
            <div className="p-3.5 rounded-2xl bg-[#1C1E22] border border-[#3a3d40] space-y-2.5">
              <label className="block text-[#D8D9DA] font-semibold">Store Brand Logo</label>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-[#4E5255] shadow-sm">
                  {logo ? (
                    <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="bg-[#2F3032] hover:bg-[#3a3d40] text-[#03FF88] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#03FF88]/30 inline-flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {logo && (
                      <button
                        type="button"
                        onClick={() => setLogo('')}
                        className="text-xs text-[#FF4B33] hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <input
                    type="url"
                    value={logo}
                    onChange={e => setLogo(e.target.value)}
                    placeholder="Or paste direct image URL (https://...)"
                    className="w-full bg-[#17181c] border border-[#3a3d40] rounded-lg p-2 text-white outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#D8D9DA] font-semibold mb-1">
                Store Description / About
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Briefly describe what your store sells..."
                className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88] resize-none"
              />
            </div>

            {/* Merchant Account Details */}
            <div className="pt-2 border-t border-[#2F3032] space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#03FF88]" />
                <span>Store Owner / Manager Login Credentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="e.g. Usman Ali"
                    required
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                  />
                </div>

                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">
                    Your Email (For Login) *
                  </label>
                  <input
                    type="email"
                    value={ownerEmail}
                    onChange={e => setOwnerEmail(e.target.value)}
                    placeholder="owner@yourstore.com"
                    required
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                  />
                </div>

                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">
                    Set Portal Password *
                  </label>
                  <input
                    type="password"
                    value={ownerPassword}
                    onChange={e => setOwnerPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none focus:border-[#03FF88]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2F3032]">
              <button
                type="button"
                onClick={() => setIsStoreRequestModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#212327] text-[#D8D9DA] hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Submit Store Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
