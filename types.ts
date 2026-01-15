export type ViewState = 'home' | 'timeline' | 'yearbook' | 'vault' | 'wall' | 'login' | 'signup' | 'dashboard';

export interface Student {
  id: string;
  name: string;
  major: string;
  quote: string;
  image: string;
  tags: string[];
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface MemoryEvent {
  year: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  align: 'left' | 'right' | 'center';
}

export interface VaultItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  date: string;
  caption: string;
  tags: string[];
  aspect: 'portrait' | 'landscape' | 'square' | 'tall';
}

export interface WallMessage {
  id: string;
  text: string;
  author: string;
  major?: string;
  date: string;
  style: 'paper-1' | 'paper-2' | 'paper-3' | 'paper-4';
  rotation: string;
  tapeRotation: string;
  image?: string;
  tags?: string[];
}