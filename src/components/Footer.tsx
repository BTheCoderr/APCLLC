import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { FOOTER_LINKS, SITE, mailHref, telHref } from '@/lib/site';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden bg-navy">
                <Image
                  src="/APCLLC.jpeg"
                  alt="APC LLC logo"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <h2 className="headline text-2xl">
                <span className="text-primary">APC</span>{' '}
                <span className="text-accent">LLC</span>
              </h2>
            </div>
            <p className="mb-4 max-w-sm text-white/80">{SITE.tagline}</p>
            <p className="flex items-start gap-2 text-sm text-white/70">
              <FiMapPin className="mt-1 shrink-0 text-accent" aria-hidden />
              <span>
                Based in {SITE.city}, {SITE.region}. Operating across the continental U.S.
              </span>
            </p>
            <p className="mt-4 text-sm text-white/60">
              USDOT {SITE.usdot} · MC {SITE.mc}
              <br />
              {SITE.authority}.
            </p>
          </div>

          <div>
            <h3 className="headline mb-5 text-xl text-accent">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="headline mb-5 text-xl text-primary">Contact</h3>
            <div className="space-y-3">
              <Link href={telHref()} className="flex items-center gap-2 hover:text-accent">
                <FiPhone className="text-accent" aria-hidden />
                {SITE.phoneDisplay}
              </Link>
              <Link href={mailHref()} className="flex items-center gap-2 hover:text-accent">
                <FiMail className="text-accent" aria-hidden />
                {SITE.email}
              </Link>
              <p className="text-white/70">Available {SITE.availability}</p>
              <div className="mt-4 flex gap-4">
                <Link href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FiInstagram size={22} />
                </Link>
                <Link href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FiFacebook size={22} />
                </Link>
                <Link href={SITE.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                  <FiTwitter size={22} />
                </Link>
                <Link href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FiLinkedin size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/55">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <p className="mt-2">
            Insured cargo van transportation. Authorized interstate motor carrier of property, except household goods.
            Local residential hauling is offered separately and does not include interstate household-goods moving.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
