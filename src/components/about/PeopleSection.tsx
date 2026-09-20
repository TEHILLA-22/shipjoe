import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";

export function PeopleSection() {
  return (
    <section className="border-t border-stone-200 bg-[#eeeae2] py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500">05 / The human system</p>
              <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.94] tracking-[-0.07em] text-stone-900 sm:text-7xl">People make the route legible.</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-stone-600">There are no invented faces behind this story. Ship Joe is building a clear service system around the real responsibilities involved in moving a shipment: understanding the request, preparing the information, coordinating the route and communicating the next step.</p>
          </div>
        </Reveal>

        <div className="relative mt-14 grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <ImageReveal direction="left" className="relative z-10 aspect-[4/3] overflow-hidden rounded-[28px] bg-stone-200 lg:aspect-[1.25/1]">
            <Image
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80"
              alt="Editorial photograph of a container ship carrying freight"
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-white/40 pt-3 text-[9px] font-medium uppercase tracking-[0.24em] text-white drop-shadow sm:inset-x-7 sm:bottom-7">
              <span>Editorial representation</span>
              <span>Route operations</span>
            </div>
          </ImageReveal>

          <div className="relative z-20 -mt-6 rounded-[24px] bg-stone-950 p-7 text-white shadow-[0_24px_70px_rgba(28,25,23,0.16)] sm:p-10 lg:-ml-12 lg:mt-20">
            <p className="text-xs uppercase tracking-[0.26em] text-sky-200/70">What happens behind the request</p>
            <div className="mt-8 divide-y divide-white/15">
              {[
                ["01", "Understand", "Route, cargo type, weight, dimensions and quantity."],
                ["02", "Coordinate", "The information needed to review the appropriate method."],
                ["03", "Communicate", "A clear next step for the customer and the shipment."],
              ].map(([number, title, description]) => (
                <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5 first:pt-0 last:pb-0">
                  <span className="text-xs text-stone-500">{number}</span>
                  <div><h3 className="font-medium text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-400">{description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
