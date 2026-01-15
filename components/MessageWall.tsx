import React, { useState, useEffect } from 'react';
import { FadeIn } from './ui/FadeIn';
import { WallMessage } from '../types';
import { dataService } from '../services/DataRegistry';
import { useAuth } from '../context/AuthContext';

// Paper styles for the sticky notes
const PAPER_STYLES = {
  'paper-1': 'bg-[#fdfbf7] bg-gradient-to-br from-[#fdfbf7] to-[#f7f1e3]',
  'paper-2': 'bg-[#f4e4bc] bg-gradient-to-br from-[#f4e4bc] to-[#e6d2a0]',
  'paper-3': 'bg-[#e3d5b8] bg-gradient-to-br from-[#e3d5b8] to-[#d4c5a8]',
  'paper-4': 'bg-[#fffdf0] bg-gradient-to-br from-[#fffdf0] to-[#fef9e0]',
};

export const MessageWall: React.FC = () => {
  const [messages, setMessages] = useState<WallMessage[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is logged in, auto-fill name
    if (user) {
        setAuthorName(user.name);
    }
  }, [user]);

  useEffect(() => {
    const fetchMessages = async () => {
        setLoading(true);
        const msgs = await dataService.getMessages();
        setMessages(msgs);
        setLoading(false);
    };
    fetchMessages();
  }, []);

  const handlePostMessage = async () => {
    if (!newMessageText.trim()) return;
    
    // Determine author name
    let finalAuthor = "Anonymous";
    if (!isAnonymous) {
        finalAuthor = authorName.trim() || "Anonymous";
    }

    const styles: ('paper-1' | 'paper-2' | 'paper-3' | 'paper-4')[] = ['paper-1', 'paper-2', 'paper-3', 'paper-4'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    
    const newMsg = await dataService.postMessage({
        text: newMessageText,
        author: finalAuthor,
        style: randomStyle,
        major: (!isAnonymous && user?.name === finalAuthor) ? 'Student' : undefined
    });

    // Update local state immediately
    setMessages([newMsg, ...messages]);

    setIsWriting(false);
    setNewMessageText('');
    setIsAnonymous(false);
    // Reset name to user's name if logged in, otherwise clear
    if (user) {
        setAuthorName(user.name);
    } else {
        setAuthorName('');
    }
  };

  if (loading) return <div className="text-center py-20 text-gold-500">Loading Wall...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans py-32 px-4 md:px-6 relative overflow-x-hidden selection:bg-gold-500 selection:text-white">
      
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto mb-16 text-center">
        <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold-500 text-xs font-bold uppercase tracking-wider mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                Final Goodbyes
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
                Message Wall of Reflection
            </h1>
            <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
                A space to leave your final words, memories, and wishes. These notes will remain here as a testament to our journey.
            </p>
        </FadeIn>
      </div>

      {/* Write Message Modal Overlay */}
      {isWriting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
           <div className="bg-stone-100 max-w-lg w-full rounded-lg p-6 shadow-2xl transform rotate-1 relative">
              <button 
                onClick={() => setIsWriting(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="font-handwriting text-3xl text-stone-800 mb-4">Leave a Note...</h3>
              <textarea 
                className="w-full h-40 bg-transparent border-b-2 border-stone-200 focus:border-gold-500 focus:outline-none font-handwriting text-xl text-stone-800 resize-none p-2 placeholder:text-stone-400"
                placeholder="I'll never forget..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
              />
              <div className="flex flex-col gap-3 mt-4">
                  <input 
                     type="text"
                     placeholder="Your Name (Optional)"
                     className={`w-full bg-transparent border-b-2 border-stone-200 focus:border-gold-500 focus:outline-none font-sans text-stone-800 p-2 placeholder:text-stone-400 transition-opacity ${isAnonymous ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                     value={authorName}
                     onChange={(e) => setAuthorName(e.target.value)}
                     disabled={isAnonymous}
                  />
                  
                  <label className="flex items-center gap-2 cursor-pointer group select-none">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isAnonymous ? 'bg-gold-500 border-gold-500' : 'border-stone-400 group-hover:border-gold-500'}`}>
                          {isAnonymous && (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
                                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                              </svg>
                          )}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={isAnonymous} 
                        onChange={(e) => setIsAnonymous(e.target.checked)} 
                      />
                      <span className="text-stone-600 text-sm font-medium">Keep it mysterious (Post Anonymously)</span>
                  </label>
              </div>
              <div className="mt-6 flex justify-end">
                 <button 
                    onClick={handlePostMessage}
                    className="bg-stone-900 text-white px-6 py-2 rounded-full font-bold hover:bg-gold-500 hover:text-stone-900 transition-colors"
                 >
                    Pin to Wall
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Masonry Grid */}
      <div className="max-w-[1200px] mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8 px-2 pb-24">
        {messages.map((msg, index) => (
            <div key={msg.id} className={`break-inside-avoid relative group transition-all duration-300 hover:z-20 hover:scale-105 hover:rotate-0 ${msg.rotation}`}>
                <FadeIn delay={index * 50}>
                    {/* Tape */}
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm z-10 ${msg.tapeRotation}`}></div>
                    
                    {/* Card Body */}
                    <div className={`${PAPER_STYLES[msg.style]} p-6 rounded-sm shadow-xl text-stone-900 flex flex-col gap-4 relative`}>
                        {msg.image && (
                            <div className="w-full h-40 bg-stone-200 rounded-sm mb-2 overflow-hidden relative grayscale-[0.3] contrast-125">
                                <img src={msg.image} alt="Memory" className="w-full h-full object-cover" />
                            </div>
                        )}
                        
                        <div className="font-handwriting text-2xl leading-relaxed text-stone-800 font-medium">
                            "{msg.text}"
                        </div>
                        
                        {msg.tags && (
                            <div className="flex flex-wrap gap-2 my-1">
                                {msg.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-yellow-900/10 rounded text-xs font-sans text-yellow-900 font-bold opacity-70">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mt-2 border-t border-stone-900/10 pt-3 flex justify-between items-end">
                            <div>
                                <p className="font-serif font-bold text-lg leading-none">{msg.author}</p>
                                {msg.major && <p className="font-sans text-xs text-stone-600 mt-1 uppercase tracking-wide">{msg.major}</p>}
                            </div>
                            <span className="font-sans text-[10px] text-stone-500">{msg.date}</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40 group">
        <button 
            onClick={() => setIsWriting(true)}
            className="flex items-center justify-center size-14 md:w-auto md:h-14 md:px-8 bg-gold-500 text-stone-900 rounded-full shadow-[0_4px_20px_rgba(236,164,19,0.4)] hover:shadow-[0_4px_30px_rgba(236,164,19,0.6)] hover:-translate-y-1 transition-all duration-300"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span className="hidden md:block ml-2 font-bold font-sans tracking-wide">Write a Message</span>
        </button>
      </div>

    </div>
  );
};