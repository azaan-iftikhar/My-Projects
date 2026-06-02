import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-surface text-primary font-body-md text-body-md border-t border-outline-variant w-full bottom-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full px-section-padding-sm lg:px-section-padding-lg py-16 max-w-container-max mx-auto">
                <div className="flex flex-col gap-4">
                    {/* Vendrix Automation logo in footer */}
                    <div className="flex items-center gap-3 mb-1">
                        <svg width="46" height="28" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M26 16 C23 10 17 5 11 5 C5 5 1 10 1 16 C1 22 5 27 11 27 C17 27 23 22 26 16 C29 10 35 5 42 5 C48 5 55 10 55 16 C55 22 48 27 42 27 C35 27 29 22 26 16 Z" stroke="#e53e3e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                        <div className="flex flex-col leading-none">
                            <span className="text-[18px] font-extrabold tracking-tight text-on-surface">Vendrix</span>
                            <span className="text-[8px] font-semibold tracking-[0.18em] text-secondary uppercase mt-0.5">Automation</span>
                        </div>
                    </div>
                    <p className="text-secondary mb-4">© 2024 Vendrix Automation. All rights reserved.</p>
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
