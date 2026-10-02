'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import styles from './ProfileDownloadGate.module.css';

const ProfileModal = dynamic(() => import('./ProfileModal'), { ssr: false });



export default function ProfileDownloadGate() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#profile-download') {
        setIsModalOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <>
      <div id="profile-download" className={styles.gateCard}>
        <div>
          <div className={styles.gateHeader}>
            <span className={styles.badge}>Gated Document</span>
            <h3 className={styles.gateTitle}>16-Page Corporate Profile</h3>
            <p className={styles.gateText}>
              A comprehensive overview of ThinkingHead Nigeria Limited: our institutional philosophy,
              eight core practice pillars, eight-stage delivery methodology, and leadership governance.
            </p>
          </div>

          <ul className={styles.specsList} aria-label="Corporate Profile Document Specifications">
            <li className={styles.specItem}>
              <span className={styles.specBullet} aria-hidden="true">•</span>
              <span>16 Pages · PDF Document Format</span>
            </li>
            <li className={styles.specItem}>
              <span className={styles.specBullet} aria-hidden="true">•</span>
              <span>Practice Pillars 01–08 Detailed Breakdown</span>
            </li>
            <li className={styles.specItem}>
              <span className={styles.specBullet} aria-hidden="true">•</span>
              <span>Methodology & Verification Frameworks</span>
            </li>
            <li className={styles.specItem}>
              <span className={styles.specBullet} aria-hidden="true">•</span>
              <span>Identity Verification Required for Distribution</span>
            </li>
          </ul>
        </div>

        <div className={styles.actionArea}>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isModalOpen}
          >
            Request Corporate Profile
          </Button>
          <div className={styles.editorialNotice}>
            [Approved Document in Final Editorial Certification — Instant Notification on Release]
          </div>
        </div>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
