import { createClient } from '@/lib/supabase/server'

export interface Service {
  id: number
  title: string
  header_tag?: string
  price_min: number
  price_max: number
  applied_for: string[]
  option_1: string
  option_1_default: boolean
  option_2: string
  option_2_default: boolean
  option_3: string
  option_3_default: boolean
  button_text: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

// Get all active services for public display (server-side)
export async function getActiveServicesServer(): Promise<Service[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching active services:', error)
    throw new Error('Failed to fetch services')
  }
  
  return data || []
}
