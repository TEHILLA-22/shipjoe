import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";

export function HumanSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <div className="relative">
          <ImageReveal direction="up" className="rounded-[32px]">
            <Image 
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80" 
              alt="Logistics professional inspecting cargo" 
              width={1600} 
              height={900} 
              className="w-full h-[600px] lg:h-[800px] object-cover"
            />
          </ImageReveal>

          <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-16">
            <Reveal>
              <h2 className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl lg:text-[6rem] leading-[0.95] max-w-lg drop-shadow-lg">
                LOGISTICS IS HUMAN.
              </h2>
            </Reveal>
            
            <div className="flex justify-end">
              <Reveal delay={0.2}>
                <div className="max-w-sm rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8">
                  <p className="text-sm leading-relaxed text-stone-100 font-medium">
                    Behind every tracking number is a person, a business, or a plan. We don&apos;t just move boxes; we uphold the responsibility of delivering what matters.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
