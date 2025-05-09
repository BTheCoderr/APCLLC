import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  // Replace with actual company contact info
  const contactInfo = {
    phone: "(401) 602-4943", // Updated phone number
    email: "info@apcllc.co", // Updated email address to .co instead of .com
    address: "Rhode Island", // Simplified to just Rhode Island
    socials: {
      instagram: "https://www.instagram.com/apcllcri", // Replace with actual Instagram URL
      facebook: "https://www.facebook.com/apcllcri", // Replace with actual Facebook URL
      twitter: "https://twitter.com/apcllcri", // Replace with actual Twitter URL
      linkedin: "https://www.linkedin.com/company/all-purpose-contractors-llc" // Replace with actual LinkedIn URL
    }
  };

  return (
    <footer className="bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative h-[60px] w-[60px] mr-3 overflow-hidden" style={{ backgroundColor: "#000000" }}>
                <Image 
                  src="/APCLLC.jpeg" 
                  alt="APC LLC Logo" 
                  fill
                  sizes="60px"
                  className="object-contain" 
                  style={{ backgroundColor: "#000000" }}
                />
              </div>
              <h3 className="text-2xl font-bold">
                <span className="text-[#c62a2a]">APC</span> <span className="text-[#d4b14b]">LLC</span>
              </h3>
            </div>
            <p className="mb-4">Professional cargo van transport and moving services available nationwide, 24/7.</p>
            <div className="flex items-center mt-4">
              <FiMapPin className="mr-2 text-[#d4b14b]" />
              <span>{contactInfo.address} - Serving All 48 Continental States</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#d4b14b]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-[#d4b14b] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4b14b] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#d4b14b] transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4b14b] transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-[#d4b14b] transition-colors">Get a Quote</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#c62a2a]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FiPhone className="mr-2 text-[#d4b14b]" />
                <Link href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="hover:text-[#d4b14b] transition-colors">
                  {contactInfo.phone}
                </Link>
              </div>
              <div className="flex items-center">
                <FiMail className="mr-2 text-[#d4b14b]" />
                <Link href={`mailto:${contactInfo.email}`} className="hover:text-[#d4b14b] transition-colors">
                  {contactInfo.email}
                </Link>
              </div>
              <div className="flex space-x-4 mt-6">
                <Link href={contactInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4b14b] transition-colors" aria-label="Instagram">
                  <FiInstagram size={24} />
                </Link>
                <Link href={contactInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4b14b] transition-colors" aria-label="Facebook">
                  <FiFacebook size={24} />
                </Link>
                <Link href={contactInfo.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4b14b] transition-colors" aria-label="Twitter">
                  <FiTwitter size={24} />
                </Link>
                <Link href={contactInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#d4b14b] transition-colors" aria-label="LinkedIn">
                  <FiLinkedin size={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} ALL PURPOSE CONTRACTORS LLC. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              ALL PURPOSE CONTRACTORS LLC is fully insured and operating in compliance with all state and federal regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 