import { createClient } from '@/lib/supabase/client'

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

export interface CreatePricingData {
  model: string
  price: number
  original_price: number
  is_popular?: boolean
  is_active?: boolean
  display_order?: number
}

export interface UpdatePricingData {
  model?: string
  price?: number
  original_price?: number
  is_popular?: boolean
  is_active?: boolean
  display_order?: number
}

// Get all active pricing items for public display
export async function getActivePricingItems(): Promise<PricingItem[]> {
  const supabase = createClient()
  
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

// Get all pricing items (for admin)
export async function getAllPricingItems(): Promise<PricingItem[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('pricing')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching all pricing items:', error)
    throw new Error('Failed to fetch pricing items')
  }
  
  return data || []
}

// Get pricing item by ID
export async function getPricingItemById(id: number): Promise<PricingItem | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('pricing')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching pricing item:', error)
    return null
  }
  
  return data
}

// Create new pricing item
export async function createPricingItem(data: CreatePricingData): Promise<PricingItem> {
  const supabase = createClient()
  
  const { data: result, error } = await supabase
    .from('pricing')
    .insert([data])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating pricing item:', error)
    throw new Error('Failed to create pricing item')
  }
  
  return result
}

// Update pricing item
export async function updatePricingItem(id: number, data: UpdatePricingData): Promise<PricingItem> {
  const supabase = createClient()
  
  const { data: result, error } = await supabase
    .from('pricing')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating pricing item:', error)
    throw new Error('Failed to update pricing item')
  }
  
  return result
}

// Delete pricing item
export async function deletePricingItem(id: number): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('pricing')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting pricing item:', error)
    throw new Error('Failed to delete pricing item')
  }
}

// Toggle pricing item active status
export async function togglePricingItemStatus(id: number): Promise<PricingItem> {
  const supabase = createClient()
  
  // First get current status
  const { data: current, error: fetchError } = await supabase
    .from('pricing')
    .select('is_active')
    .eq('id', id)
    .single()
  
  if (fetchError) {
    console.error('Error fetching pricing item status:', fetchError)
    throw new Error('Failed to fetch pricing item status')
  }
  
  // Toggle status
  const { data: result, error } = await supabase
    .from('pricing')
    .update({ 
      is_active: !current.is_active,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error toggling pricing item status:', error)
    throw new Error('Failed to toggle pricing item status')
  }
  
  return result
}

// Reorder pricing items
export async function reorderPricingItems(items: { id: number; display_order: number }[]): Promise<void> {
  const supabase = createClient()
  
  const updates = items.map(item => 
    supabase
      .from('pricing')
      .update({ 
        display_order: item.display_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id)
  )
  
  const results = await Promise.all(updates)
  
  const errors = results.filter(result => result.error)
  if (errors.length > 0) {
    console.error('Error reordering pricing items:', errors)
    throw new Error('Failed to reorder pricing items')
  }
}
