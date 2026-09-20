import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProcessTransit } from "@/components/motion/ProcessTransit";
import { RouteAnimation } from "@/components/motion/RouteAnimation";
import { Container } from "@/components/ui/Container";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Buttons";
import { SectionHeading } from "@/components/ui/SectionHeading";

type MethodPageProps = {
  method: "air" | "sea";
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  suitableFor: string;
  considerations: string;
};

export function ServiceMethodPage({ method, title, headline, description, image, imageAlt, suitableFor, considerations }: MethodPageProps) {
  const isAir = method === "air";

  return (
    <>
      <Header />
      <main>
        <section className={`relative overflow-hidden py-10 text-white sm:py-16 ${isAir ? "bg-[#101c2d]" : "bg-stone-950"}`}>
          <div className="absolute inset-0 opacity-30"><Image src={image} alt="" fill sizes="100vw" className="object-cover" priority /><div className="absolute inset-0 bg-stone-950/75" /></div>
          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-200/75">Services / {title}</p>
                <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] sm:text-7xl">{headline}</h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">{description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4"><PrimaryButton href="/quote">Request a quote</PrimaryButton><span className="text-sm text-stone-300">Listed rate: <strong className="text-white">£1.50 per kg</strong></span></div>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
                <ImageReveal direction={isAir ? "right" : "left"} className="aspect-[4/3] overflow-hidden rounded-2xl"><Image src={image} alt={imageAlt} width={1600} height={1200} sizes="(min-width: 1024px) 56vw, 100vw" className="h-full w-full object-cover" priority /></ImageReveal>
                <div className="flex justify-between px-1 pt-4 text-[10px] uppercase tracking-[0.24em] text-sky-100/65"><span>Nigeria / origin</span><span>UK / destination</span></div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-stone-200 bg-white py-16 sm:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div><p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">{title} / route</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.07em] text-stone-900 sm:text-6xl">Nigeria ↔ UK.</h2><p className="mt-5 max-w-md text-lg leading-8 text-stone-600">The same service corridor works in both directions. Provide the origin, destination and shipment details when requesting a quote.</p></div>
              <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 sm:p-8"><RouteAnimation className="mx-auto" /><div className="mt-5 flex justify-between text-xs font-medium uppercase tracking-[0.22em] text-stone-500"><span>Nigeria</span><span>{isAir ? "Air corridor" : "Sea lane"}</span><span>United Kingdom</span></div></div>
            </div>
          </Container>
        </section>

        <section className="bg-stone-50 py-16 sm:py-24"><Container><SectionHeading eyebrow={`Why ${title}`} title={isAir ? "When speed matters, move by air." : "For larger shipments and deliberate movement."} description={description} /><div className="mt-12 grid gap-0 border-y border-stone-300 md:grid-cols-3"><div className="border-b border-stone-300 p-6 md:border-b-0 md:border-r"><p className="text-xs uppercase tracking-[0.22em] text-stone-500">Suitable for</p><h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">{suitableFor}</h3></div><div className="border-b border-stone-300 p-6 md:border-b-0 md:border-r"><p className="text-xs uppercase tracking-[0.22em] text-stone-500">Route</p><h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Nigeria ↔ UK</h3><p className="mt-3 leading-7 text-stone-600">{isAir ? "Urgent business cargo, commercial consignments and time-sensitive parcels." : "Larger, bulk or less time-sensitive cargo and commercial freight."}</p></div><div className="p-6"><p className="text-xs uppercase tracking-[0.22em] text-stone-500">Considerations</p><h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-stone-900">Details shape the route</h3><p className="mt-3 leading-7 text-stone-600">{considerations}</p></div></div></Container></section>

        <section className="bg-white py-16 sm:py-24"><Container><SectionHeading eyebrow="The shipment journey" title="From request to delivery." description="The quote process collects the shipment information needed before the route and freight method are reviewed." /><div className="mt-10"><ProcessTransit /></div><div className="mt-8 grid gap-4 sm:grid-cols-4">{["Request", "Prepare", "Transit", "Arrive"].map((stage, index) => <div key={stage} className="border-l border-stone-300 pl-4"><p className="text-xs uppercase tracking-[0.22em] text-stone-500">0{index + 1}</p><p className="mt-2 font-medium text-stone-900">{stage}</p></div>)}</div></Container></section>

        <section className="border-t border-stone-200 bg-stone-950 py-16 text-white sm:py-24"><Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs uppercase tracking-[0.28em] text-sky-200/70">Ready to move?</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.07em] sm:text-6xl">Share the route and cargo details.</h2></div><div className="flex flex-wrap gap-3"><PrimaryButton href="/quote">Get a quote</PrimaryButton><SecondaryButton href="/services" className="!border-stone-700 !bg-stone-900 !text-white hover:!bg-stone-800">All services</SecondaryButton></div></Container></section>
      </main>
      <Footer />
    </>
  );
}
