'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

const CLASS_DATA = [
  { n:'XII IPA 1', mastery:68, prev:56, students:32, alerts:3, hue:'linear-gradient(135deg,#5B5BF7,#8A4FFF)' },
  { n:'XII IPA 2', mastery:61, prev:54, students:30, alerts:1, hue:'linear-gradient(135deg,#FF7A45,#E45A3A)' },
  { n:'XI IPA 1',  mastery:58, prev:52, students:29, alerts:2, hue:'linear-gradient(135deg,#1F9E6A,#2DBF82)' },
  { n:'X IPS',     mastery:44, prev:39, students:28, alerts:5, hue:'linear-gradient(135deg,#C98A17,#E5A535)' },
];

const MISCONCEPTIONS = [
  { c:'Eksponen negatif', n:23, trend:-2, sev:'severe' },
  { c:'Invers 2×2',       n:18, trend:-3, sev:'severe' },
  { c:'Determinan 2×2',   n:11, trend:-1, sev:'warn'   },
  { c:'Polinom §3',       n:8,  trend:+1, sev:'warn'   },
  { c:'SPL 2 var.',       n:4,  trend:-2, sev:'ok'     },
];

export default function TeacherAnalyticsPage() {
  const router = useRouter();
  const [period, setPeriod] = useState('30d');

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      <div style={{ padding: '10px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>ANALITIK · 4 KELAS</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Laporan kelas.</div>
        </div>
        <button style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid var(--line)', background: '#fff', fontSize: 11.5, fontWeight: 500, cursor: 'pointer' }}>
          {I.download({ size: 12 })} PDF
        </button>
      </div>

      {/* period filter */}
      <div style={{ padding: '8px 22px 0', display: 'flex', gap: 6 }}>
        {['7d','30d','Semester'].map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid ' + (period === p ? 'var(--ink)' : 'var(--line)'), background: period === p ? 'var(--ink)' : '#fff', color: period === p ? '#fff' : 'var(--ink-2)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{p}</button>
        ))}
      </div>

      {/* summary stats */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
          {[
            { v:'+11%', l:'Rata-rata mastery', d:'vs bulan lalu', c:'var(--ok)'     },
            { v:'57',   l:'Miskonsepsi aktif', d:'−18 vs bulan lalu', c:'var(--err)' },
            { v:'94%',  l:'Kehadiran',          d:'stabil',            c:'var(--indigo)' },
            { v:'B+',   l:'Kesehatan kelas AI', d:'naik dari B',       c:'var(--warn)' },
          ].map(s => (
            <div key={s.l} style={{ padding: '14px', border: '1px solid var(--line)', borderRadius: 16, background: '#fff' }}>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, lineHeight: 1, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 6 }}>{s.l}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--muted)', marginTop: 3 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* mastery by class */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Mastery per kelas</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CLASS_DATA.map((c, i) => {
            const delta = c.mastery - c.prev;
            return (
              <div key={i} style={{ padding: '14px', borderRadius: 16, background: '#fff', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: c.hue, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.n}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{c.students} siswa · {c.alerts} alert</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, lineHeight: 1 }}>{c.mastery}%</div>
                    <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: delta > 0 ? 'var(--ok)' : 'var(--err)', marginTop: 2 }}>
                      {delta > 0 ? '+' : ''}{delta}% bulan ini
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div className="bar"><i style={{ width: `${c.mastery}%` }} /></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* misconception velocity */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Tren miskonsepsi</div>
          <span className="tag tag--ok" style={{ fontSize: 10 }}>↓ 12%/minggu</span>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {MISCONCEPTIONS.map((m, i) => (
            <div key={m.c} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i ? '1px solid var(--line-2)' : undefined }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, flexShrink: 0, background: m.sev === 'severe' ? 'var(--err)' : m.sev === 'warn' ? 'var(--warn)' : 'var(--ok)', boxShadow: `0 0 0 4px ${m.sev === 'severe' ? 'rgba(209,67,67,.15)' : m.sev === 'warn' ? 'rgba(201,138,23,.15)' : 'rgba(31,158,106,.15)'}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{m.c}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{m.n} siswa</div>
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: m.trend < 0 ? 'var(--ok)' : 'var(--err)', fontWeight: 600 }}>
                {m.trend > 0 ? '+' : ''}{m.trend}
              </div>
              <button onClick={() => router.push('/intelligence/heatmap')} style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                {I.arrow({ size: 12 })}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI playbook */}
      <div style={{ padding: '18px 22px 0' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>AI remediation playbook</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { n:'1', t:'Period 4 warm-up · eksp. negatif', impact:'+18% mastery', when:'hari ini'  },
            { n:'2', t:'Pair-teach: Hesti × Devin · invers', impact:'+12%',        when:'hari ini'  },
            { n:'3', t:'Re-test SPL Jumat',                  impact:'+8%',          when:'Jum'       },
            { n:'4', t:'Lewati polinom §3.1 (sudah mastered)',impact:'−40 menit',   when:'Senin'     },
          ].map((r, i) => (
            <div key={i} style={{ padding: '12px 14px', borderRadius: 14, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--grad)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 11, flexShrink: 0 }}>{r.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.t}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                  <span className="tag tag--ok" style={{ fontSize: 10 }}>{r.impact}</span>
                  <span className="tag" style={{ fontSize: 10 }}>{r.when}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', marginTop: 12, padding: '14px', background: 'var(--grad)', color: '#fff', border: 0, borderRadius: 14, fontSize: 14, fontWeight: 600, boxShadow: '0 10px 24px -8px rgba(91,91,247,.5)', cursor: 'pointer' }}>
          Jadwalkan semua 4 tindakan
        </button>
      </div>

      {/* bloom distribution */}
      <div style={{ padding: '18px 22px 30px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Distribusi Bloom · XII IPA 1</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff', padding: '16px' }}>
          {[
            { l:'L1 · Recall',      v:24, c:'#3FB37F' },
            { l:'L2 · Understand',  v:31, c:'#5B5BF7' },
            { l:'L3 · Apply',       v:22, c:'#8A4FFF' },
            { l:'L4 · Analyze',     v:14, c:'#C98A17' },
            { l:'L5 · Evaluate',    v:6,  c:'#E26F6F' },
            { l:'L6 · Create',      v:3,  c:'#D14343' },
          ].map(b => (
            <div key={b.l} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
                <span style={{ color: 'var(--ink-2)' }}>{b.l}</span>
                <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--muted)' }}>{b.v}%</span>
              </div>
              <div className="bar">
                <i style={{ width: `${b.v}%`, background: b.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
