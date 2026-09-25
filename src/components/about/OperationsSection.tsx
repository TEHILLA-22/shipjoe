"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { aboutOperations } from "@/data/about";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function OperationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const stages = el.querySelectorAll("[data-op-stage]");
    const line = el.querySelector("[data-op-line]");

    const ctx = gsap.context(() => {
      gsap.set(stages, { opacity: 0.2 });
      
      stages.forEach((stage) => {
        ScrollTrigger.create({
          trigger: stage,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => gsap.to(stage, { opacity: 1, duration: 0.4, ease: "power2.out" }),
          onLeave: () => gsap.to(stage, { opacity: 0.2, duration: 0.4, ease: "power2.out" }),
          onEnterBack: () => gsap.to(stage, { opacity: 1, duration: 0.4, ease: "power2.out" }),
          onLeaveBack: () => gsap.to(stage, { opacity: 0.2, duration: 0.4, ease: "power2.out" }),
        });
      });

      if (line) {
        gsap.fromTo(line, 
          { scaleY: 0 }, 
          { 
            scaleY: 1, 
            ease: "none", 
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="border-t border-stone-200 bg-stone-50 py-24 sm:py-32 overflow-hidden">
      <Container>
        <Reveal>
          <div className="max-w-xl mb-24">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-900 sm:text-5xl">
              BEHIND EVERY SHIPMENT IS A SYSTEM.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              EM Move Logistics is not merely a button that says "ship now." There is a structured physical and digital process behind every consignment we move.
            </p>
          </div>
        </Reveal>

        <div className="relative mx-auto max-w-4xl pl-12 sm:pl-0">
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-[2px] bg-stone-200 sm:-translate-x-1/2">
            <div data-op-line className="w-full h-full bg-stone-900 origin-top" />
          </div>

          <div className="space-y-24 sm:space-y-32 py-10">
            {aboutOperations.map((op, index) => (
              <div 
                key={op.id} 
                data-op-stage 
                className={`relative flex flex-col sm:flex-row items-start ${
                  index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
                }`}
              >
                <div className="absolute left-[-53px] sm:left-1/2 w-4 h-4 rounded-full bg-stone-900 border-4 border-stone-50 sm:-translate-x-1/2 top-1" />
                
                <div className={`w-full sm:w-[42%] ${
                  index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12 sm:text-left"
                }`}>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                    {op.id}
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-stone-900">
                    {op.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {op.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
