'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wrench, DollarSign } from 'lucide-react'
import ServicesManager from '@/components/admin/services-manager'
import PricingManager from '@/components/admin/pricing-manager'

export default function AdminServicesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('services')

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
              <h1 className="text-xl font-bold text-foreground">Quản lý dịch vụ & giá</h1>
              <p className="text-sm text-muted-foreground">
                Quản lý dịch vụ thay pin và bảng giá iPhone
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Wrench className="w-4 h-4" />
              <span>Dịch vụ</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Bảng giá</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
