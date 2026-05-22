import React from 'react';

const SectionDivider = () => {
  return (
    <div className="relative w-full overflow-hidden py-16 md:py-24 flex justify-center items-center pointer-events-none">
      {/* Massive Ambient Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-accent/[0.03] blur-[120px] rounded-[100%] pointer-events-none"></div>
      
      {/* Secondary Soft Glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-brand-dark/[0.02] blur-[100px] rounded-[100%] pointer-events-none"></div>
    </div>
  );
};

export default SectionDivider;
