import { AuthService, User, AuthResponse } from '../types';

const MOCK_USER_Storage_KEY = 'batch26_mock_user';

export const mockAuthService: AuthService = {
    signUp: async (email, password, name) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (email.includes('error')) {
            return { user: null, error: 'Simulation: Failed to sign up.' };
        }

        const newUser: User = {
            id: crypto.randomUUID(),
            email,
            name,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        };

        localStorage.setItem(MOCK_USER_Storage_KEY, JSON.stringify(newUser));
        return { user: newUser, error: null };
    },

    signIn: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (email === 'fail@test.com') {
            return { user: null, error: 'Invalid credentials' };
        }

        // specific mock user or generic one
        const user: User = {
            id: 'mock-user-123',
            email,
            name: email.split('@')[0],
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };

        localStorage.setItem(MOCK_USER_Storage_KEY, JSON.stringify(user));
        return { user, error: null };
    },

    signOut: async () => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        localStorage.removeItem(MOCK_USER_Storage_KEY);
    },

    getUser: async () => {
        const stored = localStorage.getItem(MOCK_USER_Storage_KEY);
        return stored ? JSON.parse(stored) : null;
    },
};
