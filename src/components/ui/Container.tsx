import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  narrow = false,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  const combinedClassName = [
    styles.container,
    narrow ? styles.narrow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={combinedClassName}>{children}</Component>;
}
