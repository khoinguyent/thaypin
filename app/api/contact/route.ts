import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
      return NextResponse.json(
        { error: "Có lỗi xảy ra khi lưu tin nhắn. Vui lòng thử lại." },
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

// Optional: GET endpoint to retrieve messages (for admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

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

    return NextResponse.json({ messages: data || [] })

  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tải tin nhắn" },
      { status: 500 }
    )
  }
}
