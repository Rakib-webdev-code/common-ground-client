"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { UserMenu } from "./user-menu";
import { getDisplayName } from "./user-avatar";

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
    <header className="sticky top-0 z-40 border-b border-brand-sage/20 bg-brand-forest text-brand-cream shadow-[0_1px_0_rgba(242,235,221,0.04)]">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMobile}
          className="group flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest"
        >
          <span
            aria-hidden="true"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-cream/25 bg-brand-cream/10 font-heading text-sm font-semibold tracking-[0.08em] text-brand-cream transition-colors group-hover:border-brand-orange/70 sm:size-11"
          >
            CG
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-brand-orange ring-2 ring-brand-forest" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-heading text-[0.95rem] leading-none font-semibold tracking-[0.14em] text-brand-cream sm:text-lg sm:tracking-[0.2em]">
              COMMON GROUND
            </span>
            <span className="mt-1.5 hidden truncate text-[0.65rem] leading-none font-medium tracking-[0.22em] text-brand-sage uppercase sm:block">
              Small actions. Stronger communities.
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-2 lg:flex"
        >
          <Link
            href="/events"
            aria-current={eventsActive ? "page" : undefined}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium text-brand-cream/75 outline-none transition-colors hover:bg-brand-cream/10 hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream",
              eventsActive && "bg-brand-cream/10 text-brand-cream",
            )}
          >
            Upcoming Events
            {eventsActive && (
              <span
                aria-hidden="true"
                className="absolute right-4 -bottom-1 left-4 h-px bg-brand-orange"
              />
            )}
          </Link>

          <span
            aria-hidden="true"
            className="mx-1 h-5 w-px bg-brand-cream/15"
          />

          {isPending ? (
            <div
              role="status"
              className="flex min-w-24 items-center gap-2 px-1"
            >
              <span className="sr-only">Loading account information</span>
              <span
                aria-hidden="true"
                className="size-9 animate-pulse rounded-full bg-brand-cream/15"
              />
              <span
                aria-hidden="true"
                className="h-2.5 w-10 animate-pulse rounded-full bg-brand-cream/15"
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
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full border border-brand-cream/20 px-4 text-sm font-medium text-brand-cream/80 outline-none transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest disabled:pointer-events-none disabled:opacity-60"
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
              className="inline-flex h-10 items-center justify-center rounded-full bg-brand-cream px-5 text-sm font-semibold text-brand-forest outline-none transition-colors hover:bg-brand-sage focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest"
            >
              Login
            </Link>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-brand-cream/20 text-brand-cream outline-none transition-colors hover:border-brand-orange hover:bg-brand-cream/10 focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest lg:hidden"
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
          user
            ? { name: displayName, email, image: user.image }
            : null
        }
        isLoggingOut={isLoggingOut}
        onLogout={handleLogout}
        onNavigate={closeMobile}
      />
    </header>
  );
}
