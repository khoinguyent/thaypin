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

    // For page routes, check for admin token in cookies or headers
    const token = request.cookies.get('adminToken')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as any
      
      // Check if token is expired
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        // Token expired, redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      // Token is valid, continue
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
