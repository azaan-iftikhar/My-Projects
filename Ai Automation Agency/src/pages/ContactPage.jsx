import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="antialiased font-body-md text-body-md selection:bg-brand-accent selection:text-white flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center bg-surface-bright">
          <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
