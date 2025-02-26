'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Download,  Calendar, ExternalLink } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

// Video category types
type VideoCategory = 'all' | 'interviews' | 'readings' | 'events';

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('all');
  
  // Media data
  const videos = [
    {
      id: 1,
      title: "Interview with G.B. Sollie on Cat Luker's Origins",
      thumbnail: "/images/video-thumbnail-1.jpg",
      duration: "12:34",
      date: "March 15, 2023",
      category: "interviews",
      url: "#"
    },
    {
      id: 2,
      title: "G.B. Sollie Reading Chapter 1 of Cat Luker",
      thumbnail: "/images/video-thumbnail-2.jpg",
      duration: "8:22",
      date: "April 3, 2023",
      category: "readings",
      url: "#"
    },
    {
      id: 3,
      title: "Book Launch Event at Alabama Book Festival",
      thumbnail: "/images/video-thumbnail-3.jpg",
      duration: "15:47",
      date: "May 20, 2023",
      category: "events",
      url: "#"
    },
    {
      id: 4,
      title: "The Faith Behind the Fiction - Author Talk",
      thumbnail: "/images/video-thumbnail-4.jpg",
      duration: "18:05",
      date: "June 12, 2023",
      category: "interviews",
      url: "#"
    }
  ];
  
  const pressResources = [
    {
      id: 1,
      title: "Author Bio",
      description: "Official biography of G.B. Sollie for press and media use.",
      icon: "profile",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Press Release - Cat Luker Launch",
      description: "Official press release for the launch of Cat Luker: The Swamp Witch Chronicles.",
      icon: "document",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Book Cover - High Resolution",
      description: "High-resolution images of book covers for media use.",
      icon: "image",
      downloadUrl: "#"
    },
    {
      id: 4,
      title: "Author Photos",
      description: "Professional photos of G.B. Sollie for media use.",
      icon: "camera",
      downloadUrl: "#"
    }
  ];
  
  const pressFeatures = [
    {
      id: 1,
      title: "Alabama Living Magazine",
      quote: "G.B. Sollie brings the Depression-era South to life with authentic characters and timeless themes.",
      logo: "/images/press-logo-1.png",
      date: "May 2023",
      url: "#"
    },
    {
      id: 2,
      title: "Southern Christian Writers Conference",
      quote: "A standout debut that captures faith and family in the rural South.",
      logo: "/images/press-logo-2.png",
      date: "June 2023",
      url: "#"
    }
  ];
  
  // Filter videos based on active category
  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);
  
  return (
    <>
      {/* Hero Section */}
      <Section 
        className="bg-primary text-white"
        id="media-hero"
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Media & Resources</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Explore videos, interviews, press resources, and more from G.B. Sollie&apos;s magical world of storytelling.
          </p>
        </motion.div>
      </Section>
      
      {/* Video Gallery */}
      <Section 
        className="bg-white"
        id="video-gallery"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Video Gallery</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: 'all', label: 'All Videos' },
            { id: 'interviews', label: 'Interviews' },
            { id: 'readings', label: 'Book Readings' },
            { id: 'events', label: 'Events' }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as VideoCategory)}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-gray-50 rounded-whimsical overflow-hidden shadow-md group hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <Play className="text-primary h-8 w-8" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-primary mb-2">{video.title}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>{video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-whimsical">
            <p className="text-gray-500">No videos available in this category yet.</p>
          </div>
        )}
        
        <div className="text-center mt-8">
          <Button href="https://youtube.com">
            Visit YouTube Channel
          </Button>
        </div>
      </Section>
      
      {/* Press Resources */}
      <Section 
        className="bg-gray-50"
        id="press-resources"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Press & Media Resources</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            Download official press materials and resources for media coverage and features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pressResources.map((resource) => (
            <div key={resource.id} className="bg-white p-6 rounded-whimsical shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Download size={24} />
              </div>
              <h3 className="font-bold text-lg text-primary mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
              <Button href={resource.downloadUrl} variant="outline" size="sm" fullWidth>
                Download
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white p-8 rounded-whimsical shadow-md">
          <h3 className="text-2xl text-primary font-bold mb-6">Press Contact</h3>
          <p className="text-gray-700 mb-4">
            For press inquiries, interview requests, or additional information, please contact:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-gray-800">Media Relations</h4>
              <p className="text-gray-600">media@gbsollie.com</p>
              <p className="text-gray-600">(555) 234-5678</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Speaking Engagements</h4>
              <p className="text-gray-600">bookings@gbsollie.com</p>
              <p className="text-gray-600">(555) 345-6789</p>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Press Features */}
      <Section 
        className="bg-white"
        id="press-features"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Featured In</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressFeatures.map((feature) => (
            <div key={feature.id} className="border border-gray-200 p-6 rounded-whimsical">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 mr-4">
                  <Image 
                    src={feature.logo} 
                    alt={feature.title} 
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.date}</p>
                </div>
              </div>
              <p className="italic text-gray-700 mb-4">&quot;{feature.quote}&quot;</p>
              <a 
                href={feature.url} 
                className="inline-flex items-center text-accent hover:underline"
              >
                Read Article <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </Section>
      
      {/* Upcoming Events */}
      <Section 
        className="bg-secondary"
        id="upcoming-events"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary-dark mb-4">Upcoming Events</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-whimsical shadow-lg">
            <div className="divide-y divide-gray-200">
              {[
                {
                  title: "Book Signing at Main Street Books",
                  date: "October 15, 2023",
                  time: "2:00 PM - 4:00 PM",
                  location: "Downtown Birmingham, AL",
                  url: "#"
                },
                {
                  title: "Children's Literature Festival",
                  date: "November 5-7, 2023",
                  time: "Various Times",
                  location: "Montgomery Public Library",
                  url: "#"
                },
                {
                  title: "School Visit - Washington Elementary",
                  date: "November 18, 2023",
                  time: "10:00 AM - 12:00 PM",
                  location: "Mobile, AL",
                  url: "#"
                }
              ].map((event, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-primary">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar size={16} className="mr-1" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <p className="text-gray-700 mt-1">{event.location}</p>
                    </div>
                    <Button 
                      href={event.url} 
                      variant="secondary"
                      size="sm"
                      className="mt-3 md:mt-0"
                    >
                      Event Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button href="/contact" variant="primary">
            Request an Event
          </Button>
        </div>
      </Section>
    </>
  );
} 