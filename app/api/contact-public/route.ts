import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

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

    // Create message in database
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          phone,
          email: email || null,
          service: service || null,
          message: message || null,
          status: 'new',
          source: 'public_form'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating contact message:', error)
      return NextResponse.json(
        { error: "Có lỗi xảy ra khi lưu tin nhắn" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Tin nhắn đã được gửi thành công",
        data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error in contact API:', error)
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xử lý yêu cầu" },
      { status: 500 }
    )
  }
}