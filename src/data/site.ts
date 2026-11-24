/**
 * THÔNG TIN DOANH NGHIỆP & CẤU HÌNH CHUNG
 * Sửa trực tiếp ở đây, toàn bộ website sẽ tự cập nhật.
 */
export const site = {
  brand: "PG Food",
  companyName: "CÔNG TY TNHH TẬP ĐOÀN PHẠM GROUP",
  companyNameEn: "PHAM GROUP COMPANY LIMITED",
  slogan: "Plan Growth",
  taxCode: "5702102594",
  address: "Thôn 2, Xã Hải Ninh, Thành phố Quảng Ninh, Việt Nam",
  hotline: "0856 791 816",
  hotlineRaw: "0856791816",
  zaloUrl: "https://zalo.me/0856791816",
  email: "phamthanhtungxnk2015@gmail.com",
  representative: "Ông Phạm Thanh Tùng – Giám đốc",
  /** Tìm kiếm dùng cho bản đồ Google Maps nhúng ở trang Liên hệ */
  mapQuery: "Hải Ninh, Quảng Ninh, Việt Nam",
  logo: "/logo-pg-food.png",
  ogImage: "/og-image.jpg",

  /** Thông tin chuyển khoản hiển thị ở trang Đặt hàng & chính sách thanh toán */
  bank: {
    // TODO: anh điền thông tin tài khoản ngân hàng thật. Khi còn trống, web chỉ ghi "nhân viên sẽ gửi thông tin chuyển khoản".
    bankName: "",
    accountNumber: "",
    accountName: "",
  },

  /** Logo "Đã thông báo Bộ Công Thương" ở chân trang – bật khi đã có */
  bctNotified: {
    enabled: false,
    image: "/bct-da-thong-bao.png", // TODO: chép ảnh logo BCT vào public/
    url: "", // TODO: đường dẫn hồ sơ trên online.gov.vn
  },

  /** Ảnh giấy chứng nhận ĐKDN ở trang Giới thiệu – để trống thì hiện ô chờ ảnh */
  businessLicenseImage: "", // ví dụ: "/giay-phep-kinh-doanh.jpg" (nhớ che số định danh cá nhân, ngày sinh)

  /** Bật/tắt hiệu ứng */
  features: {
    cursorGlow: true, // vệt sáng vàng đi theo con trỏ trên máy tính
  },
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
