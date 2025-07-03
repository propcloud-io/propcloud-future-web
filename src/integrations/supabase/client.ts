
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://vfoozaymnqptuoktococ.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmb296YXltbnFwdHVva3RvY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NjE2NDksImV4cCI6MjA2NzEzNzY0OX0.NiAuisrbOhp4qNTwYitWRexUihtgFJf0hM-_le1nkTc'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})
