import { CalendarDays, Users, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore upcoming community events and find meaningful activities happening around you.",
  },
  {
    icon: Users,
    title: "Join Community",
    description:
      "Connect with like-minded people, participate in events, and build stronger relationships.",
  },
  {
    icon: HeartHandshake,
    title: "Create Impact",
    description:
      "Organize your own events and inspire others to make a positive difference together.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            What We Offer
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything Starts With <span className="text-primary">Community</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Find opportunities to connect, participate, and make a lasting
            difference in the community around you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} aria-hidden="true" />
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}