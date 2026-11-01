import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",
    alt: "Volunteers working together during a community activity",
    title: "Working Together",
    category: "Community",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    alt: "People joining hands to support a community initiative",
    title: "Stronger Together",
    category: "Volunteering",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    alt: "Volunteers helping people in need",
    title: "Making a Difference",
    category: "Social Impact",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    alt: "Friends and community members spending time together",
    title: "Building Connections",
    category: "Togetherness",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    alt: "Community members participating in a volunteer activity",
    title: "Small Acts, Big Impact",
    category: "Giving Back",
    className: "",
  },
];

export default function GallerySection() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Moments That Matter
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Community in Action
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Every gathering tells a story. Explore moments of kindness,
            connection, and positive change made possible by people like you.
          </p>
        </div>

        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 md:auto-rows-[240px] md:grid-cols-3">
          {galleryImages.map((image) => (
            <article
              key={image.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/75">
                  {image.category}
                </span>

                <h3 className="mt-1 font-heading text-lg font-semibold text-white">
                  {image.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}