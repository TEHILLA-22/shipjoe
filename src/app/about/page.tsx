import type { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About | Ship Joe",
  description: "About Ship Joe and the Nigeria ↔ UK shipping service model.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About Ship Joe"
                title="Built around the Nigeria ↔ UK route."
                description="Ship Joe focuses on the movements, cargo needs and route requirements that connect Nigeria and the UK. The service is shaped around clarity, smooth coordination and dependable freight handling."
              />
              <div className="mt-8 flex gap-4">
                <PrimaryButton href="/quote">Request a quote</PrimaryButton>
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                alt="Cargo handling and international logistics"
                width={1200}
                height={900}
                className="h-[500px] w-full object-cover"
              />
            </div>
          </Container>
        </section>

        <section className="border-t border-stone-200 bg-stone-50 py-20">
          <Container className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Focus</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Route-specific logistics</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">The brand is centred on shipments moving between Nigeria and the UK, with route clarity and process visibility at the core.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Support</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Practical communication</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Clear quoting, shipment guidance and route information help customers move from enquiry to shipment without uncertainty.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Methods</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Air and sea freight</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Flexible international freight support allows customers to match the shipment with the right freight method for urgency, size and cargo type.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
