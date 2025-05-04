'use client';

import { motion } from 'framer-motion';
import { FiShield, FiTruck, FiUsers } from 'react-icons/fi';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#000000] p-6 rounded-lg shadow-md flex justify-center">
              <div className="relative w-full aspect-square max-w-md">
                <Image 
                  src="/APCLLC.jpeg" 
                  alt="APC LLC Logo" 
                  fill
                  className="object-contain"
                  style={{ backgroundColor: "#000000" }}
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About <span className="text-[#d4b14b]">Us</span></h2>
            <p className="text-lg text-gray-700 mb-6">
              At <span className="text-[#c62a2a] font-medium">ALL PURPOSE CONTRACTORS LLC</span>, we provide professional cargo van transport and moving services across 
              Rhode Island and will soon serve clients nationwide.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Founded by a team of driven entrepreneurs with backgrounds in logistics and operations, 
              we're committed to dependable, affordable, and legal transport solutions — whether you're a 
              business shipping goods or a family relocating locally.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 p-2 bg-[#ffebee] rounded-full text-[#c62a2a]">
                  <FiShield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-[#d4b14b]">Fully Insured</h3>
                  <p className="text-gray-600">
                    Our service is fully insured and operating in compliance with Rhode Island state regulations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 p-2 bg-[#ffebee] rounded-full text-[#c62a2a]">
                  <FiTruck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-[#d4b14b]">Growing Nationwide</h3>
                  <p className="text-gray-600">
                    Our federal operating authority is pending final FMCSA activation, and we'll soon be 
                    able to haul freight across all 48 continental U.S. states.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 p-2 bg-[#ffebee] rounded-full text-[#c62a2a]">
                  <FiUsers size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-[#d4b14b]">Experienced Team</h3>
                  <p className="text-gray-600">
                    Our team brings experience in logistics, customer service, and 
                    safe transport to ensure your items arrive safely and on time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 