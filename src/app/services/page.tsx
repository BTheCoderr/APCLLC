import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import Services from '@/components/Services';
import CTASection from '@/components/CTASection';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cargo Van Services in Rhode Island',
  description:
    'Business delivery, cargo van transport, and local junk removal from All Purpose Contractors LLC in Warwick, Rhode Island.',
  alternates: { canonical: `${SITE.domain}/services` },
};

const details = [
  {
    href: '/services/business-delivery',
    title: 'Business Delivery',
    copy: 'Recurring and one-off cargo van deliveries for retailers, contractors, property managers, offices, warehouses, furniture businesses, and e-commerce operators.',
    points: [
      'Scheduled and same-day windows when available',
      'B2B transfers and inventory moves',
      'E-commerce overflow and returns',
      'Dedicated van instead of mixed LTL handling',
    ],
  },
  {
    href: '/services/cargo-van-transport',
    title: 'Cargo Van Transport',
    copy: 'Interstate property transport in a high-roof cargo van for freight that does not need a tractor-trailer.',
    points: [
      'Rhode Island origin with continental U.S. destinations',
      'Boxes, appliances, and palletized property that fits the van',
      'Direct operator communication',
      'Quoted from distance, access, and load—not instant online rates',
    ],
  },
  {
    href: '/services/junk-removal',
    title: 'Junk Removal and Hauling',
    copy: 'Local junk removal and hauling around Rhode Island. This is debris and discard work, not a household-goods moving product.',
    points: [
      'Furniture and appliance haul-away',
      'Cleanouts and post-renovation debris',
      'Donation drop-off when items are usable',
      'Scoped before the van is dispatched',
    ],
  },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        title="Services"
        description="Professional cargo van logistics for businesses and individuals, with residential moving kept limited and clearly separate."
      />
      <Services />
      <section className="bg-white py-16">
        <div className="container-custom space-y-10">
          <h2 className="headline text-3xl text-navy md:text-4xl">Service details</h2>
          {details.map((service) => (
            <article key={service.href} className="border border-navy/10 bg-paper p-8">
              <h3 className="headline mb-4 text-2xl text-navy">{service.title}</h3>
              <p className="mb-6 text-muted">{service.copy}</p>
              <ul className="mb-6 grid gap-2 md:grid-cols-2">
                {service.points.map((point) => (
                  <li key={point} className="text-navy">
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="font-semibold text-primary hover:underline">
                Learn more
              </Link>
            </article>
          ))}
          <p className="max-w-3xl text-sm text-muted">
            Local residential hauling may be quoted when the load fits a cargo van. APC does not
            offer interstate household-goods moving. Authority: USDOT {SITE.usdot}, MC {SITE.mc},
            motor carrier of property, except household goods.
          </p>
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}
