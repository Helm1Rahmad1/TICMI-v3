'use client';

import { usePathname } from 'next/navigation';
import { MobileHeader } from '@/components/shared/MobileHeader';
import { BottomNav } from '@/components/shared/BottomNav';
import { RoleProvider } from '@/lib/RoleContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFocusedTask = pathname === '/student/teach-me' || pathname === '/student/assignments';

  return (
    <RoleProvider>
      {!isFocusedTask && <MobileHeader />}
      {children}
      {!isFocusedTask && <BottomNav />}
    </RoleProvider>
  );
}

