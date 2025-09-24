import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Battery, Shield, Star, Phone, Calendar } from "lucide-react"
import BatteryImageSlider from "@/components/battery-image-slider"
import { getBatteryImagesBySet } from "@/lib/battery-images-actions"
import { getActiveServicesServer } from "@/lib/service-actions-server"
import ServicesSection from "@/components/services-section"

const processSteps = [
  {
    step: 1,
    title: "Kiểm tra và chẩn đoán",
    description: "Kiểm tra tình trạng pin hiện tại và chẩn đoán các vấn đề cần khắc phục",
  },
  {
    step: 2,
    title: "Tư vấn và báo giá",
    description: "Tư vấn chi tiết về tình trạng pin và đưa ra báo giá chính xác",
  },
  {
    step: 3,
    title: "Thay linh kiện chính hãng",
    description: "Sử dụng linh kiện chính hãng, thay thế cẩn thận với quy trình chuẩn",
  },
  {
    step: 4,
    title: "Kiểm tra và bàn giao",
    description: "Kiểm tra hoạt động, hiệu chuẩn pin và bàn giao kèm bảo hành",
  },
]

export default async function BatteryReplacementPage() {
  // Fetch battery images for the slider
  const batteryImages = await getBatteryImagesBySet('battery-images-set')
  // Fetch active services from database
  const services = await getActiveServicesServer()
  
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
                  Dịch vụ thay pin iPhone chuyên nghiệp với linh kiện chính hãng, bảo hành 12 tháng và thay thế nhanh
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
                    Gọi tư vấn: 0969674679 - 0908693138
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-6 bg-card border-border">
                  <Image
                    src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Gemini_Generated_Image_xtte58xtte58xtte.png?height=400&width=600"
                    alt="Dịch vụ thay pin iPhone chuyên nghiệp"
                    width={600}
                    height={400}
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
        <ServicesSection services={services} />

        {/* Battery Images Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Hình Ảnh Pin iPhone Chính Hãng
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Khám phá các loại pin iPhone chính hãng chất lượng cao mà chúng tôi sử dụng
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <BatteryImageSlider 
                images={batteryImages} 
                autoPlayInterval={5000}
                showControls={true}
              />
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Tất cả pin đều là chính hãng, đảm bảo chất lượng và tuổi thọ tối ưu
              </p>
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
                  <CardTitle className="font-space-grotesk">Linh kiện Chính Hãng 100%</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Chỉ sử dụng linh kiện chính hãng, đảm bảo chất lượng và tuổi thọ tối ưu
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
