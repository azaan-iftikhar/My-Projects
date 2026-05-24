import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

// Team member data with professional high-quality photos from Unsplash
const teamData = [
  {
    id: 1,
    name: "Azaan Iftikhar",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600",
    bio: "Visionary strategist leading ECOM-AUTO's expansion. Architect of core custom automation frameworks for top-tier DTC and Amazon storefronts."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "CTO & Lead Architect",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=600",
    bio: "Pioneering distributed cloud systems and AI agents. Ensures ECOM-AUTO workflows run with 99.9% uptime at scale."
  },
  {
    id: 3,
    name: "David Chen",
    role: "Head of AI Integrations",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600",
    bio: "Large Language Model tuning expert. Designs advanced custom product description engines and website chatbot systems."
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Senior Automation Engineer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600&h=600",
    bio: "Master of workflow orchestration. Specializes in building headless scraping scripts, API connections, and cross-channel database synching."
  },
  {
    id: 5,
    name: "Marcus Vance",
    role: "Product & Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=600",
    bio: "Ensures seamless automation handoffs. Bridges client e-commerce goals with technical workflow pipelines for fast, high-ROI deployment."
  }
];

const About = () => {
  // Store loading states for individual images to display a premium shimmer effect
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="w-full bg-surface-bright py-section-padding-sm md:py-section-padding-lg flex flex-col justify-center">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full">
        
        {/* Goal/Mission Section */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <span className="text-brand-accent font-label-md text-label-md tracking-widest uppercase mb-3 block">
              OUR MISSION & GOAL
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark mb-6">
              Empowering E-Commerce Through Intelligent Automation
            </h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mb-8 rounded-full"></div>
            <p className="font-body-lg text-body-lg text-brand-gray-text leading-relaxed">
              At ECOM-AUTO, our goal is to eliminate repetitive manual processes for modern digital sellers. 
              We build high-performance AI systems, scraping agents, and automated lead qualifiers so your team can focus exclusively on growth, product excellence, and brand expansion.
            </p>
          </div>
        </ScrollReveal>

        {/* Team Section Header */}
        <ScrollReveal delay={100}>
          <div className="text-center mb-12">
            <h3 className="font-headline-md text-headline-md text-brand-dark mb-3">
              Meet The Innovators
            </h3>
            <p className="font-body-md text-body-md text-brand-gray-text">
              The experts behind our industry-leading custom e-commerce automation systems
            </p>
          </div>
        </ScrollReveal>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch justify-center">
          {teamData.map((member, idx) => (
            <ScrollReveal key={member.id} delay={150 + idx * 50}>
              <div className="minimal-card h-full flex flex-col p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-brand-accent hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] group">
                
                {/* Image Frame with skeleton load shimmer */}
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-brand-border group-hover:border-brand-accent transition-colors duration-300 bg-surface-container-low shrink-0">
                  <div className={`absolute inset-0 img-skeleton ${loadedImages[member.id] ? 'loaded' : ''}`} />
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover zoomable-image transition-opacity duration-300 ${
                      loadedImages[member.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(member.id)}
                    loading="lazy"
                  />
                </div>

                {/* Team Member Details */}
                <h4 className="font-headline-sm text-headline-sm text-brand-dark mb-1 font-bold group-hover:text-brand-accent transition-colors">
                  {member.name}
                </h4>
                <p className="font-label-md text-label-md text-brand-accent uppercase tracking-wider mb-4 font-semibold">
                  {member.role}
                </p>
                <p className="font-body-md text-body-md text-brand-gray-text leading-relaxed flex-grow">
                  {member.bio}
                </p>

                {/* Micro-interactive social contact triggers */}
                <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-brand-border/60">
                  <a
                    href="#contact"
                    className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-gray-text hover:text-brand-accent hover:border-brand-accent transition-colors duration-200"
                    title={`Connect with ${member.name}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-gray-text hover:text-brand-accent hover:border-brand-accent transition-colors duration-200"
                    title={`${member.name} on LinkedIn`}
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </a>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
