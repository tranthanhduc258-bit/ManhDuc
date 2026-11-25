import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderButton } from "@/components/product/OrderButton";
import { Gallery } from "@/components/product/Gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductTabs } from "@/components/product/ProductTabs";
import { CheckIcon, ChevronIcon } from "@/components/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { Price } from "@/components/ui/Price";
import { defaultProductInfo, getProduct, products } from "@/data/products";
import { categories } from "@/data/categories";
import { pageMeta, productLd } from "@/lib/seo";
import { t } from "@/i18n";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({
    title: p.name,
    description: `${p.name} – quy cách ${p.size}. ${p.highlights.join(", ")}. Đặt hàng online, giao tận nơi.`,
    path: `/san-pham/${p.slug}`,
    image: p.images[0],
  });
}

export default async function ProductDetail({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category);
  const related = products.filter((x) => x.slug !== p.slug && x.status === "available").slice(0, 3);

  return (
    <div className="bg-[linear-gradient(180deg,var(--color-cream)_0,var(--color-milk)_420px)]">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-6">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm">
          <ol className="flex flex-wrap items-center gap-1 text-pg-blue/70">
            <li><Link href="/" className="hover:text-pg-blue">Trang chủ</Link></li>
            <li className="flex items-center gap-1"><ChevronIcon width={14} height={14} /><Link href="/san-pham" className="hover:text-pg-blue">{t.nav.products}</Link></li>
            <li className="flex items-center gap-1"><ChevronIcon width={14} height={14} /><span aria-current="page" className="line-clamp-1 font-semibold text-pg-blue">{p.size}</span></li>
          </ol>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <Gallery images={p.images} alt={p.name} />
          <div>
            {cat && <p className="text-sm font-bold uppercase tracking-wider text-pg-red">{cat.name}</p>}
            <h1 className="title-grad mt-1 text-2xl font-extrabold leading-snug md:text-3xl">{p.name}</h1>
            <p className="mt-2 text-ink/75">{t.common.size}: <strong className="text-pg-blue">{p.size}</strong></p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-sm text-ink/70">{t.common.retailPrice}:</span>
              <Price value={p.retailPrice} className="text-3xl md:text-4xl" />
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-pg-green/10 px-3 py-1.5 text-sm font-semibold text-pg-green">
                  <CheckIcon width={16} height={16} /> {h}
                </li>
              ))}
            </ul>
            <div className="mt-6"><OrderButton slug={p.slug} /></div>
            <p className="mt-3 text-sm text-ink/70">Không cần thanh toán trước – nhân viên PG Food sẽ gọi xác nhận đơn.</p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl bg-white p-4 ring-1 ring-pg-blue/5 md:p-8">
          <ProductTabs
            description={p.description || defaultProductInfo.description}
            ingredients={p.ingredients || defaultProductInfo.ingredients}
            storage={p.storage || defaultProductInfo.storage}
            declarationImages={p.declarationImages}
          />
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="title-grad mb-5 text-2xl font-extrabold">Sản phẩm khác</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ProductCard key={r.slug} product={r} />)}
            </div>
          </section>
        )}
      </div>
      <JsonLd data={productLd(p)} />
    </div>
  );
}
