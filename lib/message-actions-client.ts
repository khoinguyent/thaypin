"use client"

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
    const params = new URLSearchParams()
    if (status && status !== "all") params.append("status", status)
    params.append("limit", limit.toString())

    const apiUrl = `/api/contact?${params}`
    const response = await fetch(apiUrl, { cache: "no-store" })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const result = await response.json()
    return result.messages ?? (Array.isArray(result) ? result : [])
  } catch (error) {
    console.error("getContactMessages error:", error)
    return []
  }
}

export async function getContactMessagesGrouped(
  status?: string,
  limit: number = 50
): Promise<{
  messages: ContactMessage[]
  groupedMessages: { [key: string]: ContactMessage[] }
  stats: { total: number; pending: number; read: number; replied: number; closed: number }
}> {
  try {
    const params = new URLSearchParams()
    if (status && status !== "all") params.append("status", status)
    params.append("limit", limit.toString())

    const apiUrl = `/api/contact?${params}`
    const response = await fetch(apiUrl, { cache: "no-store" })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const result = await response.json()
    return {
      messages: result.messages || [],
      groupedMessages: result.groupedMessages || {},
      stats: result.stats || { total: 0, pending: 0, read: 0, replied: 0, closed: 0 },
    }
  } catch (error) {
    console.error("getContactMessagesGrouped error:", error)
    return { messages: [], groupedMessages: {}, stats: { total: 0, pending: 0, read: 0, replied: 0, closed: 0 } }
  }
}

export async function updateMessageStatus(
  id: string,
  status: "pending" | "read" | "replied" | "closed"
): Promise<boolean> {
  try {
    const response = await fetch(`/api/contact`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const result = await response.json()
    return !!result.success
  } catch (error) {
    console.error("updateMessageStatus error:", error)
    return false
  }
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/contact?id=${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const result = await response.json()
    return !!result.success
  } catch (error) {
    console.error("deleteContactMessage error:", error)
    return false
  }
}


