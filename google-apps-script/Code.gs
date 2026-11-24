/**
 * PG FOOD – Nhận đơn hàng / đăng ký đại lý / liên hệ từ website:
 *   1) Ghi vào Google Sheet (mỗi loại 1 tab: "Đơn hàng", "Đại lý", "Liên hệ")
 *   2) Gửi email thông báo về Gmail để nhân viên gọi chốt đơn
 * Hướng dẫn cài đặt: xem file HUONG-DAN-GOOGLE-SHEET.md
 */

// Mật khẩu bí mật – phải GIỐNG HỆT biến GOOGLE_SCRIPT_SECRET trên Vercel.
var SECRET = 'DOI-MAT-KHAU-NAY';

// Email nhận thông báo. Nhiều email: cách nhau dấu phẩy, ví dụ 'a@gmail.com,b@gmail.com'
var EMAIL_TO = 'manhducai1989@gmail.com';

var HOTLINE_NAME = 'PG Food';

var SHEETS = {
  order: {
    name: 'Đơn hàng',
    headers: ['Mã đơn', 'Thời gian', 'Khách hàng', 'SĐT', 'Tỉnh/TP', 'Địa chỉ', 'Sản phẩm', 'Tổng SL', 'Tạm tính', 'Ghi chú', 'Trạng thái', 'Nhân viên phụ trách', 'Submission ID'],
    row: function (d) {
      return [
        d.code, d.createdAt, d.name, "'" + d.phone, d.province, d.address,
        d.items.map(function (i) { return i.name + ' (' + i.size + ') x' + i.qty; }).join('\n'),
        d.items.reduce(function (s, i) { return s + i.qty; }, 0),
        d.total || 'Liên hệ', d.note, d.status, '', d.submissionId,
      ];
    },
    subject: function (d) { return '🛒 Đơn mới ' + d.code + ' – ' + d.name + ' – ' + d.phone; },
    body: function (d) {
      var items = d.items.map(function (i) {
        return '<li><b>' + esc(i.name) + '</b> (' + esc(i.size) + ') × <b>' + i.qty + '</b>' +
          (i.unitPrice ? ' = ' + money(i.lineTotal) : '') + '</li>';
      }).join('');
      return card('Đơn hàng mới ' + d.code, [
        ['Thời gian', esc(d.createdAt)],
        ['Khách hàng', '<b>' + esc(d.name) + '</b>'],
        ['Số điện thoại', phoneLinks(d.phone)],
        ['Địa chỉ', esc(d.address) + ', ' + esc(d.province)],
        ['Sản phẩm', '<ul style="margin:0;padding-left:18px">' + items + '</ul>'],
        ['Tạm tính', d.total ? '<b style="color:#D71920">' + money(d.total) + '</b>' : 'Báo giá khi gọi chốt đơn'],
        ['Ghi chú', esc(d.note || '—')],
      ], 'Gọi điện / nhắn Zalo cho khách để xác nhận và chốt đơn.');
    },
  },
  dealer: {
    name: 'Đại lý',
    headers: ['Mã đăng ký', 'Thời gian', 'Họ tên', 'SĐT', 'Tỉnh/TP', 'Hình thức', 'Cửa hàng/DN', 'Địa chỉ', 'Ghi chú', 'Trạng thái', 'Submission ID'],
    row: function (d) {
      return [d.code, d.createdAt, d.name, "'" + d.phone, d.province, d.dealerType, d.business, d.address, d.note, d.status, d.submissionId];
    },
    subject: function (d) { return '🤝 Đăng ký đại lý ' + d.code + ' – ' + d.name + ' – ' + d.province; },
    body: function (d) {
      return card('Đăng ký đại lý / NPP ' + d.code, [
        ['Thời gian', esc(d.createdAt)], ['Họ tên', '<b>' + esc(d.name) + '</b>'], ['Số điện thoại', phoneLinks(d.phone)],
        ['Tỉnh/TP', esc(d.province)], ['Hình thức', esc(d.dealerType)], ['Cửa hàng/DN', esc(d.business || '—')],
        ['Địa chỉ', esc(d.address || '—')], ['Ghi chú', esc(d.note || '—')],
      ], 'Liên hệ tư vấn và gửi báo giá đại lý.');
    },
  },
  contact: {
    name: 'Liên hệ',
    headers: ['Mã', 'Thời gian', 'Họ tên', 'SĐT', 'Email', 'Nội dung', 'Trạng thái', 'Submission ID'],
    row: function (d) {
      return [d.code, d.createdAt, d.name, "'" + d.phone, d.email, d.message, d.status, d.submissionId];
    },
    subject: function (d) { return '✉️ Liên hệ mới ' + d.code + ' – ' + d.name; },
    body: function (d) {
      return card('Liên hệ mới ' + d.code, [
        ['Thời gian', esc(d.createdAt)], ['Họ tên', '<b>' + esc(d.name) + '</b>'], ['Số điện thoại', phoneLinks(d.phone)],
        ['Email', esc(d.email || '—')], ['Nội dung', esc(d.message)],
      ], '');
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

    getSheet(cfg).appendRow(cfg.row(d));
    if (d.submissionId) cache.put(key, '1', 21600);
    lock.releaseLock();

    // Gửi Gmail (lỗi gửi mail không làm mất đơn – đơn đã nằm trong Sheet)
    try {
      if (EMAIL_TO) {
        MailApp.sendEmail({ to: EMAIL_TO, subject: cfg.subject(d), htmlBody: cfg.body(d), name: HOTLINE_NAME + ' – Website' });
      }
    } catch (mailErr) {
      console.error('Gửi mail lỗi: ' + mailErr);
    }
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

// ===== Tiện ích =====
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

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function money(n) {
  return Number(n).toLocaleString('vi-VN') + 'đ';
}

function phoneLinks(p) {
  p = esc(p);
  return '<b style="font-size:16px">' + p + '</b> &nbsp; <a href="tel:' + p + '">📞 Gọi</a> &nbsp; <a href="https://zalo.me/' + p + '">💬 Zalo</a>';
}

function card(title, rows, footer) {
  var trs = rows.map(function (r) {
    var v = r[1]; // giá trị đã được esc() ở nơi gọi
    return '<tr><td style="padding:8px 12px;color:#666;white-space:nowrap;vertical-align:top">' + r[0] +
      '</td><td style="padding:8px 12px;color:#2B2B2B">' + v + '</td></tr>';
  }).join('');
  return '<div style="font-family:Arial,sans-serif;max-width:600px;border:1px solid #eee;border-radius:12px;overflow:hidden">' +
    '<div style="background:#1E3A78;color:#fff;padding:14px 16px;font-size:18px;font-weight:bold">' + esc(title) + '</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:15px">' + trs + '</table>' +
    (footer ? '<div style="background:#FBF6E9;padding:12px 16px;color:#1E3A78;font-weight:bold">' + footer + '</div>' : '') +
    '</div>';
}

/** Chạy hàm này 1 lần trong trình chỉnh sửa: tạo 3 tab, cấp quyền và gửi mail thử */
function setup() {
  Object.keys(SHEETS).forEach(function (k) { getSheet(SHEETS[k]); });
  MailApp.sendEmail({
    to: EMAIL_TO,
    subject: '✅ PG Food – kết nối Gmail thành công',
    htmlBody: card('Kết nối thành công', [['Nhận thông báo tại', esc(EMAIL_TO)], ['Google Sheet', esc(SpreadsheetApp.getActiveSpreadsheet().getUrl())]],
      'Từ giờ mỗi đơn hàng trên website sẽ được gửi về email này.'),
    name: HOTLINE_NAME + ' – Website',
  });
}
