export interface CouponVerification {
  id: string;
  user: string;
  avatar?: string;
  timeAgo: string;
  date: string;
  status: 'verified' | 'working' | 'added';
  screenshotUrl?: string;
}

export interface Coupon {
  id: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  type: 'site_wide' | 'category' | 'shipping' | 'first_order' | 'deal' | 'bogo';
  badge?: string;
  isVerified: boolean;
  isTopPick?: boolean;
  healthScore: number;
  healthStatus: 'green' | 'yellow' | 'red';
  lastUsed: string;
  usesToday: number;
  totalUses: number;
  verificationsCount: number;
  restrictions: string[];
  daysLeft?: number;
  expiryDate?: string;
  affiliateUrl: string;
  verifications: CouponVerification[];
  upvotes?: number;
  downvotes?: number;
}

export interface StorePolicy {
  freeShipping?: string;
  internationalShipping?: boolean;
  paymentOptions?: string[];
  returnPolicy?: string;
  dineInOrDelivery?: string;
  clearance?: string;
}

export interface ProTip {
  id: string;
  user: string;
  text: string;
  upvotes: number;
  downvotes: number;
  date: string;
  commentsCount: number;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  domain: string;
  logo: string;
  tint?: string;
  category: 'fashion' | 'food-restaurants' | 'devices' | 'software' | 'hotels-travel' | 'home-garden' | 'health';
  rating: number;
  totalRatings: number;
  verifiedCodesCount: number;
  totalCodesCount: number;
  health: number;
  description: string;
  savingsIntel: string;
  topDeal: string;
  affiliateUrl: string;
  isPopular?: boolean;
  isPakistani?: boolean;
  hasGolootlo?: boolean;
  proTips: ProTip[];
  policies: StorePolicy;
  competitors?: any[];
  bankDeals?: any[];
  monthlyTrends: Array<{ month: string; codes: number; discount: string }>;
  faqs?: Array<{ q: string; a: string }>;
  ownerEmail?: string;
}

export interface StoreRequest {
  id: string;
  storeName: string;
  domain: string;
  category: Store['category'];
  logo: string;
  description: string;
  ownerName: string;
  ownerEmail: string;
  ownerPassword?: string;
  topDeal?: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  rejectionReason?: string;
}

export interface StoreOwnerAccount {
  id: string;
  storeId: string;
  storeName: string;
  ownerName: string;
  email: string;
  password: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'super_admin' | 'editor';
  addedAt: string;
}

export interface CouponSubmission {
  id: string;
  storeId: string;
  storeName: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  type: 'site_wide' | 'category' | 'shipping' | 'first_order' | 'deal' | 'bank_deal' | 'golootlo';
  bankName?: string;
  restrictions: string[];
  submittedBy: string;
  submittedEmail: string;
  submittedAt: string;
  submitterRole?: 'shopper' | 'store_owner';
  proofUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export type BankCardDeal = any;

export interface Category {
  id: string;
  name: string;
  slug: Store['category'];
  icon: string;
  merchantsCount: string;
  subcategories: string[];
}

export interface LiveFeedEvent {
  id: string;
  merchant: string;
  code: string;
  type: 'verified' | 'submitted' | 'used';
  user: string;
  timestamp: string;
  statusText: string;
  isVerified: boolean;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  adminEmail: string;
}
