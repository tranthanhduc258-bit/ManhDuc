/**
 * CHÍNH SÁCH – 4 trang con tại /chinh-sach/<slug>
 * Các chỗ có "TODO" là số liệu anh cần điền theo thực tế (phí ship, thời gian, ...).
 */
import type { Block } from "./articles";

export type Policy = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  content: Block[];
};

export const policies: Policy[] = [
  {
    slug: "giao-hang",
    title: "Chính sách giao hàng",
    summary: "Phạm vi, thời gian và phí giao hàng.",
    updated: "2026-11-24",
    content: [
      { type: "h2", text: "Phạm vi giao hàng" },
      {
        type: "p",
        text: "PG Food nhận giao hàng tận nơi trên toàn quốc thông qua đội ngũ giao hàng của công ty và các đơn vị vận chuyển đối tác.",
      },
      { type: "h2", text: "Thời gian giao hàng" },
      {
        type: "p",
        // TODO: anh sửa thời gian giao hàng thực tế
        text: "Sau khi đặt hàng, nhân viên PG Food sẽ gọi điện xác nhận đơn. Thời gian giao dự kiến được thông báo khi xác nhận, tùy theo khu vực nhận hàng.",
      },
      { type: "h2", text: "Phí giao hàng" },
      {
        type: "p",
        // TODO: anh điền mức phí / điều kiện miễn phí giao hàng
        text: "Phí giao hàng (nếu có) được thông báo rõ khi nhân viên xác nhận đơn, trước khi giao hàng.",
      },
      { type: "h2", text: "Kiểm tra khi nhận hàng" },
      {
        type: "ul",
        items: [
          "Quý khách được kiểm tra số lượng, tình trạng bao bì và hạn sử dụng trước khi nhận.",
          "Nếu hàng bị móp, rò rỉ hoặc sai sản phẩm, quý khách có thể từ chối nhận và báo ngay cho hotline.",
        ],
      },
    ],
  },
  {
    slug: "doi-tra",
    title: "Chính sách đổi trả",
    summary: "Điều kiện và cách thức đổi trả sản phẩm.",
    updated: "2026-11-24",
    content: [
      { type: "h2", text: "Trường hợp được đổi trả" },
      {
        type: "ul",
        items: [
          "Sản phẩm giao sai loại, sai số lượng so với đơn đặt hàng.",
          "Sản phẩm bị hư hỏng, rò rỉ, phồng chai do quá trình vận chuyển.",
          "Sản phẩm hết hạn sử dụng tại thời điểm nhận hàng.",
        ],
      },
      { type: "h2", text: "Thời hạn báo đổi trả" },
      {
        type: "p",
        // TODO: anh điền thời hạn thực tế (ví dụ 24 giờ, 48 giờ)
        text: "Quý khách vui lòng liên hệ hotline/Zalo càng sớm càng tốt sau khi nhận hàng, kèm hình ảnh sản phẩm và mã đơn hàng để được hỗ trợ nhanh nhất.",
      },
      { type: "h2", text: "Không áp dụng đổi trả" },
      {
        type: "ul",
        items: [
          "Sản phẩm đã mở nắp, đã sử dụng một phần (trừ trường hợp lỗi từ nhà sản xuất).",
          "Sản phẩm bảo quản không đúng hướng dẫn sau khi nhận hàng.",
        ],
      },
      { type: "h2", text: "Hình thức xử lý" },
      {
        type: "p",
        text: "Tùy trường hợp, PG Food sẽ đổi sản phẩm mới tương đương hoặc hoàn tiền cho phần sản phẩm bị lỗi. Chi phí vận chuyển phát sinh do lỗi từ phía công ty sẽ do công ty chi trả.",
      },
    ],
  },
  {
    slug: "bao-mat",
    title: "Chính sách bảo mật",
    summary: "Cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.",
    updated: "2026-11-24",
    content: [
      { type: "h2", text: "Thông tin chúng tôi thu thập" },
      {
        type: "p",
        text: "Khi quý khách đặt hàng, đăng ký làm đại lý hoặc gửi liên hệ, chúng tôi thu thập các thông tin quý khách cung cấp: họ tên, số điện thoại, tỉnh/thành, địa chỉ và nội dung ghi chú.",
      },
      { type: "h2", text: "Mục đích sử dụng" },
      {
        type: "ul",
        items: [
          "Xác nhận và giao đơn hàng.",
          "Liên hệ tư vấn, gửi báo giá và chính sách đại lý theo yêu cầu.",
          "Chăm sóc khách hàng, giải quyết khiếu nại.",
        ],
      },
      { type: "h2", text: "Cam kết bảo mật" },
      {
        type: "ul",
        items: [
          "Không bán, trao đổi hay chia sẻ thông tin cá nhân của quý khách cho bên thứ ba vì mục đích thương mại.",
          "Chỉ cung cấp thông tin cần thiết (họ tên, số điện thoại, địa chỉ) cho đơn vị vận chuyển để giao hàng.",
          "Chỉ người có trách nhiệm trong công ty được truy cập dữ liệu đơn hàng.",
        ],
      },
      { type: "h2", text: "Lưu trữ dữ liệu" },
      {
        type: "p",
        text: "Thông tin đơn hàng được lưu trữ an toàn phục vụ việc giao hàng và chăm sóc khách hàng.",
      },
      { type: "h2", text: "Quyền của quý khách" },
      {
        type: "p",
        text: "Quý khách có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ hotline hoặc email của công ty.",
      },
    ],
  },
  {
    slug: "thanh-toan",
    title: "Chính sách thanh toán",
    summary: "Các hình thức thanh toán được chấp nhận.",
    updated: "2026-11-24",
    content: [
      { type: "h2", text: "1. Thanh toán khi nhận hàng (COD)" },
      {
        type: "p",
        text: "Quý khách thanh toán bằng tiền mặt cho nhân viên giao hàng sau khi đã kiểm tra hàng.",
      },
      { type: "h2", text: "2. Chuyển khoản ngân hàng" },
      {
        type: "p",
        text: "Sau khi xác nhận đơn, nhân viên PG Food sẽ gửi thông tin tài khoản công ty. Khi chuyển khoản, quý khách vui lòng ghi nội dung là mã đơn hàng (dạng PG-YYMMDD-XXXX) để việc đối soát được nhanh chóng.",
      },
      { type: "h2", text: "Lưu ý" },
      {
        type: "ul",
        items: [
          "PG Food chỉ nhận chuyển khoản vào tài khoản đứng tên công ty hoặc tài khoản được thông báo chính thức.",
          "Mọi thắc mắc về thanh toán, vui lòng liên hệ hotline để được hỗ trợ.",
        ],
      },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
