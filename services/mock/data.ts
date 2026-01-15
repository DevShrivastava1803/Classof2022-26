import { DataService, User } from '../types';
import { Student, WallMessage, VaultItem } from '../../types';

// Initial Mock Data
const MOCK_STUDENTS: Student[] = [
    {
        id: '1',
        name: 'Alex Rivera',
        major: 'Computer Science',
        quote: '"The code works... I just don\'t know why."',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: ['Tech Lead', 'Gamer'],
        socials: { linkedin: '#', twitter: '#' }
    },
    {
        id: '2',
        name: 'Sarah Chen',
        major: 'Visual Arts',
        quote: '"Designing the future, one pixel at a time."',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        tags: ['Artist', 'Designer'],
        socials: { instagram: '#' }
    }
];

const MOCK_MESSAGES: WallMessage[] = [
    {
        id: '1',
        text: "So glad we made it through finals! CS '26 forever!",
        author: "Mike T.",
        major: "Computer Science",
        date: "2024-05-20",
        style: 'paper-1',
        rotation: '-2deg',
        tapeRotation: '1deg'
    },
    {
        id: '2',
        text: "Will miss the late night studio sessions.",
        author: "Anonymous",
        date: "2024-06-01",
        style: 'paper-3',
        rotation: '3deg',
        tapeRotation: '-2deg'
    }
];

const MOCK_VAULT: VaultItem[] = [
    {
        id: '1',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Graduation Cap Throw',
        date: '2026-05-20',
        caption: 'We did it!',
        tags: ['Graduation', 'Celebration'],
        aspect: 'video' // Intentionally checking type
    }
] as unknown as VaultItem[]; // casting due to 'video' aspect in VaultItem being potentially different in types.ts vs my memory. 
// Actually checking types.ts: aspect: 'portrait' | 'landscape' | 'square' | 'tall';
// Correcting aspect in real code below.

const MOCK_VAULT_CORRECTED: VaultItem[] = [
    {
        id: '1',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        alt: 'Graduation Cap Throw',
        date: '2026-05-20',
        caption: 'We did it!',
        tags: ['Graduation', 'Celebration'],
        aspect: 'landscape'
    }
]

// In-memory store (simulation)
let students = [...MOCK_STUDENTS];
let messages = [...MOCK_MESSAGES];
let vault = [...MOCK_VAULT_CORRECTED];
let yearbookSignatures: Record<string, any[]> = {};

export const mockDataService: DataService = {
    getProfile: async (userId) => {
        await new Promise(r => setTimeout(r, 500));
        return students.find(s => s.id === userId) || null;
    },

    updateProfile: async (profile) => {
        await new Promise(r => setTimeout(r, 800));
        const index = students.findIndex(s => s.id === profile.id);
        if (index >= 0) {
            students[index] = profile;
        } else {
            students.push(profile);
        }
        return profile;
    },

    getAllStudents: async () => {
        await new Promise(r => setTimeout(r, 600));
        return students;
    },

    getMessages: async () => {
        await new Promise(r => setTimeout(r, 400));
        return [...messages];
    },

    postMessage: async (message) => {
        await new Promise(r => setTimeout(r, 600));
        const newMessage: WallMessage = {
            ...message,
            id: crypto.randomUUID(),
            date: new Date().toISOString().split('T')[0],
            rotation: `${Math.random() * 6 - 3}deg`,
            tapeRotation: `${Math.random() * 10 - 5}deg`
        };
        messages.unshift(newMessage); // Add to top
        return newMessage;
    },

    getYearbookMessages: async (studentId) => {
        await new Promise(r => setTimeout(r, 300));
        return [...(yearbookSignatures[studentId] || [])];
    },

    signYearbook: async (studentId, text, author) => {
        await new Promise(r => setTimeout(r, 500));
        const msg = {
            id: crypto.randomUUID(),
            studentId,
            text,
            author,
            date: new Date().toLocaleDateString()
        };
        if (!yearbookSignatures[studentId]) {
            yearbookSignatures[studentId] = [];
        }
        yearbookSignatures[studentId].push(msg);
        return msg;
    },

    getMedia: async () => {
        await new Promise(r => setTimeout(r, 500));
        return vault;
    },

    uploadMedia: async (file, caption, user) => {
        await new Promise(r => setTimeout(r, 1500)); // Simulate upload time

        // Create a fake URL for local preview
        const fakeUrl = URL.createObjectURL(file);

        const newItem: VaultItem = {
            id: crypto.randomUUID(),
            type: file.type.startsWith('video') ? 'video' : 'image',
            src: fakeUrl,
            alt: caption,
            date: new Date().toISOString().split('T')[0],
            caption: caption,
            tags: ['User Upload'],
            aspect: 'square' // dynamic aspect calculation is hard without loading image, defaulting to square
        };

        vault.unshift(newItem);
        return newItem;
    }
};
