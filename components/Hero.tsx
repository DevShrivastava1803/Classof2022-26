import React, { useEffect, useState } from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading a heavy cinematic asset
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Gradient & Blur */}
      <div className={`absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-black transition-opacity duration-[2000ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Abstract blurred shapes for that "University of Design" look */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gold-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl">
        <p className={`font-serif italic text-gold-500 text-xl md:text-2xl mb-6 tracking-wide transition-all duration-1000 delay-300 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          A Journey We’ll Always Carry
        </p>

        <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl text-stone-100 leading-[0.9] transition-all duration-1000 delay-500 transform ${loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          Batch <span className="block md:inline font-light italic text-stone-400">2022</span>—26
        </h1>

        <div className={`w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent my-12 transition-all duration-1000 delay-700 ${loaded ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}></div>

        <p className={`font-sans font-light text-stone-400 max-w-lg text-sm md:text-base leading-relaxed mb-12 transition-all duration-1000 delay-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Four years of laughter, late nights, and lessons learned. Join us as we look back on the moments that defined us.
        </p>

        <button 
          onClick={onStart}
          className={`group flex flex-col items-center gap-2 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 group-hover:text-gold-500 transition-colors">Start the Journey</span>
          <div className="h-16 w-px bg-stone-700 group-hover:h-24 group-hover:bg-gold-500 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-stone-200 animate-float opacity-50"></div>
          </div>
        </button>
      </div>
    </section>
  );
};