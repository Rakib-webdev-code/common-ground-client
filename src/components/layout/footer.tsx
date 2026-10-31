import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, HeartHandshake } from "lucide-react";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
] as const;

const joinLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Create an account" },
] as const;

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

const linkClassName =
  "group inline-flex items-center gap-1.5 text-sm text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_0.75fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden="true"
                className="relative flex size-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-heading text-sm font-semibold tracking-[0.08em] text-primary"
              >
                CG
                <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-background" />
              </span>

              <span className="flex flex-col">
                <span className="font-heading text-lg font-semibold leading-none tracking-[0.2em] text-foreground">
                  COMMON GROUND
                </span>
                <span className="mt-1.5 text-[0.65rem] font-medium leading-none tracking-[0.22em] text-muted-foreground uppercase">
                  Small actions. Stronger communities.
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
              A neighborhood-first space for discovering, creating, and joining
              social service events. Common Ground makes it easier to turn care
              into action, one gathering at a time.
            </p>

            <p className="mt-6 flex items-center gap-2 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
              <HeartHandshake
                aria-hidden="true"
                className="size-4 text-primary"
              />
              Rooted in care. Built by neighbors.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-foreground uppercase">
              Explore
            </h2>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Account navigation">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-foreground uppercase">
              Join in
            </h2>

            <ul className="mt-5 space-y-3">
              {joinLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-y border-border py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <p className="max-w-xl font-heading text-2xl leading-snug text-foreground italic sm:text-3xl">
            Every small action plants something larger.
          </p>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Bring your time, your skills, and your care. Together, we make the
            place we live feel more like home.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Common Ground. All rights reserved.</p>

          <p className="tracking-[0.08em] uppercase">
            Made for neighbors, by neighbors.
          </p>
        </div>
      </div>
    </footer>
  );
}