import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Battery, Smartphone, Zap, Settings } from "lucide-react"

const services = [
  {
    icon: Battery,
    title: "Thay Pin iPhone",
    description: "Thay pin chính hãng cho tất cả các dòng iPhone từ iPhone 6 đến iPhone 15 Pro Max",
    price: "Từ 500.000đ",
    features: ["Pin chính hãng", "Bảo hành 12 tháng", "Thay trong 30 phút"],
  },
  {
    icon: Zap,
    title: "Kiểm Tra Pin",
    description: "Kiểm tra tình trạng pin iPhone miễn phí, đánh giá độ chai pin và khả năng hoạt động",
    price: "Miễn phí",
    features: ["Kiểm tra miễn phí", "Báo cáo chi tiết", "Tư vấn chuyên nghiệp"],
  },
  {
    icon: Settings,
    title: "Bảo Trì Pin",
    description: "Dịch vụ bảo trì và tối ưu hóa pin iPhone để kéo dài tuổi thọ pin",
    price: "200.000đ",
    features: ["Tối ưu hóa pin", "Làm sạch cổng sạc", "Kiểm tra toàn diện"],
  },
  {
    icon: Smartphone,
    title: "Sửa Chữa Tổng Hợp",
    description: "Sửa chữa các lỗi liên quan đến pin và hệ thống sạc của iPhone",
    price: "Báo giá",
    features: ["Sửa cổng sạc", "Thay IC sạc", "Bảo hành dài hạn"],
  },
]

export default function ServicesSection() {
  return (
    <section id="dich-vu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Dịch Vụ Của Chúng Tôi</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ liên quan đến pin iPhone với chất lượng cao nhất
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-space-grotesk">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Đặt lịch ngay</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
