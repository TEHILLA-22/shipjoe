import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = { title: "Shipping and Tracking Policy | Ship Joe", description: "How Ship Joe handles shipment information, route coordination and tracking support." };

export default function ShippingPolicyPage() {
  return <PolicyPage eyebrow="Customer policy / 04" title="Shipping and Tracking Policy" intro="This policy gives customers a clear view of the information and stages involved in a Nigeria ↔ UK shipment." lastUpdated="20 September 2026" sections={[
    { title: "Routes and freight methods", content: <p>Ship Joe supports shipping between Nigeria and the United Kingdom, including air and sea freight options. The appropriate method depends on the shipment details, route, cargo type, weight, dimensions, quantity and timing requirements.</p> },
    { title: "Shipment information", content: <p>Customers should provide accurate information about what is being shipped, where it is coming from, where it is going, its weight, dimensions, quantity and any other relevant description. Additional information may be needed before a quote or shipment can be confirmed.</p> },
    { title: "Price information", content: <p>The listed rate is £1.50 per kg. The final quote and any applicable charges should be confirmed by Ship Joe for the complete shipment details before booking or payment.</p> },
    { title: "Tracking", content: <p>Use the Track shipment page with the tracking number provided for your shipment. Tracking visibility depends on the connected service and available shipment data. A tracking page submission does not itself create a shipment or guarantee a live result.</p> },
    { title: "Restricted goods and documentation", content: <p>Customers are responsible for providing accurate goods information and any documentation requested for the route. Ship Joe may pause review or decline a request where the goods, paperwork or applicable transport requirements are unclear.</p> },
    { title: "Questions", content: <p>For a route or tracking question, contact info@shipjoe.com or +44 7944 036 116 and include your shipment or tracking reference where available.</p> },
  ]} />;
}
