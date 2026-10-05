import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type FieldProps = {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
} & (
  | ({ as?: "input" } & ComponentPropsWithoutRef<"input">)
  | ({ as: "select" } & ComponentPropsWithoutRef<"select">)
);

export default function Field({
  id,
  label,
  icon,
  as = "input",
  className = "",
  children,
  ...props
}: FieldProps) {
  const controlClasses =
    `w-full rounded-md border border-expedition-sand-dark bg-expedition-sand/40 py-3 text-expedition-forest ${
      icon ? "pl-10" : "pl-3"
    } pr-3 text-base outline-none transition-colors placeholder:text-expedition-forest/40 focus:border-expedition-accent focus:ring-1 focus:ring-expedition-accent dark:border-expedition-forest-light dark:bg-expedition-forest/40 dark:text-expedition-sand dark:placeholder:text-expedition-sand/40 dark:focus:border-expedition-accent dark:focus:ring-expedition-accent sm:py-2.5 sm:text-sm ${className}`.trim();

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-medium uppercase tracking-[0.12em] text-expedition-forest/60 dark:text-expedition-sand/60"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-expedition-forest/45 dark:text-expedition-sand/45"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {as === "select" ? (
          <select
            id={id}
            className={`${controlClasses} appearance-none`}
            {...(props as ComponentPropsWithoutRef<"select">)}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            className={controlClasses}
            {...(props as ComponentPropsWithoutRef<"input">)}
          />
        )}
      </div>
    </div>
  );
}
