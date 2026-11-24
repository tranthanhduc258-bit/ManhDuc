/** Chuẩn hóa & kiểm tra số điện thoại di động / cố định Việt Nam */
export function normalizePhone(input: string): string {
  let p = (input || "").replace(/[\s.\-()]/g, "");
  if (p.startsWith("+84")) p = "0" + p.slice(3);
  else if (p.startsWith("84") && p.length === 11) p = "0" + p.slice(2);
  return p;
}

export function isValidVnPhone(input: string): boolean {
  const p = normalizePhone(input);
  // Di động: 03, 05, 07, 08, 09 + 8 số; Cố định: 02x + 8 số
  return /^0(3|5|7|8|9)\d{8}$/.test(p) || /^02\d{9}$/.test(p);
}

export const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";
