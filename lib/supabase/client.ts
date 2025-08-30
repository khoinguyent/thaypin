import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  created_at: string
  updated_at: string
}
