import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Request a quote | EM Move Logistics",
  description: "Request a quote for Nigeria ↔ UK shipping, air freight, sea freight and commercial cargo services.",
};

export default function QuotePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Request a quote"
                title="Tell us what you need to move."
                description="Share your route, shipment type and contact details so the right freight guidance can be prepared."
              />
              <div className="mt-8 overflow-hidden rounded-[28px] border border-stone-200 bg-stone-50">
                <Image src="/images/for booking.svg" alt="Animated booking illustration" width={300} height={400} className="mx-auto h-72 w-auto" />
              </div>
            </div>

            <QuoteForm />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
