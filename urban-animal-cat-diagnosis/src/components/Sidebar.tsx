'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Stethoscope, Heart, Home } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard/diagnose', label: 'Diagnose', icon: Stethoscope },
    { href: '/dashboard/health-tracker', label: 'Health Tracker', icon: Heart },
  ];

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-card p-6 md:block shadow-sm">
      <div className="mb-8 flex items-center space-x-3">
        <Logo className="h-10 w-10 text-primary" />
        <div>
          <h2 className="text-xl font-bold">Urban Animal</h2>
          <p className="text-xs text-muted-foreground">Pet Care Dashboard</p>
        </div>
      </div>
      
      <div className="mb-6">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground text-center">
          Keep your pet healthy and happy
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
