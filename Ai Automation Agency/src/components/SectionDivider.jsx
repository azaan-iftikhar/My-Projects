import React from 'react';

const SectionDivider = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 flex justify-center items-center">
      {/* Laser Faded Line */}
      <div className="w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"></div>
      
      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-20 bg-brand-accent/5 blur-[40px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default SectionDivider;
