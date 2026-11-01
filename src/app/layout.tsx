
import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Common Ground | Community Events Platform",
  description:
    "Create, join and track social service events in your neighborhood.",
};

function NavbarFallback() {
  return (
    <div
      aria-hidden="true"
      className="sticky top-0 z-40 min-h-20 border-b border-border bg-card"
    >
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-muted" />
        <div className="hidden h-10 w-64 animate-pulse rounded-full bg-muted lg:block" />
      </div>
    </div>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
          >
            Skip to content
          </a>

          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>

          <main
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 flex-col"
          >
            {children}
          </main>

          <Footer />

          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
