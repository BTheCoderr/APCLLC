'use client';

import { FiHome, FiPackage, FiTrash2, FiShoppingBag, FiMapPin, FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Residential Moving Services',
    description: 'Local and long-distance moving services for homes and apartments across the US.',
    icon: <FiHome size={36} className="text-[#c62a2a]" />,
    soon: false
  },
  {
    id: 2,
    title: 'Cargo Van Freight Transport',
    description: 'Reliable transport for boxes, appliances, and palletized cargo.',
    icon: <FiPackage size={36} className="text-[#c62a2a]" />,
    soon: false
  },
  {
    id: 3,
    title: 'Junk Removal & Hauling',
    description: 'Fast and efficient removal of unwanted items and debris.',
    icon: <FiTrash2 size={36} className="text-[#c62a2a]" />,
    soon: false
  },
  {
    id: 4,
    title: 'Small Business & Retail Deliveries',
    description: 'Custom delivery solutions for small businesses and retail operations.',
    icon: <FiShoppingBag size={36} className="text-[#c62a2a]" />,
    soon: false
  },
  {
    id: 5,
    title: 'Local Pickup & Drop-Off',
    description: 'Convenient pickup and delivery services throughout the United States.',
    icon: <FiMapPin size={36} className="text-[#c62a2a]" />,
    soon: false
  },
  {
    id: 6,
    title: 'Interstate Transport',
    description: 'Transportation services throughout the United States.',
    icon: <FiTruck size={36} className="text-[#c62a2a]" />,
    soon: false
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Services = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#c62a2a]">Our <span className="text-[#c62a2a]">Services</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in extended high-roof cargo van capacity, perfect for light/heavy freight, 
            boxes, appliances, and palletized cargo.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden"
              variants={item}
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#d4b14b]">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              
              {service.soon && (
                <div className="absolute top-4 right-4 bg-[#d4b14b] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Coming Soon
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 