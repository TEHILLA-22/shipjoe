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
      "For larger or less time-sensitive cargo, sea freight provides a cost-conscious option for moving goods from Nigeria to the UK and onward across the European Union with a defined operational rhythm.",
    shortDescription:
      "Flexible sea shipping for large and regular consignments to the UK and Europe.",
    direction: "both",
    method: "sea",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    routeLabel: "Nigeria → UK + Europe sea lanes",
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
    question: "What shipping routes does EM Move Logistics handle?",
    answer:
      "EM Move Logistics ships from Nigeria to the United Kingdom by air and sea, and from Nigeria to destinations across the European Union by sea. Routes can be tailored for commercial cargo, parcels, and personal shipments.",
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

export const servicesPageMethods = [
  {
    name: "Air Freight",
    kicker: "When speed matters",
    description: "Air freight is suited to urgent cargo, parcels and commercial consignments that need a faster route between Nigeria and the UK.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Aircraft wing above the clouds",
    route: "Nigeria ↔ UK",
    tone: "light",
  },
  {
    name: "Sea Freight",
    kicker: "For larger shipments",
    description: "Sea freight is suited to larger, bulk or less time-sensitive cargo moving from Nigeria to the United Kingdom and onward to destinations across the European Union with deliberate route coordination.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Container ship moving through open water",
    route: "Nigeria → UK + Europe",
    tone: "dark",
  },
] as const;

export const serviceJourney = [
  { id: "01", title: "Request", description: "Share your route, cargo type, weight, dimensions and contact details." },
  { id: "02", title: "Prepare", description: "The shipment information is reviewed before the route and method are confirmed." },
  { id: "03", title: "Collect", description: "The shipment moves into the arranged collection and handling process." },
  { id: "04", title: "Transit", description: "Cargo travels between Nigeria and the UK by the selected freight method." },
  { id: "05", title: "Arrive", description: "The shipment reaches its destination side of the route." },
  { id: "06", title: "Deliver", description: "The journey closes with destination coordination and delivery." },
] as const;

export const servicesPageFaq: FaqItem[] = [
  { question: "Can I ship from Nigeria to the UK?", answer: "Yes. EM Move Logistics supports Nigeria to UK shipping across air and sea freight options, depending on the shipment details." },
  { question: "Do you ship from Nigeria to Europe?", answer: "Yes. Sea freight runs from Nigeria to the United Kingdom and onward to all EU member states, so larger consignments can be moved to destinations across Europe. Provide the destination country with your quote request." },
  { question: "Do you offer air freight to Europe?", answer: "Air freight is currently Nigeria to the UK only. For European destinations, request a sea freight quote and include the destination country." },
  { question: "Can I ship from the UK to Nigeria?", answer: "Yes. UK to Nigeria is also supported as a route direction. Request a quote with your shipment information so the route can be reviewed." },
  { question: "What is the difference between air and sea freight?", answer: "Air freight is suited to urgent cargo and faster international movement. Sea freight is suited to larger, bulk or less time-sensitive cargo." },
  { question: "What information is needed for a quote?", answer: "The quote process asks for the route, shipment type, weight, dimensions, quantity, description and your contact details." },
  { question: "What is the current price per kilogram?", answer: "The listed rate is £1.50 per kg. The quote process is still the right place to provide the complete shipment details." },
  { question: "How do I track a shipment?", answer: "Use the Track shipment page to submit your tracking number. The live results panel can be connected to the tracking backend." },
];
