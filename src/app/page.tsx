import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { servicesData } from '@/content/static/services';
import { methodData } from '@/content/static/method';
import { signatureProjectsData, industryClustersData } from '@/content/static/projects';
import { getRecentInsights } from '@/lib/insights';
import styles from './page.module.css';

export default async function HomePage() {
  const recentInsights = await getRecentInsights(2);

  return (
    <>
      {/* SECTION 1: HERO (Text-only, no images or video as mandated by BRD Section B Page 1) */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>
              Strategy · Research · Innovation · Engineering
            </span>
            <h1 id="hero-title" className={styles.heroTitle}>
              We turn complex challenges into working systems.
            </h1>
            <p className={styles.heroLead}>
              AI-powered research, strategy and engineering — from Kaduna, Nigeria,
              for the organisations shaping Africa’s future.
            </p>
            <div className={styles.heroCtas}>
              <Button href="/contact" variant="primary">
                Let’s Talk
              </Button>
              <Button href="/method" variant="textLink">
                See how we work →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: THE STANDARD (Layer 1: Belief) */}
      <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="standard-heading">
        <Container>
          <SectionHeading
            badge="Layer 1: Belief"
            title="Consulting-grade insight. Enterprise-grade delivery."
            description="Every engagement meets a single standard: the strategy must be defensible, the technology must be production-ready, and the outcome must be measurable."
            id="standard-heading"
          />

          <div className={styles.standardGrid}>
            <Card>
              <h3 className={styles.standardCardTitle}>Defensible strategy</h3>
              <p className={styles.standardCardText}>
                Every recommendation backed by evidence you can examine, challenge
                and defend to your own stakeholders.
              </p>
            </Card>

            <Card>
              <h3 className={styles.standardCardTitle}>Production-ready technology</h3>
              <p className={styles.standardCardText}>
                We build to run. Secured, tested, maintainable long after launch.
                Not demos. Not prototypes. Systems.
              </p>
            </Card>

            <Card>
              <h3 className={styles.standardCardTitle}>Measurable outcomes</h3>
              <p className={styles.standardCardText}>
                We agree what success looks like at the start and report against it
                at the end.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* SECTION 3: WHAT WE DO (Layer 1–2: Belief + Thinking) */}
      <section className={styles.section} aria-labelledby="services-heading">
        <Container>
          <SectionHeading
            badge="Layers 1–2: Belief + Thinking"
            title="Eight service pillars. One accountable partner."
            description="Our service architecture covers the full journey — from research and strategy to production systems, automation and capability transfer."
            id="services-heading"
          />

          <div className={styles.pillarsGrid}>
            {servicesData.map((pillar) => (
              <Card key={pillar.id} interactive className={styles.pillarCard}>
                <span className={styles.pillarNumber}>{pillar.number}</span>
                <h3 className={styles.pillarName}>{pillar.name}</h3>
                <p className={styles.pillarOutcome}>{pillar.outcome}</p>
                <Link href={`/services#${pillar.id}`} className={styles.pillarLink}>
                  See pillar details →
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4: HOW WE WORK (Layer 2: Thinking) */}
      <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="method-heading">
        <Container>
          <SectionHeading
            badge="Layer 2: Thinking"
            title="Eight steps. One partner. Delivery you can watch."
            description="Every engagement — from a focused research sprint to a multi-phase build — runs through the same eight steps. The work is disciplined. You are informed at every stage."
            id="method-heading"
          />

          <div className={styles.pipelineVisual}>
            {methodData.map((m) => (
              <div key={m.step} className={styles.pipelineStep}>
                <div className={styles.pipelineStepNumber}>{m.step}</div>
                <div className={styles.pipelineStepName}>{m.name}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
            <Button href="/method" variant="secondary">
              See the method in detail →
            </Button>
          </div>
        </Container>
      </section>

      {/* SECTION 5: THE WORK (Layer 3: Built) */}
      <section className={styles.section} aria-labelledby="work-heading">
        <Container>
          <SectionHeading
            badge="Layer 3: Built"
            title="The method, made real."
            description="Signature projects researched, engineered, deployed, and measured."
            id="work-heading"
          />

          <div className={styles.workGrid}>
            {signatureProjectsData.slice(0, 3).map((project) => (
              <Card key={project.id} interactive className={styles.projectCard}>
                <div className={styles.projectTags}>
                  {project.sectorTags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <Link href="/work" className={styles.pillarLink}>
                  Read project overview →
                </Link>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
            <Button href="/work" variant="secondary">
              See all work →
            </Button>
          </div>
        </Container>
      </section>

      {/* SECTION 6: FROM OUR THINKING (Layer 4: Knowledge)
          Strictly conditional: Only renders when published articles exist */}
      {recentInsights.length > 0 && (
        <section className={`${styles.section} ${styles.sectionContrast}`} aria-labelledby="insights-heading">
          <Container>
            <SectionHeading
              badge="Layer 4: Knowledge"
              title="From Our Thinking"
              description="Research notes, frameworks and perspectives from ThinkingHead’s practice."
              id="insights-heading"
            />
            <div className={styles.workGrid}>
              {recentInsights.map((insight) => (
                <Card key={insight.slug} interactive>
                  <span className={styles.heroBadge}>{insight.category}</span>
                  <h3 className={styles.projectName}>{insight.title}</h3>
                  <p className={styles.projectDesc}>{insight.excerpt}</p>
                  <Link href={`/insights/${insight.slug}`} className={styles.pillarLink}>
                    Read insight →
                  </Link>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 7: INDUSTRIES */}
      <section className={styles.section} aria-labelledby="industries-heading">
        <Container>
          <SectionHeading
            title="The challenges differ by sector. The standard doesn’t."
            description="We serve organisations across three major institutional clusters in Nigeria and Africa."
            id="industries-heading"
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

      {/* SECTION 8: CLOSING CTA */}
      <section className={`${styles.section} ${styles.sectionContrast}`}>
        <Container>
          <div className={styles.closingBanner}>
            <h2 className={styles.closingTitle}>Let’s build something that works.</h2>
            <p className={styles.closingLead}>
              Tell us what isn’t working, what you want to achieve, and what’s been
              tried before. We’ll tell you honestly what we’d do differently — and
              what we’d do first.
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
