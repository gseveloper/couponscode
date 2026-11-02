import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100000] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'success'
              ? 'bg-[#18231c]/95 border-[#03FF88]/40 text-white'
              : toast.type === 'error'
              ? 'bg-[#291717]/95 border-[#FF4B33]/40 text-white'
              : 'bg-[#1F2228]/95 border-[#3a3d40] text-white'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#03FF88]" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#FF4B33]" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#FFBC13]" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-[#D8D9DA] mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-[#A3A6A8] hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
