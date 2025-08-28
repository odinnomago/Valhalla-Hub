'use client';

import React from 'react';
import SmartNewsletterCapture from './SmartNewsletterCapture';

interface NewsletterProviderProps {
  children: React.ReactNode;
  contentCategory?: string;
  authorName?: string;
  disabled?: boolean;
}

const NewsletterProvider: React.FC<NewsletterProviderProps> = ({
  children,
  contentCategory,
  authorName,
  disabled = false
}) => {
  return (
    <>
      {children}
      {!disabled && (
        <SmartNewsletterCapture
          contentCategory={contentCategory}
          authorName={authorName}
        />
      )}
    </>
  );
};

export default NewsletterProvider;