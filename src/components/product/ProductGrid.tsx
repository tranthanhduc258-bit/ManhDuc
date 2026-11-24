"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { SparkIcon } from "@/components/Icons";
import { site } from "@/data/site";
import { t } from "@/i18n";

export function ProductGrid() {
  const [cat, setCat] = useState<string>("all");
  const list = products.filter((p) => cat === "all" || p.category === cat);
  const available = list.filter((p) => p.status === "available");
  const coming = list.filter((p) => p.status === "coming-soon");
  const tabs = [{ slug: "all", name: t.products.all }, ...categories];

  return (
    <>
      <div role="tablist" aria-label="Danh mục" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
        {tabs.map((c) => {
          const active = cat === c.slug;
          return (
            <button
              key={c.slug}
              role="tab"
              aria-selected={active}
              onClick={() => setCat(c.slug)}
              className={`min-h-11 shrink-0 rounded-full px-5 text-[15px] font-semibold transition ${
                active ? "bg-pg-red text-white shadow-md" : "bg-cream text-pg-blue hover:bg-pg-blue/10"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <m.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {available.map((p, i) => (
            <m.li key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}>
              <ProductCard product={p} priority={i < 2} />
            </m.li>
          ))}
          {coming.map((p) => (
            <li key={p.slug}><ComingSoonCard title={p.name} /></li>
          ))}
          <m.li key="__coming" layout>
            <ComingSoonCard />
          </m.li>
        </AnimatePresence>
      </m.ul>
    </>
  );
}

function ComingSoonCard({ title }: { title?: string }) {
  return (
    <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pg-blue/20 bg-cream/60 p-6 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-pg-gold/15 text-pg-gold"><SparkIcon width={28} height={28} /></span>
      <p className="mt-3 text-lg font-extrabold text-pg-blue">{title || t.common.comingSoon}</p>
      {title && <span className="mt-1 rounded-full bg-pg-red px-3 py-0.5 text-xs font-bold text-white">{t.common.comingSoon}</span>}
      <p className="mt-2 max-w-xs text-sm text-ink/70">{t.products.comingSoonText}</p>
      <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4 text-sm">{t.common.chatZalo}</a>
    </div>
  );
}
