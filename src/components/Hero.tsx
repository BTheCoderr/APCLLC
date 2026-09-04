'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE, telHref } from '@/lib/site';
import QuoteStarter from '@/components/QuoteStarter';

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="route-lines pointer-events-none absolute inset-0 opacity-80" aria-hidden />
      <div className="container-custom relative grid items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Owner-operated cargo van logistics
          </p>
          <h1 className="headline mb-6 text-5xl md:text-6xl lg:text-7xl">
            Your Freight.
            <br />
            Our Van.
            <br />
            <span className="text-primary">Delivered.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/80 md:text-xl">
            Same-day, scheduled, and long-distance cargo van delivery for businesses and
            individuals. Based in Rhode Island and operating across the continental U.S.
          </p>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#quote-starter" className="btn-primary">
              Get My Quote
            </Link>
            <Link href={telHref()} className="btn-ghost">
              Call {SITE.phoneDisplay}
            </Link>
          </div>
          <p className="max-w-xl text-xs font-medium uppercase leading-relaxed tracking-wide text-white/70 sm:text-sm">
            Available 24/7 • Fully Insured • USDOT {SITE.usdot} • MC {SITE.mc}
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.1 }}
        >
          <div className="mx-auto aspect-square max-w-md bg-navy-deep p-6">
            <div className="relative h-full w-full">
              <Image
                src="/APCLLC.jpeg"
                alt="APC LLC logo showing a cargo van in motion"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
      <QuoteStarter />
    </section>
  );
};

export default Hero;
