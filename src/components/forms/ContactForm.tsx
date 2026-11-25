"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/Icons";
import { t } from "@/i18n";
import { Consent, Field, FormMessage, FormToast, Honeypot, formToObject, reportMissing, useSubmit, validate } from "./FormKit";

export function ContactForm() {
  const [toast, setToast] = useState("");
  const { submit, sending, errors, setErrors, message, clearError } = useSubmit("/api/contact");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = formToObject(e.currentTarget);
    const errs = validate(data, ["name", "phone", "message"]);
    const email = String(data.email || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email chưa đúng định dạng";
    setErrors(errs);
    if (Object.keys(errs).length) return setToast(reportMissing(errs, ["name", "phone", "email", "message", "consent"], "Chưa gửi liên hệ thành công."));
    if (await submit(data)) setDone(true);
  }

  if (done)
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-pg-blue/10" role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pg-green text-white"><CheckIcon width={32} height={32} /></span>
        <h2 className="title-grad mt-4 text-2xl font-extrabold">Đã gửi liên hệ!</h2>
        <p className="mt-2 text-ink/80">Cảm ơn bạn. PG Food sẽ phản hồi trong thời gian sớm nhất.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} onChange={clearError} noValidate className="space-y-4 rounded-3xl bg-white p-5 ring-1 ring-pg-blue/5 md:p-7">
      <FormToast text={toast} onClose={() => setToast("")} />
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Họ và tên" required autoComplete="name" error={errors.name} />
        <Field name="phone" label="Số điện thoại" required type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
      </div>
      <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      <Field as="textarea" name="message" label="Nội dung" required rows={4} error={errors.message} />
      <Consent error={errors.consent} />
      <FormMessage text={message} />
      <button type="submit" disabled={sending} className="btn btn-blue btn-shine w-full text-lg">{sending ? t.order.sending : "Gửi liên hệ"}</button>
    </form>
  );
}
