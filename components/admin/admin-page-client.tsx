"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "./admin-dashboard"
import type { BlogPost } from "@/lib/supabase/client"

interface AdminPageClientProps {
  initialPosts: BlogPost[]
}

export default function AdminPageClient({ initialPosts }: AdminPageClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("adminToken")
    const user = localStorage.getItem("adminUser")

    console.log("Admin Page: Checking authentication...")
    console.log("Admin Page: Token exists:", !!token)
    console.log("Admin Page: User exists:", !!user)

    if (!token || !user) {
      console.log("Admin Page: No token or user, redirecting to login")
      router.push("/admin/login")
      return
    }

    // Validate token with backend
    const validateToken = async () => {
      try {
        console.log("Admin Page: Validating token with backend...")
        const response = await fetch("/api/admin/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        })

        console.log("Admin Page: Validation response status:", response.status)

        if (!response.ok) {
          console.log("Admin Page: Token validation failed, clearing storage")
          // Token is invalid, clear storage and redirect
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminUser")
          router.push("/admin/login")
          return
        }

        // Token is valid
        console.log("Admin Page: Token valid, allowing access")
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Admin Page: Error validating token:", error)
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminUser")
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang kiểm tra xác thực...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <AdminDashboard initialPosts={initialPosts} />
}
