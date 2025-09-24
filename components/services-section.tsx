"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock } from "lucide-react"
import ContactModal from "@/components/contact-modal"

interface Service {
  id: number
  title: string
  header_tag?: string
  price_min: number
  price_max: number
  applied_for: string[]
  option_1: string
  option_2: string
  option_3: string
  button_text: string
}

interface ServicesSectionProps {
  services: Service[]
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [showContactModal, setShowContactModal] = useState(false)

  const handleServiceClick = (service: Service) => {
    setShowContactModal(true)
  }

  return (
    <>
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
              Bảng Giá Chi Tiết
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Giá cả minh bạch, cạnh tranh với chất lượng linh kiện chính hãng
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`bg-card border-border ${service.header_tag ? "ring-2 ring-primary" : ""} relative`}
              >
                {service.header_tag && (
                  <Badge className="absolute -top-2 left-6 bg-primary text-primary-foreground">{service.header_tag}</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-space-grotesk">{service.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">
                    {service.price_min.toLocaleString('vi-VN')}₫ - {service.price_max.toLocaleString('vi-VN')}₫
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Áp dụng cho:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.applied_for.map((model, modelIndex) => (
                        <Badge key={modelIndex} variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary mr-2" />
                      {service.option_1}
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-primary mr-2" />
                      {service.option_2}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-primary mr-2" />
                      {service.option_3}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleServiceClick(service)}
                  >
                    {service.button_text}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  )
}