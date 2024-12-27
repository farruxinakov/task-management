"use client";

import { PropsWithChildren } from "react";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { ReactQueryProvider } from "@/app/providers/react-query-provider";
import { ToastProvider } from "@/app/providers/toast-provider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}
