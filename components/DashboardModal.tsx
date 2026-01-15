import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/DataRegistry';
import { FadeIn } from './ui/FadeIn';
import { FILTERS } from '../constants';

interface DashboardModalProps {
    onClose: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();
  const [name, setName] = useState('');
  const [major, setMajor] = useState(FILTERS[0]); // Default to first filter
  const [quote, setQuote] = useState('');
  const [socials, setSocials] = useState({ linkedin: '', instagram: '', twitter: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      // Load other profile data if it exists
      dataService.getProfile(user.id).then(profile => {
        if (profile) {
            setMajor(profile.major);
            setQuote(profile.quote);
            setSocials({
                linkedin: profile.socials?.linkedin || '',
                instagram: profile.socials?.instagram || '',
                twitter: profile.socials?.twitter || ''
            });
        }
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    
    // Mock save
    await dataService.updateProfile({
        id: user.id,
        name,
        major,
        quote,
        image: user.avatar_url || '',
        tags: ['Student'],
        socials
    });

    setMessage('Profile updated!');
    setIsSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSignOut = async () => {
      await signOut();
      onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Bokeh Background */}
        <div 
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity duration-500"
            onClick={onClose}
        >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Modal Container */}
        <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-stone-900/90 border border-gold-500/20 shadow-2xl backdrop-blur-xl">
            <FadeIn>
                <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-serif text-gold-400">My Profile</h1>
                            <p className="text-stone-400 mt-2 text-sm">Update your yearbook entry</p>
                        </div>
                        <div className="flex items-center gap-4">
                             <button
                                onClick={handleSignOut}
                                className="text-stone-400 hover:text-red-400 text-xs uppercase tracking-widest transition-colors"
                             >
                                Sign Out
                             </button>
                             <button 
                               onClick={onClose}
                               className="text-stone-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                             >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                             </button>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b border-stone-700 pb-8">
                        <div className="w-24 h-24 rounded-full bg-stone-700 overflow-hidden flex-shrink-0 border-2 border-gold-500/50">
                            {user?.avatar_url && <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />}
                        </div>
                        <div className="text-center md:text-left">
                           <h3 className="text-xl text-stone-200 font-serif">{user?.name}</h3>
                           <p className="text-stone-500 text-sm">{user?.email}</p>
                           <button className="mt-2 text-gold-500 text-sm hover:underline">Change Photo</button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-stone-950/50 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Major</label>
                                <div className="relative">
                                    <select
                                        value={major}
                                        onChange={(e) => setMajor(e.target.value)}
                                        className="w-full bg-stone-950/50 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                                    >
                                        {FILTERS.filter(f => f !== 'All Majors').map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                        {!FILTERS.includes(major) && major && <option value={major}>{major}</option>}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Instagram</label>
                                <input
                                    type="text"
                                    value={socials.instagram}
                                    onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                                    className="w-full bg-stone-950/50 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                                    placeholder="@username"
                                />
                            </div>
                            <div>
                                <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Twitter / X</label>
                                <input
                                    type="text"
                                    value={socials.twitter}
                                    onChange={(e) => setSocials({...socials, twitter: e.target.value})}
                                    className="w-full bg-stone-950/50 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                                    placeholder="@username"
                                />
                            </div>
                            <div>
                                <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">LinkedIn</label>
                                <input
                                    type="text"
                                    value={socials.linkedin}
                                    onChange={(e) => setSocials({...socials, linkedin: e.target.value})}
                                    className="w-full bg-stone-950/50 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                                    placeholder="Profile URL"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Yearbook Quote</label>
                            <textarea
                                value={quote}
                                onChange={(e) => setQuote(e.target.value)}
                                className="w-full bg-stone-950/50 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors h-32 resize-none"
                                placeholder="Your parting words..."
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-stone-700">
                            <span className="text-green-400">{message}</span>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-stone-400 hover:text-white px-6 py-3 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-gold-600 hover:bg-gold-500 text-stone-900 font-bold py-3 px-8 rounded transition-colors disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </FadeIn>
        </div>
    </div>
  );
};
