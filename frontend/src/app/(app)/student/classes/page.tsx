'use client';

import { useState } from 'react';
import { I } from '@/components/shared/icons';

const POSTS = [
  { who:'Bu Rini', av:'RW', avc:'slate', body:'Reminder: kuis matriks invers period 4. Datang tepat waktu ya.', t:'09:12', pin:true, kind:'announce' },
  { who:'TICMI AI', av:null, avc:'ai', body:'Saya mendeteksi 38 jawaban salah yang mengarah ke eksponen negatif. Telah dijadwalkan 10-menit warm-up untuk periode 4.', t:'08:40', kind:'ai', replies:0 },
  { who:'Bu Rini', av:'RW', avc:'slate', body:'Worksheet "Matriks invers 2×2" — due Friday 23:59.', t:'kemarin', kind:'assign', attach:true, replies:0 },
  { who:'Anisa R.', av:'AR', avc:'amber', body:'Bu, kalau det = 0 berarti tidak ada invers ya?', t:'kemarin', kind:'q', replies:4 },
  { who:'Devin P.', av:'DP', avc:'green', body:'Ada yang mau pair-teach soal #4? Aku stuck di exponent.', t:'2 hari', kind:'peer', replies:2 },
];

export default function StudentClassesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Umpan','Tugas','Orang','File','Jadwal'];

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto', background: 'var(--bg-2)' }}>
      {/* class header */}
      <div style={{ padding: '10px 22px 8px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>XII IPA 1 · MATEMATIKA</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Umpan kelas</div>
      </div>

      {/* class banner */}
      <div style={{ padding: '8px 22px 0' }}>
        <div style={{ padding: '14px 16px', borderRadius: 18, background: 'linear-gradient(135deg,#5B5BF7,#8A4FFF)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 0%, rgba(255,255,255,.35), transparent 50%)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, opacity: .85, letterSpacing: '.1em' }}>BU RINI · KODE KELAS TIC-9M4K</div>
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 22, marginTop: 4, lineHeight: 1.1 }}>32 teman · kesehatan 88</div>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div style={{ padding: '14px 22px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{ padding: '8px 14px', borderRadius: 999, border: '1px solid ' + (activeTab === i ? 'var(--ink)' : 'var(--line)'), background: activeTab === i ? 'var(--ink)' : '#fff', color: activeTab === i ? '#fff' : 'var(--ink-2)', fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* posts */}
      <div style={{ padding: '12px 22px 30px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {POSTS.map((p, i) => (
          <div key={i} style={{ padding: '14px', borderRadius: 18, background: '#fff', border: '1px solid var(--line)', position: 'relative' }}>
            {p.pin && (
              <div style={{ position: 'absolute', top: -8, left: 14, padding: '2px 8px', fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '.1em', background: 'var(--ink)', color: '#fff', borderRadius: 6 }}>📌 PINNED</div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {p.kind === 'ai' ? (
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--grad)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  {I.brain({ size: 16, stroke: '#fff' })}
                </div>
              ) : (
                <div className={`avatar avatar--${p.avc}`} style={{ width: 32, height: 32, fontSize: 11 }}>{p.av}</div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{p.who}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)' }}>{p.t}</div>
              </div>
              {p.kind === 'ai'     && <span className="tag tag--ind" style={{ fontSize: 9.5 }}>AI insight</span>}
              {p.kind === 'q'      && <span className="tag" style={{ fontSize: 9.5 }}>pertanyaan</span>}
              {p.kind === 'assign' && <span className="tag tag--warn" style={{ fontSize: 9.5 }}>tugas</span>}
            </div>

            <div style={{ fontSize: 13.5, marginTop: 10, lineHeight: 1.5 }}>{p.body}</div>

            {p.attach && (
              <div style={{ marginTop: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-2)', borderRadius: 10, border: '1px solid var(--line)' }}>
                <div style={{ width: 32, height: 38, background: '#fff', border: '1px solid var(--line)', borderRadius: 4, fontFamily: 'var(--f-mono)', fontSize: 8, fontWeight: 700, color: 'var(--err)', display: 'grid', placeItems: 'center' }}>PDF</div>
                <div style={{ flex: 1, fontSize: 12 }}>
                  <div style={{ fontWeight: 500 }}>matriks-invers-2x2.pdf</div>
                  <div style={{ color: 'var(--muted)', fontFamily: 'var(--f-mono)', fontSize: 10 }}>4 pages · 1.2 MB</div>
                </div>
              </div>
            )}

            {p.replies != null && p.replies > 0 && (
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'var(--muted)' }}>
                <div style={{ display: 'flex' }}>
                  {[0,1].map(j => <div key={j} className="avatar avatar--sm" style={{ marginLeft: j ? -6 : 0, border: '2px solid #fff', width: 18, height: 18, fontSize: 8 }}>{['HM','BP'][j]}</div>)}
                </div>
                {p.replies} balasan
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
