'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

const CHOICES = [
  { l:'A', t:'det A = 5 · A⁻¹ = (1/5)·[[4,−2],[−3,2]]', state:'' },
  { l:'B', t:'det A = 2 · A⁻¹ = (1/2)·[[4,−2],[−3,2]]', state:'selected' },
  { l:'C', t:'det A = −2 · A⁻¹ = (−1/2)·[[4,−2],[−3,2]]', state:'' },
  { l:'D', t:'det A is undefined (1/2⁻¹ is fractional)', state:'trap' },
];

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState('B');
  const [conf, setConf] = useState(4);
  const [showHint, setShowHint] = useState(false);

  return (
    <div style={{ paddingTop: 54, paddingBottom: 80, minHeight: '100vh', overflow: 'auto', background: '#fff' }}>
      {/* progress bar */}
      <div style={{ padding: '4px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => router.back()} className="icon-btn" style={{ width: 36, height: 36, borderRadius: 12, flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em' }}>SOAL 4 DARI 6</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ flex: 1, height: 4, background: 'var(--bg-2)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '66%', height: '100%', background: 'var(--grad)' }} />
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>24:18</span>
          </div>
        </div>
      </div>

      {/* question */}
      <div style={{ padding: '22px' }}>
        <div className="eyebrow"><span className="dot" />APPLY · BLOOM L3</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, lineHeight: 1.3, marginTop: 10 }}>
          Diberikan matriks{' '}
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 17, background: 'var(--bg-2)', padding: '3px 8px', borderRadius: 6 }}>A = [[2, 2], [3, 4]]</span>.
          Hitung determinan A, lalu invers A.
        </div>

        {/* what TICMI watches */}
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(91,91,247,.05)', borderRadius: 14, border: '1px solid rgba(91,91,247,.15)' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--indigo)', letterSpacing: '.1em', marginBottom: 8 }}>TICMI MEMANTAU</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Penyederhanaan entri','det A = ad−bc','Terapkan 1/det','Tanda adjugate'].map(t => (
              <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* choices */}
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CHOICES.map(c => {
            const isSelected = selected === c.l;
            return (
              <div key={c.l} onClick={() => setSelected(c.l)} style={{
                padding: '14px', borderRadius: 16, cursor: 'pointer',
                border: '1.5px solid ' + (isSelected ? 'var(--indigo)' : 'var(--line)'),
                background: isSelected ? 'rgba(91,91,247,.05)' : '#fff',
                display: 'flex', alignItems: 'flex-start', gap: 12,
                transition: 'border-color .15s, background .15s',
              }}>
                <span style={{
                  width: 30, height: 30, borderRadius: 999, flexShrink: 0,
                  background: isSelected ? 'var(--grad)' : 'var(--bg-2)',
                  border: '1px solid ' + (isSelected ? 'transparent' : 'var(--line)'),
                  color: isSelected ? '#fff' : 'var(--ink-2)',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--f-mono)', fontWeight: 600, fontSize: 13,
                }}>{c.l}</span>
                <span style={{ flex: 1, fontSize: 13.5, lineHeight: 1.5, fontFamily: 'var(--f-mono)' }}>{c.t}</span>
              </div>
            );
          })}
        </div>

        {/* confidence */}
        <div style={{ marginTop: 18, padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 16, background: 'var(--bg-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Keyakinanmu</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--indigo)', fontWeight: 600 }}>{conf * 20}%</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4,5].map(n => (
              <div key={n} onClick={() => setConf(n)} style={{ flex: 1, height: 8, borderRadius: 6, background: n <= conf ? 'var(--grad)' : 'var(--line-2)', cursor: 'pointer', transition: 'background .15s' }} />
            ))}
          </div>
        </div>

        {/* hint */}
        {showHint && (
          <div style={{ marginTop: 14, padding: '14px', borderRadius: 14, background: 'rgba(251,241,220,.7)', border: '1px solid rgba(201,138,23,.3)' }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>Hint · 1 dari 3</div>
            <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.55 }}>
              Perhatikan entri (1,2) = 2. Sekarang terapkan det A = ad − bc secara langsung.
            </div>
          </div>
        )}

        {/* assignments list below */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Semua tugas aktif</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { t:'Matriks invers 2×2',         due:'hari ini 23:59', p:66, status:'ongoing' },
              { t:'Eksponen & logaritma · quiz', due:'closed',         p:91, status:'done'    },
              { t:'Sistem persamaan linear',     due:'besok 23:59',    p:0,  status:'todo'    },
              { t:'Fungsi kuadrat · diagnostic', due:'Jum 29 Mei',     p:0,  status:'todo'    },
            ].map((r, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: 14, background: '#fff', border: '1px solid ' + (r.status === 'ongoing' ? 'rgba(91,91,247,.3)' : 'var(--line)') }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 500, fontSize: 13.5 }}>{r.t}</div>
                  {r.status === 'done'    && <span className="tag tag--ok"  style={{ fontSize: 10, flexShrink: 0 }}>selesai</span>}
                  {r.status === 'ongoing' && <span className="tag tag--ind" style={{ fontSize: 10, flexShrink: 0 }}>berlangsung</span>}
                  {r.status === 'todo'    && <span className="tag"          style={{ fontSize: 10, flexShrink: 0 }}>{r.due}</span>}
                </div>
                {r.p > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                    <div className="bar" style={{ flex: 1 }}><i style={{ width: `${r.p}%` }} /></div>
                    <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11 }}>{r.p}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sticky bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '14px 22px 22px', background: '#fff', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, zIndex: 20 }}>
        <button onClick={() => setShowHint(true)} className="icon-btn" style={{ width: 48, height: 48, borderRadius: 14, color: 'var(--warn)', background: 'rgba(201,138,23,.10)', border: '1px solid rgba(201,138,23,.2)', flexShrink: 0 }}>
          {I.spark({ size: 18 })}
        </button>
        <button style={{ flex: 1, background: 'var(--grad)', color: '#fff', border: 0, borderRadius: 16, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 24px -8px rgba(91,91,247,.5)' }}>
          Kirim & lanjut {I.arrow({ size: 15, stroke: '#fff' })}
        </button>
      </div>
    </div>
  );
}
