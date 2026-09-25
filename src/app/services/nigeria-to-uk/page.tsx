import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";

export const metadata: Metadata = {
  title: "Nigeria to UK | EM Move Logistics",
  description: "Nigeria to UK shipping with route-specific guidance for parcels, cargo and freight movements.",
};

export default function NigeriaToUKPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">Nigeria → UK</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.08em] text-stone-900 sm:text-7xl">Cargo from Nigeria to the UK.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">This route supports outward shipments from Nigeria to the UK, with the movement shaped around cargo type, route realism and the customer’s shipping requirements. It suits personal consignments and commercial freight.</p>
              <div className="mt-8 flex gap-4">
                <PrimaryButton href="/quote">Request a quote</PrimaryButton>
                <Link href="/services" className="inline-flex items-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900">View services</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white">
              <Image src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" alt="Nigeria to UK freight route" width={1200} height={900} className="h-[520px] w-full object-cover" />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Freight type</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Flexible movement</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Ideal for different cargo needs, from standard parcels to higher-volume freight shipments.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Coordination</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Route planning</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">The process supports collection, movement and destination handling with route visibility at each step.</p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Support</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Quote-first process</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Use the quote form to share shipment details before moving forward with route-specific guidance.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
