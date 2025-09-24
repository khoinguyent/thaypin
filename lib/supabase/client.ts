import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Export createClient function for use in other files
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  category: string
  featured: boolean
  image_url: string | null
  meta_description: string | null
  tags: string[]
  published: boolean
  video_type?: "url" | "upload" | "none"
  video_url?: string | undefined
  video_file_url?: string | undefined
  video_thumbnail?: string | undefined
  created_at: string
  updated_at: string
}
