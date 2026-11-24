/**
 * TRANG ĐẠI LÝ & NHÀ PHÂN PHỐI
 * Lưu ý: KHÔNG ghi giá sỉ / % chiết khấu ở đây – website chỉ mời liên hệ để nhận báo giá.
 */
export const dealerBenefits = [
  { icon: "tag", title: "Chiết khấu hấp dẫn", text: "Chính sách giá sỉ và chiết khấu riêng theo từng cấp, cạnh tranh và minh bạch." },
  { icon: "truck", title: "Hỗ trợ giao hàng", text: "Hỗ trợ vận chuyển hàng đến kho, cửa hàng của đại lý theo khu vực." },
  { icon: "megaphone", title: "Hỗ trợ bán hàng", text: "Cung cấp hình ảnh, nội dung quảng cáo, tư liệu sản phẩm để đại lý bán hàng dễ dàng." },
  { icon: "shield", title: "Hàng chính hãng", text: "Nguồn hàng rõ ràng, giấy tờ đầy đủ, hạn sử dụng được kiểm soát." },
  { icon: "users", title: "Đồng hành lâu dài", text: "Có nhân viên phụ trách khu vực, tư vấn và hỗ trợ đại lý trong suốt quá trình hợp tác." },
  { icon: "map", title: "Bảo vệ khu vực", text: "Phân vùng kinh doanh hợp lý, hạn chế cạnh tranh trùng lặp giữa các đại lý." },
];

/** Các cấp đại lý. Điều kiện cụ thể (doanh số, số lượng nhập...) anh tự điền nếu muốn công khai. */
export const dealerTiers = [
  {
    name: "Cộng tác viên",
    for: "Cá nhân bán hàng online, bán cho người quen",
    perks: ["Không cần mặt bằng", "Được cung cấp hình ảnh, nội dung bán hàng"],
    // TODO: điều kiện / số lượng nhập tối thiểu
  },
  {
    name: "Đại lý bán lẻ",
    for: "Cửa hàng tạp hóa, siêu thị mini, quán nước, cửa hàng mẹ & bé",
    perks: ["Giá sỉ theo chính sách đại lý", "Hỗ trợ giao hàng tận cửa hàng"],
    // TODO
  },
  {
    name: "Đại lý cấp 1",
    for: "Đơn vị có kho bãi, phân phối lại cho các điểm bán lẻ",
    perks: ["Chiết khấu theo cấp", "Ưu tiên hàng và hỗ trợ khu vực"],
    // TODO
  },
  {
    name: "Nhà phân phối (NPP)",
    for: "Doanh nghiệp phân phối cấp tỉnh / vùng",
    perks: ["Chính sách độc quyền theo khu vực", "Hỗ trợ marketing và đội ngũ"],
    // TODO
  },
];

export const dealerSteps = [
  { title: "Đăng ký", text: "Điền form đăng ký bên dưới hoặc gọi hotline / nhắn Zalo." },
  { title: "Tư vấn & báo giá", text: "Nhân viên PG Food liên hệ, tư vấn và gửi chính sách giá phù hợp." },
  { title: "Ký hợp tác", text: "Thống nhất điều khoản, ký hợp đồng đại lý / nhà phân phối." },
  { title: "Nhập hàng & kinh doanh", text: "Nhận hàng, được hỗ trợ bán hàng và đồng hành lâu dài." },
];

export const dealerTypes = ["Cộng tác viên", "Đại lý bán lẻ", "Đại lý cấp 1", "Nhà phân phối (NPP)"];
