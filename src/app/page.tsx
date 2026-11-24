import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, BacteriaIcon, ClockIcon, TruckIcon } from "@/components/Icons";
import { ProductCard } from "@/components/product/ProductCard";
import { MilkBackground, MilkWave } from "@/components/ui/MilkBackground";
import { Reveal } from "@/components/ui/Reveal";
import { Slogan } from "@/components/ui/Slogan";
import { strengths } from "@/data/home";
import { products } from "@/data/products";
import { t } from "@/i18n";

const strengthIcon = { ferment: ClockIcon, probiotic: BacteriaIcon, delivery: TruckIcon } as const;

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
            <h1 className="mt-4 text-2xl font-extrabold leading-tight md:text-4xl">{t.home.heroTitle}</h1>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink/80 md:mx-0 md:text-lg">{t.home.heroText}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link href="/mua-hang" className="btn btn-red text-lg">
                {t.common.buyNow} <ArrowRightIcon width={20} height={20} />
              </Link>
              <Link href="/dai-ly" className="btn btn-gold neon-border-gold text-lg">
                {t.common.becomeDealer}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div aria-hidden className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(242,180,16,.35),rgba(242,180,16,0)_65%)]" />
            <div aria-hidden className="absolute inset-x-10 bottom-4 h-10 rounded-[50%] bg-pg-blue/15 blur-xl" />
            <Image
              src={heroProduct.images[0]}
              alt={heroProduct.name}
              width={900}
              height={572}
              priority
              sizes="(max-width: 768px) 92vw, 520px"
              className="relative mx-auto h-auto w-full rounded-[2rem] bg-white p-3 shadow-[0_24px_50px_-24px_rgba(30,58,120,.45)] ring-1 ring-pg-gold/30"
            />
            <span className="absolute -left-1 top-2 rotate-[-6deg] rounded-2xl bg-white/95 px-3 py-2 text-sm font-extrabold shadow-lg ring-1 ring-pg-green/20 md:left-0 md:text-base">
              <span className="neon-green">72 giờ lên men</span>
            </span>
            <span className="absolute -right-1 bottom-6 rotate-[5deg] rounded-2xl bg-white/95 px-3 py-2 text-sm font-extrabold shadow-lg ring-1 ring-pg-green/20 md:right-0 md:text-base">
              <span className="neon-green">Bổ sung lợi khuẩn</span>
            </span>
          </div>
        </div>
        <MilkWave />
      </section>

      {/* ===== 3 ĐIỂM MẠNH ===== */}
      <section className="mx-auto -mt-2 max-w-6xl px-4" aria-label="Điểm mạnh">
        <ul className="grid gap-4 sm:grid-cols-3">
          {strengths.map((s, i) => {
            const Icon = strengthIcon[s.key];
            return (
              <li key={s.key}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="flex h-full gap-4 rounded-3xl bg-cream p-5 ring-1 ring-pg-blue/5 md:flex-col md:p-6">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${s.neon ? "bg-pg-green/10 text-pg-green" : "bg-pg-blue/10 text-pg-blue"}`}>
                      <Icon width={26} height={26} />
                    </span>
                    <div>
                      <h2 className={`text-lg font-extrabold ${s.neon === "green" ? "neon-green" : ""}`}>{s.title}</h2>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink/75">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ===== SẢN PHẨM NỔI BẬT ===== */}
      <section className="mx-auto mt-14 max-w-6xl px-4 md:mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">{t.home.featured}</h2>
          </div>
          <Link href="/san-pham" className="inline-flex min-h-11 items-center gap-1 font-semibold text-pg-blue hover:underline">
            {t.common.viewAll} <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
