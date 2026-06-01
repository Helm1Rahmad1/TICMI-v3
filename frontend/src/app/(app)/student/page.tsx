'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

export default function StudentHomePage() {
  const router = useRouter();
  const go = (r: string) => {
    const map: Record<string, string> = { teach: '/student/teach-me', concept: '/intelligence/concept-map', heatmap: '/intelligence/heatmap' };
    router.push(map[r] ?? `/${r}`);
  };

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, height: '100%', overflow: 'auto' }}>
      {/* header */}
      <div style={{ padding: '10px 22px 8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>SEL 26 MEI · HARI KE-18 🔥</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, lineHeight: 1.05, marginTop: 4, letterSpacing: '-.01em' }}>Halo, Devin</div>
        </div>
        <div className="avatar avatar--green" style={{ width: 38, height: 38, fontSize: 13 }}>D</div>
      </div>

      {/* continue card */}
      <div style={{ padding: '14px 22px 6px' }}>
        <div style={{ padding: '18px 18px', borderRadius: 22, background: 'linear-gradient(135deg,#5B5BF7,#8A4FFF)', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 14px 32px -10px rgba(91,91,247,.5)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,.28), transparent 50%)' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 78, height: 78, flexShrink: 0 }}>
              <svg viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34 * .62} ${2 * Math.PI * 34}`} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--f-serif)', fontSize: 24, lineHeight: 1 }}>62%</div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 8, opacity: .75, letterSpacing: '.08em' }}>MASTERED</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, opacity: .85, letterSpacing: '.1em' }}>LANJUT TEACH-ME</div>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 18, lineHeight: 1.2, marginTop: 4 }}>Eksponen negatif → resiprokal</div>
              <div style={{ fontSize: 11.5, opacity: .85, marginTop: 6 }}>Kiko butuh satu contoh lagi.</div>
            </div>
          </div>
          <button onClick={() => go('teach')} style={{ marginTop: 14, width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,.96)', color: '#5B5BF7', borderRadius: 14, border: 0, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            Lanjutkan sesi {I.arrow({ size: 14, stroke: '#5B5BF7' })}
          </button>
        </div>
      </div>

      {/* streak week */}
      <div style={{ padding: '16px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Minggu ini</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--muted)' }}>5 / 7 hari</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
          {['S','S','R','K','J','S','M'].map((d, i) => {
            const done = i < 5; const today = i === 4;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ height: 44, borderRadius: 14, background: done ? 'linear-gradient(180deg,rgba(91,91,247,.18),rgba(138,79,255,.10))' : 'var(--bg-2)', border: '1px solid ' + (today ? 'var(--indigo)' : 'var(--line)'), display: 'grid', placeItems: 'center', position: 'relative' }}>
                  {done && <span style={{ fontSize: 20 }}>🔥</span>}
                  {today && <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: 999, background: 'var(--indigo)' }} />}
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: today ? 'var(--indigo)' : 'var(--muted)', marginTop: 6, fontWeight: today ? 600 : 400 }}>{d}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* misi hari ini */}
      <div style={{ padding: '18px 22px 6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Misi hari ini</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--muted)' }}>3 / 5</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { d: true,  t: 'Review eksponen positif',  x: '+40 XP',  hot: false },
            { d: true,  t: 'Quiz matriks 2×2',         x: '+120 XP', hot: false },
            { d: false, t: 'Teach Kiko · neg. exp.',    x: '+180 XP', hot: true  },
            { d: false, t: 'Apply · 3 word problems',   x: '+90 XP',  hot: false },
            { d: false, t: 'Pair-teach with Hesti',     x: '+60 XP',  hot: false },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', border: '1px solid ' + (r.hot ? 'rgba(91,91,247,.35)' : 'var(--line)'), borderRadius: 16, background: r.hot ? 'linear-gradient(180deg,rgba(91,91,247,.04),#fff)' : '#fff', minHeight: 52 }}>
              <span style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', flexShrink: 0, background: r.d ? 'var(--ok-bg)' : r.hot ? 'rgba(91,91,247,.10)' : 'var(--bg-2)', border: '1px solid ' + (r.d ? 'transparent' : r.hot ? 'rgba(91,91,247,.25)' : 'var(--line)') }}>
                {r.d ? I.check({ size: 14, stroke: 'var(--ok)' }) : r.hot ? I.zap({ size: 14, stroke: 'var(--indigo)' }) : <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--muted-2)' }} />}
              </span>
              <div style={{ flex: 1, fontSize: 14, fontWeight: r.hot ? 600 : r.d ? 400 : 500, textDecoration: r.d ? 'line-through' : 'none', color: r.d ? 'var(--muted)' : 'var(--ink)' }}>{r.t}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: r.hot ? 'var(--indigo)' : 'var(--muted)', fontWeight: 600 }}>{r.x}</div>
            </div>
          ))}
        </div>
      </div>

      {/* streak + xp */}
      <div style={{ padding: '16px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ padding: '14px', border: '1px solid var(--line)', borderRadius: 16, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {I.flame({ size: 18, stroke: 'var(--warn)' })}
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em' }}>STREAK</span>
          </div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, marginTop: 6, lineHeight: 1 }}>18 <span style={{ fontSize: 13, color: 'var(--muted)' }}>hari</span></div>
        </div>
        <div style={{ padding: '14px', border: '1px solid var(--line)', borderRadius: 16, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {I.bolt({ size: 18, stroke: 'var(--indigo)' })}
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em' }}>XP HARI INI</span>
          </div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, marginTop: 6, lineHeight: 1 }}>320</div>
        </div>
      </div>

      {/* AI suggestion */}
      <div style={{ padding: '4px 22px 30px' }}>
        <div style={{ padding: '14px 16px', borderRadius: 16, background: 'linear-gradient(135deg,#14141A,#2A2A33)', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--grad)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            {I.brain({ size: 18, stroke: '#fff' })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, opacity: .65, letterSpacing: '.1em' }}>AI UNTUKMU</div>
            <div style={{ fontSize: 13, marginTop: 3, lineHeight: 1.4 }}>Hesti baru kuasai invers — pair-teach 10 mnt?</div>
          </div>
          {I.arrow({ size: 16, stroke: '#fff' })}
        </div>
      </div>
    </div>
  );
}
