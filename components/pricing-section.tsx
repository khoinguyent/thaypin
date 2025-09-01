import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const pricingData = [
  {
    model: "iPhone 15 Pro Max",
    price: "1.200.000đ",
    originalPrice: "1.500.000đ",
    popular: true,
  },
  {
    model: "iPhone 15 Pro",
    price: "1.100.000đ",
    originalPrice: "1.400.000đ",
    popular: false,
  },
  {
    model: "iPhone 15",
    price: "900.000đ",
    originalPrice: "1.200.000đ",
    popular: false,
  },
  {
    model: "iPhone 14 Pro Max",
    price: "1.000.000đ",
    originalPrice: "1.300.000đ",
    popular: false,
  },
  {
    model: "iPhone 14 Pro",
    price: "900.000đ",
    originalPrice: "1.200.000đ",
    popular: false,
  },
  {
    model: "iPhone 14",
    price: "800.000đ",
    originalPrice: "1.100.000đ",
    popular: true,
  },
  {
    model: "iPhone 13 Pro Max",
    price: "850.000đ",
    originalPrice: "1.100.000đ",
    popular: false,
  },
  {
    model: "iPhone 13",
    price: "700.000đ",
    originalPrice: "900.000đ",
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="bang-gia" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground">
            Bảng Giá Thay Pin iPhone
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giá cả minh bạch, cạnh tranh nhất thị trường với chất lượng linh kiện chính hãng
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.map((item, index) => (
            <Card key={index} className={`bg-card border-border relative ${item.popular ? "ring-2 ring-primary" : ""}`}>
              {item.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Phổ biến
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-space-grotesk">{item.model}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">{item.price}</div>
                  <div className="text-sm text-muted-foreground line-through">{item.originalPrice}</div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>✓ Linh kiện chính hãng</div>
                  <div>✓ Bảo hành 12 tháng</div>
                  <div>✓ Thay trong 30 phút</div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Đặt lịch</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Không tìm thấy model iPhone của bạn? Liên hệ để được báo giá chi tiết
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
