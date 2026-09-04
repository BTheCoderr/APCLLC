import type { Metadata } from 'next';
import { Suspense } from 'react';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import QuoteForm from '@/components/QuoteForm';
import { SITE, mailHref, smsHref, telHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Request cargo van delivery, business freight, or junk removal pricing from APC LLC. Availability and pricing are confirmed after we review the details.',
  alternates: { canonical: `${SITE.domain}/quote` },
};

export default function QuotePage() {
  return (
    <SiteShell>
      <PageHero
        title="Get a Quote"
        description="Tell APC what is moving and where it needs to go. You will receive availability and pricing—not an instant online rate."
      />
      <section className="bg-paper py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="headline mb-4 text-3xl text-navy">Request your quote</h2>
            <p className="mb-8 text-muted">
              For immediate help,{' '}
              <a href={telHref()} className="font-semibold text-primary">
                call {SITE.phoneDisplay}
              </a>{' '}
              or{' '}
              <a href={smsHref()} className="font-semibold text-primary">
                text APC
              </a>
              .
            </p>
            <Suspense fallback={<div className="bg-white p-8 text-muted">Loading quote form…</div>}>
              <QuoteForm />
            </Suspense>
          </div>
          <aside className="space-y-6">
            <div className="bg-white p-6 shadow-card">
              <h3 className="headline mb-4 text-2xl text-navy">How pricing is set</h3>
              <ul className="space-y-3 text-muted">
                <li>Distance between pickup and delivery</li>
                <li>Size, weight, and quantity</li>
                <li>Loading help, stairs, and access</li>
                <li>Urgency and scheduling</li>
              </ul>
            </div>
            <div className="bg-navy p-6 text-white">
              <h3 className="headline mb-3 text-2xl">Talk to APC</h3>
              <p className="mb-4 text-white/75">Available 24/7. A request does not guarantee a same-day slot.</p>
              <a className="block font-semibold text-accent" href={telHref()}>
                {SITE.phoneDisplay}
              </a>
              <a className="mt-2 block font-semibold text-accent" href={mailHref()}>
                {SITE.email}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
