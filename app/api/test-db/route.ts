import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  try {
    console.log("Testing database connection...")
    
    // Create Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    console.log("Supabase URL:", supabaseUrl ? "Set" : "Not set")
    console.log("Service Key:", supabaseServiceKey ? "Set" : "Not set")
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Test basic connection
    const { data, error } = await supabase
      .from("contact_messages")
      .select("count", { count: 'exact' })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { 
          error: "Database connection failed", 
          details: error.message,
          supabaseUrl: supabaseUrl ? "Set" : "Not set",
          serviceKey: supabaseServiceKey ? "Set" : "Not set"
        },
        { status: 500 }
      )
    }

    console.log("Database connection successful, count:", data)

    // Get all messages
    const { data: messages, error: messagesError } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (messagesError) {
      console.error("Messages error:", messagesError)
      return NextResponse.json(
        { 
          error: "Failed to fetch messages", 
          details: messagesError.message,
          count: data
        },
        { status: 500 }
      )
    }

    console.log("Messages fetched:", messages?.length || 0)

    return NextResponse.json({
      success: true,
      count: data,
      messages: messages || [],
      totalMessages: messages?.length || 0
    })

  } catch (error) {
    console.error("Test DB error:", error)
    return NextResponse.json(
      { 
        error: "Test failed", 
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
