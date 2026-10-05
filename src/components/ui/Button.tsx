import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse" | "whatsapp";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-expedition-accent text-white hover:bg-expedition-accent-hover dark:bg-expedition-accent dark:hover:bg-expedition-accent-hover",
  secondary:
    "border border-expedition-sand-dark bg-transparent text-expedition-forest hover:border-expedition-accent dark:border-expedition-forest-light dark:text-expedition-sand dark:hover:border-expedition-accent",
  inverse:
    "border border-expedition-sand/40 bg-transparent text-expedition-sand hover:bg-expedition-sand hover:text-expedition-forest",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebd5b] shadow-sm",
};

const baseClasses =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-expedition-accent focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    const isHashOrExternal =
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isHashOrExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type, ...rest } = props as ButtonAsButton;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
