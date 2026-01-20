'use client';

import Sidebar from '@/components/Sidebar';
import { AppProvider } from '@/context/AppContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 overflow-auto">{children}</main>
      </div>
    </AppProvider>
  );
}

