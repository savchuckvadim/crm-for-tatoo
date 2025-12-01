'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AprilThemeProvider } from '@workspace/theme';
import type { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AprilThemeProvider>{children}</AprilThemeProvider>
    </NextThemesProvider>
  );
}

