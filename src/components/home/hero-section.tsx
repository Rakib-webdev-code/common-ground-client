
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        {/* Hero Content */}
        <div className="space-y-7">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Together, We Make a Difference
          </span>

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Small Actions.
            <span className="block text-primary">
              Stronger Communities.
            </span>
          </h1>

          <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Discover local events, connect with like-minded people,
            and make a positive impact in your community.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Explore Events →
            </Link>

            <Link
              href="/events/create"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Create an Event
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Every small action can create a meaningful change.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="relative">
          <div className="absolute -inset-2 rounded-3xl bg-primary/2 blur-xl dark:bg-primary/3" />

          <div className="relative rounded-3xl border border-border bg-card p-6 dark:bg-[#10151D]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Make an impact
                </p>
                <h2 className="mt-1 text-xl font-semibold text-foreground">
                  Be part of something good.
                </h2>
              </div>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Community
              </span>
            </div>

            {/* Community Image */}
           

{/* Community Image */}

{/* Community Image */}

{/* Community Helping Event Image */}
<div className="relative mt-6 aspect-4/3 w-full overflow-hidden rounded-2xl">
  <Image
    src="https://images.pexels.com/photos/6646923/pexels-photo-6646923.jpeg"
    alt="Volunteers distributing food and drinks to people at a community charity event"
    fill
    priority
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="object-cover object-center"
  />
</div>


            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-sm text-muted-foreground">
                  Discover
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  Local Events
                </p>
              </div>

              <div className="rounded-xl bg-muted/60 p-4">
                <p className="text-sm text-muted-foreground">
                  Get involved
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  Join Together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
