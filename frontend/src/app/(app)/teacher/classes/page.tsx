'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

const classes = [
  { n:'XII IPA 1', sub:'Matematika · 32 siswa', code:'TIC-9M4K', hue:'linear-gradient(135deg,#5B5BF7,#8A4FFF)', p:72, h:88, alert:3 },
  { n:'XII IPA 2', sub:'Matematika · 30 siswa', code:'TIC-6J2P', hue:'linear-gradient(135deg,#FF7A45,#E45A3A)', p:64, h:81, alert:1 },
  { n:'XI IPA 1',  sub:'Peminatan · 29 siswa',  code:'TIC-4F8S', hue:'linear-gradient(135deg,#1F9E6A,#2DBF82)', p:58, h:76, alert:2 },
  { n:'X IPS',     sub:'Umum · 28 siswa',        code:'TIC-1A7W', hue:'linear-gradient(135deg,#C98A17,#E5A535)', p:41, h:62, alert:5 },
];

export default function ClassesPage() {
  const router = useRouter();
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto', background: 'var(--bg-2)' }}>
      <div style={{ padding: '10px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>4 KELAS AKTIF · 119 SISWA</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Kelas saya</div>
        </div>
        <button style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--ink)', color: '#fff', border: 0, display: 'grid', placeItems: 'center', boxShadow: '0 8px 18px -6px rgba(20,20,26,.3)' }}>
          {I.plus({ size: 18, stroke: '#fff' })}
        </button>
      </div>

      <div style={{ padding: '14px 22px 4px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {classes.map((c, i) => (
          <div key={i} style={{ padding: 0, borderRadius: 20, overflow: 'hidden', background: '#fff', border: '1px solid var(--line)' }}>
            <div style={{ height: 80, background: c.hue, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: .45, background: 'radial-gradient(circle at 90% 10%, rgba(255,255,255,.35), transparent 50%)' }} />
              <div style={{ position: 'relative', color: '#fff' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, opacity: .85, letterSpacing: '.1em' }}>KODE · {c.code}</div>
                <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, marginTop: 4, lineHeight: 1 }}>{c.n}</div>
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.sub}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <div className="bar" style={{ flex: 1 }}><i style={{ width: `${c.p}%` }} /></div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600 }}>{c.p}%</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                <span className="tag tag--ind" style={{ fontSize: 10 }}>health {c.h}</span>
                {c.alert > 0 && <span className="tag tag--err" style={{ fontSize: 10 }}><span className="dot" />{c.alert} alert</span>}
                <span className="tag" style={{ fontSize: 10 }}>3 due</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
