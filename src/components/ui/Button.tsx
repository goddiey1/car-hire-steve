"use client";

import Link from "next/link";
import {
  Button as HeroButton,
  buttonVariants,
  cn,
  type ButtonRootProps,
} from "@heroui/react";
import { type MouseEventHandler, type ReactNode } from "react";

type AppVariant = "primary" | "secondary" | "inverse" | "whatsapp" | "outline" | "ghost";
type HeroVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft"
  | "tertiary";

type CommonProps = {
  children: ReactNode;
  variant?: AppVariant;
  className?: string;
  fullWidth?: boolean;
  isDisabled?: boolean;
  disabled?: boolean;
  isIconOnly?: boolean;
  size?: ButtonRootProps["size"];
  "aria-label"?: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onPress?: ButtonRootProps["onPress"];
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function mapVariant(variant: AppVariant): {
  heroVariant: HeroVariant;
  extraClass?: string;
} {
  switch (variant) {
    case "whatsapp":
      return { heroVariant: "primary", extraClass: "button--whatsapp" };
    case "inverse":
      return {
        heroVariant: "outline",
        extraClass:
          "border-expedition-sand/40 bg-transparent text-expedition-sand hover:bg-expedition-sand hover:text-expedition-forest",
      };
    case "secondary":
      return { heroVariant: "secondary" };
    case "outline":
      return { heroVariant: "outline" };
    case "ghost":
      return { heroVariant: "ghost" };
    case "primary":
    default:
      return { heroVariant: "primary" };
  }
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  fullWidth,
  size = "lg",
  isDisabled,
  disabled,
  isIconOnly,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const { heroVariant, extraClass } = mapVariant(variant);
  const classes = cn(
    isIconOnly ? "min-h-11 min-w-11" : "min-h-[48px] font-semibold",
    buttonVariants({ variant: heroVariant, size, fullWidth, isIconOnly }),
    extraClass,
    className,
  );

  if ("href" in props && props.href) {
    const { href, onClick, target, rel } = props;
    const isHashOrExternal =
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isHashOrExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const { type, onClick, onPress } = props as ButtonAsButton;

  return (
    <HeroButton
      type={type ?? "button"}
      variant={heroVariant}
      size={size}
      fullWidth={fullWidth}
      isIconOnly={isIconOnly}
      isDisabled={isDisabled ?? disabled}
      aria-label={ariaLabel}
      className={cn(
        isIconOnly ? "min-h-11 min-w-11" : "min-h-[48px] font-semibold",
        extraClass,
        className,
      )}
      onPress={(e) => {
        onPress?.(e);
        onClick?.(e as unknown as Parameters<NonNullable<ButtonAsButton["onClick"]>>[0]);
      }}
    >
      {children}
    </HeroButton>
  );
}
