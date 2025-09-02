import { NextResponse } from 'next/server';
import { getPosts, type WordPressPost } from '@/lib/wordpress';

// Revalidate this route every 24 hours
export const revalidate = 86400;

// Determine the base URL from env vars or default to localhost
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_ENV === 'production' ? 'https://www.gbsollie.com' :
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

// Dynamically gather all routes, including blog slugs
async function getAllPaths(): Promise<string[]> {
  const basePaths = [
    '',
    'books',
    'audio-book',
    'journeyactivityguide',
    'a-journey-to-the-light',
    'cat-luker-dark-clock',
    'about',
    'contact',
    'accessibility',
    'privacy-policy',
    'cookie-policy',
    'terms-of-service',
    'blog',
    'mothers',
    'youthdirectors',
    'librarian',
  ];
  
  // Get dynamic blog posts from WordPress
  let blogSlugs: string[] = [];
  try {
    const posts = await getPosts();
    blogSlugs = posts.map((post: WordPressPost) => `blog/${post.slug}`);
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue without blog posts if WordPress is unavailable
  }
  
  return [...basePaths, ...blogSlugs];
}

// Generate sitemap XML string
async function generateSitemap(): Promise<string> {
  const staticPaths = await getAllPaths();
  const urls = staticPaths
    .map((path) => {
      const loc = path ? `${SITE_URL}/${path}` : SITE_URL;
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

// Handle GET requests to /sitemap.xml
export async function GET() {
  const sitemap = await generateSitemap();
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=0, s-maxage=${revalidate}`,
    },
  });
} 