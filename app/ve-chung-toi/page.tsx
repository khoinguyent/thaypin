import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Shield, Clock, CheckCircle, Star, Heart, Target, Zap, Phone, Calendar } from "lucide-react"

const teamMembers = [
  {
    name: "Trần Nhật Hãn",
    role: "CEO",
    experience: "5 năm kinh nghiệm",
    description: "Chuyên viên tư vấn sản phẩm và chăm sóc khách hàng. Làm việc tại thaypin.vn, LBTool.vn, Icfix .vn",
    image: "https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Ha%CC%83n.jpg?height=300&width=300&text=CEO",
  },
  {
    name: "Dương Tấn Thông",
    role: "Kỹ thuật viên",
    experience: "10 năm kinh nghiệm",
    description: "Chuyên ép kính, thay pin, làm iFace, camera...",
    image: "https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Thong.jpg?height=300&width=300&text=Tech+Lead",
  },
  {
    name: "Nguyễn Hoàng Ngọc Lâm",
    role: "Kỹ thuật viên",
    experience: "10 năm kinh nghiệm",
    description: "Chuyên sửa chửa phần cứng các dòng iPhone, iPad, Samsung.",
    image: "https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/La%CC%82m.jpg?height=300&width=300&text=Technician",
  },
]

const achievements = [
  {
    icon: Users,
    number: "10,000+",
    label: "Khách hàng tin tưởng",
    description: "Đã phục vụ hơn 10,000 khách hàng trên toàn TP.HCM",
  },
  {
    icon: Clock,
    number: "30",
    label: "Phút thay pin",
    description: "Cam kết thay pin nhanh chóng chỉ trong 30 phút",
  },
  {
    icon: Award,
    number: "99%",
    label: "Khách hàng hài lòng",
    description: "Tỷ lệ khách hàng hài lòng và quay lại sử dụng dịch vụ",
  },
  {
    icon: Shield,
    number: "12",
    label: "Tháng bảo hành",
    description: "Bảo hành dài hạn cho tất cả dịch vụ thay pin",
  },
]

const values = [
  {
    icon: Heart,
    title: "Tận tâm",
    description: "Chúng tôi luôn đặt khách hàng lên hàng đầu và phục vụ với tất cả tấm lòng",
  },
  {
    icon: Shield,
    title: "Uy tín",
    description: "Cam kết chỉ sử dụng linh kiện chính hãng và dịch vụ chất lượng cao",
  },
  {
    icon: Zap,
    title: "Nhanh chóng",
    description: "Thời gian thay pin nhanh nhất thị trường với quy trình tối ưu",
  },
  {
    icon: Target,
    title: "Chuyên nghiệp",
    description: "Đội ngũ kỹ thuật viên được đào tạo bài bản và có chứng chỉ",
  },
]

