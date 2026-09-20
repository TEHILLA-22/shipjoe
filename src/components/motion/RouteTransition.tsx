"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const route = root.querySelector<SVGPathElement>("[data-route-line]");
      const visual = root.querySelector("[data-route-visual]");
      if (!route || !visual) return;

      const length = route.getTotalLength();
      gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
      gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", end: "top 38%", scrub: 0.6 },
      })
        .to(route, { strokeDashoffset: 0, ease: "none" })
        .fromTo(visual, { scale: 0.96 }, { scale: 1, ease: "none" }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
