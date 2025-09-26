import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ContactButton from "@/components/contact-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Tier = {
  id: string
  title: string
  range: string
  appliesTo: string
  popular?: boolean
}

const PRICING_TIERS: Tier[] = [
  {
    id: "iphone-15",
    title: "iPhone 15 Series (upd)",
    range: "900.000₫ - 1.200.000₫",
    appliesTo: "iPhone 15 · 15 Plus · 15 Pro · 15 Pro Max",
    popular: true,
  },
  {
    id: "iphone-14",
    title: "iPhone 14 Series",
    range: "800.000₫ - 1.000.000₫",
    appliesTo: "iPhone 14 · 14 Plus · 14 Pro · 14 Pro Max",
    popular: true,
  },
  {
    id: "iphone-13",
    title: "iPhone 13 Series",
    range: "700.000₫ - 850.000₫",
    appliesTo: "iPhone 13 mini · 13 · 13 Pro · 13 Pro Max",
  },
  {
    id: "iphone-12-older",
    title: "iPhone 12 Series & Cũ hơn",
    range: "500.000₫ - 650.000₫",
    appliesTo: "iPhone 12 · 11 · XS · X · 8 · 7",
  },
]

export default function PricingSection() {
  return (
    <section id="bang-gia" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
            Bảng Giá Chi Tiết
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giá cả minh bạch, linh kiện chính hãng, thay nhanh 30 phút, bảo hành 12 tháng
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => (
            <Card key={tier.id} className={`bg-card border-border relative ${tier.popular ? "ring-2 ring-primary" : ""}`}>
              {tier.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Phổ biến
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-space-grotesk">{tier.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">{tier.range}</div>
                  <div className="text-xs text-muted-foreground">Áp dụng cho: {tier.appliesTo}</div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>✓ Linh kiện chính hãng</div>
                  <div>✓ Bảo hành 12 tháng</div>
                  <div>✓ Thay trong 30 phút</div>
                </div>
                <ContactButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Đặt lịch thay pin</ContactButton>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Không thấy model của bạn? Liên hệ để được báo giá chính xác.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Liên hệ báo giá
          </Button>
        </div>
      </div>
    </section>
  )
}
