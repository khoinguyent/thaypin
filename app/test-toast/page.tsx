"use client"

import { useToast } from "@/components/ui/toast-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestToastPage() {
  const { showSuccess, showError } = useToast()

  const handleSuccessToast = () => {
    showSuccess(
      "Thành công!",
      "Đây là thông báo thành công từ hệ thống toast."
    )
  }

  const handleErrorToast = () => {
    showError(
      "Có lỗi xảy ra!",
      "Đây là thông báo lỗi từ hệ thống toast."
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Toast Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Nhấn các nút bên dưới để test hệ thống thông báo toast mới.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleSuccessToast}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Test Success Toast
              </Button>
              
              <Button 
                onClick={handleErrorToast}
                variant="destructive"
                className="w-full"
              >
                Test Error Toast
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Tính năng mới:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✅ Thông báo toast thay thế window.alert()</li>
                <li>✅ Hai loại: Success (xanh) và Error (đỏ)</li>
                <li>✅ Tự động ẩn sau 5-7 giây</li>
                <li>✅ Có thể đóng thủ công</li>
                <li>✅ Hiển thị ở góc phải màn hình</li>
                <li>✅ Hỗ trợ tiêu đề và mô tả</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
