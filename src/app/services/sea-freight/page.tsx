import type { Metadata } from "next";
import { ServiceMethodPage } from "@/components/services/ServiceMethodPage";

export const metadata: Metadata = {
  title: "Sea Freight | EM Move Logistics",
  description: "Sea freight from Nigeria to the UK and across the EU for larger consignments and route-based cargo handling.",
};

export default function SeaFreightPage() {
  return <ServiceMethodPage method="sea" title="Sea Freight" headline="For larger shipments and deliberate movement." description="Sea freight is suited to larger, bulk or less time-sensitive cargo moving from Nigeria to the United Kingdom and onward to destinations across the European Union, with planned coordination and handling." image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80" imageAlt="Container ship moving through open water" suitableFor="Larger and bulk cargo" considerations="Weight, dimensions, quantity, destination country and cargo description help shape the quote." />;
}
