/** Danh mục sản phẩm. Thêm danh mục mới: thêm 1 dòng, rồi dùng `slug` ở products.ts */
export const categories = [
  { slug: "sua-chua-uong", name: "Sữa chua uống lợi khuẩn" },
  // { slug: "sua-chua-an", name: "Sữa chua ăn" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
