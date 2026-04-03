import Link from "next/link";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-white text-emerald-900 shadow-[0_14px_40px_rgba(15,23,42,0.18)] hover:bg-emerald-50",
  secondary:
    "border border-white/60 bg-white/10 text-white hover:bg-white hover:text-emerald-900",
  ghost:
    "border border-slate-200 bg-white text-slate-900 hover:border-emerald-500 hover:text-emerald-700",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      prefetch={external ? false : undefined}
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
