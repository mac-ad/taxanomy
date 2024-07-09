"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { type ThemeProviderProps } from "next-themes/dist/types";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <div>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </div>
  );
};

export default ThemeProvider;
