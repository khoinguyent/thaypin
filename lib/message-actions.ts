"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface ContactMessage {
  id: string
  name: string
  phone: string
  email: string | null
  service: string | null
  message: string | null
  status: "pending" | "read" | "replied" | "closed"
  created_at: string
  updated_at: string
}

export async function getContactMessages(status?: string, limit: number = 50): Promise<ContactMessage[]> {
  try {
    // Use the admin API endpoint that bypasses RLS
    const params = new URLSearchParams()
    if (status && status !== "all") {
      params.append("status", status)
    }
    params.append("limit", limit.toString())

    const apiUrl = `${window.location.origin}/api/contact?${params}`
    console.log("Fetching messages from:", apiUrl)
    
    const response = await fetch(apiUrl)
    console.log("Response status:", response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("API Response:", result)
    return result.messages || []
  } catch (error) {
    console.error("Error in getContactMessages:", error)
    return []
  }
}

export async function getContactMessagesGrouped(status?: string, limit: number = 50): Promise<{ messages: ContactMessage[], groupedMessages: { [key: string]: ContactMessage[] }, stats: { total: number, pending: number, read: number, replied: number, closed: number } }> {
  try {
    // Use the admin API endpoint that bypasses RLS
    const params = new URLSearchParams()
    if (status && status !== "all") {
      params.append("status", status)
    }
    params.append("limit", limit.toString())

    const apiUrl = `${window.location.origin}/api/contact?${params}`
    console.log("Fetching grouped messages from:", apiUrl)
    
    const response = await fetch(apiUrl)
    console.log("Grouped response status:", response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Grouped API Error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("Grouped API Response:", result)
    return {
      messages: result.messages || [],
      groupedMessages: result.groupedMessages || {},
      stats: result.stats || { total: 0, pending: 0, read: 0, replied: 0, closed: 0 }
    }
  } catch (error) {
    console.error("Error in getContactMessagesGrouped:", error)
    return {
      messages: [],
      groupedMessages: {},
      stats: { total: 0, pending: 0, read: 0, replied: 0, closed: 0 }
    }
  }
}

export async function getContactMessageById(id: string): Promise<ContactMessage | null> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching contact message:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getContactMessageById:", error)
    return null
  }
}

export async function updateMessageStatus(id: string, status: "pending" | "read" | "replied" | "closed"): Promise<boolean> {
  try {
    const response = await fetch(`${window.location.origin}/api/contact`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    revalidatePath("/admin")
    return result.success
  } catch (error) {
    console.error("Error in updateMessageStatus:", error)
    return false
  }
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${window.location.origin}/api/contact?id=${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    revalidatePath("/admin")
    return result.success
  } catch (error) {
    console.error("Error in deleteContactMessage:", error)
    return false
  }
}

export async function getMessageStats(): Promise<{
  total: number
  pending: number
  read: number
  replied: number
  closed: number
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("contact_messages")
      .select("status")

    if (error) {
      console.error("Error fetching message stats:", error)
      return { total: 0, pending: 0, read: 0, replied: 0, closed: 0 }
    }

    const stats = {
      total: data.length,
      pending: data.filter(msg => msg.status === "pending").length,
      read: data.filter(msg => msg.status === "read").length,
      replied: data.filter(msg => msg.status === "replied").length,
      closed: data.filter(msg => msg.status === "closed").length,
    }

    return stats
  } catch (error) {
    console.error("Error in getMessageStats:", error)
    return { total: 0, pending: 0, read: 0, replied: 0, closed: 0 }
  }
}
