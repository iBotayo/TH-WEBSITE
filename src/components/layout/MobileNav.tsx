'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import styles from './MobileNav.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  navItems: NavItem[];
}

export default function MobileNav({ navItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Toggle open state
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Close helper
  const handleClose = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  // Lock body scroll and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={`${styles.menuToggle} ${isOpen ? styles.isOpen : ''}`}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-overlay"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={handleToggle}
      >
        <span className={styles.bar} aria-hidden="true" />
        <span className={styles.bar} aria-hidden="true" />
        <span className={styles.bar} aria-hidden="true" />
      </button>

      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
      >
        <nav aria-label="Mobile Primary Navigation">
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={handleClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileCtaWrapper}>
          <Button
            href="/contact"
            variant="primary"
            fullWidth
            onClick={handleClose}
          >
            Let’s Talk
          </Button>
        </div>

        <div className={styles.registrationMeta}>
          <p>ThinkingHead Nigeria Limited · RC 8611016</p>
          <p>Kaduna, Nigeria</p>
        </div>
      </div>
    </>
  );
}
