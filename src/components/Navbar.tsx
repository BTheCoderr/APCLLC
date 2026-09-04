'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { NAV_LINKS, SITE, telHref } from '@/lib/site';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <div className="container-custom flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="relative h-12 w-12 overflow-hidden bg-navy">
            <Image
              src="/APCLLC.jpeg"
              alt="APC LLC cargo van logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>
          <span className="headline text-2xl">
            <span className="text-primary">APC</span>{' '}
            <span className="text-accent">LLC</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-accent ${
                isActive(link.href) ? 'text-accent' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href={telHref()} className="flex items-center gap-2 text-accent hover:text-white">
            <FiPhone aria-hidden />
            <span className="font-semibold">{SITE.phoneDisplay}</span>
          </Link>
          <Link href="/quote" className="btn-primary">
            Get a Quote
          </Link>
        </div>

        <button
          className="p-2 text-white lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-navy-mid px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 font-semibold hover:text-accent"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-primary mt-2" onClick={closeMenu}>
              Get a Quote
            </Link>
            <Link href={telHref()} className="btn-ghost mt-2" onClick={closeMenu}>
              <FiPhone />
              Call {SITE.phoneDisplay}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
