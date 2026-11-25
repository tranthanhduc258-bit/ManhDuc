import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import { HeroVisual } from "@/components/home/HeroVisual";
import { StrengthCards } from "@/components/home/StrengthCards";
import { ProductCard } from "@/components/product/ProductCard";
import { MilkBackground, MilkWave } from "@/components/ui/MilkBackground";
import { Reveal } from "@/components/ui/Reveal";
import { Slogan } from "@/components/ui/Slogan";
import { products } from "@/data/products";
import { t } from "@/i18n";

export default function HomePage() {
  const featured = products.filter((p) => p.featured && p.status === "available").slice(0, 3);
  const heroProduct = products[0];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-cream via-milk to-cream/60 pb-20 pt-6 md:pb-28 md:pt-10">
        <MilkBackground />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-10">
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-pg-green ring-1 ring-pg-green/20">
              <span className="nav-dot" aria-hidden /> {t.home.heroKicker}
            </p>
            <p className="mt-4 text-5xl tracking-tight md:text-7xl">
              <Slogan neon />
            </p>
            <h1 className="title-grad mt-4 text-2xl font-extrabold leading-tight md:text-4xl">{t.home.heroTitle}</h1>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink/80 md:mx-0 md:text-lg">{t.home.heroText}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link href="/mua-hang" className="btn btn-red btn-shine text-lg">
                {t.common.buyNow} <ArrowRightIcon width={20} height={20} />
              </Link>
              <Link href="/dai-ly" className="btn btn-gold neon-border-gold text-lg">
                {t.common.becomeDealer}
              </Link>
            </div>
          </div>

          <HeroVisual src={heroProduct.images[0]} alt={heroProduct.name} />
        </div>
        <MilkWave />
      </section>

      {/* ===== 3 ĐIỂM MẠNH ===== */}
      <section className="mx-auto -mt-2 max-w-6xl px-4" aria-label="Điểm mạnh">
        <StrengthCards />
      </section>

      {/* ===== SẢN PHẨM NỔI BẬT ===== */}
      <section className="mx-auto mt-14 max-w-6xl px-4 md:mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="title-grad text-2xl font-extrabold md:text-3xl">{t.home.featured}</h2>
          </div>
          <Link href="/san-pham" className="inline-flex min-h-11 items-center gap-1 font-semibold text-pg-blue hover:underline">
            {t.common.viewAll} <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
