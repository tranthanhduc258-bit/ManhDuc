import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { Price } from "@/components/ui/Price";
import { t } from "@/i18n";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const href = `/san-pham/${product.slug}`;
  return (
    <article data-product-card className="product-card group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_24px_-16px_rgba(30,58,120,.35)] ring-1 ring-pg-blue/5">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-cream" aria-label={product.name}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px"
          className="product-img object-contain p-3"
          priority={priority}
        />
        <span className="badge-glow absolute left-3 top-3 rounded-full bg-pg-green px-3 py-1 text-xs font-bold text-white">{product.highlights[0]}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-bold leading-snug">
          <Link href={href} className="hover:text-pg-blue-light">{product.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-ink/70">{t.common.size}: {product.size}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <Price value={product.retailPrice} className="text-xl" />
          <Link href={href} className="text-sm font-semibold text-pg-blue underline-offset-4 hover:underline">{t.common.viewDetail}</Link>
        </div>
        <div className="card-action mt-4">
          <Link href={`/mua-hang?sp=${product.slug}`} className="btn btn-red btn-shine w-full">{t.common.orderNow}</Link>
        </div>
      </div>
    </article>
  );
}
