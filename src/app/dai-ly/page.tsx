import type { Metadata } from "next";
import { DealerForm } from "@/components/forms/DealerForm";
import { iconByName, PhoneIcon } from "@/components/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { dealerBenefits, dealerSteps, dealerTiers } from "@/data/dealer";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Đại lý & Nhà phân phối",
  description: "Tuyển đại lý, nhà phân phối sữa chua uống lợi khuẩn Chun Yi Tian toàn quốc. Chính sách chiết khấu riêng, hỗ trợ giao hàng và bán hàng. Đăng ký ngay.",
  path: "/dai-ly",
});

export default function DealerPage() {
  return (
    <>
      <PageHero
        kicker="Hợp tác cùng PG Food"
        title={<>Trở thành <span className="text-pg-gold-dark">Đại lý & Nhà phân phối</span></>}
        intro="Cùng PG Food mang sữa chua uống lợi khuẩn đến mọi gia đình. Chính sách rõ ràng, hỗ trợ tận tình, đồng hành lâu dài."
        crumbs={[{ label: "Đại lý & NPP" }]}
        accent="gold"
      />

      <section className="mx-auto max-w-6xl px-4 pt-4">
        <h2 className="title-grad text-2xl font-extrabold md:text-3xl">Quyền lợi đại lý</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dealerBenefits.map((b, i) => {
            const Icon = iconByName[b.icon as keyof typeof iconByName];
            return (
              <li key={b.title}>
                <Reveal delay={i * 0.1} className="h-full">
                  <div className="flex h-full gap-4 rounded-3xl bg-cream p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pg-blue text-pg-gold"><Icon width={24} height={24} /></span>
                    <div><h3 className="font-extrabold">{b.title}</h3><p className="mt-1 text-[15px] text-ink/75">{b.text}</p></div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 rounded-2xl border-l-4 border-pg-gold bg-pg-gold/10 px-5 py-4 font-semibold text-pg-blue">
          Giá sỉ và chiết khấu theo chính sách riêng – liên hệ để nhận báo giá.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="title-grad text-2xl font-extrabold md:text-3xl">Các cấp đại lý</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dealerTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1} className="h-full">
              <div className={`h-full rounded-3xl p-5 ${i === 3 ? "bg-pg-blue text-white" : "bg-white ring-1 ring-pg-blue/10"}`}>
                <span className={`text-sm font-bold ${i === 3 ? "text-pg-gold" : "text-pg-gold-dark"}`}>Cấp {i + 1}</span>
                <h3 className={`mt-1 text-xl font-extrabold ${i === 3 ? "text-white" : ""}`}>{tier.name}</h3>
                <p className={`mt-2 text-sm ${i === 3 ? "text-white/80" : "text-ink/70"}`}>{tier.for}</p>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {tier.perks.map((p) => <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pg-gold" />{p}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="title-grad text-2xl font-extrabold md:text-3xl">Quy trình hợp tác 4 bước</h2>
        <ol className="relative mt-6 grid gap-4 md:grid-cols-4">
          <span aria-hidden className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-gradient-to-r from-pg-gold via-pg-blue/30 to-pg-gold md:block" />
          {dealerSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 md:flex-col">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-pg-blue text-lg font-extrabold text-pg-gold ring-4 ring-milk">{i + 1}</span>
              <div><h3 className="font-extrabold">{s.title}</h3><p className="mt-1 text-[15px] text-ink/75">{s.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section id="dang-ky" className="mx-auto mt-14 grid max-w-6xl scroll-mt-24 gap-8 px-4 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="title-grad text-2xl font-extrabold md:text-3xl">Đăng ký làm đại lý / NPP</h2>
          <p className="mt-3 leading-relaxed text-ink/80">Điền thông tin, PG Food sẽ liên hệ tư vấn và gửi báo giá phù hợp với khu vực của bạn. Hoặc gọi ngay:</p>
          <a href={`tel:${site.hotlineRaw}`} className="btn btn-blue btn-shine neon-box-blue mt-5 text-lg"><PhoneIcon width={20} height={20} /> {site.hotline}</a>
        </div>
        <DealerForm />
      </section>
    </>
  );
}
