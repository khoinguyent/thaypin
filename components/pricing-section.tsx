import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const pricingData = [
  {
    model: "iPhone XS Max",
    price: "1.700.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone XS",
    price: "1.700.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone XR",
    price: "1.700.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone X",
    price: "1.700.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone 8 Plus",
    price: "1.400.000đ",
    originalPrice: "2.175.000đ",
    popular: true,
  },
  {
    model: "iPhone 8",
    price: "1.400.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone 7 Plus",
    price: "1.400.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone 7",
    price: "1.400.000đ",
    originalPrice: "2.175.000đ",
    popular: false,
  },
  {
    model: "iPhone SE (2020/2022)",
    price: "1.400.000đ",
    originalPrice: "2.175.000đ",
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
            So sánh giá thay pin iPhone: thaypin.vn vs Apple. Tiết kiệm đến 35% với chất lượng tương đương
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
                  <div className="text-xs text-green-600 font-medium">
                    Tiết kiệm {Math.round(((parseInt(item.originalPrice.replace(/[^\d]/g, '')) - parseInt(item.price.replace(/[^\d]/g, ''))) / parseInt(item.originalPrice.replace(/[^\d]/g, '')) * 100))}%
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>✓ Linh kiện chính hãng</div>
                  <div>✓ Bảo hành 12 tháng</div>
                  <div>✓ Thay trong 30 phút</div>
                  <div>✓ Tiết kiệm 35% so với Apple</div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Đặt lịch</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Tại sao chọn thaypin.vn?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-green-700">
              <div>💰 Tiết kiệm 35% so với Apple</div>
              <div>⚡ Thay pin trong 30 phút</div>
              <div>🛡️ Bảo hành 12 tháng</div>
            </div>
          </div>
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
