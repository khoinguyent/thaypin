import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Clock, Shield, CheckCircle, Star, Phone, Wrench, Eye, Camera, Smartphone as PhoneIcon } from "lucide-react"

const repairServices = [
  {
    id: "ep-kinh",
    icon: Smartphone,
    title: "Ép Kính",
    description: "Thay thế kính màn hình iPhone với chất lượng cao, đảm bảo độ trong suốt và độ bền",
    features: ["Kính chính hãng", "Độ trong suốt cao", "Chống trầy xước", "Bảo hành 6 tháng"],
  },
  {
    id: "ep-cam-ung",
    icon: PhoneIcon,
    title: "Ép Cảm Ứng",
    description: "Sửa chữa màn hình cảm ứng, khôi phục khả năng phản hồi touch hoàn hảo",
    features: ["Cảm ứng nhạy", "Độ chính xác cao", "Tương thích hoàn hảo", "Bảo hành 6 tháng"],
  },
  {
    id: "sua-faceid",
    icon: Eye,
    title: "Sửa Face ID",
    description: "Khôi phục chức năng Face ID, đảm bảo bảo mật và tiện lợi cho người dùng",
    features: ["Nhận diện chính xác", "Tốc độ nhanh", "Bảo mật cao", "Bảo hành 6 tháng"],
  },
  {
    id: "thay-kinh-lung",
    icon: Camera,
    title: "Thay Kính Lưng",
    description: "Thay thế kính lưng iPhone với chất lượng cao, giữ nguyên tính thẩm mỹ",
    features: ["Kính chính hãng", "Độ bền cao", "Thẩm mỹ hoàn hảo", "Bảo hành 6 tháng"],
  },
]

const processSteps = [
  {
    step: 1,
    title: "Kiểm tra và chẩn đoán",
    description: "Kiểm tra tình trạng thiết bị, xác định chính xác vấn đề cần sửa chữa",
  },
  {
    step: 2,
    title: "Tư vấn và báo giá",
    description: "Tư vấn chi tiết về phương án sửa chữa và đưa ra báo giá chính xác",
  },
  {
    step: 3,
    title: "Sửa chữa chuyên nghiệp",
    description: "Thực hiện sửa chữa với quy trình chuẩn, sử dụng linh kiện chất lượng cao",
  },
  {
    step: 4,
    title: "Kiểm tra và bàn giao",
    description: "Kiểm tra toàn diện chức năng, đảm bảo hoạt động hoàn hảo trước khi bàn giao",
  },
]

const pricingData = [
  {
    category: "iPhone 14 Series",
    models: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
    services: [
      { name: "Ép Kính", price: "800.000đ - 1.200.000đ" },
      { name: "Ép Cảm Ứng", price: "Liên hệ" },
      { name: "Sửa Face ID", price: "900.000đ - 1.000.000đ" },
      { name: "Thay Kính Lưng", price: "900.000đ - 1.900.000đ" },
    ],
    popular: true,
  },
  {
    category: "iPhone 15 Series",
    models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
    services: [
      { name: "Ép Kính", price: "800.000đ - 1.200.000đ" },
      { name: "Ép Cảm Ứng", price: "Liên hệ" },
      { name: "Sửa Face ID", price: "Liên hệ" },
      { name: "Thay Kính Lưng", price: "Liên hệ" },
    ],
    popular: true,
  },
  {
    category: "iPhone 13 Series",
    models: ["iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"],
    services: [
      { name: "Ép Kính", price: "600.000đ - 700.000đ" },
      { name: "Ép Cảm Ứng", price: "Liên hệ" },
      { name: "Sửa Face ID", price: "800.000đ - 900.000đ" },
      { name: "Thay Kính Lưng", price: "800.000đ - 1.800.000đ" },
    ],
    popular: false,
  },
  {
    category: "iPhone 12 Series & Cũ hơn",
    models: ["iPhone 12", "iPhone 11", "iPhone XS", "iPhone X", "iPhone 8", "iPhone 7"],
    services: [
      { name: "Ép Kính", price: "200.000đ - 600.000đ" },
      { name: "Ép Cảm Ứng", price: "600.000đ - 1.500.000đ" },
      { name: "Sửa Face ID", price: "500.000đ - 700.000đ" },
      { name: "Thay Kính Lưng", price: "400.000đ - 1.500.000đ" },
    ],
    popular: false,
  },
]

