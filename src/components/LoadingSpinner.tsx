'use client';

import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-20 w-20">
          <motion.div 
            className="absolute inset-0 rounded-full border-4 border-t-[#c62a2a] border-r-[#d4b14b] border-b-[#c62a2a] border-l-[#d4b14b]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="mt-4 text-white font-medium">Loading...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner; 