"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/toast-provider"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
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
  Zap,
  Shield,
  Star,
  Award,
  Users,
  CheckSquare,
  Globe,
  Truck,
} from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Điện thoại",
    value: "0969 674 679 (Thông) / 0908 69 31 38 (Nhật Hãn)",
    description: "Gọi trực tiếp để được tư vấn nhanh nhất",
    action: "tel:0969674679",
    available: "9:00 - 18:00 (Thứ 2 - CN)",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tags: ["Hỗ trợ 24/7", "Tư vấn miễn phí"],
  },
  {
    icon: MessageCircle,
    title: "Zalo",
    value: "0702514166",
    description: "Chat trực tiếp qua ứng dụng nhắn tin",
    action: "#",
    available: "8:00 - 20:00 hàng ngày",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    tags: ["Chat trực tiếp", "Gửi ảnh"],
  },
  {
    icon: Navigation,
    title: "Đến trực tiếp",
    value: "465/32 Đường Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP.HCM",
    description: "Ghé thăm cửa hàng để được kiểm tra miễn phí",
    action: "#",
    available: "9:00 - 18:00 (Thứ 2 - CN)",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    tags: ["Kiểm tra miễn phí", "Tư vấn trực tiếp"],
  },
]

// const serviceAreas = [
//   "Quận 1, Quận 3, Quận 5",
//   "Quận Bình Thạnh, Quận Phú Nhuận",
//   "Quận Tân Bình, Quận 10",
//   "Quận Gò Vấp, Quận 12",
//   "Thủ Đức, Quận 2, Quận 9",
//   "Các quận khác (phí di chuyển)",
// ]

const features = [
  {
    icon: Zap,
    title: "Phản hồi nhanh",
    description: "Trả lời trong vòng 5 phút",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Shield,
    title: "Bảo hành chính hãng",
    description: "12 tháng bảo hành toàn diện",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Star,
    title: "Đánh giá 5 sao",
    description: "Hơn 1000+ khách hàng hài lòng",
    color: "from-pink-500 to-rose-500"
  }
]

