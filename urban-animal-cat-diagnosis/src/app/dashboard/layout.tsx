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
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </AppProvider>
  );
}

