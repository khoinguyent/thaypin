import { Suspense } from "react"
import BatteryImagesManager from "@/components/admin/battery-images-manager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery } from "lucide-react"

export default function BatteryImagesAdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Battery className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Quản Lý Hình Ảnh Pin</h1>
        </div>
        <p className="text-muted-foreground">
          Quản lý hình ảnh pin iPhone hiển thị trong slider dịch vụ
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Battery Images Set</CardTitle>
          <CardDescription>
            Quản lý hình ảnh pin iPhone cho slider dịch vụ thay pin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Đang tải...</div>}>
            <BatteryImagesManager />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
