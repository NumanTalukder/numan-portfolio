"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Wraps next-themes. attribute="class" toggles `.dark` on <html>, which our
 * design tokens (globals.css) and Tailwind darkMode:"class" both key off of.
 * next-themes injects a blocking inline script, so there is no flash of the
 * wrong theme on first paint. defaultTheme="system" respects prefers-color-scheme
 * until the user makes an explicit choice (persisted to localStorage).
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
