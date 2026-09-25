import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TrackingForm } from "@/components/tracking/TrackingForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Track shipment | EM Move Logistics",
  description: "Track your Nigeria ↔ UK shipment once the backend is connected to EM Move Logistics's live tracking service.",
};

export default function TrackPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeading
              eyebrow="Track"
              title="Track your shipment"
              description="Enter your tracking number to check the status of your shipment. The current page is intentionally prepared for a live tracking API connection without exposing fake results."
            />
            <TrackingForm />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
