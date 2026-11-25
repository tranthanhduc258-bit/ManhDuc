import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { JsonLd } from "@/components/ui/JsonLd";
import { site, siteUrl } from "@/data/site";
import { organizationLd, localBusinessLd } from "@/lib/seo";

const font = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PG Food – Sữa chua uống lợi khuẩn Chun Yi Tian | Phạm Group",
    template: "%s | PG Food",
  },
  description:
    "PG Food – thương hiệu của Công ty TNHH Tập đoàn Phạm Group. Sữa chua uống lợi khuẩn Chun Yi Tian lên men 72 giờ, giao hàng tận nơi, tuyển đại lý & nhà phân phối toàn quốc.",
  applicationName: "PG Food",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "PG Food",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "PG Food – Plan Growth" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1E3A78",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={font.variable} data-scroll-behavior="smooth">
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
          Bỏ qua menu
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingContact />
        </Providers>
        <JsonLd data={[organizationLd(), localBusinessLd()]} />
      </body>
    </html>
  );
}
