"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CorridorSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const routeLine = el.querySelector("[data-corridor-line]");
    const nodes = el.querySelectorAll("[data-corridor-node]");

    const ctx = gsap.context(() => {
      gsap.set(routeLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(nodes, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        }
      });

      tl.to(nodes[0], { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" })
        .to(routeLine, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, "-=0.2")
        .to([nodes[1], nodes[2]], { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.5)" }, "-=0.4");
        
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="border-t border-stone-200 bg-white py-24 sm:py-32 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500 mb-6">
            The Corridor
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-stone-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            Nigeria <span className="font-light text-stone-400">↔</span> UK <span className="font-light text-stone-400">↔</span> Europe
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
            EM Move Logistics is built around shipping goods, packages and commercial freight out of Nigeria — by air to the United Kingdom, and by sea to the UK and onward to every one of the 27 EU member states.
          </p>
        </div>

        <div className="mt-24 relative flex items-start justify-between gap-4 w-full max-w-4xl mx-auto">
          {/* Node 1 */}
          <div data-corridor-node className="flex flex-1 flex-col items-center gap-3 text-center relative z-10">
            <div className="w-4 h-4 rounded-full bg-stone-900 border-4 border-white shadow-sm" />
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-900 sm:text-xs sm:tracking-[0.2em]">Nigeria</span>
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-stone-400">Origin</span>
          </div>

          {/* Line */}
          <div className="absolute left-4 right-4 h-[2px] bg-stone-200 top-[7px] -z-0">
            <div data-corridor-line className="h-full w-full bg-stone-900 origin-left" />
          </div>

          {/* Node 2 */}
          <div data-corridor-node className="flex flex-1 flex-col items-center gap-3 text-center relative z-10">
            <div className="w-4 h-4 rounded-full bg-stone-900 border-4 border-white shadow-sm" />
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-900 sm:text-xs sm:tracking-[0.2em]">United Kingdom</span>
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-stone-400">Air + Sea</span>
          </div>

          {/* Node 3 */}
          <div data-corridor-node className="flex flex-1 flex-col items-center gap-3 text-center relative z-10">
            <div className="w-4 h-4 rounded-full bg-stone-900 border-4 border-white shadow-sm" />
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-900 sm:text-xs sm:tracking-[0.2em]">Europe</span>
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.16em] text-stone-400">Sea · 27 states</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
