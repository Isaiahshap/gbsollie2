export interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  modified?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
  acf?: {
    audio?: {
      ID?: number;
      id?: number;
      title?: string;
      filename?: string;
      filesize?: number;
      url?: string;
      link?: string;
      alt?: string;
      author?: string;
      description?: string;
      caption?: string;
      name?: string;
      status?: string;
      uploaded_to?: number;
      date?: string;
      modified?: string;
      menu_order?: number;
      mime_type?: string;
      type?: string;
      subtype?: string;
      icon?: string;
    };
  };
}

export interface WordPressTaxonomy {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

const API_URL = 'https://yeshayas.sg-host.com/wp-json/wp/v2';

// Check if ACF plugin is active and properly configured in WordPress
export async function checkAcfStatus(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/posts?per_page=1&_fields=acf`);
    if (!response.ok) return false;
    
    const data = await response.json();
    return data[0]?.acf !== undefined;
  } catch (error) {
    console.error('Error checking ACF status:', error);
    return false;
  }
}

export async function getPosts() {
  try {
    // This URL explicitly requests ACF fields
    const response = await fetch(
      `${API_URL}/posts?_embed&per_page=50`,
      { 
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json();
    console.log('First post ACF:', posts[0]?.acf); // Debug log
    return posts;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

// Fetch all posts with pagination for comprehensive tasks like sitemap generation
export async function getAllPosts(): Promise<WordPressPost[]> {
  const perPage = 100; // WordPress max is typically 100
  const allPosts: WordPressPost[] = [];
  try {
    const page = 1;
    let totalPages = 1;

    // Initial request to determine total pages
    const firstResponse = await fetch(
      `${API_URL}/posts?_embed&per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!firstResponse.ok) {
      throw new Error(`Failed to fetch posts page 1: ${firstResponse.status}`);
    }

    const firstBatch: WordPressPost[] = await firstResponse.json();
    allPosts.push(...firstBatch);

    const totalPagesHeader = firstResponse.headers.get('X-WP-TotalPages') || firstResponse.headers.get('x-wp-totalpages');
    totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) || 1 : 1;

    // Fetch remaining pages in parallel
    const fetchPromises: Array<Promise<WordPressPost[]>> = [];
    for (let p = 2; p <= totalPages; p++) {
      fetchPromises.push(
        fetch(`${API_URL}/posts?_embed&per_page=${perPage}&page=${p}`, {
          cache: 'no-store',
          next: { revalidate: 0 }
        }).then(async (res) => (res.ok ? (await res.json()) as WordPressPost[] : []))
      );
    }

    const remainingBatches = await Promise.all(fetchPromises);
    for (const batch of remainingBatches) {
      allPosts.push(...batch);
    }

    return allPosts;
  } catch (error) {
    console.error('Error fetching all WordPress posts:', error);
    return allPosts;
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(
      `${API_URL}/posts?slug=${slug}&_embed`,
      { 
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const posts = await response.json();
    const post = posts.length > 0 ? posts[0] : null;
    
    if (post) {
      console.log('Retrieved post ACF:', post.acf); // Debug log
    }
    
    return post;
  } catch (error) {
    console.error(`Error fetching WordPress post with slug ${slug}:`, error);
    return null;
  }
}

export function getReadTime(content: string): string {
  // Average reading speed: 200-250 words per minute
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  return `${readTime} min read`;
}

export function getPostCategories(post: WordPressPost): WordPressTaxonomy[] {
  if (!post._embedded || !post._embedded['wp:term']) {
    return [];
  }
  
  // Find the category taxonomy in the terms
  const allTerms = post._embedded['wp:term'].flat();
  return allTerms.filter(term => term.taxonomy === 'category');
}

export function getPostTags(post: WordPressPost): WordPressTaxonomy[] {
  if (!post._embedded || !post._embedded['wp:term']) {
    return [];
  }
  
  // Find the tag taxonomy in the terms
  const allTerms = post._embedded['wp:term'].flat();
  return allTerms.filter(term => term.taxonomy === 'post_tag');
}

export function getPostImage(post: WordPressPost): string {
  if (
    post._embedded && 
    post._embedded['wp:featuredmedia'] && 
    post._embedded['wp:featuredmedia'].length > 0
  ) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  
  // Default image if no featured media
  return '/images/blog-default.jpg';
}

export function stripHtmlTags(html: string): string {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities
  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': ' ',
    '&hellip;': '\u2026', // …
    '&#8217;': '\u2019', // '
    '&#8216;': '\u2018', // '
    '&#8220;': '\u201C', // "
    '&#8221;': '\u201D', // "
    '&#8211;': '\u2013', // –
    '&#8212;': '\u2014', // —
  };
  
  // Replace named entities
  Object.keys(htmlEntities).forEach(entity => {
    text = text.replace(new RegExp(entity, 'g'), htmlEntities[entity]);
  });
  
  // Decode numeric entities (&#123; or &#xAB;)
  text = text.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  text = text.replace(/&#x([0-9a-f]+);/gi, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
  
  return text;
} 