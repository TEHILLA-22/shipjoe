"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function ServiceHero() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const artwork = root.querySelector("[data-service-artwork]");
      const content = root.querySelector("[data-service-content]");
      if (!artwork || !content) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set(artwork, { opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 1.04, transformOrigin: "center" });
      gsap.set(content, { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 18 });

      if (reducedMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(artwork, { opacity: 1, scale: 1, duration: 1.05, ease: "power2.out" })
        .to(content, { opacity: 1, y: 0, duration: 0.55 }, "<0.35");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[32px] bg-stone-950 p-6 text-white sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.24),transparent_42%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
        <div data-service-content>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-sky-200/75"><span className="h-px w-8 bg-sky-200/60" /> Services / Route document</div>
          <h1 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.07em] sm:text-5xl lg:text-6xl">Shipping from Nigeria to the UK and Europe.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-300 sm:text-lg">International shipping solutions for parcels, personal effects and commercial cargo, with air freight to the UK and sea freight to the UK and all EU member states.</p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a href="/quote" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-sky-100">Get a quote</a>
            <span className="text-sm text-stone-400">Listed rate: <strong className="font-medium text-white">£1.50 per kg</strong></span>
          </div>
        </div>
        <div data-service-artwork className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0b1b32] shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
          <Image src="/images/substitute%20hero%20or%20creative%20section%20implement.svg" alt="Animated route and cargo illustration for Nigeria to UK and Europe shipping" width={1600} height={1200} className="h-auto w-full" priority />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,20,0.26),transparent_28%,transparent_68%,rgba(4,9,20,0.52))]" />
          <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between sm:inset-x-7 sm:top-7">
            <div className="max-w-[42%]">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-sky-100/70">Origin</span>
              <strong className="mt-1 block text-sm font-medium uppercase tracking-[0.16em] text-white sm:text-base">Nigeria</strong>
            </div>
            <div className="max-w-[46%] text-right">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-sky-100/70">Destinations</span>
              <strong className="mt-1 block text-sm font-medium uppercase tracking-[0.16em] text-white sm:text-base">UK + Europe</strong>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-white/20 pt-3 text-[9px] uppercase tracking-[0.22em] text-sky-100/65 sm:inset-x-7 sm:bottom-7">
            <span>Route 01</span>
            <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Air to UK · Sea to UK + EU</span>
          </div>
        </div>
      </div>
    </div>
  );
}