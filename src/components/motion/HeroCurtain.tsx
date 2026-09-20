"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroCurtain({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Elements to animate
    const bgImage = el.querySelector("[data-hero-bg]"); // The route / visual plane
    const overlay = el.querySelector("[data-hero-overlay]"); // Dark field
    const contentNodes = el.querySelectorAll("[data-hero-content] > *"); // Headline, text, CTA
    const stats = el.querySelectorAll("[data-hero-stat]");

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(bgImage, { opacity: 0, scale: 1.05 });
      gsap.set(overlay, { opacity: 1 });
      gsap.set(contentNodes, { opacity: 0, y: 40 });
      gsap.set(stats, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // BLACK / DARK FIELD is default.
      
      // route appears & visual plane opens (bg image reveals with subtle scale correction)
      tl.to(overlay, { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0.2)
        .to(bgImage, { opacity: 1, scale: 1, duration: 2.5, ease: "power3.out" }, 0.2)
        
        // headline resolves
        .to(
          contentNodes, 
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 
          "-=1.6"
        )
        
        // CTA & Stats resolve
        .to(
          stats, 
          { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 
          "-=1.2"
        );
        
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
    </div>
  );
}
