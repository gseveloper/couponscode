import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ExternalLink } from 'lucide-react';

export const ScreenshotModal: React.FC = () => {
  const { screenshotViewer, closeScreenshotModal } = useApp();

  if (!screenshotViewer) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={closeScreenshotModal}
      className="fixed inset-0 z-[9700] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] bg-[#1a1b1d] border border-[#3a3d40] rounded-3xl p-5 overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2F3032] mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#03FF88]/20 text-[#03FF88] flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{screenshotViewer.title}</h3>
              <p className="text-[11px] text-[#A3A6A8]">
                Verified by @{screenshotViewer.user} • {screenshotViewer.time}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeScreenshotModal}
            className="text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#2F3032]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image viewport */}
        <div className="flex-1 overflow-auto rounded-xl bg-black flex items-center justify-center p-2">
          <img
            src={screenshotViewer.url}
            alt={screenshotViewer.title}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>

        <div className="pt-3 text-center text-xs text-[#A3A6A8] flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#03FF88]" />
          <span>Real checkout proof verified by SimplyCodes Truth Layer</span>
        </div>
      </div>
    </div>
  );
};
