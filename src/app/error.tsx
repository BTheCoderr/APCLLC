'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="max-w-md p-8 text-center text-white">
        <h1 className="headline mb-4 text-4xl text-primary">Something went wrong</h1>
        <p className="mb-8 text-white/75">
          Please try again or return to the homepage. If you were sending a quote, call APC and we
          will take the details directly.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => reset()} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
