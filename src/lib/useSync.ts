import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useAuth } from './auth';
import { loadUserData, debouncedSave, type SyncableData } from './sync';

export function useSync() {
  const { user } = useAuth();
  const store = useStore();
  const hasLoadedRef = useRef(false);
  const userIdRef = useRef<string | null>(null);

  // Load data when user logs in
  useEffect(() => {
    if (!user) {
      hasLoadedRef.current = false;
      userIdRef.current = null;
      return;
    }

    // Only load once per user session
    if (hasLoadedRef.current && userIdRef.current === user.id) {
      return;
    }

    const load = async () => {
      const cloudData = await loadUserData(user.id);

      if (cloudData) {
        // Cloud data exists - use it (it's the source of truth)
        // We need to manually set each piece of state
        if (cloudData.theme) {
          store.setTheme(cloudData.theme as Parameters<typeof store.setTheme>[0]);
        }
        // For other state, we'll reload from localStorage which gets synced
        // In a full implementation, you'd have setters for all state
        console.log('Loaded data from cloud');
      } else {
        // No cloud data - this is a new user or first sync
        // Save current localStorage data to cloud
        const currentData: SyncableData = {
          theme: store.theme,
          subjects: store.subjects,
          progress: store.progress,
          creatureStage: store.creatureStage,
          creatureMood: store.creatureMood,
          dailyGoals: store.dailyGoals,
        };
        debouncedSave(user.id, currentData, 0);
        console.log('Saved initial data to cloud');
      }

      hasLoadedRef.current = true;
      userIdRef.current = user.id;
    };

    load();
  }, [user]);

  // Save data when state changes
  useEffect(() => {
    if (!user || !hasLoadedRef.current) return;

    const data: SyncableData = {
      theme: store.theme,
      subjects: store.subjects,
      progress: store.progress,
      creatureStage: store.creatureStage,
      creatureMood: store.creatureMood,
      dailyGoals: store.dailyGoals,
    };

    debouncedSave(user.id, data);
  }, [
    user,
    store.theme,
    store.subjects,
    store.progress,
    store.creatureStage,
    store.creatureMood,
    store.dailyGoals,
  ]);
}
