import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertTriangle, Clock, Phone } from "lucide-react"

const warrantyTerms = [
  {
    title: "Thay pin iPhone",
    duration: "12 tháng",
    coverage: ["Pin không giữ được điện", "Pin sạc không vào", "Pin tụt nhanh bất thường", "Lỗi do quá trình thay pin"],
    exclusions: ["Hư hỏng do rơi vỡ, ngấm nước", "Sử dụng sạc không chính hãng", "Tự ý tháo lắp hoặc sửa chữa"],
  },
  {
    title: "Kiểm tra pin",
    duration: "Không áp dụng",
    coverage: ["Dịch vụ miễn phí", "Báo cáo chi tiết", "Tư vấn chuyên nghiệp"],
    exclusions: ["Không bao gồm sửa chữa", "Chỉ áp dụng cho kiểm tra"],
  },
  {
    title: "Bảo trì pin",
    duration: "3 tháng",
    coverage: ["Hiệu suất pin được cải thiện", "Cổng sạc hoạt động tốt", "Cài đặt được tối ưu hóa"],
    exclusions: ["Không bao gồm thay pin mới", "Hư hỏng phần cứng khác"],
  },
]

const warrantyProcess = [
  {
    step: 1,
    title: "Liên hệ bảo hành",
    description: "Gọi hotline hoặc đến trực tiếp cửa hàng với phiếu bảo hành",
  },
  {
    step: 2,
    title: "Kiểm tra tình trạng",
    description: "Kỹ thuật viên kiểm tra và xác định lỗi có thuộc bảo hành",
  },
  {
    step: 3,
    title: "Xử lý bảo hành",
    description: "Thay thế hoặc sửa chữa miễn phí trong thời gian quy định",
  },
  {
    step: 4,
    title: "Bàn giao thiết bị",
    description: "Kiểm tra và bàn giao thiết bị đã được xử lý bảo hành",
  },
]

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-muted py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-8 h-8 text-primary" />
                <Badge className="bg-primary text-primary-foreground">Chính sách bảo hành</Badge>
              </div>
              <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground">
                Chính Sách
                <span className="text-primary block">Bảo Hành</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cam kết bảo hành dài hạn và chính sách hỗ trợ khách hàng minh bạch, rõ ràng cho tất cả dịch vụ tại
                thaypin.vn
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Terms */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Điều Kiện Bảo Hành</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Chi tiết về thời gian bảo hành và điều kiện áp dụng cho từng dịch vụ
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {warrantyTerms.map((term, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-space-grotesk">{term.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{term.duration}</div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Được bảo hành:
                      </h4>
                      <ul className="space-y-1">
                        {term.coverage.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                        Không bảo hành:
                      </h4>
                      <ul className="space-y-1">
                        {term.exclusions.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Warranty Process */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Quy Trình Bảo Hành</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quy trình bảo hành đơn giản và nhanh chóng trong 4 bước
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {warrantyProcess.map((step, index) => (
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
                  {index < warrantyProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30"></div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-space-grotesk text-2xl text-center">Lưu Ý Quan Trọng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Điều kiện bảo hành:</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Phải có phiếu bảo hành và hóa đơn
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Thiết bị còn trong thời hạn bảo hành
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Lỗi thuộc trách nhiệm của thaypin.vn
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Không có dấu hiệu tác động từ bên ngoài
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Cam kết của chúng tôi:</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <Clock className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Xử lý bảo hành trong 24-48 giờ
                        </li>
                        <li className="flex items-start">
                          <Shield className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Miễn phí hoàn toàn trong thời gian bảo hành
                        </li>
                        <li className="flex items-start">
                          <Phone className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Hỗ trợ 24/7 qua hotline
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          Đổi mới nếu không sửa được
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact for Warranty */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-space-grotesk font-bold text-3xl text-foreground">Cần Hỗ Trợ Bảo Hành?</h2>
              <p className="text-muted-foreground">
                Liên hệ ngay với chúng tôi để được hỗ trợ bảo hành nhanh chóng và chuyên nghiệp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0906674679"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Hotline: 0906 674 679
                </a>
                <a
                  href="/lien-he"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary bg-transparent rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Liên hệ trực tiếp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
