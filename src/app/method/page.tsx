import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import MethodAccordion from '@/components/method/MethodAccordion';
import { methodData } from '@/content/static/method';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Method — ThinkingHead | Eight Steps from Insight to Scale',
  description:
    'Discover, Research, Analyse, Design, Build, Deploy, Measure, Scale. One method, every engagement.',
};

export default function MethodPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="method-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Layer 2: Thinking</span>
            <h1 id="method-hero-title" className={styles.heroTitle}>
              An eight-step methodology from insight to scale.
            </h1>
            <p className={styles.heroLead}>
              Every engagement — from a focused research sprint to a multi-phase build —
              runs through the same eight steps. It keeps the work disciplined and keeps you
              informed at every stage. One accountable partner carries the engagement from
              start to finish.
            </p>
          </div>
        </Container>
      </section>

      {/* METHOD TIMELINE */}
      <section className={styles.methodSection} aria-label="Methodology Steps">
        <Container>
          <SectionHeading
            align="center"
            badge="Process Discipline"
            title="Eight Steps. One Partner. Delivery You Can Watch."
            description="Clear checkpoints and tangible deliverables at every phase of the project lifecycle."
          />

          <MethodAccordion steps={methodData} />
        </Container>
      </section>

      {/* CLOSING CTA */}
      <section className={styles.closingCta}>
        <Container>
          <p className={styles.closingTagline}>
            Eight steps. One partner. Delivery you can watch.
          </p>
          <h2 className={styles.closingTitle}>Ready to start?</h2>
          <Button href="/contact" variant="primary">
            Let’s talk
          </Button>
        </Container>
      </section>
    </>
  );
}
