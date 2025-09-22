import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Create Supabase client with service role key to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, service, message } = body

    console.log("Contact form submission:", { name, phone, email, service, message })

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

    // Insert message into database using service role (bypasses RLS)
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

    console.log("Message saved successfully:", data[0])

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
