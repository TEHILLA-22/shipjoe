import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ | Ship Joe",
  description: "Shipping questions and route guidance for Nigeria ↔ UK freight and parcel services.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="FAQ"
              title="Shipping questions, answered clearly."
              description="Helpful guidance around routes, freight methods and what to include when requesting your quote."
            />
            <div className="mt-12 max-w-4xl">
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
