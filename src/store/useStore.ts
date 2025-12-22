import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AppState,
  SubjectId,
  ThemeName,
  TimeLog,
  JournalEntry,
  CreatureStage,
  CreatureMood,
  DailyGoal,
  Session,
} from './types';
import { initialSubjects, initialProgress } from './initialData';

const STORAGE_KEY = 'internet-girl-sanctuary';

// Calculate creature stage based on completed milestones
function calculateCreatureStage(milestones: number): CreatureStage {
  if (milestones >= 10) return 4;
  if (milestones >= 6) return 3;
  if (milestones >= 3) return 2;
  if (milestones >= 1) return 1;
  return 0;
}

// Calculate creature mood based on streak
function calculateCreatureMood(
  streakDays: number,
  lastActiveDate: string | null
): CreatureMood {
  if (!lastActiveDate) return 'content';

  const today = new Date().toISOString().split('T')[0];
  const lastActive = new Date(lastActiveDate);
  const todayDate = new Date(today);
  const daysDiff = Math.floor(
    (todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff >= 3) return 'sad';
  if (daysDiff === 1) return 'sleepy';
  if (streakDays >= 3) return 'happy';
  return 'content';
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get today's date string
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

const initialSession: Session = {
  active: false,
  startTime: null,
  queue: [],
  currentIndex: 0,
  timerMinutes: null,
  timerEndTime: null,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'cyber-dream' as ThemeName,
      setTheme: (theme) => set({ theme }),

      // Subjects
      subjects: initialSubjects,
      toggleTopicComplete: (subjectId: SubjectId, topicId: string) => {
        const state = get();
        const newSubjects = state.subjects.map((subject) => {
          if (subject.id !== subjectId) return subject;
          return {
            ...subject,
            topics: subject.topics.map((topic) => {
              if (topic.id !== topicId) return topic;
              return { ...topic, completed: !topic.completed };
            }),
          };
        });

        const topic = state.subjects
          .find((s) => s.id === subjectId)
          ?.topics.find((t) => t.id === topicId);
        let newCompletedTopics = [...state.progress.completedTopics];

        if (topic?.completed) {
          newCompletedTopics = newCompletedTopics.filter((id) => id !== topicId);
        } else {
          newCompletedTopics.push(topicId);
        }

        const newMilestones = newCompletedTopics.length;

        set({
          subjects: newSubjects,
          progress: {
            ...state.progress,
            completedTopics: newCompletedTopics,
            totalMilestones: newMilestones,
            lastActiveDate: getToday(),
          },
          creatureStage: calculateCreatureStage(newMilestones),
        });
        get().updateStreak();
      },

      // Progress
      progress: initialProgress,
      addTimeLog: (log) => {
        const state = get();
        const newLog: TimeLog = { ...log, id: generateId() };

        set({
          progress: {
            ...state.progress,
            timeLogs: [...state.progress.timeLogs, newLog],
            lastActiveDate: getToday(),
          },
        });
        get().updateStreak();
      },
      addJournalEntry: (entry) => {
        const state = get();
        const newEntry: JournalEntry = { ...entry, id: generateId() };

        set({
          progress: {
            ...state.progress,
            journalEntries: [...state.progress.journalEntries, newEntry],
            lastActiveDate: getToday(),
          },
        });
        get().updateStreak();
      },
      updateStreak: () => {
        const state = get();
        const today = getToday();
        const lastActive = state.progress.lastActiveDate;

        let newStreak = state.progress.streakDays;

        if (!lastActive) {
          newStreak = 1;
        } else {
          const lastDate = new Date(lastActive);
          const todayDate = new Date(today);
          const daysDiff = Math.floor(
            (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysDiff === 0) {
            // Same day, keep streak
          } else if (daysDiff === 1) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        }

        const newMood = calculateCreatureMood(newStreak, today);

        set({
          progress: {
            ...state.progress,
            streakDays: newStreak,
            lastActiveDate: today,
          },
          creatureMood: newMood,
        });
      },

      // Creature
      creatureStage: 0,
      creatureMood: 'content',
      updateCreature: () => {
        const state = get();
        const newStage = calculateCreatureStage(state.progress.totalMilestones);
        const newMood = calculateCreatureMood(
          state.progress.streakDays,
          state.progress.lastActiveDate
        );
        set({ creatureStage: newStage, creatureMood: newMood });
      },

      // Daily Goals
      dailyGoals: [],
      addDailyGoal: (goal) => {
        const state = get();
        const newGoal: DailyGoal = {
          ...goal,
          id: generateId(),
          completed: false,
          date: getToday(),
        };
        set({ dailyGoals: [...state.dailyGoals, newGoal] });
      },
      removeDailyGoal: (id) => {
        const state = get();
        set({ dailyGoals: state.dailyGoals.filter((g) => g.id !== id) });
      },
      completeDailyGoal: (id) => {
        const state = get();
        set({
          dailyGoals: state.dailyGoals.map((g) =>
            g.id === id ? { ...g, completed: true } : g
          ),
        });
      },
      getTodaysGoals: () => {
        const state = get();
        const today = getToday();
        return state.dailyGoals.filter((g) => g.date === today);
      },
      suggestDailyGoals: () => {
        const state = get();
        const suggestions: DailyGoal[] = [];

        // Find incomplete topics across all subjects
        for (const subject of state.subjects) {
          for (const topic of subject.topics) {
            if (!topic.completed && suggestions.length < 3) {
              suggestions.push({
                id: `suggest-${topic.id}`,
                topicId: topic.id,
                subjectId: subject.id,
                completed: false,
                date: getToday(),
              });
            }
          }
        }

        return suggestions;
      },

      // Session
      session: initialSession,
      startSession: (queue, timerMinutes) => {
        const now = new Date();
        set({
          session: {
            active: true,
            startTime: now.toISOString(),
            queue,
            currentIndex: 0,
            timerMinutes: timerMinutes || null,
            timerEndTime: timerMinutes
              ? new Date(now.getTime() + timerMinutes * 60000).toISOString()
              : null,
          },
          activeView: 'focus',
        });
      },
      nextInSession: () => {
        const state = get();
        const nextIndex = state.session.currentIndex + 1;
        if (nextIndex >= state.session.queue.length) {
          get().endSession();
        } else {
          set({
            session: {
              ...state.session,
              currentIndex: nextIndex,
            },
          });
        }
      },
      completeCurrentItem: () => {
        const state = get();
        const current = state.session.queue[state.session.currentIndex];
        if (current) {
          // Mark the topic as complete
          get().toggleTopicComplete(current.subjectId, current.topicId);
          // Move to next
          get().nextInSession();
        }
      },
      endSession: () => {
        const state = get();
        // Log the session time
        if (state.session.startTime) {
          const startTime = new Date(state.session.startTime);
          const duration = Math.round(
            (Date.now() - startTime.getTime()) / 60000
          );
          if (duration > 0 && state.session.queue.length > 0) {
            get().addTimeLog({
              subjectId: state.session.queue[0].subjectId,
              duration,
              date: new Date().toISOString(),
              notes: `Session: ${state.session.queue.length} items`,
            });
          }
        }
        set({
          session: initialSession,
          activeView: 'today',
        });
      },

      // View
      activeSubject: null,
      setActiveSubject: (id) => set({ activeSubject: id }),
      activeView: 'today',
      setActiveView: (view) => set({ activeView: view }),
      sidebarExpanded: false,
      toggleSidebar: () => {
        const state = get();
        set({ sidebarExpanded: !state.sidebarExpanded });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        theme: state.theme,
        subjects: state.subjects,
        progress: state.progress,
        creatureStage: state.creatureStage,
        creatureMood: state.creatureMood,
        dailyGoals: state.dailyGoals,
      }),
    }
  )
);
