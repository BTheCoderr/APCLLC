import { FiShield, FiTruck, FiUsers } from 'react-icons/fi';
import { SITE } from '@/lib/site';
import LogoMark from '@/components/LogoMark';

const AboutSection = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container-custom grid items-center gap-12 md:grid-cols-2">
        <div className="flex justify-center bg-navy p-6">
          <LogoMark
            className="aspect-square w-full max-w-md"
            sizes="(max-width: 768px) 100vw, 500px"
            alt="APC LLC logo"
          />
        </div>
        <div>
          <h2 className="headline mb-6 text-3xl text-navy md:text-4xl">About APC LLC</h2>
          <p className="mb-6 text-lg text-muted">
            {SITE.legalName} provides professional cargo van transport from {SITE.city},{' '}
            {SITE.region}, across the continental United States.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 bg-paper p-2 text-primary">
                <FiShield size={24} />
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold">Fully insured</h3>
                <p className="text-muted">Insured cargo van transportation for property freight.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 bg-paper p-2 text-primary">
                <FiTruck size={24} />
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold">Authorized property carrier</h3>
                <p className="text-muted">
                  USDOT {SITE.usdot} · MC {SITE.mc}. Motor carrier of property, except household goods.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-4 bg-paper p-2 text-primary">
                <FiUsers size={24} />
              </div>
              <div>
                <h3 className="mb-1 text-xl font-semibold">Direct communication</h3>
                <p className="text-muted">
                  Owner-operated service with 24/7 availability for businesses and individuals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
