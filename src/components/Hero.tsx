'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="bg-[#000000] text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-[#c62a2a]">ALL PURPOSE</span> <span className="text-[#d4b14b]">CONTRACTORS</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-4">
              <span className="text-[#c62a2a] font-bold">Reliable Cargo Van Delivery</span> & <span className="text-[#d4b14b] font-bold">Moving Services</span>
            </p>
            <p className="text-xl mb-6 text-gray-300">
              Serving the Entire United States
            </p>
            <p className="text-lg mb-8">
              Fast, Professional, 24/7 Hauling with a Personal Touch
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/quote" className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-3 px-8 rounded-md transition-colors">
                Get a Quote
              </Link>
              <Link href="/contact" className="bg-[#d4b14b] hover:bg-[#b99537] text-white font-semibold py-3 px-8 rounded-md transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full aspect-square flex items-center justify-center bg-[#000000]">
              <div className="relative w-[80%] h-[80%]">
                <Image 
                  src="/APCLLC.jpeg" 
                  alt="APC LLC Logo with cargo van" 
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-contain" 
                  priority
                  style={{ 
                    objectFit: "contain",
                    backgroundColor: "#000000"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 