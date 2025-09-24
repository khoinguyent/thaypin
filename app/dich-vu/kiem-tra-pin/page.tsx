import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ContactButton from "@/components/contact-button"
import { Badge } from "@/components/ui/badge"
import { Zap, AlertTriangle, Battery, Smartphone } from "lucide-react"

const checkPoints = [
  {
    icon: Battery,
    title: "Dung lượng pin",
    description: "Kiểm tra dung lượng pin hiện tại so với ban đầu",
  },
  {
    icon: Zap,
    title: "Tốc độ sạc",
    description: "Đánh giá tốc độ sạc và khả năng giữ pin",
  },
  {
    icon: AlertTriangle,
    title: "Tình trạng chai pin",
    description: "Phân tích mức độ chai pin và hiệu suất",
  },
  {
    icon: Smartphone,
    title: "Hệ thống sạc",
    description: "Kiểm tra cổng sạc và IC sạc",
  },
]

const warningSignsData = [
  {
    sign: "Pin tụt nhanh",
    description: "iPhone hết pin nhanh hơn bình thường",
    severity: "high",
  },
  {
    sign: "Sạc chậm",
    description: "Thời gian sạc lâu hơn so với trước",
    severity: "medium",
  },
  {
    sign: "Pin phồng",
    description: "Pin bị phồng làm màn hình bị đẩy lên",
    severity: "critical",
  },
  {
    sign: "Tắt máy đột ngột",
    description: "iPhone tự động tắt khi còn pin",
    severity: "high",
  },
  {
    sign: "Nóng máy",
    description: "iPhone nóng bất thường khi sử dụng",
    severity: "medium",
  },
  {
    sign: "Không nhận sạc",
    description: "iPhone không sạc được hoặc sạc không vào",
    severity: "critical",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "text-red-500"
    case "high":
      return "text-orange-500"
    case "medium":
      return "text-yellow-500"
    default:
      return "text-muted-foreground"
  }
}

const getSeverityBg = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-50 border-red-200"
    case "high":
      return "bg-orange-50 border-orange-200"
    case "medium":
      return "bg-yellow-50 border-yellow-200"
    default:
      return "bg-muted border-border"
  }
}

export default function BatteryCheckPage() {
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
                  <Zap className="w-8 h-8 text-primary" />
                  <Badge className="bg-green-100 text-green-800 border-green-200">Miễn phí 100%</Badge>
                </div>
                <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                  Kiểm Tra Pin iPhone
                  <span className="text-primary block">Hoàn Toàn Miễn Phí</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Dịch vụ kiểm tra pin iPhone miễn phí, đánh giá chính xác tình trạng pin và đưa ra khuyến nghị phù hợp
                  cho thiết bị của bạn.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10</div>
                    <div className="text-sm text-muted-foreground">phút</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">miễn phí</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">hỗ trợ</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Kiểm tra ngay
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Tìm hiểu thêm
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-6 bg-card border-border">
                  {/* minor change to trigger deploy */}
                  <img
                    src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Gemini_Generated_Image_v9fmb6v9fmb6v9fm.png?height=400&width=600"
                    alt="Kiểm tra pin iPhone miễn phí"
                    className="w-full h-auto rounded-lg"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Check Points Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Những Gì Chúng Tôi Kiểm Tra
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quy trình kiểm tra toàn diện để đánh giá chính xác tình trạng pin iPhone của bạn
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {checkPoints.map((point, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <point.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-space-grotesk">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{point.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Dấu Hiệu Cần Kiểm Tra Pin
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nếu iPhone của bạn có những dấu hiệu sau, hãy kiểm tra pin ngay lập tức
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {warningSignsData.map((warning, index) => (
                <Card key={index} className={`${getSeverityBg(warning.severity)} border`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-space-grotesk">{warning.sign}</CardTitle>
                      <AlertTriangle className={`w-5 h-5 ${getSeverityColor(warning.severity)}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{warning.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Phát hiện bất kỳ dấu hiệu nào ở trên? Hãy kiểm tra pin ngay để tránh hư hỏng nghiêm trọng
              </p>
              <ContactButton className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Đặt lịch kiểm tra miễn phí
              </ContactButton>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Quy Trình Kiểm Tra</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-xl">Tiếp nhận máy</h3>
                  <p className="text-muted-foreground">
                    Tiếp nhận iPhone và ghi nhận thông tin cơ bản về tình trạng máy
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-xl">Kiểm tra chi tiết</h3>
                  <p className="text-muted-foreground">
                    Sử dụng thiết bị chuyên dụng để kiểm tra toàn diện tình trạng pin
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-xl">Báo cáo kết quả</h3>
                  <p className="text-muted-foreground">Cung cấp báo cáo chi tiết và tư vấn giải pháp phù hợp</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
