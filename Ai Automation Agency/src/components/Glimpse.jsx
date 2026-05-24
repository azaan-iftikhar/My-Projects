import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const glimpseData = {
    scraping: {
        title: "Amazon Product Hunting Automation",
        desc: "Products scraped automatically in 5 minutes with 90% accuracy. No more all-day manual work in Jungle Scout or Helium 10. With each run it checks it first checks it database to avoid duplication and looks for new products",
        howItWorksIntro: "",
        steps: [
            "Scrapes thousands of competitor product listings autonomously in minutes using advanced APIs",
            "Identifies high-margin sourcing opportunities by applying custom profitability scoring rules",
            "Instantly compiles clean product data and Best Seller Ranks (BSR) into organized Google Sheets",
            "Monitors and alerts your team automatically when lucrative sourcing options are detected"
        ],
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
        howItWorksIntro: "",
        steps: [
            "Tracks and monitors customer comments across Instagram & Facebook 24/7",
            "Instantly responds to product questions in under 2 minutes using context-aware AI",
            "Delivers direct purchase and product links via automated DM to drive conversions",
            "Filters spam and automatically alerts your sales team of high-intent buying inquiries"
        ],
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">forum</span>
                        Automation Dashboard
                    </div>
                    <img alt="Dashboard showing social media analytics and auto-replies." className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/product_hunting.jpeg"/>
                </div>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        Auto Comment Reply Demo
                    </div>
                    <img alt="Social Media Auto Comment Reply Output" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/output_of_automation.jpeg"/>
                </div>
            </>
        )
    },
    email: {
        title: "Automated Email Sequences",
        desc: "Set up complex, multi-step email journeys that react to customer behavior in real-time. From welcome series to sophisticated cart abandonment flows, let the automation do the heavy lifting for your marketing team.",
        howItWorksIntro: "",
        steps: [
            "Detects cart abandonment instantly and triggers recovery email flows within 1 hour",
            "Injects personalized, dynamic product recommendations tailored to buyers' interests",
            "Runs automated A/B tests on subject lines to continuously optimize open & click-through rates",
            "Synchronizes customer preferences and purchase behaviors directly into your CRM database"
        ],
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        Email Sequence Builder
                    </div>
                    <img alt="Email sequence builder interface." className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/output_of_automation.jpeg"/>
                </div>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">analytics</span>
                        Email Analytics Dashboard
                    </div>
                    <img alt="Email Sequence Analytics Output" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/product_hunting.jpeg"/>
                </div>
            </>
        )
    },
    cold_email: {
        title: "Automated Cold Email System — Google Sheets + Gmail",
        desc: "500 leads emailed in under 10 minutes with zero manual effort. No more copy-pasting contacts, missing follow-ups, or accidentally emailing the same person twice.",
        howItWorksIntro: "",
        steps: [
            "Triggers every day at 9 AM automatically — no one needs to lift a finger",
            "Reads your full contact list from Google Sheets, pulling Name, Email, Service Type, and Status in one pass",
            "Skips anyone already marked \"Sent\" and filters out missing emails before a single message goes out",
            "Processes contacts one at a time with a 2-second delay to protect sender reputation and stay within Gmail's limits",
            "Routes each contact to the right email template automatically based on their service tier — Single, Multi, or Full Service",
            "Marks the sheet \"Sent\" on success and \"Error\" on failure so nothing slips through and every mistake is retryable"
        ],
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">settings_input_component</span>
                        Automation Workflow
                    </div>
                    <img alt="Cold Email Automation Workflow" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/cold_email_automation.jpeg"/>
                </div>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">table_chart</span>
                        Result / Output Sheet
                    </div>
                    <img alt="Cold Email Result Output Sheet" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/cold_email_result.jpeg"/>
                </div>
            </>
        )
    },
    product_description: {
        title: "Automated Product Description Writer — Google Sheets + OpenAI",
        desc: "100 product descriptions written in one run, fully SEO-optimised. No copywriter, no prompting, no copy-pasting — just add your product and the description is ready.",
        howItWorksIntro: "",
        steps: [
            "Connects to your Google Sheet and reads every new product you add — Name, Category, Key Features, and any notes you include",
            "Skips products that already have descriptions so nothing gets overwritten or processed twice",
            "Sends each product to Claude with a pre-built SEO prompt tuned for conversion — no prompt engineering needed on your end",
            "Writes unique, keyword-rich descriptions for each product automatically, one by one",
            "Pastes the finished description directly back into the sheet against the right product row",
            "100 products done in a single run — that's 8 to 12 hours of work gone and no need for a $500/month copywriter, for under $30/month in running costs"
        ],
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">settings_input_component</span>
                        Automation Workflow
                    </div>
                    <img alt="Product Description Writer Automation Workflow" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/product_description_workflow.png"/>
                </div>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">table_chart</span>
                        Result / Output Sheet
                    </div>
                    <img alt="Product Description Writer Output Sheet" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/product_description_result.png"/>
                </div>
            </>
        )
    },
    chatbot: {
        title: "Integrated Website Chatbot — Portfolio Page AI Assistant",
        desc: "Engage website visitors instantly with an intelligent AI chatbot trained on your company profile, services, and portfolio. Turn passive traffic into qualified leads 24/7.",
        howItWorksIntro: "",
        steps: [
            "Loads your business details, portfolio case studies, and service offerings into the AI context model",
            "Initiates real-time chat with website visitors, answering questions about pricing, tech stack, and booking",
            "Intelligently qualifies leads by collecting their name, email, and specific project requirements in the chat",
            "Saves and syncs qualified leads directly to your central CRM database and triggers instant email alerts",
            "Operates 24/7 to provide immediate help when your team is offline, boosting conversion rates by up to 35%"
        ],
        visuals: (
            <>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">web</span>
                        Standard Website Page
                    </div>
                    <img alt="Website Portfolio Page" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/portfolio_page.png"/>
                </div>
                <div className="minimal-card p-4 bg-surface-container-low">
                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        Website with Active AI Chatbot
                    </div>
                    <img alt="Website Portfolio Page with Chatbot" className="w-full h-auto rounded border border-brand-border object-cover aspect-[1.75] zoomable-image" src="/assets/portfolio_page_with_chatbot.png"/>
                </div>
            </>
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
            <ScrollReveal>
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter mb-12 text-center">
                    <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark">Glimpse Of Work</h2>
                </div>
            </ScrollReveal>
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
                <ScrollReveal delay={100}>
                    <div className="relative w-full">
                        {/* Horizontal scroll indicators (fades) on mobile to indicate more options */}
                        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden"></div>
                        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-3 sm:gap-4 mb-16 pb-4 sm:pb-0 scrollbar-none snap-x w-full px-2 sm:px-0">
                            <button onClick={() => handleTabChange('scraping')} className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'scraping' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Data Extracting / Scraping</button>
                            <button onClick={() => handleTabChange('cold_email')} className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'cold_email' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Cold Email Automation</button>
                            <button onClick={() => handleTabChange('product_description')} className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'product_description' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Automated Product Description Writer</button>
                            <button onClick={() => handleTabChange('chatbot')} className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'chatbot' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Integrated Website Chatbot</button>
                            <button onClick={() => handleTabChange('social')} className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'social' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Auto Social Media Comment Replies</button>
                            <button onClick={() => handleTabChange('email')} className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${activeTab === 'email' ? 'pill-nav-active' : 'pill-nav-inactive hover:bg-surface-container-low'}`}>Email Marketing Automation</button>
                        </div>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center fade-transition ${animating ? 'fade-out' : 'fade-in'}`}>
                        <div className="flex flex-col gap-6">
                            {displayData.visuals}
                        </div>
                        <div className="flex flex-col gap-6 lg:pl-12">
                            <h2 className="font-headline-sm text-headline-sm md:font-headline-md md:text-headline-md text-brand-dark">{displayData.title}</h2>
                            <p className="font-body-lg text-body-lg text-brand-gray-text max-w-lg mb-2">{displayData.desc}</p>
                            
                            {/* Premium How It Works Box */}
                            <div className="minimal-card p-6 bg-surface-container-low border border-brand-border rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-2.5 border-b border-brand-border pb-3">
                                    <span className="material-symbols-outlined text-brand-accent font-semibold select-none">
                                        settings_ethernet
                                    </span>
                                    <h4 className="font-headline-xs text-headline-xs text-brand-dark">How It Works</h4>
                                </div>
                                {displayData.howItWorksIntro && (
                                    <p className="font-body-md text-body-md text-brand-gray-text italic leading-relaxed mb-1">
                                        {displayData.howItWorksIntro}
                                    </p>
                                )}
                                <ul className="flex flex-col gap-3.5">
                                    {displayData.steps && displayData.steps.map((step, idx) => (
                                        <li key={idx} className="flex gap-3 items-start">
                                            <span className="material-symbols-outlined text-brand-accent text-[18px] mt-0.5 select-none font-bold">
                                                arrow_right_alt
                                            </span>
                                            <p className="font-body-md text-body-md text-brand-dark leading-relaxed">
                                                {step}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default Glimpse;
