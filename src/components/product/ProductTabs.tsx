"use client";

import Image from "next/image";
import { useState } from "react";
import { t } from "@/i18n";

type Tab = { key: string; label: string };

export function ProductTabs({
  description, ingredients, storage, declarationImages = [],
}: { description: string; ingredients: string; storage: string; declarationImages?: string[] }) {
  const tabs: Tab[] = [
    { key: "description", label: t.products.tabs.description },
    { key: "ingredients", label: t.products.tabs.ingredients },
    { key: "storage", label: t.products.tabs.storage },
    { key: "declaration", label: t.products.tabs.declaration },
  ];
  const [active, setActive] = useState("description");
  return (
    <div>
      <div role="tablist" className="-mx-4 flex gap-1 overflow-x-auto border-b border-pg-blue/10 px-4">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            role="tab"
            id={`tab-${tb.key}`}
            aria-selected={active === tb.key}
            aria-controls={`panel-${tb.key}`}
            onClick={() => setActive(tb.key)}
            className={`relative min-h-12 shrink-0 px-4 font-semibold transition ${active === tb.key ? "text-pg-red" : "text-pg-blue/70 hover:text-pg-blue"}`}
          >
            {tb.label}
            {active === tb.key && <span className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-pg-red" />}
          </button>
        ))}
      </div>
      <div className="py-5 text-[16px] leading-relaxed">
        {active === "description" && <p id="panel-description" role="tabpanel" aria-labelledby="tab-description">{description}</p>}
        {active === "ingredients" && <p id="panel-ingredients" role="tabpanel" aria-labelledby="tab-ingredients">{ingredients}</p>}
        {active === "storage" && <p id="panel-storage" role="tabpanel" aria-labelledby="tab-storage">{storage}</p>}
        {active === "declaration" && (
          <div id="panel-declaration" role="tabpanel" aria-labelledby="tab-declaration">
            {declarationImages.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {declarationImages.map((src) => (
                  <a key={src} href={src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-white ring-1 ring-pg-blue/10">
                    <Image src={src} alt="Giấy công bố sản phẩm" fill sizes="(max-width:640px) 100vw, 400px" className="object-contain" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl bg-cream px-4 py-6 text-center text-ink/70">{t.products.declarationPending}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
