import { Store, Coupon, CouponSubmission, Category, LiveFeedEvent, BankCardDeal } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'food-restaurants',
    name: 'Food, Dining & Eatables',
    slug: 'food-restaurants',
    icon: 'Utensils',
    merchantsCount: '44,387 merchants',
    subcategories: ['Fast Food & Burgers', 'Pizza & Italian', 'BBQ & Desi', 'Cafes & Coffee', 'Bakeries', 'Golootlo Food Deals']
  },
  {
    id: 'hotels-travel',
    name: 'Hotels & Tourism Pakistan',
    slug: 'hotels-travel',
    icon: 'Hotel',
    merchantsCount: '16,733 merchants',
    subcategories: ['Luxury Hotels', 'Resorts & Stays', 'Northern Areas Tourism', 'Flights & Air Tickets', 'Boutique Hotels']
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    icon: 'Shirt',
    merchantsCount: '106,789 merchants',
    subcategories: ['Lawn & Unstitched', 'Pret & Ready-to-Wear', 'Streetwear & Denim', 'Footwear', 'Festive & Bridal']
  },
  {
    id: 'devices',
    name: 'Electronics & Mobiles',
    slug: 'devices',
    icon: 'Laptop',
    merchantsCount: '25,624 merchants',
    subcategories: ['Smartphones', 'Wireless Earbuds', 'Laptops & Gadgets', 'Home Appliances', 'Accessories']
  },
  {
    id: 'software',
    name: 'Software & Business Printing',
    slug: 'software',
    icon: 'Code',
    merchantsCount: '46,438 merchants',
    subcategories: ['Custom Printing', 'Business Cards', 'Marketing Solutions', 'Digital Services']
  },
  {
    id: 'home-garden',
    name: 'Groceries & Home',
    slug: 'home-garden',
    icon: 'Home',
    merchantsCount: '88,243 merchants',
    subcategories: ['Online Supermarkets', 'Home Decor', 'Kitchenware', 'Pantry & Essentials']
  }
];

