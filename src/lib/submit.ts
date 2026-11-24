import { NextResponse } from "next/server";
import { clientIp, findDuplicate, rateLimited, remember } from "./guard";
import { getDestination } from "./orderDestination";
import { clean } from "./validation";

export type Body = Record<string, unknown>;

export const fail = (status: number, error: string, fields?: Record<string, string>) =>
  NextResponse.json({ ok: false, error, fields }, { status });

/**
 * Bước chung cho mọi form: đọc JSON, honeypot, giới hạn tốc độ, chống trùng.
 * Trả về body nếu hợp lệ, hoặc NextResponse nếu cần dừng.
 */
export async function preflight(req: Request, prefix: string) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return { stop: fail(400, "Dữ liệu không hợp lệ") };
  }
  // Honeypot: ô "website" bị ẩn, người thật không điền. Bot điền → giả vờ thành công.
  if (clean(body.website)) {
    return { stop: NextResponse.json({ ok: true, code: `${prefix}-000000-0000` }) };
  }
  if (rateLimited(clientIp(req))) {
    return { stop: fail(429, "Bạn gửi quá nhanh, vui lòng thử lại sau 1 phút.") };
  }
  if (body.consent !== true) {
    return { stop: fail(400, "Vui lòng đồng ý với chính sách bảo mật", { consent: "required" }) };
  }
  const submissionId = clean(body.submissionId, 64) || crypto.randomUUID();
  return { body, submissionId };
}

export async function withDedupe(
  keys: string[],
  run: () => Promise<string>,
): Promise<NextResponse> {
  const dup = findDuplicate(keys);
  if (dup) {
    console.log(`[submit] trùng -> trả lại mã cũ ${dup} (${keys[0]})`);
    return NextResponse.json({ ok: true, code: dup, duplicate: true });
  }
  try {
    const code = await run();
    remember(keys, code);
    console.log(`[submit] OK ${code} -> ${getDestination().name}`);
    return NextResponse.json({ ok: true, code });
  } catch (e) {
    console.error("[submit] LỖI", keys[0], e);
    return fail(502, "Hệ thống đang bận, vui lòng thử lại hoặc gọi hotline.");
  }
}
