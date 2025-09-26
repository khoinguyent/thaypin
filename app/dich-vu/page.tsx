import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ContactButton from "@/components/contact-button"
import { Badge } from "@/components/ui/badge"
import { Battery, Smartphone, Zap, Settings, Clock, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "thay-pin",
    icon: Battery,
    title: "Thay Pin iPhone",
    description: "Thay linh kiện chính hãng cho tất cả các dòng iPhone từ iPhone 6 đến iPhone 15 Pro Max",
    price: "Từ 500.000đ",
    duration: "30 phút",
    warranty: "12 tháng",
    popular: true,
    features: [
      "Linh kiện chính hãng",
      "Bảo hành 12 tháng",
      "Thay trong 30 phút",
      "Kiểm tra miễn phí trước khi thay",
      "Hỗ trợ tận nơi",
    ],
  },
  {
    id: "kiem-tra-pin",
    icon: Zap,
    title: "Kiểm Tra Pin",
    description: "Kiểm tra tình trạng pin iPhone miễn phí, đánh giá độ chai pin và khả năng hoạt động",
    price: "Miễn phí",
    duration: "10 phút",
    warranty: "Không áp dụng",
    popular: false,
    features: [
      "Kiểm tra hoàn toàn miễn phí",
      "Báo cáo chi tiết về tình trạng pin",
      "Tư vấn chuyên nghiệp",
      "Đánh giá độ chai pin",
      "Khuyến nghị cách sử dụng",
    ],
  },
  {
    id: "bao-tri-pin",
    icon: Settings,
    title: "Bảo Trì Pin",
    description: "Dịch vụ bảo trì và tối ưu hóa pin iPhone để kéo dài tuổi thọ pin",
    price: "200.000đ",
    duration: "45 phút",
    warranty: "3 tháng",
    popular: false,
    features: [
      "Tối ưu hóa hiệu suất pin",
      "Làm sạch cổng sạc",
      "Kiểm tra toàn diện hệ thống",
      "Cài đặt tối ưu",
      "Hướng dẫn sử dụng",
    ],
  },
  {
    id: "sua-chua-tong-hop",
    icon: Smartphone,
    title: "Sửa Chữa Tổng Hợp",
    description: "Dịch vụ sửa chữa tổng hợp iPhone bao gồm ép kính, ép cảm ứng, sửa Face ID và thay kính lưng",
    price: "Từ 200.000đ",
    duration: "1-2 giờ",
    warranty: "6 tháng",
    popular: false,
    features: [
      "Ép kính, ép cảm ứng",
      "Sửa Face ID, sửa camera",
      "Thay kính lưng",
      "Thay thế linh kiện chính hãng",
      "Bảo hành 6 tháng",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground">
                Dịch Vụ Thay Pin iPhone
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chúng tôi cung cấp đầy đủ các dịch vụ liên quan đến pin iPhone với chất lượng cao nhất, từ thay pin
                chính hãng đến bảo trì và sửa chữa tổng hợp.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`bg-card border-border hover:shadow-lg transition-all duration-300 relative ${service.popular ? "ring-2 ring-primary" : ""}`}
                >
                  {service.popular && (
                    <Badge className="absolute -top-2 left-6 bg-primary text-primary-foreground">Phổ biến nhất</Badge>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-space-grotesk">{service.title}</CardTitle>
                          <div className="text-2xl font-bold text-primary mt-1">{service.price}</div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground mt-3">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Service Info */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <Clock className="w-4 h-4 text-primary mx-auto" />
                        <div className="text-sm font-medium">{service.duration}</div>
                        <div className="text-xs text-muted-foreground">Thời gian</div>
                      </div>
                      <div className="space-y-1">
                        <Shield className="w-4 h-4 text-primary mx-auto" />
                        <div className="text-sm font-medium">{service.warranty}</div>
                        <div className="text-xs text-muted-foreground">Bảo hành</div>
                      </div>
                      <div className="space-y-1">
                        <CheckCircle className="w-4 h-4 text-primary mx-auto" />
                        <div className="text-sm font-medium">Chất lượng</div>
                        <div className="text-xs text-muted-foreground">Đảm bảo</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">Điểm nổi bật:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Link href={service.id === "thay-pin" ? "/dich-vu/thay-pin#bang-gia" : `/dich-vu/${service.id}`}>Xem chi tiết</Link>
                      </Button>
                      <ContactButton className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        Đặt lịch ngay
                      </ContactButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-space-grotesk font-bold text-3xl text-foreground">Cần Tư Vấn Thêm?</h2>
              <p className="text-muted-foreground">
                Liên hệ với chúng tôi để được tư vấn miễn phí về tình trạng pin iPhone của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                      Gọi ngay: 0969 674 679
                </Button>
                <ContactButton variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  Chat với chuyên gia
                </ContactButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
