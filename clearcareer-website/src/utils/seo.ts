export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishDate?: string;
  author?: string;
  noindex?: boolean;
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ClearCareer',
    url: 'https://joinclearcareer.com',
    description: 'Career coaching and job search accelerator helping professionals land roles faster with higher salaries.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://joinclearcareer.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Iskender "Izzy" Piyale-Sheard',
    jobTitle: 'Career Coach',
    url: 'https://joinclearcareer.com/about',
    sameAs: [
      'https://www.linkedin.com/in/izzydoesizzy/',
      'https://github.com/izzydoesizzy',
      'https://izzydoesizzy.com',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'ClearCareer',
      url: 'https://joinclearcareer.com',
    },
    knowsAbout: [
      'Career Coaching',
      'Resume Writing',
      'LinkedIn Optimization',
      'Salary Negotiation',
      'Job Search Strategy',
      'Interview Preparation',
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ClearCareer',
    url: 'https://joinclearcareer.com',
    logo: 'https://joinclearcareer.com/images/logo/clearcareer-logo.png',
    description: 'Career coaching and job search accelerator. 200+ professionals coached, $1.2M+ in collective raises.',
    founder: {
      '@type': 'Person',
      name: 'Iskender "Izzy" Piyale-Sheard',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '8',
      bestRating: '5',
    },
  };
}

export function generateCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Job Search Ignition System',
    description: 'An 8-week done-with-you job search accelerator for senior professionals targeting $100K+ roles. Includes AI-powered career toolkit, resume writing, LinkedIn optimization, and salary negotiation coaching.',
    provider: {
      '@type': 'Organization',
      name: 'ClearCareer',
      url: 'https://joinclearcareer.com',
    },
    instructor: {
      '@type': 'Person',
      name: 'Iskender "Izzy" Piyale-Sheard',
    },
    offers: [
      {
        '@type': 'Offer',
        price: '2997',
        priceCurrency: 'CAD',
        name: 'JSIS Standard',
        availability: 'https://schema.org/LimitedAvailability',
      },
      {
        '@type': 'Offer',
        price: '4997',
        priceCurrency: 'CAD',
        name: 'JSIS VIP',
        availability: 'https://schema.org/LimitedAvailability',
      },
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      duration: 'P8W',
    },
  };
}

export function generateFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishDate: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    image: params.image,
    datePublished: params.publishDate,
    author: {
      '@type': 'Person',
      name: params.author || 'Iskender "Izzy" Piyale-Sheard',
      url: 'https://joinclearcareer.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ClearCareer',
      url: 'https://joinclearcareer.com',
    },
  };
}

export function generateReviewSchema(params: {
  name: string;
  role: string;
  quote: string;
  outcome: string;
}) {
  return {
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: params.name,
      jobTitle: params.role,
    },
    reviewBody: params.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    itemReviewed: {
      '@type': 'Organization',
      name: 'ClearCareer',
    },
  };
}

export function generateWebApplicationSchema(params: {
  name: string;
  description: string;
  url: string;
  category?: string;
  featureList?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.category || 'BusinessApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript',
    ...(params.featureList?.length && { featureList: params.featureList.join(', ') }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'ClearCareer',
      url: 'https://joinclearcareer.com',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
