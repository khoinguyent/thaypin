import { createClient } from '@/lib/supabase/server'

export interface PricingItem {
  id: number
  model: string
  price: number
  original_price: number
  is_popular: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

// Get all active pricing items for public display (server-side)
export async function getActivePricingItemsServer(): Promise<PricingItem[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('pricing')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching active pricing items:', error)
    throw new Error('Failed to fetch pricing items')
  }
  
  return data || []
}
