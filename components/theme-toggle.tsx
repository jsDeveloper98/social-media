"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      suppressHydrationWarning
      className="fixed top-4 right-4 z-50 rounded-full border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 shadow transition hover:bg-zinc-700 dark:border-zinc-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <span className="dark:hidden">🌙 Dark</span>
      <span className="hidden dark:inline">☀ Light</span>
    </button>
  );
}
