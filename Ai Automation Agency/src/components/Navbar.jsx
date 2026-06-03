import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic active link styling
  const isActive = (path) => {
      return location.pathname === path 
          ? "text-primary font-bold border-b-2 border-brand-accent pb-1" 
          : "text-secondary hover:text-on-surface font-semibold transition-colors";
  };

  return (
    <nav className="bg-surface text-primary border-b border-outline-variant font-body-md text-body-md sticky w-full top-0 z-50">
      <div className="flex justify-between items-center w-full px-section-padding-sm lg:px-gutter max-w-container-max mx-auto h-20">
        {/* ── Vendrix Automation Inline SVG Logo ── */}
        <a href="/" className="flex items-center gap-3 select-none" aria-label="Vendrix Automation – Home">
          {/* Infinity loop icon — single continuous path crossing at center */}
          <svg width="56" height="32" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Single continuous infinity path — crosses itself at center (28,16) */}
            <path
              d="M26 16 C23 10 17 5 11 5 C5 5 1 10 1 16 C1 22 5 27 11 27 C17 27 23 22 26 16 C29 10 35 5 42 5 C48 5 55 10 55 16 C55 22 48 27 42 27 C35 27 29 22 26 16 Z"
              stroke="#e53e3e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
          </svg>
          {/* Wordmark */}
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-extrabold tracking-tight text-brand-dark" style={{fontFamily:'Inter,sans-serif'}}>Vendrix</span>
            <span className="text-[9px] font-semibold tracking-[0.18em] text-brand-gray-text uppercase mt-0.5">Automation</span>
          </div>
        </a>
        <div className="hidden md:flex items-center space-x-8">
            <Link className={isActive("/")} to="/">HOME</Link>
            <Link className={isActive("/about")} to="/about">ABOUT US</Link>
            <Link className={isActive("/contact")} to="/contact">CONTACT US</Link>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-on-surface p-2 focus:outline-none">
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown Slider */}
      <div className={`md:hidden absolute w-full bg-surface border-b border-outline-variant transition-all duration-300 overflow-hidden shadow-lg ${isMobileMenuOpen ? 'max-h-64 border-opacity-100' : 'max-h-0 border-opacity-0'}`}>
          <div className="flex flex-col items-center py-6 gap-6">
              <Link onClick={() => setIsMobileMenuOpen(false)} className={isActive("/")} to="/">HOME</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className={isActive("/about")} to="/about">ABOUT US</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className={isActive("/contact")} to="/contact">CONTACT US</Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
