import React from 'react';

const TricolorSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-[#0f172a]">
    <div className="relative w-20 h-20">
      {/* Outer Ring: Saffron, Clockwise */}
      <div className="absolute inset-0 border-[5px] border-transparent border-t-[#FF9933] rounded-full animate-spin"></div>
      
      {/* Middle Ring: White, Counter-Clockwise */}
      <div className="absolute inset-2 border-[5px] border-transparent border-b-white rounded-full animate-spin-reverse"></div>
      
      {/* Inner Ring: Green, Clockwise */}
      <div className="absolute inset-4 border-[5px] border-transparent border-t-[#138808] rounded-full animate-spin"></div>
    </div>
    
    <p className="mt-8 text-white font-black tracking-[0.2em] uppercase text-xs animate-pulse">
      Connecting authorized digital pipeline...
    </p>

    {/* Custom Tailwind keyframe for the reverse spin */}
    <style>{`
      @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }
      .animate-spin-reverse {
        animation: spin-reverse 1.5s linear infinite;
      }
    `}</style>
  </div>
);

export default TricolorSpinner;