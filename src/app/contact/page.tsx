import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import ContactForm from '@/components/forms/ContactForm';
import ProfileDownloadGate from '@/components/forms/ProfileDownloadGate';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Let’s Talk — ThinkingHead | Start a Discovery Conversation',
  description:
    'Tell us the challenge. We’ll tell you what we’d do differently and what we’d do first. Discovery call intake and gated corporate profile request.',
};

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="contact-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Conversion</span>
            <h1 id="contact-hero-title" className={styles.heroTitle}>
              Let’s talk.
            </h1>
            <p className={styles.heroLead}>
              Tell us what isn’t working, what you want to achieve, and what’s been tried before.
              We’ll tell you honestly what we’d do differently — and what we’d do first.
              If the challenge is a fit, we scope it properly. If it isn’t, we’ll tell you that too.
            </p>
          </div>
        </Container>
      </section>

      {/* 3-STEP WALKTHROUGH */}
      <section
        className={`${styles.section} ${styles.sectionContrast}`}
        aria-labelledby="conversation-heading"
      >
        <Container>
          <SectionHeading
            badge="Consultation Protocol"
            title="How Our First Conversation Goes"
            description="A direct, dignified path to discussing your challenge — without sales funnels or automated chatbots."
            id="conversation-heading"
          />

          <div className={styles.stepsGrid}>
            <Card>
              <div className={styles.stepNumber}>01</div>
              <p className={styles.stepText}>
                You tell us what isn’t working, what you want to achieve, and what’s been tried before.
              </p>
            </Card>

            <Card>
              <div className={styles.stepNumber}>02</div>
              <p className={styles.stepText}>
                We’ll tell you honestly what we’d do differently — and what we’d do first.
              </p>
            </Card>

            <Card>
              <div className={styles.stepNumber}>03</div>
              <p className={styles.stepText}>
                If the challenge is a fit, we scope it properly. If it isn’t, we’ll tell you that too.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* INTERACTIVE FORM & DIRECT CHANNELS SECTION */}
      <section className={styles.section} aria-labelledby="engagement-intake-title">
        <Container>
          <div className={styles.contactMainGrid}>
            {/* Left Column: Interactive Discovery Call Intake Form */}
            <div>
              <ContactForm />
            </div>

            {/* Right Column: Direct Channels & Gated Corporate Profile Gate */}
            <div className={styles.sidebarColumn}>
              {/* Direct Channels */}
              <div className={styles.directBox}>
                <h2 id="engagement-intake-title" className={styles.directTitle}>
                  Direct Channels
                </h2>

                <div className={styles.directItem}>
                  <div className={styles.itemLabel}>Primary Email</div>
                  <div className={styles.itemValue}>
                    <a href="mailto:hello@thinkinghead.ng" className={styles.itemLink}>
                      hello@thinkinghead.ng
                    </a>
                  </div>
                </div>

                <div className={styles.directItem}>
                  <div className={styles.itemLabel}>Operational Inquiries</div>
                  <div className={styles.itemValue}>
                    <a href="mailto:thinkingheadng@gmail.com" className={styles.itemLink}>
                      thinkingheadng@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.directItem}>
                  <div className={styles.itemLabel}>Direct Telephone</div>
                  <div className={styles.itemValue}>
                    <a href="tel:+2347068349172" className={styles.itemLink}>
                      +234 706 834 9172
                    </a>
                  </div>
                </div>

                <div className={styles.directItem}>
                  <div className={styles.itemLabel}>Headquarters Address</div>
                  <div className={styles.itemValue}>
                    5 Pipeline Road, Bayan Dutse, Kaduna, Nigeria
                  </div>
                </div>
              </div>

              {/* Gated Corporate Profile Component */}
              <ProfileDownloadGate />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
