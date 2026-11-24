import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { BottleIcon, HomeIcon, StoreIcon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { t } from "@/i18n";

export const metadata: Metadata = pageMeta({
  title: "Sản phẩm – Sữa chua uống lợi khuẩn Chun Yi Tian",
  description: "Sữa chua uống lợi khuẩn Chun Yi Tian lên men 72 giờ: lốc 4 chai, khay 20 chai, thùng 80 chai. Đặt online, giao hàng tận nơi.",
  path: "/san-pham",
});

const sizeIcons = { bottle: BottleIcon, home: HomeIcon, store: StoreIcon } as const;

export default function ProductsPage() {
  const intro = (
    <>
      <span className="block">{t.products.intro}</span>
      <ul className="mt-3 space-y-2">
        {t.products.sizes.map((s) => {
          const Icon = sizeIcons[s.icon as keyof typeof sizeIcons];
          return (
            <li key={s.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-pg-red shadow-sm ring-1 ring-pg-red/15">
                <Icon width={20} height={20} />
              </span>
              <span><b className="text-pg-blue">{s.label}</b> {s.text}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
  return (
    <>
      <PageHero title={t.products.title} intro={intro} crumbs={[{ label: t.products.title }]} accent="red" />
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <ProductGrid />
      </section>
    </>
  );
}
