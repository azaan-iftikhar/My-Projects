import React, { useState, useCallback, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

// ─── Lazy Image with Skeleton Shimmer ─────────────────────────────────────────
// Shows a shimmer placeholder while the image loads, then fades it in smoothly.
const LazyImage = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full overflow-hidden rounded" style={{ aspectRatio: '1.75' }}>
            {/* Skeleton shimmer — visible until the real image loads */}
            {!loaded && (
                <div className="absolute inset-0 img-skeleton rounded" aria-hidden="true" />
            )}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                width="700"
                height="400"
                // Fade in the image once it's fully loaded to avoid a hard pop-in
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
                    loaded ? 'opacity-100' : 'opacity-0'
                } ${className}`}
            />
        </div>
    );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const glimpseData = {
    scraping: {
        title: "Amazon Product Hunting Automation",
        desc: "Products scraped automatically in 5 minutes with 90% accuracy. No more all-day manual work in Jungle Scout or Helium 10. With each run it checks it first checks it database to avoid duplication and looks for new products",
        steps: [
            "Scrapes thousands of competitor product listings autonomously in minutes using advanced APIs",
            "Identifies high-margin sourcing opportunities by applying custom profitability scoring rules",
            "Instantly compiles clean product data and Best Seller Ranks (BSR) into organized Google Sheets",
            "Monitors and alerts your team automatically when lucrative sourcing options are detected"
        ],
        visuals: [
            { icon: "settings_input_component", label: "Automation Workflow", src: "/assets/product_hunting.jpeg", alt: "Amazon Product Hunting Workflow" },
            { icon: "table_chart", label: "Result / Output Sheet", src: "/assets/output_of_automation.jpeg", alt: "Ecommerce Automation Output Sheet" }
        ]
    },
    cold_email: {
        title: "Automated Cold Email System — Google Sheets + Gmail",
        desc: "500 leads emailed in under 10 minutes with zero manual effort. No more copy-pasting contacts, missing follow-ups, or accidentally emailing the same person twice.",
        steps: [
            "Triggers every day at 9 AM automatically — no one needs to lift a finger",
            "Reads your full contact list from Google Sheets, pulling Name, Email, Service Type, and Status in one pass",
            "Skips anyone already marked \"Sent\" and filters out missing emails before a single message goes out",
            "Processes contacts one at a time with a 2-second delay to protect sender reputation and stay within Gmail's limits",
            "Routes each contact to the right email template automatically based on their service tier — Single, Multi, or Full Service",
            "Marks the sheet \"Sent\" on success and \"Error\" on failure so nothing slips through and every mistake is retryable"
        ],
        visuals: [
            { icon: "settings_input_component", label: "Automation Workflow", src: "/assets/cold_email_automation.jpeg", alt: "Cold Email Automation Workflow" },
            { icon: "table_chart", label: "Result / Output Sheet", src: "/assets/cold_email_result.jpeg", alt: "Cold Email Result Output Sheet" }
        ]
    },
    product_description: {
        title: "Automated Product Description Writer — Google Sheets + OpenAI",
        desc: "100 product descriptions written in one run, fully SEO-optimised. No copywriter, no prompting, no copy-pasting — just add your product and the description is ready.",
        steps: [
            "Connects to your Google Sheet and reads every new product you add — Name, Category, Key Features, and any notes you include",
            "Skips products that already have descriptions so nothing gets overwritten or processed twice",
            "Sends each product to Claude with a pre-built SEO prompt tuned for conversion — no prompt engineering needed on your end",
            "Writes unique, keyword-rich descriptions for each product automatically, one by one",
            "Pastes the finished description directly back into the sheet against the right product row",
            "100 products done in a single run — that's 8 to 12 hours of work gone and no need for a $500/month copywriter, for under $30/month in running costs"
        ],
        visuals: [
            { icon: "settings_input_component", label: "Automation Workflow", src: "/assets/product_description_workflow.png", alt: "Product Description Writer Automation Workflow" },
            { icon: "table_chart", label: "Result / Output Sheet", src: "/assets/product_description_result.png", alt: "Product Description Writer Output Sheet" }
        ]
    },
    chatbot: {
        title: "Integrated Website Chatbot — Portfolio Page AI Assistant",
        desc: "Engage website visitors instantly with an intelligent AI chatbot trained on your company profile, services, and portfolio. Turn passive traffic into qualified leads 24/7.",
        steps: [
            "Loads your business details, portfolio case studies, and service offerings into the AI context model",
            "Initiates real-time chat with website visitors, answering questions about pricing, tech stack, and booking",
            "Intelligently qualifies leads by collecting their name, email, and specific project requirements in the chat",
            "Saves and syncs qualified leads directly to your central CRM database and triggers instant email alerts",
            "Operates 24/7 to provide immediate help when your team is offline, boosting conversion rates by up to 35%"
        ],
        visuals: [
            { icon: "web", label: "Standard Website Page", src: "/assets/portfolio_page.png", alt: "Website Portfolio Page" },
            { icon: "chat", label: "Website with Active AI Chatbot", src: "/assets/portfolio_page_with_chatbot.png", alt: "Website Portfolio Page with Chatbot" }
        ]
    }
};

// ─── Tab List ──────────────────────────────────────────────────────────────────
const tabs = [
    { id: 'scraping',             label: 'Data Extracting / Scraping' },
    { id: 'cold_email',           label: 'Cold Email Automation' },
    { id: 'product_description',  label: 'Automated Product Description Writer' },
    { id: 'chatbot',              label: 'Integrated Website Chatbot' },
];

// ─── Glimpse Component ────────────────────────────────────────────────────────
const Glimpse = () => {
    const [activeTab, setActiveTab]       = useState('scraping');
    const [displayData, setDisplayData]   = useState(glimpseData['scraping']);
    // 'idle' | 'out' | 'in'  — drives the fade-transition class
    const [phase, setPhase]               = useState('idle');
    const animRef                         = useRef(false);

    // Two-phase transition: fade-out → swap content → fade-in (no flash)
    const handleTabChange = useCallback((tabId) => {
        if (tabId === activeTab || animRef.current) return;
        animRef.current = true;
        setActiveTab(tabId);

        // Phase 1 — fade OUT current content
        setPhase('out');

        setTimeout(() => {
            // Swap the data while invisible
            setDisplayData(glimpseData[tabId]);

            // Phase 2 — fade IN new content on next paint
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setPhase('in');
                    // Release the lock after transition completes
                    setTimeout(() => {
                        animRef.current = false;
                        setPhase('idle');
                    }, 380);
                });
            });
        }, 350); // matches CSS transition duration
    }, [activeTab]);

    // Derive CSS class from phase
    const contentClass = phase === 'out' ? 'fade-out' : 'fade-in';

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
                        {/* Right fade gradient — hints at horizontal scroll on mobile */}
                        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden" />
                        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-3 sm:gap-4 mb-16 pb-4 sm:pb-0 scrollbar-none snap-x w-full px-2 sm:px-0">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`shrink-0 snap-center px-6 py-2 rounded-full font-label-md text-label-md transition-colors glimpse-tab-btn ${
                                        activeTab === tab.id
                                            ? 'pill-nav-active'
                                            : 'pill-nav-inactive hover:bg-surface-container-low'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    {/* fade-transition class enables GPU-composited opacity+transform animation */}
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center fade-transition ${contentClass}`}>

                        {/* ── Left column: images ── */}
                        <div className="flex flex-col gap-6">
                            {displayData.visuals.map((visual, idx) => (
                                <div key={idx} className="minimal-card p-4 bg-surface-container-low">
                                    <div className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-3 flex items-center gap-1.5 select-none">
                                        <span className="material-symbols-outlined text-[16px]">{visual.icon}</span>
                                        {visual.label}
                                    </div>
                                    {/* LazyImage handles skeleton + lazy load + fade-in */}
                                    <LazyImage
                                        src={visual.src}
                                        alt={visual.alt}
                                        className="rounded border border-brand-border zoomable-image"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* ── Right column: text ── */}
                        <div className="flex flex-col gap-6 lg:pl-12">
                            <h2 className="font-headline-sm text-headline-sm md:font-headline-md md:text-headline-md text-brand-dark">
                                {displayData.title}
                            </h2>
                            <p className="font-body-lg text-body-lg text-brand-gray-text max-w-lg mb-2">
                                {displayData.desc}
                            </p>

                            {/* How It Works Box */}
                            <div className="minimal-card p-6 bg-surface-container-low border border-brand-border rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-2.5 border-b border-brand-border pb-3">
                                    <span className="material-symbols-outlined text-brand-accent font-semibold select-none">
                                        settings_ethernet
                                    </span>
                                    <h4 className="font-headline-xs text-headline-xs text-brand-dark">How It Works</h4>
                                </div>
                                <ul className="flex flex-col gap-3.5">
                                    {displayData.steps.map((step, idx) => (
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
