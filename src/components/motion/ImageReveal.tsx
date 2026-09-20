"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImageReveal({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const imageElement = el.querySelector("img") || el.firstElementChild;

    let clipStart = "inset(100% 0% 0% 0%)"; // Reveals bottom-to-top
    if (direction === "down") clipStart = "inset(0% 0% 100% 0%)";
    if (direction === "left") clipStart = "inset(0% 0% 0% 100%)";
    if (direction === "right") clipStart = "inset(0% 100% 0% 0%)";

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: clipStart });
      if (imageElement) {
        gsap.set(imageElement, { scale: 1.05 });
      }

      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });

      if (imageElement) {
        gsap.to(imageElement, {
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
