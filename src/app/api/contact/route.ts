import { makeCode, vnNow } from "@/lib/codes";
import { contactMessage, notifyAll } from "@/lib/notify";
import { getDestination } from "@/lib/orderDestination";
import { fail, preflight, withDedupe } from "@/lib/submit";
import type { ContactRecord } from "@/lib/types";
import { clean, isValidVnPhone, normalizePhone } from "@/lib/validation";

export async function POST(req: Request) {
  const pre = await preflight(req, "LH");
  if ("stop" in pre) return pre.stop;
  const { body, submissionId } = pre;

  const rec = {
    name: clean(body.name, 100),
    phone: normalizePhone(clean(body.phone, 20)),
    email: clean(body.email, 120),
    message: clean(body.message, 2000),
  };
  const fields: Record<string, string> = {};
  if (!rec.name) fields.name = "required";
  if (!isValidVnPhone(rec.phone)) fields.phone = "invalid";
  if (rec.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rec.email)) fields.email = "invalid";
  if (!rec.message) fields.message = "required";
  if (Object.keys(fields).length) return fail(400, "Vui lòng kiểm tra lại thông tin", fields);

  return withDedupe([`contact:${submissionId}`, `contact:${rec.phone}:${rec.message.slice(0, 80)}`], async () => {
    const c: ContactRecord = { code: makeCode("LH"), createdAt: vnNow(), submissionId, ...rec, status: "Mới" };
    await getDestination().saveContact(c);
    await notifyAll(`Liên hệ mới ${c.code}`, contactMessage(c));
    return c.code;
  });
}
