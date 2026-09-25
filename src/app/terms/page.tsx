import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = { title: "Terms of Service | EM Move Logistics", description: "Terms that apply when using EM Move Logistics services and website." };

export default function TermsPage() {
  return <PolicyPage eyebrow="Legal / 01" title="Terms of Service" intro="These terms explain the basic conditions for using the EM Move Logistics website, requesting a quote and engaging with our Nigeria ↔ UK shipping services." lastUpdated="20 September 2026" sections={[
    { title: "Using this website", content: <p>Use this website lawfully and provide accurate information when requesting a quote, asking for support or submitting shipment details. Website content is provided for general information and may change as our services and processes develop.</p> },
    { title: "Quotes and shipment information", content: <p>A quote request is an enquiry, not a confirmed booking. Any price, route, method or service detail should be confirmed by EM Move Logistics before a shipment is accepted. You are responsible for providing complete and accurate information about the origin, destination, goods, weight, dimensions and quantity.</p> },
    { title: "Prohibited or restricted goods", content: <p>Do not submit or tender goods that are unlawful, unsafe, prohibited by an applicable carrier or restricted by customs or transport rules. EM Move Logistics may request more information or decline a shipment where its contents, documentation or route requirements cannot be confirmed.</p> },
    { title: "Third-party services and links", content: <p>Shipping may involve carriers, transport providers, customs authorities or other third parties. Their terms may also apply. Links to third-party websites are provided for convenience and are not controlled by EM Move Logistics.</p> },
    { title: "Changes and contact", content: <p>We may update these terms as the website and services change. The latest version will be published on this page. Contact EM Move Logistics before relying on a policy or service detail for a particular shipment.</p> },
  ]} />;
}
