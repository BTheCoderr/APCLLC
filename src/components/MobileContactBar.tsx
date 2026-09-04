import Link from 'next/link';
import { FiPhone, FiMessageSquare, FiFileText } from 'react-icons/fi';
import { smsHref, telHref } from '@/lib/site';

const MobileContactBar = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-navy/95 px-3 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur md:hidden"
      role="navigation"
      aria-label="Mobile contact actions"
    >
      <div className="grid grid-cols-3 gap-2">
        <Link
          href={telHref()}
          className="flex min-h-12 flex-col items-center justify-center rounded-sm bg-white/5 text-xs font-semibold text-white"
        >
          <FiPhone className="mb-1 text-accent" aria-hidden />
          Call
        </Link>
        <Link
          href={smsHref()}
          className="flex min-h-12 flex-col items-center justify-center rounded-sm bg-white/5 text-xs font-semibold text-white"
        >
          <FiMessageSquare className="mb-1 text-accent" aria-hidden />
          Text
        </Link>
        <Link
          href="/quote"
          className="flex min-h-12 flex-col items-center justify-center rounded-sm bg-primary text-xs font-semibold text-white"
        >
          <FiFileText className="mb-1" aria-hidden />
          Quote
        </Link>
      </div>
    </div>
  );
};

export default MobileContactBar;
