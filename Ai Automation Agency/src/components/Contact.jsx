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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Meeting Schedule Card */}
                    <ScrollReveal delay={150}>
                        <div className="minimal-card p-8 flex flex-col items-center text-center gap-6 hover:shadow-[0_20px_45px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:scale-[1.02] border border-transparent hover:border-brand-accent/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-2">
                                <span className="material-symbols-outlined text-[40px]">calendar_month</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-brand-dark mb-2">Schedule a Meeting</h3>
                                <p className="font-body-md text-body-md text-brand-gray-text mb-6">
                                    Book a 15-minute free discovery call to discuss your ecommerce workflow bottlenecks.
                                </p>
                            </div>
                            <a href="https://calendly.com/ecomauto_ai/30min" className="btn-primary w-full shadow-[0_4px_15px_rgba(229,62,62,0.2)] hover:shadow-[0_8px_25px_rgba(229,62,62,0.3)] transition-all duration-300">
                                Schedule a meeting
                            </a>
                        </div>
                    </ScrollReveal>

                    {/* Email Us Card */}
                    <ScrollReveal delay={300}>
                        <div className="minimal-card p-8 flex flex-col items-center text-center gap-6 hover:shadow-[0_20px_45px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:scale-[1.02] border border-transparent hover:border-brand-accent/20 transition-all duration-300">
                            <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-2">
                                <span className="material-symbols-outlined text-[40px]">mail</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-headline-sm text-brand-dark mb-2">Email Us</h3>
                                <p className="font-body-md text-body-md text-brand-gray-text mb-6">
                                    Prefer writing? Send us an email with your requirements and we'll get back to you within 24 hours.
                                </p>
                            </div>
                            <a href="mailto:hello@ecomauto.agency" className="btn-secondary w-full border-2 border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300">
                                hello@ecomauto.agency
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