const certifications = [
  "Chứng chỉ sửa chữa thiết bị di động",
  "Đào tạo chuyên sâu về pin Lithium-ion",
  "Chứng nhận an toàn lao động",
  "Giấy phép kinh doanh hợp pháp",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section   */}
        <section className="bg-gradient-to-br from-background to-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-primary" />
                  <Badge className="bg-primary text-primary-foreground">Về thaypin.vn</Badge>
                </div>
                <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                  Chuyên Gia
                  <span className="text-primary block">Pin iPhone Hàng Đầu</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Với hơn 8 năm kinh nghiệm trong ngành sửa chữa iPhone, thaypin.vn tự hào là địa chỉ tin cậy hàng đầu
                  cho dịch vụ thay pin iPhone tại Việt Nam.
                </p>
                {/* <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    Liên hệ ngay
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Đặt lịch hẹn
                  </Button>
                </div> */}
              </div>

              <div className="relative">
                <Card className="p-6 bg-card border-border">
                  <img
                    src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Flux_Schnell_highresolution_stock_photo_of_highresolution_stoc_3%20(2).jpg?height=400&width=600&text=Thaypin.vn+Team"
                    alt="Đội ngũ thaypin.vn"
                    className="w-full h-auto rounded-lg"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                Thành Tựu Của Chúng Tôi
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Những con số ấn tượng chứng minh chất lượng dịch vụ và sự tin tưởng của khách hàng
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">{achievement.number}</div>
                    <CardTitle className="text-lg font-space-grotesk">{achievement.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{achievement.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                  Câu Chuyện Của Chúng Tôi
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-space-grotesk font-semibold text-xl text-foreground">Khởi Đầu (2016)</h3>
                      <p className="text-muted-foreground">
                        thaypin.vn được thành lập từ niềm đam mê công nghệ và mong muốn mang đến dịch vụ thay pin iPhone
                        chất lượng cao với giá cả hợp lý cho người dùng Việt Nam.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-space-grotesk font-semibold text-xl text-foreground">
                        Phát Triển (2018-2022)
                      </h3>
                      <p className="text-muted-foreground">
                        Chúng tôi không ngừng đầu tư vào công nghệ, đào tạo nhân viên và mở rộng dịch vụ. Từ một cửa
                        hàng nhỏ, chúng tôi đã phục vụ hàng nghìn khách hàng trên toàn TP.HCM.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-space-grotesk font-semibold text-xl text-foreground">Hiện Tại (2025)</h3>
                      <p className="text-muted-foreground">
                        Ngày nay, thaypin.vn là địa chỉ tin cậy hàng đầu cho dịch vụ thay pin iPhone với đội ngũ kỹ
                        thuật viên chuyên nghiệp và quy trình chuẩn quốc tế.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <img
                    src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Flux_Schnell_highresolution_stock_photo_of_highresolution_stoc_3%20(3).jpg?height=500&width=600&text=Our+Journey"
                    alt="Hành trình phát triển"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                <span>Đội ngũ</span>
              </div>
              <h2 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground">Đội Ngũ Chuyên Gia</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo chuyên sâu về công nghệ pin iPhone
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full flex flex-col">
                  
                  {/* Profile image with enhanced styling */}
                  <CardHeader className="relative pb-6 text-center">
                    <div className="relative mx-auto mb-6">
                      <div className="w-32 h-32 mx-auto overflow-hidden rounded-2xl ring-4 ring-white shadow-2xl">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Experience badge overlay */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                          {member.experience}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-space-grotesk text-foreground mb-2">{member.name}</CardTitle>
                    <div className="text-primary font-semibold text-lg mb-3">{member.role}</div>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-4 flex-1 flex flex-col">
                    <CardDescription className="text-muted-foreground text-base leading-relaxed text-center flex-1">
                      {member.description}
                    </CardDescription>
                    
                    {/* Skills/Expertise tags */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {member.role === "CEO" && (
                        <>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200">
                            Tư vấn sản phẩm
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200">
                            Chăm sóc khách hàng
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200">
                            Trên 5 năm kinh nghiệm
                          </Badge>
                        </>
                      )}
                      {member.role === "Kỹ thuật viên" && member.name === "Dương Tấn Thông" && (
                        <>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200">
                            Thay pin
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200">
                            Bo mạch
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                            Ép kính
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                            Camera
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                            Trên 10 năm kinh nghiệm
                          </Badge>
                        </>
                      )}
                      {member.role === "Kỹ thuật viên" && member.name === "Nguyễn Hoàng Ngọc Lâm" && (
                        <>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-teal-100 text-teal-700 hover:bg-teal-200">
                            Phần cứng
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-pink-100 text-pink-700 hover:bg-pink-200">
                            iPhone, iPad, Samsung
                          </Badge>
                          <Badge variant="secondary" className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                            Trên 10 năm kinh nghiệm
                          </Badge>
                        </>
                      )}
                    </div>
                    
                    {/* Contact button */}
                    <div className="pt-4 mt-auto">
                      <Button 
                        variant="outline" 
                        className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                        size="sm"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Liên hệ
                      </Button>
                    </div>
                  </CardContent>
                  
                </Card>
              ))}
            </div>
            
            {/* Additional team stats */}
            <div className="mt-20 grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">15+</div>
                <div className="text-muted-foreground font-medium">Kỹ thuật viên</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">50+</div>
                <div className="text-muted-foreground font-medium">Chứng chỉ</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">100%</div>
                <div className="text-muted-foreground font-medium">Chính hãng</div>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-muted-foreground font-medium">Hỗ trợ</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">Giá Trị Cốt Lõi</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Những giá trị định hướng mọi hoạt động của chúng tôi trong việc phục vụ khách hàng
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-card border-border text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-space-grotesk">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
                    Chứng Chỉ & Đào Tạo
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Đội ngũ của chúng tôi được đào tạo bài bản và có đầy đủ chứng chỉ chuyên môn
                  </p>

                  <div className="space-y-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4 pt-4">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">4.9/5 từ 1,200+ đánh giá</span>
                  </div>
                </div>

                <div className="relative">
                  <Card className="p-6 bg-card border-border">
                    <img
                      src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Flux_Schnell_highresolution_stock_photo_of_highresolution_stoc_3%20(2).jpg?height=400&width=600&text=Certifications"
                      alt="Chứng chỉ và đào tạo"
                      className="w-full h-auto rounded-lg"
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-space-grotesk font-bold text-3xl text-foreground">Sẵn Sàng Phục Vụ Bạn</h2>
              <p className="text-muted-foreground">
                Hãy để chúng tôi giúp bạn khôi phục iPhone với dịch vụ thay pin chuyên nghiệp và uy tín nhất
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
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch hẹn
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
