import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";

export const metadata: Metadata = {
  title: "UK to Nigeria | EM Move Logistics",
  description: "UK to Nigeria cargo and parcel shipping with route-specific coordination and freight support.",
};

export default function UKToNigeriaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">UK → Nigeria</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.08em] text-stone-900 sm:text-7xl">Shipping from the UK to Nigeria.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">This route focuses on shipments leaving the UK and entering Nigeria, with service planning centred around clarity, handling and onward destination coordination. It works across commercial cargo, parcels and personal consignments.</p>
              <div className="mt-8 flex gap-4">
                <PrimaryButton href="/quote">Request a quote</PrimaryButton>
                <Link href="/services" className="inline-flex items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900">View services</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white">
              <Image src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80" alt="UK to Nigeria shipment route" width={1200} height={900} className="h-[520px] w-full object-cover" />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Typical cargo</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Parcels and cargo</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Suitable for a wide range of shipments travelling from the UK to Nigeria.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Movement</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Operational clarity</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">The route supports practical movement planning from collection and transit to destination handling.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Best for</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Business and personal use</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">From commercial export shipments to personal goods, the route is tailored to the needs of the consignment.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
