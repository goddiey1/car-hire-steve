"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, Drawer, useOverlayState } from "@heroui/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/lib/site";
import AppButton from "@/components/ui/Button";

const navLinks = [
  { href: "#fleet", label: "Vehicles" },
  { href: "#transfers", label: "Airport" },
  { href: "#trip-steps", label: "How it works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const solid = !isHome || isScrolled;
  const menuState = useOverlayState();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 z-50 w-full transition-all duration-300 safe-top ${
        solid
          ? "border-b border-expedition-sand-dark/80 bg-expedition-sand/95 py-2.5 backdrop-blur-sm dark:border-expedition-forest-light/50 dark:bg-expedition-forest/95 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="min-w-0 max-w-[58%] sm:max-w-none"
            aria-label={`${siteConfig.name} home`}
          >
            <span
              className={`block truncate text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                solid
                  ? "text-expedition-forest dark:text-expedition-sand"
                  : "text-expedition-sand"
              }`}
            >
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                className={`text-sm font-medium transition-colors ${
                  solid
                    ? "text-expedition-forest/80 hover:text-expedition-forest dark:text-expedition-sand/80 dark:hover:text-expedition-sand"
                    : "text-expedition-sand/90 hover:text-expedition-sand"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle isScrolled={solid} />
            <AppButton
              href={isHome ? "#fleet" : "/#fleet"}
              variant={solid ? "primary" : "inverse"}
              size="md"
              className={
                solid
                  ? ""
                  : "border-0 bg-expedition-sand text-expedition-forest hover:bg-white hover:text-expedition-forest"
              }
            >
              View fleet
            </AppButton>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle isScrolled={solid} />
            <Button
              isIconOnly
              variant="ghost"
              aria-label="Open menu"
              onPress={menuState.open}
              className={`min-h-[44px] min-w-[44px] ${
                solid
                  ? "text-expedition-forest dark:text-expedition-sand"
                  : "text-expedition-sand"
              }`}
            >
              <Menu className="h-6 w-6" />
            </Button>
            {menuState.isOpen ? (
              <Drawer>
                <Drawer.Backdrop
                  isOpen={menuState.isOpen}
                  onOpenChange={menuState.setOpen}
                >
                  <Drawer.Content placement="top" className="mt-[env(safe-area-inset-top)] max-h-[calc(100svh-4rem)]">
                    <Drawer.Dialog className="rounded-none border-b border-expedition-sand-dark bg-expedition-sand dark:border-expedition-forest-light dark:bg-expedition-forest">
                      <Drawer.Header className="flex items-center justify-between border-b border-expedition-sand-dark/70 px-4 py-3 dark:border-expedition-forest-light/50">
                        <Drawer.Heading className="text-base font-semibold">Menu</Drawer.Heading>
                        <Drawer.CloseTrigger />
                      </Drawer.Header>
                      <Drawer.Body className="p-0">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={isHome ? link.href : `/${link.href}`}
                            onClick={() => menuState.close()}
                            className="flex min-h-[48px] items-center border-b border-expedition-sand-dark/70 px-4 py-3.5 text-base font-medium text-expedition-forest dark:border-expedition-forest-light/50 dark:text-expedition-sand"
                          >
                            {link.label}
                          </Link>
                        ))}
                        <div className="p-3">
                          <AppButton
                            href={isHome ? "#fleet" : "/#fleet"}
                            onClick={() => menuState.close()}
                            className="w-full"
                            fullWidth
                          >
                            View fleet
                          </AppButton>
                        </div>
                      </Drawer.Body>
                    </Drawer.Dialog>
                  </Drawer.Content>
                </Drawer.Backdrop>
              </Drawer>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
