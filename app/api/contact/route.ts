import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createClient as createServiceClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, service, message } = body

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Tên và số điện thoại là bắt buộc" },
        { status: 400 }
      )
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[0-9+\-\s()]+$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Số điện thoại không hợp lệ" },
        { status: 400 }
      )
    }

    // Validate email format if provided
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Email không hợp lệ" },
          { status: 400 }
        )
      }
    }

    // Create Supabase client
    const supabase = await createClient()

    console.log("Attempting to insert message:", {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      service: service || null,
      message: message ? message.trim() : null,
      status: "pending"
    })

    // Insert message into database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email ? email.trim() : null,
          service: service || null,
          message: message ? message.trim() : null,
          status: "pending"
        }
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      console.error("Error details:", JSON.stringify(error, null, 2))
      return NextResponse.json(
        { 
          error: "Có lỗi xảy ra khi lưu tin nhắn. Vui lòng thử lại.",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: "Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại trong vòng 30 phút.",
        id: data[0]?.id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve messages (for admin)
export async function GET(request: NextRequest) {
  try {
    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    const supabase = createServiceClient(supabaseUrl, supabaseServiceKey)

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "50")

    console.log("GET /api/contact - Fetching messages with params:", { status, limit })

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
        { error: "Có lỗi xảy ra khi tải tin nhắn", details: error.message },
        { status: 500 }
      )
    }

    console.log("GET /api/contact - Successfully fetched messages:", data?.length || 0)

    // Group messages by date
    const groupedMessages = groupMessagesByDate(data || [])
    const stats = calculateStats(data || [])

    return NextResponse.json({ 
      messages: data || [],
      groupedMessages,
      stats,
      success: true
    })

  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tải tin nhắn", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

function groupMessagesByDate(messages: any[]) {
  const groups: { [key: string]: any[] } = {}
  
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
    }, {} as { [key: string]: any[] })
  
  return sortedGroups
}

function calculateStats(messages: any[]) {
  return {
    total: messages.length,
    pending: messages.filter(m => m.status === "pending").length,
    read: messages.filter(m => m.status === "read").length,
    replied: messages.filter(m => m.status === "replied").length,
    closed: messages.filter(m => m.status === "closed").length,
  }
}
