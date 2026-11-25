"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckIcon } from "@/components/Icons";
import { Price } from "@/components/ui/Price";
import { QtyInput } from "@/components/ui/QtyInput";
import { products } from "@/data/products";
import { provinces } from "@/data/provinces";
import { formatVnd } from "@/lib/format";
import { t } from "@/i18n";
import { Consent, Field, FormMessage, FormToast, Honeypot, formToObject, reportMissing, useSubmit, validate } from "./FormKit";

const available = products.filter((p) => p.status === "available");

/** Form "Liên hệ mua hàng": tích chọn sản phẩm + để lại thông tin. Không thanh toán trên web. */
export function OrderForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { submit, sending, errors, setErrors, message, clearError } = useSubmit("/api/order");
  const [hint, setHint] = useState("");
  const [toast, setToast] = useState("");

  // ?sp=slug&sl=2 → chọn sẵn sản phẩm từ trang sản phẩm
  const [picked, setPicked] = useState<Record<string, number>>(() => {
    const sp = params.get("sp");
    const sl = Math.max(1, Math.min(999, parseInt(params.get("sl") || "1") || 1));
    return sp && available.some((p) => p.slug === sp) ? { [sp]: sl } : {};
  });

  const toggle = (slug: string) => {
    if (errors.products) setErrors(({ products: _removed, ...rest }) => rest);
    setPicked((prev) => {
      const next = { ...prev };
      if (next[slug]) delete next[slug];
      else next[slug] = 1;
      return next;
    });
  };

  const items = available.filter((p) => picked[p.slug]).map((p) => ({ product: p, qty: picked[p.slug] }));
  // Số chai mỗi quy cách lấy từ "4 chai x 108ml" → 4
  const bottles = items.reduce((s, i) => s + (parseInt(i.product.size) || 0) * i.qty, 0);
  const allPriced = items.length > 0 && items.every((i) => i.product.retailPrice > 0);
  const estimate = items.reduce((s, i) => s + i.product.retailPrice * i.qty, 0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = formToObject(e.currentTarget);
    const errs = validate(data, ["name", "phone", "province", "address"]);
    if (!items.length) errs.products = t.order.productsRequired;
    setErrors(errs);
    setHint("");
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      // Báo "chưa đặt hàng thành công" + cuộn, đặt con trỏ vào ô thiếu đầu tiên
      const msg = reportMissing(errs, ["products", "name", "phone", "province", "address", "consent"], "Chưa đặt hàng thành công.", { products: "chon-san-pham" });
      setHint(msg);
      setToast(msg);
      return;
    }
    const code = await submit({ ...data, items: items.map((i) => ({ slug: i.product.slug, qty: i.qty })) });
    if (code) router.push(`/mua-hang/thanh-cong?ma=${encodeURIComponent(code)}`);
  }

  return (
    <form onSubmit={onSubmit} onChange={clearError} noValidate className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <FormToast text={toast} onClose={() => setToast("")} />
      <Honeypot />
      <fieldset id="chon-san-pham" tabIndex={-1} className="h-fit rounded-3xl bg-white p-5 ring-1 ring-pg-blue/5 focus:outline-none md:p-7">
        <legend className="sr-only">{t.order.chooseProducts}</legend>
        <h2 className="text-xl font-extrabold">1. {t.order.chooseProducts}</h2>
        <p className="mt-1 text-sm text-ink/70">{t.order.chooseProductsHint}</p>
        <AnimatePresence initial={false}>
          {items.length > 0 && (
            <m.p
              key={`${items.length}-${bottles}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-pg-red px-4 py-1.5 text-sm font-bold text-white shadow-[0_6px_18px_-8px_rgba(215,25,32,.7)]"
              aria-live="polite"
            >
              <CheckIcon width={16} height={16} /> Đã chọn {items.length} sản phẩm{bottles ? ` · ${bottles} chai` : ""}
            </m.p>
          )}
        </AnimatePresence>
        <ul className="mt-4 space-y-3">
          {available.map((p) => {
            const on = !!picked[p.slug];
            return (
              <m.li
                key={p.slug}
                animate={on ? { scale: [1, 1.025, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                whileTap={{ scale: 0.98 }}
                className={`pick-card rounded-2xl border-2 p-3 transition-[border-color,background-color,box-shadow] duration-300 ${
                  on ? "is-on border-pg-red bg-pg-red/[.04]" : "border-pg-blue/10 bg-white hover:border-pg-blue/35"
                }`}
              >
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={on} onChange={() => toggle(p.slug)} className="peer sr-only" />
                  <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 transition-colors duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-pg-gold/50 ${on ? "border-pg-red bg-pg-red text-white" : "border-pg-blue/25 bg-white"}`}>
                    <AnimatePresence>
                      {on && (
                        <m.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 600, damping: 18 }} className="grid place-items-center">
                          <CheckIcon width={18} height={18} />
                        </m.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <m.span
                    animate={on ? { rotate: [0, -6, 5, -3, 0], y: [0, -3, 0] } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                  >
                    <Image src={p.images[0]} alt="" fill sizes="80px" className="object-contain p-1" />
                  </m.span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-snug text-pg-blue">{p.name.replace("Sữa chua uống lợi khuẩn ", "")}</span>
                    <span className="block text-sm text-ink/70">{p.size}</span>
                    <Price value={p.retailPrice} className="text-base" />
                  </span>
                  {on && <span className="hidden shrink-0 rounded-full bg-pg-red px-2.5 py-0.5 text-xs font-bold text-white sm:inline">Đã chọn</span>}
                </label>
                <AnimatePresence initial={false}>
                  {on && (
                    <m.div
                      key="qty"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex items-center justify-end gap-3 border-t border-pg-red/15 pt-3">
                        <span className="text-sm font-semibold text-pg-blue">{t.common.quantity}</span>
                        <QtyInput value={picked[p.slug]} onChange={(n) => setPicked((prev) => ({ ...prev, [p.slug]: n }))} label={`Số lượng ${p.size}`} />
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.li>
            );
          })}
        </ul>
        {errors.products && <p className="mt-3 text-sm font-medium text-pg-red">{errors.products}</p>}
        {allPriced && (
          <div className="mt-5 flex items-baseline justify-between rounded-2xl bg-cream px-4 py-3">
            <span className="font-semibold text-pg-blue">{t.order.estimate}</span>
            <span className="neon-red text-2xl font-extrabold">{formatVnd(estimate)}</span>
          </div>
        )}
        <p className="mt-3 text-xs text-ink/70">{t.order.estimateNote}</p>
      </fieldset>

      <div className="h-fit space-y-4 rounded-3xl bg-cream p-5 md:p-7 lg:sticky lg:top-24">
        <h2 className="text-xl font-extrabold">2. {t.order.yourInfo}</h2>
        <Field name="name" label={t.order.name} required autoComplete="name" error={errors.name} />
        <Field name="phone" label={t.order.phone} required type="tel" inputMode="tel" autoComplete="tel" placeholder="0856 791 816" error={errors.phone} />
        <Field as="select" name="province" label={t.order.province} required error={errors.province} defaultValue="">
          <option value="" disabled>{t.form.chooseProvince}</option>
          {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
        </Field>
        <Field name="address" label={t.order.address} required autoComplete="street-address" placeholder="Số nhà, thôn/xóm, xã/phường" error={errors.address} />
        <Field as="textarea" name="note" label={t.order.note} placeholder="Thời gian tiện nghe máy, giao hàng..." />
        <p className="flex gap-2 rounded-2xl bg-pg-green/10 px-4 py-3 text-sm font-medium text-pg-green">
          <CheckIcon width={18} height={18} className="mt-0.5 shrink-0" /> {t.order.noPrepay}
        </p>
        <Consent error={errors.consent} />
        <FormMessage text={hint || message} />
        <button type="submit" disabled={sending} className="btn btn-red w-full text-lg">
          {sending ? t.order.sending : t.order.submit}
        </button>
      </div>
    </form>
  );
}
