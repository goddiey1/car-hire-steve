"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";

export function ThemeToggle({ isScrolled = true }: { isScrolled?: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="min-h-[44px] min-w-[44px] p-2.5" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className={`min-h-[44px] min-w-[44px] ${
        isScrolled
          ? "text-expedition-forest/80 hover:bg-expedition-sand-dark/50 dark:text-expedition-sand/80 dark:hover:bg-expedition-forest-light/40"
          : "text-expedition-sand hover:bg-white/10"
      }`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
