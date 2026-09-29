import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { aboutConfidence } from "@/data/about";

export function ConfidenceSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-900 mb-12">
              EM MOVE LOGISTICS SPECIFICATIONS
            </h2>
            
            <div className="border-t border-stone-200">
              <dl className="divide-y divide-stone-200 text-sm">
                <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] py-6 gap-4">
                  <dt className="font-medium text-stone-500 uppercase tracking-[0.1em] text-xs">Operating Corridor</dt>
                  <dd className="font-medium text-stone-900">{aboutConfidence.operatingCorridor}</dd>
                </div>
                
                <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] py-6 gap-4">
                  <dt className="font-medium text-stone-500 uppercase tracking-[0.1em] text-xs">Freight Methods</dt>
                  <dd className="font-medium text-stone-900">{aboutConfidence.freightMethods}</dd>
                </div>

                <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] py-6 gap-4">
                  <dt className="font-medium text-stone-500 uppercase tracking-[0.1em] text-xs">European Reach</dt>
                  <dd className="font-medium text-stone-900">{aboutConfidence.europeanDestinations}</dd>
                </div>

                <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] py-6 gap-4">
                  <dt className="font-medium text-stone-500 uppercase tracking-[0.1em] text-xs">Customer Action</dt>
                  <dd className="font-medium text-stone-900">{aboutConfidence.customerAction}</dd>
                </div>
                
                <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-[1fr_3fr] py-6 gap-4">
                  <dt className="font-medium text-stone-500 uppercase tracking-[0.1em] text-xs">Visibility</dt>
                  <dd className="font-medium text-stone-900">{aboutConfidence.visibility}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
