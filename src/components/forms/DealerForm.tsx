"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/Icons";
import { dealerTypes } from "@/data/dealer";
import { provinces } from "@/data/provinces";
import { t } from "@/i18n";
import { Consent, Field, FormMessage, Honeypot, formToObject, useSubmit, validate } from "./FormKit";

export function DealerForm() {
  const { submit, sending, errors, setErrors, message } = useSubmit("/api/dealer");
  const [done, setDone] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = formToObject(e.currentTarget);
    const errs = validate(data, ["name", "phone", "province", "dealerType"]);
    setErrors(errs);
    if (Object.keys(errs).length) return document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
    const code = await submit(data);
    if (code) setDone(code);
  }

  if (done)
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-pg-gold/40" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pg-green text-white"><CheckIcon width={32} height={32} /></span>
        <h3 className="mt-4 text-2xl font-extrabold">Đăng ký thành công!</h3>
        <p className="mt-2 text-ink/80">Mã đăng ký: <b className="text-pg-blue">{done}</b>. PG Food sẽ liên hệ tư vấn và gửi báo giá cho bạn sớm nhất.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl bg-white p-5 ring-1 ring-pg-blue/5 md:p-7">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Họ và tên" required autoComplete="name" error={errors.name} />
        <Field name="phone" label="Số điện thoại / Zalo" required type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
        <Field as="select" name="province" label="Tỉnh / thành phố" required defaultValue="" error={errors.province}>
          <option value="" disabled>{t.form.chooseProvince}</option>
          {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
        </Field>
        <Field as="select" name="dealerType" label="Hình thức hợp tác" required defaultValue="" error={errors.dealerType}>
          <option value="" disabled>Chọn hình thức</option>
          {dealerTypes.map((d) => <option key={d} value={d}>{d}</option>)}
        </Field>
      </div>
      <Field name="business" label="Tên cửa hàng / doanh nghiệp" autoComplete="organization" />
      <Field name="address" label="Địa chỉ kinh doanh" autoComplete="street-address" />
      <Field as="textarea" name="note" label="Kinh nghiệm, nhu cầu, câu hỏi" placeholder="Ví dụ: đang có cửa hàng tạp hóa, muốn nhập thử 5 thùng..." />
      <Consent error={errors.consent} />
      <FormMessage text={message} />
      <button type="submit" disabled={sending} className="btn btn-gold neon-border-gold w-full text-lg">
        {sending ? t.checkout.sending : t.common.registerDealer}
      </button>
    </form>
  );
}
