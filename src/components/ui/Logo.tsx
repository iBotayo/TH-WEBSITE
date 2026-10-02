import Link from 'next/link';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

/**
 * Logo Slot Component
 * 
 * Provides an accessible anchor leading to home.
 * Contains a restrained textual mark clearly identified as an implementation-level
 * placeholder awaiting official SVG vector delivery (Lightbulb-brain mark + Wordmark).
 */
export default function Logo({ className = '', isFooter = false }: LogoProps) {
  return (
    <Link href="/" className={`${styles.logoLink} ${className}`} aria-label="ThinkingHead Home">
      <span className={styles.markSlot} aria-hidden="true" title="Slot for approved SVG mark">
        TH
      </span>
      <span className={styles.textWrapper}>
        <span className={styles.wordmark}>ThinkingHead</span>
        {!isFooter && (
          <span className={styles.placeholderNotice}>
            [Brand Asset Slot]
          </span>
        )}
      </span>
    </Link>
  );
}
