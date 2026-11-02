import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Store,
  Coupon,
  CouponSubmission,
  LiveFeedEvent,
  AdminAuditLog,
  StoreRequest,
  StoreOwnerAccount,
  AdminUser
} from '../types';
import { INITIAL_STORES, INITIAL_COUPONS, INITIAL_SUBMISSIONS, INITIAL_LIVE_FEED } from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface SentEmailNotification {
  id: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  storeName: string;
}

interface AppContextType {
  stores: Store[];
  coupons: Coupon[];
  submissions: CouponSubmission[];
  liveFeed: LiveFeedEvent[];
  auditLogs: AdminAuditLog[];
  storeRequests: StoreRequest[];
  storeOwners: StoreOwnerAccount[];
  adminUsers: AdminUser[];
  sentEmails: SentEmailNotification[];

  selectedStoreSlug: string | null;
  setSelectedStoreSlug: (slug: string | null) => void;
  selectedStore: Store | null;

  // Multi-role Auth
  currentUser: {
    role: 'super_admin' | 'editor' | 'store_owner' | null;
    email: string;
    name: string;
    storeId?: string;
  } | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isStoreOwner: boolean;
  loggedInStore: Store | null;

  adminLogin: (email: string, pass: string) => { success: boolean; message?: string };
  storeOwnerLogin: (email: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;

  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;

  isStoreRequestModalOpen: boolean;
  setIsStoreRequestModalOpen: (open: boolean) => void;

  isStoreOwnerDashboardOpen: boolean;
  setIsStoreOwnerDashboardOpen: (open: boolean) => void;

  // Store Requests & Management
  submitStoreRequest: (req: Omit<StoreRequest, 'id' | 'status' | 'requestedAt'>) => void;
  approveStoreRequest: (requestId: string) => void;
  rejectStoreRequest: (requestId: string, reason?: string) => void;

  // Sub-Admins Management (Super Admin only)
  addSubAdmin: (user: { name: string; email: string; password?: string }) => void;
  deleteSubAdmin: (id: string) => void;

  // Coupon actions
  addCoupon: (newCoupon: Omit<Coupon, 'id' | 'verifications' | 'usesToday' | 'totalUses' | 'verificationsCount'>) => void;
  editCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  toggleVerifyCoupon: (id: string) => void;
  voteCoupon: (couponId: string, isYes: boolean) => void;
  userVotes: Record<string, 'yes' | 'no'>;

  // Store actions
  addStore: (newStore: Omit<Store, 'id' | 'verifiedCodesCount' | 'totalCodesCount' | 'proTips' | 'monthlyTrends'>) => void;
  editStore: (id: string, updates: Partial<Store>) => void;
  deleteStore: (id: string) => void;

  // Submission actions
  submitUserCoupon: (sub: {
    storeId: string;
    code: string;
    discount: string;
    title: string;
    description: string;
    submittedBy: string;
    submittedEmail: string;
    submitterRole?: 'shopper' | 'store_owner';
    proofUrl?: string;
  }) => void;
  approveSubmission: (submissionId: string, customDiscount?: string, customHealth?: number) => void;
  rejectSubmission: (submissionId: string, reason?: string) => void;

  // Modals
  revealModalCoupon: Coupon | null;
  openRevealModal: (coupon: Coupon) => void;
  closeRevealModal: () => void;

  isSubmitModalOpen: boolean;
  submitModalDefaultStoreId: string | null;
  openSubmitModal: (storeId?: string) => void;
  closeSubmitModal: () => void;

  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  screenshotViewer: { url: string; title: string; user: string; time: string } | null;
  openScreenshotModal: (viewer: { url: string; title: string; user: string; time: string }) => void;
  closeScreenshotModal: () => void;

  // Pro tip voting
  voteProTip: (storeId: string, tipId: string, isUpvote: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;

  resetToDefaultData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Super Admin definition
const SUPER_ADMIN_EMAIL = 'gseveloper@gmail.com';
const SUPER_ADMIN_PASS = 'Admin12345$$$$$';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_stores_v3');
      return saved ? JSON.parse(saved) : INITIAL_STORES;
    } catch {
      return INITIAL_STORES;
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_coupons_v3');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [submissions, setSubmissions] = useState<CouponSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_submissions_v3');
      return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
    } catch {
      return INITIAL_SUBMISSIONS;
    }
  });

  const [storeRequests, setStoreRequests] = useState<StoreRequest[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_store_requests_v3');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'req-sample-1',
              storeName: 'Royal Sweets & Bakers',
              domain: 'royalsweets.pk',
              category: 'food-restaurants',
              logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80',
              description: 'Authentic traditional Pakistani sweets, barfi, and fresh bakery items.',
              ownerName: 'Muhammad Usman',
              ownerEmail: 'usman@royalsweets.pk',
              ownerPassword: 'StorePass2026!',
              topDeal: '15% Off Sweets',
              status: 'pending',
              requestedAt: 'Today, 10:15 AM'
            }
          ];
    } catch {
      return [];
    }
  });

  const [storeOwners, setStoreOwners] = useState<StoreOwnerAccount[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_store_owners_v3');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'so-kfc',
              storeId: 'kfc-pk',
              storeName: 'KFC Pakistan',
              ownerName: 'KFC Marketing Partner',
              email: 'partner@kfcpakistan.com',
              password: 'KfcPartner2026$',
              createdAt: 'Nov 1, 2026',
              status: 'active'
            }
          ];
    } catch {
      return [];
    }
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_admin_users_v3');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'adm-super',
              name: 'Super Admin',
              email: SUPER_ADMIN_EMAIL,
              role: 'super_admin',
              addedAt: 'System Root'
            },
            {
              id: 'adm-sub-1',
              name: 'Sarah Khan (Editor)',
              email: 'sarah.editor@couponscode.store',
              password: 'Editor2026Pass!',
              role: 'editor',
              addedAt: 'Nov 1, 2026'
            }
          ];
    } catch {
      return [];
    }
  });

  const [sentEmails, setSentEmails] = useState<SentEmailNotification[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_sent_emails_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userVotes, setUserVotes] = useState<Record<string, 'yes' | 'no'>>(() => {
    try {
      const saved = localStorage.getItem('ccs_user_votes_v3');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [liveFeed, setLiveFeed] = useState<LiveFeedEvent[]>(INITIAL_LIVE_FEED);

  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('ccs_audit_v3');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'log-1',
              action: 'Platform Bootstrapped',
              details: 'couponscode.store active with pure coupon codes, role-based admin, and merchant portal.',
              timestamp: 'Today, 09:00 AM',
              adminEmail: 'System Security'
            }
          ];
    } catch {
      return [];
    }
  });

  // Current Logged-in User Session
  const [currentUser, setCurrentUser] = useState<{
    role: 'super_admin' | 'editor' | 'store_owner' | null;
    email: string;
    name: string;
    storeId?: string;
  } | null>(() => {
    try {
      const saved = sessionStorage.getItem('ccs_auth_session_v3');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Navigation State
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string | null>(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#store/')) {
      return hash.replace('#store/', '');
    }
    return null;
  });

  // Modals
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isStoreRequestModalOpen, setIsStoreRequestModalOpen] = useState(false);
  const [isStoreOwnerDashboardOpen, setIsStoreOwnerDashboardOpen] = useState(false);

  const [revealModalCoupon, setRevealModalCoupon] = useState<Coupon | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitModalDefaultStoreId, setSubmitModalDefaultStoreId] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [screenshotViewer, setScreenshotViewer] = useState<{ url: string; title: string; user: string; time: string } | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const openScreenshotModal = (viewer: { url: string; title: string; user: string; time: string }) => {
    setScreenshotViewer(viewer);
  };

  const closeScreenshotModal = () => {
    setScreenshotViewer(null);
  };

  const voteProTip = (storeId: string, tipId: string, isUpvote: boolean) => {
    setStores(prev =>
      prev.map(s => {
        if (s.id === storeId) {
          return {
            ...s,
            proTips: s.proTips.map(t => {
              if (t.id === tipId) {
                return {
                  ...t,
                  upvotes: isUpvote ? t.upvotes + 1 : t.upvotes,
                  downvotes: !isUpvote ? t.downvotes + 1 : t.downvotes
                };
              }
              return t;
            })
          };
        }
        return s;
      })
    );
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ccs_stores_v3', JSON.stringify(stores));
    } catch (e) {
      console.error(e);
    }
  }, [stores]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_coupons_v3', JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_submissions_v3', JSON.stringify(submissions));
    } catch (e) {
      console.error(e);
    }
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_store_requests_v3', JSON.stringify(storeRequests));
    } catch (e) {
      console.error(e);
    }
  }, [storeRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_store_owners_v3', JSON.stringify(storeOwners));
    } catch (e) {
      console.error(e);
    }
  }, [storeOwners]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_admin_users_v3', JSON.stringify(adminUsers));
    } catch (e) {
      console.error(e);
    }
  }, [adminUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_sent_emails_v3', JSON.stringify(sentEmails));
    } catch (e) {
      console.error(e);
    }
  }, [sentEmails]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_user_votes_v3', JSON.stringify(userVotes));
    } catch (e) {
      console.error(e);
    }
  }, [userVotes]);

  useEffect(() => {
    try {
      localStorage.setItem('ccs_audit_v3', JSON.stringify(auditLogs));
    } catch (e) {
      console.error(e);
    }
  }, [auditLogs]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('ccs_auth_session_v3', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('ccs_auth_session_v3');
    }
  }, [currentUser]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#store/')) {
        setSelectedStoreSlug(hash.replace('#store/', ''));
      } else if (hash === '#stores' || hash === '' || hash === '#home') {
        setSelectedStoreSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedStore = selectedStoreSlug ? stores.find(s => s.slug === selectedStoreSlug) || null : null;

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper flags
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'editor';
  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isStoreOwner = currentUser?.role === 'store_owner';
  const loggedInStore = isStoreOwner && currentUser?.storeId ? stores.find(s => s.id === currentUser.storeId) || null : null;

  // Admin & Sub-Admin Login
  const adminLogin = (email: string, pass: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Check Super Admin
    if (cleanEmail === SUPER_ADMIN_EMAIL.toLowerCase() && cleanPass === SUPER_ADMIN_PASS) {
      const session = {
        role: 'super_admin' as const,
        email: SUPER_ADMIN_EMAIL,
        name: 'Super Admin'
      };
      setCurrentUser(session);
      setIsAdminModalOpen(false);
      setIsAdminDashboardOpen(true);
      showToast({
        type: 'success',
        title: 'Super Admin Verified',
        message: 'Welcome back, Super Admin.'
      });
      return { success: true };
    }

    // 2. Check Sub-Admin / Editor
    const foundEditor = adminUsers.find(
      u => u.email.toLowerCase() === cleanEmail && (u.password ? u.password === cleanPass : true)
    );

    if (foundEditor) {
      const session = {
        role: foundEditor.role,
        email: foundEditor.email,
        name: foundEditor.name
      };
      setCurrentUser(session);
      setIsAdminModalOpen(false);
      setIsAdminDashboardOpen(true);
      showToast({
        type: 'success',
        title: 'Editor Access Granted',
        message: `Welcome, ${foundEditor.name}.`
      });
      return { success: true };
    }

    return { success: false, message: 'Invalid admin credentials entered.' };
  };

  // Store Owner Login
  const storeOwnerLogin = (email: string, pass: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    const owner = storeOwners.find(
      so => so.email.toLowerCase() === cleanEmail && so.password === cleanPass
    );

    if (owner) {
      const session = {
        role: 'store_owner' as const,
        email: owner.email,
        name: owner.ownerName,
        storeId: owner.storeId
      };
      setCurrentUser(session);
      setIsAdminModalOpen(false);
      setIsStoreOwnerDashboardOpen(true);
      showToast({
        type: 'success',
        title: `Welcome, ${owner.ownerName}`,
        message: `Logged into ${owner.storeName} Merchant Portal.`
      });
      return { success: true };
    }

    return {
      success: false,
      message: 'No verified store account matches this email and password.'
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdminDashboardOpen(false);
    setIsStoreOwnerDashboardOpen(false);
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out.'
    });
  };

  // Store Requests
  const submitStoreRequest = (req: Omit<StoreRequest, 'id' | 'status' | 'requestedAt'>) => {
    const newReq: StoreRequest = {
      ...req,
      id: 'req-' + Date.now(),
      status: 'pending',
      requestedAt: 'Just now'
    };

    setStoreRequests(prev => [newReq, ...prev]);
    setIsStoreRequestModalOpen(false);

    showToast({
      type: 'success',
      title: 'Store Request Submitted!',
      message: `Your store "${req.storeName}" has been submitted for admin review.`
    });
  };

  // Approve Store Request
  const approveStoreRequest = (requestId: string) => {
    const req = storeRequests.find(r => r.id === requestId);
    if (!req) return;

    const slug = req.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
    const storeId = slug.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'store-' + Date.now();

    // 1. Create the store
    const newStore: Store = {
      id: storeId,
      name: req.storeName,
      slug,
      domain: req.domain,
      logo: req.logo || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=120&auto=format&fit=crop&q=80',
      category: req.category,
      rating: 4.9,
      totalRatings: 1,
      verifiedCodesCount: 0,
      totalCodesCount: 0,
      health: 98,
      description: req.description || `${req.storeName} verified shopping store.`,
      savingsIntel: `Check couponscode.store for daily verified promo codes for ${req.storeName}.`,
      topDeal: req.topDeal || 'Verified Codes',
      affiliateUrl: req.domain.startsWith('http') ? req.domain : `https://${req.domain}`,
      isPopular: true,
      policies: {
        freeShipping: 'Standard shipping available'
      },
      proTips: [],
      monthlyTrends: [
        { month: 'Sep', codes: 3, discount: '15%' },
        { month: 'Oct', codes: 6, discount: '20%' },
        { month: 'Nov', codes: 8, discount: '25%' }
      ],
      ownerEmail: req.ownerEmail
    };

    setStores(prev => [newStore, ...prev]);

    // 2. Create the store owner account
    const assignedPassword = req.ownerPassword || 'StorePass' + Math.floor(1000 + Math.random() * 9000) + '!';
    const newOwner: StoreOwnerAccount = {
      id: 'so-' + Date.now(),
      storeId,
      storeName: req.storeName,
      ownerName: req.ownerName,
      email: req.ownerEmail,
      password: assignedPassword,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'active'
    };

    setStoreOwners(prev => [newOwner, ...prev]);

    // 3. Mark request as approved
    setStoreRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'approved' } : r))
    );

    // 4. Generate automated confirmation email record
    const emailNotice: SentEmailNotification = {
      id: 'em-' + Date.now(),
      to: req.ownerEmail,
      subject: `Your store "${req.storeName}" is APPROVED on couponscode.store!`,
      content: `Hello ${req.ownerName},\n\nCongratulations! Your store "${req.storeName}" has been verified and published to couponscode.store.\n\nYou can now log in to your Merchant Portal to add and manage your official coupon codes:\n\nMerchant Portal URL: https://couponscode.store/#merchant\nLogin Email: ${req.ownerEmail}\nPassword: ${assignedPassword}\n\nAll coupons submitted by your team will be reviewed by admin for instant publishing.\n\nThank you,\ncouponscode.store Team`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      storeName: req.storeName
    };

    setSentEmails(prev => [emailNotice, ...prev]);

    // 5. Audit Log
    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Store Request Approved',
        details: `Approved "${req.storeName}". Created merchant login for ${req.ownerEmail}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'success',
      title: 'Store Approved & Login Generated!',
      message: `"${req.storeName}" is live. Credentials sent to ${req.ownerEmail}.`
    });
  };

  const rejectStoreRequest = (requestId: string, reason: string = 'Domain or verification information incomplete') => {
    const req = storeRequests.find(r => r.id === requestId);
    if (!req) return;

    setStoreRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status: 'rejected', rejectionReason: reason } : r))
    );

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Store Request Rejected',
        details: `Rejected "${req.storeName}". Reason: ${reason}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'info',
      title: 'Store Request Rejected',
      message: `Request for "${req.storeName}" was declined.`
    });
  };

  // Sub-Admins Management
  const addSubAdmin = (user: { name: string; email: string; password?: string }) => {
    const newAdmin: AdminUser = {
      id: 'adm-' + Date.now(),
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
      password: user.password?.trim() || 'EditorPass2026!',
      role: 'editor',
      addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setAdminUsers(prev => [...prev, newAdmin]);

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Sub-Admin Added',
        details: `Added ${user.name} (${user.email}) as Editor.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'success',
      title: 'Editor Account Created',
      message: `${user.name} can now log in as an Editor.`
    });
  };

  const deleteSubAdmin = (id: string) => {
    const user = adminUsers.find(u => u.id === id);
    if (!user || user.role === 'super_admin') return;

    setAdminUsers(prev => prev.filter(u => u.id !== id));

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Sub-Admin Removed',
        details: `Removed editor account ${user.email}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'info',
      title: 'Editor Removed',
      message: `${user.name} removed from admin access.`
    });
  };

  // User & Store Owner Submissions
  const submitUserCoupon = (sub: {
    storeId: string;
    code: string;
    discount: string;
    title: string;
    description: string;
    submittedBy: string;
    submittedEmail: string;
    submitterRole?: 'shopper' | 'store_owner';
    proofUrl?: string;
  }) => {
    const store = stores.find(s => s.id === sub.storeId);
    const storeName = store ? store.name : 'Store';

    const newSub: CouponSubmission = {
      id: 'sub-' + Date.now(),
      storeId: sub.storeId,
      storeName,
      code: sub.code.trim().toUpperCase(),
      title: sub.title.trim() || `${sub.discount} at ${storeName}`,
      description: sub.description.trim() || `Verified discount for ${storeName}`,
      discount: sub.discount.trim(),
      type: 'site_wide',
      restrictions: [],
      submittedBy: sub.submittedBy.trim() || 'Contributor',
      submittedEmail: sub.submittedEmail.trim(),
      submittedAt: 'Just now',
      submitterRole: sub.submitterRole || 'shopper',
      proofUrl: sub.proofUrl,
      status: 'pending'
    };

    setSubmissions(prev => [newSub, ...prev]);

    setLiveFeed(prev => [
      {
        id: 'lf-' + Date.now(),
        merchant: storeName,
        code: sub.code.toUpperCase(),
        type: 'submitted',
        user: sub.submittedBy || 'Shopper',
        timestamp: 'Just now',
        statusText: `Submitted for review: ${sub.discount}`,
        isVerified: false
      },
      ...prev.slice(0, 19)
    ]);

    showToast({
      type: 'success',
      title: sub.submitterRole === 'store_owner' ? 'Store Coupon Submitted!' : 'Coupon Submitted!',
      message: 'Thank you! Sent to moderation queue for verification.'
    });
  };

  const approveSubmission = (submissionId: string, customDiscount?: string, customHealth?: number) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    const discountText = customDiscount || sub.discount;
    const store = stores.find(s => s.id === sub.storeId);
    const storeName = store ? store.name : sub.storeName;
    const storeSlug = store ? store.slug : `${sub.storeId}.com`;

    const newCoupon: Coupon = {
      id: 'coupon-' + Date.now(),
      storeId: sub.storeId,
      storeName,
      storeSlug,
      code: sub.code.toUpperCase(),
      discount: discountText,
      title: sub.title || `${discountText} at ${storeName}`,
      description: sub.description || `${discountText} storewide with verified code`,
      type: 'site_wide',
      badge: discountText,
      isVerified: true,
      isTopPick: false,
      healthScore: customHealth || 97,
      healthStatus: 'green',
      lastUsed: 'Just now',
      usesToday: 1,
      totalUses: 1,
      verificationsCount: 1,
      restrictions: ['Verified through admin review'],
      daysLeft: 14,
      affiliateUrl: store?.affiliateUrl || `https://${storeSlug}`,
      verifications: [
        {
          id: 'v-' + Date.now(),
          user: sub.submittedBy || 'Moderator',
          timeAgo: 'Just now',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'verified',
          screenshotUrl: sub.proofUrl
        }
      ]
    };

    setCoupons(prev => [newCoupon, ...prev]);

    if (store) {
      setStores(prev =>
        prev.map(st =>
          st.id === sub.storeId
            ? {
                ...st,
                verifiedCodesCount: st.verifiedCodesCount + 1,
                totalCodesCount: st.totalCodesCount + 1
              }
            : st
        )
      );
    }

    setSubmissions(prev =>
      prev.map(s => (s.id === submissionId ? { ...s, status: 'approved' } : s))
    );

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Submission Approved',
        details: `Approved "${sub.code}" for ${storeName} (${discountText}).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'success',
      title: 'Deal Approved & Live!',
      message: `"${sub.code}" published to ${storeName}.`
    });
  };

  const rejectSubmission = (submissionId: string, reason: string = 'Code did not pass checkout verification test') => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    setSubmissions(prev =>
      prev.map(s => (s.id === submissionId ? { ...s, status: 'rejected', rejectionReason: reason } : s))
    );

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Submission Rejected',
        details: `Rejected "${sub.code}" for ${sub.storeName}. Reason: ${reason}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'info',
      title: 'Submission Rejected',
      message: `Offer "${sub.code}" declined.`
    });
  };

  // Coupon CRUD
  const addCoupon = (
    newCouponData: Omit<Coupon, 'id' | 'verifications' | 'usesToday' | 'totalUses' | 'verificationsCount'>
  ) => {
    const id = 'coupon-' + Date.now();
    const created: Coupon = {
      ...newCouponData,
      id,
      usesToday: 1,
      totalUses: 1,
      verificationsCount: 1,
      daysLeft: 14,
      verifications: [
        {
          id: 'v-' + Date.now(),
          user: currentUser?.name || 'Admin Verifier',
          timeAgo: 'Just now',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'verified'
        }
      ]
    };

    setCoupons(prev => [created, ...prev]);

    setStores(prev =>
      prev.map(s =>
        s.id === newCouponData.storeId
          ? {
              ...s,
              verifiedCodesCount: newCouponData.isVerified ? s.verifiedCodesCount + 1 : s.verifiedCodesCount,
              totalCodesCount: s.totalCodesCount + 1
            }
          : s
      )
    );

    setAuditLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Coupon Created',
        details: `Created coupon "${newCouponData.code}" for ${newCouponData.storeName}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        adminEmail: currentUser?.email || 'Super Admin'
      },
      ...prev
    ]);

    showToast({
      type: 'success',
      title: 'Coupon Created',
      message: `Added ${newCouponData.code} to ${newCouponData.storeName}.`
    });
  };

  const editCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    showToast({
      type: 'success',
      title: 'Coupon Updated',
      message: 'Changes saved successfully.'
    });
  };

  const deleteCoupon = (id: string) => {
    const c = coupons.find(x => x.id === id);
    setCoupons(prev => prev.filter(x => x.id !== id));
    if (c) {
      setStores(prev =>
        prev.map(st =>
          st.id === c.storeId
            ? {
                ...st,
                verifiedCodesCount: Math.max(0, st.verifiedCodesCount - (c.isVerified ? 1 : 0)),
                totalCodesCount: Math.max(0, st.totalCodesCount - 1)
              }
            : st
        )
      );
      setAuditLogs(prev => [
        {
          id: 'log-' + Date.now(),
          action: 'Coupon Deleted',
          details: `Deleted coupon "${c.code}" from ${c.storeName}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          adminEmail: currentUser?.email || 'Super Admin'
        },
        ...prev
      ]);
    }
    showToast({
      type: 'info',
      title: 'Coupon Removed',
      message: 'Coupon removed from store.'
    });
  };

  const toggleVerifyCoupon = (id: string) => {
    setCoupons(prev =>
      prev.map(c => {
        if (c.id === id) {
          const newStatus = !c.isVerified;
          return {
            ...c,
            isVerified: newStatus,
            healthScore: newStatus ? 98 : 65,
            healthStatus: newStatus ? 'green' : 'yellow'
          };
        }
        return c;
      })
    );
  };

  const voteCoupon = (couponId: string, isYes: boolean) => {
    const currentVote = userVotes[couponId];

    // Toggle if clicking same
    if ((isYes && currentVote === 'yes') || (!isYes && currentVote === 'no')) {
      const nextVotes = { ...userVotes };
      delete nextVotes[couponId];
      setUserVotes(nextVotes);
      return;
    }

    const nextVotes = { ...userVotes, [couponId]: isYes ? ('yes' as const) : ('no' as const) };
    setUserVotes(nextVotes);

    setCoupons(prev =>
      prev.map(c => {
        if (c.id === couponId) {
          const newScore = isYes
            ? Math.min(100, c.healthScore + 2)
            : Math.max(40, c.healthScore - 5);
          return {
            ...c,
            healthScore: newScore,
            upvotes: (c.upvotes || 24) + (isYes ? 1 : 0),
            downvotes: (c.downvotes || 1) + (!isYes ? 1 : 0),
            totalUses: c.totalUses + 1
          };
        }
        return c;
      })
    );

    showToast({
      type: 'success',
      title: isYes ? 'Marked as Working!' : 'Feedback Recorded',
      message: isYes ? 'Thank you for helping fellow shoppers!' : 'Feedback noted for verification.'
    });
  };

  // Store CRUD
  const addStore = (newStoreData: Omit<Store, 'id' | 'verifiedCodesCount' | 'totalCodesCount' | 'proTips' | 'monthlyTrends'>) => {
    const id = newStoreData.slug.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const store: Store = {
      ...newStoreData,
      id,
      verifiedCodesCount: 0,
      totalCodesCount: 0,
      proTips: [],
      monthlyTrends: [
        { month: 'Sep', codes: 5, discount: '20%' },
        { month: 'Oct', codes: 8, discount: '25%' },
        { month: 'Nov', codes: 12, discount: '40%' }
      ]
    };
    setStores(prev => [store, ...prev]);
    showToast({
      type: 'success',
      title: 'Store Added',
      message: `"${newStoreData.name}" has been added.`
    });
  };

  const editStore = (id: string, updates: Partial<Store>) => {
    setStores(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    showToast({
      type: 'success',
      title: 'Store Updated',
      message: 'Store changes saved successfully.'
    });
  };

  const deleteStore = (id: string) => {
    const store = stores.find(s => s.id === id);
    setStores(prev => prev.filter(s => s.id !== id));
    setCoupons(prev => prev.filter(c => c.storeId !== id));
    if (store) {
      setAuditLogs(prev => [
        {
          id: 'log-' + Date.now(),
          action: 'Store Deleted',
          details: `Deleted store "${store.name}".`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          adminEmail: currentUser?.email || 'Super Admin'
        },
        ...prev
      ]);
    }
    showToast({
      type: 'info',
      title: 'Store Deleted',
      message: 'Store and all associated coupons removed.'
    });
  };

  const openRevealModal = (coupon: Coupon) => {
    setRevealModalCoupon(coupon);
  };

  const closeRevealModal = () => {
    setRevealModalCoupon(null);
  };

  const openSubmitModal = (storeId?: string) => {
    setSubmitModalDefaultStoreId(storeId || null);
    setIsSubmitModalOpen(true);
  };

  const closeSubmitModal = () => {
    setIsSubmitModalOpen(false);
    setSubmitModalDefaultStoreId(null);
  };

  const resetToDefaultData = () => {
    localStorage.removeItem('ccs_stores_v3');
    localStorage.removeItem('ccs_coupons_v3');
    localStorage.removeItem('ccs_submissions_v3');
    localStorage.removeItem('ccs_store_requests_v3');
    localStorage.removeItem('ccs_store_owners_v3');
    localStorage.removeItem('ccs_admin_users_v3');
    localStorage.removeItem('ccs_audit_v3');
    localStorage.removeItem('ccs_sent_emails_v3');
    localStorage.removeItem('ccs_user_votes_v3');

    setStores(INITIAL_STORES);
    setCoupons(INITIAL_COUPONS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setStoreRequests([]);
    setStoreOwners([]);
    setAdminUsers([
      {
        id: 'adm-super',
        name: 'Super Admin',
        email: SUPER_ADMIN_EMAIL,
        role: 'super_admin',
        addedAt: 'System Root'
      }
    ]);
    setAuditLogs([
      {
        id: 'log-1',
        action: 'System Reset',
        details: 'Reset back to default seed data.',
        timestamp: 'Just now',
        adminEmail: 'System Security'
      }
    ]);

    showToast({
      type: 'info',
      title: 'Data Reset',
      message: 'Reset back to default seed data.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        stores,
        coupons,
        submissions,
        liveFeed,
        auditLogs,
        storeRequests,
        storeOwners,
        adminUsers,
        sentEmails,
        selectedStoreSlug,
        setSelectedStoreSlug,
        selectedStore,

        currentUser,
        isAdmin,
        isSuperAdmin,
        isStoreOwner,
        loggedInStore,
        adminLogin,
        storeOwnerLogin,
        logout,

        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        isStoreRequestModalOpen,
        setIsStoreRequestModalOpen,
        isStoreOwnerDashboardOpen,
        setIsStoreOwnerDashboardOpen,

        submitStoreRequest,
        approveStoreRequest,
        rejectStoreRequest,
        addSubAdmin,
        deleteSubAdmin,

        addCoupon,
        editCoupon,
        deleteCoupon,
        toggleVerifyCoupon,
        voteCoupon,
        userVotes,

        addStore,
        editStore,
        deleteStore,

        submitUserCoupon,
        approveSubmission,
        rejectSubmission,

        revealModalCoupon,
        openRevealModal,
        closeRevealModal,

        isSubmitModalOpen,
        submitModalDefaultStoreId,
        openSubmitModal,
        closeSubmitModal,

        isSearchModalOpen,
        setIsSearchModalOpen,

        screenshotViewer,
        openScreenshotModal,
        closeScreenshotModal,

        voteProTip,

        toasts,
        showToast,
        dismissToast,

        resetToDefaultData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
