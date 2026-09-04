import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Junk Removal and Hauling',
  description:
    'Local junk removal and hauling in Rhode Island from All Purpose Contractors LLC. Debris, furniture, and cleanouts scoped before pickup.',
  alternates: { canonical: `${SITE.domain}/services/junk-removal` },
};

export default function JunkRemovalPage() {
  return (
    <SiteShell>
      <PageHero
        title="Junk Removal and Hauling"
        description="Local hauling for debris, discarded furniture, and cleanouts—quoted before the van is sent."
      />
      <section className="bg-white py-16">
        <div className="container-custom grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="headline mb-4 text-3xl text-navy">Clear it out, haul it off</h2>
            <p className="mb-4 text-lg text-muted">
              APC provides local junk removal and hauling around Warwick, Providence, and nearby
              Rhode Island communities. This service is for discard and debris work, not interstate
              moving.
            </p>
            <ul className="mb-8 space-y-2 text-navy">
              <li>Household junk and clutter removal</li>
              <li>Furniture and appliance haul-away</li>
              <li>Yard waste and renovation debris</li>
              <li>Donation drop-off for usable items when practical</li>
            </ul>
            <p className="mb-6 text-sm text-muted">
              Loads are scoped in advance. Same-day junk removal is offered only when the van is
              available.
            </p>
            <Link href="/quote?serviceType=junkRemoval" className="btn-primary">
              Book a haul
            </Link>
          </div>
          <PhotoPlaceholder
            title="Local junk removal job"
            need="A real APC hauling or cleanout photo in Rhode Island. Avoid any image that implies a full household move."
          />
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}
