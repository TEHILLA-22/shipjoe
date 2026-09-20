import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";

export const metadata: Metadata = {
  title: "Air Freight | Ship Joe",
  description: "Air freight shipping between Nigeria and the UK for urgent cargo and international movement.",
};

export default function AirFreightPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">Air Freight</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.08em] text-stone-900 sm:text-7xl">Fast international movement.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">Air freight is used when the shipment needs speed, controlled handling and a direct route between Nigeria and the UK. It suits urgent business cargo, commercial consignments and time-sensitive parcels.</p>
              <div className="mt-8 flex gap-4">
                <PrimaryButton href="/quote">Request a quote</PrimaryButton>
                <Link href="/services" className="inline-flex items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900">View services</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white">
              <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80" alt="Air freight logistics" width={1200} height={900} className="h-[520px] w-full object-cover" />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Suitable for</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Urgent cargo</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Ideal for shipments that require faster transit between Nigeria and the UK.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Route</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Nigeria ↔ UK</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Supports reciprocal movements for business, personal and commercial cargo requirements.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Process</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Expedited coordination</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">From request through collection and onward movement, the route is shaped for visibility and pace.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
