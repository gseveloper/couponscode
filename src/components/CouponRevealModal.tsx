import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const CouponRevealModal: React.FC = () => {
  const { revealModalCoupon, closeRevealModal, voteCoupon, stores, showToast } = useApp();
  const [hasCopied, setHasCopied] = useState(true);
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);

  if (!revealModalCoupon) return null;

  const currentStore = stores.find(s => s.id === revealModalCoupon.storeId);
  const storeLogo = currentStore?.logo || 'https://cdn.simplycodes.com/images/logo/vistaprintcom.jpg';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(revealModalCoupon.code);
      setHasCopied(true);
      showToast({
        type: 'success',
        title: 'Code Copied!',
        message: `${revealModalCoupon.code} copied to clipboard.`
      });
      setTimeout(() => setHasCopied(false), 2500);
    }
  };

  const handleVote = (isYes: boolean) => {
    setVoted(isYes ? 'yes' : 'no');
    voteCoupon(revealModalCoupon.id, isYes);
    showToast({
      type: isYes ? 'success' : 'info',
      title: isYes ? 'Thank you! Vote Recorded' : 'Feedback Received',
      message: isYes
        ? 'Great! Your vote keeps our verified accuracy rating at 98%.'
        : 'Our automated test bots will re-evaluate this coupon shortly.'
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={closeRevealModal}
      className="fixed inset-0 z-[9000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#1C1E20] border border-[#3a3d40] rounded-3xl w-full max-w-md p-6 sm:p-7 relative shadow-2xl text-center overflow-y-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeRevealModal}
          className="absolute top-4 right-4 text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#2F3032] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Store Logo */}
        <div className="w-20 h-20 rounded-full bg-white p-2.5 mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden border-2 border-[#2F3032]">
          <img
            src={storeLogo}
            alt={revealModalCoupon.storeName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Modal Titles */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          {revealModalCoupon.discount}
        </h2>
        <p className="text-xs sm:text-sm text-[#A3A6A8] mt-1 mb-5">
          {revealModalCoupon.title}
        </p>

        {/* "Copied to clipboard" Speech Bubble */}
        <div className="relative inline-block mb-4">
          <div className="bg-[#e5e7eb] text-black text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
            <span>Copied to your clipboard!</span>
          </div>
          <div className="w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#e5e7eb] mx-auto -mt-0.5" />
        </div>

        {/* Coupon Code Pill with Copy Action */}
        <div className="flex items-center justify-between gap-3 p-2 pl-4 rounded-full bg-[#111827] border border-[#374151] mx-auto mb-5 max-w-sm">
          <span className="font-mono font-black text-lg sm:text-xl text-[#03FF88] tracking-widest uppercase truncate">
            {revealModalCoupon.code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 bg-[#374151] hover:bg-[#4b5563] text-white text-xs font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#03FF88]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Restrictions Note if any */}
        {revealModalCoupon.restrictions.length > 0 && (
          <div className="p-3 rounded-xl bg-[#212327] border border-[#3a3d40] text-left text-xs text-[#A3A6A8] mb-5 space-y-1">
            <div className="text-[#FFBC13] font-bold flex items-center gap-1 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" /> Terms & Exclusions
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-white/80">
              {revealModalCoupon.restrictions.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Did this code work? Community Vote */}
        <div className="bg-[#212327] rounded-2xl p-4 mb-5 border border-[#3a3d40]">
          {voted ? (
            <div className="text-center py-1">
              <div className="text-xs font-bold text-[#03FF88] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#03FF88]" />
                {voted === 'yes' ? 'Thanks for voting YES! Real checkout confirmed.' : 'Thanks for reporting. Our bots will re-verify.'}
              </div>
              <div className="text-[11px] text-[#A3A6A8] mt-1 font-mono">
                Community Health Score: {revealModalCoupon.healthScore}%
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-[#D8D9DA] font-semibold mb-2.5">
                Did this coupon code work for you?
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleVote(true)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#2F3032] hover:bg-[#3a3d40] text-white text-xs font-bold border border-[#4E5255] hover:border-[#03FF88] transition-all cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#03FF88]" />
                  <span>Yes, it worked</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleVote(false)}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#2F3032] hover:bg-[#3a3d40] text-white text-xs font-bold border border-[#4E5255] hover:border-[#FF4B33] transition-all cursor-pointer"
                >
                  <ThumbsDown className="w-3.5 h-3.5 text-[#FF4B33]" />
                  <span>No, failed</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary Outbound Action */}
        <a
          href={revealModalCoupon.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold text-sm sm:text-base py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-decoration-none"
        >
          <span>Shop at {revealModalCoupon.storeName}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
