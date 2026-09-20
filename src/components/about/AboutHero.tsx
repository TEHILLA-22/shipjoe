"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";
import { aboutHero } from "@/data/about";

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bgImage = el.querySelector("[data-hero-bg]");
    const label = el.querySelector("[data-hero-label]");
    const headline = el.querySelector("[data-hero-headline]");
    const text = el.querySelector("[data-hero-text]");
    const cta = el.querySelector("[data-hero-cta]");
    const motif = el.querySelector("[data-hero-motif]");
    const motionArt = el.querySelector("[data-hero-motion-art]");

    const ctx = gsap.context(() => {
      gsap.set([label, headline, text, cta, motif], { opacity: 0, y: 18 });
      gsap.set(bgImage, { opacity: 0, scale: 1.02 });
      gsap.set(motionArt, { opacity: 0, scale: 1.04, x: 18, rotate: 2 });

      if (prefersReducedMotion) {
        gsap.set([bgImage, motionArt, label, headline, text, cta, motif], { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(bgImage, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" })
        .to(motionArt, { opacity: 1, scale: 1, x: 0, rotate: 0, duration: 0.8, ease: "power2.out" }, "<0.18")
        .to(label, { opacity: 1, y: 0, duration: 0.45 }, "<0.15")
        .to(headline, { opacity: 1, y: 0, duration: 0.7 }, "<0.12")
        .to(text, { opacity: 1, y: 0, duration: 0.55 }, "<0.18")
        .to(motif, { opacity: 1, y: 0, duration: 0.45 }, "<0.12")
        .to(cta, { opacity: 1, y: 0, duration: 0.45 }, "<0.12");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative isolate overflow-hidden bg-stone-950 py-8 text-white sm:py-12 lg:py-16">
      <div data-hero-bg className="absolute inset-0 -z-20 h-full w-full overflow-hidden opacity-0">
        <Image src="/images/about%20hero.svg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,9,20,0.78),rgba(4,9,20,0.28)_58%,rgba(4,9,20,0.62))]" />
      </div>

      <Container className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div className="max-w-3xl lg:py-12">
          <p data-hero-label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-400 opacity-0">
            {aboutHero.label}
          </p>
          <h1 data-hero-headline className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl lg:text-[5rem] leading-[1.05] opacity-0">
            {aboutHero.headline}
          </h1>
          <p data-hero-text className="mt-8 max-w-xl text-lg leading-relaxed text-stone-300 opacity-0">
            {aboutHero.supportingText}
          </p>
          
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div data-hero-cta className="opacity-0">
              <PrimaryButton href="/quote" className="!bg-white !text-stone-950 hover:!bg-stone-200">
                Get a quote
              </PrimaryButton>
            </div>
            <div data-hero-motif className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-300 opacity-0">
              <span className="h-px w-16 bg-white/40" />
              Nigeria <span className="text-stone-500">→</span> United Kingdom
            </div>
          </div>
        </div>
        
      </Container>
    </section>
  );
}