export const INITIAL_STORES: Store[] = [
  // --- EATABLES & RESTAURANTS ---
  {
    id: 'kfc-pk',
    name: 'KFC Pakistan',
    slug: 'kfc.com.pk',
    domain: 'www.kfcpakistan.com',
    logo: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.9,
    totalRatings: 3420,
    verifiedCodesCount: 14,
    totalCodesCount: 180,
    health: 99,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's favorite crispy fried chicken chain, offering Zinger burgers, bucket feasts, twisters, and mid-week midnight deals.",
    savingsIntel: 'KFC app offers exclusive midnight secret codes and Monday/Wednesday wing buckets up to 40% off. Stack with HBL and Golootlo app deals.',
    topDeal: 'Flat 25% OFF',
    affiliateUrl: 'https://www.kfcpakistan.com',
    policies: {
      freeShipping: 'Free delivery on orders above Rs. 1,500 via KFC app',
      paymentOptions: ['Cash on Delivery', 'Credit/Debit Card', 'JazzCash', 'EasyPaisa'],
      dineInOrDelivery: 'Valid for Delivery, Dine-in & Takeaway across 150+ outlets'
    },
    proTips: [
      {
        id: 'pt-kfc-1',
        user: 'ZingerLoverPK',
        text: 'Order through the KFC app on Wednesdays for BOGO on Zinger burgers and use HBL card for extra 15% discount.',
        upvotes: 84,
        downvotes: 2,
        date: '1 day ago',
        commentsCount: 6
      }
    ],
    competitors: [
      {
        id: 'comp-kfc-1',
        storeName: 'Cheezious',
        storeSlug: 'cheezious.com',
        logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&auto=format&fit=crop&q=80',
        title: 'Crown Crust & Roll Platter',
        code: 'CHEEZY20',
        discount: '20% OFF'
      }
    ],
    bankDeals: [
      {
        id: 'bd-kfc-1',
        storeId: 'kfc-pk',
        storeName: 'KFC Pakistan',
        bankName: 'Golootlo',
        title: 'Golootlo Exclusive: Flat 20% OFF on Dine-In & Takeaway',
        discount: '20% OFF',
        daysValid: 'Valid Daily',
        cardType: 'golootlo',
        badge: 'Golootlo App',
        howToRedeem: 'Open the Golootlo mobile app, search KFC, scan the Golootlo QR code at the ordering counter before invoice generation to get 20% off immediately.',
        code: 'GOLOOTLOKFC',
        isVerified: true
      },
      {
        id: 'bd-kfc-2',
        storeId: 'kfc-pk',
        storeName: 'KFC Pakistan',
        bankName: 'HBL (Habib Bank Limited)',
        title: 'HBL Card Promo: 20% OFF Every Wednesday',
        discount: '20% OFF',
        daysValid: 'Every Wednesday',
        minSpend: 'Rs. 1,200',
        cardType: 'debit_credit',
        badge: 'HBL Card Deal',
        howToRedeem: 'Swipe or pay online with your HBL Debit or Credit Card on Wednesdays to receive instant 20% discount on entire bill.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 12, discount: '20%' },
      { month: 'Jul', codes: 14, discount: '25%' },
      { month: 'Aug', codes: 16, discount: '30%' },
      { month: 'Sep', codes: 15, discount: '25%' },
      { month: 'Oct', codes: 18, discount: '35%' },
      { month: 'Nov', codes: 22, discount: '40%' }
    ],
    faqs: [
      {
        q: 'How to use KFC Pakistan promo codes online?',
        a: 'Enter your delivery address on kfcpakistan.com, add meals to your cart, click "Apply Promo Code" in your cart summary, and paste the code from couponscode.store.'
      },
      {
        q: 'Can I use Golootlo at KFC drive-thru or counter?',
        a: 'Yes, ask the cashier for the Golootlo QR code, scan via Golootlo app on your smartphone, and the 20% discount will be applied directly to your POS bill.'
      }
    ]
  },
  {
    id: 'cheezious',
    name: 'Cheezious Pakistan',
    slug: 'cheezious.com',
    domain: 'www.cheezious.com',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.9,
    totalRatings: 4210,
    verifiedCodesCount: 10,
    totalCodesCount: 92,
    health: 98,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's fastest-growing fast-food sensation famous for Crown Crust Pizza, Cheezy Bihari Rolls, and Bheta platter deals.",
    savingsIntel: 'Cheezious flash midnight discount codes give flat Rs. 300 off on large pizza orders placed after 11 PM.',
    topDeal: 'Rs. 300 OFF',
    affiliateUrl: 'https://www.cheezious.com',
    policies: {
      freeShipping: 'Fast hot delivery across Rawalpindi, Islamabad, Lahore, and Peshawar',
      paymentOptions: ['Cash on Delivery', 'Credit Card', 'EasyPaisa']
    },
    proTips: [
      {
        id: 'pt-chz-1',
        user: 'CheezyFanatic',
        text: 'The Crown Crust combo with roll platter gives the highest food-to-price ratio in Pakistan.',
        upvotes: 95,
        downvotes: 1,
        date: '2 days ago',
        commentsCount: 8
      }
    ],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-chz-1',
        storeId: 'cheezious',
        storeName: 'Cheezious Pakistan',
        bankName: 'Meezan Bank & PayPak',
        title: 'Meezan & PayPak Cards: 15% OFF on Online Deliveries',
        discount: '15% OFF',
        daysValid: 'Fridays & Saturdays',
        minSpend: 'Rs. 1,500',
        cardType: 'debit_credit',
        badge: 'Weekend Meal',
        howToRedeem: 'Select Card on Delivery or online prepayment with Meezan or PayPak card on the Cheezious official website.',
        code: 'CHEEZYMEEZAN',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 8, discount: '15%' },
      { month: 'Jul', codes: 9, discount: '20%' },
      { month: 'Aug', codes: 10, discount: '20%' },
      { month: 'Sep', codes: 8, discount: '15%' },
      { month: 'Oct', codes: 11, discount: '25%' },
      { month: 'Nov', codes: 14, discount: '30%' }
    ]
  },
  {
    id: 'mcdonalds-pk',
    name: "McDonald's Pakistan",
    slug: 'mcdonalds.com.pk',
    domain: 'www.mcdonalds.com.pk',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.8,
    totalRatings: 5120,
    verifiedCodesCount: 8,
    totalCodesCount: 110,
    health: 97,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Golden arches in Pakistan serving Big Mac, Spicy McCrispy, McFlurry, and McCafé beverages.',
    savingsIntel: 'Use the official McDonald’s app rewards points or bank card partnership days for extra free fries and burger upgrades.',
    topDeal: 'Free Burger Upgrade',
    affiliateUrl: 'https://www.mcdonalds.com.pk',
    policies: {
      freeShipping: 'Delivery available on McDelivery app with promo codes',
      paymentOptions: ['Credit/Debit Cards', 'Cash on Delivery']
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-mcd-1',
        storeId: 'mcdonalds-pk',
        storeName: "McDonald's Pakistan",
        bankName: 'Bank Alfalah',
        title: 'Alfalah Cards: Flat 15% OFF on McDelivery',
        discount: '15% OFF',
        daysValid: 'Tuesdays & Thursdays',
        minSpend: 'Rs. 1,000',
        cardType: 'debit_credit',
        badge: 'Card Discount',
        howToRedeem: 'Pay through Bank Alfalah Credit or Debit Card via McDelivery app or web to get instant discount.',
        code: 'ALFAMC',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 7, discount: '15%' },
      { month: 'Jul', codes: 8, discount: '20%' },
      { month: 'Aug', codes: 9, discount: '20%' },
      { month: 'Sep', codes: 7, discount: '15%' },
      { month: 'Oct', codes: 10, discount: '25%' },
      { month: 'Nov', codes: 12, discount: '30%' }
    ]
  },
  {
    id: 'broadway-pizza',
    name: 'Broadway Pizza',
    slug: 'broadwaypizza.com.pk',
    domain: 'broadwaypizza.com.pk',
    logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.8,
    totalRatings: 1890,
    verifiedCodesCount: 9,
    totalCodesCount: 78,
    health: 98,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Renowned for giant slices, stuffed crust pizzas, molten lava cakes, and regular BOGO promotional deals across Pakistan.',
    savingsIntel: 'Broadway Pizza runs buy-1-get-1-free offers on all medium and large pizzas every Tuesday and Thursday with Golootlo.',
    topDeal: 'Buy 1 Get 1 FREE',
    affiliateUrl: 'https://broadwaypizza.com.pk',
    policies: {
      freeShipping: 'Free delivery within 30-40 minutes',
      paymentOptions: ['Online Card', 'Cash on Delivery', 'EasyPaisa']
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-bwp-1',
        storeId: 'broadway-pizza',
        storeName: 'Broadway Pizza',
        bankName: 'Golootlo',
        title: 'Golootlo BOGO: Buy 1 Large Pizza, Get 1 FREE',
        discount: 'Buy 1 Get 1 FREE',
        daysValid: 'Tuesdays & Thursdays',
        cardType: 'golootlo',
        badge: 'Golootlo BOGO',
        howToRedeem: 'Open Golootlo app, grab the Broadway Pizza BOGO promo coupon, and mention code to phone operator or paste at checkout.',
        code: 'GOLOOTLOBOGO',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 8, discount: 'BOGO' },
      { month: 'Jul', codes: 9, discount: 'BOGO' },
      { month: 'Aug', codes: 9, discount: 'BOGO' },
      { month: 'Sep', codes: 8, discount: 'BOGO' },
      { month: 'Oct', codes: 11, discount: 'BOGO' },
      { month: 'Nov', codes: 13, discount: 'BOGO' }
    ]
  },
  {
    id: 'optp',
    name: 'OPTP (One Potato Two Potato)',
    slug: 'optp.biz',
    domain: 'www.optp.biz',
    logo: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.7,
    totalRatings: 1420,
    verifiedCodesCount: 7,
    totalCodesCount: 65,
    health: 96,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Pioneers of natural Belgian-style fries in Pakistan with signature spicy garlic mayo sauces, smashed burgers, and wings.',
    savingsIntel: 'Exclusive 20% discount on entire menu when scanning Golootlo QR code at any OPTP mall or high street branch.',
    topDeal: '20% OFF with Golootlo',
    affiliateUrl: 'https://www.optp.biz',
    policies: {
      dineInOrDelivery: 'Available across all branches in Karachi, Lahore, Islamabad, Multan, Rawalpindi'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-optp-1',
        storeId: 'optp',
        storeName: 'OPTP',
        bankName: 'Golootlo',
        title: 'Golootlo App Deal: Flat 20% OFF on All OPTP Meals',
        discount: '20% OFF',
        daysValid: 'Valid Daily',
        cardType: 'golootlo',
        badge: 'Golootlo QR',
        howToRedeem: 'Inform cashier before placing order that you will pay with Golootlo discount. Scan the counter QR code in the Golootlo app.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 6, discount: '20%' },
      { month: 'Jul', codes: 7, discount: '20%' },
      { month: 'Aug', codes: 8, discount: '25%' },
      { month: 'Sep', codes: 7, discount: '20%' },
      { month: 'Oct', codes: 9, discount: '25%' },
      { month: 'Nov', codes: 10, discount: '30%' }
    ]
  },
  {
    id: 'kababjees',
    name: 'Kababjees & Fried Chicken',
    slug: 'kababjees.com',
    domain: 'www.kababjees.com',
    logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.9,
    totalRatings: 2890,
    verifiedCodesCount: 8,
    totalCodesCount: 74,
    health: 99,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Karachi and Lahore premier dining for live charcoal BBQ, Makhni handi, Kababjees Fried Chicken, and bakery cakes.',
    savingsIntel: 'HBL, Meezan, and Bank of Punjab cardholders enjoy 15%-20% discount on dine-in and takeaways.',
    topDeal: '20% OFF on Cards',
    affiliateUrl: 'https://www.kababjees.com',
    policies: {
      dineInOrDelivery: 'Dine-in seaside & highway branches, plus online delivery'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-kbj-1',
        storeId: 'kababjees',
        storeName: 'Kababjees',
        bankName: 'HBL & Meezan Bank',
        title: 'HBL & Meezan: 15% OFF on Dine-in & Online Delivery',
        discount: '15% OFF',
        daysValid: 'Tuesday to Thursday',
        minSpend: 'Rs. 2,000',
        cardType: 'debit_credit',
        badge: 'Dining Special',
        howToRedeem: 'Pay with HBL or Meezan debit/credit card at table or select card payment on Kababjees website.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 6, discount: '15%' },
      { month: 'Jul', codes: 7, discount: '15%' },
      { month: 'Aug', codes: 8, discount: '20%' },
      { month: 'Sep', codes: 7, discount: '15%' },
      { month: 'Oct', codes: 9, discount: '20%' },
      { month: 'Nov', codes: 11, discount: '25%' }
    ]
  },
  {
    id: 'monal',
    name: 'The Monal Restaurant',
    slug: 'themonal.com',
    domain: 'www.themonal.com',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.9,
    totalRatings: 6310,
    verifiedCodesCount: 5,
    totalCodesCount: 42,
    health: 99,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's iconic dining experience with breathtaking panoramic mountain views, royal buffet, and authentic Pakistani cuisines.",
    savingsIntel: 'Bank Alfalah and Standard Chartered offer 15% discount on Monal buffet and à la carte bills.',
    topDeal: '15% OFF on Banking Cards',
    affiliateUrl: 'https://www.themonal.com',
    policies: {
      dineInOrDelivery: 'Reservations recommended for outdoor terrace seating'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-mon-1',
        storeId: 'monal',
        storeName: 'The Monal Restaurant',
        bankName: 'Bank Alfalah & SCB',
        title: 'Alfalah & SCB Credit Cards: 15% OFF on Dining',
        discount: '15% OFF',
        daysValid: 'Monday to Thursday',
        minSpend: 'Rs. 3,500',
        cardType: 'debit_credit',
        badge: 'Fine Dining',
        howToRedeem: 'Present your Bank Alfalah or Standard Chartered credit card at the time of settlement before paying.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 4, discount: '15%' },
      { month: 'Jul', codes: 5, discount: '15%' },
      { month: 'Aug', codes: 5, discount: '15%' },
      { month: 'Sep', codes: 4, discount: '15%' },
      { month: 'Oct', codes: 6, discount: '20%' },
      { month: 'Nov', codes: 7, discount: '20%' }
    ]
  },

  // --- FAMOUS HOTELS & TOURISM IN PAKISTAN ---
  {
    id: 'pc-hotels',
    name: 'Pearl Continental (PC Hotels)',
    slug: 'pchotels.com',
    domain: 'www.pchotels.com',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop&q=80',
    category: 'hotels-travel',
    rating: 4.9,
    totalRatings: 3120,
    verifiedCodesCount: 11,
    totalCodesCount: 86,
    health: 98,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's premier 5-star hotel chain located across Lahore, Karachi, Rawalpindi, Bhurban, Muzaffarabad, Gwadar, and Malam Jabba.",
    savingsIntel: 'Direct online room bookings with promo codes save 20% on suites and executive rooms. Partner banks (HBL Prestige, Meezan) get up to 25% off.',
    topDeal: '25% OFF Room Stays',
    affiliateUrl: 'https://www.pchotels.com',
    policies: {
      returnPolicy: 'Free cancellation up to 24 hours before check-in',
      paymentOptions: ['All major bank cards', 'PayPak', 'UnionPay']
    },
    proTips: [
      {
        id: 'pt-pc-1',
        user: 'TravelerSaad',
        text: 'Join the PC Privilege Club for free on your first booking to receive complimentary high tea and 15% dining discounts.',
        upvotes: 42,
        downvotes: 0,
        date: '3 days ago',
        commentsCount: 2
      }
    ],
    competitors: [
      {
        id: 'comp-pc-1',
        storeName: 'Serena Hotels',
        storeSlug: 'serenahotels.com',
        logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=120&auto=format&fit=crop&q=80',
        title: 'Serena Luxury Stays',
        code: 'SERENA20',
        discount: '20% OFF'
      }
    ],
    bankDeals: [
      {
        id: 'bd-pc-1',
        storeId: 'pc-hotels',
        storeName: 'Pearl Continental (PC Hotels)',
        bankName: 'HBL Prestige & Platinum',
        title: 'HBL Cards: 25% OFF on Room Bookings & 15% OFF Buffets',
        discount: '25% OFF',
        daysValid: 'Valid Year Round',
        cardType: 'debit_credit',
        badge: '5-Star Luxury Deal',
        howToRedeem: 'Book on pchotels.com using your HBL Platinum/Prestige card with promo code HBLPC25 or present card at reception desk.',
        code: 'HBLPC25',
        isVerified: true
      },
      {
        id: 'bd-pc-2',
        storeId: 'pc-hotels',
        storeName: 'Pearl Continental (PC Hotels)',
        bankName: 'Meezan Bank Visa Platinum',
        title: 'Meezan Bank: Flat 20% OFF on Weekend Stays',
        discount: '20% OFF',
        daysValid: 'Friday to Sunday',
        cardType: 'debit_credit',
        badge: 'Islamic Card Deal',
        howToRedeem: 'Select Meezan Bank Card at booking checkout to enjoy 20% room discount.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 8, discount: '20%' },
      { month: 'Jul', codes: 10, discount: '25%' },
      { month: 'Aug', codes: 11, discount: '25%' },
      { month: 'Sep', codes: 9, discount: '20%' },
      { month: 'Oct', codes: 12, discount: '30%' },
      { month: 'Nov', codes: 15, discount: '35%' }
    ],
    faqs: [
      {
        q: 'How to get maximum discount on PC Hotel rooms?',
        a: 'Book directly through pchotels.com with our verified codes and pay using an HBL, Meezan, or Bank Alfalah credit/debit card for combined discounts up to 25% off.'
      }
    ]
  },
  {
    id: 'serena-hotels',
    name: 'Serena Hotels Pakistan',
    slug: 'serenahotels.com',
    domain: 'www.serenahotels.com',
    logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=120&auto=format&fit=crop&q=80',
    category: 'hotels-travel',
    rating: 5.0,
    totalRatings: 2840,
    verifiedCodesCount: 8,
    totalCodesCount: 54,
    health: 99,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Iconic heritage 5-star properties in Islamabad, Faisalabad, Quetta, Hunza (Karakoram Serena), and Swat Serena Hotel.',
    savingsIntel: 'Advance 14-day booking offers 20% discount on boutique northern Pakistan heritage suites.',
    topDeal: '20% OFF Advance Booking',
    affiliateUrl: 'https://www.serenahotels.com',
    policies: {
      returnPolicy: 'Complimentary airport shuttle and flexible cancellation'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-ser-1',
        storeId: 'serena-hotels',
        storeName: 'Serena Hotels Pakistan',
        bankName: 'Standard Chartered & Bank Alfalah',
        title: 'Priority Cards: 20% OFF Stays & Spa Services',
        discount: '20% OFF',
        daysValid: 'Valid Daily',
        cardType: 'debit_credit',
        badge: 'Heritage Stays',
        howToRedeem: 'Apply code SCBSERENA when making web reservations at serenahotels.com.',
        code: 'SCBSERENA',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 6, discount: '15%' },
      { month: 'Jul', codes: 7, discount: '20%' },
      { month: 'Aug', codes: 8, discount: '20%' },
      { month: 'Sep', codes: 7, discount: '15%' },
      { month: 'Oct', codes: 9, discount: '25%' },
      { month: 'Nov', codes: 11, discount: '30%' }
    ]
  },
  {
    id: 'roomy-pk',
    name: 'Roomy Hotels Pakistan',
    slug: 'roomy.pk',
    domain: 'roomy.pk',
    logo: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=120&auto=format&fit=crop&q=80',
    category: 'hotels-travel',
    rating: 4.8,
    totalRatings: 1720,
    verifiedCodesCount: 9,
    totalCodesCount: 68,
    health: 97,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's favorite tech-enabled boutique hotel chain across Murree, Hunza, Skardu, Naran, Swat, and Islamabad.",
    savingsIntel: 'Get flat 15% - 20% discount on all northern Pakistan mountain resort bookings with promo codes.',
    topDeal: '20% OFF Mountain Resorts',
    affiliateUrl: 'https://roomy.pk',
    policies: {
      returnPolicy: 'Easy web refunds & flexible dates modification'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-rmy-1',
        storeId: 'roomy-pk',
        storeName: 'Roomy Hotels Pakistan',
        bankName: 'SadaPay & NayaPay',
        title: 'SadaPay Digital Checkout: Flat 15% OFF on Room Bookings',
        discount: '15% OFF',
        daysValid: 'Valid Daily',
        cardType: 'wallet',
        badge: 'Fintech Deal',
        howToRedeem: 'Enter promo code SADAROOMY at roomy.pk checkout and pay using your SadaPay card.',
        code: 'SADAROOMY',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 7, discount: '15%' },
      { month: 'Jul', codes: 8, discount: '20%' },
      { month: 'Aug', codes: 9, discount: '20%' },
      { month: 'Sep', codes: 8, discount: '15%' },
      { month: 'Oct', codes: 10, discount: '25%' },
      { month: 'Nov', codes: 12, discount: '30%' }
    ]
  },

  // --- PAKISTANI RETAIL, FASHION & TECH ---
  {
    id: 'daraz',
    name: 'Daraz PK',
    slug: 'daraz.pk',
    domain: 'www.daraz.pk',
    logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.9,
    totalRatings: 1840,
    verifiedCodesCount: 18,
    totalCodesCount: 312,
    health: 98,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's largest shopping platform featuring electronics, groceries, fashion, mobile gadgets, and seasonal mega sales.",
    savingsIntel: 'Daraz runs weekly partner bank discounts (HBL, Meezan, Bank Alfalah, SadaPay) offering extra 10%-20% off cart totals.',
    topDeal: 'Rs. 500 OFF',
    affiliateUrl: 'https://www.daraz.pk',
    policies: {
      freeShipping: 'Free shipping on Daraz Choice & orders over Rs. 2,000',
      internationalShipping: false,
      paymentOptions: ['EasyPaisa', 'JazzCash', 'Debit/Credit Cards', 'Cash on Delivery'],
      clearance: 'Flash Sale with up to 70% off markdowns daily',
      returnPolicy: '14 days hassle-free return with Daraz Express pickup'
    },
    proTips: [
      {
        id: 'pt-daraz-1',
        user: 'PakShopper99',
        text: 'Collect wallet vouchers in the morning before 10 AM PKT during super sales to stack with store discount codes.',
        upvotes: 64,
        downvotes: 2,
        date: 'Yesterday',
        commentsCount: 5
      }
    ],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-daraz-1',
        storeId: 'daraz',
        storeName: 'Daraz PK',
        bankName: 'HBL (Habib Bank Limited)',
        title: 'HBL Wednesdays: Extra 15% OFF on All HBL Cards',
        discount: '15% OFF',
        daysValid: 'Every Wednesday',
        minSpend: 'Rs. 2,500',
        cardType: 'debit_credit',
        badge: 'Weekly Bank Sale',
        howToRedeem: 'Select Credit/Debit Card at checkout on Wednesday, enter your HBL card number, and the 15% discount will be deducted automatically before payment.',
        isVerified: true
      },
      {
        id: 'bd-daraz-2',
        storeId: 'daraz',
        storeName: 'Daraz PK',
        bankName: 'Meezan Bank',
        title: 'Meezan Blessed Fridays: Flat 20% OFF on Debit Cards',
        discount: '20% OFF',
        daysValid: 'Every Friday',
        minSpend: 'Rs. 3,000',
        cardType: 'debit_credit',
        badge: 'Friday Special',
        howToRedeem: 'Shop on Fridays and pay with any Meezan Bank Visa or Mastercard debit card. Discount applies instantly on checkout.',
        code: 'MEEZANFRI',
        isVerified: true
      },
      {
        id: 'bd-daraz-3',
        storeId: 'daraz',
        storeName: 'Daraz PK',
        bankName: 'SadaPay',
        title: 'SadaPay Instant Cashback: Rs. 250 on Daraz Orders',
        discount: 'Rs. 250 Cashback',
        daysValid: 'Valid Daily',
        minSpend: 'Rs. 1,500',
        cardType: 'wallet',
        badge: 'Fintech Wallet',
        howToRedeem: 'Pay via SadaPay Mastercard virtual or physical card. Cashback is credited back into your SadaPay account within 2 hours.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 14, discount: '30%' },
      { month: 'Jul', codes: 18, discount: '35%' },
      { month: 'Aug', codes: 21, discount: '40%' },
      { month: 'Sep', codes: 19, discount: '40%' },
      { month: 'Oct', codes: 25, discount: '50%' },
      { month: 'Nov', codes: 32, discount: '70%' }
    ]
  },
  {
    id: 'foodpanda',
    name: 'Foodpanda',
    slug: 'foodpanda.pk',
    domain: 'www.foodpanda.pk',
    logo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=120&auto=format&fit=crop&q=80',
    category: 'food-restaurants',
    rating: 4.8,
    totalRatings: 940,
    verifiedCodesCount: 12,
    totalCodesCount: 154,
    health: 96,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'On-demand food delivery, Pandamart grocery store, and restaurant takeout across major Pakistani cities.',
    savingsIntel: 'New users get 30% to 50% discount codes plus Free Delivery. Stack with Golootlo and bank card deals for big savings.',
    topDeal: 'Free Delivery',
    affiliateUrl: 'https://www.foodpanda.pk',
    policies: {
      freeShipping: 'Free delivery on Pandapro membership and select top restaurants',
      paymentOptions: ['Cash on Delivery', 'Credit Card', 'EasyPaisa', 'JazzCash']
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-fp-1',
        storeId: 'foodpanda',
        storeName: 'Foodpanda',
        bankName: 'Golootlo',
        title: 'Golootlo Partner Deal: Up to 30% OFF on Top Restaurants',
        discount: '30% OFF',
        daysValid: 'Daily Offer',
        cardType: 'golootlo',
        badge: 'Golootlo Deal',
        howToRedeem: 'Open the Golootlo app, grab your foodpanda voucher code, and paste at checkout.',
        code: 'GOLOOTLOFP',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 10, discount: '40%' },
      { month: 'Jul', codes: 12, discount: '40%' },
      { month: 'Aug', codes: 15, discount: '50%' },
      { month: 'Sep', codes: 11, discount: '35%' },
      { month: 'Oct', codes: 16, discount: '50%' },
      { month: 'Nov', codes: 18, discount: '50%' }
    ]
  },
  {
    id: 'outfitters',
    name: 'Outfitters',
    slug: 'outfitters.com.pk',
    domain: 'outfitters.com.pk',
    logo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.8,
    totalRatings: 320,
    verifiedCodesCount: 8,
    totalCodesCount: 64,
    health: 95,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Youth fast-fashion brand offering streetwear, casual denim, jackets, footwear, and accessories.',
    savingsIntel: 'Mid-season and winter clearance sales slash prices up to 50% with extra 10% coupon codes on online carts.',
    topDeal: '20% OFF',
    affiliateUrl: 'https://outfitters.com.pk',
    policies: {
      freeShipping: 'Free shipping on orders above Rs. 2,500'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-out-1',
        storeId: 'outfitters',
        storeName: 'Outfitters',
        bankName: 'Faysal Bank',
        title: 'Faysal Bank Noor Cards: 15% OFF on Online Purchases',
        discount: '15% OFF',
        daysValid: 'Every Weekend',
        minSpend: 'Rs. 4,000',
        cardType: 'debit_credit',
        badge: 'Islamic Card Deal',
        howToRedeem: 'Pay with Faysal Bank Noor Islamic Credit Card online or swipe at POS in store.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 6, discount: '20%' },
      { month: 'Jul', codes: 7, discount: '25%' },
      { month: 'Aug', codes: 8, discount: '30%' },
      { month: 'Sep', codes: 6, discount: '20%' },
      { month: 'Oct', codes: 9, discount: '40%' },
      { month: 'Nov', codes: 12, discount: '50%' }
    ]
  },
  {
    id: 'khaadi',
    name: 'Khaadi',
    slug: 'pk.khaadi.com',
    domain: 'pk.khaadi.com',
    logo: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.9,
    totalRatings: 512,
    verifiedCodesCount: 6,
    totalCodesCount: 52,
    health: 99,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Iconic Pakistani fashion house famous for woven unstitched fabrics, pret, fragrances, and home accessories.",
    savingsIntel: 'New season launches offer 15% discount for newsletter subscribers and early access codes.',
    topDeal: '15% OFF',
    affiliateUrl: 'https://pk.khaadi.com',
    policies: {
      freeShipping: 'Free domestic delivery above Rs. 3,000'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-khd-1',
        storeId: 'khaadi',
        storeName: 'Khaadi',
        bankName: 'Bank Alfalah',
        title: 'Bank Alfalah Premier: 15% OFF on Ready-to-Wear Online',
        discount: '15% OFF',
        daysValid: 'Tuesday Special',
        minSpend: 'Rs. 5,000',
        cardType: 'debit_credit',
        badge: 'Premier Banking',
        howToRedeem: 'Checkout with Bank Alfalah Platinum or Signature credit card.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 4, discount: '15%' },
      { month: 'Jul', codes: 5, discount: '20%' },
      { month: 'Aug', codes: 6, discount: '25%' },
      { month: 'Sep', codes: 5, discount: '15%' },
      { month: 'Oct', codes: 7, discount: '30%' },
      { month: 'Nov', codes: 10, discount: '40%' }
    ]
  },
  {
    id: 'priceoye',
    name: 'PriceOye',
    slug: 'priceoye.pk',
    domain: 'priceoye.pk',
    logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&auto=format&fit=crop&q=80',
    category: 'devices',
    rating: 4.7,
    totalRatings: 410,
    verifiedCodesCount: 7,
    totalCodesCount: 48,
    health: 94,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Leading electronics marketplace in Pakistan for official warranty smartphones, earbuds, smartwatches, and gadgets.',
    savingsIntel: 'Open-box deals and brand promo codes deliver Rs. 1,000 to Rs. 3,000 instant cart discounts.',
    topDeal: 'Rs. 1,000 OFF',
    affiliateUrl: 'https://priceoye.pk',
    policies: {
      freeShipping: 'Fast insured shipping nationwide'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-po-1',
        storeId: 'priceoye',
        storeName: 'PriceOye',
        bankName: 'Meezan Bank & Faysal',
        title: '0% Markup Installments + Rs. 1,500 Off',
        discount: 'Rs. 1,500 OFF',
        daysValid: 'Valid Daily',
        minSpend: 'Rs. 25,000',
        cardType: 'debit_credit',
        badge: 'Installment Sale',
        howToRedeem: 'Select Installment (EMI) checkout, pick Meezan or Faysal bank tenure.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 5, discount: 'Rs 500' },
      { month: 'Jul', codes: 6, discount: 'Rs 1000' },
      { month: 'Aug', codes: 7, discount: 'Rs 1500' },
      { month: 'Sep', codes: 5, discount: 'Rs 1000' },
      { month: 'Oct', codes: 8, discount: 'Rs 2000' },
      { month: 'Nov', codes: 11, discount: 'Rs 3000' }
    ]
  },
  {
    id: 'junaid-jamshed',
    name: 'J. (Junaid Jamshed)',
    slug: 'junaidjamshed.com',
    domain: 'www.junaidjamshed.com',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.9,
    totalRatings: 1850,
    verifiedCodesCount: 7,
    totalCodesCount: 58,
    health: 98,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "Pakistan's premier traditional clothing, Kurta shalwar, perfumes, and unstitched fabrics with global delivery.",
    savingsIntel: 'J. Gala sales offer flat 25% to 50% discount across fragrances and unstitched fabrics.',
    topDeal: '25% OFF Gala Sale',
    affiliateUrl: 'https://www.junaidjamshed.com',
    policies: {
      freeShipping: 'Free shipping on orders above Rs. 3,500'
    },
    proTips: [],
    competitors: [],
    bankDeals: [
      {
        id: 'bd-jj-1',
        storeId: 'junaid-jamshed',
        storeName: 'J. (Junaid Jamshed)',
        bankName: 'Golootlo',
        title: 'Golootlo In-Store QR: 15% OFF on Fragrances & Kurtas',
        discount: '15% OFF',
        daysValid: 'Valid Daily',
        cardType: 'golootlo',
        badge: 'Golootlo QR',
        howToRedeem: 'Open Golootlo app at any J. outlet counter and scan the official QR standee.',
        isVerified: true
      }
    ],
    monthlyTrends: [
      { month: 'Jun', codes: 5, discount: '20%' },
      { month: 'Jul', codes: 6, discount: '20%' },
      { month: 'Aug', codes: 7, discount: '25%' },
      { month: 'Sep', codes: 6, discount: '20%' },
      { month: 'Oct', codes: 8, discount: '30%' },
      { month: 'Nov', codes: 11, discount: '40%' }
    ]
  },
  {
    id: 'sapphire-pk',
    name: 'Sapphire Pakistan',
    slug: 'sapphireonline.pk',
    domain: 'sapphireonline.pk',
    logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.9,
    totalRatings: 2100,
    verifiedCodesCount: 8,
    totalCodesCount: 62,
    health: 99,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Contemporary high-street fashion, unstitched lawn, ready-to-wear western outfits, and luxury cosmetics.',
    savingsIntel: 'End of season flat 30% and 50% discount sales run in mid-summer and winter.',
    topDeal: 'Flat 30% OFF',
    affiliateUrl: 'https://sapphireonline.pk',
    policies: {
      freeShipping: 'Free shipping above Rs. 2,000'
    },
    proTips: [],
    competitors: [],
    bankDeals: [],
    monthlyTrends: [
      { month: 'Jun', codes: 5, discount: '20%' },
      { month: 'Jul', codes: 6, discount: '25%' },
      { month: 'Aug', codes: 7, discount: '30%' },
      { month: 'Sep', codes: 6, discount: '20%' },
      { month: 'Oct', codes: 8, discount: '30%' },
      { month: 'Nov', codes: 10, discount: '50%' }
    ]
  },
  {
    id: 'gulahmed',
    name: 'Gul Ahmed (Ideas)',
    slug: 'gulahmedshop.com',
    domain: 'www.gulahmedshop.com',
    logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.8,
    totalRatings: 1650,
    verifiedCodesCount: 7,
    totalCodesCount: 55,
    health: 97,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: "One of Pakistan's oldest and most prestigious textile brands offering Ideas Home, apparel, and footwear.",
    savingsIntel: 'Great Winter Sale offers up to 70% off with extra 10% on bank cards.',
    topDeal: 'Up to 70% OFF',
    affiliateUrl: 'https://www.gulahmedshop.com',
    policies: {
      freeShipping: 'Free delivery on orders above Rs. 2,500'
    },
    proTips: [],
    competitors: [],
    bankDeals: [],
    monthlyTrends: [
      { month: 'Jun', codes: 5, discount: '20%' },
      { month: 'Jul', codes: 6, discount: '25%' },
      { month: 'Aug', codes: 7, discount: '30%' },
      { month: 'Sep', codes: 6, discount: '20%' },
      { month: 'Oct', codes: 8, discount: '40%' },
      { month: 'Nov', codes: 11, discount: '70%' }
    ]
  },
  {
    id: 'naheed-pk',
    name: 'Naheed Supermarket',
    slug: 'naheed.pk',
    domain: 'www.naheed.pk',
    logo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=120&auto=format&fit=crop&q=80',
    category: 'home-garden',
    rating: 4.9,
    totalRatings: 1240,
    verifiedCodesCount: 6,
    totalCodesCount: 45,
    health: 98,
    isPopular: true,
    isPakistani: true,
    hasGolootlo: true,
    description: 'Trusted online grocery and department supermarket in Pakistan delivering authentic imported cosmetics, pantry, and baby products.',
    savingsIntel: 'Weekend grocery deals give Rs. 300 to Rs. 500 off on shopping baskets above Rs. 5,000.',
    topDeal: 'Rs. 500 OFF Grocery',
    affiliateUrl: 'https://www.naheed.pk',
    policies: {
      freeShipping: 'Fast same-day delivery in Karachi & express nationwide'
    },
    proTips: [],
    competitors: [],
    bankDeals: [],
    monthlyTrends: [
      { month: 'Jun', codes: 4, discount: 'Rs 300' },
      { month: 'Jul', codes: 5, discount: 'Rs 400' },
      { month: 'Aug', codes: 6, discount: 'Rs 500' },
      { month: 'Sep', codes: 5, discount: 'Rs 300' },
      { month: 'Oct', codes: 7, discount: 'Rs 500' },
      { month: 'Nov', codes: 9, discount: 'Rs 1000' }
    ]
  },
  {
    id: 'nike',
    name: 'Nike',
    slug: 'nike.com',
    domain: 'www.nike.com',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80',
    category: 'fashion',
    rating: 4.9,
    totalRatings: 2840,
    verifiedCodesCount: 16,
    totalCodesCount: 420,
    health: 98,
    description: 'Global athletic footwear, clothing, gym equipment, and iconic lifestyle sneakers.',
    savingsIntel: 'Nike Member pass gives an automatic 20% off sale items and free shipping on all orders.',
    topDeal: '25% OFF',
    affiliateUrl: 'https://www.nike.com',
    isPopular: true,
    policies: {
      freeShipping: 'Free standard shipping for Nike Members'
    },
    proTips: [],
    competitors: [],
    bankDeals: [],
    monthlyTrends: [
      { month: 'Jun', codes: 12, discount: '20%' },
      { month: 'Jul', codes: 14, discount: '25%' },
      { month: 'Aug', codes: 15, discount: '25%' },
      { month: 'Sep', codes: 13, discount: '20%' },
      { month: 'Oct', codes: 16, discount: '30%' },
      { month: 'Nov', codes: 20, discount: '40%' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    slug: 'amazon.com',
    domain: 'www.amazon.com',
    logo: 'https://cdn.knoji.com/images/logo/amazoncom.jpg',
    category: 'devices',
    rating: 4.9,
    totalRatings: 10450,
    verifiedCodesCount: 45,
    totalCodesCount: 1980,
    health: 99,
    description: 'The world’s largest online marketplace with instant Prime delivery, electronics, books, and home essentials.',
    savingsIntel: 'Clip digital coupons on product pages before checkout to get 10% to 40% instant discounts.',
    topDeal: 'Clip 30% Coupon',
    affiliateUrl: 'https://www.amazon.com',
    isPopular: true,
    policies: {
      freeShipping: 'Free shipping on orders over $35 or with Prime'
    },
    proTips: [],
    competitors: [],
    bankDeals: [],
    monthlyTrends: [
      { month: 'Jun', codes: 30, discount: '25%' },
      { month: 'Jul', codes: 45, discount: '50%' },
      { month: 'Aug', codes: 35, discount: '30%' },
      { month: 'Sep', codes: 38, discount: '30%' },
      { month: 'Oct', codes: 42, discount: '40%' },
      { month: 'Nov', codes: 60, discount: '60%' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  // KFC Pakistan
  {
    id: 'kfc-1',
    storeId: 'kfc-pk',
    storeName: 'KFC Pakistan',
    storeSlug: 'kfc.com.pk',
    code: 'KFCSAVE25',
    title: 'Flat 25% OFF on Zinger Combos',
    description: 'Valid on online orders above Rs. 1,000 via KFC Pakistan app & website',
    discount: '25% OFF',
    type: 'site_wide',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 99,
    healthStatus: 'green',
    lastUsed: '10m ago',
    usesToday: 58,
    totalUses: 2340,
    verificationsCount: 142,
    restrictions: ['Valid across delivery and pickup'],
    expiryDate: 'Nov 30, 2026',
    affiliateUrl: 'https://www.kfcpakistan.com',
    verifications: [
      {
        id: 'vkfc-1',
        user: 'FoodieHamza',
        timeAgo: '15m ago',
        date: 'Nov 2, 2026',
        status: 'verified'
      }
    ]
  },
  {
    id: 'kfc-2',
    storeId: 'kfc-pk',
    storeName: 'KFC Pakistan',
    storeSlug: 'kfc.com.pk',
    code: 'FREEWINGS',
    title: 'Free 4-Piece Hot Wings',
    description: 'Complimentary Hot Wings on all cart orders above Rs. 1,500',
    discount: 'FREE WINGS',
    type: 'deal',
    badge: 'Free Food',
    isVerified: true,
    isTopPick: false,
    healthScore: 97,
    healthStatus: 'green',
    lastUsed: '1h ago',
    usesToday: 32,
    totalUses: 1540,
    verificationsCount: 68,
    restrictions: ['One per user'],
    expiryDate: 'Dec 15, 2026',
    affiliateUrl: 'https://www.kfcpakistan.com',
    verifications: []
  },

  // Cheezious Pakistan
  {
    id: 'chz-1',
    storeId: 'cheezious',
    storeName: 'Cheezious Pakistan',
    storeSlug: 'cheezious.com',
    code: 'CHEEZY300',
    title: 'Rs. 300 OFF Crown Crust Pizza',
    description: 'Rs. 300 discount on Large Crown Crust or Stuffed Crust Pizzas',
    discount: 'Rs. 300 OFF',
    type: 'category',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 98,
    healthStatus: 'green',
    lastUsed: '25m ago',
    usesToday: 44,
    totalUses: 1980,
    verificationsCount: 120,
    restrictions: ['Large and Jumbo pizza orders only'],
    expiryDate: 'Nov 28, 2026',
    affiliateUrl: 'https://www.cheezious.com',
    verifications: []
  },

  // PC Hotels
  {
    id: 'pc-1',
    storeId: 'pc-hotels',
    storeName: 'Pearl Continental (PC Hotels)',
    storeSlug: 'pchotels.com',
    code: 'PCSTAY25',
    title: '25% OFF Deluxe & Executive Rooms',
    description: 'Save 25% on luxury 5-star hotel stays in Bhurban, Lahore, Karachi & Malam Jabba',
    discount: '25% OFF',
    type: 'site_wide',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 98,
    healthStatus: 'green',
    lastUsed: '2h ago',
    usesToday: 15,
    totalUses: 680,
    verificationsCount: 52,
    restrictions: ['Online direct reservations at pchotels.com'],
    expiryDate: 'Dec 31, 2026',
    affiliateUrl: 'https://www.pchotels.com',
    verifications: []
  },
  {
    id: 'pc-2',
    storeId: 'pc-hotels',
    storeName: 'Pearl Continental (PC Hotels)',
    storeSlug: 'pchotels.com',
    code: 'PCBESTDINING',
    title: '15% OFF High Tea & Royal Buffet',
    description: 'Valid for Marco Polo, Taipan, and Jason Steak House at all PC properties',
    discount: '15% OFF',
    type: 'category',
    badge: 'Buffet Deal',
    isVerified: true,
    isTopPick: false,
    healthScore: 96,
    healthStatus: 'green',
    lastUsed: '5h ago',
    usesToday: 21,
    totalUses: 910,
    verificationsCount: 44,
    restrictions: ['Advance reservation required'],
    expiryDate: 'Dec 15, 2026',
    affiliateUrl: 'https://www.pchotels.com',
    verifications: []
  },

  // Serena Hotels
  {
    id: 'ser-1',
    storeId: 'serena-hotels',
    storeName: 'Serena Hotels Pakistan',
    storeSlug: 'serenahotels.com',
    code: 'SERENA20',
    title: '20% OFF Heritage Suites & Mountain Resorts',
    description: 'Valid at Islamabad Serena, Hunza Karakoram Serena, and Swat Serena Hotel',
    discount: '20% OFF',
    type: 'site_wide',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 99,
    healthStatus: 'green',
    lastUsed: '3h ago',
    usesToday: 12,
    totalUses: 490,
    verificationsCount: 38,
    restrictions: ['Advance web booking on serenahotels.com'],
    expiryDate: 'Dec 31, 2026',
    affiliateUrl: 'https://www.serenahotels.com',
    verifications: []
  },

  // Roomy Hotels
  {
    id: 'rmy-1',
    storeId: 'roomy-pk',
    storeName: 'Roomy Hotels Pakistan',
    storeSlug: 'roomy.pk',
    code: 'NORTHSTAY20',
    title: '20% OFF Northern Pakistan Hotels',
    description: 'Valid on Roomy Mountain Resort Hunza, Skardu, Naran, and Kalam Swat',
    discount: '20% OFF',
    type: 'site_wide',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 97,
    healthStatus: 'green',
    lastUsed: '1h ago',
    usesToday: 19,
    totalUses: 820,
    verificationsCount: 47,
    restrictions: ['Minimum 2 nights stay on roomy.pk'],
    expiryDate: 'Dec 20, 2026',
    affiliateUrl: 'https://roomy.pk',
    verifications: []
  },

  // Daraz PK
  {
    id: 'daraz-1',
    storeId: 'daraz',
    storeName: 'Daraz PK',
    storeSlug: 'daraz.pk',
    code: 'DARAZSAVE500',
    title: 'Rs. 500 OFF',
    description: 'Rs. 500 OFF on Orders Above Rs. 3,000 on Daraz App & Web',
    discount: 'Rs. 500 OFF',
    type: 'site_wide',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 98,
    healthStatus: 'green',
    lastUsed: '15m ago',
    usesToday: 64,
    totalUses: 2420,
    verificationsCount: 188,
    restrictions: ['Min order value Rs. 3,000', 'Valid across all payment gateways'],
    expiryDate: 'Nov 20, 2026',
    affiliateUrl: 'https://www.daraz.pk',
    verifications: [
      {
        id: 'vd1',
        user: 'PrimeHero8907',
        timeAgo: '15m ago',
        date: 'Nov 2, 2026',
        status: 'verified'
      }
    ]
  },
  {
    id: 'daraz-2',
    storeId: 'daraz',
    storeName: 'Daraz PK',
    storeSlug: 'daraz.pk',
    code: 'WALLET150',
    title: 'Rs. 150 OFF',
    description: 'Rs. 150 OFF your first Daraz Wallet activation & checkout',
    discount: 'Rs. 150 OFF',
    type: 'first_order',
    badge: 'Wallet Exclusive',
    isVerified: true,
    isTopPick: false,
    healthScore: 95,
    healthStatus: 'green',
    lastUsed: '1h ago',
    usesToday: 22,
    totalUses: 1840,
    verificationsCount: 112,
    restrictions: ['New wallet users only'],
    expiryDate: 'Dec 31, 2026',
    affiliateUrl: 'https://www.daraz.pk',
    verifications: []
  },

  // Foodpanda
  {
    id: 'fp-1',
    storeId: 'foodpanda',
    storeName: 'Foodpanda',
    storeSlug: 'foodpanda.pk',
    code: 'PANDAFREE',
    title: 'FREE SHIP',
    description: 'Free Delivery on First 3 Orders on Orders Above Rs. 600',
    discount: 'FREE SHIP',
    type: 'shipping',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 97,
    healthStatus: 'green',
    lastUsed: '10m ago',
    usesToday: 82,
    totalUses: 3410,
    verificationsCount: 198,
    restrictions: ['Valid for new and returning accounts on min Rs. 600 order'],
    expiryDate: 'Nov 30, 2026',
    affiliateUrl: 'https://www.foodpanda.pk',
    verifications: []
  },

  // J. (Junaid Jamshed)
  {
    id: 'jj-1',
    storeId: 'junaid-jamshed',
    storeName: 'J. (Junaid Jamshed)',
    storeSlug: 'junaidjamshed.com',
    code: 'JJPERFUME20',
    title: '20% OFF on Pour Femme & Pour Homme',
    description: 'Flat 20% discount on all luxury perfume lines and body sprays',
    discount: '20% OFF',
    type: 'category',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 98,
    healthStatus: 'green',
    lastUsed: '45m ago',
    usesToday: 27,
    totalUses: 1240,
    verificationsCount: 76,
    restrictions: ['Online checkout only'],
    expiryDate: 'Dec 15, 2026',
    affiliateUrl: 'https://www.junaidjamshed.com',
    verifications: []
  },

  // Vistaprint
  {
    id: 'vp-1',
    storeId: 'vistaprint',
    storeName: 'Vistaprint',
    storeSlug: 'vistaprint.com',
    code: '15WELCOME',
    title: '15% off',
    description: '15% Off Storewide at Vistaprint w/Code',
    discount: '15% off',
    type: 'site_wide',
    badge: 'Top Pick',
    isVerified: true,
    isTopPick: true,
    healthScore: 95,
    healthStatus: 'green',
    lastUsed: '1h ago',
    usesToday: 7,
    totalUses: 799,
    verificationsCount: 105,
    restrictions: ['Works sitewide'],
    expiryDate: 'Nov 30, 2026',
    affiliateUrl: 'https://www.vistaprint.com/',
    verifications: []
  }
];

export const INITIAL_SUBMISSIONS: CouponSubmission[] = [
  {
    id: 'sub-1',
    storeId: 'kfc-pk',
    storeName: 'KFC Pakistan',
    code: 'KFCBOGO2026',
    title: 'KFC Midweek BOGO Zinger',
    description: 'Buy one Zinger burger get one free when scanning Golootlo in-app QR code.',
    discount: 'Buy 1 Get 1 Free',
    type: 'golootlo',
    restrictions: ['Valid on Wednesday nights'],
    submittedBy: 'Kashif_Foodie',
    submittedEmail: 'kashif@gmail.com',
    submittedAt: 'Today, 10:12 AM',
    proofUrl: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=300',
    status: 'pending'
  },
  {
    id: 'sub-2',
    storeId: 'pc-hotels',
    storeName: 'Pearl Continental (PC Hotels)',
    code: 'MEEZANPC20',
    title: '20% OFF PC Malam Jabba Ski Resort',
    description: 'Special winter season discount on luxury chalet bookings.',
    discount: '20% OFF',
    type: 'bank_deal',
    bankName: 'Meezan Bank',
    restrictions: ['Meezan Visa Debit/Credit Card only'],
    submittedBy: 'Sana_Travels',
    submittedEmail: 'sana@travelpak.com',
    submittedAt: 'Today, 09:30 AM',
    status: 'pending'
  },
  {
    id: 'sub-3',
    storeId: 'daraz',
    storeName: 'Daraz PK',
    code: 'HBLMEGA1000',
    title: 'Rs. 1,000 OFF on Daraz Electronics',
    description: 'Valid with HBL credit cards on order value over Rs. 10,000.',
    discount: 'Rs. 1,000 OFF',
    type: 'bank_deal',
    bankName: 'HBL',
    restrictions: ['Min spend Rs. 10,000'],
    submittedBy: 'Bilal_Tech',
    submittedEmail: 'bilal@techpak.com',
    submittedAt: 'Today, 08:45 AM',
    status: 'pending'
  }
];

export const INITIAL_LIVE_FEED: LiveFeedEvent[] = [
  {
    id: 'lf-1',
    merchant: 'KFC Pakistan',
    code: 'KFCSAVE25',
    type: 'verified',
    user: 'FoodieHamza',
    timestamp: 'Just now',
    statusText: 'Verified at checkout: Saved Rs. 420',
    isVerified: true
  },
  {
    id: 'lf-2',
    merchant: 'Pearl Continental',
    code: 'PCSTAY25',
    type: 'verified',
    user: 'TravelerSaad',
    timestamp: '2m ago',
    statusText: 'Bhurban Deluxe Suite booked with 25% Off',
    isVerified: true
  },
  {
    id: 'lf-3',
    merchant: 'Cheezious Pakistan',
    code: 'CHEEZY300',
    type: 'used',
    user: 'CheezyFanatic',
    timestamp: '4m ago',
    statusText: 'Crown Crust order verified',
    isVerified: true
  },
  {
    id: 'lf-4',
    merchant: 'Daraz PK',
    code: 'DARAZSAVE500',
    type: 'verified',
    user: 'PrimeHero8907',
    timestamp: '7m ago',
    statusText: 'Verified checkout voucher',
    isVerified: true
  },
  {
    id: 'lf-5',
    merchant: 'J. (Junaid Jamshed)',
    code: 'JJPERFUME20',
    type: 'submitted',
    user: 'aumentadax20',
    timestamp: '11m ago',
    statusText: 'New fragrance code verified',
    isVerified: true
  },
  {
    id: 'lf-6',
    merchant: 'Roomy Hotels',
    code: 'NORTHSTAY20',
    type: 'verified',
    user: 'HunzaHiker',
    timestamp: '15m ago',
    statusText: 'Hunza mountain lodge booked',
    isVerified: true
  }
];
