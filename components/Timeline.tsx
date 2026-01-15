import React from 'react';
import { TIMELINE_EVENTS } from '../constants';
import { FadeIn } from './ui/FadeIn';

export const Timeline: React.FC = () => {
  return (
    <div className="relative min-h-screen py-32 px-4 md:px-0 bg-stone-900 overflow-hidden">
      
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-800 md:-translate-x-1/2">
        <div className="sticky top-[50vh] w-full h-32 bg-gradient-to-b from-gold-500 to-transparent opacity-50 blur-[1px]"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-32 relative z-10">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full border border-gold-500/20 bg-gold-500/5 text-gold-500 text-xs tracking-widest uppercase mb-4">
              Our History
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-100">The Journey: 2022-2026</h2>
          </FadeIn>
        </div>

        {/* Events */}
        <div className="space-y-32">
          {TIMELINE_EVENTS.map((event, index) => (
            <div key={index} className="relative group">
              
              {/* Year Marker */}
              <FadeIn className="flex md:justify-center items-center mb-8 md:mb-0 relative z-10">
                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center size-14 rounded-full bg-stone-900 border border-stone-700 group-hover:border-gold-500 shadow-2xl transition-colors duration-500">
                  <span className="font-serif font-bold text-gold-500">{event.year}</span>
                </div>
                {/* Mobile Title adjacent to year */}
                <div className="pl-20 md:hidden">
                    <h3 className="text-2xl font-bold font-serif text-stone-200">{event.title}</h3>
                </div>
              </FadeIn>

              {/* Content Layout */}
              <div className={`flex flex-col md:flex-row items-center w-full ${event.align === 'right' ? 'md:flex-row-reverse' : ''} ${event.align === 'center' ? 'justify-center' : ''}`}>
                
                {/* Image Section */}
                <div className={`w-full ${event.align === 'center' ? 'md:w-2/3 mx-auto' : 'md:w-1/2'} p-6 md:p-12`}>
                  <FadeIn delay={200} className={`transform transition-all duration-500 group-hover:scale-[1.02] ${event.align === 'right' ? 'rotate-1' : '-rotate-1'} group-hover:rotate-0`}>
                    <div className="bg-stone-200 p-3 pb-12 shadow-2xl shadow-black/50">
                      <div className="aspect-[4/3] bg-stone-800 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out">
                         <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
                      </div>
                      <p className="font-handwriting text-stone-800 text-center text-xl mt-4 transform -rotate-1 opacity-90">
                        {event.caption}
                      </p>
                    </div>
                  </FadeIn>
                </div>

                {/* Text Section (Hidden on mobile for center alignment logic simplicity, shown below for others) */}
                {event.align !== 'center' && (
                  <div className="w-full md:w-1/2 p-6 md:p-12 md:text-left">
                    <FadeIn delay={400}>
                      <h3 className="hidden md:block text-3xl font-serif font-bold text-stone-200 mb-4">{event.title}</h3>
                      <p className="text-stone-400 text-lg font-light leading-relaxed">
                        {event.description}
                      </p>
                    </FadeIn>
                  </div>
                )}
                
                {/* Center alignment Text (Bottom) */}
                {event.align === 'center' && (
                   <div className="w-full text-center px-6 mt-8">
                     <FadeIn delay={400}>
                        <p className="text-xl md:text-2xl font-serif text-stone-200 max-w-2xl mx-auto">
                          {event.description}
                        </p>
                     </FadeIn>
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* End of Timeline Connector */}
        <div className="h-32 w-px bg-gradient-to-b from-stone-800 to-transparent mx-auto mt-12"></div>
      </div>
    </div>
  );
};