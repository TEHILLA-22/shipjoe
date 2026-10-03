export const CORE_ROUTES = ["Nigeria", "United Kingdom"] as const;

export const EU_ROUTES = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
] as const;

export const QUOTE_ROUTES = [...CORE_ROUTES, ...EU_ROUTES] as const;

export const NIGERIA = "Nigeria";
export const UNITED_KINGDOM = "United Kingdom";

export type QuoteRoute = (typeof QUOTE_ROUTES)[number];
export type QuoteShipmentType = "Parcel" | "Personal effects" | "Commercial cargo" | "Other";

export type QuoteFormData = {
  origin: QuoteRoute | "";
  destination: QuoteRoute | "";
  shipmentType: QuoteShipmentType | "";
  weight: string;
  dimensions: string;
  quantity: string;
  description: string;
  preferredMethod: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  notes: string;
};

export type QuoteFormErrors = Partial<Record<keyof QuoteFormData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EU_ROUTE_SET: ReadonlySet<string> = new Set(EU_ROUTES);

export const FREIGHT_METHODS = [
  "Air Freight",
  "Sea Freight",
  "Standard freight",
] as const;

export type FreightMethod = (typeof FREIGHT_METHODS)[number];

export function isEuCountry(country: string): boolean {
  return EU_ROUTE_SET.has(country.trim());
}

export function availableMethods(
  destination: string,
): readonly FreightMethod[] {
  if (isEuCountry(destination)) {
    return ["Sea Freight"];
  }

  return FREIGHT_METHODS;
}

export function validateQuoteForm(values: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!values.origin) errors.origin = "Please select your shipping origin.";
  if (!values.destination) errors.destination = "Please select your shipping destination.";
  else if (values.destination === values.origin) errors.destination = "Destination must be different from the origin.";
  if (!values.shipmentType) errors.shipmentType = "Please choose a shipment type.";
  if (!values.preferredMethod) {
    errors.preferredMethod = "Please select a preferred method.";
  } else if (!FREIGHT_METHODS.includes(values.preferredMethod as (typeof FREIGHT_METHODS)[number])) {
    errors.preferredMethod = "Invalid shipping method.";
  } else if (isEuCountry(values.destination) && values.preferredMethod !== "Sea Freight") {
    errors.preferredMethod = "Delivery to Europe is available by sea freight only.";
  }
  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Phone number is required.";

  if (values.weight.trim()) {
    const weightValue = Number(values.weight);
    if (Number.isNaN(weightValue) || weightValue <= 0) {
      errors.weight = "Weight must be a positive number.";
    }
  }

  if (values.quantity.trim()) {
    const quantityValue = Number(values.quantity);
    if (Number.isNaN(quantityValue) || quantityValue <= 0) {
      errors.quantity = "Quantity must be a positive number.";
    }
  }

  if (values.dimensions.trim()) {
    const dims = values.dimensions
      .split("x")
      .map((part) => Number(part.trim()))
      .filter((value) => !Number.isNaN(value));
    if (dims.length !== 3 || dims.some((value) => value <= 0)) {
      errors.dimensions = "Dimensions should use the format L x W x H.";
    }
  }

  return errors;
}
