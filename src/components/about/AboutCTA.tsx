"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const footerLine = el.querySelector("[data-footer-line]");

    const ctx = gsap.context(() => {
      gsap.fromTo(footerLine, 
        { scaleY: 0 }, 
        { 
          scaleY: 1, 
          ease: "none", 
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-stone-950 py-32 sm:py-48 text-white overflow-hidden">
      <div className="absolute top-0 bottom-0 left-8 sm:left-[10%] w-[1px] bg-stone-800">
        <div data-footer-line className="w-full h-full bg-white origin-top" />
      </div>
      
      <Container className="relative pl-12 sm:pl-[12%]">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl lg:text-[6rem] leading-[0.95]">
              LET'S MOVE SOMETHING THAT MATTERS.
            </h2>
            <p className="mt-8 text-xl leading-relaxed text-stone-400 max-w-xl font-light">
              Whether you're sending something personal, moving business cargo, or exploring your shipping options, start by telling us what you need to move.
            </p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center gap-6">
            <PrimaryButton href="/quote" className="px-8 py-4 !bg-white !text-stone-950 hover:!bg-stone-200">
              Get a quote
            </PrimaryButton>
            <SecondaryButton href="/services" className="!border-stone-700 !bg-transparent !text-white hover:!bg-stone-900 px-8 py-4">
              Explore services
            </SecondaryButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
