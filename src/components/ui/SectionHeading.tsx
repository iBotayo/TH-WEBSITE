import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  level?: 1 | 2 | 3;
  id?: string;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  level = 2,
  id,
  className = '',
}: SectionHeadingProps) {
  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <div
      className={`${styles.wrapper} ${styles[align]} ${className}`}
    >
      {badge && <span className={styles.badge}>{badge}</span>}
      <HeadingTag id={id} className={styles.title}>
        {title}
      </HeadingTag>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
