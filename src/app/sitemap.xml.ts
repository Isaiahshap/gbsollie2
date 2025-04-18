import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Revalidate this route every 24 hours
export const revalidate = 86400;

// Determine the base URL from env vars or default to localhost
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
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
  ];
  const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');
  let blogSlugs: string[] = [];
  try {
    const entries = await fs.promises.readdir(blogDir, { withFileTypes: true });
    blogSlugs = entries
      .filter((e) => e.isDirectory())
      .map((e) => `blog/${e.name}`);
  } catch {
    // ignore if no blog directory
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