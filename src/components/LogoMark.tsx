'use client';

import Image from 'next/image';

type LogoMarkProps = {
  className?: string;
  sizes: string;
  priority?: boolean;
  alt?: string;
};

export default function LogoMark({
  className = 'h-12 w-12',
  sizes,
  priority = false,
  alt = 'APC LLC cargo van logo',
}: LogoMarkProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/APCLLC.png"
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
