'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#000000] text-white shadow-md sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-3">
        <Link href="/" className="flex items-center">
          <div className="relative h-[50px] w-[50px] mr-2 overflow-hidden" style={{ backgroundColor: "#000000" }}>
            <Image 
              src="/APCLLC.jpeg" 
              alt="APC LLC Logo" 
              fill
              sizes="50px"
              className="object-contain" 
              style={{ backgroundColor: "#000000" }}
            />
          </div>
          <div>
            <span className="text-2xl font-bold"><span className="text-[#c62a2a]">APC</span> <span className="text-[#d4b14b]">LLC</span></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-medium hover:text-[#d4b14b] transition-colors">
            Home
          </Link>
          <Link href="/about" className="font-medium hover:text-[#d4b14b] transition-colors">
            About
          </Link>
          <Link href="/services" className="font-medium hover:text-[#d4b14b] transition-colors">
            Services
          </Link>
          <Link href="/contact" className="font-medium hover:text-[#d4b14b] transition-colors">
            Contact
          </Link>
          <Link href="/quote" className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-2 px-6 rounded-md transition-colors">
            Get a Quote
          </Link>
        </div>

        {/* Phone button - always visible */}
        <Link href="tel:+14016024943" className="hidden md:flex items-center text-[#d4b14b] hover:text-[#b99537] transition-colors">
          <FiPhone className="mr-2" />
          <span className="font-medium">Call Now</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          suppressHydrationWarning
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="font-medium hover:text-[#d4b14b] transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="font-medium hover:text-[#d4b14b] transition-colors py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="font-medium hover:text-[#d4b14b] transition-colors py-2"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="font-medium hover:text-[#d4b14b] transition-colors py-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link 
              href="/quote" 
              className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-2 px-6 rounded-md transition-colors inline-block text-center"
              onClick={toggleMenu}
            >
              Get a Quote
            </Link>
            <Link 
              href="tel:+14016024943" 
              className="flex items-center text-[#d4b14b] py-2"
              onClick={toggleMenu}
            >
              <FiPhone className="mr-2" />
              <span>Call Now</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 