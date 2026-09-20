import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

type PolicySection = {
  title: string;
  content: ReactNode;
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: PolicySection[];
};

export function PolicyPage({ eyebrow, title, intro, lastUpdated, sections }: PolicyPageProps) {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-stone-200 bg-stone-950 py-20 text-white sm:py-28">
          <Container>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky-200/75">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.08em] sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">{intro}</p>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-stone-500">Last updated: {lastUpdated}</p>
          </Container>
        </section>
        <section className="bg-stone-50 py-16 sm:py-24">
          <Container className="max-w-4xl">
            <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              These policies are published for customer clarity and should receive final review by Ship Joe&apos;s legal and operations advisers before launch.
            </div>
            <div className="mt-12 space-y-12">
              {sections.map((section, index) => (
                <section key={section.title} aria-labelledby={`policy-section-${index}`}>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-500">{String(index + 1).padStart(2, "0")}</p>
                  <h2 id={`policy-section-${index}`} className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-stone-900">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-stone-600">{section.content}</div>
                </section>
              ))}
            </div>
            <div className="mt-16 border-t border-stone-300 pt-8 text-sm leading-7 text-stone-600">
              Questions about these policies can be sent to <a className="font-medium text-stone-900 underline underline-offset-4" href="mailto:info@shipjoe.com">info@shipjoe.com</a> or raised by phone at <a className="font-medium text-stone-900 underline underline-offset-4" href="tel:+447944036116">+44 7944 036 116</a>.
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
