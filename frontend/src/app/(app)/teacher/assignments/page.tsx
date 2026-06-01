'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

export default function AssignmentsPage() {
  const router = useRouter();
  const [hints, setHints] = useState(0);

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      <div style={{ padding: '10px 22px 6px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>ASSIGNMENTS</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Tugas <em>adaptif.</em></div>
      </div>

      {/* question card */}
      <div style={{ padding: '14px 22px 4px' }}>
        <div style={{ padding: '16px', borderRadius: 18, background: '#fff', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '.08em', color: 'var(--muted)' }}>SOAL 4 DARI 6</div>
            <div style={{ flex: 1, height: 4, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '66%', height: '100%', background: 'var(--grad)' }} />
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              {I.clock({ size: 12 })} 24:18
            </div>
          </div>

          <div className="eyebrow"><span className="dot" />Apply · Bloom L3 · invers matriks</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, lineHeight: 1.25, margin: '14px 0 12px' }}>
            Diberikan matriks <span style={{ fontFamily: 'var(--f-mono)', background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4 }}>A = [[2, 2], [3, 4]]</span>. Hitung determinan A, lalu A⁻¹.
          </div>

          <div style={{ padding: '14px', background: 'var(--bg-2)', borderRadius: 12, fontFamily: 'var(--f-serif)', fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, minHeight: 80 }}>
            Step 1 · simplify entri (2, 2) = ?
            <span className="caret" />
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <button onClick={() => setHints(h => Math.min(3, h + 1))} className="btn btn--sm" style={{ flex: 1 }}>
              {I.spark({ size: 12, stroke: 'var(--warn)' })} Hint ({hints}/3)
            </button>
            <button className="btn btn--sm btn--grad" style={{ flex: 2 }}>
              Submit & lanjut {I.arrow({ size: 13 })}
            </button>
          </div>
        </div>
      </div>

      {/* hint */}
      {hints > 0 && (
        <div style={{ padding: '8px 22px 0' }}>
          <div style={{ padding: '14px', borderRadius: 14, background: 'rgba(251,241,220,.6)', border: '1px solid rgba(201,138,23,.3)' }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>Hint {hints} dari 3</div>
            <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.55 }}>
              {hints === 1 && 'Lihat entri (1,2) = 2. Sekarang terapkan ad − bc.'}
              {hints === 2 && 'det A = (2)(4) − (2)(3) = 8 − 6 = 2.'}
              {hints === 3 && 'A⁻¹ = (1/2)·[[4,−2],[−3,2]] = [[2,−1],[−1.5,1]].'}
            </div>
          </div>
        </div>
      )}

      {/* TICMI watching */}
      <div style={{ padding: '14px 22px 4px' }}>
        <div style={{ padding: '14px', borderRadius: 16, background: '#fff', border: '1px solid var(--line)' }}>
          <div className="eyebrow"><span className="dot" />Yang TICMI pantau</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            {['Sederhanakan entri','Hitung det A','Terapkan 1/det · adj','Tanda adjugate'].map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--muted-2)' }} />
                <span style={{ fontSize: 12.5, flex: 1 }}>{r}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)' }}>PANTAU</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 12, lineHeight: 1.5 }}>
            Kalau kamu tersandung di langkah 1, kamu akan diarahkan ke Teach-Me 5 mnt — bukan pengurangan nilai.
          </div>
        </div>
      </div>

      {/* assignment list */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Semua tugas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { t: 'Matriks invers 2×2',       s: 'XII-IPA-1', due: 'hari ini 12:00', p: 78 },
            { t: 'Eksponen & logaritma',      s: 'XII-IPA-1', due: 'closed',         p: 91 },
            { t: 'Sistem persamaan linear',   s: 'XI-IPA-1',  due: 'besok',          p: 54 },
            { t: 'Fungsi kuadrat · diagnostic',s: 'X-IPS',   due: 'Jum 29 Mei',     p: 38 },
          ].map((r, i) => (
            <div key={i} style={{ padding: '14px', borderRadius: 14, background: '#fff', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{r.t}</div>
                <span className="tag" style={{ fontSize: 10, flexShrink: 0 }}>{r.due}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{r.s}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <div className="bar" style={{ flex: 1 }}><i style={{ width: `${r.p}%` }} /></div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11 }}>{r.p}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
