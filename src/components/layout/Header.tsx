"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Container } from "@/components/ui/Container";
import { navigation } from "@/data/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.fromTo(menu, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
      gsap.fromTo(menu.querySelectorAll("a"), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, delay: 0.08, ease: "power2.out" });
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" });
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[rgba(250,250,249,0.9)] backdrop-blur-xl">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.22em] text-stone-900 uppercase">
          EM Move Logistics
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-stone-600 transition hover:text-stone-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/track" className="text-sm text-stone-700 transition hover:text-stone-900">Track shipment</Link>
          <PrimaryButton href="/quote">Get a quote</PrimaryButton>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-900"
          >
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </Container>
      <div ref={menuRef} id="mobile-navigation" className="h-0 overflow-hidden border-t border-stone-200/80 bg-stone-50 opacity-0 md:hidden">
        <nav aria-label="Mobile navigation" className="flex flex-col px-5 pb-6 pt-3">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="border-b border-stone-200 py-4 text-lg font-medium text-stone-900">
              {item.label}
            </Link>
          ))}
          <Link href="/track" onClick={() => setMenuOpen(false)} className="border-b border-stone-200 py-4 text-lg font-medium text-stone-900">Track shipment</Link>
          <Link href="/quote" onClick={() => setMenuOpen(false)} className="mt-5 inline-flex w-fit rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white">Get a quote</Link>
        </nav>
      </div>
    </header>
  );
}
