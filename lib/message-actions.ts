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
    const supabase = await createClient()

    let query = supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching contact messages:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getContactMessages:", error)
    return []
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
    const supabase = await createClient()

    const { error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id)

    if (error) {
      console.error("Error updating message status:", error)
      return false
    }

    revalidatePath("/admin")
    return true
  } catch (error) {
    console.error("Error in updateMessageStatus:", error)
    return false
  }
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting contact message:", error)
      return false
    }

    revalidatePath("/admin")
    return true
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
