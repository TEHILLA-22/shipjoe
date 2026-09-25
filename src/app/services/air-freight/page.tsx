import type { Metadata } from "next";
import { ServiceMethodPage } from "@/components/services/ServiceMethodPage";

export const metadata: Metadata = {
  title: "Air Freight | EM Move Logistics",
  description: "Air freight shipping between Nigeria and the UK for urgent cargo and international movement.",
};

export default function AirFreightPage() {
  return <ServiceMethodPage method="air" title="Air Freight" headline="When speed matters, move by air." description="Air freight is suited to urgent business cargo, commercial consignments and time-sensitive parcels moving between Nigeria and the UK." image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80" imageAlt="Aircraft wing above the clouds" suitableFor="Urgent cargo and parcels" considerations="Weight, dimensions, quantity and shipment description help shape the quote." />;
}
