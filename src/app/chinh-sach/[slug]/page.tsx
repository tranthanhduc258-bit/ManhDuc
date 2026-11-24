import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/ui/Blocks";
import { PageHero } from "@/components/ui/PageHero";
import { getPolicy, policies } from "@/data/policies";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => policies.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPolicy((await params).slug);
  return p ? pageMeta({ title: p.title, description: `${p.title} của PG Food – ${p.summary}`, path: `/chinh-sach/${p.slug}` }) : {};
}

export default async function PolicyPage({ params }: Props) {
  const p = getPolicy((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero title={p.title} intro={p.summary} crumbs={[{ href: "/chinh-sach", label: "Chính sách" }, { label: p.title }]} />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 pt-2 md:grid-cols-[220px_1fr]">
        <nav aria-label="Các chính sách" className="md:sticky md:top-24 md:h-fit">
          <ul className="flex gap-2 overflow-x-auto md:flex-col">
            {policies.map((x) => (
              <li key={x.slug} className="shrink-0">
                <Link href={`/chinh-sach/${x.slug}`} aria-current={x.slug === p.slug ? "page" : undefined}
                  className={`flex min-h-11 items-center rounded-xl px-4 text-[15px] font-semibold ${x.slug === p.slug ? "bg-pg-blue text-white" : "bg-cream text-pg-blue"}`}>
                  {x.title.replace("Chính sách ", "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <article>
          <Blocks blocks={p.content} />
          <p className="mt-6 text-sm text-ink/65">Cập nhật: {formatDate(p.updated)}</p>
        </article>
      </div>
    </>
  );
}
