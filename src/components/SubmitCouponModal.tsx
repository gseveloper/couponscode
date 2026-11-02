import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, PlusCircle, Tag, CheckCircle2, Ticket } from 'lucide-react';

export const SubmitCouponModal: React.FC = () => {
  const { isSubmitModalOpen, closeSubmitModal, submitModalDefaultStoreId, stores, submitUserCoupon } = useApp();

  const [storeId, setStoreId] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  useEffect(() => {
    if (submitModalDefaultStoreId) {
      setStoreId(submitModalDefaultStoreId);
    } else if (stores.length > 0) {
      setStoreId(stores[0].id);
    }
  }, [submitModalDefaultStoreId, stores, isSubmitModalOpen]);

  if (!isSubmitModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discount || !storeId || !code) return;

    const store = stores.find(s => s.id === storeId);
    const storeName = store ? store.name : 'Store';

    submitUserCoupon({
      storeId,
      code: code.trim().toUpperCase(),
      discount: discount.trim(),
      title: title.trim() || `${discount.trim()} at ${storeName}`,
      description: description.trim() || `${discount.trim()} promo code for ${storeName}`,
      submittedBy: submittedBy.trim() || 'Shopper',
      submittedEmail: submittedEmail.trim() || 'shopper@couponscode.store',
      submitterRole: 'shopper'
    });

    setCode('');
    setDiscount('');
    setTitle('');
    setDescription('');
    closeSubmitModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={closeSubmitModal}
      className="fixed inset-0 z-[9500] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#1C1E20] border border-[#3a3d40] rounded-3xl w-full max-w-lg p-5 sm:p-7 relative shadow-2xl overflow-y-auto max-h-[92vh]"
      >
        <button
          type="button"
          onClick={closeSubmitModal}
          className="absolute top-4 right-4 text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#2F3032] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#03FF88]/15 text-[#03FF88] flex items-center justify-center shrink-0">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-heading">Submit a Working Coupon</h2>
            <p className="text-xs text-[#A3A6A8]">
              Found a coupon code that works? Share it with fellow shoppers.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-[#D8D9DA] mb-1">Select Store *</label>
            <select
              value={storeId}
              onChange={e => setStoreId(e.target.value)}
              required
              className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
            >
              {stores.map(store => (
                <option key={store.id} value={store.id}>
                  {store.name} ({store.domain})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#D8D9DA] mb-1">Coupon Code *</label>
              <input
                type="text"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="e.g. DISCOUNT20"
                required
                className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono uppercase outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#D8D9DA] mb-1">Discount Amount *</label>
              <input
                type="text"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                placeholder="e.g. 20% Off or Rs. 400 Off"
                required
                className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#D8D9DA] mb-1">Offer Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. 20% off your entire cart"
              className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#D8D9DA] mb-1">Terms or Exclusions</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Optional notes: valid for first orders or minimum spend..."
              className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#2F3032]">
            <div>
              <label className="block font-semibold text-[#D8D9DA] mb-1">Your Name</label>
              <input
                type="text"
                value={submittedBy}
                onChange={e => setSubmittedBy(e.target.value)}
                placeholder="Shopper"
                className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#D8D9DA] mb-1">Your Email</label>
              <input
                type="email"
                value={submittedEmail}
                onChange={e => setSubmittedEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2.5 text-white outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2F3032]">
            <button
              type="button"
              onClick={closeSubmitModal}
              className="px-4 py-2.5 rounded-xl bg-[#212327] text-[#D8D9DA] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Submit for Verification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
