'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  // phase 0 = mount, 1 = logo in, 2 = text in, 3 = bar fills, 4 = fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 500);
    const t3 = setTimeout(() => setPhase(3), 900);
    const t4 = setTimeout(() => setPhase(4), 2400);
    const t5 = setTimeout(() => router.push('/login'), 2900);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [router]);

  return (
    <>
      <style>{`
        @keyframes splash-logo-in {
          from { opacity: 0; transform: scale(.72) translateY(12px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        @keyframes splash-text-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes splash-pulse {
          0%, 100% { opacity: .5; transform: scale(1); }
          50%       { opacity: 1;  transform: scale(1.12); }
        }
        @keyframes splash-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(148deg, #4A47F5 0%, #7C3AED 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: phase >= 4 ? 'splash-fade-out .5s ease forwards' : 'none',
        overflow: 'hidden',
      }}>

        {/* grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />

        {/* glow orbs */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 10%, rgba(255,255,255,.22) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(124,58,237,.7) 0%, transparent 50%)', pointerEvents: 'none' }} />

        {/* center content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* logo mark */}
          <div style={{
            animation: phase >= 1 ? 'splash-logo-in .55s cubic-bezier(.34,1.56,.64,1) forwards' : 'none',
            opacity: phase >= 1 ? undefined : 0,
          }}>
            {/* outer ring */}
            <div style={{ position: 'relative', width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: '1.5px solid rgba(255,255,255,.25)', animation: 'splash-pulse 2s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: 8, borderRadius: 999, border: '1.5px solid rgba(255,255,255,.18)', animation: 'splash-pulse 2s ease-in-out .3s infinite' }} />

              {/* logo square */}
              <div style={{ width: 64, height: 64, borderRadius: 22, background: 'rgba(255,255,255,.18)', border: '1.5px solid rgba(255,255,255,.4)', display: 'grid', placeItems: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(20,20,26,.2), inset 0 1px 0 rgba(255,255,255,.3)' }}>
                <div style={{ width: 28, height: 28, background: '#fff', borderRadius: 8, boxShadow: '0 0 20px rgba(255,255,255,.8)' }} />
              </div>
            </div>
          </div>

          {/* wordmark + tagline */}
          <div style={{
            marginTop: 24, textAlign: 'center',
            animation: phase >= 2 ? 'splash-text-in .5s ease forwards' : 'none',
            opacity: phase >= 2 ? undefined : 0,
          }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 32, letterSpacing: '.18em', color: '#fff', textShadow: '0 2px 20px rgba(255,255,255,.2)' }}>
              TICMI
            </div>
            <div style={{ fontFamily: 'var(--f-sans)', fontSize: 13, color: 'rgba(255,255,255,.65)', letterSpacing: '.08em', marginTop: 6, textTransform: 'uppercase' as const, fontWeight: 500 }}>
              Adaptive Classroom AI
            </div>

            {/* badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, padding: '5px 12px', borderRadius: 999, background: 'rgba(255,255,255,.13)', border: '1px solid rgba(255,255,255,.22)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#86EFAC', boxShadow: '0 0 7px #86EFAC', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'rgba(255,255,255,.88)', letterSpacing: '.12em' }}>v3.0.0</span>
            </div>
          </div>
        </div>

        {/* bottom loading bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,.12)' }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,.6), #fff)',
            borderRadius: '0 2px 2px 0',
            animation: phase >= 3 ? 'splash-bar 1.5s cubic-bezier(.4,0,.2,1) forwards' : 'none',
            width: phase >= 3 ? undefined : '0%',
          }} />
        </div>

        {/* bottom label */}
        <div style={{
          position: 'absolute', bottom: 36,
          fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'rgba(255,255,255,.38)', letterSpacing: '.12em',
          animation: phase >= 2 ? 'splash-text-in .5s .2s ease forwards' : 'none',
          opacity: phase >= 2 ? undefined : 0,
        }}>
          FOR SMA INDONESIA
        </div>
      </div>
    </>
  );
}
