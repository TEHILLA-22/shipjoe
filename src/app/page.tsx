import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProcessTransit } from "@/components/motion/ProcessTransit";
import { RouteAnimation } from "@/components/motion/RouteAnimation";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  faqItems,
  homepageStats,
  processSteps,
  services,
  shippingMethods,
  trustPoints,
} from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate min-h-[720px] overflow-hidden bg-[#0b1b32] py-20 text-white sm:min-h-[820px] sm:py-28">
          <Image src="/images/hero.svg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,18,39,0.9)_0%,rgba(8,31,60,0.68)_43%,rgba(8,31,60,0.18)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(4,18,39,0.72)_0%,transparent_55%)]" />
          <Container className="relative grid min-h-[580px] items-end gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-100/75">Ship Joe / Nigeria ↔ UK</p>
              <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.92] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
                From Nigeria.
                <span className="mt-2 block">To the UK.</span>
                <span className="mt-2 block">And back again.</span>
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-sky-50/85">
                International freight and parcel shipping between Nigeria and the UK, with route clarity, commercial support and dependable handling.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href="/quote">Request a quote</PrimaryButton>
                <SecondaryButton href="/track" className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20">Track shipment</SecondaryButton>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {homepageStats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/20 bg-slate-950/25 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-semibold tracking-[-0.05em] text-white">{item.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-sky-100/65">{item.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </Container>
        </section>

        <section className="border-y border-stone-200 bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Route"
              title="Nigeria ↔ UK, connected by movement."
              description="The route is the story. Every shipment follows a flow of collection, transit and delivery between Nigeria and the United Kingdom."
            />
            <RouteTransition>
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div className="space-y-5">
                {shippingMethods.map((item) => (
                  <div key={item.name} className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-5">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-sm font-medium text-stone-900">→</div>
                    <div>
                      <h3 className="text-xl font-semibold text-stone-900">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div data-route-visual className="rounded-[32px] border border-stone-200 bg-stone-50 p-6 sm:p-8">
                <RouteAnimation className="mx-auto" />
                <div className="mt-8 flex items-center justify-between text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                  <span>Nigeria</span>
                  <span>Transit</span>
                  <span>United Kingdom</span>
                </div>
              </div>
            </div>
            </RouteTransition>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Services"
              title="Shipping and freight support in both directions."
              description="From dedicated route services to air and sea freight, each solution is built around route clarity and cargo needs."
            />
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {services.map((service) => (
                <Link href={`/services/${service.slug}`} key={service.slug} className="group overflow-hidden rounded-[30px] border border-stone-200 bg-white">
                  <div className="overflow-hidden border-b border-stone-200">
                    <Image src={service.image} alt={service.title} width={1200} height={900} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-stone-500">
                      <span>{service.routeLabel}</span>
                      <span>{service.method}</span>
                    </div>
                    <h3 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-stone-900">{service.title}</h3>
                    <p className="mt-4 text-base leading-7 text-stone-600">{service.description}</p>
                    <span className="mt-6 inline-flex text-sm font-medium text-stone-900">{service.cta} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section data-cinematic className="border-t border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div data-cinematic-content>
              <SectionHeading
                eyebrow="Editorial"
                title="International shipping without the noise."
                description="Ship Joe is designed to feel premium, structured and easy to trust. The editorial layout gives the route and the freight process the visual importance they deserve."
              />
            </div>
            <div data-cinematic-visual className="overflow-hidden rounded-[32px] border border-stone-200 bg-white">
              <Image src="/images/substitute hero or creative section implement.svg" alt="Ship Joe creative shipping illustration" width={1600} height={1200} className="h-auto min-h-72 w-full object-cover" />
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="How shipping works"
              title="A simple route from request to delivery."
              description="The process is designed to be clear and recognizable from first enquiry to final destination."
            />
            <ProcessTransit />
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.id} className="border-l border-stone-300 pl-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{step.id}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.04em] text-stone-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-stone-200 bg-stone-950 py-20 text-stone-100 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-400">Why Ship Joe</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">A route-first freight partner.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">Ship Joe is built around practical international logistics between Nigeria and the UK, with service support shaped around cargo, freight method and directional shipping needs.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className="rounded-3xl border border-stone-800 bg-stone-900 p-5">
                  <p className="text-base font-medium text-stone-100">{point}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Route map"
                title="Nigeria ↔ UK service routes."
                description="The routes are simple, visible and easy to understand. The message is always: where it starts, where it travels, and where it ends."
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { title: "Nigeria → UK", description: "Outbound movement from Nigeria to the UK with clear route planning and freight handling." },
                { title: "UK → Nigeria", description: "Inbound movement from the UK to Nigeria with collection, transit and destination coordination." },
                { title: "Air Freight", description: "Fast international movement for time-sensitive freight and parcel consignments." },
                { title: "Sea Freight", description: "Practical route support for larger or less urgent cargo shipments." },
              ].map((route) => (
                <div key={route.title} className="rounded-[28px] border border-stone-200 bg-stone-50 p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Route</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">{route.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{route.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section data-cinematic className="border-t border-stone-200 bg-white py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div data-cinematic-content>
              <SectionHeading
                eyebrow="Quote"
                title="Begin the quote experience."
                description="The form is designed to gather the key route, shipment and contact details needed before a freight conversation begins."
              />
            </div>
            <div data-cinematic-content>
              <QuoteForm />
            </div>
          </Container>
        </section>

        <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions from customers and shippers."
              description="The FAQ is intentionally structured for future content expansion and route-specific clarity."
            />
            <div className="mt-12 max-w-4xl">
              <FAQAccordion items={faqItems} />
            </div>
          </Container>
        </section>

        <section className="border-t border-stone-200 bg-stone-950 py-20 text-stone-100 sm:py-28">
          <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-400">Ready to ship</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Request your route today.</h2>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <PrimaryButton href="/quote">Request a quote</PrimaryButton>
              <SecondaryButton href="/services" className="!border-stone-700 !bg-stone-900 !text-stone-50 hover:!bg-stone-800">Explore services</SecondaryButton>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
