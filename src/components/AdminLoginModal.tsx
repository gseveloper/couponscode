import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, ShieldAlert, KeyRound, Eye, EyeOff, ShieldCheck, Building2 } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    adminLogin,
    storeOwnerLogin,
    setIsStoreRequestModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'admin' | 'store_owner'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (activeTab === 'admin') {
      const res = adminLogin(email, password);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.message || 'Access denied: Please check your email and password.');
        setPassword('');
      } else {
        setEmail('');
        setPassword('');
      }
    } else {
      const res = storeOwnerLogin(email, password);
      setLoading(false);
      if (!res.success) {
        setErrorMsg(res.message || 'Access denied: No approved store matches this email & password.');
        setPassword('');
      } else {
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setIsAdminModalOpen(false)}
      className="fixed inset-0 z-[9500] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-[#1C1E20] border border-[#3a3d40] rounded-3xl w-full max-w-md p-6 sm:p-8 relative shadow-2xl"
      >
        <button
          type="button"
          onClick={() => {
            setIsAdminModalOpen(false);
            setErrorMsg('');
          }}
          className="absolute top-4 right-4 text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#2F3032] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex bg-[#212327] p-1 rounded-2xl mb-6 border border-[#3a3d40]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-[#03FF88] text-black shadow'
                : 'text-[#A3A6A8] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin / Editor</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('store_owner');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'store_owner'
                ? 'bg-[#03FF88] text-black shadow'
                : 'text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Store Owner</span>
          </button>
        </div>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#03FF88]/15 border border-[#03FF88]/40 flex items-center justify-center text-[#03FF88] mb-2.5">
            {activeTab === 'admin' ? <Lock className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
          </div>
          <h2 className="text-xl font-bold text-white font-heading">
            {activeTab === 'admin' ? 'Admin & Editor Portal' : 'Store Owner Portal'}
          </h2>
          <p className="text-xs text-[#A3A6A8] mt-1 max-w-xs">
            {activeTab === 'admin'
              ? 'Authorized access for Super Admin (gseveloper) and Sub-Admin editors.'
              : 'Log in with your verified store email and password to upload coupon codes.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#FF4B33]/15 border border-[#FF4B33]/40 text-xs text-[#FF4B33] font-medium flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#D8D9DA] mb-1.5">
              {activeTab === 'admin' ? 'Admin Email' : 'Store Registered Email'}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={activeTab === 'admin' ? 'admin@couponscode.store' : 'owner@yourstore.com'}
              required
              autoComplete="username"
              className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#A3A6A8] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#D8D9DA] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                className="w-full bg-[#212327] border border-[#3a3d40] focus:border-[#03FF88] rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white placeholder-[#A3A6A8] outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A6A8] hover:text-white p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#03FF88] hover:bg-[#00d975] text-black font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : activeTab === 'admin' ? 'Log in as Admin' : 'Log in to Store'}</span>
          </button>
        </form>

        {activeTab === 'store_owner' && (
          <div className="mt-4 text-center text-xs text-[#A3A6A8]">
            Don't have your store listed yet?{' '}
            <button
              type="button"
              onClick={() => {
                setIsAdminModalOpen(false);
                setIsStoreRequestModalOpen(true);
              }}
              className="text-[#03FF88] hover:underline font-bold"
            >
              Request your store here
            </button>
          </div>
        )}

        <div className="mt-5 text-center text-[11px] text-[#A3A6A8] border-t border-[#3a3d40] pt-3">
          Protected authentication on <strong>couponscode.store</strong>
        </div>
      </div>
    </div>
  );
};
