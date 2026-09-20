"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ProcessTransit() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const path = root.querySelector<SVGPathElement>("[data-process-path]");
      const packageDot = root.querySelector<SVGCircleElement>("[data-process-package]");
      const stages = root.querySelectorAll("[data-process-stage]");
      if (!path || !packageDot) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const length = path.getTotalLength();
      const progress = { value: 0 };
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(stages, { opacity: reducedMotion ? 1 : 0.42 });

      const placePackage = () => {
        const point = path.getPointAtLength(progress.value * length);
        gsap.set(packageDot, { attr: { cx: point.x, cy: point.y } });
      };

      if (reducedMotion) {
        gsap.set(path, { strokeDashoffset: 0 });
        progress.value = 1;
        placePackage();
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" }, paused: true });
      timeline
        .to(path, { strokeDashoffset: 0, duration: 0.7 })
        .to(progress, { value: 1, duration: 1.2, onUpdate: placePackage }, "<")
        .to(stages, { opacity: 1, duration: 0.25, stagger: 0.25 }, "<0.2");

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          timeline.play();
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      observer.observe(root);

      return () => observer.disconnect();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 sm:p-8" aria-label="Shipment process from request to arrival">
      <svg viewBox="0 0 760 180" className="w-full" role="img" aria-hidden="true">
        <path data-process-path d="M 44 112 C 176 36, 286 36, 386 92 S 596 150, 716 58" fill="none" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" />
        <circle data-process-package cx="44" cy="112" r="7" fill="#f59e0b" stroke="#fff" strokeWidth="3" />
      </svg>
      <div className="grid grid-cols-4 gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
        {['Request', 'Prepare', 'Transit', 'Arrive'].map((stage) => <span data-process-stage key={stage}>{stage}</span>)}
      </div>
    </div>
  );
}
