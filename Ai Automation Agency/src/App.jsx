import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Glimpse from './components/Glimpse';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Check if the clicked element has the zoomable-image class
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
    <div className="antialiased font-body-md text-body-md selection:bg-brand-accent selection:text-white relative">
      <Navbar />
      <Hero />
      <Services />
      <Glimpse />
      <Contact />
      <Footer />

      {/* Premium Lightbox Modal */}
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
        </div>
      )}
    </div>
  );
}

export default App;
