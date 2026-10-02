import React from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section style={{ padding: 'var(--space-24) 0', textAlign: 'center' }}>
      <Container narrow>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            display: 'inline-block',
            marginBottom: 'var(--space-2)',
          }}
        >
          404 — Page Not Found
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            color: 'var(--color-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          This page does not exist.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-text)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-8)',
          }}
        >
          The link you followed may be broken, or the page may have been moved.
          Explore how ThinkingHead approaches systems and transformation:
        </p>
        <Button href="/" variant="primary">
          Return to Homepage
        </Button>
      </Container>
    </section>
  );
}
