import { createClient } from '@supabase/supabase-js';

// Try to get credentials from localStorage first
const supabaseUrl = localStorage.getItem('SUPABASE_URL') || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = localStorage.getItem('SUPABASE_ANON_KEY') || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey;
};