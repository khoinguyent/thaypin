'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ServicesManager from '@/components/admin/services-manager'

export default function AdminServicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Quản lý dịch vụ</h1>
              <p className="text-sm text-muted-foreground">
                Quản lý các dịch vụ thay pin iPhone
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ServicesManager />
      </main>
    </div>
  )
}
