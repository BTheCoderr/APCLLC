import Link from 'next/link';
import { FiBriefcase, FiTruck, FiTrash2 } from 'react-icons/fi';

const cards = [
  {
    title: 'Business Delivery',
    description:
      'Same-day and recurring cargo van routes for retailers, contractors, offices, warehouses, and e-commerce operators who need dependable property transport.',
    href: '/services/business-delivery',
    cta: 'Plan a delivery route',
    icon: FiBriefcase,
  },
  {
    title: 'Cargo Van Transport',
    description:
      'Dedicated high-roof cargo van capacity for freight, appliances, boxes, and palletized property from Rhode Island to destinations across the continental U.S.',
    href: '/services/cargo-van-transport',
    cta: 'Request van transport',
    icon: FiTruck,
  },
  {
    title: 'Junk Removal and Hauling',
    description:
      'Local junk removal and hauling for debris, discarded furniture, and cleanouts. Practical, scheduled, and clearly scoped before pickup.',
    href: '/services/junk-removal',
    cta: 'Book a haul',
    icon: FiTrash2,
  },
];

const Services = () => {
  return (
    <section className="bg-paper py-16 md:py-24" id="services">
      <div className="container-custom">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Services
          </p>
          <h2 className="headline mb-4 text-4xl text-navy md:text-5xl">
            Cargo van work that stays operational
          </h2>
          <p className="text-lg text-muted">
            APC is an owner-operated cargo van logistics company. Residential moving is not the
            lead service and interstate household-goods transportation is not offered.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="flex flex-col border border-navy/10 bg-white p-7 shadow-card"
              >
                <Icon className="mb-5 text-primary" size={32} aria-hidden />
                <h3 className="headline mb-3 text-2xl text-navy">{card.title}</h3>
                <p className="mb-6 flex-1 text-muted">{card.description}</p>
                <Link href={card.href} className="font-semibold text-primary hover:underline">
                  {card.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