const additionalFeatures = [
  {
    icon: Award,
    title: "Chứng nhận Apple",
    description: "Kỹ thuật viên được đào tạo chính thức"
  },
  {
    icon: Users,
    title: "Đội ngũ chuyên gia",
    description: "Hơn 10 năm kinh nghiệm trong ngành"
  },
  {
    icon: CheckSquare,
    title: "Chất lượng đảm bảo",
    description: "100% linh kiện chính hãng"
  },
  {
    icon: Globe,
    title: "Phục vụ toàn TP.HCM",
    description: "Miễn phí di chuyển trong 10km"
  },
  {
    icon: Truck,
    title: "Giao hàng tận nơi",
    description: "Hỗ trợ giao nhận linh kiện"
  }
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
  const { showSuccess, showError } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send message to API
      const response = await fetch('/api/contact-public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Có lỗi xảy ra khi gửi tin nhắn')
      }

      // Success
      setIsSubmitting(false)
      setIsSubmitted(true)
      showSuccess(
        'Tin nhắn đã được gửi thành công!',
        'Chúng tôi sẽ liên hệ lại trong vòng 30 phút.'
      )

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", phone: "", email: "", service: "", message: "" })
      }, 5000)

    } catch (error) {
      console.error('Error sending message:', error)
      setIsSubmitting(false)
      showError(
        'Có lỗi xảy ra khi gửi tin nhắn',
        error instanceof Error ? error.message : 'Vui lòng thử lại sau.'
      )
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 text-sm font-medium">
                  Liên hệ 24/7
                </Badge>
              </div>
              <h1 className="font-space-grotesk font-bold text-5xl lg:text-6xl text-foreground leading-tight">
                Liên Hệ Với
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 block">thaypin.vn</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được tư vấn miễn phí về tình trạng pin iPhone
                của bạn.
              </p>
              
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className={`p-2 bg-gradient-to-br ${feature.color} rounded-lg`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground text-sm">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-12">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Tại Sao Chọn Chúng Tôi?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Đội ngũ chuyên gia với kinh nghiệm lâu năm, cam kết mang đến dịch vụ chất lượng cao nhất
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200/50">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Phone className="w-4 h-4" />
                <span>Liên hệ</span>
              </div>
              <h2 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground">Nhiều Cách Liên Hệ</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Chọn cách liên hệ phù hợp nhất với bạn. Chúng tôi cam kết phản hồi nhanh chóng và chuyên nghiệp.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {contactMethods.map((method, index) => (
                <Card key={index} className="relative border shadow-lg bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                  <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                    {/* Top section with icon and contact info */}
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {method.title === "Zalo" ? (
                          <Image src="/zalo-logo.svg" alt="Zalo" width={32} height={32} className="w-8 h-8" />
                        ) : (
                          <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        {method.title === "Điện thoại" ? (
                          <>
                            <a 
                              href="tel:0969674679" 
                              className="block text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200"
                            >
                              0969 674 679 (Thông)
                            </a>
                            <a 
                              href="tel:0908693138" 
                              className="block text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200"
                            >
                              0908 69 31 38 (Nhật Hãn)
                            </a>
                          </>
                        ) : (
                          <div className="text-lg font-semibold text-foreground">{method.value}</div>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 min-h-[40px] items-start">
                      {method.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs px-3 py-1 border-border text-muted-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Availability */}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{method.available}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed min-h-[44px]">
                      {method.description}
                    </p>

                    {/* No call button for phone card as requested */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div>
                <div className="space-y-6 mb-10 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <Send className="w-4 h-4" />
                    <span>Gửi tin nhắn</span>
                  </div>
                  <h2 className="font-space-grotesk font-bold text-4xl text-foreground">Gửi Tin Nhắn</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong vòng 30 phút
                  </p>
                </div>

                <Card className="bg-white border-0 shadow-xl">
                  <CardContent className="p-8">
                    {isSubmitted ? (
                      <div className="text-center py-12 space-y-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="font-space-grotesk font-bold text-2xl text-foreground">Gửi thành công!</h3>
                        <p className="text-muted-foreground text-lg">
                          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 30 phút.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground">Họ và tên *</label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Nhập họ và tên"
                              required
                              className="bg-background border-border h-12 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="text-sm font-semibold text-foreground">Số điện thoại *</label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Nhập số điện thoại"
                              required
                              className="bg-background border-border h-12 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-foreground">Email</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email (không bắt buộc)"
                            className="bg-background border-border h-12 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-foreground">Dịch vụ quan tâm</label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full p-4 rounded-lg border border-border bg-background text-foreground h-12 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          >
                            <option value="">Chọn dịch vụ</option>
                            <option value="thay-pin">Thay pin iPhone</option>
                            <option value="kiem-tra">Kiểm tra pin miễn phí</option>
                            <option value="bao-tri">Bảo trì pin</option>
                            <option value="sua-chua">Sửa chữa tổng hợp</option>
                            <option value="tu-van">Tư vấn</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-semibold text-foreground">Tin nhắn</label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Mô tả tình trạng iPhone hoặc câu hỏi của bạn..."
                            rows={5}
                            className="bg-background border-border text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground h-14 text-lg font-semibold shadow-lg transition-colors duration-300"
                          size="lg"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Đang gửi...</span>
                            </div>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-3" />
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
                <Card className="bg-white border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
                    <CardTitle className="font-space-grotesk flex items-center text-xl">
                      <MapPin className="w-6 h-6 mr-3 text-primary" />
                      Thông Tin Cửa Hàng
                    </CardTitle>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Địa chỉ</div>
                          <div className="text-muted-foreground leading-relaxed">465/32 Đường Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP.HCM</div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Giờ làm việc</div>
                          <div className="text-muted-foreground space-y-1">
                            <div>Thứ 2 - Chủ nhật: 9:00 - 18:00</div>
                            <div className="text-primary font-medium">Hỗ trợ khẩn cấp: 24/7</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <Smartphone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-foreground mb-1">Dịch vụ tận nơi</div>
                          <div className="text-muted-foreground">Miễn phí trong bán kính 10km</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7837.69032481567!2d106.6682617!3d10.8231589!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752946c7a8604b%3A0x17d0b3fd55910e20!2sICFix%20Team!5e0!3m2!1svi!2s!4v1759043917416!5m2!1svi!2s" 
                          width="100%" 
                          height="100%" 
                          style={{border: 0}} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Vị trí cửa hàng thaypin.vn"
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent h-12 text-base font-semibold transition-all duration-300 transform hover:scale-105"
                        asChild
                      >
                        <a 
                          href="https://maps.google.com/?q=465/32+Đường+Nguyễn+Văn+Công,+Phường+3,+Quận+Gò+Vấp,+TP.HCM"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-5 h-5 mr-2" />
                          Mở Google Maps
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Service Areas */}
                {/* <Card className="bg-white border-0 shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/10 p-6">
                    <CardTitle className="font-space-grotesk flex items-center text-xl">
                      <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                      Khu Vực Phục Vụ
                    </CardTitle>
                    <CardDescription className="text-base mt-2">Chúng tôi phục vụ tại các khu vực sau:</CardDescription>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-3">
                      {serviceAreas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm font-medium">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}

                {/* Emergency Contact */}
                <Card className="bg-gradient-to-br from-red-500/5 to-red-600/10 border-red-200/50 shadow-xl overflow-hidden">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <Phone className="w-10 h-10 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-space-grotesk font-bold text-2xl text-foreground mb-3">Hỗ Trợ Khẩn Cấp</h3>
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        iPhone không bật được, pin phồng, cần hỗ trợ gấp?
                      </p>
                      <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Phone className="w-5 h-5 mr-2" />
                        Gọi ngay: 0969 674 679
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
