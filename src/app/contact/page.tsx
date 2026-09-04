import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { SITE, mailHref, smsHref, telHref } from '@/lib/site';
import { FiMapPin, FiPhone, FiMail, FiClock, FiMessageSquare } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Contact APC LLC',
  description:
    'Contact All Purpose Contractors LLC in Warwick, Rhode Island for cargo van delivery, business freight, and local junk removal. Available 24/7.',
  alternates: { canonical: `${SITE.domain}/contact` },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        title="Contact Us"
        description="Questions, quotes, or a recurring route—reach APC directly. For urgent freight, call or text."
      />
      <section className="bg-paper py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="headline mb-4 text-3xl text-navy">Send a message</h2>
            <p className="mb-8 text-muted">
              Use the form for non-urgent questions. APC replies with next steps; this is not an
              instant booking.
            </p>
            <ContactForm />
          </div>
          <aside className="bg-white p-8 shadow-card">
            <h2 className="headline mb-6 text-2xl text-navy">Direct contact</h2>
            <div className="space-y-6">
              <div className="flex gap-3">
                <FiMapPin className="mt-1 text-primary" aria-hidden />
                <div>
                  <h3 className="font-bold text-navy">Location</h3>
                  <p className="text-muted">
                    Based in {SITE.city}, {SITE.region}
                    <br />
                    Serving the continental U.S.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiPhone className="mt-1 text-primary" aria-hidden />
                <div>
                  <h3 className="font-bold text-navy">Phone</h3>
                  <a href={telHref()} className="text-primary hover:underline">
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <FiMessageSquare className="mt-1 text-primary" aria-hidden />
                <div>
                  <h3 className="font-bold text-navy">Text</h3>
                  <a href={smsHref()} className="text-primary hover:underline">
                    Text APC
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <FiMail className="mt-1 text-primary" aria-hidden />
                <div>
                  <h3 className="font-bold text-navy">Email</h3>
                  <a href={mailHref()} className="text-primary hover:underline">
                    {SITE.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <FiClock className="mt-1 text-primary" aria-hidden />
                <div>
                  <h3 className="font-bold text-navy">Hours</h3>
                  <p className="text-muted">Available 24/7</p>
                </div>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted">
              USDOT {SITE.usdot} · MC {SITE.mc}
            </p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
