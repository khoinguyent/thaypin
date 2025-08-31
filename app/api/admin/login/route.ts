import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createClient } from '@/lib/supabase/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Tên đăng nhập và mật khẩu là bắt buộc' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Query admin user from database
    const { data: adminUser, error: queryError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single()

    if (queryError || !adminUser) {
      return NextResponse.json(
        { error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, adminUser.password_hash)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id)

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: adminUser.id,
        username: adminUser.username,
        role: adminUser.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Return success response
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        fullName: adminUser.full_name,
        role: adminUser.role,
      },
      message: 'Đăng nhập thành công'
    })

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'Lỗi server. Vui lòng thử lại sau.' },
      { status: 500 }
    )
  }
}
