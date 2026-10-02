import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { leadershipData } from '@/content/static/leadership';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Leadership — ThinkingHead | Ben Shekari & Ayodeji Olaniyan',
  description:
    'Two founders. A combined 25 years in enterprise systems, banking technology, and frontier product development.',
};

export default function LeadershipPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="leadership-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Layers 1–2: Belief + Thinking</span>
            <h1 id="leadership-hero-title" className={styles.heroTitle}>
              Two founders. One standard: build it properly.
            </h1>
            <p className={styles.heroLead}>
              Companies are built by people — and the people matter most at the top.
              We lead client engagements personally, from first diagnostic question to
              final production handover.
            </p>
          </div>
        </Container>
      </section>

      {/* FOUNDER PROFILES */}
      <section className={styles.section} aria-label="Executive Leadership Profiles">
        <Container>
          <div className={styles.leadersGrid}>
            {leadershipData.map((leader) => (
              <article key={leader.id} className={styles.leaderCard}>
                {/* Clearly marked headshot asset placeholder */}
                <div className={styles.headshotSlot} aria-label={`Headshot slot for ${leader.name}`}>
                  <span className={styles.slotIcon} aria-hidden="true">
                    👤
                  </span>
                  <span className={styles.slotNotice}>
                    {leader.headshotAsset}
                  </span>
                </div>

                <h2 className={styles.leaderName}>{leader.name}</h2>
                <div className={styles.leaderRole}>{leader.role}</div>
                <p className={styles.leaderBio}>{leader.bio}</p>
              </article>
            ))}
          </div>

          <div className={styles.closingBox}>
            <p className={styles.closingQuote}>
              “We do the thinking and the building — and we stand behind both.”
            </p>
            <Button href="/contact" variant="primary">
              Start a conversation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
