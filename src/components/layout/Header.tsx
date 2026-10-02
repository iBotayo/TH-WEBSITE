import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import MobileNav from './MobileNav';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Method', href: '/method' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Leadership', href: '/leadership' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <Logo />

          <nav className={styles.desktopNav} aria-label="Primary Desktop Navigation">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopCta}>
              <Button href="/contact" variant="primary">
                Let’s Talk
              </Button>
            </div>
            <MobileNav navItems={NAV_ITEMS} />
          </div>
        </div>
      </Container>
    </header>
  );
}
