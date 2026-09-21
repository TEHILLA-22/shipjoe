import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProcessTransit } from "@/components/motion/ProcessTransit";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { ServiceHero } from "@/components/services/ServiceHero";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicesPageFaq, servicesPageMethods, serviceJourney } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Ship Joe",
  description: "Understand Ship Joe's Nigeria to UK and UK to Nigeria air and sea freight services.",
};

const directions = [
  { title: "Nigeria → UK", text: "A clear outbound route for parcels, personal effects and commercial cargo leaving Nigeria for the United Kingdom." },
  { title: "UK → Nigeria", text: "A reciprocal route for shipments leaving the United Kingdom, with the same emphasis on method, cargo details and coordination." },
];

const shipmentTypes = [
  { title: "Personal shipments", text: "For parcels and personal effects that need to move between the two sides of the route.", method: "Air or sea, depending on the details" },
  { title: "Business cargo", text: "For commercial consignments that need a clear route, shipment information and freight method selection.", method: "Air for urgency; sea for larger or less time-sensitive cargo" },
  { title: "Larger shipments", text: "For cargo where size, weight, quantity and handling information matter before the route is confirmed.", method: "Sea freight may suit larger cargo" },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-stone-200 bg-stone-50 py-8 sm:py-12">
          <Container><ServiceHero /></Container>
        </section>

        <section className="border-b border-stone-200 bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="How we move" title="Choose the method that fits the shipment." description="Air and sea freight are different transportation systems. The right option depends on urgency, size, cargo type and the route details you provide." />
            <div className="mt-12 space-y-16">
              {servicesPageMethods.map((method, index) => (
                <article key={method.name} className={`grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center ${method.tone === "dark" ? "rounded-[32px] bg-stone-950 p-6 text-white sm:p-10" : ""}`}>
                  <ImageReveal direction={index === 0 ? "right" : "left"} className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <Image src={method.image} alt={method.imageAlt} width={1600} height={1200} sizes="(min-width: 1024px) 52vw, 100vw" className="h-full w-full object-cover" />
                  </ImageReveal>
                  <div className="lg:px-4">
                    <p className={`text-xs font-medium uppercase tracking-[0.28em] ${method.tone === "dark" ? "text-sky-200/70" : "text-stone-500"}`}>{method.name} / {method.route}</p>
                    <h2 className={`mt-5 text-4xl font-semibold tracking-[-0.07em] sm:text-6xl ${method.tone === "dark" ? "text-white" : "text-stone-900"}`}>{method.kicker}</h2>
                    <p className={`mt-6 max-w-xl text-lg leading-8 ${method.tone === "dark" ? "text-stone-300" : "text-stone-600"}`}>{method.description}</p>
                    <Link href={method.name === "Air Freight" ? "/services/air-freight" : "/services/sea-freight"} className={`mt-7 inline-flex text-sm font-medium ${method.tone === "dark" ? "text-sky-200" : "text-stone-900"}`}>Explore {method.name} →</Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="The two directions" title="One corridor. Both ways." description="Ship Joe's service structure is built around the Nigeria ↔ UK route, so the direction is clear before the shipment details are reviewed." />
            <RouteTransition>
              <div data-route-visual className="mt-12 rounded-[32px] border border-stone-200 bg-white p-6 sm:p-10">
                <svg viewBox="0 0 900 180" className="w-full" role="img" aria-label="Two-way route between Nigeria and the UK">
                  <path data-route-line d="M 72 92 C 250 20, 650 20, 828 92" fill="none" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 828 122 C 650 174, 250 174, 72 122" fill="none" stroke="#a8a29e" strokeWidth="2" strokeDasharray="7 10" strokeLinecap="round" />
                  <circle cx="72" cy="92" r="9" fill="#facc15" /><circle cx="828" cy="92" r="9" fill="#292524" />
                </svg>
                <div className="mt-5 flex justify-between text-xs font-medium uppercase tracking-[0.24em] text-stone-500"><span>Nigeria</span><span>United Kingdom</span></div>
              </div>
            </RouteTransition>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {directions.map((direction) => <article key={direction.title} className="border-l-2 border-stone-900 pl-6"><p className="text-xs uppercase tracking-[0.24em] text-stone-500">Direction</p><h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-stone-900">{direction.title}</h3><p className="mt-4 max-w-xl leading-7 text-stone-600">{direction.text}</p></article>)}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="What can I ship?" title="Start with the cargo, not the card." description="The useful first decision is what is moving, how much there is, and how urgently it needs to travel." />
            <div className="mt-12 grid gap-0 border-y border-stone-200 lg:grid-cols-3">
              {shipmentTypes.map((type) => <article key={type.title} className="border-b border-stone-200 p-6 last:border-0 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-8"><p className="text-xs uppercase tracking-[0.24em] text-stone-500">Shipment type</p><h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">{type.title}</h3><p className="mt-4 leading-7 text-stone-600">{type.text}</p><p className="mt-6 text-sm font-medium text-stone-900">{type.method}</p></article>)}
            </div>
          </Container>
        </section>

        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Air vs sea" title="A clearer method decision." description="There is no universal best method. The right choice follows the shipment's urgency, size and route requirements." />
            <div className="mt-12 overflow-x-auto border-y border-stone-300"><div className="min-w-[680px] grid grid-cols-[1fr_1fr_1fr] text-sm"><div className="border-r border-stone-300 p-5 text-xs uppercase tracking-[0.22em] text-stone-500">Method</div><div className="border-r border-stone-300 p-5 text-xs uppercase tracking-[0.22em] text-stone-500">Air freight</div><div className="p-5 text-xs uppercase tracking-[0.22em] text-stone-500">Sea freight</div><div className="border-r border-t border-stone-300 p-5 font-medium text-stone-900">Best suited for</div><div className="border-r border-t border-stone-300 p-5 text-stone-600">Urgent cargo and parcels</div><div className="border-t border-stone-300 p-5 text-stone-600">Larger, bulk or less time-sensitive cargo</div><div className="border-r border-t border-stone-300 p-5 font-medium text-stone-900">Route</div><div className="border-r border-t border-stone-300 p-5 text-stone-600">Nigeria ↔ UK</div><div className="border-t border-stone-300 p-5 text-stone-600">Nigeria ↔ UK</div><div className="border-r border-t border-stone-300 p-5 font-medium text-stone-900">Information needed</div><div className="border-r border-t border-stone-300 p-5 text-stone-600">Weight, dimensions, quantity and description</div><div className="border-t border-stone-300 p-5 text-stone-600">Weight, dimensions, quantity and description</div></div></div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="The shipment journey" title="One shipment, six stages." description="The journey starts with the information you provide and follows a clear route through preparation, transit and delivery." />
            <div className="mt-12"><ProcessTransit /></div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{serviceJourney.map((stage) => <article key={stage.id} className="border-t border-stone-300 pt-4"><p className="text-xs uppercase tracking-[0.24em] text-stone-500">{stage.id} / {stage.title}</p><p className="mt-3 leading-7 text-stone-600">{stage.description}</p></article>)}</div>
          </Container>
        </section>

        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ImageReveal direction="up" className="aspect-[4/3] overflow-hidden"><Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80" alt="Logistics warehouse and cargo handling environment" width={1600} height={1200} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover" /></ImageReveal>
            <div><p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">Real-world logistics</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.07em] text-stone-900 sm:text-6xl">There is a physical journey behind every request.</h2><p className="mt-6 text-lg leading-8 text-stone-600">The website starts with information, but the service is grounded in cargo preparation, freight handling, route coordination and movement between two countries.</p></div>
          </Container>
        </section>

        <section className="bg-stone-950 py-20 text-white sm:py-28">
          <Container><div className="max-w-3xl"><p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-200/70">Why Ship Joe</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.07em] sm:text-6xl">A focused Nigeria ↔ UK shipping service.</h2><p className="mt-6 text-lg leading-8 text-stone-300">Ship Joe brings together route-specific support, air and sea freight options, quote-led shipment information and tracking access in one clear service journey.</p></div><div className="mt-12 grid gap-5 border-t border-stone-800 pt-8 sm:grid-cols-2 lg:grid-cols-4">{["Nigeria ↔ UK focus", "Air and sea options", "Quote-led shipment details", "Tracking access"].map((item) => <p key={item} className="text-sm font-medium text-stone-200">{item}</p>)}</div></Container>
        </section>

        <section className="border-b border-stone-200 bg-white py-20 sm:py-28"><Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs uppercase tracking-[0.28em] text-stone-500">Decision support</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.07em] text-stone-900 sm:text-6xl">Not sure how your shipment should move?</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">Tell us what you are shipping, where it is going and the shipment details. The quote process collects the information needed to review the appropriate option.</p></div><div className="flex flex-wrap gap-3"><PrimaryButton href="/quote">Get a quote</PrimaryButton><SecondaryButton href="/track">Track shipment</SecondaryButton></div></Container></section>

        <section className="bg-stone-50 py-20 sm:py-28"><Container><SectionHeading eyebrow="Service FAQ" title="Questions before the route begins." description="Clear answers for the practical decisions behind a Nigeria ↔ UK shipment." /><div className="mt-10 max-w-4xl"><FAQAccordion items={servicesPageFaq} /></div></Container></section>

        <section className="relative overflow-hidden bg-stone-950 py-24 text-white sm:py-32"><div className="absolute inset-0 opacity-20"></div><Container className="relative"><p className="text-xs uppercase tracking-[0.28em] text-sky-200/70">Arrival / next step</p><h2 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.08em] sm:text-7xl">Let&apos;s get your shipment moving.</h2><div className="mt-8 flex flex-wrap gap-4"><PrimaryButton href="/quote">Get a quote</PrimaryButton><SecondaryButton href="/track" className="!border-stone-700 !bg-stone-900 !text-white hover:!bg-stone-800">Track shipment</SecondaryButton></div></Container></section>
      </main>
      <Footer />
    </>
  );
}
