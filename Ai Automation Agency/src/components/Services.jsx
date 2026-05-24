import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const serviceData = {
    lead_gen: {
        title: "Lead Generation & Communication Automation",
        visuals: (
            <>
                <img alt="Pinterest" className="absolute w-16 h-16 rounded-xl shadow-md border border-brand-border/30 -top-2 -left-2 z-10 bg-white object-contain p-3.5 zoomable-image" src="/assets/pinterest-color.svg"/>
                <img alt="Instagram" className="absolute w-20 h-20 rounded-2xl shadow-lg border border-brand-border/30 z-20 bg-white object-contain p-4.5 zoomable-image" src="/assets/instagram-color.svg"/>
                <img alt="Facebook" className="absolute w-16 h-16 rounded-xl shadow-md border border-brand-border/30 -bottom-2 -right-2 z-30 bg-white object-contain p-3.5 zoomable-image" src="/assets/facebook-color.svg"/>
            </>
        ),
        desc: "Automate your client acquisition and customer engagement channels to run 24/7 without manual intervention.",
        features: [
            "Cold Emails Automation: Send highly personalized cold outreach campaigns to hundreds of leads daily, complete with automated follow-ups.",
            "Email Marketing Automation: Target cart abandonment, welcome journeys, and promotional sequences based on real-time customer behavior.",
            "Social Media Comment Replies: Instantly reply to public comments on Facebook and Instagram and route buying inquiries to direct messages.",
            "Automated Chatbots on Website: Qualify leads and answer customer inquiries on your website instantly with intelligent conversational flows."
        ]
    },
    content_data: {
        title: "Content & Data Management",
        visuals: (
            <>
                <img alt="Amazon" className="absolute w-16 h-16 rounded-xl shadow-md border border-brand-border/30 -top-2 -left-2 z-10 bg-white object-contain p-3.5 zoomable-image" src="/assets/amazon-color.svg"/>
                <img alt="eBay" className="absolute w-20 h-20 rounded-2xl shadow-lg border border-brand-border/30 z-20 bg-white object-contain p-4 zoomable-image" src="/assets/ebay-color.svg"/>
                <img alt="Etsy" className="absolute w-16 h-16 rounded-xl shadow-md border border-brand-border/30 -bottom-2 -right-2 z-30 bg-white object-contain p-3.5 zoomable-image" src="/assets/etsy-color.svg"/>
            </>
        ),
        desc: "Keep your store catalogs, pricing, competitor intelligence, and copywriting perfectly synchronized and updated.",
        features: [
            "Automated Product Description Writer: Generate high-converting, SEO-optimized product copy in bulk utilizing advanced LLMs.",
            "Data Extraction & Scraping Automation: Collect competitor pricing, reviews, and stock updates automatically to maintain a market edge.",
            "Automated Product Catalog Updates: Instantly sync inventory levels, prices, and new arrivals across all channels from a single data source."
        ]
    },
    support_analytics: {
        title: "Ecommerce Customer Support & Analytics",
        visuals: (
            <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white z-20">
                <span className="material-symbols-outlined text-[40px]">bar_chart</span>
            </div>
        ),
        desc: "Elevate customer satisfaction while extracting actionable business intelligence from your store's operations.",
        features: [
            "Automated Customer Support Ticketing: Classify, prioritize, and automatically reply to common customer queries using AI agent desks.",
            "Automated Reporting & Analytics: Compile and email daily sales reports, campaign ROIs, and traffic dashboards straight to your inbox.",
            "Automated Customer Feedback Review: Monitor product reviews and customer satisfaction scores, alerting your team of negative feedback."
        ]
    }
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('lead_gen');
  const [animating, setAnimating] = useState(false);
  const [displayData, setDisplayData] = useState(serviceData['lead_gen']);

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
                    
                        <button onClick={() => handleTabChange('lead_gen')} className={`shrink-0 w-auto lg:w-full text-left px-4 py-4 lg:pl-8 lg:py-6 relative cursor-pointer group transition-all duration-300 ${activeTab === 'lead_gen' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:h-full lg:right-auto lg:w-1 rounded-full transition-colors ${activeTab === 'lead_gen' ? 'bg-brand-accent shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'bg-transparent'}`}></div>
                            <h4 className={`font-headline-sm text-headline-sm mb-1 transition-colors ${activeTab === 'lead_gen' ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'}`}>Lead Generation & Communication</h4>
                            <p className="font-body-md text-body-md text-brand-gray-text hidden lg:block">Cold email, social outreach & chatbots</p>
                        </button>

                        <button onClick={() => handleTabChange('content_data')} className={`shrink-0 w-auto lg:w-full text-left px-4 py-4 lg:pl-8 lg:py-6 relative cursor-pointer group transition-all duration-300 ${activeTab === 'content_data' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:h-full lg:right-auto lg:w-1 rounded-full transition-colors ${activeTab === 'content_data' ? 'bg-brand-accent shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'bg-transparent'}`}></div>
                            <h4 className={`font-headline-sm text-headline-sm mb-1 transition-colors ${activeTab === 'content_data' ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'}`}>Content & Data Management</h4>
                            <p className="font-body-md text-body-md text-brand-gray-text hidden lg:block">Catalogs, descriptions & data scraping</p>
                        </button>

                        <button onClick={() => handleTabChange('support_analytics')} className={`shrink-0 w-auto lg:w-full text-left px-4 py-4 lg:pl-8 lg:py-6 relative cursor-pointer group transition-all duration-300 ${activeTab === 'support_analytics' ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                            <div className={`absolute bottom-0 left-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:h-full lg:right-auto lg:w-1 rounded-full transition-colors ${activeTab === 'support_analytics' ? 'bg-brand-accent shadow-[0_0_8px_rgba(229,62,62,0.6)]' : 'bg-transparent'}`}></div>
                            <h4 className={`font-headline-sm text-headline-sm mb-1 transition-colors ${activeTab === 'support_analytics' ? 'text-brand-accent' : 'text-brand-dark group-hover:text-brand-accent'}`}>Support & Analytics</h4>
                            <p className="font-body-md text-body-md text-brand-gray-text hidden lg:block">Ticketing, feedback & dynamic reports</p>
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
                                        <span className="material-symbols-outlined text-brand-accent mt-0.5 select-none">check_circle</span>
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
