"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  CalendarCog,
  CalendarPlus,
  Loader2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";

type MobileUser = {
  name: string;
  email: string;
  image?: string | null;
};

type MobileNavProps = {
  open: boolean;
  isLoading: boolean;
  user: MobileUser | null;
  isLoggingOut: boolean;
  onLogout: () => void;
  onNavigate: () => void;
};

const accountLinks = [
  { href: "/events/create", label: "Create Event", icon: CalendarPlus },
  { href: "/events/manage", label: "Manage Events", icon: CalendarCog },
  { href: "/events/joined", label: "Joined Events", icon: CalendarCheck },
] as const;

type AccountLinkProps = {
  href: string;
  label: string;
  icon: typeof CalendarPlus;
  active: boolean;
  onNavigate: () => void;
};

function AccountLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: AccountLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-brand-cream/75 outline-none transition-colors hover:bg-brand-cream/10 hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream",
        active && "bg-brand-cream/10 text-brand-cream",
      )}
    >
      <Icon aria-hidden="true" className="size-4 text-brand-sage" />
      {label}
    </Link>
  );
}

export function MobileNav({
  open,
  isLoading,
  user,
  isLoggingOut,
  onLogout,
  onNavigate,
}: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div
      id="mobile-navigation"
      className="border-t border-brand-cream/10 bg-brand-forest lg:hidden"
    >
      <nav
        aria-label="Mobile navigation"
        className="mx-auto max-w-7xl space-y-4 px-4 py-5 sm:px-6"
      >
        <p className="px-3 text-[0.65rem] font-medium tracking-[0.18em] text-brand-sage uppercase sm:hidden">
          Small actions. Stronger communities.
        </p>

        <Link
          href="/events"
          onClick={onNavigate}
          aria-current={pathname === "/events" ? "page" : undefined}
          className={cn(
            "flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-brand-cream/75 outline-none transition-colors hover:bg-brand-cream/10 hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream",
            pathname === "/events" && "bg-brand-cream/10 text-brand-cream",
          )}
        >
          Upcoming Events
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-brand-orange"
          />
        </Link>

        <div className="h-px bg-brand-cream/10" />

        {isLoading ? (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-3 rounded-2xl border border-brand-cream/10 bg-brand-cream/5 p-3"
          >
            <span className="sr-only">Loading account information</span>
            <span
              aria-hidden="true"
              className="size-10 animate-pulse rounded-full bg-brand-cream/15"
            />
            <span className="space-y-2" aria-hidden="true">
              <span className="block h-2.5 w-28 animate-pulse rounded-full bg-brand-cream/15" />
              <span className="block h-2 w-36 animate-pulse rounded-full bg-brand-cream/10" />
            </span>
          </div>
        ) : user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-brand-cream/10 bg-brand-cream/5 p-3">
              <UserAvatar
                name={user.name}
                image={user.image}
                className="size-10 bg-brand-sage/25"
              />
              <div className="min-w-0">
                <p className="truncate font-heading text-base font-semibold text-brand-cream">
                  {user.name}
                </p>
                <p className="truncate text-xs text-brand-cream/60">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-0.5">
              {accountLinks.map((link) => (
                <AccountLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  active={pathname === link.href}
                  onNavigate={onNavigate}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-brand-cream/20 px-5 py-3 text-sm font-semibold text-brand-cream/80 outline-none transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream disabled:pointer-events-none disabled:opacity-60"
            >
              {isLoggingOut ? (
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <LogOut aria-hidden="true" className="size-4" />
              )}
              {isLoggingOut ? "Signing out..." : "Log out"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <Link
              href="/login"
              onClick={onNavigate}
              className="flex w-full items-center justify-center rounded-full bg-brand-cream px-5 py-3 text-sm font-semibold text-brand-forest outline-none transition-colors hover:bg-brand-sage focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest"
            >
              Login
            </Link>
            <p className="text-center text-xs text-brand-cream/60">
              New to Common Ground?{" "}
              <Link
                href="/register"
                onClick={onNavigate}
                className="font-semibold text-brand-sage underline-offset-4 outline-none hover:text-brand-cream hover:underline focus-visible:ring-2 focus-visible:ring-brand-cream"
              >
                Create an account
              </Link>
            </p>
          </div>
        )}
      </nav>
    </div>
  );
}
