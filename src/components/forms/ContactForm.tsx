'use client';

import React, { useState, useRef } from 'react';
import { discoveryCallSchema, DiscoveryCallInput } from '@/lib/validation';
import Button from '@/components/ui/Button';
import styles from './ContactForm.module.css';

interface FieldErrors {
  name?: string[];
  organisation?: string[];
  role?: string[];
  email?: string[];
  phone?: string[];
  challenge?: string[];
  client_secondary_contact?: string[];
}

export default function ContactForm() {
  const [formData, setFormData] = useState<DiscoveryCallInput>({
    name: '',
    organisation: '',
    role: '',
    email: '',
    phone: '',
    challenge: '',
    client_secondary_contact: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [confirmedLeadId, setConfirmedLeadId] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on edit
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerErrorMessage(null);

    // 1. Client-side validation via authoritative Zod schema
    const validationResult = discoveryCallSchema.safeParse(formData);
    if (!validationResult.success) {
      const flattened = validationResult.error.flatten().fieldErrors;
      setFieldErrors(flattened);

      // Focus first erroneous field
      const firstErrorField = Object.keys(flattened)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.errors) {
          setFieldErrors(data.errors);
        }
        setServerErrorMessage(
          data.message || 'Unable to submit your inquiry. Please check your entries and try again.'
        );
        return;
      }

      // Success
      setSubmitSuccess(true);
      if (data.leadId) {
        setConfirmedLeadId(data.leadId);
      }
    } catch {
      setServerErrorMessage(
        'A network error occurred while communicating with the server. Please verify your connection or email hello@thinkinghead.ng.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      organisation: '',
      role: '',
      email: '',
      phone: '',
      challenge: '',
      client_secondary_contact: '',
    });
    setFieldErrors({});
    setSubmitSuccess(false);
    setServerErrorMessage(null);
    setConfirmedLeadId(null);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  if (submitSuccess) {
    return (
      <div className={styles.successWrapper} role="status" aria-live="polite">
        <span className={styles.successBadge}>Inquiry Confirmed</span>
        <h2 className={styles.successHeading}>We’ve Received Your Challenge</h2>
        <p className={styles.successConfirmation}>
          We’ve received your message. You’ll hear from Ben within 24 hours.
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)' }}>
          Our principal team will review the parameters you provided and prepare initial strategic
          observations for our initial consultation call.
        </p>
        {confirmedLeadId && (
          <p className={styles.successLeadId}>
            Reference ID: <code>{confirmedLeadId}</code>
          </p>
        )}
        <div className={styles.resetButton}>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Initiate Discovery</h2>
        <p className={styles.formSubtitle}>
          Complete the briefing parameters below. Every inquiry is reviewed directly by our executive
          leadership team.
        </p>
      </div>

      {serverErrorMessage && (
        <div className={`${styles.serverAlert} ${styles.serverAlertError}`} role="alert">
          {serverErrorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Anti-Spam Honeypot field (hidden from assistive tech and visual layout) */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="client_secondary_contact">
            Leave this field blank to verify human submission
          </label>
          <input
            type="text"
            id="client_secondary_contact"
            name="client_secondary_contact"
            tabIndex={-1}
            autoComplete="off"
            value={formData.client_secondary_contact || ''}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGrid}>
          {/* Two-column: Name & Organisation */}
          <div className={styles.twoColumn}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                <span>
                  Your Name <span className={styles.requiredIndicator}>*</span>
                </span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                disabled={isSubmitting}
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Amina Bello"
              />
              {fieldErrors.name && (
                <span id="name-error" className={styles.errorMessage} role="alert">
                  {fieldErrors.name[0]}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="organisation" className={styles.label}>
                <span>
                  Organisation <span className={styles.requiredIndicator}>*</span>
                </span>
              </label>
              <input
                type="text"
                id="organisation"
                name="organisation"
                autoComplete="organization"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.organisation)}
                aria-describedby={fieldErrors.organisation ? 'organisation-error' : undefined}
                disabled={isSubmitting}
                className={styles.input}
                value={formData.organisation}
                onChange={handleChange}
                placeholder="e.g. Sterling Infrastructure Ltd"
              />
              {fieldErrors.organisation && (
                <span id="organisation-error" className={styles.errorMessage} role="alert">
                  {fieldErrors.organisation[0]}
                </span>
              )}
            </div>
          </div>

          {/* Two-column: Role & Email */}
          <div className={styles.twoColumn}>
            <div className={styles.fieldGroup}>
              <label htmlFor="role" className={styles.label}>
                <span>
                  Role / Title <span className={styles.requiredIndicator}>*</span>
                </span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                autoComplete="organization-title"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.role)}
                aria-describedby={fieldErrors.role ? 'role-error' : undefined}
                disabled={isSubmitting}
                className={styles.input}
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Chief Operating Officer"
              />
              {fieldErrors.role && (
                <span id="role-error" className={styles.errorMessage} role="alert">
                  {fieldErrors.role[0]}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                <span>
                  Work Email <span className={styles.requiredIndicator}>*</span>
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                aria-required="true"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                disabled={isSubmitting}
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                placeholder="amina@company.com"
              />
              {fieldErrors.email && (
                <span id="email-error" className={styles.errorMessage} role="alert">
                  {fieldErrors.email[0]}
                </span>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className={styles.fieldGroup}>
            <label htmlFor="phone" className={styles.label}>
              <span>
                Direct Telephone / Mobile <span className={styles.requiredIndicator}>*</span>
              </span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              disabled={isSubmitting}
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
            />
            {fieldErrors.phone && (
              <span id="phone-error" className={styles.errorMessage} role="alert">
                {fieldErrors.phone[0]}
              </span>
            )}
          </div>

          {/* Challenge Description */}
          <div className={styles.fieldGroup}>
            <label htmlFor="challenge" className={styles.label}>
              <span>
                What’s the challenge? <span className={styles.requiredIndicator}>*</span>
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
                Min 10 characters
              </span>
            </label>
            <textarea
              id="challenge"
              name="challenge"
              required
              aria-required="true"
              aria-invalid={Boolean(fieldErrors.challenge)}
              aria-describedby={fieldErrors.challenge ? 'challenge-error' : undefined}
              disabled={isSubmitting}
              className={styles.textarea}
              value={formData.challenge}
              onChange={handleChange}
              placeholder="Tell us what isn’t working, what you want to achieve, and what’s been tried before..."
            />
            {fieldErrors.challenge && (
              <span id="challenge-error" className={styles.errorMessage} role="alert">
                {fieldErrors.challenge[0]}
              </span>
            )}
          </div>
        </div>

        <div className={styles.submitActions}>
          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Transmitting Briefing...' : 'Request Discovery Call'}
          </Button>
          <p className={styles.privacyNote}>
            Your submission is handled in strict commercial confidence. We do not distribute your
            contact details to third parties.
          </p>
        </div>
      </form>
    </div>
  );
}
