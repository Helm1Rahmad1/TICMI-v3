'use client';

import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

type Role = 'teacher' | 'student';

const RoleCtx = createContext<Role>('teacher');

/**
 * Role selalu inferred dari pathname.
 * Semua halaman siswa ada di /student/*
 * Semua halaman guru ada di /teacher/* atau /intelligence/*
 * → tidak ada ambiguitas, tidak perlu state/localStorage.
 */
export function RoleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role: Role = pathname.startsWith('/student') ? 'student' : 'teacher';
  return <RoleCtx.Provider value={role}>{children}</RoleCtx.Provider>;
}

export function useRole() {
  return useContext(RoleCtx);
}
