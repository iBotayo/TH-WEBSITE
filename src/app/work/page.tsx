import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { signatureProjectsData, industryClustersData } from '@/content/static/projects';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Work — ThinkingHead | Signature Projects',
  description:
    'LinguaRoots, ChurchFlow, enterprise transformation — systems researched, built, deployed and measured.',
};

export default function WorkPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="work-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Layer 3: Built</span>
            <h1 id="work-hero-title" className={styles.heroTitle}>
              Signature projects — the method, made real.
            </h1>
            <p className={styles.heroLead}>
              Every project below went through our eight-step method: research first, then design,
              then a working system — delivered, deployed and measured. Nothing here is boilerplate.
            </p>
          </div>
        </Container>
      </section>

      {/* SIGNATURE PROJECTS */}
      <section className={styles.section} aria-label="Signature Projects List">
        <Container>
          <div className={styles.projectsList}>
            {signatureProjectsData.map((project) => (
              <Card key={project.id} className={styles.projectCard}>
                <div className={styles.projectTags}>
                  {project.sectorTags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className={styles.projectName}>{project.name}</h2>
                <p className={styles.projectDesc}>{project.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* INDUSTRIES SERVED */}
      <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="industries-title">
        <Container>
          <SectionHeading
            badge="Sectors & Institutions"
            title="Industries Served"
            description="Our standard of rigorous diagnosis and disciplined engineering applies across three key institutional clusters."
            id="industries-title"
          />

          <div className={styles.industryClusterGrid}>
            {industryClustersData.map((cluster) => (
              <Card key={cluster.name}>
                <h3 className={styles.clusterTitle}>{cluster.name}</h3>
                <ul className={styles.sectorList}>
                  {cluster.sectors.map((sector) => (
                    <li key={sector} className={styles.sectorItem}>
                      • {sector}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CONFIDENTIALITY & CLOSING CTA */}
      <section className={styles.section}>
        <Container>
          <div className={styles.confidentialityBox}>
            <p className={styles.confidentialityText}>
              If you’d like to discuss any of this work in more depth, we’d welcome the conversation
              — subject to the confidentiality we keep for our clients.
            </p>
            <Button href="/contact" variant="primary">
              Let’s talk
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
