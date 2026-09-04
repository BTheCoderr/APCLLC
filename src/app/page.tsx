import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyAPC from '@/components/WhyAPC';
import BusinessPartnerships from '@/components/BusinessPartnerships';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import CTASection from '@/components/CTASection';
import SiteShell from '@/components/SiteShell';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    absolute: 'APC LLC | Cargo Van Delivery from Rhode Island',
  },
  description:
    'Fast, dependable cargo van delivery from Warwick, Rhode Island to destinations across the continental U.S. Same-day, scheduled, and business freight.',
  alternates: { canonical: SITE.domain },
};

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Services />
      <WhyAPC />
      <BusinessPartnerships />
      <HowItWorks />
      <SocialProof />
      <CTASection />
    </SiteShell>
  );
}
