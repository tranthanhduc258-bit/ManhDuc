export const formatVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(n)) + "₫";

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
