import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test if pricing table exists by trying to query it
    const { data, error } = await supabase
      .from('pricing')
      .select('count')
      .limit(1)
    
    if (error) {
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        hint: error.hint,
        details: error.details
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Pricing table exists and is accessible",
      count: data?.length || 0
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
