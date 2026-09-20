import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Ship Joe",
  description: "Nigeria ↔ UK shipping services including air freight, sea freight, parcel movement and route-specific freight support.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Services"
              title="Shipping solutions built around the route."
              description="Flexible freight and parcel support for shipments moving between Nigeria and the United Kingdom."
            />
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {services.map((service) => (
                <Link href={`/services/${service.slug}`} key={service.slug} className="group overflow-hidden rounded-[32px] border border-stone-200 bg-white transition hover:-translate-y-1 hover:border-stone-300">
                  <div className="relative overflow-hidden">
                    <Image src={service.image} alt={service.title} width={1200} height={880} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="space-y-4 p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-stone-500">
                      <span>{service.routeLabel}</span>
                      <span>{service.method}</span>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-[-0.06em] text-stone-900">{service.title}</h3>
                    <p className="text-base leading-7 text-stone-600">{service.shortDescription}</p>
                    <span className="inline-flex text-sm font-medium text-stone-900">{service.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
