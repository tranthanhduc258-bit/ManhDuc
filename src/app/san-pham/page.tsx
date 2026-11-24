import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { pageMeta } from "@/lib/seo";
import { t } from "@/i18n";

export const metadata: Metadata = pageMeta({
  title: "Sản phẩm – Sữa chua uống lợi khuẩn Chun Yi Tian",
  description: "Sữa chua uống lợi khuẩn Chun Yi Tian lên men 72 giờ: lốc 4 chai, khay 20 chai, thùng 80 chai. Đặt online, giao hàng tận nơi.",
  path: "/san-pham",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero title={t.products.title} intro={t.products.intro} crumbs={[{ label: t.products.title }]} accent="red" />
      <section className="mx-auto max-w-6xl px-4 pt-6">
        <ProductGrid />
      </section>
    </>
  );
}
