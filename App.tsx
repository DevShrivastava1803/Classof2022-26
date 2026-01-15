import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Timeline } from './components/Timeline';
import { Yearbook } from './components/Yearbook';
import { MediaVault } from './components/MediaVault';
import { MessageWall } from './components/MessageWall';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [showNav, setShowNav] = useState(false);

  // Simple handler to switch views with a scroll to top
  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startJourney = () => {
    setCurrentView('timeline');
    setShowNav(true);
  };

  useEffect(() => {
    if (currentView !== 'home') {
      setShowNav(true);
    } else {
        setShowNav(false);
    }
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* Navigation - Only visible after leaving home or clicking start */}
      {showNav && (
        <Navigation currentView={currentView} setView={handleViewChange} />
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <Hero onStart={startJourney} />
        )}

        {currentView === 'timeline' && (
          <div className="animate-fade-in">
             <Timeline />
             <div className="bg-stone-900 pb-20 text-center">
                 <button 
                    onClick={() => handleViewChange('yearbook')}
                    className="group inline-flex items-center gap-2 text-stone-400 hover:text-gold-500 transition-colors"
                 >
                    <span className="uppercase tracking-widest text-xs">Meet the Class</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                 </button>
             </div>
          </div>
        )}

        {currentView === 'yearbook' && (
          <div className="animate-fade-in">
            <Yearbook />
          </div>
        )}

        {currentView === 'vault' && (
          <div className="animate-fade-in">
            <MediaVault />
          </div>
        )}

        {currentView === 'wall' && (
          <div className="animate-fade-in">
            <MessageWall />
          </div>
        )}
      </main>

      {/* Footer - Only visible on content pages */}
      {currentView !== 'home' && <Footer />}
    </div>
  );
};

export default App;