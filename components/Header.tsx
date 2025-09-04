'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'Home' },
  { href: '/create', label: 'Create Event' },
  { href: '/myevents', label: 'My Events' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <nav className="container">
        <div style={{fontWeight:900, letterSpacing:1}}>🎟️ Mini EMS</div>
        <div style={{flex:1}}></div>
        {items.map(it => (
          <Link key={it.href} className={pathname===it.href ? 'active' : ''} href={it.href}>{it.label}</Link>
        ))}
      </nav>
    </header>
  );
}
