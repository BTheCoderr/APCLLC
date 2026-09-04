import type { Metadata } from 'next';
import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About APC LLC',
  description:
    'All Purpose Contractors LLC is an owner-operated cargo van logistics company based in Warwick, Rhode Island, offering insured property transport across the continental U.S.',
  alternates: { canonical: `${SITE.domain}/about` },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        title="About APC LLC"
        description="Owner-operated cargo van logistics based in Warwick, Rhode Island."
      />
      <section className="bg-white py-16">
        <div className="container-custom grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="headline mb-5 text-3xl text-navy">Built around the van, not a moving slogan</h2>
            <p className="mb-4 text-lg text-muted">
              All Purpose Contractors LLC provides professional cargo van transport for businesses
              and individuals. The work is property freight: same-day runs, scheduled deliveries,
              long-distance cargo van transport, and local junk removal.
            </p>
            <p className="mb-4 text-lg text-muted">
              Founded by operators with backgrounds in logistics and customer-facing transport, APC
              is set up for direct communication and insured, legal property hauling.
            </p>
            <p className="text-lg text-muted">
              Interstate household-goods moving is not advertised and is not part of APC&apos;s
              operating authority. Local residential hauling, when offered, is scoped separately
              from business freight.
            </p>
          </div>
          <div className="space-y-6">
            <div className="border-l-2 border-accent bg-paper p-6">
              <h3 className="mb-2 font-bold text-navy">Fully insured</h3>
              <p className="text-muted">
                Cargo van transportation is insured. Jobs are quoted against the actual load, access,
                and distance.
              </p>
            </div>
            <div className="border-l-2 border-accent bg-paper p-6">
              <h3 className="mb-2 font-bold text-navy">Authorized property carrier</h3>
              <p className="text-muted">
                USDOT {SITE.usdot} · MC {SITE.mc}. Authorized interstate motor carrier of property,
                except household goods.
              </p>
            </div>
            <div className="border-l-2 border-accent bg-paper p-6">
              <h3 className="mb-2 font-bold text-navy">Based in Warwick</h3>
              <p className="text-muted">
                Dispatch is in Warwick, Rhode Island, with coverage across Providence and the
                continental United States for freight that fits a cargo van.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-paper py-16">
        <div className="container-custom">
          <h2 className="headline mb-4 text-3xl text-navy">Mission</h2>
          <p className="mb-10 max-w-3xl text-lg text-muted">
            Move freight quickly, communicate directly, and keep the paperwork and authority
            language accurate. APC is available 24/7 and responds with real availability—not a
            guaranteed slot until the quote is approved.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <PhotoPlaceholder
              title="Owner / operator"
              need="A real photograph of the APC operator with the van, used only with permission."
            />
            <PhotoPlaceholder
              title="Warwick base of operations"
              need="A non-private operational photo from the Warwick / Providence area. Do not publish a residential street address."
            />
          </div>
          <Link href="/quote" className="btn-primary mt-10">
            Get a Quote
          </Link>
        </div>
      </section>
      <CTASection />
    </SiteShell>
  );
}
