import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from './ui/FadeIn';

interface AuthModalProps {
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onNavigate: (view: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode, onClose, onNavigate }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await signIn(loginEmail, loginPassword);
      if (res.error) {
        setError(res.error);
      } else {
        onClose(); // Close modal on success
         onNavigate('dashboard');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await signUp(signupEmail, signupPassword, signupName);
      if (res.error) {
        setError(res.error);
      } else {
        onClose(); // Close modal on success
        onNavigate('dashboard');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       {/* Bokeh Backdrop */}
       <div 
         className="absolute inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity duration-500"
         onClick={onClose}
       >
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]"></div>
       </div>

       {/* Modal Content */}
       <div className="relative z-10 w-full max-w-md">
         <FadeIn>
           <div className="bg-stone-900/90 border border-gold-500/20 shadow-2xl rounded-2xl p-8 backdrop-blur-xl">
             
             {/* Close Button */}
             <button 
               onClick={onClose}
               className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
             >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>

             <div className="text-center mb-8">
               <h2 className="text-3xl font-serif text-gold-400 mb-2">
                 {mode === 'login' ? 'Welcome Back' : 'Join the Batch'}
               </h2>
               <p className="text-stone-400 text-sm">
                 {mode === 'login' ? 'Sign in to access your digital yearbook' : 'Create your digital profile for the archive'}
               </p>
             </div>

             {error && (
               <div className="mb-6 bg-red-900/20 border border-red-800 text-red-300 px-4 py-2 rounded text-sm text-center">
                 {error}
               </div>
             )}

             {mode === 'login' ? (
               <form onSubmit={handleLogin} className="space-y-4">
                 <div>
                   <input
                     type="email"
                     value={loginEmail}
                     onChange={(e) => setLoginEmail(e.target.value)}
                     className="w-full bg-stone-950/50 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                     placeholder="Email Address"
                     required
                   />
                 </div>
                 <div>
                   <input
                     type="password"
                     value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}
                     className="w-full bg-stone-950/50 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                     placeholder="Password"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   disabled={isSubmitting || authLoading}
                   className="w-full bg-gold-600 hover:bg-gold-500 text-stone-900 font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                 >
                   {isSubmitting ? 'Signing in...' : 'Sign In'}
                 </button>
               </form>
             ) : (
               <form onSubmit={handleSignup} className="space-y-4">
                 <div>
                   <input
                     type="text"
                     value={signupName}
                     onChange={(e) => setSignupName(e.target.value)}
                     className="w-full bg-stone-950/50 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                     placeholder="Full Name"
                     required
                   />
                 </div>
                 <div>
                   <input
                     type="email"
                     value={signupEmail}
                     onChange={(e) => setSignupEmail(e.target.value)}
                     className="w-full bg-stone-950/50 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                     placeholder="Email Address"
                     required
                   />
                 </div>
                 <div>
                   <input
                     type="password"
                     value={signupPassword}
                     onChange={(e) => setSignupPassword(e.target.value)}
                     className="w-full bg-stone-950/50 border border-stone-700 rounded-lg px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-stone-600"
                     placeholder="Create Password"
                     required
                   />
                 </div>
                 <button
                   type="submit"
                   disabled={isSubmitting || authLoading}
                   className="w-full bg-gold-600 hover:bg-gold-500 text-stone-900 font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                 >
                   {isSubmitting ? 'Create Account' : 'Sign Up'}
                 </button>
               </form>
             )}

             <div className="mt-6 text-center border-t border-stone-800 pt-6">
               <p className="text-stone-500 text-sm">
                 {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                 <button
                   onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                   className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                 >
                   {mode === 'login' ? 'Create one' : 'Sign In'}
                 </button>
               </p>
             </div>
           </div>
         </FadeIn>
       </div>
    </div>
  );
};
