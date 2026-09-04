'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { SERVICE_TYPE_OPTIONS, SITE, mailHref, telHref } from '@/lib/site';
import {
  buildQuoteApiPayload,
  parseQuoteStarterParams,
  type QuoteFormFields,
} from '@/lib/quote';

const ITEM_CATEGORIES = [
  'Palletized freight',
  'Boxes / parcels',
  'Furniture',
  'Appliances',
  'Retail goods',
  'Construction materials',
  'Junk / debris',
  'Other',
];

const QuoteForm = () => {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [usedMailtoFallback, setUsedMailtoFallback] = useState(false);
  const inFlight = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormFields>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredContactMethod: '',
      serviceType: '',
      pickupLocation: '',
      pickupZip: '',
      deliveryLocation: '',
      deliveryZip: '',
      date: '',
      preferredTime: '',
      itemCategory: '',
      quantity: '',
      approximateWeight: '',
      dimensions: '',
      loadingAssistance: '',
      stairsAccess: '',
      urgency: '',
      details: '',
      consent: false,
    },
  });

  useEffect(() => {
    const starter = parseQuoteStarterParams(searchParams);
    if (starter.pickupZip) {
      setValue('pickupZip', starter.pickupZip);
      setValue('pickupLocation', starter.pickupZip);
    }
    if (starter.deliveryZip) {
      setValue('deliveryZip', starter.deliveryZip);
      setValue('deliveryLocation', starter.deliveryZip);
    }
    if (starter.serviceType) setValue('serviceType', starter.serviceType);
    if (starter.date) setValue('date', starter.date);
  }, [searchParams, setValue]);

  const handleDirectEmailSending = (data: QuoteFormFields) => {
    try {
      const payload = buildQuoteApiPayload(data);
      const subject = encodeURIComponent(`Quote Request: ${payload.serviceType}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\n` +
          `Email: ${payload.email}\n` +
          `Phone: ${payload.phone}\n` +
          `Service Type: ${payload.serviceType}\n` +
          `Pickup Location: ${payload.pickupLocation}\n` +
          `Delivery Location: ${payload.deliveryLocation}\n` +
          `Preferred Date: ${payload.date || 'Not specified'}\n\n` +
          `${payload.details || 'None provided'}`
      );
      const tempLink = document.createElement('a');
      tempLink.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setUsedMailtoFallback(true);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError('There was a problem preparing your email. Please call or text APC directly.');
      console.error('Email preparation error:', error);
    } finally {
      inFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: QuoteFormFields) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setIsSubmitting(true);
    setSubmitError('');
    setUsedMailtoFallback(false);

    const payload = buildQuoteApiPayload(data);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      handleDirectEmailSending(data);
      return;
    } finally {
      inFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const fieldClass = (invalid?: boolean) =>
    `w-full rounded-sm border px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-primary ${
      invalid ? 'border-red-500' : 'border-navy/20'
    }`;

  if (submitSuccess) {
    return (
      <div className="bg-white p-6 shadow-card md:p-8" role="status" aria-live="polite">
        <h3 className="headline mb-4 text-3xl text-navy">Quote request sent</h3>
        <p className="mb-6 text-muted">
          {usedMailtoFallback
            ? 'Your email app should have opened with the request. If it did not send, call or text APC and we will take the details directly.'
            : 'Thank you. APC will reply with availability and pricing. Submitting a request does not guarantee a same-day slot.'}
        </p>
        <div className="mb-6 flex flex-col gap-2 text-navy sm:flex-row sm:gap-6">
          <a className="font-semibold text-primary" href={telHref()}>
            Call {SITE.phoneDisplay}
          </a>
          <a className="font-semibold text-primary" href={mailHref()}>
            {SITE.email}
          </a>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            setSubmitSuccess(false);
            setUsedMailtoFallback(false);
          }}
        >
          Request another quote
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-card md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block font-semibold text-navy">
              Full name
            </label>
            <input
              id="name"
              autoComplete="name"
              className={fieldClass(!!errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block font-semibold text-navy">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={fieldClass(!!errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-2 block font-semibold text-navy">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={fieldClass(!!errors.phone)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              {...register('phone', { required: 'Phone number is required' })}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="preferredContactMethod" className="mb-2 block font-semibold text-navy">
              Preferred contact method
            </label>
            <select
              id="preferredContactMethod"
              className={fieldClass(!!errors.preferredContactMethod)}
              {...register('preferredContactMethod', { required: 'Choose a contact method' })}
            >
              <option value="">Select one</option>
              <option value="Phone">Phone</option>
              <option value="Text">Text</option>
              <option value="Email">Email</option>
            </select>
            {errors.preferredContactMethod && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.preferredContactMethod.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="serviceType" className="mb-2 block font-semibold text-navy">
            Service type
          </label>
          <select
            id="serviceType"
            className={fieldClass(!!errors.serviceType)}
            {...register('serviceType', { required: 'Please select a service type' })}
          >
            <option value="">Select a service...</option>
            {SERVICE_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.serviceType && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.serviceType.message}
            </p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="pickupLocation" className="mb-2 block font-semibold text-navy">
              Pickup address
            </label>
            <input
              id="pickupLocation"
              autoComplete="street-address"
              className={fieldClass(!!errors.pickupLocation)}
              {...register('pickupLocation', { required: 'Pickup location is required' })}
            />
            {errors.pickupLocation && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.pickupLocation.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="pickupZip" className="mb-2 block font-semibold text-navy">
              Pickup ZIP code
            </label>
            <input
              id="pickupZip"
              inputMode="numeric"
              autoComplete="postal-code"
              className={fieldClass(!!errors.pickupZip)}
              {...register('pickupZip', { required: 'Pickup ZIP is required' })}
            />
            {errors.pickupZip && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.pickupZip.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="deliveryLocation" className="mb-2 block font-semibold text-navy">
              Delivery address
            </label>
            <input
              id="deliveryLocation"
              autoComplete="off"
              className={fieldClass(!!errors.deliveryLocation)}
              {...register('deliveryLocation', { required: 'Delivery location is required' })}
            />
            {errors.deliveryLocation && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.deliveryLocation.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="deliveryZip" className="mb-2 block font-semibold text-navy">
              Delivery ZIP code
            </label>
            <input
              id="deliveryZip"
              inputMode="numeric"
              className={fieldClass(!!errors.deliveryZip)}
              {...register('deliveryZip', { required: 'Delivery ZIP is required' })}
            />
            {errors.deliveryZip && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.deliveryZip.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-2 block font-semibold text-navy">
              Preferred date
            </label>
            <input
              id="date"
              type="date"
              className={fieldClass(!!errors.date)}
              {...register('date', { required: 'Preferred date is required' })}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.date.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="preferredTime" className="mb-2 block font-semibold text-navy">
              Preferred time
            </label>
            <select id="preferredTime" className={fieldClass()} {...register('preferredTime')}>
              <option value="">Flexible</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="After hours / overnight">After hours / overnight</option>
            </select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="itemCategory" className="mb-2 block font-semibold text-navy">
              Item category
            </label>
            <select
              id="itemCategory"
              className={fieldClass(!!errors.itemCategory)}
              {...register('itemCategory', { required: 'Select an item category' })}
            >
              <option value="">Select a category</option>
              {ITEM_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.itemCategory && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.itemCategory.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="quantity" className="mb-2 block font-semibold text-navy">
              Quantity
            </label>
            <input id="quantity" className={fieldClass()} {...register('quantity')} />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="approximateWeight" className="mb-2 block font-semibold text-navy">
              Approximate weight
            </label>
            <input
              id="approximateWeight"
              className={fieldClass()}
              placeholder="e.g. 400 lbs"
              {...register('approximateWeight')}
            />
          </div>
          <div>
            <label htmlFor="dimensions" className="mb-2 block font-semibold text-navy">
              Dimensions
            </label>
            <input
              id="dimensions"
              className={fieldClass()}
              placeholder="e.g. 48 x 40 x 40 in"
              {...register('dimensions')}
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="loadingAssistance" className="mb-2 block font-semibold text-navy">
              Loading assistance needed
            </label>
            <select id="loadingAssistance" className={fieldClass()} {...register('loadingAssistance')}>
              <option value="">Select one</option>
              <option value="No — freight will be ready">No — freight will be ready</option>
              <option value="Yes — help loading">Yes — help loading</option>
              <option value="Yes — help unloading">Yes — help unloading</option>
              <option value="Help with both">Help with both</option>
            </select>
          </div>
          <div>
            <label htmlFor="stairsAccess" className="mb-2 block font-semibold text-navy">
              Stairs or access considerations
            </label>
            <select id="stairsAccess" className={fieldClass()} {...register('stairsAccess')}>
              <option value="">Select one</option>
              <option value="Ground level / dock">Ground level / dock</option>
              <option value="Elevator">Elevator</option>
              <option value="Some stairs">Some stairs</option>
              <option value="Multiple flights">Multiple flights</option>
              <option value="Tight access or long carry">Tight access or long carry</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="urgency" className="mb-2 block font-semibold text-navy">
            Urgency
          </label>
          <select
            id="urgency"
            className={fieldClass(!!errors.urgency)}
            {...register('urgency', { required: 'Select urgency' })}
          >
            <option value="">Select urgency</option>
            <option value="Same-day if available">Same-day if available</option>
            <option value="Next day">Next day</option>
            <option value="Scheduled / specific date">Scheduled / specific date</option>
            <option value="Flexible">Flexible</option>
          </select>
          {errors.urgency && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.urgency.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="details" className="mb-2 block font-semibold text-navy">
            Additional details
          </label>
          <textarea
            id="details"
            rows={4}
            className={fieldClass()}
            placeholder="What is moving, time windows, gate codes, dock hours, or anything APC should know."
            {...register('details')}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-start gap-3 text-sm text-navy">
            <input
              type="checkbox"
              className="mt-1"
              {...register('consent', {
                required: 'Consent is required before sending this request',
              })}
            />
            <span>
              I agree to be contacted about this quote by phone, text, or email. Submitting this
              form does not guarantee availability or an instant price.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>

        {submitError && (
          <div className="mb-4 rounded-sm bg-red-50 p-3 text-red-700" role="alert">
            {submitError}
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Request a Quote'}
        </button>
        <p className="mt-3 text-center text-sm text-muted">
          Prefer to talk?{' '}
          <a className="font-semibold text-primary" href={telHref()}>
            Call {SITE.phoneDisplay}
          </a>{' '}
          or{' '}
          <a className="font-semibold text-primary" href={mailHref()}>
            {SITE.email}
          </a>
        </p>
      </form>
    </div>
  );
};

export default QuoteForm;
