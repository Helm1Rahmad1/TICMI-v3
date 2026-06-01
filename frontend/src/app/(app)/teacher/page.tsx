'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

export default function TeacherHomePage() {
  const router = useRouter();
  const go = (route: string) => {
    const map: Record<string, string> = {
      teach: '/student/teach-me', heatmap: '/intelligence/heatmap',
      upload: '/teacher/upload', classes: '/teacher/classes',
      student: '/student', concept: '/intelligence/concept-map',
    };
    router.push(map[route] ?? `/${route}`);
  };

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      {/* hero greeting */}
      <div style={{ padding: '10px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>SELASA 26 MEI · 09:42</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4, letterSpacing: '-.01em' }}>Pagi, Bu <em>Rini.</em></div>
        </div>
        <div className="avatar avatar--slate" style={{ width: 38, height: 38, fontSize: 13 }}>RW</div>
      </div>

      {/* AI insight */}
      <div style={{ padding: '12px 22px 0' }}>
        <div style={{ padding: '18px', borderRadius: 22, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #5B5BF7 0%, #8A4FFF 100%)', color: '#fff', boxShadow: '0 14px 32px -10px rgba(91,91,247,.45)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 10%, rgba(255,255,255,.3), transparent 50%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)', display: 'grid', placeItems: 'center' }}>
                {I.brain({ size: 15, stroke: '#fff' })}
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.1em', opacity: .85 }}>AI INSIGHT · JUST NOW</div>
            </div>
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 21, marginTop: 14, lineHeight: 1.25 }}>
              <em>72%</em> siswa XII-IPA-1 stuck di <em>eksponen negatif</em> sebelum pelajaran matriks hari ini.
            </div>
            <div style={{ fontSize: 12.5, opacity: .85, marginTop: 8, lineHeight: 1.5 }}>
              Diagnostic Agent menelusuri 38 dari 53 jawaban salah ke prasyarat yang sama.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button onClick={() => go('teach')} style={{ flex: 1, padding: '10px 12px', background: '#fff', color: 'var(--ink)', border: 0, borderRadius: 11, fontWeight: 600, fontSize: 13 }}>Queue remediasi</button>
              <button onClick={() => go('heatmap')} style={{ padding: '10px 14px', background: 'rgba(255,255,255,.18)', color: '#fff', border: '1px solid rgba(255,255,255,.25)', borderRadius: 11, fontWeight: 500, fontSize: 13 }}>Heatmap</button>
            </div>
          </div>
        </div>
      </div>

      {/* stats strip */}
      <div style={{ padding: '14px 22px 4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {[['Kelas','4','var(--indigo)'],['Siswa','128','var(--ok)'],['Alert','17','var(--err)'],['Health','B+','var(--warn)']].map(([l,v,t]) => (
            <div key={l} style={{ padding: '10px 8px', border: '1px solid var(--line)', borderRadius: 12, background: '#fff', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, lineHeight: 1, color: t }}>{v}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 6, letterSpacing: '.08em' }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* today schedule horizontal scroll */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Hari ini</div>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>5 jadwal</span>
        </div>
        <div style={{ margin: '0 -22px', padding: '4px 22px', overflowX: 'auto', display: 'flex', gap: 10 }}>
          {[
            { t: '07:15', d: 'XII-IPA-1', s: 'Matriks',       tone: 'var(--ok)',     label: 'active' },
            { t: '08:45', d: 'X-IPS',     s: 'Linear func.',   tone: 'var(--indigo)', label: 'next'   },
            { t: '10:30', d: '1-on-1',    s: 'Devin & Anisa',  tone: 'var(--violet)', label: 'office' },
            { t: '12:15', d: 'XII-IPA-1', s: 'Kuis adaptif',   tone: 'var(--warn)',   label: 'AI-set' },
            { t: '14:00', d: 'Dept',      s: 'Faculty review', tone: 'var(--muted)',  label: 'meet'   },
          ].map((r, i) => (
            <div key={i} style={{ flexShrink: 0, width: 170, padding: '14px', border: '1px solid var(--line)', borderRadius: 16, background: '#fff' }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>{r.t}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6, lineHeight: 1.2 }}>{r.d}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 3 }}>{r.s}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, fontFamily: 'var(--f-mono)', fontSize: 10, color: r.tone }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />{r.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* misconception alerts */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Misconception alerts</div>
          <button onClick={() => go('heatmap')} style={{ background: 'transparent', border: 0, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--indigo)', fontWeight: 600 }}>SEMUA →</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { c: 'Eksp. negatif → reciprocal', cl: 'XII-IPA-1', n: 23, sev: 'severe' },
            { c: 'Distributif atas neg.',       cl: 'X-IPS',     n: 11, sev: 'severe' },
            { c: 'Urutan operasi w/ eksp.',     cl: 'XI-IPA-1',  n: 8,  sev: 'warn'   },
            { c: 'Invers di kedua sisi',        cl: 'XII-IPA-1', n: 6,  sev: 'warn'   },
          ].map((r, i) => (
            <div key={i} style={{ padding: '14px', borderRadius: 14, background: '#fff', border: '1px solid ' + (r.sev === 'severe' ? 'rgba(209,67,67,.25)' : 'var(--line)'), display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, flexShrink: 0, background: r.sev === 'severe' ? 'var(--err)' : 'var(--warn)', boxShadow: `0 0 0 4px ${r.sev === 'severe' ? 'rgba(209,67,67,.15)' : 'rgba(201,138,23,.15)'}` }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5, lineHeight: 1.3 }}>{r.c}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4 }}>{r.cl} · {r.n} siswa</div>
              </div>
              <button onClick={() => go('teach')} className="btn btn--sm" style={{ padding: '6px 10px', fontSize: 12 }}>Fix →</button>
            </div>
          ))}
        </div>
      </div>

      {/* AI rekomendasi */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>AI rekomendasi</div>
          <span className="tag tag--ind" style={{ fontSize: 10 }}>4 saran</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { tag: 'pelajaran ini', t: 'Sisipkan remediasi eksponen 10-min', d: 'Tutup 38 dari 53 miskonsepsi terbuka.' },
            { tag: 'minggu ini',    t: 'Pair-teach Devin × Hesti · invers',  d: 'Predicted lift +18% mastery.' },
            { tag: 'kelas berikut', t: 'Lewati §3.2 — kelas sudah mastered', d: '27/32 sudah L3+. Hemat 40 menit.' },
          ].map((r, i) => (
            <div key={i} style={{ padding: '14px', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--indigo)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{r.tag}</span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)' }}>Why?</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8, lineHeight: 1.3 }}>{r.t}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6, lineHeight: 1.5 }}>{r.d}</div>
              <button style={{ marginTop: 12, padding: '10px 14px', background: 'var(--ink)', color: '#fff', border: 0, borderRadius: 10, fontSize: 12.5, fontWeight: 600 }}>Apply</button>
            </div>
          ))}
        </div>
      </div>

      {/* live aktivitas */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Aktivitas live</div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--ok)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--ok)', boxShadow: '0 0 0 3px rgba(31,158,106,.18)' }} />17 ONLINE
          </span>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {[
            { n: 'Devin Pradana',   a: 'Teach-Me · eksp. negatif', t: 'now', col: 'red'   },
            { n: 'Anisa Rahmadani', a: 'Kuis · invers · q4/6',     t: 'now', col: 'amber' },
            { n: 'Galuh Saputri',   a: 'Mastered linear func. L3', t: '2m',  col: 'green' },
            { n: 'Bayu Pratama',    a: 'Hint requested · SPL',     t: '4m',  col: 'amber' },
            { n: 'Eka Putri',       a: 'Teach-Me · inverse op.',   t: '9m',  col: 'red'   },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderTop: i ? '1px solid var(--line-2)' : undefined }}>
              <div className={`avatar avatar--sm avatar--${r.col}`} style={{ width: 32, height: 32, fontSize: 11 }}>
                {r.n[0]}{r.n.split(' ')[1]?.[0] ?? ''}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.n}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{r.a}</div>
              </div>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)' }}>{r.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* upload CTA */}
      <div style={{ padding: '18px 22px 30px' }}>
        <button onClick={() => go('upload')} style={{ width: '100%', padding: '16px', border: '1.5px dashed var(--line)', borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink-2)' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--grad)', display: 'grid', placeItems: 'center' }}>
            {I.upload({ size: 18, stroke: '#fff' })}
          </div>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Upload bahan ajar</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>AI akan ekstrak konsep & buat soal</div>
          </div>
          {I.arrow({ size: 16, stroke: 'var(--muted)' })}
        </button>
      </div>
    </div>
  );
}
