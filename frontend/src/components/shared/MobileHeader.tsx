'use client';

import Link from 'next/link';
import { I } from './icons';

export function MobileHeader() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      zIndex: 30,
      height: 54,
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(247,246,242,.88)',
      backdropFilter: 'saturate(1.4) blur(12px)',
      borderBottom: '1px solid rgba(20,20,26,.06)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}>
        <div className="brand-mark" style={{ width: 24, height: 24, borderRadius: 7 }} />
        <span style={{ fontFamily: 'var(--f-mono)', fontWeight: 600, fontSize: 12.5, letterSpacing: '.12em', color: 'var(--ink)' }}>
          TIC<em style={{ fontStyle: 'normal', background: 'var(--grad)', WebkitBackgroundClip: 'text', color: 'transparent' }}>MI</em>
        </span>
      </Link>

      <div style={{ flex: 1 }} />

      <button className="icon-btn" style={{ width: 34, height: 34, borderRadius: 11, position: 'relative', flexShrink: 0 }} aria-label="notifikasi">
        {I.bell({ size: 14 })}
        <span style={{ position: 'absolute', top: 7, right: 7, width: 6, height: 6, borderRadius: 999, background: 'var(--err)' }} />
      </button>
    </header>
  );
}
