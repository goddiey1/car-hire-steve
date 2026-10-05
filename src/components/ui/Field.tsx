"use client";

import { Input, InputGroup, Label, cn } from "@heroui/react";
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
  const labelClass =
    "mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-expedition-forest/60 dark:text-expedition-sand/60";

  if (as === "select") {
    const selectProps = props as ComponentPropsWithoutRef<"select">;
    return (
      <div className="space-y-0">
        <Label htmlFor={id} className={labelClass}>
          {label}
        </Label>
        <div className="relative">
          {icon && (
            <span
              className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-expedition-forest/45 dark:text-expedition-sand/45"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <select
            id={id}
            className={cn(
              "w-full appearance-none rounded-md border border-expedition-sand-dark bg-white py-3 pr-3 text-base text-expedition-forest outline-none transition-colors focus:border-expedition-accent focus:ring-1 focus:ring-expedition-accent dark:border-expedition-forest-light dark:bg-expedition-forest/40 dark:text-expedition-sand sm:py-2.5 sm:text-sm",
              icon ? "pl-10" : "pl-3",
              className,
            )}
            {...selectProps}
          >
            {children}
          </select>
        </div>
      </div>
    );
  }

  const inputProps = props as ComponentPropsWithoutRef<"input">;

  if (icon) {
    return (
      <div className="space-y-0">
        <Label htmlFor={id} className={labelClass}>
          {label}
        </Label>
        <InputGroup fullWidth className={cn("min-h-[48px] min-w-0 max-w-full", className)}>
          <InputGroup.Prefix className="text-expedition-forest/45 dark:text-expedition-sand/45">
            {icon}
          </InputGroup.Prefix>
          <InputGroup.Input id={id} className="min-w-0" {...inputProps} />
        </InputGroup>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <Label htmlFor={id} className={labelClass}>
        {label}
      </Label>
      <Input
        id={id}
        fullWidth
        className={cn("min-h-[48px]", className)}
        {...inputProps}
      />
    </div>
  );
}
