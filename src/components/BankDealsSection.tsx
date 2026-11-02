import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BankCardDeal } from '../types';
import {
  CreditCard,
  QrCode,
  Calendar,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  Info,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

export const BankDealsSection: React.FC = () => {
  const { stores, setSelectedStoreSlug, showToast } = useApp();
  const [selectedBankFilter, setSelectedBankFilter] = useState<string>('all');
  const [copiedDealId, setCopiedDealId] = useState<string | null>(null);

  // Gather all bank deals from stores
  const allBankDeals: BankCardDeal[] = stores.flatMap(s => s.bankDeals || []);

  const uniqueBanks = Array.from(new Set(allBankDeals.map(d => d.bankName)));

  const filteredDeals = allBankDeals.filter(deal => {
    if (selectedBankFilter === 'all') return true;
    if (selectedBankFilter === 'golootlo') return deal.cardType === 'golootlo';
    return deal.bankName.toLowerCase().includes(selectedBankFilter.toLowerCase());
  });

  const handleCopyCode = (deal: BankCardDeal) => {
    if (deal.code && navigator.clipboard) {
      navigator.clipboard.writeText(deal.code);
      setCopiedDealId(deal.id);
      showToast({
        type: 'success',
        title: 'Promo Code Copied!',
        message: `${deal.code} copied for ${deal.storeName}.`
      });
      setTimeout(() => setCopiedDealId(null), 2500);
    }
  };

  return (
    <section id="bank-deals-section" className="py-12 bg-[#141518] border-y border-[#2F3032]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFBC13]/15 text-[#FFBC13] border border-[#FFBC13]/30 text-xs font-bold uppercase tracking-wider mb-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Bank Card Sales & Golootlo Discounts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Cardholder Specials & App QR Deals
            </h2>
            <p className="text-xs sm:text-sm text-[#A3A6A8] mt-1 max-w-2xl">
              Pay with eligible Pakistani bank cards (HBL, Meezan, Alfalah), fintech wallets (SadaPay, JazzCash), or Golootlo to unlock instant checkout savings.
            </p>
          </div>

          {/* Bank Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => setSelectedBankFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                selectedBankFilter === 'all'
                  ? 'bg-[#FFBC13] text-black shadow'
                  : 'bg-[#212327] text-[#D8D9DA] hover:text-white border border-[#3a3d40]'
              }`}
            >
              All Partner Banks ({allBankDeals.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedBankFilter('golootlo')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                selectedBankFilter === 'golootlo'
                  ? 'bg-[#FFBC13] text-black shadow'
                  : 'bg-[#212327] text-[#D8D9DA] hover:text-white border border-[#3a3d40]'
              }`}
            >
              Golootlo Deals
            </button>
            {uniqueBanks.map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBankFilter(b)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  selectedBankFilter === b
                    ? 'bg-[#FFBC13] text-black shadow'
                    : 'bg-[#212327] text-[#D8D9DA] hover:text-white border border-[#3a3d40]'
                }`}
              >
                {b.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeals.map(deal => {
            const store = stores.find(s => s.id === deal.storeId);
            return (
              <div
                key={deal.id}
                className="bg-[#1C1E20] border border-[#3a3d40] hover:border-[#FFBC13]/60 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-200"
              >
                <div>
                  {/* Top: Bank & Store */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFBC13]/15 text-[#FFBC13] px-2.5 py-1 rounded-lg border border-[#FFBC13]/30 flex items-center gap-1.5">
                      {deal.cardType === 'golootlo' ? <QrCode className="w-3.5 h-3.5" /> : <CreditCard className="w-3.5 h-3.5" />}
                      <span>{deal.bankName}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => store && setSelectedStoreSlug(store.slug)}
                      className="text-xs font-bold text-white hover:text-[#03FF88] flex items-center gap-1 shrink-0"
                    >
                      <span>{deal.storeName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Title & Discount */}
                  <div className="mb-2">
                    <div className="text-xl font-black text-white font-heading">
                      {deal.discount}
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#D8D9DA] mt-0.5 leading-snug">
                      {deal.title}
                    </h3>
                  </div>

                  {/* Valid day & Min Spend */}
                  <div className="flex items-center gap-3 text-xs text-[#A3A6A8] mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FFBC13]" />
                      <span>{deal.daysValid}</span>
                    </div>
                    {deal.minSpend && (
                      <span className="bg-[#212327] px-2 py-0.5 rounded text-[11px] font-mono">
                        Min spend: {deal.minSpend}
                      </span>
                    )}
                  </div>

                  {/* Step-by-Step Redemption Instructions */}
                  <div className="p-3 rounded-xl bg-[#141518] border border-[#2F3032] text-xs text-[#A3A6A8] leading-relaxed mb-4">
                    <strong className="text-white block mb-0.5 text-[11px] uppercase tracking-wider">
                      How to Redeem:
                    </strong>
                    {deal.howToRedeem}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#2F3032]">
                  {deal.code ? (
                    <button
                      type="button"
                      onClick={() => handleCopyCode(deal)}
                      className="flex-1 bg-[#212327] hover:bg-[#28292d] text-[#03FF88] border border-[#03FF88]/40 hover:border-[#03FF88] py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      {copiedDealId === deal.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied: {deal.code}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Code: {deal.code}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#03FF88] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Auto-Discount at Checkout
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => store && setSelectedStoreSlug(store.slug)}
                    className="bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    View Store Deals
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
