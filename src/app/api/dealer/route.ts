import { makeCode, vnNow } from "@/lib/codes";
import { dealerMessage, notifyAll } from "@/lib/notify";
import { getDestination } from "@/lib/orderDestination";
import { fail, preflight, withDedupe } from "@/lib/submit";
import type { DealerRecord } from "@/lib/types";
import { clean, isValidVnPhone, normalizePhone } from "@/lib/validation";

export async function POST(req: Request) {
  const pre = await preflight(req, "DL");
  if ("stop" in pre) return pre.stop;
  const { body, submissionId } = pre;

  const rec = {
    name: clean(body.name, 100),
    phone: normalizePhone(clean(body.phone, 20)),
    province: clean(body.province, 60),
    dealerType: clean(body.dealerType, 60),
    business: clean(body.business, 150),
    address: clean(body.address, 300),
    note: clean(body.note, 1000),
  };
  const fields: Record<string, string> = {};
  if (!rec.name) fields.name = "required";
  if (!isValidVnPhone(rec.phone)) fields.phone = "invalid";
  if (!rec.province) fields.province = "required";
  if (!rec.dealerType) fields.dealerType = "required";
  if (Object.keys(fields).length) return fail(400, "Vui lòng kiểm tra lại thông tin", fields);

  return withDedupe([`dealer:${submissionId}`, `dealer:${rec.phone}:${rec.dealerType}`], async () => {
    const d: DealerRecord = { code: makeCode("DL"), createdAt: vnNow(), submissionId, ...rec, status: "Mới" };
    await getDestination().saveDealer(d);
    await notifyAll(`Đăng ký đại lý ${d.code}`, dealerMessage(d));
    return d.code;
  });
}
