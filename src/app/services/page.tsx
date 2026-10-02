import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { servicesData } from '@/content/static/services';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Services — ThinkingHead | Eight Pillars from Research to Scale',
  description:
    'Research, AI, digital transformation, custom software, automation and capability development — under one accountable partner.',
};

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="services-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Layers 1–2: Belief + Thinking</span>
            <h1 id="services-hero-title" className={styles.heroTitle}>
              Eight service pillars. One accountable partner.
            </h1>
            <p className={styles.heroLead}>
              Our service architecture covers the full journey — from research and strategy
              to production systems, automation and capability transfer. Start where it hurts.
              We’ll show you how the other pillars connect.
            </p>

            {/* Quick In-Page Jump Anchor Links */}
            <div className={styles.quickNav} aria-label="Jump to pillar">
              {servicesData.map((pillar) => (
                <a
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  className={styles.jumpLink}
                >
                  {pillar.number} {pillar.name}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PILLARS STACK */}
      <section className={styles.pillarsStack} aria-label="Service Pillars List">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {servicesData.map((pillar) => (
              <article
                key={pillar.id}
                id={pillar.id}
                className={styles.pillarSection}
                aria-labelledby={`pillar-title-${pillar.id}`}
              >
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarNumber}>{pillar.number}</span>
                  <h2 id={`pillar-title-${pillar.id}`} className={styles.pillarName}>
                    {pillar.name}
                  </h2>
                </div>

                <div className={styles.pillarContent}>
                  {/* Content Notice: Retaining structural placeholder without inventing copy */}
                  <div className={styles.contentNotice}>
                    {pillar.description}
                  </div>

                  <ul className={styles.subServicesList}>
                    {pillar.subServices.map((sub, idx) => (
                      <li key={idx} className={styles.subServiceItem}>
                        — {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.outcomeBox}>
                  <p className={styles.outcomeText}>
                    You get: {pillar.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* END OF PAGE CTA */}
      <section className={styles.endCta}>
        <Container>
          <h2 className={styles.ctaTitle}>
            The pillars work together. Let’s find where to start.
          </h2>
          <p className={styles.ctaLead}>
            Whether you need a focused diagnostic sprint or end-to-end platform engineering.
          </p>
          <Button href="/contact" variant="primary">
            Start a conversation
          </Button>
        </Container>
      </section>
    </>
  );
}
