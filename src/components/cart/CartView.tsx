"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useCart } from "./CartContext";
import { QtyInput } from "@/components/product/BuyBox";
import { CartIcon, TrashIcon } from "@/components/Icons";
import { Price } from "@/components/ui/Price";
import { formatVnd } from "@/lib/format";
import { t } from "@/i18n";

export function CartView() {
  const { ready, rows, subtotal, setQty, remove } = useCart();
  if (!ready) return <div className="h-48 animate-pulse rounded-3xl bg-cream" />;
  if (!rows.length)
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-cream p-8 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-pg-blue"><CartIcon width={30} height={30} /></span>
        <p className="mt-4 text-lg font-semibold text-pg-blue">{t.cart.empty}</p>
        <Link href="/san-pham" className="btn btn-red mt-5">{t.cart.continue}</Link>
      </div>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <m.li key={r.slug} layout exit={{ opacity: 0, x: -40 }} className="flex gap-4 rounded-3xl bg-white p-3 ring-1 ring-pg-blue/5 md:p-4">
              <Link href={`/san-pham/${r.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-cream md:h-28 md:w-32">
                <Image src={r.product.images[0]} alt={r.product.name} fill sizes="128px" className="object-contain p-1" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/san-pham/${r.slug}`} className="font-bold leading-snug text-pg-blue">{r.product.name}</Link>
                <p className="text-sm text-ink/70">{r.product.size} · <Price value={r.product.retailPrice} className="text-sm" /></p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                  <QtyInput value={r.qty} onChange={(n) => setQty(r.slug, n)} />
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-pg-red">{formatVnd(r.lineTotal)}</span>
                    <button onClick={() => remove(r.slug)} aria-label={`${t.cart.remove} ${r.product.name}`} className="grid h-11 w-11 place-items-center rounded-full text-ink/65 hover:bg-pg-red/10 hover:text-pg-red">
                      <TrashIcon width={20} height={20} />
                    </button>
                  </div>
                </div>
              </div>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
      <aside className="h-fit rounded-3xl bg-cream p-5 lg:sticky lg:top-24">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold text-pg-blue">{t.cart.subtotal}</span>
          <Price value={subtotal} className="text-2xl" />
        </div>
        <p className="mt-2 text-sm text-ink/65">{t.cart.shippingNote}</p>
        <Link href="/dat-hang" className="btn btn-red mt-5 w-full text-lg">{t.cart.checkout}</Link>
        <Link href="/san-pham" className="mt-3 flex min-h-11 items-center justify-center text-sm font-semibold text-pg-blue hover:underline">{t.cart.continue}</Link>
      </aside>
    </div>
  );
}
