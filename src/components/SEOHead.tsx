import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const SEOHead: React.FC = () => {
  const { selectedStore, coupons } = useApp();

  useEffect(() => {
    const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    let title = 'couponscode.store – 100% Verified Coupon Codes & Deals';
    let description =
      'Find 100% verified coupon codes, store discounts, bank card sales, and Golootlo deals at couponscode.store.';
    let schemaJson: any = null;

    if (selectedStore) {
      const storeCoupons = coupons.filter(c => c.storeId === selectedStore.id);
      title = `${selectedStore.name} Promo Codes & Verified Vouchers (${currentMonthYear}) – couponscode.store`;
      description = `Save at ${selectedStore.name} with ${storeCoupons.length}+ verified promo codes and discounts for ${currentMonthYear}. Verified by real community checkout receipts.`;

      // Rich Schema.org markup for Store Page
      schemaJson = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Store',
            '@id': `https://couponscode.store/#store-${selectedStore.slug}`,
            name: selectedStore.name,
            url: selectedStore.affiliateUrl,
            image: selectedStore.logo,
            description: selectedStore.description,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: selectedStore.rating.toString(),
              reviewCount: selectedStore.totalRatings.toString(),
              bestRating: '5',
              worstRating: '1'
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://couponscode.store/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: selectedStore.category,
                item: `https://couponscode.store/#category/${selectedStore.category}`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: selectedStore.name,
                item: `https://couponscode.store/#store/${selectedStore.slug}`
              }
            ]
          },
          {
            '@type': 'ItemList',
            name: `${selectedStore.name} Verified Promo Codes`,
            numberOfItems: storeCoupons.length,
            itemListElement: storeCoupons.slice(0, 10).map((c, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: c.title,
              description: c.description
            }))
          }
        ]
      };
    } else {
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'couponscode.store',
        url: 'https://couponscode.store',
        applicationCategory: 'ShoppingApplication',
        operatingSystem: 'All',
        description: 'The real-time coupon code and bank card discount verification engine.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      };
    }

    // Set document title
    document.title = title;

    // Set Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Set OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    // Set OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Inject Schema.org JSON-LD script
    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaJson);
  }, [selectedStore, coupons]);

  return null;
};
