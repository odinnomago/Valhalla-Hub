import React from 'react';
import Head from 'next/head';

interface SEOComponentProps {
  structuredData?: string;
  breadcrumbData?: string;
  websiteData?: string;
  faqData?: string;
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  canonicalUrl?: string;
  noindex?: boolean;
}

const SEOComponent: React.FC<SEOComponentProps> = ({
  structuredData,
  breadcrumbData,
  websiteData,
  faqData,
  additionalMeta = [],
  canonicalUrl,
  noindex = false
}) => {
  return (
    <>
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbData }}
        />
      )}
      
      {/* Website Structured Data */}
      {websiteData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteData }}
        />
      )}
      
      {/* FAQ Structured Data */}
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqData }}
        />
      )}

      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : { property: meta.property })}
          content={meta.content}
        />
      ))}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* No Index */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#0a0a0a" />
      <meta name="theme-color" content="#00f5ff" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    </>
  );
};

export default SEOComponent;