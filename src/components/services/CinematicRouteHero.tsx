import Image from "next/image";
import { Container } from "@/components/ui/Container";

type CinematicRouteHeroProps = {
  origin: string;
  destination: string;
  originFlag: string;
  destinationFlag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  direction?: "ltr" | "rtl";
};

export function CinematicRouteHero({
  origin,
  destination,
  originFlag,
  destinationFlag,
  title,
  description,
  image,
  imageAlt,
  direction = "ltr",
}: CinematicRouteHeroProps) {
  const isRtl = direction === "rtl";

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/40" />
      </div>

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className={isRtl ? "lg:order-2" : ""}>
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-stone-300/80">
              Route / {origin} → {destination}
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-stone-200 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-stone-200">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
                <span>{originFlag}</span>
                <span>{origin}</span>
              </span>
              <span aria-hidden="true" className="text-stone-400">
                →
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 backdrop-blur-sm">
                <span>{destinationFlag}</span>
                <span>{destination}</span>
              </span>
            </div>
          </div>

          <div className={isRtl ? "lg:order-1" : ""}>
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-sm shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
