import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { worldviewData } from '@/content/static/worldview';
import { differentiatorsData } from '@/content/static/differentiators';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About — ThinkingHead | Africa’s Trusted Partner in Transformation',
  description:
    'An AI-powered research, strategy and engineering firm. We are researchers who build, strategists who ship, engineers who stay.',
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="about-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Layer 1: Belief</span>
            <h1 id="about-hero-title" className={styles.heroTitle}>
              An AI-powered partner for the organisations shaping Africa’s future.
            </h1>
            <p className={styles.heroLead}>
              ThinkingHead is an AI-powered research, strategy and digital transformation
              company headquartered in Kaduna, Nigeria. We help governments, enterprises,
              development partners and mission-led organisations turn complex challenges
              into working systems — through deep research, systems thinking, artificial
              intelligence and disciplined engineering.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 2: IDENTITY STATEMENT */}
      <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="identity-heading">
        <Container>
          <div className={styles.identityBlock}>
            <span className={styles.badge}>Our Identity</span>
            <h2 id="identity-heading" className={styles.identityHeadline}>
              We are researchers who build. Strategists who ship. Engineers who stay until the system works.
            </h2>
            <p className={styles.identityBody}>
              Most firms stop at the recommendation. We arrive with the plan and the capacity to
              ship it. We don’t call an engagement done until the system is live, your people are
              trained, and you can run it yourself. That is the difference between a vendor and a
              partner.
            </p>
          </div>
        </Container>
      </section>

      {/* SECTION 3: WHAT WE BELIEVE (WORLDVIEW) */}
      <section className={styles.section} aria-labelledby="worldview-heading">
        <Container>
          <SectionHeading
            badge="Institutional Philosophy"
            title="What We Believe"
            description="Our worldview and principles about systems, technology, AI, organisations and Africa. The intellectual lens through which we approach every problem."
            id="worldview-heading"
          />

          <div className={styles.worldviewGrid}>
            {worldviewData.map((item) => (
              <Card key={item.id} className={styles.worldviewCard}>
                <div className={styles.worldviewTopic}>{item.topic}</div>
                <p className={styles.worldviewStatement}>{item.statement}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4: VISION & MISSION */}
      <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="vision-mission-heading">
        <Container>
          <div className={styles.visionMissionGrid}>
            <div className={styles.vmCard}>
              <span className={styles.vmBadge}>Our Vision</span>
              <h2 className={styles.vmTitle}>Africa’s trusted partner in transformation</h2>
              <p className={styles.vmText}>
                To become Africa’s trusted partner for transforming ideas, organisations
                and societies through research, innovation and intelligent technologies
                that create lasting impact.
              </p>
            </div>

            <div className={styles.vmCard}>
              <span className={styles.vmBadge}>Our Mission</span>
              <h2 className={styles.vmTitle}>Enabling possibilities through engineering</h2>
              <p className={styles.vmText}>
                We partner with governments, businesses, development organisations and
                communities to solve complex challenges through strategic research, systems
                thinking, AI and digital innovation — enabling sustainable growth and
                empowering possibilities.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5: EIGHT REASONS (WHY THINKINGHEAD) */}
      <section className={styles.section} aria-labelledby="why-us-heading">
        <Container>
          <SectionHeading
            badge="The ThinkingHead Standard"
            title="Eight Differentiators"
            description="Consultant-grade rigor paired with the capacity to build and sustain production systems."
            id="why-us-heading"
          />

          <div className={styles.diffGrid}>
            {differentiatorsData.map((diff) => (
              <Card key={diff.id} interactive className={styles.diffCard}>
                <h3 className={styles.diffName}>{diff.name}</h3>
                <p className={styles.diffDesc}>{diff.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6: REGISTRATION & INSTITUTIONAL DATA */}
      <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="registration-heading">
        <Container>
          <div className={styles.registrationBox}>
            <div>
              <span className={styles.badge}>Institutional Standing</span>
              <h2 id="registration-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                ThinkingHead Nigeria Limited
              </h2>
              <p className={styles.regText}>
                Registered with the Corporate Affairs Commission (CAC), Nigeria — RC 8611016
              </p>
              <p className={styles.regSub}>
                Incorporated under the Companies and Allied Matters Act (CAMA) 2020 · Headquartered in Kaduna, Nigeria
              </p>
            </div>
            <Button href="/contact#profile-download" variant="secondary">
              Download Corporate Profile
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
