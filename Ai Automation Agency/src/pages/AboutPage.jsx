import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

const AboutPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');

  // Set up global click listener for .zoomable-image on this page
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.target.classList.contains('zoomable-image')) {
        e.stopPropagation();
        setLightboxImg(e.target.src);
        setLightboxOpen(true);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImg('');
  };

  return (
    <div className="antialiased font-body-md text-body-md selection:bg-brand-accent selection:text-white flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center bg-surface-bright">
          <About />
      </div>
      <Footer />

      {/* Premium Lightbox Modal for Zoomable Images */}
      {lightboxOpen && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-300 cursor-zoom-out"
        >
          <span 
            onClick={closeLightbox}
            className="absolute top-5 right-9 text-white text-5xl font-bold transition duration-300 cursor-pointer hover:text-gray-300 select-none z-[1001] material-symbols-outlined"
          >
            close
          </span>
          <img 
            src={lightboxImg} 
            alt="Expanded visual view" 
            className="max-w-[90%] max-h-[90%] object-contain rounded shadow-2xl transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default AboutPage;
