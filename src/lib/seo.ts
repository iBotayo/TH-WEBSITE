/**
 * SEO & Structured Data Helpers
 * 
 * Implements Organization and LocalBusiness JSON-LD structured data
 * and common metadata configurations.
 */

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'ThinkingHead Nigeria Limited',
  alternateName: 'ThinkingHead',
  legalName: 'ThinkingHead Nigeria Limited',
  taxID: 'RC 8611016',
  url: 'https://thinkinghead.ng',
  logo: 'https://thinkinghead.ng/assets/brand/logo.svg',
  description:
    'AI-powered research, strategy and engineering firm headquartered in Kaduna, Nigeria.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5 Pipeline Road, Bayan Dutse',
    addressLocality: 'Kaduna',
    addressCountry: 'NG',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+234-706-834-9172',
    contactType: 'customer service',
    email: 'hello@thinkinghead.ng',
    areaServed: ['NG', 'Africa'],
    availableLanguage: ['English'],
  },
  founders: [
    {
      '@type': 'Person',
      name: 'Benjamin I. Shekari',
      jobTitle: 'Founder & Chief Executive Officer',
    },
    {
      '@type': 'Person',
      name: 'Ayodeji Olaniyan',
      jobTitle: 'Chief Technology Officer',
    },
  ],
};
