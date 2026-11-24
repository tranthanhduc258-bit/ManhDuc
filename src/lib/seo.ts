import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";
import type { Product } from "@/data/products";

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | PG Food`,
      description,
      url: path,
      type: "website",
      locale: "vi_VN",
      siteName: "PG Food",
      images: [{ url: image || site.ogImage, width: image ? undefined : 1200, height: image ? undefined : 630 }],
    },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: site.companyName,
  alternateName: [site.companyNameEn, site.brand],
  url: siteUrl,
  logo: `${siteUrl}${site.logo}`,
  slogan: site.slogan,
  taxID: site.taxCode,
  email: site.email,
  telephone: "+84" + site.hotlineRaw.slice(1),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Thôn 2, Xã Hải Ninh",
    addressLocality: "Hải Ninh",
    addressRegion: "Quảng Ninh",
    addressCountry: "VN",
  },
});

export const localBusinessLd = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: `${site.brand} – ${site.companyName}`,
  image: `${siteUrl}${site.ogImage}`,
  url: siteUrl,
  telephone: "+84" + site.hotlineRaw.slice(1),
  email: site.email,
  parentOrganization: { "@id": `${siteUrl}/#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Thôn 2, Xã Hải Ninh",
    addressLocality: "Hải Ninh",
    addressRegion: "Quảng Ninh",
    addressCountry: "VN",
  },
});

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  image: p.images.map((i) => `${siteUrl}${i}`),
  description: p.description || p.highlights.join(", "),
  sku: p.slug,
  brand: { "@type": "Brand", name: "Chun Yi Tian" },
  ...(p.retailPrice > 0
    ? {
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/san-pham/${p.slug}`,
          priceCurrency: "VND",
          price: p.retailPrice,
          availability: p.status === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          seller: { "@id": `${siteUrl}/#organization` },
        },
      }
    : {}),
});
