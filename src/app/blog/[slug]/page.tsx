import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';
import Section from '@/components/ui/Section';
import { 
  getPostBySlug,
  getPostImage,
  getPostCategories, 
  getPostTags, 
  getReadTime,
  stripHtmlTags
} from '@/lib/wordpress';
import ClientAudio from '@/components/blog/ClientAudio';

// Generate dynamic metadata for each blog post
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>; 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | G.B. Sollie',
      description: 'The requested blog post could not be found.',
    };
  }

  const cleanTitle = stripHtmlTags(post.title.rendered);
  const cleanExcerpt = stripHtmlTags(post.excerpt.rendered);
  const featuredImage = getPostImage(post);
  
  // Create a compelling meta description from excerpt or content
  let description = cleanExcerpt;
  if (!description || description.length < 50) {
    const cleanContent = stripHtmlTags(post.content.rendered);
    description = cleanContent.substring(0, 160) + (cleanContent.length > 160 ? '...' : '');
  }
  
  // Ensure description is not too long
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const categories = getPostCategories(post);
  const tags = getPostTags(post);
  
  return {
    title: `${cleanTitle} | G.B. Sollie`,
    description,
    keywords: [
      ...tags.map(tag => tag.name.toLowerCase()),
      ...categories.map(cat => cat.name.toLowerCase()),
      'G.B. Sollie',
      'christian children books',
      'faith-based literature',
      'children fantasy author'
    ],
    authors: [{ name: 'G.B. Sollie' }],
    openGraph: {
      title: cleanTitle,
      description,
      type: 'article',
      url: `https://www.gbsollie.com/blog/${slug}`,
      images: [
        {
          url: featuredImage.startsWith('http') ? featuredImage : `https://www.gbsollie.com${featuredImage}`,
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
      publishedTime: post.date,
      authors: ['G.B. Sollie'],
      section: categories[0]?.name || 'Blog',
      tags: tags.map(tag => tag.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description,
      images: [featuredImage.startsWith('http') ? featuredImage : `https://www.gbsollie.com${featuredImage}`],
      creator: '@gbsollie',
    },
    alternates: {
      canonical: `https://www.gbsollie.com/blog/${slug}`,
    },
  };
}

// Define the props type according to Next.js 15 conventions
export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>; 
}) {
  // With Next.js 15, params must be awaited
  const { slug } = await params;
  
  // Fetch the post with await
  const post = await getPostBySlug(slug);
  
  // Handle post not found
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl text-red-600 mb-4">Blog post not found</h1>
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary hover:text-[#FFD700]"
        >
          <ArrowLeft className="mr-2" size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get metadata
  const categories = getPostCategories(post);
  const tags = getPostTags(post);
  const readTime = getReadTime(post.content.rendered);
  const audioObject = post?.acf?.audio;
  const audioUrl = audioObject?.url || '';
  const hasAudio = !!audioUrl;
  const featuredImage = getPostImage(post);
  const hasFeaturedImage = featuredImage && !featuredImage.includes('blog-default.jpg');

  // Debug for audio 
  console.log('Post ACF:', post.acf);
  console.log('Audio object:', audioObject);
  console.log('Audio URL:', audioUrl);
  console.log('Has Audio:', hasAudio);

  return (
    <>
      {/* Hero Section with Featured Image */}
      <div className="relative pt-32 pb-16 md:pb-24 px-4 z-10">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-white/80 hover:text-[#FFD700] mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} /> Back to all posts
          </Link>
          
          <div className="motion-safe:animate-fade-in-up">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-8">
              <span className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {formattedDate}
              </span>
              
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                {readTime}
              </span>
            </div>
            
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <span 
                  key={category.id}
                  className="px-3 py-1 bg-[#FFD700] text-[#0A1128] text-xs font-medium rounded-md"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Image - Only show if one exists */}
      {hasFeaturedImage && (
        <div className="relative z-10 mb-8 md:mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="motion-safe:animate-fade-in-up relative rounded-xl overflow-hidden shadow-2xl aspect-[16/9]">
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Content Section */}
      <Section className="py-8 z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="motion-safe:animate-fade-in-up p-8 md:p-12">
              {/* Audio Player - Client Component */}
              {hasAudio ? (
                <Suspense fallback={<div className="mb-10 p-5 rounded-lg bg-gray-50 border border-gray-100">Loading audio player...</div>}>
                  <div className="mb-10 bg-gray-50 p-5 rounded-lg border border-gray-100">
                    <h3 className="font-semibold text-lg mb-3 text-[#0A1128]">Listen to this post:</h3>
                    <p className="text-sm text-gray-500 mb-3">Audio: {audioObject?.title || 'Untitled'}</p>
                    <ClientAudio audioUrl={audioUrl} />
                  </div>
                </Suspense>
              ) : (
                <div className="hidden">No audio available for this post</div>
              )}
              
              {/* Content */}
              <article className="blog-content max-w-none mx-auto">
                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </article>
              
              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-500 text-sm">Tags:</span>
                    {tags.map(tag => (
                      <span 
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
} 