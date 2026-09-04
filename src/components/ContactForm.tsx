'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SITE, mailHref, telHref } from '@/lib/site';

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
  const inFlight = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleDirectEmailSending = (data: FormData) => {
    try {
      const subject = encodeURIComponent(`Contact Form Submission from ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`
      );
      const tempLink = document.createElement('a');
      tempLink.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError('There was a problem preparing your email. Please call APC directly.');
      console.error('Email preparation error:', error);
    } finally {
      inFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        return;
      }
      if (response.status === 400 || response.status === 429) {
        setSubmitError(result.error || 'Please check the form and try again.');
        return;
      }
      handleDirectEmailSending(data);
    } catch {
      handleDirectEmailSending(data);
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
        <h3 className="headline mb-4 text-3xl text-navy">Message sent</h3>
        <p className="mb-6 text-muted">
          Thank you. APC will get back to you as soon as possible. For urgent freight, call or text.
        </p>
        <a className="btn-primary mb-3" href={telHref()}>
          Call {SITE.phoneDisplay}
        </a>
        <button className="mt-4 block font-semibold text-primary" onClick={() => setSubmitSuccess(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 shadow-card md:p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block font-semibold text-navy">
            Full name
          </label>
          <input
            id="name"
            autoComplete="name"
            className={fieldClass(!!errors.name)}
            aria-invalid={!!errors.name}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block font-semibold text-navy">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={fieldClass(!!errors.email)}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block font-semibold text-navy">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass(!!errors.phone)}
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="mb-2 block font-semibold text-navy">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className={fieldClass(!!errors.message)}
            {...register('message', { required: 'Message is required' })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>
        {submitError && (
          <div className="mb-4 rounded-sm bg-red-50 p-3 text-red-700" role="alert">
            {submitError}
          </div>
        )}
        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </button>
        <p className="mt-3 text-center text-sm text-muted">
          Or{' '}
          <a className="font-semibold text-primary" href={telHref()}>
            call {SITE.phoneDisplay}
          </a>{' '}
          /{' '}
          <a className="font-semibold text-primary" href={mailHref()}>
            {SITE.email}
          </a>
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
