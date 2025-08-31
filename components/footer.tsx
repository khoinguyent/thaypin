import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-space-grotesk font-bold text-xl text-foreground">thaypin.vn</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Dịch vụ thay pin iPhone chuyên nghiệp, uy tín hàng đầu Việt Nam
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Dịch vụ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dich-vu/thay-pin" className="hover:text-foreground transition-colors">
                  Thay pin iPhone
                </Link>
              </li>
              <li>
                <Link href="/dich-vu/kiem-tra-pin" className="hover:text-foreground transition-colors">
                  Kiểm tra pin miễn phí
                </Link>
              </li>
              <li>
                <Link href="/dich-vu/bao-tri-pin" className="hover:text-foreground transition-colors">
                  Bảo trì pin
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-foreground transition-colors">
                  Xem tất cả dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Thông tin</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/ve-chung-toi" className="hover:text-foreground transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-foreground transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-hanh" className="hover:text-foreground transition-colors">
                  Chính sách bảo hành
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên hệ</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:0906674679" className="hover:text-foreground transition-colors">
                  0906 674 679 (Thông) - 0908 69 31 38 (Nhật Hãn)
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@thaypin.vn" className="hover:text-foreground transition-colors">
                  info@thaypin.vn
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>465/32 Đường Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>9:00 - 18:00 (Thứ 2 - CN)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 thaypin.vn. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
