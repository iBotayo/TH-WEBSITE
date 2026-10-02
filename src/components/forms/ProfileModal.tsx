'use client';

import React, { useState, useEffect, useRef } from 'react';
import { profileDownloadSchema, ProfileDownloadInput } from '@/lib/validation';
import Button from '@/components/ui/Button';
import styles from './ProfileModal.module.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FieldErrors {
  name?: string[];
  email?: string[];
  organisation?: string[];
  client_secondary_contact?: string[];
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [formData, setFormData] = useState<ProfileDownloadInput>({
    name: '',
    email: '',
    organisation: '',
    client_secondary_contact: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    fileAvailable?: boolean;
    downloadUrl?: string;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Focus management & Escape key handling
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Focus first input after animation frame
      requestAnimationFrame(() => {
        nameInputRef.current?.focus();
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        // Trap focus inside modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstEl = focusableElements[0];
          const lastEl = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
        // Restore focus to original triggering element
        if (previousActiveElementRef.current) {
          previousActiveElementRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerErrorMessage(null);

    // Client-side validation via authoritative Zod schema
    const validationResult = profileDownloadSchema.safeParse(formData);
    if (!validationResult.success) {
      const flattened = validationResult.error.flatten().fieldErrors;
      setFieldErrors(flattened);
      const firstErrorField = Object.keys(flattened)[0];
      const element = document.getElementById(`modal-${firstErrorField}`);
      if (element) {
        element.focus();
      }
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/download-profile', {
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
          data.message || 'Unable to process your request. Please check your entries and try again.'
        );
        return;
      }

      setSubmissionResult(data);
    } catch {
      setServerErrorMessage(
        'A connection error occurred. Please verify your network or email hello@thinkinghead.ng.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResetAndClose = () => {
    setFormData({
      name: '',
      email: '',
      organisation: '',
      client_secondary_contact: '',
    });
    setFieldErrors({});
    setSubmissionResult(null);
    setServerErrorMessage(null);
    onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          className={styles.closeButton}
          aria-label="Close corporate profile request dialog"
        >
          ✕
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.badge}>Gated Document</span>
          <h2 id="profile-modal-title" className={styles.modalTitle}>
            Request Corporate Profile
          </h2>
          <p id="profile-modal-description" className={styles.modalDescription}>
            The 16-page ThinkingHead Nigeria Limited Corporate Profile outlines our operational
            architecture, eight core service pillars, delivery methodology, and institutional track record.
          </p>
        </div>

        {submissionResult ? (
          <div className={styles.resultState} role="status" aria-live="polite">
            <div className={styles.resultAlert}>
              <h3 className={styles.resultTitle}>
                {submissionResult.fileAvailable
                  ? 'Access Authorized'
                  : 'Profile Request Recorded'}
              </h3>
              <p className={styles.resultText}>{submissionResult.message}</p>
              {submissionResult.fileAvailable && submissionResult.downloadUrl && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <Button
                    href={submissionResult.downloadUrl}
                    variant="primary"
                    fullWidth
                    download="ThinkingHead_Corporate_Profile.pdf"
                  >
                    Download PDF File
                  </Button>
                </div>
              )}
              {!submissionResult.fileAvailable && (
                <p className={styles.downloadNotice}>
                  [Corporate Profile PDF is currently in final editorial review. Notification logged.]
                </p>
              )}
            </div>

            <Button type="button" variant="secondary" fullWidth onClick={handleResetAndClose}>
              Close Dialog
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {serverErrorMessage && (
              <div className={`${styles.serverAlert} ${styles.serverAlertError}`} role="alert">
                {serverErrorMessage}
              </div>
            )}

            {/* Anti-spam honeypot */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="modal-client_secondary_contact">Leave blank</label>
              <input
                type="text"
                id="modal-client_secondary_contact"
                name="client_secondary_contact"
                tabIndex={-1}
                autoComplete="off"
                value={formData.client_secondary_contact || ''}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label htmlFor="modal-name" className={styles.label}>
                  <span>
                    Full Name <span className={styles.requiredIndicator}>*</span>
                  </span>
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="modal-name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'modal-name-error' : undefined}
                  disabled={isSubmitting}
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Tunde Adebayo"
                />
                {fieldErrors.name && (
                  <span id="modal-name-error" className={styles.errorMessage} role="alert">
                    {fieldErrors.name[0]}
                  </span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="modal-email" className={styles.label}>
                  <span>
                    Work Email <span className={styles.requiredIndicator}>*</span>
                  </span>
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? 'modal-email-error' : undefined}
                  disabled={isSubmitting}
                  className={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tunde@enterprise.com"
                />
                {fieldErrors.email && (
                  <span id="modal-email-error" className={styles.errorMessage} role="alert">
                    {fieldErrors.email[0]}
                  </span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="modal-organisation" className={styles.label}>
                  <span>
                    Organisation <span className={styles.requiredIndicator}>*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="modal-organisation"
                  name="organisation"
                  autoComplete="organization"
                  required
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.organisation)}
                  aria-describedby={
                    fieldErrors.organisation ? 'modal-organisation-error' : undefined
                  }
                  disabled={isSubmitting}
                  className={styles.input}
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="e.g. Apex Industrial Systems"
                />
                {fieldErrors.organisation && (
                  <span id="modal-organisation-error" className={styles.errorMessage} role="alert">
                    {fieldErrors.organisation[0]}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.submitActions}>
              <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Verifying Credentials...' : 'Submit Profile Request'}
              </Button>
              <p className={styles.securityNote}>
                Identity verification required for institutional distribution. Zero commercial marketing
                or spam.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
