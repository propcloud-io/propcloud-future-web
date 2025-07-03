
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AbstractAccent from '@/components/AbstractAccent';
import ParticleBackground from '@/components/ParticleBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Blog() {
  useEffect(() => {
    document.title = "Blog | PropCloud - AI Property Management Insights";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore insights, tips, and guides on AI-powered property management, virtual hosting, and the future of short-term rentals.');
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://propcloud.io/blog');
    }
  }, []);

  const blogPosts = [
    {
      id: 'what-is-virtual-property-management',
      title: 'What Is Virtual Property Management?',
      summary: 'Discover how virtual property management works, and why it\'s the future of Airbnb, short-term, and vacation rental operations.',
      date: 'July 2, 2025',
      author: 'PropCloud Inc.',
      readTime: '5 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-propcloud-800 to-teal-800 flex flex-col relative overflow-hidden">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 relative">
        <AbstractAccent position="top" color="blue" className="opacity-60" />
        <ParticleBackground density="medium" className="opacity-30" />
        
        {/* Enhanced background visuals */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-gradient-to-br from-teal-300/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-56 h-56 bg-gradient-to-br from-slate-300/50 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-gradient-to-br from-teal-200/40 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#14b8a6" strokeWidth="1.5" opacity="0.4"/>
                <circle cx="40" cy="40" r="2" fill="#14b8a6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60 max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-propcloud-700 to-teal-600 bg-clip-text text-transparent mb-8 animate-fade-up">
                PropCloud Blog
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto animate-fade-up leading-relaxed" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                Insights, tips, and guides on AI-powered property management and the future of hospitality.
              </p>
            </div>
          </div>

          {/* Enhanced Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, idx) => (
              <Card 
                key={post.id} 
                className="bg-white/90 backdrop-blur-md border border-white/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 rounded-2xl shadow-xl animate-fade-up"
                style={{animationDelay: `${0.1 + idx * 0.05}s`, animationFillMode: 'both'}}
              >
                <CardHeader className="p-10">
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">{post.date}</span>
                    <span className="mx-4">•</span>
                    <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-medium">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 hover:text-propcloud-700 transition leading-tight">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-10 pb-10">
                  <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed text-lg">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">By {post.author}</span>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-3 text-propcloud-700 hover:text-accent-600 font-semibold text-base transition px-6 py-3 bg-teal-50 hover:bg-teal-100 rounded-xl"
                    >
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Coming Soon Section */}
          <div className="mt-20 text-center">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/60 max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-teal-600 bg-clip-text text-transparent mb-6">
                More Insights Coming Soon
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed">
                We're constantly sharing new insights about AI in property management. Stay tuned for more articles!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
