import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  metadataBase: new URL("https://common-ground-client.vercel.app"),

  title: {
    default: "Common Ground | Community Events Platform",
    template: "%s",
  },

  description:
    "Discover local community events, connect with people, volunteer, and make a positive impact. Small actions. Stronger communities.",

  openGraph: {
    title: "Common Ground | Community Events Platform",
    description:
      "Small actions. Stronger communities. Discover, create, and join meaningful community events with Common Ground.",
    siteName: "Common Ground",
    url: "https://common-ground-client.vercel.app",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Common Ground | Community Events Platform",
    description:
      "Discover local community events and make a positive impact with Common Ground.",
  },
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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
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