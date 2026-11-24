const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // bỏ ký tự dễ nhầm O/0, I/1

function vnParts(d = new Date()) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "2-digit", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(d);
  const g = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  return { yy: g("year"), mm: g("month"), dd: g("day"), hh: g("hour"), mi: g("minute") };
}

function randomSuffix(len = 4) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

/** Mã đơn dạng PG-YYMMDD-XXXX; prefix khác cho đại lý (DL) / liên hệ (LH) */
export function makeCode(prefix = "PG") {
  const { yy, mm, dd } = vnParts();
  return `${prefix}-${yy}${mm}${dd}-${randomSuffix()}`;
}

export function vnNow() {
  const { yy, mm, dd, hh, mi } = vnParts();
  return `${dd}/${mm}/20${yy} ${hh}:${mi}`;
}
