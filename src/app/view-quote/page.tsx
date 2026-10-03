import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuoteLookupForm } from "@/components/quote/QuoteLookupForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "View a quote | EM Move Logistics",
  description:
    "Look up your EM Move Logistics quote request and check its current status using your reference and contact details.",
};

type ViewQuotePageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function ViewQuotePage({
  searchParams,
}: ViewQuotePageProps) {
  const params = await searchParams;
  const initialReference = params.ref?.trim() ?? "";

  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="View a quote"
                title="Check where your quote is up to."
                description="Enter your quote reference with the email address or phone number you quoted with. No account needed."
              />

              <div className="mt-8 rounded-[28px] border border-stone-200 bg-stone-50 p-6">
                <p className="text-sm font-medium text-stone-700">
                  Lost your reference?
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Send us a quote request again with the same
                  contact details and our team will point you to
                  the right one.
                </p>
              </div>
            </div>

            <QuoteLookupForm initialReference={initialReference} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}