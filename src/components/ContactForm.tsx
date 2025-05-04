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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Create a mailto: link with the form data
      const subject = `Contact Form Submission from ${data.name}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`;
      
      // Use the mailto: protocol to open the default email client with your actual email
      window.location.href = `mailto:your-actual-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // Replace your-actual-email@example.com with your real email address
      
      // For a production website, you would use an API route like this:
      /*
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      */
      
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError('There was a problem submitting your form. Please try again.');
      console.error('Form submission error:', error);
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
            Thank you for contacting us. We&apos;ll get back to you as soon as possible.
          </p>
          <button
            className="bg-[#c62a2a] hover:bg-[#a52222] text-white font-semibold py-2 px-6 rounded-md transition-colors"
            onClick={() => setSubmitSuccess(false)}
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
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 