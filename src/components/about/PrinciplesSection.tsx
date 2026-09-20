"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { aboutPrinciples } from "@/data/about";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const items = el.querySelectorAll("[data-principle-item]");

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const title = item.querySelector("h3");
        const desc = item.querySelector("p");

        gsap.set(item, { opacity: 0.25 });
        gsap.set(title, { scale: 0.85, transformOrigin: "left center" });
        gsap.set(desc, { opacity: 0, y: 15 });

        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(item, { opacity: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(title, { scale: 1, duration: 0.6, ease: "back.out(1.2)" });
            gsap.to(desc, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
          },
          onLeave: () => {
            gsap.to(item, { opacity: 0.25, duration: 0.5, ease: "power2.out" });
            gsap.to(title, { scale: 0.85, duration: 0.5, ease: "power2.inOut" });
            gsap.to(desc, { opacity: 0, y: -15, duration: 0.4, ease: "power2.out" });
          },
          onEnterBack: () => {
            gsap.to(item, { opacity: 1, duration: 0.5, ease: "power2.out" });
            gsap.to(title, { scale: 1, duration: 0.6, ease: "back.out(1.2)" });
            gsap.to(desc, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
          },
          onLeaveBack: () => {
            gsap.to(item, { opacity: 0.25, duration: 0.5, ease: "power2.out" });
            gsap.to(title, { scale: 0.85, duration: 0.5, ease: "power2.inOut" });
            gsap.to(desc, { opacity: 0, y: 15, duration: 0.4, ease: "power2.out" });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="border-t border-stone-200 bg-white py-32 sm:py-48">
      <Container>
        <div className="max-w-4xl mx-auto space-y-32">
          {aboutPrinciples.map((principle) => (
            <div key={principle.id} data-principle-item className="pl-6 sm:pl-12 border-l border-stone-200">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400 block mb-4">
                {principle.id}
              </span>
              <h3 className="text-4xl font-semibold tracking-[-0.05em] text-stone-900 sm:text-6xl lg:text-7xl">
                {principle.title}
              </h3>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-stone-600 h-[80px]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
