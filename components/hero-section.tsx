"use client"

import ContactButton from "@/components/contact-button"
import { Card } from "@/components/ui/card"
import { Battery, BatteryFull, CheckCircle, Clock, Shield, Wrench } from "lucide-react"

export default function HeroSection() {
  

  return (
    <section className="bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-space-grotesk font-bold text-4xl lg:text-5xl text-foreground leading-tight">
                Thay Pin iPhone
                <span className="text-primary block">Chuyên Nghiệp</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dịch vụ thay pin iPhone uy tín, chất lượng cao với bảo hành 12 tháng. Thay pin nhanh chóng trong 30 phút
                cho tất cả các dòng iPhone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Linh kiện chính hãng</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Thay trong 30 phút</span>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Pin dung lượng cao & chuẩn</span>
              </div>
              <div className="flex items-center space-x-2">
                <BatteryFull className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Phôi (cell) pin xịn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Bảo hành 12 tháng</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Kỹ thuật viên chuyên nghiệp</span>
              </div>           
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ContactButton>
                Liên hệ ngay
              </ContactButton>
              {/* CTA button kept for future use */}
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-card border-border">
              <img
                src="https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/Flux_Schnell_highresolution_stock_photo_of_highresolution_stoc_3.jpg?height=400&width=600"
                alt="Dịch vụ thay pin iPhone chuyên nghiệp"
                className="w-full h-auto rounded-lg"
              />
            </Card>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="font-bold text-2xl">30</div>
                <div className="text-sm">phút</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
