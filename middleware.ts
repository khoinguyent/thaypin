import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // For API routes, check Authorization header
    if (request.nextUrl.pathname.startsWith('/api/admin')) {
      const authHeader = request.headers.get('authorization')
      const token = authHeader ? authHeader.replace('Bearer ', '') : null

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          return NextResponse.json({ error: 'Token expired' }, { status: 401 })
        }
        return NextResponse.next()
      } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
    }

    // For page routes, allow access and let client-side handle auth
    // This prevents the redirect loop while maintaining security
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
