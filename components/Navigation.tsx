import React, { useState } from 'react';
import { ViewState } from '../types';

import { User } from '../services/types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogin: () => void;
  onProfile: () => void;
  user: User | null;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, onLogin, onProfile, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: ViewState }[] = [
    { label: 'The Journey', value: 'timeline' },
    { label: 'Yearbook', value: 'yearbook' },
    { label: 'Media Vault', value: 'vault' },
    { label: 'The Wall', value: 'wall' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 md:px-12 md:py-6 bg-stone-900/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="size-8 flex items-center justify-center border border-gold-500/30 rounded-full text-gold-500 group-hover:bg-gold-500 group-hover:text-stone-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.24 50.552 50.552 0 00-2.658.813m-15.482 0A50.55 50.55 0 0112 13.489a50.55 50.55 0 0112-1.586m-13.819-5.819A24.9 24.9 0 0112 5.586a24.9 24.9 0 006.192.621" />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight font-serif text-stone-100">Batch '26</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setView(item.value)}
              className={`text-sm font-medium transition-all duration-300 relative ${
                currentView === item.value 
                  ? 'text-gold-500' 
                  : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              {item.label}
              {currentView === item.value && (
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gold-500 animate-fade-in" />
              )}
            </button>
          ))}
          
          {user ? (
              <button 
                onClick={onProfile}
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider bg-gold-500/10 text-gold-500 hover:bg-gold-500 hover:text-stone-900 border border-gold-500/50 rounded-full transition-all duration-300"
              >
                <span>{user.name}</span>
                <div className="w-5 h-5 rounded-full bg-gold-500 text-stone-900 flex items-center justify-center overflow-hidden">
                    {user.avatar_url ? (
                        <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
              </button>
          ) : (
              <button 
                onClick={onLogin}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-gold-500 hover:text-stone-900 border border-white/10 rounded-full transition-all duration-300"
              >
                Sign In
              </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-stone-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-stone-900 border-b border-white/10 p-4 flex flex-col gap-4 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setView(item.value);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-medium py-2 ${
                currentView === item.value ? 'text-gold-500' : 'text-stone-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};