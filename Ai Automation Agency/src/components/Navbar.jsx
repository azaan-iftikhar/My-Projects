import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-surface text-primary border-b border-outline-variant font-body-md text-body-md sticky w-full top-0 z-50">
      <div className="flex justify-between items-center w-full px-section-padding-sm lg:px-gutter max-w-container-max mx-auto h-20">
        <div className="font-headline-sm text-headline-sm font-extrabold tracking-tighter text-on-surface">
            ECOM-AUTO
        </div>
        <div className="hidden md:flex items-center space-x-8">
            <Link className="text-primary font-bold border-b-2 border-brand-accent pb-1" to="/">HOME</Link>
            <Link className="text-secondary hover:text-on-surface font-semibold transition-colors" to="/contact">CONTACT US</Link>
        </div>
        <button className="md:hidden text-on-surface p-2">
            <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
