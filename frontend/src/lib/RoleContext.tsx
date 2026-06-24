'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Role = 'teacher' | 'student';

const RoleCtx = createContext<Role>('student');

/**
 * Role context management.
 * Synced with localStorage to prevent role leaks on shared pages like /student/teach-me.
 */
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<Role>('student');

  useEffect(() => {
    const saved = localStorage.getItem('user-role') as Role;
    let currentRole: Role = saved || (pathname.startsWith('/student') ? 'student' : 'teacher');

    // Only switch roles on core non-shared pages
    if (pathname.startsWith('/student') && pathname !== '/student/teach-me') {
      currentRole = 'student';
    } else if (pathname.startsWith('/teacher') || pathname.startsWith('/intelligence')) {
      currentRole = 'teacher';
    }

    setRole(currentRole);
    localStorage.setItem('user-role', currentRole);
  }, [pathname]);

  return <RoleCtx.Provider value={role}>{children}</RoleCtx.Provider>;
}

export function useRole() {
  return useContext(RoleCtx);
}

