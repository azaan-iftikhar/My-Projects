import React, { useState } from 'react';

const glimpseData = {
    scraping: {
        title: "Amazon Product Hunting Automation",
        desc: "Products scraped automatically in 5 minutes with 90% accuracy. No more all-day manual work in Jungle Scout or Helium 10. With each run it checks it first checks it database to avoid duplication and looks for new products",
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">settings_input_component</span>
                        Automation Workflow
                    </div>
                    <img alt="Amazon Product Hunting Workflow" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/product_hunting.jpeg"/>
                </div>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">table_chart</span>
                        Result / Output Sheet
                    </div>
                    <img alt="Ecommerce Automation Output Sheet" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/output_of_automation.jpeg"/>
                </div>
            </>
        )
    },
    social: {
        title: "Intelligent Social Media Moderation",
        desc: "Automatically filter, categorize, and respond to comments across all your social channels. Our AI understands sentiment and context, ensuring your brand voice remains consistent while saving your team hours of manual work.",
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">forum</span>
                        Automation Dashboard
                    </div>
                    <img alt="Dashboard showing social media analytics and auto-replies." className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/product_hunting.jpeg"/>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="minimal-card p-4 flex flex-col items-center justify-center gap-2">
                        <span className="font-headline-md text-brand-accent">98%</span>
                        <span className="font-label-md text-brand-gray-text text-center">Faster Response Time</span>
                    </div>
                     <div className="minimal-card p-4 flex flex-col items-center justify-center gap-2">
                        <span className="font-headline-md text-brand-accent">24/7</span>
                        <span className="font-label-md text-brand-gray-text text-center">Active Monitoring</span>
                    </div>
                 </div>
            </>
        )
    },
    email: {
        title: "Automated Email Sequences",
        desc: "Set up complex, multi-step email journeys that react to customer behavior in real-time. From welcome series to sophisticated cart abandonment flows, let the automation do the heavy lifting for your marketing team.",
        visuals: (
             <div className="minimal-card p-4 bg-surface-container-low">
                <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    Email Sequence Builder
                </div>
                <img alt="Email sequence builder interface." className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/output_of_automation.jpeg"/>
            </div>
        )
    }
};

const Glimpse = () => {
    const [activeTab, setActiveTab] = useState('scraping');
    const [animating, setAnimating] = useState(false);
    const [displayData, setDisplayData] = useState(glimpseData['scraping']);

    const handleTabChange = (tabId) => {
        if (tabId === activeTab || animating) return;
        setAnimating(true);
        setActiveTab(tabId);
        
        setTimeout(() => {
            setDisplayData(glimpseData[tabId]);
            setTimeout(() => setAnimating(false), 50);
        }, 300);
    };

    return (
        <section className="w-full bg-white py-section-padding-sm md:py-section-padding-lg">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-12 text-center">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark">Glimpse Of Work</h2>
            </div>
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button onClick={() => handleTabChange('scraping')} className={`px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'scraping' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Data Extracting / Scraping</button>
                    <button onClick={() => handleTabChange('social')} className={`px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'social' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Auto Social Media Comment Replies</button>
                    <button onClick={() => handleTabChange('email')} className={`px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'email' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Email Marketing Automation</button>
                </div>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center fade-transition ${animating ? 'fade-out' : 'fade-in'}`}>
                    <div className="flex flex-col gap-6">
                        {displayData.visuals}
                    </div>
                    <div className="flex flex-col gap-6 lg:pl-12">
                        <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark">{displayData.title}</h2>
                        <p className="font-body-lg text-body-lg text-brand-gray-text max-w-lg">{displayData.desc}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Glimpse;
