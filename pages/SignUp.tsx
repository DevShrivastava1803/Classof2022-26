import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../components/ui/FadeIn';

interface SignUpProps {
  onNavigate: (view: any) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signUp, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await signUp(email, password, name);
      if (res.error) {
        setError(res.error);
      } else {
        // success
      }
    } catch (err) {
      setError('Something went wrong during sign up');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
      <FadeIn>
        <div className="bg-stone-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-stone-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-gold-400 mb-2">Join the Class</h2>
            <p className="text-stone-400">Created your memory profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="student@university.edu"
                required
              />
            </div>

            <div>
              <label className="block text-stone-300 mb-2 text-sm uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-stone-200 focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Create a password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gold-600 hover:bg-gold-500 text-stone-900 font-bold py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-stone-500 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-gold-400 hover:text-gold-300 underline underline-offset-4"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
