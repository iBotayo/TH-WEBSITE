import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import { getAllInsights, getInsightBySlug } from '@/lib/insights';
import styles from './page.module.css';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const insights = await getAllInsights();
  return insights.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getInsightBySlug(params.slug);

  if (!post) {
    return {
      title: 'Publication Not Found — ThinkingHead',
      description: 'The requested publication is not available.',
    };
  }

  return {
    title: `${post.title} — ThinkingHead Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — ThinkingHead Insights`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const post = await getInsightBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Basic structured renderer for markdown content blocks
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${key++}`}>{currentParagraph.join(' ')}</p>
        );
        currentParagraph = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph();
        continue;
      }

      if (trimmed.startsWith('### ')) {
        flushParagraph();
        elements.push(<h3 key={`h3-${key++}`}>{trimmed.slice(4)}</h3>);
      } else if (trimmed.startsWith('## ')) {
        flushParagraph();
        elements.push(<h2 key={`h2-${key++}`}>{trimmed.slice(3)}</h2>);
      } else if (trimmed.startsWith('> ')) {
        flushParagraph();
        elements.push(
          <blockquote key={`bq-${key++}`}>{trimmed.slice(2)}</blockquote>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph();
        elements.push(
          <li key={`li-${key++}`}>{trimmed.slice(2)}</li>
        );
      } else {
        currentParagraph.push(trimmed);
      }
    }

    flushParagraph();
    return elements;
  };

  return (
    <article className={styles.articleContainer}>
      <Container narrow>
        <Link href="/insights" className={styles.backLink}>
          ← Back to Insights
        </Link>

        <header className={styles.articleHeader}>
          <span className={styles.categoryBadge}>{post.category}</span>
          <h1 className={styles.articleTitle}>{post.title}</h1>

          <div className={styles.metaBar}>
            <span>{post.author}</span>
            <span className={styles.metaDivider} aria-hidden="true">·</span>
            <span>{post.role}</span>
            <span className={styles.metaDivider} aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date}</time>
            <span className={styles.metaDivider} aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className={styles.articleBody}>{renderContent(post.content)}</div>

        <footer className={styles.articleFooter}>
          <div className={styles.authorBox}>
            <span className={styles.authorName}>{post.author}</span>
            <span className={styles.authorRole}>{post.role} · ThinkingHead Nigeria Limited</span>
          </div>

          <div style={{ marginTop: 'var(--space-4)' }}>
            <Link href="/insights" className={styles.backLink}>
              ← Return to all Insights
            </Link>
          </div>
        </footer>
      </Container>
    </article>
  );
}
