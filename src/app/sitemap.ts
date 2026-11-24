import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { policies } from "@/data/policies";
import { products } from "@/data/products";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/gioi-thieu", "/san-pham", "/dai-ly", "/kien-thuc", "/lien-he", "/chinh-sach"];
  return [
    ...staticPages.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${siteUrl}/san-pham/${p.slug}`, lastModified: now, priority: 0.9 })),
    ...articles.map((a) => ({ url: `${siteUrl}/kien-thuc/${a.slug}`, lastModified: new Date(a.date), priority: 0.6 })),
    ...policies.map((p) => ({ url: `${siteUrl}/chinh-sach/${p.slug}`, lastModified: new Date(p.updated), priority: 0.3 })),
  ];
}
