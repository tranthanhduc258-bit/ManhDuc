/**
 * PG FOOD – Nhận đơn hàng / đăng ký đại lý / liên hệ từ website vào Google Sheet.
 * Hướng dẫn cài đặt: xem file HUONG-DAN-GOOGLE-SHEET.md
 *
 * Mỗi loại dữ liệu ghi vào 1 tab riêng: "Đơn hàng", "Đại lý", "Liên hệ".
 * Tab chưa có sẽ tự được tạo kèm dòng tiêu đề.
 */

// Mật khẩu bí mật – phải GIỐNG HỆT biến GOOGLE_SCRIPT_SECRET trên Vercel.
var SECRET = 'DOI-MAT-KHAU-NAY';

var SHEETS = {
  order: {
    name: 'Đơn hàng',
    headers: ['Mã đơn', 'Thời gian', 'Khách hàng', 'SĐT', 'Tỉnh/TP', 'Địa chỉ', 'Sản phẩm', 'Số lượng', 'Tổng tiền', 'Thanh toán', 'Ghi chú', 'Trạng thái', 'Submission ID'],
    row: function (d) {
      return [
        d.code, d.createdAt, d.name, "'" + d.phone, d.province, d.address,
        d.items.map(function (i) { return i.name + ' (' + i.size + ') x' + i.qty; }).join('\n'),
        d.items.reduce(function (s, i) { return s + i.qty; }, 0),
        d.total, d.payment, d.note, d.status, d.submissionId,
      ];
    },
  },
  dealer: {
    name: 'Đại lý',
    headers: ['Mã đăng ký', 'Thời gian', 'Họ tên', 'SĐT', 'Tỉnh/TP', 'Hình thức', 'Cửa hàng/DN', 'Địa chỉ', 'Ghi chú', 'Trạng thái', 'Submission ID'],
    row: function (d) {
      return [d.code, d.createdAt, d.name, "'" + d.phone, d.province, d.dealerType, d.business, d.address, d.note, d.status, d.submissionId];
    },
  },
  contact: {
    name: 'Liên hệ',
    headers: ['Mã', 'Thời gian', 'Họ tên', 'SĐT', 'Email', 'Nội dung', 'Trạng thái', 'Submission ID'],
    row: function (d) {
      return [d.code, d.createdAt, d.name, "'" + d.phone, d.email, d.message, d.status, d.submissionId];
    },
  },
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var body = JSON.parse(e.postData.contents);
    if (SECRET && body.secret !== SECRET) return json({ ok: false, error: 'Sai mật khẩu (secret)' });
    var cfg = SHEETS[body.type];
    if (!cfg) return json({ ok: false, error: 'Loại dữ liệu không hợp lệ' });
    var d = body.data || {};

    lock.waitLock(20000);

    // Chống ghi trùng theo submissionId (trong 6 giờ)
    var cache = CacheService.getScriptCache();
    var key = 'sub_' + d.submissionId;
    if (d.submissionId && cache.get(key)) return json({ ok: true, duplicate: true });

    var sheet = getSheet(cfg);
    sheet.appendRow(cfg.row(d));
    if (d.submissionId) cache.put(key, '1', 21600);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function doGet() {
  return json({ ok: true, message: 'PG Food Apps Script đang hoạt động' });
}

function getSheet(cfg) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(cfg.name);
  if (!sheet) {
    sheet = ss.insertSheet(cfg.name);
    sheet.appendRow(cfg.headers);
    sheet.getRange(1, 1, 1, cfg.headers.length).setFontWeight('bold').setBackground('#1E3A78').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Chạy hàm này 1 lần trong trình chỉnh sửa để tạo sẵn 3 tab và cấp quyền */
function setup() {
  Object.keys(SHEETS).forEach(function (k) { getSheet(SHEETS[k]); });
}
