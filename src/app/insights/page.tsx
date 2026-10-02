import React from 'react';
import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import { getAllInsights } from '@/lib/insights';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Insights — ThinkingHead | Research, Frameworks & Perspectives',
  description:
    'Original thinking on AI, systems, African markets and institutional transformation — from ThinkingHead’s practice.',
};

export default async function InsightsPage() {
  const insights = await getAllInsights();

  return (
    <>
      {/* HERO */}
      <section className={styles.pageHero} aria-labelledby="insights-hero-title">
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Layer 4: Knowledge</span>
            <h1 id="insights-hero-title" className={styles.heroTitle}>
              Research, frameworks and perspectives.
            </h1>
            <p className={styles.heroLead}>
              We publish our intellectual capital to help African institutions think
              rigorously about systems, technology, and transformation.
            </p>
          </div>
        </Container>
      </section>

      {/* PUBLICATION CONTENT / DIGNIFIED EMPTY STATE */}
      <section className={styles.section} aria-label="Insights Directory">
        <Container>
          {insights.length === 0 ? (
            /* Dignified Empty State: Gracefully handles zero published articles */
            <div className={styles.emptyStateCard}>
              <div className={styles.emptyIcon} aria-hidden="true">
                📖
              </div>
              <h2 className={styles.emptyTitle}>Publications in Preparation</h2>
              <p className={styles.emptyText}>
                ThinkingHead research notes, technical frameworks, and executive perspectives
                are currently being prepared for inaugural publication.
              </p>
              <span className={styles.emptyNotice}>
                [Approved Articles Forthcoming — No Fictional Content Published]
              </span>
            </div>
          ) : (
            <>
              {/* Category Filter Tabs */}
              <div className={styles.tabsList} role="tablist" aria-label="Filter insights by category">
                <button type="button" className={`${styles.tabItem} ${styles.tabItemActive}`}>
                  All
                </button>
                <button type="button" className={styles.tabItem}>
                  Research Notes
                </button>
                <button type="button" className={styles.tabItem}>
                  Frameworks
                </button>
                <button type="button" className={styles.tabItem}>
                  Perspectives
                </button>
              </div>

              {/* Grid */}
              <div className={styles.articlesGrid}>
                {insights.map((post) => (
                  <Card key={post.slug} interactive>
                    <span className={styles.badge}>{post.category}</span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: 'var(--space-4)' }}>
                      {post.excerpt}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>
                      <span>{post.author}</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
