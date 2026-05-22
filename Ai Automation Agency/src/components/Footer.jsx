import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-surface text-primary font-body-md text-body-md border-t border-outline-variant w-full bottom-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full px-section-padding-sm lg:px-section-padding-lg py-16 max-w-container-max mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">ECOM-AUTO</div>
                    <p className="text-secondary mb-4">© 2024 Ecommerce Automation Agency. All rights reserved.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="#">Quick Links</a>
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="#">Privacy Policy</a>
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="#">Terms of Service</a>
                </div>
                <div className="flex flex-col gap-3">
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="#">Social Media</a>
                    <a className="text-secondary hover:text-brand-accent transition-colors focus:ring-2 focus:ring-brand-accent w-fit" href="#">Contact Info</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
