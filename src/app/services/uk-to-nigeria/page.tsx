import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";
import { CinematicRouteHero } from "@/components/services/CinematicRouteHero";
import { RouteFeatureCard } from "@/components/services/RouteFeatureCard";

export const metadata: Metadata = {
  title: "UK to Nigeria | EM Move Logistics",
  description: "UK to Nigeria cargo and parcel shipping with route-specific coordination and freight support.",
};

export default function UKToNigeriaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Cinematic Hero Section */}
        <CinematicRouteHero
          origin="United Kingdom"
          destination="Nigeria"
          originFlag="🇬🇧"
          destinationFlag="🇳🇬"
          title="Shipping from the UK to Nigeria."
          description="This route focuses on shipments leaving the UK and entering Nigeria, with service planning centred around clarity, handling and route delivery."
          image="https://images.unsplash.com/photo-1596363505009-4694bd56e640?auto=format&fit=crop&w=1600&q=80"
          imageAlt="UK to Nigeria shipping cargo handling"
          direction="ltr"
        />

        {/* Feature Cards Section */}
        <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-stone-50 to-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl opacity-50" />
          </div>
          
          <Container className="relative z-10">
            <div className="mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-500 mb-3">Route Features</p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.07em] text-stone-900">Why choose UK to Nigeria?</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <RouteFeatureCard
                title="Parcels and cargo"
                subtitle="Typical cargo"
                description="Suitable for a wide range of shipments travelling from the UK to Nigeria."
                icon="📦"
                delay={0}
              />
              <RouteFeatureCard
                title="Operational clarity"
                subtitle="Movement"
                description="The route supports practical movement planning from collection and transit to destination handling."
                icon="🎯"
                delay={0.1}
              />
              <RouteFeatureCard
                title="Business and personal use"
                subtitle="Best for"
                description="From commercial export shipments to personal goods, the route is tailored to the needs of the consignment."
                icon="🚀"
                delay={0.2}
              />
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20 sm:py-28 bg-stone-950 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
          </div>
          
          <Container className="relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.07em] mb-6">Ready to ship?</h2>
              <p className="text-lg text-stone-300 mb-8">Get an instant quote for your UK to Nigeria shipment and connect with our logistics team.</p>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton href="/quote">Request a quote</PrimaryButton>
                <Link href="/services" className="inline-flex items-center rounded-full border border-stone-700 bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800 transition-colors">
                  View all services
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
