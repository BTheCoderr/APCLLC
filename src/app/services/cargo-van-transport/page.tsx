import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cargo Van Transport',
  description:
    'Interstate cargo van property transport from Rhode Island across the continental United States. USDOT 4402106, MC 1728118.',
  alternates: { canonical: `${SITE.domain}/services/cargo-van-transport` },
};

export default function CargoVanPage() {
  return (
    <SiteShell>
      <PageHero
        title="Cargo Van Transport"
        description="Dedicated high-roof cargo van capacity for property freight that needs to move now, not through a broker network."
      />
      <section className="bg-white py-16">
        <div className="container-custom grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="headline mb-4 text-3xl text-navy">Freight that fits the van</h2>
            <p className="mb-4 text-lg text-muted">
              APC hauls boxes, appliances, retail goods, and palletized property that fits an
              extended high-roof cargo van. Origin is Rhode Island; destinations are across the
              continental United States.
            </p>
            <p className="mb-6 text-lg text-muted">
              This is property transportation under USDOT {SITE.usdot} and MC {SITE.mc}. It is not
              household-goods moving and does not include unauthorized interstate moving of
              household goods.
            </p>
            <ul className="mb-8 space-y-2 text-navy">
              <li>Same-day and scheduled dispatch when available</li>
              <li>Direct pickup-to-delivery with one operator</li>
              <li>Insured cargo van transportation</li>
              <li>Quotes based on miles, access, weight, and handling</li>
            </ul>
            <Link href="/quote?serviceType=cargoTransport" className="btn-primary">
              Request van transport
            </Link>
          </div>
          <PhotoPlaceholder
            title="Van interior / load securement"
            need="Photograph of freight secured in the APC cargo van. No generic stock van interiors."
          />
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}
