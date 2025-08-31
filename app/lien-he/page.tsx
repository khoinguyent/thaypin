"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Calendar,
  Smartphone,
  Navigation,
} from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Điện thoại",
    value: "0906 674 679 (Thông) / 0908 69 31 38 (Nhật Hãn)",
    description: "Gọi trực tiếp để được tư vấn nhanh nhất",
    action: "tel:0906674679",
    available: "9:00 - 18:00 (Thứ 2 - CN)",
  },
  // {
  //   icon: Mail,
  //   title: "Email",
  //   value: "info@thaypin.vn",
  //   description: "Gửi email để được hỗ trợ chi tiết",
  //   action: "mailto:info@thaypin.vn",
  //   available: "Phản hồi trong 2 giờ",
  // },
  {
    icon: MessageCircle,
    title: "Zalo",
    value: "0906 674 679 (Thông) / 0908 69 31 38 (Nhật Hãn)",
    description: "Chat trực tiếp qua ứng dụng nhắn tin",
    action: "#",
    available: "8:00 - 20:00 hàng ngày",
  },
  {
    icon: Navigation,
    title: "Đến trực tiếp",
    value: "465/32 Đường Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP.HCM",
    description: "Ghé thăm cửa hàng để được kiểm tra miễn phí",
    action: "#",
    available: "9:00 - 18:00 (Thứ 2 - CN)",
  },
]

const serviceAreas = [
  "Quận 1, Quận 3, Quận 5",
  "Quận Bình Thạnh, Quận Phú Nhuận",
  "Quận Tân Bình, Quận 10",
  "Quận Gò Vấp, Quận 12",
  "Thủ Đức, Quận 2, Quận 9",
  "Các quận khác (phí di chuyển)",
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", phone: "", email: "", service: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-8 h-8 text-primary" />
                <Badge className="bg-primary text-primary-foreground">Liên hệ 24/7</Badge>
              </div>
              <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground">
                Liên Hệ Với
                <span className="text-primary block">Thaypin.vn</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được tư vấn miễn phí về tình trạng pin iPhone
                của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Nhiều Cách Liên Hệ</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Chọn cách liên hệ phù hợp nhất với bạn. Chúng tôi cam kết phản hồi nhanh chóng và chuyên nghiệp.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-space-grotesk">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="font-semibold text-foreground">{method.value}</div>
                      <CardDescription className="text-muted-foreground text-sm">{method.description}</CardDescription>
                      <div className="text-xs text-muted-foreground">{method.available}</div>
                    </div>
                    {/* <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                      <a href={method.action}>{method.title === "Điện thoại" ? "Gọi ngay" : "Liên hệ"}</a>
                    </Button> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="space-y-4 mb-8">
                  <h2 className="font-space-grotesk font-bold text-3xl text-foreground">Gửi Tin Nhắn</h2>
                  <p className="text-muted-foreground">
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong vòng 30 phút
                  </p>
                </div>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    {isSubmitted ? (
                      <div className="text-center py-8 space-y-4">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h3 className="font-semibold text-xl text-foreground">Gửi thành công!</h3>
                        <p className="text-muted-foreground">
                          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 30 phút.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Họ và tên *</label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Nhập họ và tên"
                              required
                              className="bg-background border-border"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Số điện thoại *</label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Nhập số điện thoại"
                              required
                              className="bg-background border-border"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Email</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email (không bắt buộc)"
                            className="bg-background border-border"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Dịch vụ quan tâm</label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-md border border-border bg-background text-foreground"
                          >
                            <option value="">Chọn dịch vụ</option>
                            <option value="thay-pin">Thay pin iPhone</option>
                            <option value="kiem-tra">Kiểm tra pin miễn phí</option>
                            <option value="bao-tri">Bảo trì pin</option>
                            <option value="sua-chua">Sửa chữa tổng hợp</option>
                            <option value="tu-van">Tư vấn</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Tin nhắn</label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Mô tả tình trạng iPhone hoặc câu hỏi của bạn..."
                            rows={4}
                            className="bg-background border-border"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          size="lg"
                        >
                          {isSubmitting ? (
                            "Đang gửi..."
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Gửi tin nhắn
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Business Info */}
              <div className="space-y-8">
                {/* Store Info */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="font-space-grotesk flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Thông Tin Cửa Hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Địa chỉ</div>
                          <div className="text-muted-foreground">465/32 Đường Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP.HCM</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Giờ làm việc</div>
                          <div className="text-muted-foreground">
                            <div>Thứ 2 - Chủ nhật: 9:00 - 18:00</div>
                            <div>Hỗ trợ khẩn cấp: 24/7</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Smartphone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">Dịch vụ tận nơi</div>
                          <div className="text-muted-foreground">Miễn phí trong bán kính 10km</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      asChild
                    >
                      <a 
                        href="https://maps.google.com/?q=465/32+Đường+Nguyễn+Văn+Công,+Phường+3,+Quận+Gò+Vấp,+TP.HCM"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Xem bản đồ
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Service Areas */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="font-space-grotesk flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary" />
                      Khu Vực Phục Vụ
                    </CardTitle>
                    <CardDescription>Chúng tôi phục vụ tại các khu vực sau:</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {serviceAreas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center space-y-4">
                    <Phone className="w-8 h-8 text-primary mx-auto" />
                    <div>
                      <h3 className="font-space-grotesk font-semibold text-foreground mb-2">Hỗ Trợ Khẩn Cấp</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        iPhone không bật được, pin phồng, cần hỗ trợ gấp?
                      </p>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Gọi ngay: 0906 674 679
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
