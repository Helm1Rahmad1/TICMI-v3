import { MobileHeader } from '@/components/shared/MobileHeader';
import { BottomNav } from '@/components/shared/BottomNav';
import { RoleProvider } from '@/lib/RoleContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <MobileHeader />
      {children}
      <BottomNav />
    </RoleProvider>
  );
}
