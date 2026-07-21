/** Definicja nawigacji głównej i stopki. */

export interface NavItem {
  label: string;
  href: string;
  /** Link zewnętrzny (otwiera w nowej karcie). */
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { label: 'Start', href: '/' },
  { label: 'O mnie', href: '/o-mnie' },
  { label: 'Rekolekcje', href: '/rekolekcje' },
  { label: 'Blog', href: '/blog' },
  { label: 'Linki', href: '/linki' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const footerNav: NavItem[] = [
  { label: 'Start', href: '/' },
  { label: 'O mnie', href: '/o-mnie' },
  { label: 'Rekolekcje ignacjańskie', href: '/rekolekcje' },
  { label: 'Blog', href: '/blog' },
  { label: 'Linki', href: '/linki' },
  { label: 'Kontakt', href: '/kontakt' },
];
