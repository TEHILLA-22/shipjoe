import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProcessTransit } from "@/components/motion/ProcessTransit";
import { RouteAnimation } from "@/components/motion/RouteAnimation";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { HeroCurtain } from "@/components/motion/HeroCurtain";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
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
        <HeroCurtain>
        <section className="relative isolate min-h-[720px] overflow-hidden bg-[#0b1b32] py-20 text-white sm:min-h-[820px] sm:py-28">
          <div data-hero-overlay className="absolute inset-0 z-50 bg-[#040914] pointer-events-none" />
          
          <div data-hero-bg className="absolute inset-0 -z-20 h-full w-full">
            <Image src="/images/hero.svg" alt="" fill priority sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,18,39,0.9)_0%,rgba(8,31,60,0.68)_43%,rgba(8,31,60,0.18)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,18,39,0.72)_0%,transparent_55%)]" />
          </div>

          <Container className="relative grid min-h-[580px] items-end gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <div data-hero-content>
                <div className="flex items-center gap-4">
                  <span className="h-[1px] w-8 bg-sky-200/40"></span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-100/80">EM Move Logistics</p>
                </div>
                
                <h1 className="mt-8 max-w-2xl text-4xl font-light leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
                  <span className="block text-sky-50/60 text-2xl sm:text-3xl lg:text-4xl mb-2">Connecting Routes</span>
                  <span className="block font-medium">From Nigeria. To the UK.</span>
                  <span className="block mt-1 text-sky-100/70">And back again.</span>
                </h1>
                
                <p className="mt-8 max-w-lg text-base leading-relaxed text-sky-50/80 sm:text-lg">
                  International freight and parcel shipping, designed with route clarity, dedicated commercial support, and dependable handling at every stage.
                </p>
                
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <PrimaryButton href="/quote" className="px-8 py-4">Request a quote</PrimaryButton>
                  <SecondaryButton href="/track" className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10 px-8 py-4">Track shipment</SecondaryButton>
                </div>
              </div>
              
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {homepageStats.map((item) => (
                  <div key={item.label} data-hero-stat className="rounded-2xl border border-white/20 bg-slate-950/25 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-semibold tracking-[-0.05em] text-white">{item.value}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-sky-100/65">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
        </HeroCurtain>

        <section className="border-y border-stone-200 bg-white py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Route"
                title="Nigeria ↔ UK, connected by movement."
                description="The route is the story. Every shipment follows a flow of collection, transit and delivery between Nigeria and the United Kingdom."
              />
            </Reveal>
            <RouteTransition>
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div className="space-y-5">
                {shippingMethods.map((item, index) => (
                  <Reveal key={item.name} delay={index * 0.1}>
                    <div className="flex items-start gap-4 rounded-3xl border border-stone-200 bg-stone-50 p-5">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-sm font-medium text-stone-900">→</div>
                      <div>
                        <h3 className="text-xl font-semibold text-stone-900">{item.name}</h3>
                        <p className="mt-2 text-sm leading-7 text-stone-600">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
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
            <Reveal>
              <SectionHeading
                eyebrow="Services"
                title="Shipping and freight support in both directions."
                description="From dedicated route services to air and sea freight, each solution is built around route clarity and cargo needs."
              />
            </Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {services.map((service, index) => (
                <Reveal key={service.slug} delay={index * 0.15}>
                  <Link href={`/services/${service.slug}`} className="group overflow-hidden rounded-[30px] border border-stone-200 bg-white block">
                    <ImageReveal direction="up" className="border-b border-stone-200">
                      <Image src={service.image} alt={service.title} width={1200} height={900} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 group-hover:rotate-1" />
                    </ImageReveal>
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
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section data-cinematic className="border-t border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div data-cinematic-content>
              <Reveal>
                <SectionHeading
                  eyebrow="Editorial"
                  title="International shipping without the noise."
                  description="EM Move Logistics is your one guaranteed, structured and easy to trust. The editorial layout gives the route and the freight process the visual importance they deserve."
                />
              </Reveal>
            </div>
            <div data-cinematic-visual className="rounded-[32px] border border-stone-200 bg-white p-2">
              <ImageReveal direction="left" className="rounded-[24px]">
                <Image src="/images/substitute hero or creative section implement.svg" alt="EM Move Logistics creative shipping illustration" width={1600} height={1200} className="h-auto min-h-72 w-full object-cover" />
              </ImageReveal>
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="How shipping works"
                title="A simple route from request to delivery."
                description="The process is designed to be clear and recognizable from first enquiry to final destination."
              />
            </Reveal>
            <ProcessTransit />
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {processSteps.map((step, index) => (
                <Reveal key={step.id} delay={index * 0.1}>
                  <div className="border-l border-stone-300 pl-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{step.id}</p>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.04em] text-stone-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-stone-200 bg-stone-950 py-20 text-stone-100 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-400">Why EM Move Logistics</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">A route-first freight partner.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">EM Move Logistics is built around practical international logistics between Nigeria and the UK, with service support shaped around cargo, freight method and directional shipping needs.</p>
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
              <Reveal>
                <SectionHeading
                  eyebrow="Route map"
                  title="Nigeria ↔ UK service routes."
                  description="The routes are simple, visible and easy to understand. The message is always: where it starts, where it travels, and where it ends."
                />
              </Reveal>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { title: "Nigeria → UK", description: "Outbound movement from Nigeria to the UK with clear route planning and freight handling." },
                { title: "UK → Nigeria", description: "Inbound movement from the UK to Nigeria with collection, transit and destination coordination." },
                { title: "Air Freight", description: "Fast international movement for time-sensitive freight and parcel consignments." },
                { title: "Sea Freight", description: "Practical route support for larger or less urgent cargo shipments." },
              ].map((route, index) => (
                <Reveal key={route.title} delay={index * 0.1}>
                  <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-6 h-full">
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Route</p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">{route.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{route.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section data-cinematic className="border-t border-stone-200 bg-white py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div data-cinematic-content>
              <Reveal>
                <SectionHeading
                  eyebrow="Quote"
                  title="Begin the quote experience."
                  description="The form is designed to gather the key route, shipment and contact details needed before a freight conversation begins."
                />
              </Reveal>
            </div>
            <div data-cinematic-content>
              <Reveal delay={0.2}>
                <QuoteForm />
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="border-t border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="FAQ"
                title="Questions from customers and shippers."
                description="The FAQ is intentionally structured for future content expansion and route-specific clarity."
              />
            </Reveal>
            <div className="mt-12 max-w-4xl">
              <Reveal delay={0.1}>
                <FAQAccordion items={faqItems} />
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="border-t border-stone-200 bg-stone-950 py-20 text-stone-100 sm:py-28">
          <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-400">Ready to ship</p>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-6xl">Request your route today.</h2>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="flex flex-wrap gap-4 lg:justify-end">
              <PrimaryButton href="/quote">Request a quote</PrimaryButton>
              <SecondaryButton href="/services" className="!border-stone-700 !bg-stone-900 !text-stone-50 hover:!bg-stone-800">Explore services</SecondaryButton>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
