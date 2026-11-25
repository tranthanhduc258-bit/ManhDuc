/**
 * Slogan "Plan Growth" theo màu logo "PG FOOD": P đỏ, G xanh dương, các chữ còn lại xanh lá.
 * Bản neon: quầng sáng theo màu từng chữ + vệt sáng trắng chạy ngang mỗi 5 giây.
 */
export function Slogan({ neon = false, className = "" }: { neon?: boolean; className?: string }) {
  if (neon)
    return (
      <span className={`neon-slogan font-extrabold ${className}`}>
        <span className="sr-only">Plan Growth</span>
        <span aria-hidden className="sl sl-p" style={{ ["--d" as string]: "0s" }}>P</span>
        <span aria-hidden className="sl sl-rest" style={{ ["--d" as string]: "0.12s" }}>lan</span>{" "}
        <span aria-hidden className="sl sl-g" style={{ ["--d" as string]: "0.34s" }}>G</span>
        <span aria-hidden className="sl sl-rest" style={{ ["--d" as string]: "0.46s" }}>rowth</span>
      </span>
    );
  return (
    <span className={`font-bold text-pg-green ${className}`}>
      <span className="text-pg-red">P</span>lan <span className="text-pg-logo-blue">G</span>rowth
    </span>
  );
}
