import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailIcon, PhoneIcon, PinIcon, ZaloIcon } from "@/components/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Liên hệ",
  description: `Liên hệ PG Food – ${site.companyName}. Hotline/Zalo ${site.hotline}. Địa chỉ: ${site.address}.`,
  path: "/lien-he",
});

export default function ContactPage() {
  const info = [
    { Icon: PhoneIcon, label: "Hotline / Zalo", value: site.hotline, href: `tel:${site.hotlineRaw}` },
    { Icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { Icon: PinIcon, label: "Địa chỉ", value: site.address },
  ];
  return (
    <>
      <PageHero kicker="Liên hệ" title="Chúng tôi luôn sẵn sàng hỗ trợ" intro="Đặt hàng, hợp tác đại lý hay góp ý – hãy gọi, nhắn Zalo hoặc để lại lời nhắn." crumbs={[{ label: "Liên hệ" }]} accent="blue" />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <div className="rounded-3xl bg-pg-blue p-6 text-white">
            <p className="font-extrabold uppercase text-pg-gold">{site.companyName}</p>
            <p className="text-sm text-white/70">MSDN: {site.taxCode}</p>
            <ul className="mt-5 space-y-4">
              {info.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-pg-gold"><Icon width={20} height={20} /></span>
                  <div className="min-w-0">
                    <p className="text-sm text-white/60">{label}</p>
                    {href ? <a href={href} className="break-words font-semibold hover:text-pg-gold">{value}</a> : <p className="font-semibold">{value}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={`tel:${site.hotlineRaw}`} className="btn neon-box-blue bg-white text-pg-blue"><PhoneIcon width={20} height={20} /> Gọi ngay</a>
              <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn neon-box-blue bg-[#0068ff] text-white"><ZaloIcon width={34} height={34} /> Chat Zalo</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-pg-blue/10">
            <iframe
              title="Bản đồ PG Food – Hải Ninh, Quảng Ninh"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-extrabold">Gửi lời nhắn</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
