import { createClient } from '@/lib/supabase/client'

export interface Service {
  id: number
  title: string
  icon: string
  price: string
  description: string
  options: string[] // max 3 items: time, warranty, quality
  highlights: string[] // max 4 items: special features
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

export interface CreateServiceData {
  title: string
  icon: string
  price: string
  description: string
  options: string[] // max 3 items
  highlights: string[] // max 4 items
  header_tag?: string
  price_min: number
  price_max: number
  applied_for: string[]
  option_1?: string
  option_1_default?: boolean
  option_2?: string
  option_2_default?: boolean
  option_3?: string
  option_3_default?: boolean
  button_text?: string
  is_active?: boolean
  display_order?: number
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  id: number
}

// Get all active services for public display
export async function getActiveServices(): Promise<Service[]> {
  const supabase = createClient()
  
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

// Get all services for admin management
export async function getAllServices(): Promise<Service[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching all services:', error)
    throw new Error('Failed to fetch services')
  }
  
  return data || []
}

// Get a single service by ID
export async function getServiceById(id: number): Promise<Service | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching service:', error)
    return null
  }
  
  return data
}

// Create a new service
export async function createService(serviceData: CreateServiceData): Promise<Service> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('services')
    .insert([{
      ...serviceData,
      option_1: serviceData.option_1 || 'Linh kiện chính hãng',
      option_1_default: serviceData.option_1_default ?? true,
      option_2: serviceData.option_2 || 'Bảo hành 12 tháng',
      option_2_default: serviceData.option_2_default ?? true,
      option_3: serviceData.option_3 || 'Thay trong 30 phút',
      option_3_default: serviceData.option_3_default ?? true,
      button_text: serviceData.button_text || 'Đặt lịch thay pin',
      is_active: serviceData.is_active ?? true,
      display_order: serviceData.display_order || 0,
      updated_at: new Date().toISOString()
    }])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating service:', error)
    throw new Error('Failed to create service')
  }
  
  return data
}

// Update an existing service
export async function updateService(serviceData: UpdateServiceData): Promise<Service> {
  const supabase = createClient()
  
  const { id, ...updateData } = serviceData
  
  const { data, error } = await supabase
    .from('services')
    .update({
      ...updateData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating service:', error)
    throw new Error('Failed to update service')
  }
  
  return data
}

// Delete a service
export async function deleteService(id: number): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting service:', error)
    throw new Error('Failed to delete service')
  }
}

// Toggle service active status
export async function toggleServiceStatus(id: number): Promise<Service> {
  const supabase = createClient()
  
  // First get the current status
  const { data: currentService, error: fetchError } = await supabase
    .from('services')
    .select('is_active')
    .eq('id', id)
    .single()
  
  if (fetchError) {
    console.error('Error fetching service status:', fetchError)
    throw new Error('Failed to fetch service status')
  }
  
  // Toggle the status
  const { data, error } = await supabase
    .from('services')
    .update({
      is_active: !currentService.is_active,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error toggling service status:', error)
    throw new Error('Failed to toggle service status')
  }
  
  return data
}

// Reorder services
export async function reorderServices(serviceOrders: { id: number; display_order: number }[]): Promise<void> {
  const supabase = createClient()
  
  // Update each service's display order
  for (const { id, display_order } of serviceOrders) {
    const { error } = await supabase
      .from('services')
      .update({
        display_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
    
    if (error) {
      console.error('Error updating service order:', error)
      throw new Error('Failed to reorder services')
    }
  }
}
