import { MemoryEvent, Student, VaultItem, WallMessage } from './types';

export const TIMELINE_EVENTS: MemoryEvent[] = [
  {
    year: '2022',
    title: 'The First Hello',
    description: '"Do you know where Hall B is?" That was the question that started it all. We were lost, nervous, and carrying way too many bags.',
    image: 'https://picsum.photos/seed/campus2022/600/600',
    caption: 'First day on campus 🍂',
    align: 'left'
  },
  {
    year: '2023',
    title: 'The Late Nights',
    description: 'Late night pizza runs became our ritual. We didn\'t know much about calculus yet, but we knew the best toppings.',
    image: 'https://picsum.photos/seed/pizza2023/600/600',
    caption: 'Pizza night at the dorms 🍕',
    align: 'right'
  },
  {
    year: '2024',
    title: 'Finding Our Feet',
    description: 'The library became our second home. We stressed over midterms, but the coffee breaks in between made it all bearable.',
    image: 'https://picsum.photos/seed/library2024/600/800',
    caption: 'Library all-nighter... again 📚',
    align: 'left'
  },
  {
    year: '2025',
    title: 'The Final Stretch',
    description: 'Four years. Countless memories. One unforgettable journey. This isn\'t the end, it\'s just the beginning.',
    image: 'https://picsum.photos/seed/grad2026/800/600',
    caption: 'We made it. Class of \'26 🎓',
    align: 'center'
  },
  {
    year: '2026',
    title: 'The Final Stretch',
    description: 'Four years. Countless memories. One unforgettable journey. This isn\'t the end, it\'s just the beginning.',
    image: 'https://picsum.photos/seed/grad2026/800/600',
    caption: 'We made it. Class of \'26 🎓',
    align: 'center'
  }
];

export const STUDENTS: Student[] = [
  { 
    id: '1', 
    name: 'Elena Rodriguez', 
    major: 'Psychology', 
    quote: 'The one who always had extra pens and snacks.', 
    image: 'https://picsum.photos/seed/elena/400/500', 
    tags: ['Science'],
    socials: { linkedin: '#', instagram: '#' }
  },
  { 
    id: '2', 
    name: 'Marcus Chen', 
    major: 'Architecture', 
    quote: 'Design is never done, only due.', 
    image: 'https://picsum.photos/seed/marcus/400/600', 
    tags: ['Arts', 'Engineering'],
    socials: { linkedin: '#', twitter: '#' }
  },
  { 
    id: '3', 
    name: 'Sarah Johnson', 
    major: 'Biology', 
    quote: 'Actually read the syllabus.', 
    image: 'https://picsum.photos/seed/sarah/500/500', 
    tags: ['Science'],
    socials: { instagram: '#' }
  },
  { 
    id: '4', 
    name: 'David Kim', 
    major: 'Computer Sci', 
    quote: 'Anyone seen my charger?', 
    image: 'https://picsum.photos/seed/david/500/400', 
    tags: ['Engineering'],
    socials: { linkedin: '#', twitter: '#', instagram: '#' }
  },
  { 
    id: '5', 
    name: 'Maya Brooks', 
    major: 'Fine Arts', 
    quote: 'Coffee first, questions later.', 
    image: 'https://picsum.photos/seed/maya/400/500', 
    tags: ['Arts'],
    socials: { instagram: '#' }
  },
  { 
    id: '6', 
    name: 'James Wilson', 
    major: 'Business', 
    quote: 'Fake it till you make it.', 
    image: 'https://picsum.photos/seed/james/400/400', 
    tags: ['Business'],
    socials: { linkedin: '#' }
  },
  { 
    id: '7', 
    name: 'Aisha Patel', 
    major: 'English Lit', 
    quote: 'Just five more minutes.', 
    image: 'https://picsum.photos/seed/aisha/400/600', 
    tags: ['Arts'],
    socials: { twitter: '#', instagram: '#' }
  },
  { 
    id: '8', 
    name: 'Tom Baker', 
    major: 'Engineering', 
    quote: 'It works on my machine.', 
    image: 'https://picsum.photos/seed/tom/400/500', 
    tags: ['Engineering'],
    socials: { linkedin: '#' }
  },
];

export const FILTERS = ['All Majors', 'Engineering', 'Arts', 'Science', 'Business'];

export const VAULT_ITEMS: VaultItem[] = [
  { id: '1', type: 'image', src: 'https://picsum.photos/seed/vault1/400/500', alt: 'Library laughing', date: 'Sept 2022', caption: 'Candid laughter in the library', tags: ['Freshman'], aspect: 'portrait' },
  { id: '2', type: 'image', src: 'https://picsum.photos/seed/vault2/600/400', alt: 'Graduation hug', date: 'May 2026', caption: 'Group hug after finals', tags: ['Convocation', 'Grad Trip'], aspect: 'landscape' },
  { id: '3', type: 'image', src: 'https://picsum.photos/seed/vault3/500/500', alt: 'Pizza run', date: 'Oct 2023', caption: 'Late night pizza run', tags: ['Sophomore'], aspect: 'square' },
  { id: '4', type: 'image', src: 'https://picsum.photos/seed/vault4/400/600', alt: 'Campus sunset', date: 'June 2025', caption: 'Campus at sunset', tags: ['Junior', 'Grad Trip'], aspect: 'tall' },
  { id: '5', type: 'video', src: 'https://picsum.photos/seed/vault5/600/450', alt: 'Last lecture', date: 'April 2026', caption: 'The Last Lecture', tags: ['Convocation', 'Videos'], aspect: 'landscape' },
  { id: '6', type: 'image', src: 'https://picsum.photos/seed/vault6/600/400', alt: 'Abstract architecture', date: 'March 2024', caption: 'Abstract forms', tags: ['Sophomore', 'Arts'], aspect: 'landscape' },
  { id: '7', type: 'image', src: 'https://picsum.photos/seed/vault7/400/550', alt: 'Confetti', date: 'May 2026', caption: 'We made it', tags: ['Convocation'], aspect: 'portrait' },
];

export const WALL_MESSAGES: WallMessage[] = [
  { id: '1', text: "I'll never forget the late nights at the library... or mostly the coffee runs. We survived mechanics 101 solely on caffeine and hope!", author: 'Sarah J.', major: 'Computer Science', date: 'Oct 12', style: 'paper-1', rotation: '-rotate-2', tapeRotation: 'rotate-1' },
  { id: '2', text: "To the best four years of our lives. We made it! Can't believe it's actually over.", author: 'Mike T.', major: 'Economics', date: 'Oct 15', style: 'paper-2', rotation: 'rotate-1', tapeRotation: '-rotate-2', image: 'https://picsum.photos/seed/wall2/300/200' },
  { id: '3', text: "Remember the fresher's party? Feels like yesterday. Wishing everyone the best.", author: 'Ananya', date: '2h ago', style: 'paper-3', rotation: '-rotate-1', tapeRotation: 'rotate-3' },
  { id: '4', text: "Going to miss the chaotic group study sessions where we mostly just ate pizza. 🍕", author: 'Leo D.', date: 'Oct 18', style: 'paper-4', rotation: 'rotate-2', tapeRotation: '-rotate-1', tags: ['#Memories', '#PizzaLords'] },
];