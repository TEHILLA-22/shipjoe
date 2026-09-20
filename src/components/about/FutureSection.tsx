"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FutureSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const futureLine = el.querySelector("[data-future-line]");

    const ctx = gsap.context(() => {
      gsap.fromTo(futureLine, 
        { scaleX: 0 }, 
        { 
          scaleX: 1, 
          ease: "none", 
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 10%",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="border-t border-stone-200 bg-stone-50 py-24 sm:py-32 overflow-hidden">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Direction</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-stone-900 sm:text-6xl">
              THE JOURNEY DOESN'T END HERE.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              Ship Joe is continuously working to improve visibility, simplify quote requests, and strengthen the overall logistics experience across the Nigeria ↔ UK corridor.
            </p>
          </div>
        </Reveal>

        <div className="mt-24 relative flex items-center w-[150%] max-w-[2000px] -ml-8">
          <div className="flex items-center gap-4 relative z-10 pl-8 bg-stone-50 pr-4">
            <div className="w-4 h-4 rounded-full bg-stone-900 border-4 border-stone-200" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-900">The Current Route</span>
          </div>

          <div className="absolute left-8 right-0 h-[2px] bg-stone-200 top-[7px] -z-0">
            <div data-future-line className="h-full w-full bg-stone-900 origin-left" />
          </div>
          
          <div className="absolute right-[20%] flex items-center gap-4 z-10 bg-stone-50 px-4">
            <div className="w-3 h-3 rounded-full bg-stone-300 border-2 border-stone-200" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">The Next Route</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
