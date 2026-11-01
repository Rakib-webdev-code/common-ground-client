import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, HeartHandshake, Mail, MoveUpRight } from "lucide-react";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
] as const;

const communityLinks = [
  { href: "/events/create", label: "Create an Event" },
  { href: "/events/manage", label: "Manage Events" },
  { href: "/events/joined", label: "Joined Events" },
] as const;

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

const linkClassName =
  "group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-border bg-card/40 text-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative flex size-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-heading text-sm font-bold tracking-wider text-primary">
                CG
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-background" />
              </span>

              <span className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-[0.16em]">
                  COMMON GROUND
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Small actions. Stronger communities.
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              Discover meaningful events, connect with people, and turn small
              acts of kindness into lasting community impact.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
              <HeartHandshake size={15} aria-hidden="true" />
              Rooted in care. Built by neighbors.
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer explore navigation">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em]">
              Explore
            </h2>

            <ul className="mt-6 space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community */}
          <nav aria-label="Footer community navigation">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em]">
              Get Involved
            </h2>

            <ul className="mt-6 space-y-4">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em]">
              Connect
            </h2>

            <div className="mt-6 space-y-5">
              <a
                href="https://github.com/Rakib-webdev-code"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile (opens in a new tab)"
                className={linkClassName}
              >
                <span
                  aria-hidden="true"
                  className="flex size-[17px] items-center justify-center rounded bg-foreground text-[9px] font-bold text-background"
                >
                  GH
                </span>
                <span>GitHub Profile</span>
                <MoveUpRight size={13} aria-hidden="true" />
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=tamimislam100100@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                <Mail size={17} aria-hidden="true" />
                <span>Send an Email</span>
                <MoveUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Closing Message */}
        <div className="mt-14 rounded-2xl border border-border bg-muted/30 px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-xl font-semibold leading-snug sm:text-2xl">
                Every small action matters.
              </p>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Bring your time, your skills, and your kindness. Together, we
                can build a stronger community.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore Events
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Common Ground. All rights reserved.</p>

          <p className="font-medium uppercase tracking-[0.12em]">
            Made for neighbors, by neighbors.
          </p>
        </div>
      </div>
    </footer>
  );
}
