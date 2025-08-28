// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

// Check if we have valid Supabase config
const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key-here'

const isDemoMode = !hasValidConfig

if (isDemoMode) {
  console.warn("⚠️  Using demo Supabase config. Please set up your Supabase project in .env.local")
}

// Initialize Supabase client
let supabase: any

if (isDemoMode) {
  console.log("🚀 Running in demo mode - Supabase calls will be mocked")
  
  // Mock Supabase client for demo mode
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        callback('SIGNED_OUT', null)
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
      signUp: () => Promise.reject(new Error("Demo mode - please configure Supabase")),
      signInWithPassword: () => Promise.reject(new Error("Demo mode - please configure Supabase")),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: (table: string) => ({
      select: (columns?: string) => ({
        limit: (count: number) => ({
          data: [],
          error: null,
        }),
        single: () => ({
          data: null,
          error: { message: "Demo mode - no data available" },
        }),
      }),
      insert: (values: any) => Promise.resolve({ data: null, error: { message: "Demo mode - please configure Supabase" } }),
      update: (values: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: { message: "Demo mode - please configure Supabase" } }),
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: { message: "Demo mode - please configure Supabase" } }),
      }),
    }),
    storage: {
      from: (bucket: string) => ({
        upload: () => Promise.reject(new Error("Demo mode - please configure Supabase")),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
      }),
    },
  }
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log("✅ Supabase client initialized successfully")
  } catch (error) {
    console.error("❌ Supabase initialization failed:", error)
    supabase = null
  }
}

export { supabase, isDemoMode }
export default supabase