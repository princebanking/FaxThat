import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://enekttplqegzersoezpn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZWt0dHBscWVnemVyc29lenBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MTM4NzEsImV4cCI6MjA3NzE4OTg3MX0.1nJDj78jna-u19ZDyB3uCzzni4olfCC8VBF7FTgj4I0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
