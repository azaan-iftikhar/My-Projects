import React from 'react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
    return (
        <section id="contact" className="w-full bg-surface-bright py-section-padding-sm md:py-section-padding-lg border-t border-brand-border">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark mb-4">Let's Automate Your Business</h2>
                        <p className="font-body-lg text-body-lg text-brand-gray-text max-w-2xl mx-auto">
                            Ready to save hours of manual work? Choose how you'd like to get in touch with our automation experts.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
                    {/* Embedded Calendly Scheduler */}
                    <div className="lg:col-span-8 w-full">
                        <ScrollReveal delay={150}>
                            <div className="minimal-card p-4 md:p-6 flex flex-col gap-6 hover:shadow-[0_20px_45px_rgba(0,0,0,0.02)] border border-brand-border/40 transition-all duration-300">
                                <div className="flex items-center gap-4 px-2">
                                    <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline-sm text-headline-sm text-brand-dark">Schedule Your 15-Minute Audit</h3>
                                        <p className="font-body-md text-body-md text-brand-gray-text">Select a time that works best for you to speak with our automation team.</p>
                                    </div>
                                </div>
                                
                                {/* Static Contact Form (Replaces broken Calendly) */}
                                <div className="w-full mt-4">
                                    <form className="w-full flex flex-col gap-4 bg-white rounded-xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-label-sm text-label-sm text-brand-dark uppercase tracking-wider">First Name</label>
                                                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded border border-brand-border bg-surface-bright focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-body-md text-brand-dark placeholder-brand-gray-text/50" required />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="font-label-sm text-label-sm text-brand-dark uppercase tracking-wider">Last Name</label>
                                                <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded border border-brand-border bg-surface-bright focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-body-md text-brand-dark placeholder-brand-gray-text/50" required />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="font-label-sm text-label-sm text-brand-dark uppercase tracking-wider">Email Address</label>
                                            <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded border border-brand-border bg-surface-bright focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-body-md text-brand-dark placeholder-brand-gray-text/50" required />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="font-label-sm text-label-sm text-brand-dark uppercase tracking-wider">Website URL</label>
                                            <input type="url" placeholder="https://yourcompany.com" className="w-full px-4 py-3 rounded border border-brand-border bg-surface-bright focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-body-md text-brand-dark placeholder-brand-gray-text/50" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="font-label-sm text-label-sm text-brand-dark uppercase tracking-wider">Biggest Bottleneck?</label>
                                            <select className="w-full px-4 py-3 rounded border border-brand-border bg-surface-bright focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-body-md text-brand-dark">
                                                <option>Lead Generation & Outreach</option>
                                                <option>Customer Support & Comment Replies</option>
                                                <option>Data Scraping & Competitor Tracking</option>
                                                <option>Other / Not Sure</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="font-label-sm text-label-sm text-brand-dark uppercase tracking-wider">Additional Details</label>
                                            <textarea rows="4" placeholder="Tell us a bit more about your workflow..." className="w-full px-4 py-3 rounded border border-brand-border bg-surface-bright focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-body-md text-brand-dark placeholder-brand-gray-text/50 resize-y"></textarea>
                                        </div>
                                        <button type="button" className="btn-primary w-full mt-2 rounded hover:shadow-lg transition-shadow">
                                            Request Free Audit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Sidebar container */}
                    <div className="lg:col-span-4 flex flex-col gap-6 w-full">
                        {/* Email Us Card */}
                        <ScrollReveal delay={300}>
                            <div className="minimal-card p-6 flex flex-col gap-6 hover:shadow-[0_20px_45px_rgba(0,0,0,0.02)] border border-brand-border/40 transition-all duration-300 h-full justify-between">
                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">mail</span>
                                    </div>
                                    <div>
                                        <h3 className="font-headline-sm text-headline-sm text-brand-dark mb-1">Prefer Email?</h3>
                                        <p className="font-body-md text-body-md text-brand-gray-text">
                                            Send us an email with your requirements and we'll reply within 24 hours.
                                        </p>
                                    </div>
                                </div>
                                <a href="mailto:hello@ecomauto.agency" className="btn-secondary w-full text-center border-2 border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 py-3 rounded-full font-label-md">
                                    hello@ecomauto.agency
                                </a>
                            </div>
                        </ScrollReveal>

                        {/* What to expect card */}
                        <ScrollReveal delay={450}>
                            <div className="minimal-card p-6 flex flex-col gap-4 border border-brand-border/40 bg-surface-container-lowest">
                                <h4 className="font-headline-xs text-headline-xs text-brand-dark font-bold">What's in the free audit?</h4>
                                <ul className="flex flex-col gap-3">
                                    <li className="flex gap-3 items-start font-body-md text-brand-gray-text">
                                        <span className="material-symbols-outlined text-brand-accent text-sm mt-1 shrink-0">check_circle</span>
                                        Workflow bottleneck review
                                    </li>
                                    <li className="flex gap-3 items-start font-body-md text-brand-gray-text">
                                        <span className="material-symbols-outlined text-brand-accent text-sm mt-1 shrink-0">check_circle</span>
                                        Custom automation blueprint
                                    </li>
                                    <li className="flex gap-3 items-start font-body-md text-brand-gray-text">
                                        <span className="material-symbols-outlined text-brand-accent text-sm mt-1 shrink-0">check_circle</span>
                                        Savings estimation calculation
                                    </li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
