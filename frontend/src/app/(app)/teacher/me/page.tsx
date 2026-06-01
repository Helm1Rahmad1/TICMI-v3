'use client';

import { I } from '@/components/shared/icons';

export default function TeacherMePage() {
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      <div style={{ padding: '10px 22px 6px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>PROFIL GURU</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Pengaturan</div>
      </div>

      {/* avatar */}
      <div style={{ padding: '14px 22px 6px', textAlign: 'center' }}>
        <div className="avatar avatar--slate" style={{ width: 90, height: 90, fontSize: 30, margin: '8px auto' }}>RW</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 24, marginTop: 10, lineHeight: 1 }}>Rini Wulandari, S.Pd.</div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>Matematika · SMA 8 Jakarta · 9 tahun mengajar</div>
        <div style={{ display: 'inline-flex', gap: 6, marginTop: 14 }}>
          <span className="tag tag--ind"><span className="dot" />Pilot TICMI · Cohort 2</span>
        </div>
      </div>

      {/* stats */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['Kelas','4','var(--indigo)'],['Siswa','128','var(--ok)'],['Lessons','248','var(--warn)']].map(([l,v,c]) => (
            <div key={l} style={{ padding: '12px 10px', border: '1px solid var(--line)', borderRadius: 14, background: '#fff', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, lineHeight: 1, color: c }}>{v}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 6, letterSpacing: '.1em' }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* impact metrics */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ padding: '18px', borderRadius: 18, background: 'linear-gradient(135deg,#5B5BF7,#8A4FFF)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 10%, rgba(255,255,255,.2), transparent 50%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .75, letterSpacing: '.1em' }}>DAMPAK MENGAJAR · SEMESTER INI</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
              {[['+34%','Kenaikan mastery rata-rata'],['+23%','Pengurangan miskonsepsi'],['72%','Salah karena prasyarat'],['18s','Rata-rata deteksi gap']].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 11, opacity: .8, marginTop: 4, lineHeight: 1.4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* settings */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Pengaturan</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {[
            { i:'bell',   l:'Notifikasi',         r:'on'      },
            { i:'globe',  l:'Bahasa Indonesia',    r:'id'      },
            { i:'device', l:'Install di HP',        r:'A2HS'   },
            { i:'spark',  l:'AI behavior',          r:'balanced'},
            { i:'cog',    l:'Akun & privasi',       r:''        },
          ].map((s, i) => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? '1px solid var(--line-2)' : undefined }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg-2)', display: 'grid', placeItems: 'center', color: 'var(--ink-2)' }}>
                {I[s.i as keyof typeof I]({ size: 16 })}
              </span>
              <div style={{ flex: 1, fontSize: 14 }}>{s.l}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>{s.r}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-2)" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </div>
          ))}
        </div>
      </div>

      {/* TICMI pilot info */}
      <div style={{ padding: '18px 22px 30px' }}>
        <div style={{ padding: '16px', borderRadius: 16, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
          <div className="eyebrow" style={{ fontSize: 10 }}><span className="dot" />Pilot TICMI · Cohort 2 · 2026</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.55 }}>
            Anda bergabung sejak 12 Februari 2026 sebagai bagian dari 12 guru pilot di Jakarta. Akses penuh ke semua fitur AI termasuk multi-agent diagnostik dan LangGraph orchestration.
          </div>
          <button style={{ marginTop: 14, width: '100%', padding: '12px', background: 'var(--ink)', color: '#fff', border: 0, borderRadius: 12, fontSize: 13.5, fontWeight: 600 }}>
            Lihat laporan pilot →
          </button>
        </div>
      </div>
    </div>
  );
}
