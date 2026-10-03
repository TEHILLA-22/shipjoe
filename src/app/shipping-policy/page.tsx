import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = { title: "Shipping Policy | EM Move Logistics", description: "How EM Move Logistics handles shipment information, routes, freight methods and pricing." };

export default function ShippingPolicyPage() {
  return <PolicyPage eyebrow="Customer policy / 04" title="Shipping Policy" intro="This policy gives customers a clear view of the information and stages involved in a Nigeria ↔ UK ↔ Europe shipment." lastUpdated="20 September 2026" sections={[
    { title: "Routes and freight methods", content: <p>EM Move Logistics ships from Nigeria to the United Kingdom by air freight and by sea freight. Sea freight also serves destinations across the European Union, covering all 27 member states. A UK to Nigeria route is also available for shipments travelling in the opposite direction. The appropriate method depends on the shipment details, route, cargo type, weight, dimensions, quantity and timing requirements.</p> },
    { title: "Shipment information", content: <p>Customers should provide accurate information about what is being shipped, where it is coming from, where it is going, its weight, dimensions, quantity and any other relevant description. Additional information may be needed before a quote or shipment can be confirmed.</p> },
    { title: "Price information", content: <p>Published rates are Nigeria to Europe by sea freight at 3.00 per kg, Nigeria to the United Kingdom by sea freight at 1.50 per kg, United Kingdom to Nigeria by air freight at 5.10 per kg, and Nigeria to the United Kingdom by air freight priced in Naira. The quote form shows an instant estimate for these routes. The final quote and any applicable charges should be confirmed by EM Move Logistics for the complete shipment details before booking or payment.</p> },
    { title: "Restricted goods and documentation", content: <p>Customers are responsible for providing accurate goods information and any documentation requested for the route. EM Move Logistics may pause review or decline a request where the goods, paperwork or applicable transport requirements are unclear.</p> },
    { title: "Questions", content: <p>For a route or freight question, contact info@emmovelogistics.com or +44 7944 036 116 and include your quote reference where available.</p> },
  ]} />;
}
