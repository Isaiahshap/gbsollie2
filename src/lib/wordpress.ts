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
        cache: 'no-store',
        next: { revalidate: 0 } // Don't cache to ensure fresh data
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

export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(
      `${API_URL}/posts?slug=${slug}&_embed`,
      { 
        cache: 'no-store',
        next: { revalidate: 0 } // Don't cache to ensure fresh data
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
  return html.replace(/<[^>]*>/g, '');
} 