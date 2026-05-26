import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

// Team member data with professional high-quality photos from Unsplash
const teamData = [
  {
    id: 1,
    name: "Fawad",
    role: "Product & Customer Automation Specialist",
    image: "/assets/fawad-face-image.jpeg",
    bio: "Pioneers customer journey automation. Integrates customized AI agents and automated support pipelines to streamline operations and enhance retention."
  },
  {
    id: 2,
    name: "Iqra Iqbal",
    role: "Email Marketing Automation Specialist",
    image: "/assets/iqra-iqbal-face-image.jpeg",
    bio: "Turns manual e-commerce marketing workflows into automated revenue systems. Expert in building cold outreach pipelines and high-converting CRM integrations."
  }
];

// Helper to render formatting and bullet lists dynamically in team bios
const renderBio = (bio) => {
  const hasList = bio.includes('\n-') || bio.startsWith('-');
  if (!hasList) {
    return (
      <p className="font-body-md text-body-md text-brand-gray-text leading-relaxed flex-grow text-center">
        {bio}
      </p>
    );
  }

  const parts = [];
  const lines = bio.split('\n');
  let currentList = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      continue;
    }

    if (line.startsWith('-')) {
      if (!currentList) {
        currentList = [];
        parts.push({ type: 'list', items: currentList });
      }

      const content = line.substring(1).trim();
      const boldMatch = content.match(/^\*([^*]+)\*:(.*)$/) || content.match(/^_(.*)_:(.*)$/) || content.match(/^([^:]+):(.*)$/);
      if (boldMatch) {
        currentList.push(
          <span key={i}>
            <strong>{boldMatch[1].trim()}:</strong>{boldMatch[2]}
          </span>
        );
      } else {
        currentList.push(<span key={i}>{content}</span>);
      }
    } else {
      currentList = null;
      parts.push({ type: 'paragraph', text: line });
    }
  }

  return (
    <div className="font-body-sm text-body-sm text-brand-gray-text leading-relaxed text-left flex-grow space-y-3 mt-3">
      {parts.map((part, idx) => {
        if (part.type === 'list') {
          return (
            <ul key={idx} className="list-disc pl-4 space-y-2">
              {part.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-left text-brand-gray-text">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="text-left text-brand-gray-text font-semibold">
            {part.text}
          </p>
        );
      })}
    </div>
  );
};

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
              Meet Our Experts
            </h3>
            <p className="font-body-md text-body-md text-brand-gray-text">
              The experts behind our industry-leading custom e-commerce automation systems
            </p>
          </div>
        </ScrollReveal>

        {/* Team Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {teamData.map((member, idx) => (
            <ScrollReveal
              key={member.id}
              delay={150 + idx * 50}
              className="w-full md:w-[calc(50%-12px)] max-w-sm flex"
            >
              <div className="minimal-card w-full h-full flex flex-col p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:border-brand-accent hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] group">

                {/* Image Frame with skeleton load shimmer */}
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-brand-border group-hover:border-brand-accent transition-colors duration-300 bg-surface-container-low shrink-0">
                  <div className={`absolute inset-0 img-skeleton ${loadedImages[member.id] ? 'loaded' : ''}`} />
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover zoomable-image transition-opacity duration-300 ${loadedImages[member.id] ? 'opacity-100' : 'opacity-0'
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
                {renderBio(member.bio)}

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
