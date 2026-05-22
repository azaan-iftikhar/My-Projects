import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-surface text-primary border-b border-outline-variant font-body-md text-body-md sticky w-full top-0 z-50">
      <div className="flex justify-between items-center w-full px-section-padding-sm lg:px-gutter max-w-container-max mx-auto h-20">
        <div className="font-headline-sm text-headline-sm font-extrabold tracking-tighter text-on-surface">
            ECOM-AUTO
        </div>
        <div className="hidden md:flex items-center space-x-8">
            <a className="text-primary font-bold border-b-2 border-brand-accent pb-1" href="#">HOME</a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
            <a className="text-secondary hover:text-on-surface font-semibold" href="#">Login</a>
            <a className="btn-secondary h-[40px] opacity-80 scale-95 transition-all hover:opacity-100 hover:scale-100" href="#">Register Now</a>
        </div>
        <button className="md:hidden text-on-surface p-2">
            <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
