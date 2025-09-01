"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  Battery
} from "lucide-react"
import Link from "next/link"

interface AdminUser {
  id: string
  username: string
  email: string
  fullName: string
  role: string
}

export default function AdminDashboardPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("adminToken")
    const user = localStorage.getItem("adminUser")

    console.log("Dashboard: Checking authentication...")
    console.log("Dashboard: Token exists:", !!token)
    console.log("Dashboard: User exists:", !!user)

    if (!token || !user) {
      console.log("Dashboard: No token or user, redirecting to login")
      router.push("/admin/login")
      return
    }

    // Validate token with backend
    const validateToken = async () => {
      try {
        console.log("Dashboard: Validating token with backend...")
        const response = await fetch("/api/admin/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        })

        console.log("Dashboard: Validation response status:", response.status)

        if (!response.ok) {
          console.log("Dashboard: Token validation failed, clearing storage")
          // Token is invalid, clear storage and redirect
          localStorage.removeItem("adminToken")
          localStorage.removeItem("adminUser")
          router.push("/admin/login")
          return
        }

        // Token is valid, set user data
        console.log("Dashboard: Token valid, setting user data")
        setAdminUser(JSON.parse(user))
      } catch (error) {
        console.error("Dashboard: Error validating token:", error)
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminUser")
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    validateToken()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!adminUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Chào mừng, {adminUser.fullName || adminUser.username}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {adminUser.role}
              </Badge>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bảng điều khiển quản trị
          </h2>
          <p className="text-muted-foreground">
            Quản lý nội dung, người dùng và cài đặt hệ thống thaypin.vn
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">1,250+</div>
                  <div className="text-sm text-muted-foreground">Khách hàng</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">45</div>
                  <div className="text-sm text-muted-foreground">Bài viết blog</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">23</div>
                  <div className="text-sm text-muted-foreground">Tin nhắn mới</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Hài lòng</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Blog Management */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Quản lý Blog</span>
              </CardTitle>
              <CardDescription>
                Tạo, chỉnh sửa và quản lý bài viết blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/blog">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Quản lý Blog
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Battery Images Management */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Battery className="w-5 h-5 text-primary" />
                <span>Hình ảnh Pin</span>
              </CardTitle>
              <CardDescription>
                Quản lý hình ảnh pin iPhone cho slider dịch vụ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/battery-images">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Quản lý hình ảnh
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Contact Messages */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Tin nhắn liên hệ</span>
              </CardTitle>
              <CardDescription>
                Xem và phản hồi tin nhắn từ khách hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/contacts">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Xem tin nhắn
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Cài đặt hệ thống</span>
              </CardTitle>
              <CardDescription>
                Cấu hình website và thông tin công ty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/settings">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Cài đặt
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>
                Các hoạt động mới nhất trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Bài viết mới được tạo</div>
                    <div className="text-xs text-muted-foreground">&quot;Hướng dẫn thay pin iPhone 15&quot;</div>
                  </div>
                  <div className="text-xs text-muted-foreground">2 giờ trước</div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Tin nhắn mới từ khách hàng</div>
                    <div className="text-xs text-muted-foreground">Nguyễn Văn A - Tư vấn thay pin</div>
                  </div>
                  <div className="text-xs text-muted-foreground">4 giờ trước</div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Khách hàng mới đăng ký</div>
                    <div className="text-xs text-muted-foreground">Trần Thị B - 0908 69 31 38</div>
                  </div>
                  <div className="text-xs text-muted-foreground">6 giờ trước</div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Battery className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Hình ảnh pin mới được thêm</div>
                    <div className="text-xs text-muted-foreground">iPhone 15 Pro Max battery image</div>
                  </div>
                  <div className="text-xs text-muted-foreground">8 giờ trước</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
