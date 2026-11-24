import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, PhoneIcon } from "@/components/Icons";
import { MilkBackground } from "@/components/ui/MilkBackground";
import { site } from "@/data/site";
import { t } from "@/i18n";

export const metadata: Metadata = { title: "Đã nhận yêu cầu mua hàng", robots: { index: false } };

type Props = { searchParams: Promise<{ ma?: string }> };

export default async function ThankYou({ searchParams }: Props) {
  const { ma } = await searchParams;
  const code = (ma || "").replace(/[^A-Z0-9-]/gi, "").slice(0, 20);
  return (
    <section className="relative isolate overflow-hidden py-16">
      <MilkBackground variant="page" />
      <div className="mx-auto max-w-lg px-4 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-pg-green text-white shadow-[0_0_30px_rgba(58,154,63,.45)]">
          <CheckIcon width={40} height={40} />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">{t.order.thanks}</h1>
        {code && (
          <p className="mt-4 text-lg">
            {t.order.orderCode}: <strong className="neon-red text-2xl tracking-wide">{code}</strong>
          </p>
        )}
        <p className="mt-4 leading-relaxed text-ink/80">
          Nhân viên PG Food sẽ gọi điện hoặc nhắn Zalo để xác nhận và chốt đơn với bạn trong thời gian sớm nhất.
          Vui lòng để ý cuộc gọi từ số <b>{site.hotline}</b>.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-blue">{t.common.backHome}</Link>
          <a href={`tel:${site.hotlineRaw}`} className="btn btn-ghost"><PhoneIcon width={18} height={18} /> {site.hotline}</a>
        </div>
      </div>
    </section>
  );
}
