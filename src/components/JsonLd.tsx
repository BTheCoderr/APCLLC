import { SITE } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    name: SITE.legalName,
    alternateName: SITE.shortName,
    url: SITE.domain,
    image: `${SITE.domain}/APCLLC.jpeg`,
    logo: `${SITE.domain}/APCLLC.jpeg`,
    email: SITE.email,
    telephone: SITE.phoneTel,
    description: SITE.tagline,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Rhode Island" },
      { "@type": "AdministrativeArea", name: "Continental United States" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.regionCode,
      addressCountry: SITE.country,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    identifier: [
      {
        "@type": "PropertyValue",
        name: "USDOT",
        value: SITE.usdot,
      },
      {
        "@type": "PropertyValue",
        name: "MC",
        value: SITE.mc,
      },
    ],
    knowsAbout: [
      "Cargo van delivery",
      "Business freight delivery",
      "Interstate property transport",
      "Local junk removal",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
