'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

const BADGES = [
  { e:'🧮', l:'Decimal pro',   on:true  },
  { e:'📐', l:'Geometry',      on:true  },
  { e:'🔥', l:'7-day flame',   on:true  },
  { e:'🧠', l:'Teacher',       on:true  },
  { e:'⚡',  l:'Speedrun',      on:true  },
  { e:'🌟', l:'Top quartile',  on:true  },
  { e:'🏆', l:'Matrix master', on:false },
  { e:'🎯', l:'Perfect quiz',  on:false },
];

export default function StudentMePage() {
  const router = useRouter();
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      {/* header */}
      <div style={{ padding: '4px 22px 8px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>PROFIL & PROGRES</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, lineHeight: 1.05, marginTop: 4 }}>Kamu</div>
        </div>
        <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 12 }}>{I.cog({ size: 16 })}</button>
      </div>

      {/* avatar + info */}
      <div style={{ padding: '8px 22px 0', textAlign: 'center' }}>
        <div className="avatar avatar--green" style={{ width: 90, height: 90, fontSize: 30, margin: '8px auto' }}>DP</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 26, marginTop: 8, lineHeight: 1 }}>Devin Pradana</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>SMA 8 Jakarta · XII IPA 1</div>
        <div style={{ display: 'inline-flex', gap: 8, marginTop: 14 }}>
          <span className="tag tag--ind"><span className="dot" />Level 14 explorer</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, padding: '3px 9px', borderRadius: 999, background: 'rgba(201,138,23,.12)', color: 'var(--warn)', fontFamily: 'var(--f-mono)' }}>🔥 18 days</span>
        </div>
      </div>

      {/* stats 3-col */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['Penguasaan','68%','var(--indigo)'],['Jam','14.2','var(--ok)'],['Peringkat','#4','var(--warn)']].map(([l,v,c]) => (
            <div key={l} style={{ padding: '12px 10px', border: '1px solid var(--line)', borderRadius: 14, background: '#fff', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 24, lineHeight: 1, color: c }}>{v}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--muted)', marginTop: 6, letterSpacing: '.1em' }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* mastery progress */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Penguasaan konsep</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { l:'Pecahan dasar',     v:96, s:'ok'      },
            { l:'Eksponen positif',  v:91, s:'ok'      },
            { l:'Persamaan linear',  v:88, s:'ok'      },
            { l:'Eksponen negatif',  v:62, s:'cur'     },
            { l:'Determinan 2×2',    v:34, s:'warn'    },
            { l:'Invers 2×2',        v:18, s:'pending' },
          ].map(r => (
            <div key={r.l}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                <span>{r.l}</span>
                <span style={{ fontFamily: 'var(--f-mono)', color: r.s === 'cur' ? 'var(--indigo)' : r.s === 'warn' ? 'var(--warn)' : 'var(--muted)' }}>{r.v}%</span>
              </div>
              <div className="bar">
                <i style={{ width: `${r.v}%`, background: r.s === 'ok' ? 'var(--ok)' : r.s === 'cur' ? 'var(--grad)' : r.s === 'warn' ? 'var(--warn)' : 'var(--line)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* badges */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Lencana · 6 dari 12</div>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--indigo)' }}>LIHAT SEMUA</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {BADGES.map((b, i) => (
            <div key={i} style={{ padding: '10px 6px', border: '1px solid var(--line)', borderRadius: 12, background: b.on ? '#fff' : 'var(--bg-2)', textAlign: 'center', opacity: b.on ? 1 : .4 }}>
              <div style={{ fontSize: 26 }}>{b.e}</div>
              <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 4, fontWeight: 500 }}>{b.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* settings */}
      <div style={{ padding: '18px 22px 20px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Pengaturan</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {[
            { i: 'bell',   l: 'Notifikasi',        r: 'on'  },
            { i: 'globe',  l: 'Bahasa Indonesia',   r: 'id'  },
            { i: 'device', l: 'Install di HP',       r: 'A2HS' },
            { i: 'cog',    l: 'Akun & privasi',      r: ''    },
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
        
        <button 
          onClick={() => router.push('/login')}
          style={{ marginTop: 16, width: '100%', padding: '14px', background: 'var(--err-bg)', color: 'var(--err)', border: '1px solid rgba(209,67,67,.2)', borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Keluar / Ganti Peran
        </button>
      </div>
    </div>
  );
}
