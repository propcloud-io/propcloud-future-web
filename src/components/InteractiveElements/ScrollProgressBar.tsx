
import React, { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/30 z-50">
      <div
        className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 transition-all duration-150 ease-out shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute right-0 top-0 w-4 h-1 bg-white/80 rounded-full shadow-lg" />
      </div>
    </div>
  );
}
