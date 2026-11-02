import React from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Users, Activity, CheckCircle2, Clock } from 'lucide-react';

export const LiveFeedTerminal: React.FC = () => {
  const { liveFeed, setSelectedStoreSlug, stores } = useApp();

  return (
    <section id="live-feed-section" className="py-12 bg-[#17181c] border-y border-[#2F3032]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Verification Engine explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F3032] border border-[#4E5255] text-xs font-semibold text-[#03FF88]">
              <span>◆ 3-LAYER VERIFICATION ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading leading-tight">
              We don't just list codes. <br />
              <span className="text-[#03FF88]">We verify every checkout.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A3A6A8] leading-relaxed">
              40–60% of coupon codes on public aggregator sites are dead, restricted, or expired.
              Our engine simulates live cart checkouts, collects human verifier consensus, and cross-checks real shopper receipts before recommending any promo.
            </p>

            {/* Three verification pillars */}
            <div className="grid gap-3 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#212327] border border-[#3a3d40]">
                <div className="w-8 h-8 rounded-lg bg-[#03FF88]/15 text-[#03FF88] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Automated Bot Testing</span>
                    <span className="text-[10px] bg-[#03FF88]/20 text-[#03FF88] font-bold px-2 py-0.5 rounded-full">
                      ● Active
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A6A8] mt-0.5">
                    Automated headless test bots validate cart minimums, expiration dates, and exclusions every hour.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#212327] border border-[#3a3d40]">
                <div className="w-8 h-8 rounded-lg bg-[#03FF88]/15 text-[#03FF88] flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Human Verifier Consensus</span>
                    <span className="text-[10px] bg-[#03FF88]/20 text-[#03FF88] font-bold px-2 py-0.5 rounded-full">
                      ● Active
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A6A8] mt-0.5">
                    Tens of thousands of active shoppers submit screenshot proofs and feedback directly from online carts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#212327] border border-[#3a3d40]">
                <div className="w-8 h-8 rounded-lg bg-[#03FF88]/15 text-[#03FF88] flex items-center justify-center shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Fleet Checkout Signal</span>
                    <span className="text-[10px] bg-[#03FF88]/20 text-[#03FF88] font-bold px-2 py-0.5 rounded-full">
                      ● Active
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A6A8] mt-0.5">
                    Live checkout telemetry calculates confidence health scores (80% - 100%) so you don't waste time on duds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Window */}
          <div className="lg:col-span-6">
            <div className="bg-[#101013] border border-[#3a3d40] rounded-2xl overflow-hidden shadow-2xl">
              {/* Terminal Titlebar */}
              <div className="bg-[#1C1E22] px-4 py-3 border-b border-[#2F3032] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF4B33]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBC13]/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#03FF88]/80 inline-block" />
                  <span className="text-xs font-mono font-semibold text-[#D8D9DA] ml-2">
                    simplycodes.stream.feed // live
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#03FF88] bg-[#03FF88]/10 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#03FF88] animate-ping" />
                  LIVE
                </div>
              </div>

              {/* Feed Stream */}
              <div className="p-4 max-h-[360px] overflow-y-auto space-y-2.5 font-mono text-xs">
                {liveFeed.map((event, idx) => {
                  const targetStore = stores.find(
                    s => s.name.toLowerCase() === event.merchant.toLowerCase()
                  );
                  return (
                    <div
                      key={event.id + '-' + idx}
                      onClick={() => targetStore && setSelectedStoreSlug(targetStore.slug)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                        event.isVerified
                          ? 'bg-[#181f1c] border-[#03FF88]/30 hover:border-[#03FF88]'
                          : 'bg-[#22211c] border-[#FFBC13]/30 hover:border-[#FFBC13]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1.5 font-bold text-white">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              event.isVerified ? 'bg-[#03FF88]' : 'bg-[#FFBC13]'
                            }`}
                          />
                          {event.merchant}
                        </span>
                        <span className="text-[#A3A6A8] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <span className="text-sm font-bold text-white">
                          Code:{' '}
                          <span className="text-[#03FF88] bg-black/60 px-2 py-0.5 rounded border border-[#03FF88]/30 font-mono">
                            {event.code}
                          </span>
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            event.isVerified
                              ? 'bg-[#03FF88]/20 text-[#03FF88]'
                              : 'bg-[#FFBC13]/20 text-[#FFBC13]'
                          }`}
                        >
                          {event.isVerified ? 'VERIFIED' : 'PENDING'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#A3A6A8] pt-1 border-t border-white/5">
                        <span className="truncate">{event.statusText}</span>
                        <span className="shrink-0 text-white/80">by @{event.user}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Terminal Footer */}
              <div className="bg-[#1C1E22] px-4 py-2.5 border-t border-[#2F3032] flex items-center justify-between text-[11px] text-[#A3A6A8] font-mono">
                <span>Streaming live verification telemetry</span>
                <span className="text-[#03FF88] animate-pulse">● 100% Truth Layer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
