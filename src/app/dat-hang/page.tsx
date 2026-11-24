import type { Metadata } from "next";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { PageHero } from "@/components/ui/PageHero";
import { t } from "@/i18n";

export const metadata: Metadata = { title: t.checkout.title, robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <PageHero title={t.checkout.title} crumbs={[{ href: "/gio-hang", label: t.cart.title }, { label: t.checkout.title }]} accent="red" />
      <section className="mx-auto max-w-6xl px-4 pt-4"><CheckoutForm /></section>
    </>
  );
}
