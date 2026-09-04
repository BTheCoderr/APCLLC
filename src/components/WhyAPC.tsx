import { FiClock, FiCalendar, FiTruck, FiMessageCircle, FiShield, FiMap, FiRepeat } from 'react-icons/fi';

const points = [
  { title: '24/7 availability', copy: 'Call or request a quote any time. Night and weekend work is part of the operation.', icon: FiClock },
  { title: 'Same-day scheduling when available', copy: 'Urgent cargo van work is quoted against actual capacity. Availability is confirmed before pickup.', icon: FiCalendar },
  { title: 'Dedicated cargo van service', copy: 'One high-roof cargo van focused on property freight, not a mixed tractor-trailer fleet.', icon: FiTruck },
  { title: 'Direct customer communication', copy: 'You talk with the operator running the job, not a call-center queue.', icon: FiMessageCircle },
  { title: 'Insured transportation', copy: 'Loads move under insured cargo van transportation for businesses and individuals.', icon: FiShield },
  { title: 'Authorized interstate property carrier', copy: 'USDOT 4402106 · MC 1728118. Motor carrier of property, except household goods.', icon: FiMap },
  { title: 'Flexible one-time and recurring service', copy: 'Single runs and weekly routes are both in scope when the freight fits a cargo van.', icon: FiRepeat },
];

const WhyAPC = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Why APC</p>
          <h2 className="headline text-4xl text-navy md:text-5xl">Verifiable reasons to use the van</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="flex gap-4 border-l-2 border-accent bg-paper p-6">
                <Icon className="mt-1 shrink-0 text-primary" size={24} aria-hidden />
                <div>
                  <h3 className="mb-2 font-bold text-navy">{point.title}</h3>
                  <p className="text-muted">{point.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAPC;
