import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Battery, Smartphone, Zap, CheckCircle, Clock, Shield } from "lucide-react"

const maintenanceServices = [
  {
    icon: Battery,
    title: "Tối ưu hóa pin",
    description: "Hiệu chuẩn pin và tối ưu hóa hiệu suất để kéo dài tuổi thọ",
  },
  {
    icon: Zap,
    title: "Làm sạch cổng sạc",
    description: "Vệ sinh cổng sạc Lightning/USB-C, loại bỏ bụi bẩn và oxy hóa",
  },
  {
    icon: Settings,
    title: "Cài đặt tối ưu",
    description: "Tối ưu hóa cài đặt hệ thống để tiết kiệm pin tối đa",
  },
  {
    icon: Smartphone,
    title: "Kiểm tra tổng thể",
    description: "Kiểm tra toàn diện hệ thống sạc và các linh kiện liên quan",
  },
]

const benefitsData = [
  {
    title: "Kéo dài tuổi thọ pin",
    description: "Giúp pin hoạt động hiệu quả hơn và bền bỉ hơn theo thời gian",
    percentage: "30%",
  },
  {
    title: "Cải thiện hiệu suất",
    description: "Tối ưu hóa hiệu suất sạc và khả năng giữ pin của iPhone",
    percentage: "25%",
  },
  {
    title: "Tiết kiệm chi phí",
    description: "Giảm thiểu nhu cầu thay pin sớm, tiết kiệm chi phí dài hạn",
    percentage: "40%",
  },
]

const maintenanceTips = [
  "Tránh để pin xuống dưới 20% thường xuyên",
  "Không sạc qua đêm liên tục",
  "Sử dụng sạc chính hãng Apple",
  "Tránh để iPhone ở nơi quá nóng",
  "Cập nhật iOS thường xuyên",
  "Tắt các tính năng không cần thiết",
]

export default function BatteryMaintenancePage() {
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
                  <Settings className="w-8 h-8 text-primary" />
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Dịch vụ chuyên biệt</Badge>
                </div>
                <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                  Bảo Trì Pin iPhone
                  <span className="text-primary block">Chuyên Nghiệp</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dịch vụ bảo trì và tối ưu hóa pin iPhone giúp kéo dài tuổi thọ pin, cải thiện hiệu suất và tiết kiệm
                  chi phí thay pin trong tương lai.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">45</div>
                    <div className="text-sm text-muted-foreground">phút</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">tháng BH</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">+30%</div>
                    <div className="text-sm text-muted-foreground">tuổi thọ</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Đặt lịch bảo trì
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Tư vấn miễn phí
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-6 bg-card border-border">
                  <img
                    src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Gemini_Generated_Image_d7hfbud7hfbud7hf.png?height=400&width=600"
                    alt="Dịch vụ bảo trì pin iPhone"
                    className="w-full h-auto rounded-lg"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Dịch Vụ Bảo Trì Bao Gồm
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Gói dịch vụ bảo trì toàn diện giúp tối ưu hóa hiệu suất pin iPhone của bạn
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {maintenanceServices.map((service, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-space-grotesk">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Lợi Ích Khi Bảo Trì Pin
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Những lợi ích thiết thực mà dịch vụ bảo trì pin mang lại cho iPhone của bạn
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefitsData.map((benefit, index) => (
                <Card key={index} className="bg-card border-border text-center">
                  <CardHeader className="pb-4">
                    <div className="text-4xl font-bold text-primary mb-2">{benefit.percentage}</div>
                    <CardTitle className="text-xl font-space-grotesk">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-border text-center">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-space-grotesk">Gói Bảo Trì Pin Toàn Diện</CardTitle>
                  <div className="text-4xl font-bold text-primary mt-4">200.000đ</div>
                  <CardDescription className="text-muted-foreground mt-2">
                    Áp dụng cho tất cả các dòng iPhone
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <Clock className="w-5 h-5 text-primary mx-auto" />
                      <div className="text-sm font-medium">45 phút</div>
                      <div className="text-xs text-muted-foreground">Thời gian</div>
                    </div>
                    <div className="space-y-1">
                      <Shield className="w-5 h-5 text-primary mx-auto" />
                      <div className="text-sm font-medium">3 tháng</div>
                      <div className="text-xs text-muted-foreground">Bảo hành</div>
                    </div>
                    <div className="space-y-1">
                      <CheckCircle className="w-5 h-5 text-primary mx-auto" />
                      <div className="text-sm font-medium">Chất lượng</div>
                      <div className="text-xs text-muted-foreground">Đảm bảo</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <h4 className="font-semibold text-center">Dịch vụ bao gồm:</h4>
                    {maintenanceServices.map((service, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {service.description}
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Đặt lịch bảo trì ngay
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Mẹo Bảo Vệ Pin iPhone
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Những mẹo đơn giản giúp bạn bảo vệ pin iPhone hiệu quả tại nhà
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {maintenanceTips.map((tip, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{tip}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
