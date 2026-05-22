import React, { useState, useEffect } from 'react';

const icons = [
  { name: 'N8N', src: '/assets/n8n-color.svg' },
  { name: 'Make.com', src: '/assets/make-color.svg' },
  { name: 'Zapier', src: '/assets/zapier-text.svg' },
  { name: 'Python', src: '/assets/python-3.svg' },
  { name: 'LangChain', src: '/assets/langchain-text.svg' }
];

const Hero = () => {
  // Since we have 4 icons, we repeat them 4 times to fill the viewport width for a seamless infinite loop
  const marqueeItems = [...icons, ...icons, ...icons, ...icons];

  // Typewriter Loop Logic
  const words = ["Ecommerce", "Shopify", "Amazon", "Workflows"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const fullWord = words[wordIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }, typingSpeed);

      if (currentText === fullWord) {
        timer = setTimeout(() => setIsDeleting(true), 1500); // Pause on full word
      }
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      }, 70); // Deleting is slightly faster

      if (currentText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <header className="relative w-full overflow-hidden bg-surface-container-lowest pt-section-padding-sm md:pt-section-padding-lg pb-12 flex flex-col items-center justify-between min-h-[80vh]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-full w-[400px] h-[400px] md:w-[800px] md:h-[800px] top-0 left-1/2 -ml-[200px] md:-ml-[400px] mask-image-[radial-gradient(ellipse_at_top,black_40%,transparent_70%)] z-10 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center flex flex-col items-center gap-8 z-20 mt-12 md:mt-20">
        <h1 className="font-display-lg-mobile text-display-lg-mobile lg:font-display-lg lg:text-display-lg text-brand-dark leading-tight max-w-5xl">
          We Automate Your <span className="text-brand-accent">{currentText}</span>
          <span className="text-brand-accent animate-pulse font-normal">|</span> Operations
        </h1>
        <p className="font-body-lg text-body-lg text-brand-gray-text max-w-2xl leading-relaxed">
          Custom AI workflows for email, product hunting, comments, posting, chatbots, and web dev. Built for Amazon, eBay, and DTC sellers.
        </p>
        <div className="mt-6 mb-12">
          <a className="btn-primary font-label-md text-label-md px-10 h-[60px] md:px-12 md:h-[64px] rounded-full text-lg shadow-[0_8px_25px_rgba(229,62,62,0.3)] hover:shadow-[0_12px_35px_rgba(229,62,62,0.4)] transition-all duration-300" href="#">
            15 Minute Free Audit
          </a>
        </div>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full z-20 mt-auto">
        {/* Gradient fades on left and right for seamless entrance/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-container-lowest to-transparent z-30 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-container-lowest to-transparent z-30 pointer-events-none"></div>

        <div className="marquee-container py-8">
          <div className="marquee-track flex gap-16 md:gap-28 px-6">
            {marqueeItems.map((icon, index) => (
              <div key={index} className="marquee-item flex flex-col items-center justify-center shrink-0">
                {/* Tooltip Label */}
                <div className="icon-tooltip absolute -top-10 bg-brand-dark text-white text-xs font-bold px-3 py-1 rounded-md whitespace-nowrap shadow-lg z-50">
                  {icon.name}
                </div>

                {/* Icon Wrapper (Raw SVG) */}
                <div className="w-28 h-12 md:w-44 md:h-16 flex items-center justify-center drop-shadow-sm transition-all duration-300">
                  <img alt={icon.name} className="w-full h-full object-contain" src={icon.src} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </header>
  );
};

export default Hero;
