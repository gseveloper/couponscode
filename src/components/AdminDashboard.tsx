import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store, Coupon, CouponSubmission, StoreRequest, AdminUser } from '../types';
import {
  ShieldCheck,
  X,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Store as StoreIcon,
  Ticket,
  BarChart3,
  Clock,
  Sparkles,
  ExternalLink,
  RefreshCw,
  LogOut,
  Camera,
  Upload,
  Image as ImageIcon,
  Edit3,
  Globe,
  FileCode,
  Check,
  Copy,
  Smartphone,
  Monitor,
  Search,
  Building2,
  UserPlus,
  Users,
  Mail,
  Lock,
  Crown
} from 'lucide-react';

const BRAND_PRESETS = [
  { name: 'KFC Pakistan', logo: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=120&auto=format&fit=crop&q=80' },
  { name: 'Cheezious', logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&auto=format&fit=crop&q=80' },
  { name: "McDonald's PK", logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=120&auto=format&fit=crop&q=80' },
  { name: 'Broadway Pizza', logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&auto=format&fit=crop&q=80' },
  { name: 'OPTP', logo: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&auto=format&fit=crop&q=80' },
  { name: 'Kababjees', logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=120&auto=format&fit=crop&q=80' },
  { name: 'Pearl Continental', logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop&q=80' },
  { name: 'Serena Hotels', logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=120&auto=format&fit=crop&q=80' },
  { name: 'Roomy Hotels', logo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=120&auto=format&fit=crop&q=80' },
  { name: 'Daraz PK', logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80' },
  { name: 'Foodpanda PK', logo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=120&auto=format&fit=crop&q=80' }
];

export const AdminDashboard: React.FC = () => {
  const {
    isAdminDashboardOpen,
    setIsAdminDashboardOpen,
    currentUser,
    isSuperAdmin,
    logout,
    stores,
    coupons,
    submissions,
    storeRequests,
    storeOwners,
    adminUsers,
    sentEmails,
    auditLogs,
    approveSubmission,
    rejectSubmission,
    approveStoreRequest,
    rejectStoreRequest,
    addSubAdmin,
    deleteSubAdmin,
    addCoupon,
    deleteCoupon,
    toggleVerifyCoupon,
    addStore,
    editStore,
    deleteStore,
    setSelectedStoreSlug,
    resetToDefaultData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'store_requests' | 'submissions' | 'coupons' | 'stores' | 'sub_admins' | 'merchants' | 'seo' | 'analytics'
  >('store_requests');

  // Add Coupon form state
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [newCouponStoreId, setNewCouponStoreId] = useState(stores[0]?.id || '');
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponTitle, setNewCouponTitle] = useState('');
  const [newCouponDesc, setNewCouponDesc] = useState('');
  const [newCouponType, setNewCouponType] = useState<Coupon['type']>('site_wide');
  const [newCouponHealth, setNewCouponHealth] = useState(98);
  const [newCouponIsTopPick, setNewCouponIsTopPick] = useState(false);
  const [newCouponIsVerified, setNewCouponIsVerified] = useState(true);

  // Add Store form state
  const [showAddStore, setShowAddStore] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreDomain, setNewStoreDomain] = useState('');
  const [newStoreCategory, setNewStoreCategory] = useState<Store['category']>('fashion');
  const [newStoreLogo, setNewStoreLogo] = useState('');
  const [newStoreRating, setNewStoreRating] = useState(4.8);
  const [newStoreTopDeal, setNewStoreTopDeal] = useState('20% Off');
  const [newStoreDesc, setNewStoreDesc] = useState('');
  const [newStoreIntel, setNewStoreIntel] = useState('');

  // Edit Store Modal state
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [editStoreName, setEditStoreName] = useState('');
  const [editStoreDomain, setEditStoreDomain] = useState('');
  const [editStoreCategory, setEditStoreCategory] = useState<Store['category']>('fashion');
  const [editStoreLogo, setEditStoreLogo] = useState('');
  const [editStoreRating, setEditStoreRating] = useState(4.8);
  const [editStoreTopDeal, setEditStoreTopDeal] = useState('');
  const [editStoreDesc, setEditStoreDesc] = useState('');
  const [editStoreIntel, setEditStoreIntel] = useState('');
  const [editStoreAffiliate, setEditStoreAffiliate] = useState('');

  // Sub-Admin form state
  const [showAddSubAdmin, setShowAddSubAdmin] = useState(false);
  const [subAdminName, setSubAdminName] = useState('');
  const [subAdminEmail, setSubAdminEmail] = useState('');
  const [subAdminPassword, setSubAdminPassword] = useState('');

  // SEO Tab state
  const [selectedSeoStoreId, setSelectedSeoStoreId] = useState<string>('home');
  const [seoDeviceView, setSeoDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Filter state
  const [couponSearch, setCouponSearch] = useState('');
  const [selectedStoreFilter, setSelectedStoreFilter] = useState('all');

  if (!isAdminDashboardOpen) return null;

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const pendingRequests = storeRequests.filter(r => r.status === 'pending');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditMode: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (result) {
        if (isEditMode) {
          setEditStoreLogo(result);
        } else {
          setNewStoreLogo(result);
        }
        showToast({
          type: 'success',
          title: 'Logo Uploaded',
          message: 'Image converted and ready to save.'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode || !newCouponDiscount || !newCouponStoreId) return;

    const store = stores.find(s => s.id === newCouponStoreId);
    const storeName = store ? store.name : 'Store';
    const storeSlug = store ? store.slug : `${newCouponStoreId}.com`;

    addCoupon({
      storeId: newCouponStoreId,
      storeName,
      storeSlug,
      code: newCouponCode.trim().toUpperCase(),
      discount: newCouponDiscount.trim(),
      title: newCouponTitle.trim() || `${newCouponDiscount.trim()} at ${storeName}`,
      description: newCouponDesc.trim() || `${newCouponDiscount.trim()} storewide with verified code`,
      type: newCouponType,
      isVerified: newCouponIsVerified,
      isTopPick: newCouponIsTopPick,
      healthScore: Number(newCouponHealth) || 95,
      healthStatus: Number(newCouponHealth) >= 80 ? 'green' : 'yellow',
      lastUsed: 'Just now',
      restrictions: ['Verified through admin control suite'],
      affiliateUrl: store?.affiliateUrl || `https://${storeSlug}`
    });

    setNewCouponCode('');
    setNewCouponDiscount('');
    setNewCouponTitle('');
    setNewCouponDesc('');
    setShowAddCoupon(false);
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName || !newStoreDomain) return;

    const slug = newStoreDomain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
    const logoUrl =
      newStoreLogo.trim() ||
      `https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=120&auto=format&fit=crop&q=80`;

    addStore({
      name: newStoreName.trim(),
      slug,
      domain: newStoreDomain.trim(),
      category: newStoreCategory,
      logo: logoUrl,
      rating: Number(newStoreRating) || 4.8,
      totalRatings: 1,
      health: 98,
      description: newStoreDesc.trim() || `${newStoreName} verified online shopping store.`,
      savingsIntel: newStoreIntel.trim() || `Save with active promo codes tested weekly on ${newStoreName}.`,
      topDeal: newStoreTopDeal.trim() || 'Verified Codes',
      affiliateUrl: newStoreDomain.startsWith('http') ? newStoreDomain : `https://${newStoreDomain}`,
      isPopular: true,
      policies: {
        freeShipping: 'Standard shipping available'
      }
    });

    setNewStoreName('');
    setNewStoreDomain('');
    setNewStoreLogo('');
    setNewStoreDesc('');
    setNewStoreIntel('');
    setShowAddStore(false);
  };

  const openEditStoreModal = (store: Store) => {
    setEditingStore(store);
    setEditStoreName(store.name);
    setEditStoreDomain(store.domain);
    setEditStoreCategory(store.category);
    setEditStoreLogo(store.logo);
    setEditStoreRating(store.rating);
    setEditStoreTopDeal(store.topDeal);
    setEditStoreDesc(store.description);
    setEditStoreIntel(store.savingsIntel);
    setEditStoreAffiliate(store.affiliateUrl);
  };

  const handleSaveEditedStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;

    editStore(editingStore.id, {
      name: editStoreName.trim(),
      domain: editStoreDomain.trim(),
      category: editStoreCategory,
      logo: editStoreLogo.trim(),
      rating: Number(editStoreRating) || 4.8,
      topDeal: editStoreTopDeal.trim(),
      description: editStoreDesc.trim(),
      savingsIntel: editStoreIntel.trim(),
      affiliateUrl: editStoreAffiliate.trim()
    });

    setEditingStore(null);
  };

  const handleAddSubAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subAdminName || !subAdminEmail) return;

    addSubAdmin({
      name: subAdminName.trim(),
      email: subAdminEmail.trim(),
      password: subAdminPassword.trim() || 'EditorPass2026!'
    });

    setSubAdminName('');
    setSubAdminEmail('');
    setSubAdminPassword('');
    setShowAddSubAdmin(false);
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch =
      c.code.toLowerCase().includes(couponSearch.toLowerCase()) ||
      c.storeName.toLowerCase().includes(couponSearch.toLowerCase()) ||
      c.discount.toLowerCase().includes(couponSearch.toLowerCase());
    const matchesStore = selectedStoreFilter === 'all' || c.storeId === selectedStoreFilter;
    return matchesSearch && matchesStore;
  });

  // Calculate SEO preview data
  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentSeoStore = selectedSeoStoreId !== 'home' ? stores.find(s => s.id === selectedSeoStoreId) : null;

  const seoTitle = currentSeoStore
    ? `${currentSeoStore.name} Promo Codes & Verified Vouchers (${currentMonthYear}) – couponscode.store`
    : 'couponscode.store – 100% Verified Coupon Codes & Deals';

  const seoUrl = currentSeoStore
    ? `https://couponscode.store/#store/${currentSeoStore.slug}`
    : 'https://couponscode.store/';

  const seoBreadcrumb = currentSeoStore
    ? `couponscode.store > ${currentSeoStore.category} > ${currentSeoStore.slug}`
    : 'couponscode.store';

  const seoDescription = currentSeoStore
    ? `Save at ${currentSeoStore.name} with ${currentSeoStore.verifiedCodesCount}+ verified promo codes and discounts for ${currentMonthYear}. 100% verified by community checkout test receipts.`
    : 'Find 100% verified coupon codes and store vouchers with instant copy and real-time community success rates.';

  const seoSchema = currentSeoStore
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Store',
            name: currentSeoStore.name,
            url: currentSeoStore.affiliateUrl,
            image: currentSeoStore.logo,
            description: currentSeoStore.description,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: currentSeoStore.rating.toString(),
              reviewCount: currentSeoStore.totalRatings.toString(),
              bestRating: '5',
              worstRating: '1'
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://couponscode.store/' },
              { '@type': 'ListItem', position: 2, name: currentSeoStore.category, item: `https://couponscode.store/#category/${currentSeoStore.category}` },
              { '@type': 'ListItem', position: 3, name: currentSeoStore.name, item: seoUrl }
            ]
          }
        ]
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'couponscode.store',
        url: 'https://couponscode.store',
        applicationCategory: 'ShoppingApplication',
        description: seoDescription
      };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(seoSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9600] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-[#17181c] border border-[#3a3d40] rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#1C1E22] px-6 py-4 border-b border-[#2F3032] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#03FF88] text-black flex items-center justify-center font-bold shadow-md">
              {isSuperAdmin ? <Crown className="w-6 h-6 text-black" /> : <ShieldCheck className="w-6 h-6 text-black" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-heading">
                  couponscode.store Command Center
                </h2>
                <span className="text-[10px] font-mono bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded font-bold uppercase">
                  {isSuperAdmin ? 'Super Admin (gseveloper)' : 'Sub-Admin / Editor'}
                </span>
              </div>
              <p className="text-xs text-[#A3A6A8]">
                Approve store requests, moderate user codes, manage editor accounts, and update store logos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="text-xs text-[#A3A6A8] hover:text-[#FF4B33] flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#212327] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAdminDashboardOpen(false)}
              className="text-[#A3A6A8] hover:text-white p-2 rounded-full hover:bg-[#212327] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#141518] px-6 border-b border-[#2F3032] flex items-center gap-2 overflow-x-auto shrink-0">
          {/* TAB: STORE REQUESTS */}
          <button
            type="button"
            onClick={() => setActiveTab('store_requests')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'store_requests'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Store Requests</span>
            {pendingRequests.length > 0 && (
              <span className="bg-[#03FF88] text-black text-[10px] font-black px-1.5 py-0.2 rounded-full shadow">
                {pendingRequests.length}
              </span>
            )}
          </button>

          {/* TAB: PENDING COUPONS */}
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pending Coupons</span>
            {pendingSubmissions.length > 0 && (
              <span className="bg-[#FF4B33] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shadow">
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          {/* TAB: ACTIVE COUPONS */}
          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'coupons'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Active Coupons ({coupons.length})</span>
          </button>

          {/* TAB: STORES & LOGOS */}
          <button
            type="button"
            onClick={() => setActiveTab('stores')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'stores'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <StoreIcon className="w-4 h-4" />
            <span>Stores & Logos ({stores.length})</span>
          </button>

          {/* TAB: SUB-ADMINS / EDITORS */}
          <button
            type="button"
            onClick={() => setActiveTab('sub_admins')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'sub_admins'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Sub-Admins / Editors ({adminUsers.length})</span>
          </button>

          {/* TAB: STORE OWNER LOGINS */}
          <button
            type="button"
            onClick={() => setActiveTab('merchants')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'merchants'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Merchant Logins ({storeOwners.length})</span>
          </button>

          {/* TAB: SEO & SERP */}
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'seo'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SEO Inspector</span>
          </button>

          {/* TAB: LOGS */}
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-[#03FF88] text-[#03FF88]'
                : 'border-transparent text-[#A3A6A8] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Audit Logs</span>
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#17181c]">
          {/* TAB: STORE REQUESTS */}
          {activeTab === 'store_requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <Building2 className="w-5 h-5 text-[#03FF88]" />
                    <span>Store Applications Awaiting Approval</span>
                    <span className="text-xs font-mono bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded font-bold">
                      {pendingRequests.length} pending
                    </span>
                  </h3>
                  <p className="text-xs text-[#A3A6A8]">
                    When merchants submit their store details, approve them here. Approving publishes the store and sends their login credentials to their email.
                  </p>
                </div>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[#3a3d40] rounded-2xl bg-[#1C1E22]">
                  <CheckCircle2 className="w-10 h-10 text-[#03FF88] mx-auto mb-2 opacity-80" />
                  <h4 className="text-base font-bold text-white">No Pending Store Requests</h4>
                  <p className="text-xs text-[#A3A6A8] max-w-sm mx-auto mt-1">
                    Store owners can submit their store via the public "Request Store" button. New applications will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3.5">
                  {pendingRequests.map(req => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-[#1C1E22] border border-[#3a3d40] hover:border-[#4E5255] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-[#4E5255] shadow-sm">
                          <img
                            src={req.logo}
                            alt={req.storeName}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-bold text-white">{req.storeName}</h4>
                            <span className="text-xs font-mono text-[#03FF88] bg-black/60 px-2 py-0.5 rounded border border-[#03FF88]/30">
                              {req.domain}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-[#A3A6A8] bg-[#2F3032] px-2 py-0.5 rounded">
                              {req.category}
                            </span>
                          </div>

                          <p className="text-xs text-[#D8D9DA] line-clamp-2">{req.description}</p>

                          <div className="flex items-center gap-4 text-[11px] text-[#A3A6A8] pt-1 flex-wrap">
                            <span>
                              Owner: <strong className="text-white">{req.ownerName}</strong>
                            </span>
                            <span>•</span>
                            <span>
                              Email: <strong className="text-[#03FF88]">{req.ownerEmail}</strong>
                            </span>
                            <span>•</span>
                            <span>
                              Assigned Password:{' '}
                              <strong className="text-white font-mono">{req.ownerPassword || 'Auto-generated'}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Approval Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => rejectStoreRequest(req.id)}
                          className="px-3.5 py-2 rounded-xl bg-[#2F3032] hover:bg-[#FF4B33]/20 hover:text-[#FF4B33] text-[#D8D9DA] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => approveStoreRequest(req.id)}
                          className="px-4 py-2 rounded-xl bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>Approve & Send Login</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PENDING COUPONS */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <span>Coupons Awaiting Admin Approval</span>
                    <span className="text-xs font-mono bg-[#FFBC13]/20 text-[#FFBC13] px-2 py-0.5 rounded font-bold">
                      {pendingSubmissions.length} pending
                    </span>
                  </h3>
                  <p className="text-xs text-[#A3A6A8]">
                    Review codes submitted by both shoppers and registered store owners before publishing live.
                  </p>
                </div>
              </div>

              {pendingSubmissions.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-[#3a3d40] rounded-2xl bg-[#1C1E22]">
                  <CheckCircle2 className="w-10 h-10 text-[#03FF88] mx-auto mb-2 opacity-80" />
                  <h4 className="text-base font-bold text-white">No Pending Coupon Codes</h4>
                  <p className="text-xs text-[#A3A6A8] max-w-sm mx-auto mt-1">
                    When visitors or store owners upload new coupon codes, they appear here for your moderation.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3.5">
                  {pendingSubmissions.map(sub => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-2xl bg-[#1C1E22] border border-[#3a3d40] hover:border-[#4E5255] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white bg-[#2F3032] px-2.5 py-0.5 rounded border border-[#4E5255]">
                            {sub.storeName}
                          </span>
                          <span className="text-sm font-mono font-black text-[#03FF88] bg-black/60 px-2.5 py-0.5 rounded border border-[#03FF88]/40 uppercase">
                            {sub.code}
                          </span>
                          <span className="text-xs font-bold text-[#FFBC13]">{sub.discount}</span>
                          {sub.submitterRole === 'store_owner' ? (
                            <span className="text-[10px] font-bold bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded border border-[#03FF88]/40">
                              ★ Official Store Submission
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-[#A3A6A8] bg-[#212327] px-2 py-0.5 rounded">
                              Shopper Submission
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-semibold text-white">{sub.title}</h4>
                        <p className="text-xs text-[#A3A6A8] leading-relaxed">{sub.description}</p>

                        <div className="flex items-center gap-4 text-[11px] text-[#A3A6A8] pt-1 flex-wrap">
                          <span>
                            Submitted by: <strong className="text-white">@{sub.submittedBy}</strong> ({sub.submittedEmail})
                          </span>
                          <span>•</span>
                          <span>{sub.submittedAt}</span>
                        </div>
                      </div>

                      {/* Approval Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => rejectSubmission(sub.id)}
                          className="px-3.5 py-2 rounded-xl bg-[#2F3032] hover:bg-[#FF4B33]/20 hover:text-[#FF4B33] text-[#D8D9DA] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => approveSubmission(sub.id)}
                          className="px-4 py-2 rounded-xl bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>Approve & Publish</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: ACTIVE COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <input
                    type="text"
                    value={couponSearch}
                    onChange={e => setCouponSearch(e.target.value)}
                    placeholder="Search by code, store, or discount..."
                    className="w-full bg-[#1C1E22] border border-[#3a3d40] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#A3A6A8] outline-none focus:border-[#03FF88]"
                  />
                  <select
                    value={selectedStoreFilter}
                    onChange={e => setSelectedStoreFilter(e.target.value)}
                    className="bg-[#1C1E22] border border-[#3a3d40] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="all">All Stores</option>
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddCoupon(!showAddCoupon)}
                  className="bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>{showAddCoupon ? 'Close Form' : 'Add New Coupon'}</span>
                </button>
              </div>

              {/* Add Coupon Form */}
              {showAddCoupon && (
                <form
                  onSubmit={handleCreateCoupon}
                  className="p-5 rounded-2xl bg-[#1C1E22] border border-[#03FF88]/40 space-y-3.5 text-xs animate-in fade-in"
                >
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-[#03FF88]" />
                    <span>Create & Publish Promo Code</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Store *</label>
                      <select
                        value={newCouponStoreId}
                        onChange={e => setNewCouponStoreId(e.target.value)}
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      >
                        {stores.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Coupon Code *</label>
                      <input
                        type="text"
                        value={newCouponCode}
                        onChange={e => setNewCouponCode(e.target.value)}
                        placeholder="e.g. SAVINGS25"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white font-mono uppercase outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Discount Amount *</label>
                      <input
                        type="text"
                        value={newCouponDiscount}
                        onChange={e => setNewCouponDiscount(e.target.value)}
                        placeholder="e.g. 25% Off or Rs. 500 Off"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Headline Title</label>
                      <input
                        type="text"
                        value={newCouponTitle}
                        onChange={e => setNewCouponTitle(e.target.value)}
                        placeholder="e.g. 25% Off Entire Order"
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Description</label>
                      <input
                        type="text"
                        value={newCouponDesc}
                        onChange={e => setNewCouponDesc(e.target.value)}
                        placeholder="e.g. Valid across all regular-priced items"
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#D8D9DA]">
                      <input
                        type="checkbox"
                        checked={newCouponIsVerified}
                        onChange={e => setNewCouponIsVerified(e.target.checked)}
                        className="rounded accent-[#03FF88]"
                      />
                      <span>Mark as Verified Today</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-[#D8D9DA]">
                      <input
                        type="checkbox"
                        checked={newCouponIsTopPick}
                        onChange={e => setNewCouponIsTopPick(e.target.checked)}
                        className="rounded accent-[#03FF88]"
                      />
                      <span>Mark as Trending Top Pick</span>
                    </label>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-[#03FF88] text-black font-extrabold px-4 py-2 rounded-xl hover:bg-[#00d975] cursor-pointer shadow"
                    >
                      Publish Promo Code
                    </button>
                  </div>
                </form>
              )}

              {/* Coupons List */}
              <div className="space-y-3">
                {filteredCoupons.map(coupon => (
                  <div
                    key={coupon.id}
                    className="p-3.5 rounded-xl bg-[#1C1E22] border border-[#2F3032] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white">{coupon.storeName}</span>
                        <span className="font-mono font-bold text-[#03FF88] bg-black/60 px-2 py-0.5 rounded border border-[#03FF88]/30">
                          {coupon.code}
                        </span>
                        <span className="text-[#FFBC13] font-bold">{coupon.discount}</span>
                        {coupon.isVerified && (
                          <span className="bg-[#03FF88]/15 text-[#03FF88] px-1.5 py-0.2 rounded text-[10px] font-bold">
                            Verified
                          </span>
                        )}
                        {coupon.isTopPick && (
                          <span className="bg-[#FFBC13]/15 text-[#FFBC13] px-1.5 py-0.2 rounded text-[10px] font-bold">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <p className="text-[#A3A6A8] text-xs truncate">{coupon.title}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleVerifyCoupon(coupon.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          coupon.isVerified
                            ? 'bg-[#2F3032] text-[#A3A6A8] hover:text-white'
                            : 'bg-[#03FF88]/20 text-[#03FF88] hover:bg-[#03FF88]/30'
                        }`}
                      >
                        {coupon.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-1.5 text-[#A3A6A8] hover:text-[#FF4B33] hover:bg-[#2F3032] rounded-lg transition-colors cursor-pointer"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STORES & LOGOS */}
          {activeTab === 'stores' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Stores & Custom Logo Management
                  </h3>
                  <p className="text-xs text-[#A3A6A8]">
                    Upload custom store logos from your computer or URL, edit brand details, and configure ratings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddStore(!showAddStore)}
                  className="bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow"
                >
                  <Plus className="w-4 h-4 text-black" />
                  <span>{showAddStore ? 'Close Form' : 'Add New Store'}</span>
                </button>
              </div>

              {/* Add Store Form */}
              {showAddStore && (
                <form
                  onSubmit={handleCreateStore}
                  className="p-5 rounded-2xl bg-[#1C1E22] border border-[#03FF88]/40 space-y-4 text-xs animate-in fade-in"
                >
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <StoreIcon className="w-4 h-4 text-[#03FF88]" />
                    <span>Create Store Entry & Upload Logo</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Store Name *</label>
                      <input
                        type="text"
                        value={newStoreName}
                        onChange={e => setNewStoreName(e.target.value)}
                        placeholder="e.g. Alkaram Studio, Daraz, Telemart"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Store Domain/URL *</label>
                      <input
                        type="text"
                        value={newStoreDomain}
                        onChange={e => setNewStoreDomain(e.target.value)}
                        placeholder="e.g. alkaramstudio.com"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Category</label>
                      <select
                        value={newStoreCategory}
                        onChange={e => setNewStoreCategory(e.target.value as Store['category'])}
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      >
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="food-restaurants">Food & Dining</option>
                        <option value="devices">Electronics & Tech</option>
                        <option value="hotels-travel">Hotels & Tourism</option>
                        <option value="home-garden">Groceries & Home</option>
                        <option value="software">Software & Services</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Management Box */}
                  <div className="p-3.5 rounded-xl bg-[#212327] border border-[#3a3d40] space-y-3">
                    <label className="block text-[#D8D9DA] font-semibold">Store Brand Logo</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-white p-2 border border-[#4E5255] flex items-center justify-center shrink-0 shadow">
                        {newStoreLogo ? (
                          <img
                            src={newStoreLogo}
                            alt="Logo preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-[#A3A6A8]" />
                        )}
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <div className="flex items-center gap-2 flex-wrap">
                          <label className="bg-[#2F3032] hover:bg-[#3a3d40] text-[#03FF88] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#03FF88]/30 flex items-center gap-1.5 cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Logo from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleFileUpload(e, false)}
                              className="hidden"
                            />
                          </label>
                          {newStoreLogo && (
                            <button
                              type="button"
                              onClick={() => setNewStoreLogo('')}
                              className="text-xs text-[#FF4B33] hover:underline cursor-pointer"
                            >
                              Clear Logo
                            </button>
                          )}
                        </div>
                        <input
                          type="url"
                          value={newStoreLogo}
                          onChange={e => setNewStoreLogo(e.target.value)}
                          placeholder="Or paste direct image URL (https://...)"
                          className="w-full bg-[#17181c] border border-[#3a3d40] rounded-xl p-2 text-white outline-none text-xs"
                        />
                      </div>
                    </div>

                    {/* Quick Brand Presets */}
                    <div>
                      <div className="text-[11px] text-[#A3A6A8] mb-1.5 font-semibold">
                        Quick Brand Logo Presets:
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {BRAND_PRESETS.map(preset => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => {
                              setNewStoreLogo(preset.logo);
                              if (!newStoreName) setNewStoreName(preset.name);
                            }}
                            className="text-[10px] bg-[#17181c] hover:bg-[#2F3032] text-[#D8D9DA] hover:text-white px-2 py-1 rounded-md border border-[#3a3d40] transition-colors cursor-pointer"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Top Deal Headline</label>
                      <input
                        type="text"
                        value={newStoreTopDeal}
                        onChange={e => setNewStoreTopDeal(e.target.value)}
                        placeholder="e.g. Up to 40% Off"
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Rating (1.0 to 5.0)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={newStoreRating}
                        onChange={e => setNewStoreRating(Number(e.target.value))}
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#D8D9DA] font-semibold mb-1">Savings Intelligence Tips</label>
                    <input
                      type="text"
                      value={newStoreIntel}
                      onChange={e => setNewStoreIntel(e.target.value)}
                      placeholder="e.g. Best promo code averages 25% off during seasonal sales."
                      className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-[#03FF88] text-black font-extrabold px-4 py-2 rounded-xl hover:bg-[#00d975] cursor-pointer shadow"
                    >
                      Save Store & Logo
                    </button>
                  </div>
                </form>
              )}

              {/* Stores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {stores.map(store => (
                  <div
                    key={store.id}
                    className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032] flex items-center justify-between gap-3 text-xs hover:border-[#4E5255] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-[#3a3d40]">
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-white text-sm truncate">{store.name}</h4>
                          <span className="text-[10px] text-[#A3A6A8] font-mono">({store.slug})</span>
                        </div>
                        <p className="text-[#A3A6A8] text-[11px] truncate mt-0.5">
                          {store.verifiedCodesCount} verified codes • ⭐ {store.rating}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditStoreModal(store)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#2F3032] hover:bg-[#3a3d40] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Edit Store Details & Logo"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#03FF88]" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStoreSlug(store.slug);
                          setIsAdminDashboardOpen(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#2F3032] hover:bg-[#3a3d40] text-[#03FF88] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteStore(store.id)}
                        className="p-1.5 text-[#A3A6A8] hover:text-[#FF4B33] hover:bg-[#2F3032] rounded-lg transition-colors cursor-pointer"
                        title="Delete Store"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SUB-ADMINS & EDITORS */}
          {activeTab === 'sub_admins' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <Users className="w-5 h-5 text-[#03FF88]" />
                    <span>Sub-Admin & Editor Management</span>
                    {isSuperAdmin && (
                      <span className="text-xs font-mono bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded font-bold">
                        Super Admin Access
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#A3A6A8]">
                    Super Admin (gseveloper@gmail.com) can add and manage editors to help review coupon submissions and store applications.
                  </p>
                </div>

                {isSuperAdmin && (
                  <button
                    type="button"
                    onClick={() => setShowAddSubAdmin(!showAddSubAdmin)}
                    className="bg-[#03FF88] hover:bg-[#00d975] text-black text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <UserPlus className="w-4 h-4 text-black" />
                    <span>{showAddSubAdmin ? 'Close' : 'Add New Sub-Admin / Editor'}</span>
                  </button>
                )}
              </div>

              {/* Add Sub-Admin Form */}
              {showAddSubAdmin && isSuperAdmin && (
                <form
                  onSubmit={handleAddSubAdminSubmit}
                  className="p-5 rounded-2xl bg-[#1C1E22] border border-[#03FF88]/40 space-y-3.5 text-xs animate-in fade-in"
                >
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-[#03FF88]" />
                    <span>Invite & Create Editor Account</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Editor Name *</label>
                      <input
                        type="text"
                        value={subAdminName}
                        onChange={e => setSubAdminName(e.target.value)}
                        placeholder="e.g. Sarah Khan"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Editor Email *</label>
                      <input
                        type="email"
                        value={subAdminEmail}
                        onChange={e => setSubAdminEmail(e.target.value)}
                        placeholder="editor@couponscode.store"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D8D9DA] font-semibold mb-1">Assigned Password *</label>
                      <input
                        type="text"
                        value={subAdminPassword}
                        onChange={e => setSubAdminPassword(e.target.value)}
                        placeholder="EditorPass2026!"
                        required
                        className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-[#03FF88] text-black font-extrabold px-5 py-2 rounded-xl hover:bg-[#00d975] cursor-pointer shadow"
                    >
                      Grant Editor Access
                    </button>
                  </div>
                </form>
              )}

              {/* Sub-Admins List */}
              <div className="space-y-3">
                {adminUsers.map(user => (
                  <div
                    key={user.id}
                    className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{user.name}</span>
                        {user.role === 'super_admin' ? (
                          <span className="text-[10px] font-black bg-[#03FF88] text-black px-2 py-0.5 rounded font-mono uppercase">
                            Super Admin
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-[#2F3032] text-[#03FF88] border border-[#03FF88]/30 px-2 py-0.5 rounded font-mono uppercase">
                            Sub-Admin Editor
                          </span>
                        )}
                      </div>
                      <p className="text-[#A3A6A8] text-xs font-mono">{user.email}</p>
                      {user.password && (
                        <p className="text-[11px] text-[#D8D9DA]">
                          Password: <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded">{user.password}</span>
                        </p>
                      )}
                    </div>

                    {isSuperAdmin && user.role !== 'super_admin' && (
                      <button
                        type="button"
                        onClick={() => deleteSubAdmin(user.id)}
                        className="p-2 text-[#A3A6A8] hover:text-[#FF4B33] hover:bg-[#2F3032] rounded-lg transition-colors cursor-pointer"
                        title="Remove Editor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STORE OWNER LOGINS & CREDENTIALS */}
          {activeTab === 'merchants' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Verified Store Owner Logins & Automated Emails
                </h3>
                <p className="text-xs text-[#A3A6A8]">
                  Stores approved by admin can log in to their Merchant Portal with these credentials.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {storeOwners.map(so => (
                  <div
                    key={so.id}
                    className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{so.storeName}</span>
                      <span className="text-[10px] bg-[#03FF88]/20 text-[#03FF88] px-2 py-0.5 rounded font-bold uppercase">
                        Verified Merchant
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-[#D8D9DA]">
                      <div>
                        Manager: <strong className="text-white">{so.ownerName}</strong>
                      </div>
                      <div>
                        Login Email: <strong className="text-[#03FF88] font-mono">{so.email}</strong>
                      </div>
                      <div>
                        Password: <strong className="text-white font-mono bg-black/50 px-2 py-0.5 rounded">{so.password}</strong>
                      </div>
                      <div className="text-[11px] text-[#A3A6A8] pt-1">
                        Verified On: {so.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Automated Email Outbox */}
              <div className="pt-4 border-t border-[#2F3032] space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#03FF88]" />
                  <span>Automated Merchant Confirmation Emails Sent ({sentEmails.length})</span>
                </div>

                {sentEmails.length === 0 ? (
                  <p className="text-xs text-[#A3A6A8]">
                    No approval emails sent yet. When you approve a store request, the confirmation record appears here.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {sentEmails.map(em => (
                      <div
                        key={em.id}
                        className="p-3.5 rounded-xl bg-[#141518] border border-[#2F3032] text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[#A3A6A8] text-[11px]">
                          <span>
                            To: <strong className="text-[#03FF88]">{em.to}</strong> ({em.storeName})
                          </span>
                          <span>{em.timestamp}</span>
                        </div>
                        <div className="font-semibold text-white">{em.subject}</div>
                        <pre className="text-[11px] text-[#A3A6A8] font-mono whitespace-pre-wrap bg-black/40 p-2.5 rounded-lg mt-1">
                          {em.content}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: SEO & SERP */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
                    <Globe className="w-5 h-5 text-[#03FF88]" />
                    <span>Real-Time Google SERP & Schema.org Inspector</span>
                  </h3>
                  <p className="text-xs text-[#A3A6A8]">
                    Verify that couponscode.store and every store page generate valid Schema rich snippets and meta tags.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedSeoStoreId}
                    onChange={e => setSelectedSeoStoreId(e.target.value)}
                    className="bg-[#1C1E22] border border-[#3a3d40] rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-[#03FF88]"
                  >
                    <option value="home">Home Page (couponscode.store)</option>
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.slug})
                      </option>
                    ))}
                  </select>

                  <div className="bg-[#1C1E22] border border-[#3a3d40] rounded-xl p-0.5 flex items-center">
                    <button
                      type="button"
                      onClick={() => setSeoDeviceView('desktop')}
                      className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                        seoDeviceView === 'desktop' ? 'bg-[#03FF88] text-black' : 'text-[#A3A6A8] hover:text-white'
                      }`}
                      title="Desktop Search Snippet"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeoDeviceView('mobile')}
                      className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                        seoDeviceView === 'mobile' ? 'bg-[#03FF88] text-black' : 'text-[#A3A6A8] hover:text-white'
                      }`}
                      title="Mobile Search Snippet"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Google Snippet Preview */}
              <div className="bg-[#1C1E22] border border-[#3a3d40] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#A3A6A8]">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-[#03FF88]" />
                    Google Search Snippet Preview ({seoDeviceView === 'desktop' ? 'Desktop' : 'Mobile'})
                  </span>
                  <span className="bg-[#03FF88]/15 text-[#03FF88] px-2 py-0.5 rounded font-mono text-[10px]">
                    100% SEO Ready
                  </span>
                </div>

                <div
                  className={`p-4 rounded-xl bg-white text-black shadow-md ${
                    seoDeviceView === 'mobile' ? 'max-w-md' : 'max-w-2xl'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full bg-[#03FF88] flex items-center justify-center text-[9px] font-black text-black">
                      %
                    </div>
                    <div className="text-[11px] text-[#202124] leading-tight">
                      <span className="font-medium text-[#202124]">couponscode.store</span>
                      <span className="text-[#5f6368] text-[10px] ml-1">{seoBreadcrumb}</span>
                    </div>
                  </div>

                  <h4 className="text-[#1a0dab] hover:underline cursor-pointer text-sm sm:text-base font-medium leading-snug">
                    {seoTitle}
                  </h4>

                  {currentSeoStore && (
                    <div className="flex items-center gap-1.5 my-1 text-xs text-[#5f6368]">
                      <span className="text-[#e37400] font-bold">Rating: {currentSeoStore.rating}</span>
                      <span className="text-[#e37400]">★★★★★</span>
                      <span>·</span>
                      <span>{currentSeoStore.totalRatings.toLocaleString()} reviews</span>
                      <span>·</span>
                      <span className="text-[#137333] font-semibold">
                        {currentSeoStore.verifiedCodesCount} verified codes
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-[#4d5156] leading-relaxed mt-1 line-clamp-2">
                    {seoDescription}
                  </p>
                </div>
              </div>

              {/* Schema Inspector */}
              <div className="bg-[#1C1E22] border border-[#3a3d40] rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#03FF88]" />
                    <h4 className="text-sm font-bold text-white font-heading">
                      Generated Schema.org JSON-LD Structured Data
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySchema}
                    className="bg-[#2F3032] hover:bg-[#3a3d40] text-[#03FF88] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSchema ? 'Copied!' : 'Copy JSON-LD'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-[#101013] border border-[#2F3032] text-[11px] font-mono text-[#03FF88] overflow-x-auto max-h-[260px] leading-relaxed">
                  {JSON.stringify(seoSchema, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032]">
                  <div className="text-xs text-[#A3A6A8]">Total Stores</div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">{stores.length}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032]">
                  <div className="text-xs text-[#A3A6A8]">Active Coupons</div>
                  <div className="text-2xl font-black text-[#03FF88] mt-1 font-mono">{coupons.length}</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032]">
                  <div className="text-xs text-[#A3A6A8]">Store Requests</div>
                  <div className="text-2xl font-black text-[#FFBC13] mt-1 font-mono">
                    {pendingRequests.length}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1C1E22] border border-[#2F3032]">
                  <div className="text-xs text-[#A3A6A8]">Sub-Admins & Editors</div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    {adminUsers.length}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                    Admin Action Audit Trail
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all data back to the default demo state?')) {
                        resetToDefaultData();
                      }
                    }}
                    className="text-xs text-[#FF4B33] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset Demo Seed Data
                  </button>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {auditLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-[#1C1E22] border border-[#2F3032] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#03FF88]">{log.action}</span>
                          <span className="text-[#A3A6A8] text-[11px] font-mono">by {log.adminEmail}</span>
                        </div>
                        <p className="text-white/90 text-xs">{log.details}</p>
                      </div>
                      <span className="text-[11px] text-[#A3A6A8] font-mono shrink-0">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDIT STORE & LOGO MODAL */}
      {editingStore && (
        <div className="fixed inset-0 z-[9700] bg-black/80 flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-[#1C1E22] border border-[#3a3d40] rounded-2xl w-full max-w-lg p-5 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2F3032] pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#03FF88]" />
                <h3 className="text-base font-bold text-white font-heading">
                  Edit {editingStore.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingStore(null)}
                className="text-[#A3A6A8] hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedStore} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">Store Name</label>
                <input
                  type="text"
                  value={editStoreName}
                  onChange={e => setEditStoreName(e.target.value)}
                  required
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                />
              </div>

              {/* Edit Logo */}
              <div className="p-3 rounded-xl bg-[#212327] border border-[#3a3d40] space-y-2.5">
                <label className="block text-[#D8D9DA] font-semibold">Store Logo</label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-[#4E5255]">
                    {editStoreLogo ? (
                      <img
                        src={editStoreLogo}
                        alt="Logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="bg-[#2F3032] hover:bg-[#3a3d40] text-[#03FF88] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#03FF88]/30 inline-flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="url"
                      value={editStoreLogo}
                      onChange={e => setEditStoreLogo(e.target.value)}
                      placeholder="Or paste Image URL"
                      className="w-full bg-[#17181c] border border-[#3a3d40] rounded-lg p-1.5 text-white outline-none text-xs"
                    />
                  </div>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-1 flex-wrap pt-1">
                  {BRAND_PRESETS.slice(0, 6).map(p => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setEditStoreLogo(p.logo)}
                      className="text-[9px] bg-[#17181c] hover:bg-[#2F3032] text-[#D8D9DA] px-2 py-0.5 rounded border border-[#3a3d40] cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">Top Deal</label>
                  <input
                    type="text"
                    value={editStoreTopDeal}
                    onChange={e => setEditStoreTopDeal(e.target.value)}
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#D8D9DA] font-semibold mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editStoreRating}
                    onChange={e => setEditStoreRating(Number(e.target.value))}
                    className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#D8D9DA] font-semibold mb-1">Category</label>
                <select
                  value={editStoreCategory}
                  onChange={e => setEditStoreCategory(e.target.value as Store['category'])}
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none"
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
                <label className="block text-[#D8D9DA] font-semibold mb-1">Savings Intel</label>
                <textarea
                  rows={2}
                  value={editStoreIntel}
                  onChange={e => setEditStoreIntel(e.target.value)}
                  className="w-full bg-[#212327] border border-[#3a3d40] rounded-xl p-2 text-white outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#2F3032]">
                <button
                  type="button"
                  onClick={() => setEditingStore(null)}
                  className="px-4 py-2 rounded-xl bg-[#2F3032] text-[#D8D9DA] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#03FF88] text-black font-extrabold hover:bg-[#00d975] cursor-pointer shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
