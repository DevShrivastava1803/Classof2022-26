import React, { useState, useEffect } from 'react';
import { FILTERS } from '../constants';
import { FadeIn } from './ui/FadeIn';
import { Student } from '../types';
import { dataService } from '../services/DataRegistry';

interface Message {
  id: string;
  studentId: string;
  text: string;
  date: string;
}

export const Yearbook: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Majors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Message System State
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        const allStudents = await dataService.getAllStudents();
        setStudents(allStudents);
        setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
        // Load messages for selected student
        dataService.getYearbookMessages(selectedStudent.id).then((msgs) => {
            setMessages(msgs);
        });
    }
  }, [selectedStudent]);

  const handleSaveMessage = async (studentId: string) => {
    if (!newMessage.trim()) return;

    // Use "Anonymous" or prompt (simplified for now)
    const savedMsg = await dataService.signYearbook(studentId, newMessage, "Anonymous");
    setMessages([...messages, savedMsg]);
    setNewMessage('');
  };

  const filteredStudents = students.filter(student => {
    const matchesFilter = activeFilter === 'All Majors' || 
                          (activeFilter === 'Science' && student.tags.includes('Science')) ||
                          (activeFilter === 'Arts' && student.tags.includes('Arts')) ||
                          (activeFilter === 'Engineering' && student.tags.includes('Engineering')) ||
                          (activeFilter === 'Business' && student.tags.includes('Business'));
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.major.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
      return (
          <div className="min-h-screen bg-stone-950 flex items-center justify-center">
              <p className="text-gold-500 font-serif text-xl animate-pulse">Loading Class of '26...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-stone-950 py-32 px-4 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-100 mb-6">The Class of '26</h2>
            <p className="text-stone-400 max-w-xl mx-auto font-light">
              Faces that defined our journey. Moments that became memories. Click a card to sign their yearbook.
            </p>
          </FadeIn>
        </div>

        {/* Controls */}
        <div className="sticky top-24 z-30 bg-stone-950/90 backdrop-blur py-4 mb-12 border-b border-stone-800">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                {/* Search */}
                <div className="relative w-full md:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Find a classmate..." 
                        className="w-full bg-stone-900 border border-stone-800 text-stone-200 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 transition-all placeholder:text-stone-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                activeFilter === filter 
                                    ? 'bg-gold-500 text-stone-900' 
                                    : 'bg-stone-900 text-stone-400 border border-stone-800 hover:border-gold-500/50 hover:text-gold-500'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Masonry Grid */}
        {filteredStudents.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredStudents.map((student) => (
                <div key={student.id} className="break-inside-avoid mb-6">
                <FadeIn>
                    <div 
                      onClick={() => setSelectedStudent(student)}
                      className="group relative overflow-hidden rounded-lg bg-stone-900 border border-stone-800 shadow-lg hover:shadow-gold-500/10 hover:border-stone-700 transition-all duration-500 cursor-pointer"
                    >
                        {/* Image */}
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <img 
                                src={student.image} 
                                alt={student.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-90"></div>
                            
                            {/* Tap to View Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="px-4 py-2 border border-gold-500 text-gold-500 text-xs tracking-widest uppercase rounded-full bg-stone-900/80 backdrop-blur">
                                  Open Yearbook
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative p-5 -mt-20 pointer-events-none">
                            <h3 className="text-xl font-serif font-bold text-stone-100 group-hover:text-gold-500 transition-colors">{student.name}</h3>
                            <div className="flex items-center justify-between mt-2 border-t border-stone-800 pt-3">
                                <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">{student.major}</span>
                                <div className="text-stone-600">
                                   {/* Message count indicator */}
                                   <div className="flex items-center gap-1 text-xs">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                        <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.387 17.387 0 005.268 0zM9.772 17.119a18.994 18.994 0 01-4.764-2.093c.23.58.682 1.06 1.24 1.362a17.417 17.417 0 003.524.731zM3.88 12.752c.206.84.524 1.634.936 2.367.924.162 1.86.3 2.805.412-.614-1.502-.932-3.137-.932-4.832 0-1.696.319-3.332.932-4.833-1.464.175-2.853.493-4.148.916a9.719 9.719 0 00.407 5.97zM20.693 8.356c1.23.407 2.348.96 3.307 1.638-.568-1.536-1.506-2.884-2.695-3.929a19.06 19.06 0 01-.612 2.29zM8.303 5.373a19.034 19.034 0 01-2.297-1.298 9.73 9.73 0 00-3.23 3.65 17.067 17.067 0 005.527-2.352zM12.924 3.033a17.126 17.126 0 00-1.848 0 17.525 17.525 0 011.848 0zM17.358 4.075a17.066 17.066 0 00-4.634 1.898c.453 1.05.794 2.152 1.01 3.295a18.98 18.98 0 013.624-5.193z" />
                                      </svg>
                                      {/* Message count to be implemented fully */}
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-stone-500 font-serif italic text-xl">No classmates found.</p>
            </div>
        )}

        {/* Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             {/* Backdrop */}
             <div 
               className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
               onClick={() => setSelectedStudent(null)}
             ></div>
             
             {/* Card Content */}
             <div className="relative w-full max-w-4xl bg-stone-900 border border-gold-500/20 rounded-xl overflow-hidden shadow-2xl shadow-black animate-fade-in flex flex-col md:flex-row max-h-[90vh]">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-gold-500 text-white hover:text-black rounded-full transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Left: Image & Socials */}
                <div className="w-full md:w-5/12 relative">
                   <div className="h-64 md:h-full w-full relative">
                      <img 
                        src={selectedStudent.image} 
                        alt={selectedStudent.name} 
                        className="w-full h-full object-cover filter grayscale" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                      
                      {/* Quote Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                         <h3 className="text-3xl font-serif font-bold text-stone-100 mb-2">{selectedStudent.name}</h3>
                         <p className="text-gold-500 font-sans text-sm uppercase tracking-widest mb-4">{selectedStudent.major}</p>
                         
                         <div className="flex gap-4 mt-4">
                            {selectedStudent.socials?.linkedin && (
                              <a href={selectedStudent.socials.linkedin} className="text-stone-400 hover:text-gold-500 transition-colors">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                              </a>
                            )}
                            {selectedStudent.socials?.instagram && (
                              <a href={selectedStudent.socials.instagram} className="text-stone-400 hover:text-gold-500 transition-colors">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                              </a>
                            )}
                            {selectedStudent.socials?.twitter && (
                              <a href={selectedStudent.socials.twitter} className="text-stone-400 hover:text-gold-500 transition-colors">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                              </a>
                            )}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right: Message Board */}
                <div className="w-full md:w-7/12 p-8 flex flex-col bg-stone-900 overflow-y-auto no-scrollbar">
                   <div className="mb-6">
                      <p className="font-handwriting text-2xl text-stone-500 italic">"{selectedStudent.quote}"</p>
                   </div>
                   
                   <div className="flex-grow min-h-[200px] mb-6 space-y-4">
                      <h4 className="text-stone-300 font-serif border-b border-stone-800 pb-2 mb-4">Messages from the Batch</h4>
                      
                      {messages.length > 0 ? (
                        <div className="space-y-4">
                           {messages.map((msg) => (
                             <div key={msg.id} className="bg-stone-800/50 p-4 rounded-lg border border-stone-800/50 relative">
                                <p className="font-handwriting text-xl text-stone-200 leading-relaxed">
                                  {msg.text}
                                </p>
                                <span className="absolute bottom-2 right-4 text-[10px] text-stone-600 font-sans tracking-widest uppercase">
                                  {msg.date}
                                </span>
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-stone-600 italic">
                          Be the first to leave a memory.
                        </div>
                      )}
                   </div>

                   {/* Input Area */}
                   <div className="mt-auto">
                      <div className="relative">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Write a farewell message..."
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg p-4 text-stone-300 font-handwriting text-xl focus:outline-none focus:border-gold-500 transition-colors resize-none h-24 placeholder:font-sans placeholder:text-sm placeholder:text-stone-700"
                        />
                        <button 
                          onClick={() => handleSaveMessage(selectedStudent.id)}
                          disabled={!newMessage.trim()}
                          className="absolute bottom-3 right-3 p-2 bg-gold-500 text-stone-900 rounded-full hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                      </div>
                      <p className="text-[10px] text-stone-600 mt-2 text-center">Messages are saved locally to your device.</p>
                   </div>
                </div>

             </div>
          </div>
        )}

        <div className="mt-20 text-center">
            <button className="text-stone-500 hover:text-gold-500 text-sm tracking-widest uppercase border-b border-transparent hover:border-gold-500 pb-1 transition-all">
                Load More Memories
            </button>
        </div>
      </div>
    </div>
  );
};