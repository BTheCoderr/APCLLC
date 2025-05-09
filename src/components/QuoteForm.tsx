'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  pickupLocation: string;
  deliveryLocation: string;
  date: string;
  details: string;
};

// Service type mapping for readability
const serviceTypeMapping: Record<string, string> = {
  residentialMoving: 'Residential Moving',
  cargoTransport: 'Cargo Van Freight Transport',
  junkRemoval: 'Junk Removal & Hauling',
  retailDelivery: 'Small Business & Retail Deliveries',
  localPickup: 'Local Pickup & Drop-Off'
};

const QuoteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<QuoteFormData>();

  // Function to handle direct email preparation as fallback
  const handleDirectEmailSending = (data: QuoteFormData) => {
    try {
      // Get service type display name
      const serviceTypeDisplay = serviceTypeMapping[data.serviceType] || data.serviceType;
      
      // Create mailto link with form data
      const subject = encodeURIComponent(`Quote Request: ${serviceTypeDisplay}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Service Type: ${serviceTypeDisplay}\n` +
        `Pickup Location: ${data.pickupLocation}\n` +
        `Delivery Location: ${data.deliveryLocation}\n` +
        `Preferred Date: ${data.date || 'Not specified'}\n\n` +
        `Additional Details:\n${data.details || 'None provided'}`
      );
      
      // Open default email client using a link element
      const tempLink = document.createElement('a');
      tempLink.href = `mailto:info@apcllc.co?subject=${subject}&body=${body}`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      // Mark as successful and reset the form
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError('There was a problem preparing your email. Please try again or contact us directly.');
      console.error('Email preparation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      // First try sending via the API
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      // If successful
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      
      // If API fails, fall back to direct email
      handleDirectEmailSending(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {submitSuccess ? (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-green-600 mb-4">Quote Request Sent!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your quote request. We'll get back to you as soon as possible.
          </p>
          <button
            className="btn-primary"
            onClick={() => setSubmitSuccess(false)}
            suppressHydrationWarning
          >
            Request Another Quote
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('name', { required: 'Name is required' })}
                suppressHydrationWarning
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                suppressHydrationWarning
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('phone', {
                required: 'Phone number is required',
              })}
              suppressHydrationWarning
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">
              Service Type
            </label>
            <select
              id="serviceType"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                errors.serviceType ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('serviceType', { required: 'Please select a service type' })}
              suppressHydrationWarning
            >
              <option value="">Select a service...</option>
              <option value="residentialMoving">Residential Moving</option>
              <option value="cargoTransport">Cargo Van Freight Transport</option>
              <option value="junkRemoval">Junk Removal & Hauling</option>
              <option value="retailDelivery">Small Business & Retail Deliveries</option>
              <option value="localPickup">Local Pickup & Drop-Off</option>
            </select>
            {errors.serviceType && (
              <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="pickupLocation" className="block text-gray-700 font-medium mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                  errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('pickupLocation', { required: 'Pickup location is required' })}
                suppressHydrationWarning
              />
              {errors.pickupLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="deliveryLocation" className="block text-gray-700 font-medium mb-2">
                Delivery Location
              </label>
              <input
                type="text"
                id="deliveryLocation"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                  errors.deliveryLocation ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('deliveryLocation', { required: 'Delivery location is required' })}
                suppressHydrationWarning
              />
              {errors.deliveryLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.deliveryLocation.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              id="date"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('date', { required: 'Preferred date is required' })}
              suppressHydrationWarning
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="details" className="block text-gray-700 font-medium mb-2">
              Additional Details (items, weight, dimensions, etc.)
            </label>
            <textarea
              id="details"
              rows={4}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                errors.details ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('details')}
              suppressHydrationWarning
            ></textarea>
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full flex justify-center"
            disabled={isSubmitting}
            suppressHydrationWarning
          >
            {isSubmitting ? 'Sending...' : 'Get a Free Quote'}
          </button>
        </form>
      )}
    </div>
  );
};

export default QuoteForm; 