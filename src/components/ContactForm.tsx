'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  // Function to handle direct email preparation as fallback
  const handleDirectEmailSending = (data: FormData) => {
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Contact Form Submission from ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`
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

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      // First try sending via the API
      const response = await fetch('/api/contact', {
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
          <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your message. We'll get back to you as soon as possible.
          </p>
          <button
            className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-2 px-6 rounded-md transition-colors"
            onClick={() => setSubmitSuccess(false)}
            suppressHydrationWarning
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#c62a2a] ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('message', { required: 'Message is required' })}
              suppressHydrationWarning
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-3 px-6 rounded-md transition-colors w-full flex justify-center"
            disabled={isSubmitting}
            suppressHydrationWarning
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 