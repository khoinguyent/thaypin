"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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

// Get all pricing items (for admin)
export async function getAllPricingItemsServer(): Promise<PricingItem[]> {
  const supabase = await createClient()
  
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

// Create new pricing item
export async function createPricingItemServer(data: CreatePricingData): Promise<PricingItem> {
  const supabase = await createClient()
  
  const { data: result, error } = await supabase
    .from('pricing')
    .insert([data])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating pricing item:', error)
    throw new Error('Failed to create pricing item')
  }
  
  revalidatePath('/admin/services')
  revalidatePath('/')
  return result
}

// Update pricing item
export async function updatePricingItemServer(id: number, data: UpdatePricingData): Promise<PricingItem> {
  const supabase = await createClient()
  
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
  
  revalidatePath('/admin/services')
  revalidatePath('/')
  return result
}

// Delete pricing item
export async function deletePricingItemServer(id: number): Promise<void> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('pricing')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting pricing item:', error)
    throw new Error('Failed to delete pricing item')
  }
  
  revalidatePath('/admin/services')
  revalidatePath('/')
}

// Toggle pricing item active status
export async function togglePricingItemStatusServer(id: number): Promise<PricingItem> {
  const supabase = await createClient()
  
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
  
  revalidatePath('/admin/services')
  revalidatePath('/')
  return result
}

// Form action for updating pricing item
export async function updatePricingItemAction(formData: FormData) {
  try {
    const id = parseInt(formData.get('id') as string)
    const data: UpdatePricingData = {
      model: formData.get('model') as string,
      price: parseInt(formData.get('price') as string),
      original_price: parseInt(formData.get('original_price') as string),
      is_popular: formData.get('is_popular') === 'true',
      is_active: formData.get('is_active') === 'true',
      display_order: parseInt(formData.get('display_order') as string)
    }
    
    return await updatePricingItemServer(id, data)
  } catch (error) {
    console.error('Error in updatePricingItemAction:', error)
    throw new Error(`Failed to update pricing item: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Form action for creating pricing item
export async function createPricingItemAction(formData: FormData) {
  try {
    const data: CreatePricingData = {
      model: formData.get('model') as string,
      price: parseInt(formData.get('price') as string),
      original_price: parseInt(formData.get('original_price') as string),
      is_popular: formData.get('is_popular') === 'true',
      is_active: formData.get('is_active') === 'true',
      display_order: parseInt(formData.get('display_order') as string)
    }
    
    return await createPricingItemServer(data)
  } catch (error) {
    console.error('Error in createPricingItemAction:', error)
    throw new Error(`Failed to create pricing item: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Form action for deleting pricing item
export async function deletePricingItemAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string)
  return await deletePricingItemServer(id)
}

// Form action for toggling pricing item status
export async function togglePricingItemStatusAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string)
  return await togglePricingItemStatusServer(id)
}