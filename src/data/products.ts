/**
 * DỮ LIỆU SẢN PHẨM
 * - Thêm sản phẩm mới: chép 1 khối { ... } và sửa lại, web tự hiện ra.
 * - retailPrice = 0  → hiện chữ "Liên hệ" (khách vẫn chọn được sản phẩm ở trang Liên hệ mua hàng).
 * - status: "available" (đang bán) | "coming-soon" (sắp ra mắt).
 * - Ảnh đặt trong thư mục public/products/.
 */
export type Product = {
  slug: string;
  name: string;
  category: string;
  size: string;
  retailPrice: number;
  images: string[];
  highlights: string[];
  status: "available" | "coming-soon";
  featured?: boolean;
  /** Các tab ở trang chi tiết. Bỏ trống thì dùng nội dung chung bên dưới. */
  description?: string;
  ingredients?: string;
  storage?: string;
  /** Ảnh giấy công bố sản phẩm (đặt trong public/). Để trống → hiện "Đang cập nhật". */
  declarationImages?: string[];
};

/** Nội dung chung cho dòng Chun Yi Tian (dùng khi sản phẩm không khai báo riêng) */
export const defaultProductInfo = {
  description:
    "Sữa chua uống lợi khuẩn Chun Yi Tian được lên men suốt 72 giờ, cho vị chua ngọt dịu, thanh mát và dễ uống. Chai nhỏ 108ml vừa vặn cho một lần thưởng thức – phù hợp để mang theo đi học, đi làm hay dùng cùng cả gia đình mỗi ngày.",
  // TODO: anh điền đúng thành phần theo nhãn phụ / hồ sơ công bố sản phẩm
  ingredients:
    "Thành phần chi tiết được ghi trên nhãn phụ tiếng Việt của sản phẩm. Thông tin đang được cập nhật trên website.",
  storage:
    "Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Ngon hơn khi uống lạnh. Lắc nhẹ trước khi dùng. Sau khi mở nắp nên dùng hết ngay. Xem hạn sử dụng in trên bao bì.",
};

export const products: Product[] = [
  {
    slug: "chun-yi-tian-loc-4",
    name: "Sữa chua uống lợi khuẩn Chun Yi Tian – Lốc 4 chai",
    category: "sua-chua-uong",
    size: "4 chai x 108ml",
    retailPrice: 0, // TODO: anh điền giá bán lẻ (đơn vị: đồng, ví dụ 25000)
    images: ["/products/chun-yi-tian-loc-4.jpg"],
    highlights: ["72 giờ lên men", "Bổ sung lợi khuẩn", "Vị chua ngọt dịu"],
    status: "available",
    featured: true,
  },
  {
    slug: "chun-yi-tian-khay-20",
    name: "Sữa chua uống lợi khuẩn Chun Yi Tian – Khay 20 chai",
    category: "sua-chua-uong",
    size: "20 chai x 108ml",
    retailPrice: 0, // TODO
    images: ["/products/chun-yi-tian-khay-20.jpg"],
    highlights: ["72 giờ lên men", "Bổ sung lợi khuẩn", "Tiện cho gia đình"],
    status: "available",
    featured: true,
  },
  {
    slug: "chun-yi-tian-thung-80",
    name: "Sữa chua uống lợi khuẩn Chun Yi Tian – Thùng 80 chai",
    category: "sua-chua-uong",
    size: "80 chai x 108ml",
    retailPrice: 0, // TODO
    images: ["/products/chun-yi-tian-thung-80.jpg"],
    highlights: ["72 giờ lên men", "Bổ sung lợi khuẩn", "Tiết kiệm nhất"],
    status: "available",
    featured: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
