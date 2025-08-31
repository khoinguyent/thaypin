import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

interface JwtPayload {
  userId: string
  username: string
  role: string
  exp?: number
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      
      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return NextResponse.json({ error: 'Token expired' }, { status: 401 })
      }

      // Token is valid
      return NextResponse.json({
        valid: true,
        user: {
          userId: decoded.userId,
          username: decoded.username,
          role: decoded.role,
        }
      })

    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
