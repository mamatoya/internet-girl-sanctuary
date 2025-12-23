import { supabase } from './supabase';

export interface SyncableData {
  theme: string;
  subjects: unknown[];
  progress: unknown;
  creatureStage: number;
  creatureMood: string;
  dailyGoals: unknown[];
}

// Load user data from Supabase
export async function loadUserData(userId: string): Promise<SyncableData | null> {
  const { data, error } = await supabase
    .from('user_data')
    .select('data')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No data found - new user
      return null;
    }
    console.error('Error loading user data:', error);
    return null;
  }

  return data?.data as SyncableData;
}

// Save user data to Supabase
export async function saveUserData(userId: string, data: SyncableData): Promise<boolean> {
  const { error } = await supabase
    .from('user_data')
    .upsert(
      {
        user_id: userId,
        data,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      }
    );

  if (error) {
    console.error('Error saving user data:', error);
    return false;
  }

  return true;
}

// Debounced save - prevents too many writes
let saveTimeout: ReturnType<typeof setTimeout> | null = null;

export function debouncedSave(userId: string, data: SyncableData, delay = 2000) {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  saveTimeout = setTimeout(() => {
    saveUserData(userId, data);
    saveTimeout = null;
  }, delay);
}
