import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tpgfxmlwhdifjdbwwkmm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZ2Z4bWx3aGRpZmpkYnd3a21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MzY5MjUsImV4cCI6MjA4MjAxMjkyNX0.MK-sRvwJCyWvVCRfP9O5xIF0Q51jgt3TvLyHdB81Ouc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
