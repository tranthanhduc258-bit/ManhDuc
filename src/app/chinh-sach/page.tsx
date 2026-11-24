import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { policies } from "@/data/policies";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Chính sách", description: "Chính sách giao hàng, đổi trả, bảo mật và thanh toán của PG Food.", path: "/chinh-sach" });

export default function PoliciesPage() {
  return (
    <>
      <PageHero title="Chính sách" crumbs={[{ label: "Chính sách" }]} />
      <section className="mx-auto max-w-3xl px-4 pt-4">
        <ul className="grid gap-4 sm:grid-cols-2">
          {policies.map((p) => (
            <li key={p.slug}>
              <Link href={`/chinh-sach/${p.slug}`} className="flex h-full flex-col rounded-3xl bg-cream p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <span className="text-lg font-extrabold text-pg-blue">{p.title}</span>
                <span className="mt-1 text-[15px] text-ink/70">{p.summary}</span>
                <ArrowRightIcon width={18} height={18} className="mt-3 text-pg-blue" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
