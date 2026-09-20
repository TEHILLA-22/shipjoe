import type { Metadata } from "next";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const metadata: Metadata = { title: "Refund and Cancellation Policy | Ship Joe", description: "Information about quote cancellations, shipment changes and refund requests." };

export default function RefundsPage() {
  return <PolicyPage eyebrow="Customer policy / 03" title="Refund and Cancellation Policy" intro="This page explains how to raise a cancellation, change or refund question. A final commercial policy should be confirmed for each service and approved before launch." lastUpdated="20 September 2026" sections={[
    { title: "Before a shipment is confirmed", content: <p>A quote request is not a confirmed booking. If you change your mind before Ship Joe confirms a shipment or collects payment, contact us as soon as possible so the request can be closed or updated.</p> },
    { title: "After confirmation", content: <p>Cancellation, amendment and refund options can depend on the stage of the shipment, work already completed, carrier commitments and any non-refundable third-party costs. Contact Ship Joe before making a change so the specific position can be reviewed.</p> },
    { title: "Refund requests", content: <p>Send refund questions to info@shipjoe.com with your name, route, quote or shipment reference and the reason for the request. Do not send payment card numbers or other unnecessary sensitive information by email.</p> },
    { title: "Service disruption", content: <p>If a shipment is delayed, changed or cannot proceed, Ship Joe will communicate the information available for that request and explain the next practical step. This page does not promise a refund, compensation or delivery outcome that has not been separately confirmed.</p> },
    { title: "Policy approval", content: <p>Specific payment methods, booking stages, statutory cancellation rights and refund timelines must be confirmed against the final business model, jurisdictions and carrier arrangements before this policy is treated as a complete legal policy.</p> },
  ]} />;
}
