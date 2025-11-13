import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import { Calendar, Clock, BookOpen, Feather } from 'lucide-react';
import { 
  getPosts, 
  getPostCategories, 
  getPostTags, 
  getReadTime,
  stripHtmlTags,
  getPostImage
} from '@/lib/wordpress';

export default async function BlogPage() {
  // Fetch blog posts on the server
  const blogPosts = await getPosts();
  
  return (
    <>
      {/* Starry Sky Hero Section */}
      <div className="relative z-10 h-[50vh] min-h-[400px] flex items-center justify-center px-4 overflow-hidden">
        {/* Starry Sky Background */}
        <div className="absolute inset-0">
          {/* Stars */}
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Simple Icon */}
          <div className="inline-flex items-center justify-center mb-6">
            <Feather className="w-16 h-16 text-[#FFD700]" strokeWidth={1.5} />
          </div>

          {/* Clean Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 leading-none">
            <span className="text-[#FFD700]">The Author&apos;s Journal</span>
          </h1>
          
          {/* Simple Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 font-light mb-8">
            Faith • Stories • Inspiration
          </p>

          {/* Clean Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5">
            <span className="text-white/90 text-sm">{blogPosts.length} Articles</span>
            <div className="w-px h-3 bg-white/20"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog post list */}
      <Section className="pb-24 z-10 relative">
        <div className="max-w-7xl mx-auto px-4">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white text-lg">No blog posts found. Check back soon!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {blogPosts.map((post: import('@/lib/wordpress').WordPressPost) => {
                const categories = getPostCategories(post);
                const tags = getPostTags(post);
                const cleanExcerpt = stripHtmlTags(post.excerpt.rendered);
                const readTime = getReadTime(post.content.rendered);
                const featuredImage = getPostImage(post);
                
                // Format the date
                const postDate = new Date(post.date);
                const formattedDate = postDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });

                const hasImage = featuredImage && !featuredImage.includes('blog-default.jpg');

                return (
                  <Link 
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-1 will-change-transform">
                      {hasImage ? (
                        // Layout with image
                        <div className="flex flex-col md:flex-row">
                          {/* Image Section - Left Side */}
                          <div className="relative w-full md:w-1/2 lg:w-3/5 flex-shrink-0 aspect-video md:aspect-auto">
                            <Image
                              src={featuredImage}
                              alt={post.title.rendered}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                              className="object-cover"
                              priority={false}
                            />
                            {/* Category Badges Overlay */}
                            <div className="absolute top-4 left-4 z-10">
                              <div className="flex flex-wrap gap-2">
                                {categories.slice(0, 2).map(category => (
                                  <span 
                                    key={category.id} 
                                    className="bg-[#FFD700] text-[#0A1128] text-xs font-semibold py-1.5 px-3 rounded-md shadow-lg"
                                  >
                                    {category.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Content Section - Right Side */}
                          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                            <div>
                              <h3 
                                className="font-bold text-2xl md:text-3xl text-[#0A1128] mb-4 group-hover:text-[#FFD700] transition-colors line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                              />
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center">
                                  <Calendar size={16} className="mr-2" /> {formattedDate}
                                </span>
                                <span className="flex items-center">
                                  <Clock size={16} className="mr-2" /> {readTime}
                                </span>
                              </div>
                              
                              <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-3 leading-relaxed">
                                {cleanExcerpt}
                              </p>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                              {/* Tags */}
                              <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 5).map(tag => (
                                  <span 
                                    key={tag.id} 
                                    className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                    #{tag.name}
                                  </span>
                                ))}
                              </div>
                              
                              {/* Read More Link */}
                              <div className="flex items-center text-base font-semibold text-[#0A1128] group-hover:text-[#FFD700] transition-colors">
                                <BookOpen size={18} className="mr-2 transition-transform group-hover:scale-110" /> 
                                <span>Read full article</span>
                                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Full-width text-only layout (no image)
                        <div className="p-6 md:p-8">
                          {/* Category Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {categories.slice(0, 2).map(category => (
                              <span 
                                key={category.id} 
                                className="bg-[#FFD700] text-[#0A1128] text-xs font-semibold py-1.5 px-3 rounded-md shadow-md"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>

                          <h3 
                            className="font-bold text-3xl md:text-4xl text-[#0A1128] mb-4 group-hover:text-[#FFD700] transition-colors"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <span className="flex items-center">
                              <Calendar size={16} className="mr-2" /> {formattedDate}
                            </span>
                            <span className="flex items-center">
                              <Clock size={16} className="mr-2" /> {readTime}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
                            {cleanExcerpt}
                          </p>
                          
                          <div className="flex flex-col gap-4">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {tags.slice(0, 5).map(tag => (
                                <span 
                                  key={tag.id} 
                                  className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                  #{tag.name}
                                </span>
                              ))}
                            </div>
                            
                            {/* Read More Link */}
                            <div className="flex items-center text-lg font-semibold text-[#0A1128] group-hover:text-[#FFD700] transition-colors">
                              <BookOpen size={20} className="mr-2 transition-transform group-hover:scale-110" /> 
                              <span>Read full article</span>
                              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </Section>
    </>
  );
} 