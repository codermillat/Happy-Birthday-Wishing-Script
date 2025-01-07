import { createClient } from '@supabase/supabase-js';

// Try to get credentials from localStorage first
let supabaseUrl = localStorage.getItem('SUPABASE_URL') || import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = localStorage.getItem('SUPABASE_ANON_KEY') || import.meta.env.VITE_SUPABASE_ANON_KEY;

// Remove 'https://' if present in the URL
if (supabaseUrl && supabaseUrl.startsWith('https://')) {
  supabaseUrl = supabaseUrl.replace('https://', '');
}

export const supabase = createClient(`https://${supabaseUrl}`, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-project-url.supabase.co' && supabaseAnonKey !== 'your-anon-key';
};