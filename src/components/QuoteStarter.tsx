'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SERVICE_TYPE_OPTIONS } from '@/lib/site';
import { buildQuoteStarterHref } from '@/lib/quote';

const QuoteStarter = () => {
  const router = useRouter();
  const [pickupZip, setPickupZip] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!pickupZip.trim() || !deliveryZip.trim() || !serviceType) {
      setError('Enter pickup ZIP, delivery ZIP, and a service to continue.');
      return;
    }
    setError('');
    router.push(
      buildQuoteStarterHref({
        pickupZip: pickupZip.trim(),
        deliveryZip: deliveryZip.trim(),
        serviceType,
        date,
      })
    );
  };

  return (
    <div id="quote-starter" className="border-t border-white/10 bg-navy-mid">
      <div className="container-custom py-8">
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-5 md:items-end">
          <div>
            <label htmlFor="starter-pickup-zip" className="mb-2 block text-sm font-semibold text-white">
              Pickup ZIP code
            </label>
            <input
              id="starter-pickup-zip"
              name="pickupZip"
              inputMode="numeric"
              autoComplete="postal-code"
              value={pickupZip}
              onChange={(event) => setPickupZip(event.target.value)}
              className="w-full rounded-sm border border-white/15 bg-navy px-3 py-3 text-white"
              placeholder="02886"
            />
          </div>
          <div>
            <label htmlFor="starter-delivery-zip" className="mb-2 block text-sm font-semibold text-white">
              Delivery ZIP code
            </label>
            <input
              id="starter-delivery-zip"
              name="deliveryZip"
              inputMode="numeric"
              autoComplete="postal-code"
              value={deliveryZip}
              onChange={(event) => setDeliveryZip(event.target.value)}
              className="w-full rounded-sm border border-white/15 bg-navy px-3 py-3 text-white"
              placeholder="02101"
            />
          </div>
          <div>
            <label htmlFor="starter-service" className="mb-2 block text-sm font-semibold text-white">
              Service needed
            </label>
            <select
              id="starter-service"
              name="serviceType"
              value={serviceType}
              onChange={(event) => setServiceType(event.target.value)}
              className="w-full rounded-sm border border-white/15 bg-navy px-3 py-3 text-white"
            >
              <option value="">Select a service</option>
              {SERVICE_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.shortLabel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="starter-date" className="mb-2 block text-sm font-semibold text-white">
              Preferred date
            </label>
            <input
              id="starter-date"
              name="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-sm border border-white/15 bg-navy px-3 py-3 text-white"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Continue
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        )}
        <p className="mt-3 text-sm text-white/60">
          Continue opens the full quote form with these details filled in. A request is not a confirmed booking.
        </p>
      </div>
    </div>
  );
};

export default QuoteStarter;
