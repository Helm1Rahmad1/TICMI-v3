'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

const students = ['Anisa R.','Bayu P.','Citra W.','Devin P.','Eka P.','Farid H.','Galuh S.','Hesti M.'];
const cols = ['Eksp+','Eksp−','Log','SPL','Det','Inv','Aplk'];
const palette = ['#E4F4EC','#FBF1DC','#FBE5E5','#F4C8C8'];
const cell = (s: number, c: number) => {
  const seed = (s * 7 + c * 13) % 100;
  if (c === 1) return seed < 18 ? 1 : seed < 75 ? 2 : 3;
  if (c === 4) return seed < 35 ? 0 : seed < 70 ? 1 : 2;
  if (c === 5) return seed < 25 ? 0 : seed < 55 ? 1 : seed < 85 ? 2 : 3;
  return seed < 40 ? 0 : seed < 70 ? 1 : 2;
};

export default function HeatmapPage() {
  const router = useRouter();
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      <div style={{ padding: '10px 22px 6px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>XII IPA 1 · 32 SISWA</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Heatmap <em>miskonsepsi.</em></div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>Sel merah = prasyarat persis yang harus dibahas pelajaran berikutnya.</div>
      </div>

      {/* filter chips */}
      <div style={{ padding: '8px 22px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['All','Foundations','Algebra','Matrix'].map((t, i) => (
          <button key={t} style={{ padding: '6px 12px', borderRadius: 999, fontSize: 11.5, whiteSpace: 'nowrap', border: '1px solid ' + (i === 0 ? 'var(--ink)' : 'var(--line)'), background: i === 0 ? 'var(--ink)' : '#fff', color: i === 0 ? '#fff' : 'var(--ink-2)', fontWeight: 500 }}>{t}</button>
        ))}
      </div>

      {/* grid */}
      <div style={{ padding: '14px 22px 6px' }}>
        <div style={{ padding: '14px', borderRadius: 18, border: '1px solid var(--line)', background: '#fff', overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `78px repeat(${cols.length},minmax(28px,1fr))`, gap: 4, alignItems: 'center' }}>
            <div />
            {cols.map(c => <div key={c} style={{ fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '.05em', color: 'var(--muted)', textTransform: 'uppercase', textAlign: 'center' }}>{c}</div>)}
            {students.map((s, sr) => (
              <div key={s} style={{ display: 'contents' }}>
                <div style={{ fontSize: 11.5, color: 'var(--ink-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</div>
                {cols.map((_, ci) => (
                  <div key={ci} style={{ height: 24, borderRadius: 4, background: palette[cell(sr, ci)] }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 14, fontSize: 10.5, color: 'var(--muted)', flexWrap: 'wrap' }}>
            {[['#E4F4EC','ok'],['#FBF1DC','unstable'],['#FBE5E5','gap'],['#F4C8C8','severe']].map(([bg,l]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: bg, borderRadius: 2 }} />{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* bottlenecks */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Bottleneck kelas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { c: 'Eksponen negatif', n: 23, sev: 'severe' },
            { c: 'Invers 2×2',       n: 18, sev: 'severe' },
            { c: 'Determinan 2×2',   n: 11, sev: 'warn'   },
          ].map(b => (
            <div key={b.c} style={{ padding: '14px', borderRadius: 14, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: b.sev === 'severe' ? 'var(--err)' : 'var(--warn)', boxShadow: `0 0 0 4px ${b.sev === 'severe' ? 'rgba(209,67,67,.15)' : 'rgba(201,138,23,.15)'}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{b.c}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>{b.n} siswa</div>
              </div>
              <button onClick={() => router.push('/student/teach-me')} className="btn btn--sm" style={{ padding: '6px 10px', fontSize: 12 }}>Aksi →</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 22px 30px' }}>
        <button style={{ width: '100%', padding: '14px', background: 'var(--ink)', color: '#fff', border: 0, borderRadius: 14, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {I.download({ size: 14, stroke: '#fff' })} Export PDF rapor
        </button>
      </div>
    </div>
  );
}
