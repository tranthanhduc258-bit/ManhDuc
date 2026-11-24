import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "@/components/Icons";
import { Blocks } from "@/components/ui/Blocks";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { articles, getArticle } from "@/data/articles";
import { site, siteUrl } from "@/data/site";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { t } from "@/i18n";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  return a ? pageMeta({ title: a.title, description: a.excerpt, path: `/kien-thuc/${a.slug}` }) : {};
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 2);
  return (
    <>
      <PageHero
        kicker={a.tag}
        title={a.title}
        intro={<span className="text-sm">{formatDate(a.date)} · {a.readMinutes} {t.common.minutesRead}</span>}
        crumbs={[{ href: "/kien-thuc", label: "Kiến thức" }, { label: a.title }]}
        accent="green"
      />
      <article className="mx-auto max-w-3xl px-4 pt-2">
        <p className="mb-6 text-lg font-medium leading-relaxed text-pg-blue/90">{a.excerpt}</p>
        <Blocks blocks={a.content} />
        <p className="mt-8 rounded-2xl bg-pg-green/10 px-5 py-4 text-sm text-ink/75">
          Thông tin trong bài mang tính tham khảo. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
        </p>
      </article>
      <section className="mx-auto mt-12 max-w-3xl px-4">
        <h2 className="text-xl font-extrabold">Bài viết liên quan</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/kien-thuc/${r.slug}`} className="group flex h-full flex-col rounded-3xl bg-cream p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
                <span className="text-xs font-bold uppercase text-pg-green">{r.tag}</span>
                <span className="mt-1 font-extrabold text-pg-blue group-hover:text-pg-green">{r.title}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pg-green">{t.common.readMore} <ArrowRightIcon width={16} height={16} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt,
        datePublished: a.date, author: { "@type": "Organization", name: site.brand },
        publisher: { "@type": "Organization", name: site.companyName, logo: { "@type": "ImageObject", url: `${siteUrl}${site.logo}` } },
        mainEntityOfPage: `${siteUrl}/kien-thuc/${a.slug}`,
      }} />
    </>
  );
}
