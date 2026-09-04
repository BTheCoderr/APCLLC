import Link from 'next/link';
import LogoMark from '@/components/LogoMark';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="max-w-md p-8 text-center text-white">
        <LogoMark className="mx-auto mb-6 h-24 w-24" sizes="96px" alt="APC LLC logo" />
        <h1 className="headline mb-4 text-5xl text-primary">404</h1>
        <h2 className="mb-4 text-xl font-semibold">Page not found</h2>
        <p className="mb-8 text-white/70">
          That URL does not exist. The main pages are Home, Services, About, Contact, and Quote.
        </p>
        <Link href="/" className="btn-secondary">
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
