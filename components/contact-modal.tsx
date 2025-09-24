"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Send } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact-public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại trong vòng 30 phút.')
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        })
        onClose()
      } else {
        alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-background">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-space-grotesk">Gửi Tin Nhắn</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong vòng 30 phút
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Nhập email (không bắt buộc)"
              />
            </div>

            <div>
              <Label htmlFor="service">Dịch vụ quan tâm</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thay-pin">Thay pin iPhone</SelectItem>
                  <SelectItem value="kiem-tra-pin">Kiểm tra pin</SelectItem>
                  <SelectItem value="bao-tri-pin">Bảo trì pin</SelectItem>
                  <SelectItem value="sua-chua-tong-hop">Sửa chữa tổng hợp</SelectItem>
                  <SelectItem value="tu-van">Tư vấn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Tin nhắn</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Mô tả tình trạng iPhone hoặc câu hỏi của bạn..."
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
