import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    question: "What systems and platforms can you automate?",
    answer: "We seamlessly automate operations across all major e-commerce storefronts (Amazon, eBay, Shopify, WooCommerce, Etsy) and integrate them with tools like n8n, Make.com, Zapier, Google Sheets, WhatsApp, Slack, and custom OpenAI/Claude models."
  },
  {
    question: "Will I need to share my account passwords with your agency?",
    answer: "Absolutely not. Security is our absolute priority. We configure all automations using secure API tokens, developer credentials, and OAuth permissions. You retain full control, and we never ask for your raw passwords."
  },
  {
    question: "How much time and money can I expect to save?",
    answer: "On average, our clients save between 15 to 30 hours per week of manual labor. By automating product hunting, email sequences, and customer comments, you eliminate the need for costly Virtual Assistants and manual data-entry errors."
  },
  {
    question: "Can your AI handle customer replies without making embarrassing mistakes?",
    answer: "Yes. We build custom guards, prompt instructions, and inject a closed knowledge base of your products. The AI is programmed to only answer when it is 100% confident; if it encounters a complex inquiry, it flags it for human review."
  },
  {
    question: "Do you offer maintenance support after the setup is complete?",
    answer: "Yes, we do! API endpoints, website layouts, and platforms change over time. We provide premium monthly maintenance support plans to actively monitor, debug, and optimize your workflows 24/7 so they never break."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-surface py-section-padding-sm md:py-section-padding-lg">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
        <ScrollReveal>
          <div className="mb-12 text-center">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile lg:font-headline-lg lg:text-headline-lg text-brand-dark mb-4">Frequently Asked Questions</h2>
              <p className="font-body-lg text-body-lg text-brand-gray-text max-w-2xl mx-auto">Everything you need to know about integrating AI automation into your e-commerce operations.</p>
          </div>
        </ScrollReveal>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="minimal-card px-6 py-4 cursor-pointer hover:shadow-md transition-shadow duration-300 transition-all hover:scale-[1.02]" onClick={() => toggleFAQ(index)}>
                <div className="flex justify-between items-center gap-4">
                  <h3 className={`font-headline-sm text-headline-sm transition-colors ${openIndex === index ? 'text-brand-accent' : 'text-brand-dark'}`}>
                    {faq.question}
                  </h3>
                  <span className={`material-symbols-outlined text-brand-dark transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand-accent' : ''}`}>
                    expand_more
                  </span>
                </div>
                <div className={`grid transition-all duration-300 overflow-hidden ${openIndex === index ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="min-h-0">
                    <p className="font-body-md text-body-md text-brand-gray-text leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
