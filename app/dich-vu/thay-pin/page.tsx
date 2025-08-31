import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Battery, Clock, Shield, CheckCircle, Star, Phone, Calendar } from "lucide-react"

const processSteps = [
  {
    step: 1,
    title: "Kiểm tra và chẩn đoán",
    description: "Kiểm tra tình trạng pin hiện tại, đánh giá độ chai và các vấn đề liên quan",
  },
  {
    step: 2,
    title: "Tư vấn và báo giá",
    description: "Tư vấn chi tiết về tình trạng pin và đưa ra báo giá chính xác",
  },
  {
    step: 3,
    title: "Thay pin chính hãng",
    description: "Sử dụng pin chính hãng Apple, thay thế cẩn thận với quy trình chuẩn",
  },
  {
    step: 4,
    title: "Kiểm tra và bàn giao",
    description: "Kiểm tra hoạt động, hiệu chuẩn pin và bàn giao kèm bảo hành",
  },
]

const pricingTiers = [
  {
    category: "iPhone 15 Series",
    models: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
    price: "900.000đ - 1.200.000đ",
    popular: true,
  },
  {
    category: "iPhone 14 Series",
    models: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
    price: "800.000đ - 1.000.000đ",
    popular: true,
  },
  {
    category: "iPhone 13 Series",
    models: ["iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"],
    price: "700.000đ - 850.000đ",
    popular: false,
  },
  {
    category: "iPhone 12 Series & Cũ hơn",
    models: ["iPhone 12", "iPhone 11", "iPhone XS", "iPhone X", "iPhone 8", "iPhone 7"],
    price: "500.000đ - 650.000đ",
    popular: false,
  },
]

export default function BatteryReplacementPage() {
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
                  <Battery className="w-8 h-8 text-primary" />
                  <Badge className="bg-primary text-primary-foreground">Dịch vụ #1</Badge>
                </div>
                <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                  Thay Pin iPhone
                  <span className="text-primary block">Chính Hãng</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dịch vụ thay pin iPhone chuyên nghiệp với pin chính hãng Apple, bảo hành 12 tháng và thay thế nhanh
                  chóng chỉ trong 30 phút.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">30</div>
                    <div className="text-sm text-muted-foreground">phút</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">tháng BH</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">chính hãng</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Đặt lịch ngay
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi tư vấn: 0906 674 679
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-6 bg-card border-border">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Dịch vụ thay pin iPhone chuyên nghiệp"
                    className="w-full h-auto rounded-lg"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Quy Trình Thay Pin</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quy trình thay pin chuẩn 4 bước đảm bảo chất lượng và an toàn tuyệt đối
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
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Bảng Giá Chi Tiết</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Giá cả minh bạch, cạnh tranh với chất lượng pin chính hãng Apple
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className={`bg-card border-border ${tier.popular ? "ring-2 ring-primary" : ""} relative`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-2 left-6 bg-primary text-primary-foreground">Phổ biến</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-space-grotesk">{tier.category}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{tier.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">Áp dụng cho:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tier.models.map((model, modelIndex) => (
                          <Badge key={modelIndex} variant="secondary" className="text-xs">
                            {model}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-2" />
                        Pin chính hãng Apple
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-primary mr-2" />
                        Bảo hành 12 tháng
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-primary mr-2" />
                        Thay trong 30 phút
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Đặt lịch thay pin
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Tại Sao Chọn Chúng Tôi?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card border-border text-center">
                <CardHeader>
                  <Battery className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-space-grotesk">Pin Chính Hãng 100%</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Chỉ sử dụng pin chính hãng Apple, đảm bảo chất lượng và tuổi thọ tối ưu
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-center">
                <CardHeader>
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-space-grotesk">Kỹ Thuật Viên Chuyên Nghiệp</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Đội ngũ kỹ thuật viên được đào tạo chuyên sâu, có kinh nghiệm nhiều năm
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-card border-border text-center">
                <CardHeader>
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-space-grotesk">Bảo Hành Dài Hạn</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Bảo hành 12 tháng cho pin và 6 tháng cho dịch vụ thay thế
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
