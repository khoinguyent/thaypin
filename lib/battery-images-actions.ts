"use server"

import { createClient } from "@/lib/supabase/server"

export interface BatteryImage {
  id: number
  set_name: string
  url: string
  caption: string
  alt_text: string | null
  order_index: number
  is_active: boolean
  visible: boolean
  created_at: string
  updated_at: string
}

export async function getBatteryImagesBySet(setName: string): Promise<BatteryImage[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('battery_images')
    .select('*')
    .eq('set_name', setName)
    .eq('is_active', true)
    .eq('visible', true)
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching battery images:', error)
    return []
  }
  
  return data || []
}

export async function getAllBatteryImageSets(): Promise<string[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('battery_images')
    .select('set_name')
    .eq('is_active', true)
    .order('set_name', { ascending: true })
  
  if (error) {
    console.error('Error fetching battery image sets:', error)
    return []
  }
  
  // Get unique set names
  const uniqueSets = [...new Set(data?.map((item: { set_name: string }) => item.set_name) || [])]
  return uniqueSets
}

// Admin functions for managing battery images
export async function getAllBatteryImages(): Promise<BatteryImage[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('battery_images')
    .select('*')
    .order('set_name', { ascending: true })
    .order('order_index', { ascending: true })
  
  if (error) {
    console.error('Error fetching all battery images:', error)
    return []
  }
  
  return data || []
}

export async function createBatteryImage(imageData: Omit<BatteryImage, 'id' | 'created_at' | 'updated_at'>): Promise<BatteryImage | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('battery_images')
    .insert([imageData])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating battery image:', error)
    return null
  }
  
  return data
}

export async function updateBatteryImage(id: number, updates: Partial<BatteryImage>): Promise<BatteryImage | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('battery_images')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating battery image:', error)
    return null
  }
  
  return data
}

export async function deleteBatteryImage(id: number): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('battery_images')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting battery image:', error)
    return false
  }
  
  return true
}
