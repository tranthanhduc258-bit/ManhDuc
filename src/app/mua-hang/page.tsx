import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/forms/OrderForm";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/seo";
import { t } from "@/i18n";

export const metadata: Metadata = pageMeta({
  title: t.order.title,
  description: "Đặt mua sữa chua uống lợi khuẩn Chun Yi Tian: chọn sản phẩm, để lại thông tin, PG Food gọi xác nhận và giao tận nơi. Không cần thanh toán trước.",
  path: "/mua-hang",
});

export default function OrderPage() {
  return (
    <>
      <PageHero title={t.order.title} intro={t.order.intro} crumbs={[{ label: t.order.title }]} accent="red" />
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-cream" />}>
          <OrderForm />
        </Suspense>
      </section>
    </>
  );
}
