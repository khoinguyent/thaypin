import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "50")

    // Build query
    let query = supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    // Filter by status if provided
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Có lỗi xảy ra khi tải tin nhắn" },
        { status: 500 }
      )
    }

    // Group messages by date
    const groupedMessages = groupMessagesByDate(data || [])

    return NextResponse.json({ 
      messages: data || [],
      groupedMessages,
      stats: calculateStats(data || [])
    })

  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tải tin nhắn" },
      { status: 500 }
    )
  }
}

function groupMessagesByDate(messages: Array<{created_at: string, [key: string]: unknown}>) {
  const groups: { [key: string]: Array<{created_at: string, [key: string]: unknown}> } = {}
  
  messages.forEach(message => {
    const date = new Date(message.created_at)
    const dateKey = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    
    groups[dateKey].push(message)
  })
  
  // Sort groups by date (newest first)
  const sortedGroups = Object.keys(groups)
    .sort((a, b) => {
      const dateA = new Date(a.split(' ').reverse().join('-'))
      const dateB = new Date(b.split(' ').reverse().join('-'))
      return dateB.getTime() - dateA.getTime()
    })
    .reduce((result, key) => {
      result[key] = groups[key]
      return result
    }, {} as { [key: string]: Array<{created_at: string, [key: string]: unknown}> })
  
  return sortedGroups
}

function calculateStats(messages: Array<{status: string, [key: string]: unknown}>) {
  return {
    total: messages.length,
    pending: messages.filter(m => m.status === "pending").length,
    read: messages.filter(m => m.status === "read").length,
    replied: messages.filter(m => m.status === "replied").length,
    closed: messages.filter(m => m.status === "closed").length,
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID và status là bắt buộc" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id)
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Có lỗi xảy ra khi cập nhật trạng thái" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: data[0] })

  } catch (error) {
    console.error("Update message error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật tin nhắn" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID là bắt buộc" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { error: "Có lỗi xảy ra khi xóa tin nhắn" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Delete message error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xóa tin nhắn" },
      { status: 500 }
    )
  }
}
