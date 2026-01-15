import React, { useState, useEffect } from 'react';
import { FadeIn } from './ui/FadeIn';
import { VaultItem } from '../types';
import { dataService } from '../services/DataRegistry';
import { useAuth } from '../context/AuthContext';

const FILTERS = ['All Memories', 'Freshman', 'Sophomore', 'Junior', 'Convocation', 'User Upload'];

export const MediaVault: React.FC = () => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('All Memories');
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
        setLoading(true);
        const data = await dataService.getMedia();
        setItems(data);
        setLoading(false);
    };
    fetchMedia();
  }, []);

  const handleUploadClick = () => {
      // Trigger hidden file input
      document.getElementById('vault-upload-input')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setUploadFile(e.target.files[0]);
          setIsUploading(true);
      }
  };

  const performUpload = async () => {
      if (!uploadFile || !user) return;
      setUploadLoading(true);
      
      try {
          const newItem = await dataService.uploadMedia(uploadFile, uploadCaption, user);
          setItems([newItem, ...items]);
          setIsUploading(false);
          setUploadCaption('');
          setUploadFile(null);
      } catch (error) {
          console.error("Upload failed", error);
          alert("Simulation: Upload failed.");
      } finally {
          setUploadLoading(false);
      }
  };

  const filteredItems = items.filter(item => {
      if (activeFilter === 'All Memories') return true;
      return item.tags.includes(activeFilter);
  });

  if (loading) return <div className="text-center py-20 text-gold-500">Loading Vault...</div>;

  return (
    <div className="min-h-screen bg-stone-950 py-32 px-4 md:px-12 relative overflow-hidden">
      {/* Background Bokeh Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-800/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800/50 mb-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-stone-100">The Archive</h1>
              <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mt-2">
                A cinematic collection of fleeting moments, frozen in time. From the first lecture to the final goodbye.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <div className="flex gap-4">
                <button className="group flex items-center gap-2 px-6 py-3 bg-transparent border border-stone-700 hover:border-gold-500 hover:bg-stone-900 rounded-full transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gold-500 group-hover:rotate-180 transition-transform duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span className="text-stone-200 font-medium text-sm tracking-wide group-hover:text-gold-500">Random Moment</span>
                </button>
                
                {user && (
                    <>
                        <input 
                            type="file" 
                            id="vault-upload-input" 
                            className="hidden" 
                            accept="image/*,video/*"
                            onChange={handleFileChange} 
                        />
                        <button 
                            onClick={handleUploadClick}
                            className="flex items-center gap-2 px-6 py-3 bg-gold-600 border border-gold-600 hover:bg-gold-500 rounded-full transition-colors text-stone-900 font-bold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Upload</span>
                        </button>
                    </>
                )}
            </div>
          </FadeIn>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center mb-10">
            {FILTERS.map((filter, index) => (
                <FadeIn key={filter} delay={index * 50}>
                    <button 
                        onClick={() => setActiveFilter(filter)}
                        className={`h-9 px-5 rounded-full font-medium text-sm transition-all hover:scale-105 ${
                            activeFilter === filter
                            ? 'bg-gold-500 text-stone-900 shadow-lg shadow-gold-500/20'
                            : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-100 hover:border-gold-500/40 hover:bg-stone-800'
                        }`}
                    >
                        {filter}
                    </button>
                </FadeIn>
            ))}
        </div>

        {/* Upload Modal */}
        {isUploading && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-stone-900 border border-stone-700 max-w-lg w-full rounded-lg p-6 shadow-2xl relative">
                   <h3 className="text-2xl font-serif text-stone-200 mb-4">Add to Vault</h3>
                   <div className="mb-4">
                       {uploadFile && (
                           <div className="bg-stone-800 p-2 rounded text-sm text-stone-400 truncate">
                               {uploadFile.name}
                           </div>
                       )}
                   </div>
                   <input
                       type="text"
                       placeholder="Add a caption..."
                       value={uploadCaption}
                       onChange={(e) => setUploadCaption(e.target.value)}
                       className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-200 focus:border-gold-500 focus:outline-none mb-6"
                       autoFocus
                   />
                   <div className="flex justify-end gap-3">
                       <button 
                          onClick={() => { setIsUploading(false); setUploadFile(null); }}
                          className="px-4 py-2 text-stone-400 hover:text-white"
                       >
                           Cancel
                       </button>
                       <button 
                          onClick={performUpload}
                          disabled={uploadLoading}
                          className="px-6 py-2 bg-gold-600 text-stone-900 font-bold rounded hover:bg-gold-500 disabled:opacity-50"
                       >
                           {uploadLoading ? 'Uploading...' : 'Post to Vault'}
                       </button>
                   </div>
              </div>
           </div>
        )}

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
                <div key={item.id} className="break-inside-avoid">
                    <FadeIn delay={index * 100}>
                        <div className="group relative rounded-xl overflow-hidden bg-stone-900 border border-stone-800/50 cursor-pointer shadow-lg shadow-black/20 hover:shadow-gold-500/5 transition-all duration-500">
                            {/* Aspect Ratio Container */}
                            <div className={`overflow-hidden relative ${
                                item.type === 'video' || item.aspect === 'landscape' ? 'aspect-video' : 
                                item.aspect === 'portrait' ? 'aspect-[3/4]' :
                                item.aspect === 'square' ? 'aspect-square' : 'aspect-[2/3]'
                            }`}>
                                <img 
                                    src={item.src} 
                                    alt={item.alt} 
                                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${item.type === 'video' ? 'grayscale-[30%] group-hover:grayscale-0' : ''}`}
                                />
                                
                                {/* Video Indicator */}
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-gold-500/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-stone-900">
                                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-stone-950/95 via-stone-950/20 to-transparent"></div>
                            </div>
                            
                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="text-stone-200 text-lg font-serif italic">{item.date}</p>
                                <p className="text-gold-500/90 text-sm font-sans tracking-wide mt-1">{item.caption}</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center pt-16 pb-12">
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gold-500 animate-bounce">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>
                <p className="text-gold-500 text-xs uppercase tracking-widest">End of the Vault</p>
            </div>
        </div>

      </div>
    </div>
  );
};