'use client';

import { I } from '@/components/shared/icons';

const WEEK_DAYS = ['S','S','R','K','J','S','M'];
const CONCEPTS = [
  { l:'Pecahan dasar',    v:96, s:'ok'   },
  { l:'Eksponen positif', v:91, s:'ok'   },
  { l:'Operasi pecahan',  v:88, s:'ok'   },
  { l:'Persamaan linear', v:82, s:'ok'   },
  { l:'Eksponen negatif', v:62, s:'cur'  },
  { l:'Determinan 2×2',   v:34, s:'warn' },
  { l:'Invers 2×2',       v:18, s:'low'  },
  { l:'Kriptografi',      v:0,  s:'lock' },
];

export default function StudentProgressPage() {
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      {/* header */}
      <div style={{ padding: '10px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>PROGRES · 6 MINGGU</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Perjalananmu.</div>
        </div>
        <div className="avatar avatar--green" style={{ width: 38, height: 38, fontSize: 13 }}>D</div>
      </div>

      {/* XP + streak hero */}
      <div style={{ padding: '12px 22px 0' }}>
        <div style={{ padding: '18px', borderRadius: 22, background: 'linear-gradient(135deg,#5B5BF7,#8A4FFF)', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 14px 32px -10px rgba(91,91,247,.45)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 10%, rgba(255,255,255,.25), transparent 50%)' }} />
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['2,148','XP TOTAL'],['18','HARI STREAK'],['68%','RATA-RATA'],['3','KELAS AKTIF']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--f-serif)', fontSize: 32, lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, opacity: .75, letterSpacing: '.1em', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* weekly streak */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Minggu ini</div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--muted)' }}>5 / 7 hari</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
          {WEEK_DAYS.map((d, i) => {
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

      {/* mastery progress */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Penguasaan konsep</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {CONCEPTS.map((r, i) => (
            <div key={r.l} style={{ padding: '12px 16px', borderTop: i ? '1px solid var(--line-2)' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: r.s === 'cur' ? 600 : 400 }}>
                  {r.l}
                  {r.s === 'lock' && <span style={{ fontSize: 10, color: 'var(--muted-2)', marginLeft: 8 }}>· terkunci</span>}
                  {r.s === 'cur' && <span style={{ fontSize: 10, color: 'var(--indigo)', marginLeft: 8, fontFamily: 'var(--f-mono)' }}>● SEKARANG</span>}
                </span>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: r.s === 'cur' ? 'var(--indigo)' : r.s === 'warn' ? 'var(--warn)' : 'var(--muted)' }}>{r.v}%</span>
              </div>
              <div className="bar">
                <i style={{ width: `${r.v}%`, background: r.s === 'ok' ? 'var(--ok)' : r.s === 'cur' ? 'var(--grad)' : r.s === 'warn' ? 'var(--warn)' : 'var(--line)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI next step */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ padding: '16px', borderRadius: 16, background: 'linear-gradient(135deg,#14141A,#2A2A33)', color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--grad)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            {I.brain({ size: 18, stroke: '#fff' })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, opacity: .65, letterSpacing: '.1em' }}>AI MEREKOMENDASIKAN</div>
            <div style={{ fontSize: 13, marginTop: 3, lineHeight: 1.4 }}>Selesaikan eksponen negatif dulu. Itu kunci ke Invers dan Determinan.</div>
          </div>
          {I.arrow({ size: 16, stroke: '#fff' })}
        </div>
      </div>

      {/* recent activity */}
      <div style={{ padding: '18px 22px 30px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Aktivitas terbaru</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon:'zap',     t:'Teach-Me · eksponen negatif',  x:'+180 XP', when:'2 jam lalu',   c:'var(--indigo)' },
            { icon:'check',   t:'Kuis matriks 2×2 · selesai',   x:'+120 XP', when:'kemarin',      c:'var(--ok)' },
            { icon:'book',    t:'Review eksponen positif',       x:'+40 XP',  when:'kemarin',      c:'var(--indigo)' },
            { icon:'flame',   t:'Streak hari ke-18 🔥',         x:'+20 XP',  when:'kemarin',      c:'var(--warn)' },
            { icon:'layers',  t:'Join kelas Bimbel UTBK',        x:'—',       when:'3 hari lalu',  c:'var(--muted)' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: '#fff', border: '1px solid var(--line)' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: r.c + '18', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {I[r.icon as keyof typeof I]({ size: 16, stroke: r.c })}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.t}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{r.when}</div>
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11.5, color: r.x === '—' ? 'var(--muted)' : 'var(--indigo)', fontWeight: 600, flexShrink: 0 }}>{r.x}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
