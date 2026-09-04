import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Business Delivery Routes',
  description:
    'Recurring and scheduled cargo van delivery for Rhode Island businesses, including retailers, contractors, warehouses, and e-commerce operators.',
  alternates: { canonical: `${SITE.domain}/services/business-delivery` },
};

export default function BusinessDeliveryPage() {
  return (
    <SiteShell>
      <PageHero
        title="Business Delivery"
        description="Recurring cargo van routes for companies that need freight moved on a reliable schedule."
      />
      <section className="bg-white py-16">
        <div className="container-custom grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="headline mb-4 text-3xl text-navy">Need deliveries every week?</h2>
            <p className="mb-4 text-lg text-muted">
              APC supports retailers, contractors, property managers, offices, warehouses,
              furniture businesses, and e-commerce operators with one-time and recurring cargo van
              delivery.
            </p>
            <p className="mb-6 text-lg text-muted">
              Routes are quoted from pickup windows, access, volume, and destination—not from a
              published rate card. Same-day business delivery is offered when the van is available.
            </p>
            <ul className="mb-8 space-y-2 text-navy">
              <li>Warwick and Providence area pickups</li>
              <li>Regional and continental U.S. property transport</li>
              <li>Direct scheduling with the operator</li>
              <li>Available 24/7 for time-sensitive freight</li>
            </ul>
            <Link href="/quote?serviceType=retailDelivery" className="btn-primary">
              Discuss a Recurring Route
            </Link>
          </div>
          <PhotoPlaceholder
            title="Business delivery in progress"
            need="A real APC drop-off at a store, warehouse dock, or job site. No stock photos."
          />
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}
