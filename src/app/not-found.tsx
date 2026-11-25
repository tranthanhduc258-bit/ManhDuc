import Link from "next/link";
import { MilkBackground } from "@/components/ui/MilkBackground";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden py-24 text-center">
      <MilkBackground variant="page" />
      <p className="text-7xl font-extrabold text-pg-gold-dark">404</p>
      <h1 className="title-grad mt-3 text-2xl font-extrabold">Không tìm thấy trang</h1>
      <p className="mt-2 text-ink/70">Trang bạn tìm có thể đã được đổi tên hoặc không tồn tại.</p>
      <Link href="/" className="btn btn-blue btn-shine mt-6">Về trang chủ</Link>
    </section>
  );
}
