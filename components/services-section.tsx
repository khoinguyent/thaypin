import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Battery, Zap, Settings, Smartphone, CheckCircle, Clock, Shield, Star } from "lucide-react"
import Link from "next/link"
import ContactButton from "@/components/contact-button"

const services = [
  {
    id: "thay-pin",
    icon: Battery,
    title: "Thay Pin iPhone",
    description: "Thay pin chính hãng cho tất cả các dòng iPhone từ iPhone 6 đến iPhone 15 Pro Max",
    popular: true,
    features: [
      "Linh kiện chính hãng",
      "Bảo hành 12 tháng", 
      "Thay trong 30 phút",
      "Kiểm tra miễn phí trước khi thay"
    ],
    price: "Từ 500.000đ",
    duration: "30 phút",
    warranty: "12 tháng",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: "kiem-tra-pin", 
    icon: Zap,
    title: "Kiểm Tra Pin",
    description: "Kiểm tra tình trạng pin iPhone miễn phí, đánh giá độ chai pin và khả năng hoạt động",
    popular: false,
    features: [
      "Kiểm tra hoàn toàn miễn phí",
      "Báo cáo chi tiết về tình trạng pin",
      "Tư vấn chuyên nghiệp",
      "Đánh giá độ chai pin"
    ],
    price: "Miễn phí",
    duration: "10 phút", 
    warranty: "Không áp dụng",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    id: "bao-tri-pin",
    icon: Settings,
    title: "Bảo Trì Pin", 
    description: "Dịch vụ bảo trì và tối ưu hóa pin iPhone để kéo dài tuổi thọ pin",
    popular: false,
    features: [
      "Tối ưu hóa hiệu suất pin",
      "Làm sạch cổng sạc",
      "Kiểm tra toàn diện hệ thống",
      "Cài đặt tối ưu"
    ],
    price: "200.000đ",
    duration: "45 phút",
    warranty: "3 tháng", 
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    id: "sua-chua-tong-hop",
    icon: Smartphone,
    title: "Sửa Chữa Tổng Hợp",
    description: "Dịch vụ sửa chữa tổng hợp iPhone bao gồm ép kính, ép cảm ứng, sửa Face ID và thay kính lưng",
    popular: false,
    features: [
      "Ép kính, ép cảm ứng",
      "Sửa Face ID, sửa camera", 
      "Thay kính lưng",
      "Thay thế linh kiện chính hãng"
    ],
    price: "Từ 200.000đ",
    duration: "1-2 giờ",
    warranty: "6 tháng",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50", 
    iconColor: "text-orange-600"
  }
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>Dịch vụ nổi bật</span>
          </div>
          <h2 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground">
            Dịch Vụ Thay Pin iPhone
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Chúng tôi cung cấp đầy đủ các dịch vụ liên quan đến pin iPhone với chất lượng cao nhất, 
            từ thay pin chính hãng đến bảo trì và sửa chữa tổng hợp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`group relative overflow-visible h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-border ${
                service.popular ? "ring-2 ring-primary shadow-lg" : ""
              }`}
            >
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground z-20 shadow-lg px-3 py-1 text-sm font-medium">
                  Phổ biến nhất
                </Badge>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <CardHeader className={`relative text-center pb-4 ${service.popular ? 'pt-6' : 'pt-6'}`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-space-grotesk text-foreground">{service.title}</CardTitle>
                <div className="text-2xl font-bold text-primary mt-2">{service.price}</div>
              </CardHeader>

              <CardContent className="relative space-y-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed text-center min-h-[3rem] flex items-center justify-center">
                    {service.description}
                  </p>
                  
                  {/* Service Info */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-1">
                      <Clock className="w-4 h-4 text-primary mx-auto" />
                      <div className="text-xs font-medium">{service.duration}</div>
                      <div className="text-xs text-muted-foreground">Thời gian</div>
                    </div>
                    <div className="space-y-1">
                      <Shield className="w-4 h-4 text-primary mx-auto" />
                      <div className="text-xs font-medium">{service.warranty}</div>
                      <div className="text-xs text-muted-foreground">Bảo hành</div>
                    </div>
                    <div className="space-y-1">
                      <CheckCircle className="w-4 h-4 text-primary mx-auto" />
                      <div className="text-xs font-medium">Chất lượng</div>
                      <div className="text-xs text-muted-foreground">Đảm bảo</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground text-center">Điểm nổi bật:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Button 
                    asChild 
                    size="sm"
                    className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <Link href={service.id === "thay-pin" ? "/dich-vu/thay-pin#bang-gia" : `/dich-vu/${service.id}`}>
                      Xem chi tiết
                    </Link>
                  </Button>
                  <ContactButton 
                    className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Đặt lịch ngay
                  </ContactButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="font-space-grotesk font-bold text-2xl text-foreground mb-4">
              Cần Tư Vấn Thêm?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
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
      </div>
    </section>
  )
}