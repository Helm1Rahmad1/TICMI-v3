'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

export default function TeachMePage() {
  const router = useRouter();

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#FBFAF7 0%,#fff 30%)' }}>

      {/* Kiko header */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)' }}>
        <button onClick={() => router.back()} className="icon-btn" style={{ width: 36, height: 36, borderRadius: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="avatar avatar--slate" style={{ width: 36, height: 36, fontSize: 13, position: 'relative' }}>
          K
          <span style={{ position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: 999, background: 'var(--ok)', border: '2px solid #fff' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Kiko</div>
          <div style={{ fontSize: 11, color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ display: 'flex', gap: 2 }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 4, height: 4, borderRadius: 999, background: 'var(--ok)' }} />)}
            </span>
            berpikir…
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '.08em' }}>PENGUASAAN</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <div style={{ width: 46, height: 6, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '62%', height: '100%', background: 'var(--grad)' }} />
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600 }}>62</span>
          </div>
        </div>
      </div>

      {/* concept chips */}
      <div style={{ padding: '10px 16px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
          { l: 'Resiprokal', s: 'ok' }, { l: 'Op. invers', s: 'ok' },
          { l: 'Umum n', s: 'cur' },   { l: 'Eksp. nol', s: 'err' },
        ].map(c => (
          <div key={c.l} style={{
            padding: '5px 10px 5px 8px', borderRadius: 999, fontSize: 11, whiteSpace: 'nowrap',
            background: c.s === 'ok' ? 'var(--ok-bg)' : c.s === 'cur' ? 'rgba(91,91,247,.10)' : 'var(--err-bg)',
            color: c.s === 'ok' ? 'var(--ok)' : c.s === 'cur' ? 'var(--indigo)' : 'var(--err)',
            display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />{c.l}
          </div>
        ))}
      </div>

      {/* chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', margin: '4px 0' }}>
          SESI DIMULAI 02:14 LALU
        </div>

        {/* Kiko msg */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div className="avatar avatar--slate" style={{ width: 24, height: 24, fontSize: 10 }}>K</div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', fontSize: 13.5, maxWidth: 260, lineHeight: 1.5, boxShadow: 'var(--sh-1)' }}>
            Tunggu — jadi 2⁻³ itu bukan negatif? Kenapa minus berarti "bagi"?
          </div>
        </div>

        {/* Student reply */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ background: 'var(--ink)', color: '#fff', padding: '10px 14px', borderRadius: '18px 18px 4px 18px', fontSize: 13.5, maxWidth: 260, lineHeight: 1.5 }}>
            Bayangkan kali 2 itu naik satu tangga. Eksponen minus berarti turun — jadi kamu bagi.
          </div>
        </div>

        {/* Kiko reply */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div className="avatar avatar--slate" style={{ width: 24, height: 24, fontSize: 10 }}>K</div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', fontSize: 13.5, maxWidth: 260, lineHeight: 1.5, boxShadow: 'var(--sh-1)' }}>
            Ohh — jadi 2⁻³ = 1/2/2/2 = 1/8?
            <div style={{ marginTop: 8, padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 8, fontFamily: 'var(--f-mono)', fontSize: 13 }}>2⁻³ = 1/8 ✓</div>
          </div>
        </div>

        {/* level up */}
        <div style={{ alignSelf: 'center', padding: '8px 12px', borderRadius: 14, background: 'rgba(91,91,247,.08)', border: '1px dashed rgba(91,91,247,.3)', fontSize: 11.5, color: 'var(--indigo)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
          {I.zap({ size: 13, stroke: 'var(--indigo)' })} Kiko naik level · Bloom L3 · Aplikasi
        </div>

        {/* Kiko next question */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div className="avatar avatar--slate" style={{ width: 24, height: 24, fontSize: 10 }}>K</div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', fontSize: 13.5, maxWidth: 260, lineHeight: 1.5, boxShadow: 'var(--sh-1)' }}>
            Tapi… bagaimana dengan 2⁰? Itu 1 dibagi 2 sebanyak nol kali?
            <span className="caret" />
          </div>
        </div>
      </div>

      {/* quick replies */}
      <div style={{ padding: '4px 16px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['Nilainya 1', 'Coba n=0 secara numerik', 'Gambar polanya'].map(s => (
          <button key={s} style={{ padding: '8px 12px', borderRadius: 999, fontSize: 12, background: '#fff', border: '1px solid var(--line)', whiteSpace: 'nowrap', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 5 }}>
            {I.spark({ size: 11, stroke: 'var(--indigo)' })} {s}
          </button>
        ))}
      </div>

      {/* composer */}
      <div style={{ padding: '8px 14px 14px', borderTop: '1px solid var(--line)', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 14, flexShrink: 0 }}>{I.plus({ size: 18 })}</button>
          <div style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 22, fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, minHeight: 42 }}>
            <span style={{ flex: 1 }}>Ajarkan Kiko…</span>
            {I.mic({ size: 16, stroke: 'var(--muted)' })}
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 14, background: 'var(--grad)', color: '#fff', border: 0, display: 'grid', placeItems: 'center', flexShrink: 0, boxShadow: '0 6px 16px -4px rgba(91,91,247,.5)' }}>
            {I.send({ size: 16, stroke: '#fff' })}
          </button>
        </div>
      </div>
    </div>
  );
}
