import Link from 'next/link';
import Section from '@/components/ui/Section';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { 
  getPosts, 
  getPostCategories, 
  getPostTags, 
  getReadTime,
  stripHtmlTags
} from '@/lib/wordpress';

export default async function BlogPage() {
  // Fetch blog posts on the server
  const blogPosts = await getPosts();
  
  return (
    <>
      {/* Minimal Elegant Hero Section */}
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display text-center text-white mb-4 leading-tight tracking-tight motion-safe:animate-fade-in-up"
          >
            <span className="block text-[#FFD700]">The Author&apos;s Journal</span>
          </h1>
        </div>
      </div>

      {/* Blog post grid */}
      <Section className="pb-24 z-10 relative">
        <div className="max-w-6xl mx-auto">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white text-lg">No blog posts found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: import('@/lib/wordpress').WordPressPost) => {
                const categories = getPostCategories(post);
                const tags = getPostTags(post);
                const cleanExcerpt = stripHtmlTags(post.excerpt.rendered);
                const readTime = getReadTime(post.content.rendered);
                
                // Format the date
                const postDate = new Date(post.date);
                const formattedDate = postDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                return (
                  <div 
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg transform-gpu will-change-transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {categories.slice(0, 2).map(category => (
                          <span 
                            key={category.id} 
                            className="bg-[#FFD700] text-[#0A1128] text-xs font-medium py-1 px-3 rounded-md shadow-md"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    
                      <h3 
                        className="font-bold text-xl text-[#0A1128] mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar size={12} className="mr-1" /> {formattedDate}
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" /> {readTime}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                        {cleanExcerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map(tag => (
                          <span key={tag.id} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                      
                      <div>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="inline-flex items-center text-sm font-medium text-[#0A1128] hover:text-[#FFD700] transition-colors mt-auto group"
                        >
                          <BookOpen size={16} className="mr-2 transition-transform group-hover:scale-110" /> 
                          <span>Read post</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Section>
    </>
  );
} 