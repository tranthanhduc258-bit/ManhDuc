import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldIcon, SparkIcon, UsersIcon } from "@/components/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Slogan } from "@/components/ui/Slogan";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Giới thiệu Phạm Group",
  description: "Về Công ty TNHH Tập đoàn Phạm Group và thương hiệu PG Food: sứ mệnh, tầm nhìn và ý nghĩa slogan Plan Growth.",
  path: "/gioi-thieu",
});

const valueIcons = [ShieldIcon, SparkIcon, UsersIcon];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="Về chúng tôi" title={<>Phạm Group & <span className="text-pg-gold-dark">PG Food</span></>} intro={about.intro} crumbs={[{ label: "Giới thiệu" }]} accent="blue" />

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pt-4 md:grid-cols-2">
        {[about.mission, about.vision].map((b, i) => (
          <Reveal key={b.title} delay={i * 0.1} className="h-full">
            <div className={`h-full rounded-3xl p-6 md:p-8 ${i === 0 ? "bg-pg-blue text-white" : "bg-cream"}`}>
              <h2 className={`text-2xl font-extrabold ${i === 0 ? "text-pg-gold" : ""}`}>{b.title}</h2>
              <p className={`mt-3 text-lg leading-relaxed ${i === 0 ? "text-white/90" : "text-ink/80"}`}>{b.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="rounded-[2rem] bg-white p-6 text-center ring-1 ring-pg-gold/30 md:p-10">
          <p className="text-4xl md:text-6xl"><Slogan neon /></p>
          <div className="mt-8 grid gap-5 text-left md:grid-cols-2">
            <div className="rounded-3xl bg-pg-red/5 p-5">
              <p className="text-2xl font-extrabold text-pg-green"><span className="text-3xl text-pg-red">P</span>{about.slogan.p.word.slice(1)}</p>
              <p className="mt-2 text-ink/80">{about.slogan.p.text}</p>
            </div>
            <div className="rounded-3xl bg-pg-blue/5 p-5">
              <p className="text-2xl font-extrabold text-pg-green"><span className="text-3xl text-pg-logo-blue">G</span>{about.slogan.g.word.slice(1)}</p>
              <p className="mt-2 text-ink/80">{about.slogan.g.text}</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl italic text-ink/75">{about.slogan.summary}</p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <h2 className="title-grad text-2xl font-extrabold md:text-3xl">Giá trị cốt lõi</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {about.values.map((v, i) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <li key={v.title} className="rounded-3xl bg-cream p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-pg-gold/20 text-pg-blue"><Icon width={22} height={22} /></span>
                <h3 className="mt-3 text-lg font-extrabold">{v.title}</h3>
                <p className="mt-1 text-[15px] text-ink/75">{v.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl items-start gap-8 px-4 md:grid-cols-2">
        <div>
          <h2 className="title-grad text-2xl font-extrabold md:text-3xl">Thông tin doanh nghiệp</h2>
          <dl className="mt-5 space-y-3 text-[15px]">
            {[
              ["Tên công ty", site.companyName],
              ["Tên tiếng Anh", site.companyNameEn],
              ["Mã số doanh nghiệp", site.taxCode],
              ["Người đại diện", site.representative],
              ["Địa chỉ", site.address],
              ["Hotline / Zalo", site.hotline],
              ["Email", site.email],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-3 border-b border-pg-blue/10 pb-3">
                <dt className="text-ink/75">{k}</dt><dd className="break-words font-semibold text-pg-blue">{v}</dd>
              </div>
            ))}
          </dl>
          <Link href="/lien-he" className="btn btn-blue btn-shine mt-6">Liên hệ với chúng tôi</Link>
        </div>
        <figure>
          {site.businessLicenseImage ? (
            <Image src={site.businessLicenseImage} alt="Giấy chứng nhận đăng ký doanh nghiệp" width={800} height={1100} className="h-auto w-full rounded-3xl ring-1 ring-pg-blue/10" />
          ) : (
            <div className="grid aspect-[3/4] place-items-center rounded-3xl border-2 border-dashed border-pg-blue/20 bg-cream p-6 text-center text-ink/70">
              <div>
                <ShieldIcon width={40} height={40} className="mx-auto text-pg-blue/40" />
                <p className="mt-3 font-semibold text-pg-blue/70">Ảnh Giấy chứng nhận đăng ký doanh nghiệp</p>
                <p className="mt-1 text-sm">Đang cập nhật</p>
              </div>
            </div>
          )}
          <figcaption className="mt-2 text-center text-sm text-ink/70">Giấy chứng nhận ĐKDN – MSDN {site.taxCode}</figcaption>
        </figure>
      </section>
    </>
  );
}
