import { MetadataRoute } from 'next';

// Mock data - replace with actual CMS data
const mockPosts = [
  {
    slug: 'como-produzir-musica-eletronica-guia-2024',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    slug: 'marketing-musical-redes-sociais',
    publishedAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    slug: 'carreira-artistica-independente',
    publishedAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
];

const mockAuthors = [
  {
    slug: 'carlos-silva',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    slug: 'marina-santos',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    slug: 'roberto-tech',
    updatedAt: '2024-01-10T10:00:00Z'
  }
];

const categories = [
  'producao-musical',
  'carreira-artistica',
  'tecnologia',
  'eventos',
  'negocios'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://valhallahub.com.br';

  // Static blog pages
  const staticPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/autores`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ];

  // Dynamic post pages
  const postPages = mockPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Author pages
  const authorPages = mockAuthors.map((author) => ({
    url: `${baseUrl}/blog/autor/${author.slug}`,
    lastModified: new Date(author.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/blog/categoria/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...postPages,
    ...authorPages,
    ...categoryPages,
  ];
}