'use client';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70" role="status" aria-live="polite">
      <div className="flex flex-col items-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-accent/30 border-t-primary" />
        <p className="mt-4 font-medium text-white">Loading…</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
