import { SITE } from '@/lib/site';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';

const badges = [
  `USDOT ${SITE.usdot}`,
  `MC ${SITE.mc}`,
  'Fully insured',
  'Available 24/7',
  'Warwick, Rhode Island',
  'Continental U.S. property transport',
];

const SocialProof = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Operations, not testimonials
          </p>
          <h2 className="headline mb-4 text-4xl text-navy md:text-5xl">Proof that belongs on this site</h2>
          <p className="text-lg text-muted">
            No customer reviews, ratings, job counts, or logos were found in the existing website
            files. This section only shows verified credentials and labeled photograph placeholders
            until real APC photos are supplied.
          </p>
        </div>
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => (
            <div key={badge} className="border border-navy/10 bg-paper px-4 py-3 font-semibold text-navy">
              {badge}
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <PhotoPlaceholder
            title="Cargo van exterior"
            need="Side profile of the APC cargo van, parked or on the road, in good light."
          />
          <PhotoPlaceholder
            title="Loaded cargo area"
            need="Interior of the van with real freight, boxes, or a pallet—no stock imagery."
          />
          <PhotoPlaceholder
            title="Delivery in progress"
            need="Pickup or drop-off at a business, warehouse, or job site in Rhode Island or on route."
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
