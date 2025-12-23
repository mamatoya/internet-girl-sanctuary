// Types for Internet Girl's Learning Sanctuary

export type ThemeName =
  | 'cyber-dream'
  | 'pastel-cloud'
  | 'y2k-grunge'
  | 'digital-sunset'
  | 'matrix-mode'
  | 'bubblegum-pop';

export type SubjectId = 'math' | 'physics' | 'philosophy' | 'music-theory';

export type CreatureStage = 0 | 1 | 2 | 3 | 4; // egg -> adult
export type CreatureMood = 'happy' | 'content' | 'sleepy' | 'sad';

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'podcast' | 'book' | 'tool';
}

export interface Topic {
  id: string;
  title: string;
  completed: boolean;
  resources: Resource[];
}

export interface Subject {
  id: SubjectId;
  title: string;
  emoji: string;
  topics: Topic[];
  color: string;
}

export interface TimeLog {
  id: string;
  subjectId: SubjectId;
  duration: number; // minutes
  date: string; // ISO date string
  notes?: string;
}

export interface JournalEntry {
  id: string;
  subjectId: SubjectId | 'general';
  content: string;
  date: string; // ISO date string
  mood?: 'great' | 'okay' | 'struggling';
}

export interface UserProgress {
  completedTopics: string[]; // topic IDs
  timeLogs: TimeLog[];
  journalEntries: JournalEntry[];
  lastActiveDate: string | null;
  streakDays: number;
  totalMilestones: number;
}

// Daily focus item - what to work on today
export interface DailyGoal {
  id: string;
  topicId: string;
  subjectId: SubjectId;
  resourceId?: string; // optional specific resource
  completed: boolean;
  date: string; // ISO date
}

// Active learning session
export interface Session {
  active: boolean;
  startTime: string | null;
  queue: Array<{ subjectId: SubjectId; topicId: string; resourceId?: string }>;
  currentIndex: number;
  timerMinutes: number | null; // null = no timer
  timerEndTime: string | null;
}

export interface AppState {
  // Theme
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;

  // Subjects
  subjects: Subject[];
  toggleTopicComplete: (subjectId: SubjectId, topicId: string) => void;
  updateResource: (
    subjectId: SubjectId,
    topicId: string,
    resourceId: string,
    updates: Partial<Pick<Resource, 'title' | 'url'>>
  ) => void;
  addResource: (
    subjectId: SubjectId,
    topicId: string,
    resource: Omit<Resource, 'id'>
  ) => void;
  deleteResource: (
    subjectId: SubjectId,
    topicId: string,
    resourceId: string
  ) => void;

  // Progress
  progress: UserProgress;
  addTimeLog: (log: Omit<TimeLog, 'id'>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateStreak: () => void;

  // Creature
  creatureStage: CreatureStage;
  creatureMood: CreatureMood;
  updateCreature: () => void;

  // Daily Goals
  dailyGoals: DailyGoal[];
  addDailyGoal: (goal: Omit<DailyGoal, 'id' | 'completed' | 'date'>) => void;
  removeDailyGoal: (id: string) => void;
  completeDailyGoal: (id: string) => void;
  getTodaysGoals: () => DailyGoal[];
  suggestDailyGoals: () => DailyGoal[];

  // Session
  session: Session;
  startSession: (queue: Session['queue'], timerMinutes?: number) => void;
  nextInSession: () => void;
  completeCurrentItem: () => void;
  endSession: () => void;

  // View - now includes 'today' as default and 'focus' for active session
  activeSubject: SubjectId | null;
  setActiveSubject: (id: SubjectId | null) => void;
  activeView: 'today' | 'focus' | 'browse' | 'journal';
  setActiveView: (view: 'today' | 'focus' | 'browse' | 'journal') => void;
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
}
