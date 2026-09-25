"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function HeroMotion() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const title = el.querySelector("[data-hero-word]");
      const packageDot = el.querySelector("[data-hero-package]");
      const route = el.querySelector("[data-hero-route]");
      const cta = el.querySelector("[data-hero-cta]");
      const artwork = el.querySelector("[data-hero-artwork]");
      const frame = el.querySelector("[data-hero-frame]");

      gsap.set([title, packageDot, route, cta], { opacity: 0, y: 18 });
      gsap.set(artwork, { opacity: 0, scale: 1.08, y: 24 });
      gsap.set(frame, { opacity: 0, y: 32, rotate: 1.5 });

      if (prefersReducedMotion) {
        gsap.set([title, packageDot, route, cta, artwork, frame], { opacity: 1, y: 0, scale: 1, rotate: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(frame, { opacity: 1, y: 0, rotate: 0, duration: 0.9 })
        .to(artwork, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power2.out" }, "<0.15")
        .to(title, { opacity: 1, y: 0, duration: 0.7 }, "<0.25")
        .to(route, { opacity: 1, y: 0, duration: 0.8 }, "<0.15")
        .to(packageDot, { opacity: 1, y: 0, duration: 0.5 }, "<0.2")
        .to(cta, { opacity: 1, y: 0, duration: 0.6 }, "<0.2");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative flex w-full max-w-[600px] items-center justify-center">
      <div className="absolute inset-0 rounded-[32px] border border-stone-200 bg-stone-100/80" />
      <div data-hero-frame className="relative z-10 w-full overflow-hidden rounded-[32px] border border-stone-200 bg-white p-6 shadow-[0_30px_90px_rgba(28,25,23,0.12)] sm:p-8">
        <div className="mb-8 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
          <span>EM MOVE LOGISTICS</span>
          <span>Nigeria ↔ UK</span>
        </div>

        <div data-hero-word className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">From Nigeria</p>
          <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">To the UK</p>
          <p className="text-[11px] uppercase tracking-[0.35em] text-stone-500">And back again</p>
        </div>

        <div data-hero-route className="relative my-6 overflow-hidden rounded-2xl bg-stone-100">
          <Image data-hero-artwork src="/images/hero.svg" alt="Animated EM Move Logistics route artwork" width={840} height={664} className="h-auto w-full object-cover" priority />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/30" />
        </div>

        <div data-hero-package className="flex items-center justify-between text-sm text-stone-700">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-amber-300" />
            Nigeria
          </span>
          <span className="inline-flex items-center gap-2">
            United Kingdom
            <span className="inline-block h-3 w-3 rounded-sm border border-stone-900 bg-stone-300" />
          </span>
        </div>

        <div data-hero-cta className="mt-8 flex gap-3">
          <a href="/quote" className="inline-flex items-center rounded-full bg-stone-900 px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-50">Request quote</a>
          <a href="/track" className="inline-flex items-center rounded-full border border-stone-300 px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-stone-900">Track</a>
        </div>
      </div>
    </div>
  );
}
