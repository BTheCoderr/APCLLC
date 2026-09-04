import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    '/services',
    '/services/business-delivery',
    '/services/cargo-van-transport',
    '/services/junk-removal',
    '/contact',
    '/quote',
  ];

  return paths.map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' || path === '/quote' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
