import React, { useState } from 'react';
import { Coupon } from '../types';
import { useApp } from '../context/AppContext';
import { Check, Copy, ExternalLink, ShieldCheck, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
  storeLogo?: string;
  storeTint?: string;
  showStoreName?: boolean;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  storeLogo,
  storeTint = '#fde8d6',
  showStoreName = false
}) => {
  const { openRevealModal, voteCoupon, userVotes, setSelectedStoreSlug, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const currentVote = userVotes[coupon.id];
  const yesVotes = (coupon.upvotes || 24);
  const noVotes = (coupon.downvotes || 1);
  const successPercent = Math.round((yesVotes / Math.max(1, yesVotes + noVotes)) * 100);

  const handleRevealClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isOpen) {
      setIsOpen(true);
      // Auto-copy on first click for convenience
      if (navigator.clipboard) {
        navigator.clipboard.writeText(coupon.code);
        setIsCopied(true);
        showToast({
          type: 'success',
          title: 'Code Copied!',
          message: `${coupon.code} copied to clipboard.`
        });
        setTimeout(() => setIsCopied(false), 2000);
      }
    } else {
      // Already open, click to copy again
      if (navigator.clipboard) {
        navigator.clipboard.writeText(coupon.code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  const daysText =
    coupon.daysLeft !== undefined
      ? coupon.daysLeft <= 3
        ? `Ends in ${coupon.daysLeft} days`
        : `Verified ${coupon.lastUsed || 'today'}`
      : 'Verified active';

  return (
    <article className="group bg-[#17181c] hover:bg-[#1a1b20] border border-[#2F3032] hover:border-[#4E5255] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-stretch">
      {/* Left Stub - Discount Badge */}
      <div
        className="sm:w-32 bg-[#212327] border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-[#2F3032] p-4 flex sm:flex-col items-center justify-between sm:justify-center text-center gap-1 shrink-0 relative overflow-hidden"
        style={{
          borderRightColor: '#2F3032'
        }}
      >
        {/* Subtle decorative notch */}
        <div className="hidden sm:block absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#101013] border border-[#2F3032]" />
        <div className="hidden sm:block absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-[#101013] border border-[#2F3032]" />

        {storeLogo && (
          <img
            src={storeLogo}
            alt={coupon.storeName}
            className="w-8 h-8 rounded-lg bg-white p-1 object-contain sm:mb-1.5 shadow-sm"
          />
        )}
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black text-[#03FF88] tracking-tight leading-none font-heading">
            {coupon.discount}
          </span>
          <span className="text-[10px] font-bold uppercase text-[#A3A6A8] tracking-wider mt-0.5">
            Discount
          </span>
        </div>

        {coupon.isTopPick && (
          <span className="text-[9px] font-black uppercase bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded-full border border-[#03FF88]/30">
            ★ Top
          </span>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-3 min-w-0">
        <div>
          {/* Store Name Header if enabled */}
          {showStoreName && (
            <div className="flex items-center gap-2 mb-1.5">
              <button
                type="button"
                onClick={() => setSelectedStoreSlug(coupon.storeSlug)}
                className="text-xs font-bold text-[#03FF88] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{coupon.storeName}</span>
              </button>
              <span className="text-[11px] text-[#A3A6A8]">•</span>
              <span className="text-[11px] text-[#A3A6A8]">
                {coupon.type === 'site_wide' ? 'Storewide' : 'Online Voucher'}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-snug font-heading group-hover:text-[#03FF88] transition-colors">
            {coupon.title}
          </h3>

          {/* Description */}
          {coupon.description && (
            <p className="text-xs sm:text-sm text-[#A3A6A8] mt-1 leading-relaxed line-clamp-2">
              {coupon.description}
            </p>
          )}

          {/* Meta line: Verified · Ends in X days · Total used · Success % */}
          <div className="flex items-center gap-2 text-xs text-[#A3A6A8] mt-2.5 flex-wrap">
            <span className="text-[#03FF88] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#03FF88]" />
              Verified
            </span>
            <span>·</span>
            <span>{daysText}</span>
            <span>·</span>
            <span>{coupon.totalUses.toLocaleString()} used</span>
            <span>·</span>
            <span className="font-semibold text-white">
              {successPercent}% say it works
            </span>
          </div>
        </div>

        {/* Actions Row: Reveal/Copy Button & Worked Voting */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#2F3032]/60 flex-wrap">
          {/* Bachat-Box Inspired Split Reveal Button */}
          <button
            type="button"
            onClick={handleRevealClick}
            className={`flex items-center rounded-xl overflow-hidden border transition-all cursor-pointer shadow-sm select-none text-xs sm:text-sm ${
              isCopied
                ? 'border-[#03FF88] bg-[#03FF88]/10'
                : 'border-[#03FF88] bg-[#101013]'
            }`}
            title="Click to view and copy promo code"
          >
            {/* Code Portion */}
            <span
              className={`font-mono font-bold px-3.5 py-2 tracking-wider transition-all min-w-[100px] text-center ${
                isOpen
                  ? 'text-white'
                  : 'text-[#A3A6A8] blur-[4px] select-none'
              }`}
            >
              {coupon.code}
            </span>

            {/* CTA Button Portion */}
            <span
              className={`font-extrabold px-3.5 py-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                isCopied
                  ? 'bg-[#03FF88] text-black'
                  : isOpen
                  ? 'bg-[#03FF88] hover:bg-[#00d975] text-black'
                  : 'bg-[#03FF88] hover:bg-[#00d975] text-black'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : isOpen ? (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              ) : (
                <span>Show code</span>
              )}
            </span>
          </button>

          {/* Worked? Yes / No Voting Buttons */}
          <div className="flex items-center gap-1.5 text-xs text-[#A3A6A8]">
            <span className="hidden sm:inline">Worked?</span>
            <button
              type="button"
              onClick={() => voteCoupon(coupon.id, true)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                currentVote === 'yes'
                  ? 'border-[#03FF88] bg-[#03FF88]/20 text-[#03FF88]'
                  : 'border-[#2F3032] hover:border-[#4E5255] text-[#D8D9DA]'
              }`}
              title="Yes, this code gave me a discount"
            >
              <ThumbsUp className="w-3 h-3" />
              <span>Yes ({yesVotes})</span>
            </button>
            <button
              type="button"
              onClick={() => voteCoupon(coupon.id, false)}
              className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                currentVote === 'no'
                  ? 'border-[#FF4B33] bg-[#FF4B33]/20 text-[#FF4B33]'
                  : 'border-[#2F3032] hover:border-[#4E5255] text-[#D8D9DA]'
              }`}
              title="No, this code didn't work"
            >
              <ThumbsDown className="w-3 h-3" />
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
