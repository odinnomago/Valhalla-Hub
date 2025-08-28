import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with actual CMS data
const mockPosts = [
  {
    id: '1',
    title: 'Como Produzir Música Eletrônica: Guia Completo 2024',
    excerpt: 'Aprenda os segredos da produção eletrônica desde o básico até técnicas avançadas. Tutorial completo com dicas práticas e ferramentas essenciais.',
    slug: 'como-produzir-musica-eletronica-guia-2024',
    category: 'Produção Musical',
    author: {
      name: 'Carlos Silva',
      email: 'carlos@valhallahub.com.br'
    },
    publishedAt: '2024-01-15T10:00:00Z',
    image: '/images/blog/post-1.jpg'
  },
  {
    id: '2',
    title: 'Marketing Musical nas Redes Sociais: Estratégias 2024',
    excerpt: 'Descubra as estratégias mais eficazes para promover sua música nas redes sociais e construir uma base de fãs engajada.',
    slug: 'marketing-musical-redes-sociais',
    category: 'Carreira Artística',
    author: {
      name: 'Marina Santos',
      email: 'marina@valhallahub.com.br'
    },
    publishedAt: '2024-01-12T10:00:00Z',
    image: '/images/blog/post-2.jpg'
  },
  {
    id: '3',
    title: 'Carreira Artística Independente: Do Zero ao Sucesso',
    excerpt: 'Um guia completo para artistas independentes que querem construir uma carreira sólida e sustentável na música.',
    slug: 'carreira-artistica-independente',
    category: 'Carreira Artística',
    author: {
      name: 'Marina Santos',
      email: 'marina@valhallahub.com.br'
    },
    publishedAt: '2024-01-10T10:00:00Z',
    image: '/images/blog/post-3.jpg'
  }
];

function generateRSSFeed() {
  const baseUrl = 'https://valhallahub.com.br';
  const rssItemsXml = mockPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
      
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.excerpt}]]></description>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
          <author>${post.author.email} (${post.author.name})</author>
          <category><![CDATA[${post.category}]]></category>
          <enclosure url="${imageUrl}" type="image/jpeg" />
          <content:encoded><![CDATA[
            <img src="${imageUrl}" alt="${post.title}" style="max-width: 100%; height: auto;" />
            <p>${post.excerpt}</p>
            <p><a href="${postUrl}">Leia o artigo completo no Blog Valhalla Hub</a></p>
          ]]></content:encoded>
        </item>
      `.trim();
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Valhalla Hub</title>
    <description>Música, Tecnologia e Inovação - Conteúdo especializado para músicos, produtores e profissionais da indústria musical</description>
    <link>${baseUrl}/blog</link>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/images/valhalla-hub-logo.png</url>
      <title>Blog Valhalla Hub</title>
      <link>${baseUrl}/blog</link>
      <width>300</width>
      <height>100</height>
    </image>
    <category>Music</category>
    <category>Technology</category>
    <category>Music Production</category>
    <category>Music Career</category>
    <category>Tutorials</category>
    <webMaster>contato@valhallahub.com.br (Valhalla Hub)</webMaster>
    <managingEditor>blog@valhallahub.com.br (Blog Valhalla Hub)</managingEditor>
    <copyright>© ${new Date().getFullYear()} Valhalla Hub. Todos os direitos reservados.</copyright>
    <ttl>60</ttl>
    ${rssItemsXml}
  </channel>
</rss>`.trim();
}

export async function GET(request: NextRequest) {
  const feed = generateRSSFeed();

  return new NextResponse(feed, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}