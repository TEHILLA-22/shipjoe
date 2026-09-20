import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { aboutStandards } from "@/data/about";

export function StandardsSection() {
  return (
    <section className="bg-stone-50 py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-stone-900 sm:text-6xl leading-[1.05]">
              WHAT SHOULD A CUSTOMER EXPECT?
            </h2>
          </div>
        </Reveal>
        
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16 border-t border-stone-200 pt-12">
          {aboutStandards.map((standard, index) => (
            <Reveal key={standard.title} delay={index * 0.1}>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-stone-900">
                  {standard.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-stone-600 max-w-sm">
                  {standard.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
