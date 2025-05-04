'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-zinc-900 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-[#c62a2a] mb-4">Oops!</h1>
        <h2 className="text-xl font-semibold text-white mb-6">Something went wrong</h2>
        <p className="text-gray-400 mb-8">
          We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => reset()}
            className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-[#d4b14b] hover:bg-[#b99537] text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 