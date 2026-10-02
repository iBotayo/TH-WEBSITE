import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import styles from './Footer.module.css';

const FOOTER_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Method', href: '/method' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Column 1: Identity & Registration */}
          <div className={styles.column}>
            <Logo isFooter />
            <p className={styles.tagline}>
              Improving Systems. Enabling Possibilities.
            </p>
            <p className={styles.registration}>
              ThinkingHead Nigeria Limited · RC 8611016
            </p>
            <p className={styles.registration}>
              Incorporated under CAMA 2020
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>Navigation</h3>
            <ul className={styles.linkList}>
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Contact Info */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>Headquarters</h3>
            <div className={styles.contactInfo}>
              <p>5 Pipeline Road, Bayan Dutse</p>
              <p>Kaduna, Nigeria</p>
              <p style={{ marginTop: 'var(--space-2)' }}>
                <a href="mailto:hello@thinkinghead.ng" className={styles.contactLink}>
                  hello@thinkinghead.ng
                </a>
              </p>
              <p>
                <a href="tel:+2347068349172" className={styles.contactLink}>
                  +234 706 834 9172
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Documented Actions */}
          <div className={`${styles.column} ${styles.ctaColumn}`}>
            <h3 className={styles.colTitle}>Engage</h3>
            <Button href="/contact" variant="primary" fullWidth>
              Let’s Talk
            </Button>
            <Button href="/contact#profile-download" variant="secondary" fullWidth>
              Download Corporate Profile
            </Button>
            <p className={styles.profileNotice}>
              [16-Page Corporate Profile PDF Forthcoming]
            </p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} ThinkingHead Nigeria Limited. All rights reserved.
          </p>
          <span className={styles.locationBadge}>
            Kaduna · Nigeria · Africa
          </span>
        </div>
      </Container>
    </footer>
  );
}
