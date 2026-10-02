import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  as?: React.ElementType;
}

export default function Card({
  children,
  interactive = false,
  className = '',
  as: Component = 'div',
}: CardProps) {
  const combinedClassName = [
    styles.card,
    interactive ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={combinedClassName}>{children}</Component>;
}
