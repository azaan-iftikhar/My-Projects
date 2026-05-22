import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const serviceData = {
    scraping: {
        title: "Data Extraction / Scraping Automation",
        visuals: (
            <>
                <img alt="Amazon" className="absolute w-16 h-16 rounded-xl shadow-lg border-2 border-white -top-2 -left-2 z-10 bg-white object-contain p-2 zoomable-image" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Amazon_icon.svg"/>
                <img alt="eBay" className="absolute w-20 h-20 rounded-2xl shadow-xl border-2 border-white z-20 bg-white object-contain p-2 zoomable-image" src="/assets/ebay_icon/screen.png"/>
                <img alt="Etsy" className="absolute w-16 h-16 rounded-xl shadow-lg border-2 border-white -bottom-2 -right-2 z-30 bg-white object-contain p-2 zoomable-image" src="/assets/etsy_icon/screen.png"/>
            </>
        ),
        desc: "Extract competitor pricing and stock data in real-time.",
        features: [
            "Competitor prices scraped automatically in 5 minutes with 90% accuracy. No more all-day manual work in Jungle Scout or Helium 10.",
            "High-margin products sourced and alerts sent straight to you on WhatsApp.",
            "Customer comments replied instantly — no more copy-pasting the same answer 100 times."
        ]
    },
    comments: {
        title: "Auto Social Comment Replies",
        visuals: (
            <>
                <img alt="Pinterest" className="absolute w-16 h-16 rounded-full shadow-lg border-2 border-white -top-2 -left-2 z-10 zoomable-image" src="/assets/pinterest_logo_high_quality_vector_icon_original_brand_red_color_e60023/screen.png"/>
                <img alt="Instagram" className="absolute w-20 h-20 rounded-2xl shadow-xl border-2 border-white z-20 zoomable-image" src="/assets/instagram_logo_high_quality_vector_icon_original_brand_colors_gradient_of/screen.png"/>
                <img alt="Facebook" className="absolute w-16 h-16 rounded-xl shadow-lg border-2 border-white -bottom-2 -right-2 z-30 zoomable-image" src="/assets/facebook_logo_professional_vector_icon_original_brand_blue_color_1877f2_clean/screen.png"/>
            </>
        ),
        desc: "Drive engagement and conversions with instant, intelligent replies to customer queries.",
        features: [
            "Respond to customer questions on Instagram and Facebook in under 2 minutes.",
            "Convert comments into leads by automatically sending DM product links.",
            "Filter and prioritize high-intent customer inquiries for your sales team."
        ]
    },
    email: {
        title: "Email Marketing Automation",
        visuals: (
            <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white z-20">
                <span className="material-symbols-outlined text-[40px]">mail</span>
            </div>
        ),
        desc: "Scale your outreach with intelligent, personalized email sequences.",
        features: [
            "Abandoned cart recovery emails sent automatically within 1 hour of exit.",
            "Dynamic product recommendations based on user browsing history.",
            "A/B testing on subject lines to maximize open rates by up to 40%."
        ]
    }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('scraping');
  const [animating, setAnimating] = useState(false);
  const [displayData, setDisplayData] = useState(serviceData['scraping']);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab || animating) return;
    setAnimating(true);
    setActiveTab(tabId);
    
    setTimeout(() => {
        setDisplayData(serviceData[tabId]);
        setTimeout(() => setAnimating(false), 50);
    }, 300);
  };

  return (
    <section className="w-full bg-surface-bright py-section-padding-sm md:py-section-padding-lg border-t border-brand-border">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <ScrollReveal>
          <div className="mb-16 text-center">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark mb-4">What We Automate</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Wrapper for mobile swipe alert and horizontal fading indicators */}
            <div className="lg:col-span-4 relative w-full flex flex-col transition-all hover:scale-[1.01] duration-300">
                <ScrollReveal delay={100}>
                    {/* Horizontal fading gradient on the right (mobile only) to indicate more options */}
                    <div className="absolute right-0 top-8 bottom-0 w-16 bg-gradient-to-l from-surface-bright to-transparent z-10 pointer-events-none lg:hidden"></div>
                    
                    {/* Scroll Indicator Alert Hint */}
                    <div className="flex items-center justify-between px-2 mb-2 lg:hidden text-brand-gray-text text-xs font-bold uppercase tracking-wider">
                        <span>Our Capabilities</span>
                        <span className="flex items-center gap-1 text-brand-accent animate-pulse">
                            Swipe for more <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
                        </span>
                    </div>

                    {/* Horizontal scrolling tabs on mobile, vertical sidebar list on desktop */}
                    <div className="flex flex-row lg:flex-col gap-2 relative overflow-x-auto lg:overflow-visible border-b lg:border-b-0 border-brand-border pb-2 lg:pb-0 scrollbar-none">
                        {/* Background line indicator: horizontal on mobile (hidden), vertical on desktop */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-container-low rounded-full hidden lg:block"></div>
                    
                        <button onClick={() => handleTabChange('scraping')} className={`shrink-0 w-auto lg:w-full text-left px-4 py-4 lg:pl-8 lg:py-6 relative cursor-pointer group transition-all duration-300 ${activeTab === 'scraping' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:h-full lg:right-auto lg:w-1 rounded-full transition-colors ${activeTab === 'scraping' ? 'bg-brand-accent shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'bg-transparent'}`}></div>
                            <h4 className={`font-headline-sm text-headline-sm mb-1 transition-colors ${activeTab === 'scraping' ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'}`}>Data Extraction / Scraping</h4>
                            <p className="font-body-md text-body-md text-brand-gray-text hidden lg:block">Real-time competitor & stock data</p>
                        </button>

                        <button onClick={() => handleTabChange('comments')} className={`shrink-0 w-auto lg:w-full text-left px-4 py-4 lg:pl-8 lg:py-6 relative cursor-pointer group transition-all duration-300 ${activeTab === 'comments' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:h-full lg:right-auto lg:w-1 rounded-full transition-colors ${activeTab === 'comments' ? 'bg-brand-accent shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'bg-transparent'}`}></div>
                            <h4 className={`font-headline-sm text-headline-sm mb-1 transition-colors ${activeTab === 'comments' ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'}`}>Auto Comment Replies</h4>
                            <p className="font-body-md text-body-md text-brand-gray-text hidden lg:block">Instant customer engagement</p>
                        </button>

                        <button onClick={() => handleTabChange('email')} className={`shrink-0 w-auto lg:w-full text-left px-4 py-4 lg:pl-8 lg:py-6 relative cursor-pointer group transition-all duration-300 ${activeTab === 'email' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:h-full lg:right-auto lg:w-1 rounded-full transition-colors ${activeTab === 'email' ? 'bg-brand-accent shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'bg-transparent'}`}></div>
                            <h4 className={`font-headline-sm text-headline-sm mb-1 transition-colors ${activeTab === 'email' ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'}`}>Email Marketing Automation</h4>
                            <p className="font-body-md text-body-md text-brand-gray-text hidden lg:block">Personalized outreach at scale</p>
                        </button>
                    </div>
                </ScrollReveal>
            </div>
            
            <div className="lg:col-span-8 overflow-hidden">
                <ScrollReveal delay={200}>
                    <div className={`minimal-card h-full flex flex-col p-8 lg:p-12 fade-transition ${animating ? 'fade-out' : 'fade-in'} transition-all hover:scale-[1.01] duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)]`}>
                        <div className="flex items-start md:items-center gap-6 mb-8 flex-col md:flex-row">
                            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                                {displayData.visuals}
                            </div>
                            <div>
                                <h3 className="font-headline-md text-headline-md text-brand-dark mb-2">{displayData.title}</h3>
                                <p className="font-body-lg text-body-lg text-brand-gray-text">{displayData.desc}</p>
                            </div>
                        </div>
                        <div className="bg-surface-bright rounded-xl border border-brand-border p-6 md:p-8 flex flex-col gap-6">
                            <h4 className="font-label-md text-label-md text-brand-dark uppercase tracking-wider mb-2">Key Features</h4>
                            <div className="flex flex-col gap-6">
                                {displayData.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <span className="material-symbols-outlined text-brand-accent mt-0.5">check_circle</span>
                                        <p className="font-body-md text-body-md text-brand-dark leading-relaxed">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
