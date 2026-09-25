import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = { title: "Privacy Policy | EM Move Logistics", description: "How EM Move Logistics handles information submitted through its website and quote process." };

export default function PrivacyPage() {
  return <PolicyPage eyebrow="Legal / 02" title="Privacy Policy" intro="This policy describes the information EM Move Logistics may receive through this website and how it is used to respond to customer enquiries and support shipping requests." lastUpdated="20 September 2026" sections={[
    { title: "Information you provide", content: <p>When you request a quote, contact EM Move Logistics or use a support form, you may provide your name, email address, phone number, company name, route, shipment type, weight, dimensions, quantity and other shipment notes.</p> },
    { title: "How information is used", content: <p>We use submitted information to respond to enquiries, review shipment requirements, prepare or discuss quotes, coordinate communication and provide requested support. We do not use shipment information for unrelated purposes without an appropriate basis or your permission.</p> },
    { title: "Sharing information", content: <p>Information may need to be shared with relevant service providers or transport and logistics partners when necessary to review or coordinate a requested shipment. We do not sell personal information.</p> },
    { title: "Retention and security", content: <p>Information should be kept only for as long as reasonably necessary for the purpose for which it was collected, legal obligations and dispute handling. Reasonable safeguards should be used to protect information, although no internet transmission can be guaranteed completely secure.</p> },
    { title: "Your questions and rights", content: <p>For privacy questions or requests about information submitted to EM Move Logistics, contact info@emmovelogistics.com. The applicable rights and response process may depend on your location and the final legal structure of the business.</p> },
    { title: "Cookies and analytics", content: <p>This website may use essential technical storage and may add analytics or other tools as the product develops. Any non-essential tracking should be disclosed and managed through an appropriate consent mechanism before launch.</p> },
  ]} />;
}
