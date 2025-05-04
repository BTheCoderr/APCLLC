'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPhone, FiCalendar } from 'react-icons/fi';

const CTASection = () => {
  return (
    <section className="bg-secondary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Your Items <span className="text-accent">Moving?</span>
            </h2>
            <p className="text-xl mb-6 text-gray-300">
              Contact us today for reliable cargo van transport and moving services across Rhode Island.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="mr-2 text-[#c62a2a]">✓</span>
                <span>Fast, affordable deliveries</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#c62a2a]">✓</span>
                <span>Professional, insured service</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#c62a2a]">✓</span>
                <span>Same-day scheduling available</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#c62a2a]">✓</span>
                <span>Serving all of Rhode Island</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-[#d4b14b]">Get In Touch</h3>
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <Link 
                  href="tel:+1234567890"
                  className="flex items-center justify-center w-full py-3 px-6 bg-[#c62a2a] hover:bg-[#a52222] text-white rounded-md transition-colors font-semibold"
                >
                  <FiPhone className="mr-2" />
                  Call Us Now: (123) 456-7890
                </Link>
                <p className="mt-2 text-sm text-gray-400">
                  Available Monday-Saturday, 7am-7pm
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Link 
                  href="/quote"
                  className="flex items-center justify-center w-full py-3 px-6 bg-accent hover:bg-accent-dark text-white rounded-md transition-colors font-semibold"
                >
                  <FiCalendar className="mr-2" />
                  Schedule a Booking
                </Link>
                <p className="mt-2 text-sm text-gray-400">
                  Get a free quote for your delivery needs
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 