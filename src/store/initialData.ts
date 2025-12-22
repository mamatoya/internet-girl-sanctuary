import type { Subject, UserProgress } from './types';

export const initialSubjects: Subject[] = [
  {
    id: 'math',
    title: 'Mathematics',
    emoji: '~*',
    color: '#ff6b9d',
    topics: [
      {
        id: 'math-algebra',
        title: 'Algebra Review',
        completed: false,
        resources: [
          {
            id: 'khan-algebra',
            title: 'Khan Academy: Algebra',
            url: 'https://www.khanacademy.org/math/algebra',
            type: 'course',
          },
          {
            id: 'khan-algebra2',
            title: 'Khan Academy: Algebra 2',
            url: 'https://www.khanacademy.org/math/algebra2',
            type: 'course',
          },
        ],
      },
      {
        id: 'math-precalc',
        title: 'Pre-Calculus',
        completed: false,
        resources: [
          {
            id: 'khan-precalc',
            title: 'Khan Academy: Precalculus',
            url: 'https://www.khanacademy.org/math/precalculus',
            type: 'course',
          },
        ],
      },
      {
        id: 'math-calc1',
        title: 'Calculus Basics',
        completed: false,
        resources: [
          {
            id: 'khan-calc1',
            title: 'Khan Academy: Calculus 1',
            url: 'https://www.khanacademy.org/math/calculus-1',
            type: 'course',
          },
          {
            id: '3b1b-calc',
            title: '3Blue1Brown: Essence of Calculus',
            url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr',
            type: 'video',
          },
        ],
      },
    ],
  },
  {
    id: 'physics',
    title: 'Physics',
    emoji: '~@',
    color: '#9d4edd',
    topics: [
      {
        id: 'physics-mechanics',
        title: 'Classical Mechanics',
        completed: false,
        resources: [
          {
            id: 'khan-physics',
            title: 'Khan Academy: Physics',
            url: 'https://www.khanacademy.org/science/physics',
            type: 'course',
          },
          {
            id: 'khan-ap-physics',
            title: 'Khan Academy: AP Physics 1',
            url: 'https://www.khanacademy.org/science/ap-physics-1',
            type: 'course',
          },
        ],
      },
      {
        id: 'physics-waves',
        title: 'Waves & Optics',
        completed: false,
        resources: [
          {
            id: 'khan-waves',
            title: 'Khan Academy: Waves & Sound',
            url: 'https://www.khanacademy.org/science/physics/mechanical-waves-and-sound',
            type: 'course',
          },
        ],
      },
      {
        id: 'physics-thermo',
        title: 'Thermodynamics',
        completed: false,
        resources: [
          {
            id: 'khan-thermo',
            title: 'Khan Academy: Thermodynamics',
            url: 'https://www.khanacademy.org/science/physics/thermodynamics',
            type: 'course',
          },
        ],
      },
    ],
  },
  {
    id: 'philosophy',
    title: 'Philosophy',
    emoji: '~?',
    color: '#4ecdc4',
    topics: [
      {
        id: 'phil-conversation',
        title: 'Art of Conversation',
        completed: false,
        resources: [
          {
            id: 'aoc-podcast',
            title: 'The Art of Conversation Podcast',
            url: 'https://open.spotify.com/show/0Z3996rhtbzwpHVqDXOJLZ',
            type: 'podcast',
          },
        ],
      },
      {
        id: 'phil-jung',
        title: 'Carl Jung Studies',
        completed: false,
        resources: [
          {
            id: 'jung-youtube',
            title: 'Academy of Ideas: Jung',
            url: 'https://www.youtube.com/playlist?list=PLAYxecbGotUz1tjj41VHBkMkFaQz5HKKr',
            type: 'video',
          },
          {
            id: 'jung-map-soul',
            title: 'Jung: A Very Short Introduction',
            url: 'https://www.goodreads.com/book/show/359935.Jung',
            type: 'book',
          },
        ],
      },
      {
        id: 'phil-notes',
        title: 'Personal Reflections',
        completed: false,
        resources: [],
      },
    ],
  },
  {
    id: 'music-theory',
    title: 'Music Theory',
    emoji: '~#',
    color: '#ffd93d',
    topics: [
      {
        id: 'music-intervals',
        title: 'Intervals & Scales',
        completed: false,
        resources: [
          {
            id: 'musictheory-net',
            title: 'musictheory.net Lessons',
            url: 'https://www.musictheory.net/lessons',
            type: 'tool',
          },
          {
            id: 'teoria',
            title: 'Teoria: Music Theory',
            url: 'https://www.teoria.com/',
            type: 'tool',
          },
        ],
      },
      {
        id: 'music-chords',
        title: 'Chord Progressions',
        completed: false,
        resources: [
          {
            id: 'hooktheory',
            title: 'Hooktheory: TheoryTab',
            url: 'https://www.hooktheory.com/theorytab',
            type: 'tool',
          },
        ],
      },
      {
        id: 'music-rhythm',
        title: 'Rhythm & Time',
        completed: false,
        resources: [
          {
            id: 'musictheory-rhythm',
            title: 'musictheory.net: Rhythm',
            url: 'https://www.musictheory.net/lessons/rhythm',
            type: 'tool',
          },
        ],
      },
    ],
  },
];

export const initialProgress: UserProgress = {
  completedTopics: [],
  timeLogs: [],
  journalEntries: [],
  lastActiveDate: null,
  streakDays: 0,
  totalMilestones: 0,
};
