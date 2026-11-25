import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, BacteriaIcon } from "@/components/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { t } from "@/i18n";

export const metadata: Metadata = pageMeta({
  title: "Kiến thức lợi khuẩn",
  description: "Lợi khuẩn là gì, sữa chua uống lên men khác sữa thường thế nào, cách bảo quản sữa chua uống đúng cách – kiến thức hữu ích từ PG Food.",
  path: "/kien-thuc",
});

export default function KnowledgePage() {
  return (
    <>
      <PageHero kicker="Góc kiến thức" title={<>Kiến thức <span className="text-pg-green">lợi khuẩn</span></>} intro="Hiểu đúng về lợi khuẩn và sữa chua uống lên men để chọn lựa phù hợp cho cả gia đình." crumbs={[{ label: "Kiến thức" }]} accent="green" />
      <section className="mx-auto max-w-6xl px-4 pt-4">
        <ul className="grid gap-5 md:grid-cols-3">
          {articles.map((a, i) => (
            <li key={a.slug}>
              <Reveal delay={i * 0.1} className="h-full">
                <Link href={`/kien-thuc/${a.slug}`} className="product-card group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-pg-green/15">
                  <div className="relative grid h-36 place-items-center overflow-hidden bg-gradient-to-br from-pg-green/15 via-cream to-pg-gold/15">
                    <BacteriaIcon width={64} height={64} className="product-img text-pg-green/60" />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-pg-green">{a.tag}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl font-extrabold leading-snug group-hover:text-pg-green">{a.title}</h2>
                    <p className="mt-2 line-clamp-3 text-[15px] text-ink/75">{a.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-sm text-ink/70">
                      <span>{formatDate(a.date)} · {a.readMinutes} {t.common.minutesRead}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-pg-green">{t.common.readMore} <ArrowRightIcon width={16} height={16} /></span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
