import Link from 'next/link';

const audiences = [
  'Retailers',
  'Contractors',
  'Property managers',
  'Offices',
  'Warehouses',
  'Furniture businesses',
  'E-commerce operators',
];

const BusinessPartnerships = () => {
  return (
    <section className="bg-navy py-16 text-white md:py-24">
      <div className="container-custom grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Recurring delivery
          </p>
          <h2 className="headline mb-5 text-4xl md:text-5xl">Need deliveries every week?</h2>
          <p className="mb-6 text-lg text-white/80">
            APC supports scheduled and recurring cargo van routes for businesses that need
            predictable pickup and drop-off without a full truckload. Routes are quoted from
            actual volume, windows, and access—not a generic nationwide moving package.
          </p>
          <Link href="/quote?serviceType=retailDelivery" className="btn-primary">
            Discuss a Recurring Route
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {audiences.map((item) => (
            <li key={item} className="border border-white/15 bg-white/5 px-4 py-4 font-semibold">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BusinessPartnerships;
