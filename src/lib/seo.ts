import { Metadata } from 'next';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    slug: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  image: string;
  views: number;
  likes: number;
  featured?: boolean;
  content?: string;
}

export interface Author {
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  location: string;
  joinedAt: string;
  website?: string;
  social?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    github?: string;
    linkedin?: string;
    spotify?: string;
  };
  specialties: string[];
  stats: {
    postsCount: number;
    totalViews: number;
    totalLikes: number;
    followers: number;
  };
}

export class SEOManager {
  private readonly baseUrl = 'https://valhallahub.com.br';
  private readonly siteName = 'Valhalla Hub';
  private readonly defaultImage = '/images/valhalla-hub-og.jpg';
  
  /**
   * Generate metadata for blog homepage
   */
  generateBlogHomeMetadata(): Metadata {
    const title = 'Blog Valhalla Hub | Música, Tecnologia e Inovação';
    const description = 'Descubra as últimas tendências em produção musical, carreira artística e tecnologia musical. Conteúdo especializado para músicos, produtores e profissionais da indústria.';
    
    return {
      title,
      description,
      keywords: [
        'blog música',
        'produção musical',
        'carreira artística',
        'tecnologia musical',
        'indústria musical',
        'valhalla hub',
        'tutorials música',
        'dicas produção',
        'marketing musical'
      ].join(', '),
      authors: [{ name: 'Valhalla Hub Team' }],
      creator: 'Valhalla Hub',
      publisher: 'Valhalla Hub',
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${this.baseUrl}/blog`,
        siteName: this.siteName,
        images: [
          {
            url: this.defaultImage,
            width: 1200,
            height: 630,
            alt: 'Blog Valhalla Hub - Música, Tecnologia e Inovação',
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [this.defaultImage],
        creator: '@valhallahub',
        site: '@valhallahub',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: `${this.baseUrl}/blog`,
        types: {
          'application/rss+xml': `${this.baseUrl}/blog/feed.xml`,
        },
      },
      other: {
        'msapplication-TileColor': '#0a0a0a',
        'theme-color': '#00f5ff',
      },
    };
  }

  /**
   * Generate metadata for individual blog post
   */
  generatePostMetadata(post: BlogPost): Metadata {
    const title = `${post.title} | Blog Valhalla Hub`;
    const description = post.excerpt;
    const url = `${this.baseUrl}/blog/${post.slug}`;
    
    // Generate tags for keywords
    const keywords = [
      ...post.tags,
      post.category,
      post.author.name,
      'valhalla hub',
      'música',
      'produção musical'
    ];

    return {
      title,
      description,
      keywords: keywords.join(', '),
      authors: [
        { 
          name: post.author.name,
          url: `${this.baseUrl}/blog/autor/${post.author.slug}`
        }
      ],
      creator: post.author.name,
      publisher: this.siteName,
      category: post.category,
      openGraph: {
        title: post.title,
        description,
        type: 'article',
        url,
        siteName: this.siteName,
        images: [
          {
            url: post.image.startsWith('http') ? post.image : `${this.baseUrl}${post.image}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: 'pt_BR',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [`${this.baseUrl}/blog/autor/${post.author.slug}`],
        tags: post.tags,
        section: post.category,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [post.image.startsWith('http') ? post.image : `${this.baseUrl}${post.image}`],
        creator: post.author.social?.twitter || '@valhallahub',
        site: '@valhallahub',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: url,
      },
      other: {
        'article:author': post.author.name,
        'article:published_time': post.publishedAt,
        'article:modified_time': post.updatedAt || post.publishedAt,
        'article:section': post.category,
        'article:tag': post.tags.join(','),
      },
    };
  }

  /**
   * Generate metadata for author pages
   */
  generateAuthorMetadata(author: Author): Metadata {
    const title = `${author.name} | Autor no Blog Valhalla Hub`;
    const description = author.bio;
    const url = `${this.baseUrl}/blog/autor/${author.slug}`;

    return {
      title,
      description,
      keywords: [
        ...author.specialties,
        author.name,
        'autor',
        'valhalla hub',
        'blog',
        'música'
      ].join(', '),
      authors: [
        { 
          name: author.name,
          url: author.website
        }
      ],
      creator: author.name,
      publisher: this.siteName,
      openGraph: {
        title,
        description,
        type: 'profile',
        url,
        siteName: this.siteName,
        images: [
          {
            url: author.avatar.startsWith('http') ? author.avatar : `${this.baseUrl}${author.avatar}`,
            width: 400,
            height: 400,
            alt: author.name,
          },
        ],
        locale: 'pt_BR',
        firstName: author.name.split(' ')[0],
        lastName: author.name.split(' ').slice(1).join(' '),
      },
      twitter: {
        card: 'summary',
        title,
        description,
        images: [author.avatar.startsWith('http') ? author.avatar : `${this.baseUrl}${author.avatar}`],
        creator: author.social?.twitter || '@valhallahub',
        site: '@valhallahub',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: url,
      },
    };
  }

  /**
   * Generate metadata for category pages
   */
  generateCategoryMetadata(category: string, description?: string): Metadata {
    const title = `${category} | Blog Valhalla Hub`;
    const desc = description || `Descubra todos os artigos sobre ${category} no blog Valhalla Hub. Conteúdo especializado e atualizado regularmente.`;
    const url = `${this.baseUrl}/blog/categoria/${encodeURIComponent(category.toLowerCase())}`;

    return {
      title,
      description: desc,
      keywords: [
        category,
        'valhalla hub',
        'blog',
        'música',
        'artigos',
        'categoria'
      ].join(', '),
      openGraph: {
        title,
        description: desc,
        type: 'website',
        url,
        siteName: this.siteName,
        images: [
          {
            url: this.defaultImage,
            width: 1200,
            height: 630,
            alt: `${category} - Blog Valhalla Hub`,
          },
        ],
        locale: 'pt_BR',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
        images: [this.defaultImage],
        site: '@valhallahub',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: url,
      },
    };
  }

  /**
   * Generate structured data (JSON-LD) for blog post
   */
  generatePostStructuredData(post: BlogPost): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: {
        '@type': 'ImageObject',
        url: post.image.startsWith('http') ? post.image : `${this.baseUrl}${post.image}`,
        width: 1200,
        height: 630
      },
      author: {
        '@type': 'Person',
        name: post.author.name,
        url: `${this.baseUrl}/blog/autor/${post.author.slug}`,
        image: post.author.avatar.startsWith('http') ? post.author.avatar : `${this.baseUrl}${post.author.avatar}`
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/images/valhalla-hub-logo.png`,
          width: 300,
          height: 100
        }
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${this.baseUrl}/blog/${post.slug}`
      },
      articleSection: post.category,
      keywords: post.tags.join(', '),
      wordCount: post.content ? post.content.split(' ').length : post.readingTime * 200,
      timeRequired: `PT${post.readingTime}M`,
      inLanguage: 'pt-BR',
      url: `${this.baseUrl}/blog/${post.slug}`,
      potentialAction: {
        '@type': 'ReadAction',
        target: `${this.baseUrl}/blog/${post.slug}`
      },
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/ViewAction',
          userInteractionCount: post.views
        },
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/LikeAction',
          userInteractionCount: post.likes
        }
      ]
    };

    return JSON.stringify(structuredData);
  }

  /**
   * Generate structured data for author
   */
  generateAuthorStructuredData(author: Author): string {
    const socialUrls = [];
    if (author.social) {
      if (author.social.instagram) socialUrls.push(`https://instagram.com/${author.social.instagram.replace('@', '')}`);
      if (author.social.twitter) socialUrls.push(`https://twitter.com/${author.social.twitter.replace('@', '')}`);
      if (author.social.youtube) socialUrls.push(`https://youtube.com/@${author.social.youtube}`);
      if (author.social.linkedin) socialUrls.push(`https://linkedin.com/in/${author.social.linkedin}`);
      if (author.website) socialUrls.push(author.website);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      description: author.bio,
      image: author.avatar.startsWith('http') ? author.avatar : `${this.baseUrl}${author.avatar}`,
      url: `${this.baseUrl}/blog/autor/${author.slug}`,
      sameAs: socialUrls,
      jobTitle: author.specialties[0] || 'Music Professional',
      worksFor: {
        '@type': 'Organization',
        name: this.siteName,
        url: this.baseUrl
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: author.location
      },
      alumniOf: author.specialties.map(specialty => ({
        '@type': 'EducationalOrganization',
        name: `${specialty} Specialist`
      })),
      knowsAbout: author.specialties,
      memberOf: {
        '@type': 'Organization',
        name: this.siteName
      }
    };

    return JSON.stringify(structuredData);
  }

  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>): string {
    const itemListElement = items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${this.baseUrl}${item.url}`
    }));

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    };

    return JSON.stringify(structuredData);
  }

  /**
   * Generate website structured data for blog
   */
  generateWebsiteStructuredData(): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      description: 'Plataforma completa para músicos, produtores e profissionais da indústria musical.',
      url: this.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: this.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/images/valhalla-hub-logo.png`,
          width: 300,
          height: 100
        }
      },
      inLanguage: 'pt-BR'
    };

    return JSON.stringify(structuredData);
  }

  /**
   * Generate FAQ structured data
   */
  generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>): string {
    const mainEntity = faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }));

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity
    };

    return JSON.stringify(structuredData);
  }
}

export const seoManager = new SEOManager();