'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { I } from './icons';
import { useRole } from '@/lib/RoleContext';
// useRole sekarang return Role langsung (bukan { role, setRole })

type Tab = { key: string; label: string; href: string; icon: keyof typeof I; fab?: boolean };

const TEACHER_TABS: Tab[] = [
  { key: 'home',    label: 'Beranda', href: '/teacher',                 icon: 'home'   },
  { key: 'class',   label: 'Kelas',   href: '/teacher/classes',         icon: 'layers' },
  { key: 'teach',   label: 'Ajar',    href: '/student/teach-me',        icon: 'zap',   fab: true },
  { key: 'heatmap', label: 'Heatmap', href: '/intelligence/heatmap',    icon: 'grid'   },
  { key: 'me',      label: 'Profil',  href: '/teacher/me',              icon: 'cog'    },
];

const STUDENT_TABS: Tab[] = [
  { key: 'home',    label: 'Beranda', href: '/student',                  icon: 'home'   },
  { key: 'class',   label: 'Kelas',   href: '/student/classes',          icon: 'layers' },
  { key: 'teach',   label: 'Ajar',    href: '/student/teach-me',         icon: 'zap',   fab: true },
  { key: 'map',     label: 'Peta',    href: '/student/map',               icon: 'graph'  },
  { key: 'me',      label: 'Profil',  href: '/student/me',               icon: 'star'   },
];

export function BottomNav() {
  const pathname = usePathname();
  const role = useRole();
  const TABS = role === 'student' ? STUDENT_TABS : TEACHER_TABS;

  const isActive = (href: string) => pathname === href;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      zIndex: 40,
      padding: '0 16px',
      paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      pointerEvents: 'none',
    }}>
      <nav style={{
        width: '100%',
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'saturate(1.6) blur(24px)',
        borderRadius: 999,
        boxShadow: '0 8px 32px rgba(20,20,26,.14), 0 2px 8px rgba(20,20,26,.08)',
        border: '1px solid rgba(255,255,255,.6)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 8px',
        pointerEvents: 'all',
        position: 'relative',
      }}>
        {TABS.map((t: Tab) => {
          const active = isActive(t.href);

          if (t.fab) {
            return (
              <Link key={t.key} href={t.href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                textDecoration: 'none', marginTop: -28,
              }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 999,
                  background: 'var(--grad)',
                  display: 'grid', placeItems: 'center',
                  boxShadow: '0 8px 24px -4px rgba(91,91,247,.6), 0 2px 8px rgba(91,91,247,.3)',
                  color: '#fff',
                  border: '3px solid rgba(255,255,255,.9)',
                }}>
                  {I.zap({ size: 22, stroke: '#fff' })}
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: active ? 'var(--indigo)' : 'var(--ink)' }}>
                  {t.label}
                </div>
              </Link>
            );
          }

          return (
            <Link key={t.key} href={t.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '4px 14px', textDecoration: 'none', borderRadius: 999,
              background: active ? 'rgba(91,91,247,.08)' : 'transparent',
              transition: 'background .15s',
            }}>
              {I[t.icon]({ size: 22, stroke: active ? 'var(--indigo)' : 'rgba(20,20,26,.4)' })}
              <div style={{
                fontSize: 10, fontWeight: active ? 600 : 400,
                color: active ? 'var(--indigo)' : 'rgba(20,20,26,.45)',
              }}>
                {t.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
