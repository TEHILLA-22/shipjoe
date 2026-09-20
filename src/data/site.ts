export type RouteDirection = "nigeria-to-uk" | "uk-to-nigeria" | "both";
export type FreightMethod = "air" | "sea" | "freight";

export type Service = {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  direction: RouteDirection;
  method: FreightMethod;
  image: string;
  routeLabel: string;
  shipmentTypes: string[];
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navigation = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/track", label: "Track shipment" },
];

export const services: Service[] = [
  {
    slug: "air-freight",
    title: "Air Freight",
    description:
      "Time-sensitive shipments between Nigeria and the UK benefit from a streamlined air freight process designed for urgency, visibility, and careful handling.",
    shortDescription:
      "Fast international air transport for urgent cargo, parcels and commercial consignments.",
    direction: "both",
    method: "air",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    routeLabel: "Nigeria ↔ UK air routes",
    shipmentTypes: ["Commercial cargo", "Urgent parcels", "Business consignments"],
    cta: "Request air freight quote",
  },
  {
    slug: "sea-freight",
    title: "Sea Freight",
    description:
      "For larger or less time-sensitive cargo, sea freight provides a cost-conscious option for moving goods between Nigeria and the UK with a defined operational rhythm.",
    shortDescription:
      "Flexible sea shipping for large and regular consignments across the route.",
    direction: "both",
    method: "sea",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    routeLabel: "Nigeria ↔ UK sea lanes",
    shipmentTypes: ["Container cargo", "Bulk shipments", "Commercial freight"],
    cta: "Request sea freight quote",
  },
  {
    slug: "uk-to-nigeria",
    title: "UK → Nigeria",
    description:
      "A dedicated route for freight leaving the UK and arriving in Nigeria, with coordinated collection and delivery steps that keep your shipment moving efficiently.",
    shortDescription:
      "Reliable UK to Nigeria shipping for commercial and personal cargo.",
    direction: "uk-to-nigeria",
    method: "freight",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    routeLabel: "UK to Nigeria",
    shipmentTypes: ["Parcel", "Commercial cargo", "Personal effects"],
    cta: "Plan UK → Nigeria shipment",
  },
  {
    slug: "nigeria-to-uk",
    title: "Nigeria → UK",
    description:
      "A clear route for shipments moving from Nigeria to the UK, covering the collection, customs preparation, and onward delivery process from one side of the journey to the other.",
    shortDescription:
      "Structured Nigeria to UK shipping for parcels, cargo and business freight.",
    direction: "nigeria-to-uk",
    method: "freight",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    routeLabel: "Nigeria to UK",
    shipmentTypes: ["Parcel", "Commercial cargo", "Personal effects"],
    cta: "Plan Nigeria → UK shipment",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What shipping routes does Ship Joe handle?",
    answer:
      "Ship Joe supports international shipping between Nigeria and the United Kingdom across both air and sea freight services. Routes can be tailored for commercial cargo, parcels, and personal shipments.",
  },
  {
    question: "Do you offer both air and sea freight?",
    answer:
      "Yes. Air freight is suited to faster, time-sensitive shipments, while sea freight is often used for larger or less urgent cargo. The best method depends on the shipment type, timing and volume.",
  },
  {
    question: "Can I request a quote for a commercial shipment?",
    answer:
      "Yes. The quote form includes shipment details and contact information so the right team can review your requirement and follow up with the appropriate route and method information.",
  },
  {
    question: "How do I track a shipment?",
    answer:
      "Use the tracking page to submit a tracking number. Once the live backend is connected, tracking information will appear in the dedicated results panel.",
  },
  {
    question: "What information do I need before requesting a quote?",
    answer:
      "A basic shipment summary helps: route, type of goods, weight, dimensions, quantity and a short description. You will also be asked for your name, email and phone number for follow-up.",
  },
];

export const processSteps = [
  {
    id: "01",
    title: "Request",
    description: "Tell us what you are shipping and where it needs to go.",
  },
  {
    id: "02",
    title: "Collection",
    description: "We arrange the shipment process from collection to preparation.",
  },
  {
    id: "03",
    title: "Transit",
    description: "Your shipment travels between Nigeria and the UK with route visibility.",
  },
  {
    id: "04",
    title: "Delivery",
    description: "Your shipment reaches its destination and the cycle is complete.",
  },
];

export const trustPoints = [
  "Nigeria ↔ UK specialization",
  "Air and sea freight support",
  "Shipment coordination and communication",
  "Freight handling for business and personal cargo",
  "Dedicated route support for both directions",
  "International logistics focus",
];

export const routeHighlights = [
  "Collection",
  "Documentation",
  "Transit",
  "Delivery",
];

export const homepageStats = [
  { label: "Routes", value: "2" },
  { label: "Freight methods", value: "Air + Sea" },
  { label: "Support", value: "Quote & track" },
];

export const shippingMethods = [
  { name: "Air Freight", description: "Fast international movement for urgent cargo." },
  { name: "Sea Freight", description: "Capable freight support for larger cargo loads." },
  { name: "UK → Nigeria", description: "Route-specific coordination for shipments leaving the UK." },
  { name: "Nigeria → UK", description: "Route-specific coordination for shipments leaving Nigeria." },
];
