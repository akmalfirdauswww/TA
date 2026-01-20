'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard/welcome', label: 'Welcome' },
    { href: '/dashboard/diagnose', label: 'Diagnose' },
  ];

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-card p-4 md:block">
      <div className="mb-8 flex items-center space-x-4">
        <Logo className="h-8 w-8 text-primary" />
        <h2 className="text-xl font-bold">Cat Diagnosis</h2>
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-foreground hover:bg-muted',
              pathname === link.href && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
