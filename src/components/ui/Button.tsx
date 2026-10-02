import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'textLink';
  fullWidth?: boolean;
  className?: string;
}

type ButtonAsButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  href,
  ...rest
}: ButtonProps) {
  const combinedClassName = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
