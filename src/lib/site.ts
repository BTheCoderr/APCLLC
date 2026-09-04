export const SITE = {
  legalName: "All Purpose Contractors LLC",
  shortName: "APC LLC",
  domain: "https://apcllc.co",
  phoneDisplay: "(401) 602-4943",
  phoneTel: "+14016024943",
  email: "info@apcllc.co",
  city: "Warwick",
  region: "Rhode Island",
  regionCode: "RI",
  country: "US",
  availability: "24/7",
  usdot: "4402106",
  mc: "1728118",
  authority:
    "Authorized interstate motor carrier of property, except household goods",
  tagline: "Fast, dependable cargo van delivery from Rhode Island to destinations across the continental U.S.",
  socials: {
    instagram: "https://www.instagram.com/apcllcri",
    facebook: "https://www.facebook.com/apcllcri",
    twitter: "https://twitter.com/apcllcri",
    linkedin: "https://www.linkedin.com/company/all-purpose-contractors-llc",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services/business-delivery", label: "Business Delivery" },
  { href: "/services/junk-removal", label: "Junk Removal" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/services/business-delivery", label: "Business Delivery" },
  { href: "/services/cargo-van-transport", label: "Cargo Van Transport" },
  { href: "/services/junk-removal", label: "Junk Removal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get a Quote" },
] as const;

export const SERVICE_TYPE_VALUES = [
  "cargoTransport",
  "retailDelivery",
  "junkRemoval",
  "localPickup",
  "residentialMoving",
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPE_VALUES)[number];

export const SERVICE_TYPE_OPTIONS: {
  value: ServiceTypeValue;
  label: string;
  shortLabel: string;
}[] = [
  {
    value: "cargoTransport",
    label: "Cargo Van Transport",
    shortLabel: "Cargo van transport",
  },
  {
    value: "retailDelivery",
    label: "Business Delivery",
    shortLabel: "Business delivery",
  },
  {
    value: "junkRemoval",
    label: "Junk Removal & Hauling",
    shortLabel: "Junk removal",
  },
  {
    value: "localPickup",
    label: "Local Pickup & Drop-Off",
    shortLabel: "Local pickup",
  },
  {
    value: "residentialMoving",
    label: "Local residential hauling (not interstate household goods)",
    shortLabel: "Local residential hauling",
  },
];

export const SERVICE_TYPE_DISPLAY: Record<string, string> = Object.fromEntries(
  SERVICE_TYPE_OPTIONS.map((option) => [option.value, option.label])
);

export function telHref(): string {
  return `tel:${SITE.phoneTel}`;
}

export function smsHref(): string {
  return `sms:${SITE.phoneTel}`;
}

export function mailHref(subject?: string): string {
  if (!subject) return `mailto:${SITE.email}`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}
