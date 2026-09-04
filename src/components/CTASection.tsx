import Link from 'next/link';
import { FiPhone, FiMessageSquare, FiFileText } from 'react-icons/fi';
import { SITE, smsHref, telHref } from '@/lib/site';

const CTASection = () => {
  return (
    <section className="bg-navy py-16 text-white md:py-20">
      <div className="container-custom">
        <h2 className="headline mb-4 text-4xl md:text-5xl">Need it moved today?</h2>
        <p className="mb-8 max-w-2xl text-lg text-white/80">
          Tell us what you&apos;re moving and where it needs to go. We&apos;ll respond with
          availability and pricing.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/quote" className="btn-primary">
            <FiFileText aria-hidden />
            Request a Quote
          </Link>
          <Link href={telHref()} className="btn-secondary">
            <FiPhone aria-hidden />
            Call Now
          </Link>
          <Link href={smsHref()} className="btn-ghost">
            <FiMessageSquare aria-hidden />
            Text APC
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/60">
          Same-day service is quoted when the van is available. {SITE.phoneDisplay} · {SITE.email}
        </p>
      </div>
    </section>
  );
};

export default CTASection;
