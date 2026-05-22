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
        <div className="font-headline-sm text-headline-sm font-extrabold tracking-tighter text-on-surface">
            ECOM-AUTO
        </div>
        <div className="hidden md:flex items-center space-x-8">
            <Link className={isActive("/")} to="/">HOME</Link>
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
              <Link onClick={() => setIsMobileMenuOpen(false)} className={isActive("/contact")} to="/contact">CONTACT US</Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
