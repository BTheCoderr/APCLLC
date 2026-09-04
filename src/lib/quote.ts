import {
  SERVICE_TYPE_DISPLAY,
  SERVICE_TYPE_VALUES,
  type ServiceTypeValue,
} from "./site";

export type QuoteFormFields = {
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  serviceType: string;
  pickupLocation: string;
  pickupZip: string;
  deliveryLocation: string;
  deliveryZip: string;
  date: string;
  preferredTime: string;
  itemCategory: string;
  quantity: string;
  approximateWeight: string;
  dimensions: string;
  loadingAssistance: string;
  stairsAccess: string;
  urgency: string;
  details: string;
  consent: boolean;
};

export type QuoteStarterParams = {
  pickupZip?: string;
  deliveryZip?: string;
  serviceType?: string;
  date?: string;
};

export type QuoteApiPayload = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  pickupLocation: string;
  deliveryLocation: string;
  date: string;
  details: string;
  preferredContactMethod?: string;
  pickupZip?: string;
  deliveryZip?: string;
  preferredTime?: string;
  itemCategory?: string;
  quantity?: string;
  approximateWeight?: string;
  dimensions?: string;
  loadingAssistance?: string;
  stairsAccess?: string;
  urgency?: string;
  consent?: boolean;
};

const EXTRA_LABELS: { key: keyof QuoteFormFields; label: string }[] = [
  { key: "preferredContactMethod", label: "Preferred contact method" },
  { key: "pickupZip", label: "Pickup ZIP" },
  { key: "deliveryZip", label: "Delivery ZIP" },
  { key: "preferredTime", label: "Preferred time" },
  { key: "itemCategory", label: "Item category" },
  { key: "quantity", label: "Quantity" },
  { key: "approximateWeight", label: "Approximate weight" },
  { key: "dimensions", label: "Dimensions" },
  { key: "loadingAssistance", label: "Loading assistance needed" },
  { key: "stairsAccess", label: "Stairs or access considerations" },
  { key: "urgency", label: "Urgency" },
];

export function isServiceType(value: string): value is ServiceTypeValue {
  return (SERVICE_TYPE_VALUES as readonly string[]).includes(value);
}

export function parseQuoteStarterParams(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): QuoteStarterParams {
  const read = (key: string): string => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key)?.trim() || "";
    }
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0]?.trim() || "";
    return value?.trim() || "";
  };

  const serviceType = read("serviceType") || read("service");
  const pickupZip = read("pickupZip") || read("pickup");
  const deliveryZip = read("deliveryZip") || read("delivery");
  const date = read("date");

  return {
    pickupZip: pickupZip || undefined,
    deliveryZip: deliveryZip || undefined,
    serviceType: serviceType && isServiceType(serviceType) ? serviceType : undefined,
    date: date || undefined,
  };
}

export function buildQuoteStarterHref(params: QuoteStarterParams): string {
  const query = new URLSearchParams();
  if (params.pickupZip) query.set("pickupZip", params.pickupZip);
  if (params.deliveryZip) query.set("deliveryZip", params.deliveryZip);
  if (params.serviceType) query.set("serviceType", params.serviceType);
  if (params.date) query.set("date", params.date);
  const encoded = query.toString();
  return encoded ? `/quote?${encoded}` : "/quote";
}

export function composeQuoteDetails(fields: QuoteFormFields): string {
  const extras = EXTRA_LABELS.map(({ key, label }) => {
    const value = fields[key];
    if (typeof value !== "string" || !value.trim()) return "";
    return `${label}: ${value.trim()}`;
  }).filter(Boolean);

  const notes = fields.details.trim();
  return [...extras, notes ? `Additional details:\n${notes}` : ""]
    .filter(Boolean)
    .join("\n");
}

export function buildQuoteApiPayload(fields: QuoteFormFields): QuoteApiPayload {
  const pickupLocation =
    fields.pickupLocation.trim() || fields.pickupZip.trim();
  const deliveryLocation =
    fields.deliveryLocation.trim() || fields.deliveryZip.trim();

  return {
    name: fields.name.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim(),
    serviceType: fields.serviceType,
    pickupLocation,
    deliveryLocation,
    date: fields.date,
    details: composeQuoteDetails(fields),
    preferredContactMethod: fields.preferredContactMethod || undefined,
    pickupZip: fields.pickupZip.trim() || undefined,
    deliveryZip: fields.deliveryZip.trim() || undefined,
    preferredTime: fields.preferredTime || undefined,
    itemCategory: fields.itemCategory || undefined,
    quantity: fields.quantity.trim() || undefined,
    approximateWeight: fields.approximateWeight.trim() || undefined,
    dimensions: fields.dimensions.trim() || undefined,
    loadingAssistance: fields.loadingAssistance || undefined,
    stairsAccess: fields.stairsAccess || undefined,
    urgency: fields.urgency || undefined,
    consent: fields.consent,
  };
}

export function displayServiceType(value: string): string {
  return SERVICE_TYPE_DISPLAY[value] || value;
}

export function validateQuotePayload(data: Partial<QuoteApiPayload>): string | null {
  if (!data.name || !data.email || !data.phone || !data.serviceType) {
    return "Missing required fields";
  }
  if (!data.pickupLocation || !data.deliveryLocation) {
    return "Missing required fields";
  }
  return null;
}
