
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";
import { getDisplayName } from "./user-avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const user = session?.user;
  const displayName = user ? getDisplayName(user.name, user.email) : "";
  const email = user?.email ?? "";

  const eventsActive = pathname === "/events";
  const dashboardActive = pathname === "/dashboard";

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to log out. Please try again.");
        return;
      }

      setMobileOpen(false);
      toast.success("You have been logged out.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card text-card-foreground shadow-sm">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMobile}
          className="group flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <span
            aria-hidden="true"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-heading text-sm font-semibold tracking-[0.08em] text-primary transition-colors group-hover:border-primary sm:size-11"
          >
            CG
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-card" />
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="truncate font-heading text-[0.95rem] font-semibold leading-none tracking-[0.14em] text-foreground sm:text-lg sm:tracking-[0.2em]">
              COMMON GROUND
            </span>
            <span className="mt-1.5 hidden truncate text-[0.65rem] font-medium leading-none tracking-[0.22em] text-muted-foreground uppercase sm:block">
              Small actions. Stronger communities.
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-2 lg:flex"
        >
          <Link
            href="/events"
            aria-current={eventsActive ? "page" : undefined}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
              eventsActive && "bg-accent text-accent-foreground",
            )}
          >
            Upcoming Events

            {eventsActive && (
              <span
                aria-hidden="true"
                className="absolute right-4 -bottom-1 left-4 h-0.5 rounded-full bg-primary"
              />
            )}
          </Link>

          {!isPending && user && (
            <Link
              href="/dashboard"
              aria-current={dashboardActive ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring",
                dashboardActive && "bg-accent text-accent-foreground",
              )}
            >
              <LayoutDashboard aria-hidden="true" className="size-4" />
              Dashboard
            </Link>
          )}

          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />

          <ThemeToggle />

          {isPending ? (
            <div
              role="status"
              className="flex min-w-24 items-center gap-2 px-1"
            >
              <span className="sr-only">Loading account information</span>
              <span
                aria-hidden="true"
                className="size-9 animate-pulse rounded-full bg-muted"
              />
              <span
                aria-hidden="true"
                className="h-2.5 w-10 animate-pulse rounded-full bg-muted"
              />
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <UserMenu
                name={displayName}
                email={email}
                image={user.image}
              />

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-muted-foreground outline-none transition-colors hover:border-destructive hover:bg-destructive hover:text-white focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <LogOut aria-hidden="true" className="size-4" />
                )}

                {isLoggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground outline-none transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Theme Toggle */}
        <div className="ml-auto lg:hidden">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground outline-none transition-colors hover:border-primary hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      <MobileNav
        open={mobileOpen}
        isLoading={isPending}
        user={
          user ? { name: displayName, email, image: user.image } : null
        }
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
        onNavigate={closeMobile}
      />
    </header>
  );
}
