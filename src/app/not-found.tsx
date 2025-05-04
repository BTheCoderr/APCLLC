import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-zinc-900 rounded-lg shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <Image 
              src="/APCLLC.jpeg" 
              alt="APC LLC Logo" 
              fill
              className="object-contain"
              style={{ backgroundColor: "#000000" }}
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[#c62a2a] mb-4">404</h1>
        <h2 className="text-xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-[#d4b14b] hover:bg-[#b99537] text-white font-semibold py-3 px-6 rounded-md transition-colors inline-block"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
} 