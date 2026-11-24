import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHero } from "@/components/ui/PageHero";
import { t } from "@/i18n";

export const metadata: Metadata = { title: t.cart.title, robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHero title={t.cart.title} crumbs={[{ label: t.cart.title }]} accent="red" />
      <section className="mx-auto max-w-6xl px-4 pt-4"><CartView /></section>
    </>
  );
}