export default function GeneralRepairPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-8 h-8 text-primary" />
                  <Badge className="bg-primary text-primary-foreground">Dịch vụ tổng hợp</Badge>
                </div>
                <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                  Sửa Chữa Tổng Hợp
                  <span className="text-primary block">iPhone Chuyên Nghiệp</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dịch vụ sửa chữa tổng hợp iPhone bao gồm ép kính, ép cảm ứng, sửa Face ID và thay kính lưng với 
                  chất lượng cao nhất, bảo hành dài hạn.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1-2</div>
                    <div className="text-sm text-muted-foreground">giờ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">6</div>
                    <div className="text-sm text-muted-foreground">tháng BH</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">chất lượng</div>
                  </div>
                </div>

              </div>

              <div className="relative">
                <Card className="p-6 bg-card border-border">
                  <img
                    src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Flux_Schnell_highresolution_stock_photo_of_a_cluttered_table_w_0.jpg?height=400&width=600"
                    alt="Dịch vụ sửa chữa tổng hợp iPhone chuyên nghiệp"
                    className="w-full h-auto rounded-lg"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Dịch Vụ Sửa Chữa</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Chúng tôi cung cấp đầy đủ các dịch vụ sửa chữa iPhone với chất lượng cao nhất
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {repairServices.map((service, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-space-grotesk">{service.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Quy Trình Sửa Chữa</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quy trình sửa chữa chuẩn 4 bước đảm bảo chất lượng và an toàn tuyệt đối
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <Card key={index} className="bg-card border-border text-center relative">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg font-space-grotesk">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
                  </CardContent>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Bảng Giá Chi Tiết</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Giá cả minh bạch, cạnh tranh với chất lượng linh kiện chính hãng
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-amber-800 text-sm">
                  <strong>Lưu ý:</strong> Đối với iPhone 15 Series và một số dịch vụ, vui lòng liên hệ để được báo giá chính xác.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {pricingData.map((tier, index) => (
                <Card
                  key={index}
                  className={`bg-card border-border ${tier.popular ? "ring-2 ring-primary" : ""} relative`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-2 left-6 bg-primary text-primary-foreground">Phổ biến</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-space-grotesk">{tier.category}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {tier.models.map((model, modelIndex) => (
                        <Badge key={modelIndex} variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {tier.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="font-medium text-sm">{service.name}</span>
                          <span className={`font-bold text-sm ${service.price === "Liên hệ" ? "text-amber-600" : "text-primary"}`}>
                            {service.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        Linh kiện chính hãng
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-primary mr-2" />
                        Bảo hành 6 tháng
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-primary mr-2" />
                        Sửa trong 1-2 giờ
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Đặt lịch sửa chữa
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Tại Sao Chọn Chúng Tôi?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border-border text-center">
                <CardHeader>
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-space-grotesk">Kỹ Thuật Viên Chuyên Nghiệp</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Đội ngũ kỹ thuật viên được đào tạo chuyên sâu, có kinh nghiệm nhiều năm trong sửa chữa iPhone
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-center">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-space-grotesk">Linh Kiện Chính Hãng</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Chỉ sử dụng linh kiện chính hãng, đảm bảo chất lượng và tuổi thọ tối ưu cho thiết bị
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-center">
                <CardHeader>
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-space-grotesk">Bảo Hành Dài Hạn</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Bảo hành 6 tháng cho tất cả dịch vụ sửa chữa, đảm bảo quyền lợi của khách hàng
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-space-grotesk font-bold text-3xl text-foreground">Cần Tư Vấn Thêm?</h2>
              <p className="text-muted-foreground">
                Liên hệ với chúng tôi để được tư vấn miễn phí về tình trạng iPhone của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Phone className="w-4 h-4 mr-2" />
                  Gọi ngay: 0969 674 679
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Chat với chuyên gia
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
