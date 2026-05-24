import React from 'react';
import { Link } from 'react-router-dom';

const icons = [
  { name: 'N8N', src: '/assets/n8n-color.svg' },
  { name: 'Make.com', src: '/assets/make-color.svg' },
  { name: 'Zapier', src: '/assets/zapier-text.svg' },
  { name: 'GoHighLevel', src: '/assets/gohighlevel-color.svg' },
  { name: 'Python', src: '/assets/python-3.svg' },
  { name: 'LangChain', src: '/assets/langchain-text.svg' }
];

const Hero = () => {
  // Since we have 4 icons, we repeat them 4 times to fill the viewport width for a seamless infinite loop
  const marqueeItems = [...icons, ...icons, ...icons, ...icons];


  return (
    <header className="relative w-full overflow-hidden bg-surface-container-lowest pt-section-padding-sm md:pt-section-padding-lg pb-12 flex flex-col items-center justify-between min-h-[80vh]">

      {/* Network Nodes SVG Background */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-80 mix-blend-multiply">
        <svg className="w-full h-full" viewBox="0 0 800 220" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="fade1" cx="0%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#e03030" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#e03030" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="fade2" cx="100%" cy="0%" r="60%">
              <stop offset="0%" stopColor="#e03030" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#e03030" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#fade1)"/>
          <rect width="100%" height="100%" fill="url(#fade2)"/>

          <g stroke="#e03030" fill="none">
            <line x1="0" y1="180" x2="60" y2="150" strokeWidth="1.2" opacity="0.2"/>
            <line x1="0" y1="220" x2="60" y2="150" strokeWidth="1" opacity="0.15"/>
            <line x1="60" y1="150" x2="130" y2="110" strokeWidth="1.3" opacity="0.22"/>
            <line x1="60" y1="150" x2="140" y2="175" strokeWidth="1" opacity="0.15"/>
            <line x1="130" y1="110" x2="200" y2="75" strokeWidth="1.3" opacity="0.2"/>
            <line x1="130" y1="110" x2="195" y2="130" strokeWidth="1" opacity="0.15"/>
            <line x1="140" y1="175" x2="195" y2="130" strokeWidth="1" opacity="0.14"/>
            <line x1="140" y1="175" x2="190" y2="200" strokeWidth="0.8" opacity="0.12"/>
            <line x1="200" y1="75" x2="260" y2="50" strokeWidth="1.2" opacity="0.18"/>
            <line x1="200" y1="75" x2="255" y2="90" strokeWidth="1" opacity="0.14"/>
            <line x1="195" y1="130" x2="255" y2="90" strokeWidth="1" opacity="0.13"/>
            <line x1="60" y1="150" x2="50" y2="200" strokeWidth="0.8" opacity="0.12"/>
            <line x1="0" y1="140" x2="60" y2="150" strokeWidth="0.8" opacity="0.12"/>
          </g>
          <g fill="#e03030">
            <circle cx="60" cy="150" r="5.5" opacity="0.3"/>
            <circle cx="130" cy="110" r="6.5" opacity="0.32"/>
            <circle cx="140" cy="175" r="4" opacity="0.2"/>
            <circle cx="200" cy="75" r="5.5" opacity="0.28"/>
            <circle cx="195" cy="130" r="4.5" opacity="0.22"/>
            <circle cx="190" cy="200" r="3" opacity="0.15"/>
            <circle cx="255" cy="90" r="3.5" opacity="0.18"/>
            <circle cx="260" cy="50" r="3" opacity="0.15"/>
          </g>
          <g fill="none" stroke="#e03030" opacity="0.1" strokeWidth="1">
            <circle cx="130" cy="110" r="13"/>
            <circle cx="60" cy="150" r="10"/>
          </g>

          <g stroke="#e03030" fill="none">
            <line x1="800" y1="40" x2="740" y2="70" strokeWidth="1.2" opacity="0.2"/>
            <line x1="800" y1="0" x2="740" y2="70" strokeWidth="1" opacity="0.15"/>
            <line x1="740" y1="70" x2="670" y2="110" strokeWidth="1.3" opacity="0.22"/>
            <line x1="740" y1="70" x2="660" y2="45" strokeWidth="1" opacity="0.15"/>
            <line x1="670" y1="110" x2="600" y2="145" strokeWidth="1.3" opacity="0.2"/>
            <line x1="670" y1="110" x2="605" y2="90" strokeWidth="1" opacity="0.15"/>
            <line x1="660" y1="45" x2="605" y2="90" strokeWidth="1" opacity="0.14"/>
            <line x1="660" y1="45" x2="610" y2="20" strokeWidth="0.8" opacity="0.12"/>
            <line x1="600" y1="145" x2="540" y2="170" strokeWidth="1.2" opacity="0.18"/>
            <line x1="600" y1="145" x2="545" y2="125" strokeWidth="1" opacity="0.14"/>
            <line x1="605" y1="90" x2="545" y2="125" strokeWidth="1" opacity="0.13"/>
            <line x1="740" y1="70" x2="750" y2="20" strokeWidth="0.8" opacity="0.12"/>
            <line x1="800" y1="80" x2="740" y2="70" strokeWidth="0.8" opacity="0.12"/>
          </g>
          <g fill="#e03030">
            <circle cx="740" cy="70" r="5.5" opacity="0.3"/>
            <circle cx="670" cy="110" r="6.5" opacity="0.32"/>
            <circle cx="660" cy="45" r="4" opacity="0.2"/>
            <circle cx="600" cy="145" r="5.5" opacity="0.28"/>
            <circle cx="605" cy="90" r="4.5" opacity="0.22"/>
            <circle cx="610" cy="20" r="3" opacity="0.15"/>
            <circle cx="545" cy="125" r="3.5" opacity="0.18"/>
            <circle cx="540" cy="170" r="3" opacity="0.15"/>
          </g>
          <g fill="none" stroke="#e03030" opacity="0.1" strokeWidth="1">
            <circle cx="670" cy="110" r="13"/>
            <circle cx="740" cy="70" r="10"/>
          </g>

          <line x1="260" y1="50" x2="310" y2="35" stroke="#e03030" strokeWidth="0.6" opacity="0.08"/>
          <line x1="540" y1="170" x2="490" y2="185" stroke="#e03030" strokeWidth="0.6" opacity="0.08"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center flex flex-col items-center gap-8 z-20 mt-12 md:mt-20">
        <h1 className="font-display-lg-mobile text-display-lg-mobile lg:font-display-lg lg:text-display-lg text-brand-dark leading-tight max-w-5xl">
          We Automate Your <span className="text-brand-accent">Ecommerce</span> Operations
        </h1>
        <p className="font-body-lg text-body-lg text-brand-gray-text max-w-2xl leading-relaxed">
          Custom AI workflows for email, product hunting, comments, posting, chatbots, and web dev. Built for Amazon, eBay, and DTC sellers.
        </p>
        <div className="mt-6 mb-12">
          <Link className="btn-primary inline-flex items-center justify-center font-label-md text-label-md px-10 h-[60px] md:px-12 md:h-[64px] rounded-full text-lg shadow-[0_8px_25px_rgba(229,62,62,0.3)] hover:shadow-[0_12px_35px_rgba(229,62,62,0.4)] transition-all duration-300" to="/contact">
            15 Minute Free Audit
          </Link>
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
