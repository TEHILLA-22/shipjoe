import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { aboutOrigin } from "@/data/about";

export function OriginSection() {
  return (
    <section className="relative overflow-hidden bg-[#e9e5de] py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.28fr_0.72fr] lg:gap-16">
          <Reveal className="flex items-start gap-4 lg:block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-stone-500">01 / Origin</span>
            <span className="mt-1 h-px w-16 bg-stone-400 lg:mt-8 lg:block" />
            <p className="mt-0 max-w-[170px] text-xs uppercase leading-5 tracking-[0.18em] text-stone-500 lg:mt-8">The reason the route matters</p>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-stone-950 sm:text-7xl lg:text-[8rem]">WHY EM MOVE LOGISTICS <span className="text-stone-400">EXISTS</span></h2>
            </Reveal>

            <div className="relative mt-12 lg:mt-20">
              <ImageReveal direction="right" className="relative z-0 aspect-[16/9] overflow-hidden bg-stone-300 sm:aspect-[16/8]">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80"
                  alt="Logistics worker preparing cargo in a warehouse"
                  width={1800}
                  height={900}
                  sizes="(min-width: 1024px) 72vw, 100vw"
                  className="h-full w-full object-cover object-center grayscale-[0.12]"
                />
              </ImageReveal>

              <div className="relative z-10 -mt-8 ml-5 max-w-xl bg-[#f7f4ee] p-7 shadow-[12px_16px_0_rgba(28,25,23,0.08)] sm:-mt-16 sm:ml-14 sm:p-10 lg:ml-24 lg:max-w-2xl">
                <Reveal>
                  <div className="flex items-center justify-between border-b border-stone-300 pb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    <span>EM Move Logistics / Field note</span>
                    <span>Nigeria ↔ UK</span>
                  </div>
                  <div className="mt-7 space-y-5 text-lg leading-8 text-stone-700 sm:text-xl">
                    {aboutOrigin.narrative.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-500"><span className="h-2 w-2 rounded-full bg-amber-500" /> Start with a clearer shipment conversation</div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
