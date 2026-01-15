import { Student, WallMessage, VaultItem } from '../types';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
}

export interface AuthResponse {
    user: User | null;
    error: string | null;
}

export interface AuthService {
    signUp: (email: string, password: string, name: string) => Promise<AuthResponse>;
    signIn: (email: string, password: string) => Promise<AuthResponse>;
    signOut: () => Promise<void>;
    getUser: () => Promise<User | null>;
}

export interface DataService {
    // Yearbook / Profiles
    getProfile: (userId: string) => Promise<Student | null>;
    updateProfile: (profile: Student) => Promise<Student>;
    getAllStudents: () => Promise<Student[]>;

    // Message Wall
    getMessages: () => Promise<WallMessage[]>;
    postMessage: (message: Omit<WallMessage, 'id' | 'date' | 'rotation' | 'tapeRotation'>) => Promise<WallMessage>;

    // Yearbook Signatures
    getYearbookMessages: (studentId: string) => Promise<any[]>;
    signYearbook: (studentId: string, text: string, author: string) => Promise<any>;

    // Media Vault
    getMedia: () => Promise<VaultItem[]>;
    uploadMedia: (file: File, caption: string, user: User) => Promise<VaultItem>;
}
