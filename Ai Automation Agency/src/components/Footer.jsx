import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface text-primary font-body-md text-body-md border-t border-outline-variant w-full bottom-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full px-section-padding-sm lg:px-section-padding-lg py-16 max-w-container-max mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">ECOM-AUTO</div>
                    <p className="text-secondary mb-4">© 2024 Ecommerce Automation Agency. All rights reserved.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="font-bold text-on-surface mb-1">Navigation</span>
                    <Link className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" to="/">Home</Link>
                    <Link className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" to="/about">About Us</Link>
                    <Link className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" to="/contact">Contact Us</Link>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="font-bold text-on-surface mb-1">Connect</span>
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="https://linkedin.com">LinkedIn</a>
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="https://github.com">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
