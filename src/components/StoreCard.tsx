import React from 'react';
import { Store } from '../types';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Tag, ArrowRight } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const { setSelectedStoreSlug } = useApp();

  return (
    <div
      onClick={() => setSelectedStoreSlug(store.slug)}
      className="group relative bg-[#2F3032] hover:bg-[#212327] border border-[#3a3d40] hover:border-[#03FF88]/60 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg"
    >
      <div>
        {/* Top: Logo & Name */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <img
              src={store.logo}
              alt={store.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-white group-hover:text-[#03FF88] transition-colors truncate font-heading">
              {store.name}
            </h3>
            <span className="text-xs text-[#A3A6A8] truncate block">
              {store.domain}
            </span>
          </div>
        </div>

        {/* Top Deal Teaser */}
        <div className="mb-3">
          <span className="inline-block text-xs font-bold text-[#03FF88] bg-[#03FF88]/10 px-2 py-0.5 rounded border border-[#03FF88]/30">
            {store.topDeal || 'Special Offers'}
          </span>
        </div>

        {/* Verified count line */}
        <div className="flex items-center gap-1.5 text-xs text-[#D8D9DA] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#03FF88]" />
          <span className="font-semibold text-white">{store.verifiedCodesCount}</span>
          <span className="text-[#A3A6A8]">verified codes</span>
        </div>
      </div>

      {/* Bottom: Health Score Bar */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[11px] text-[#A3A6A8]">Confidence Health</span>
          <span className="font-mono font-bold text-[#03FF88]">{store.health}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#17181c] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#03FF88] rounded-full transition-all duration-500"
            style={{ width: `${store.health}%` }}
          />
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#3a3d40] flex items-center justify-between text-xs text-[#A3A6A8] group-hover:text-white">
          <span>View all deals</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#03FF88] transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
