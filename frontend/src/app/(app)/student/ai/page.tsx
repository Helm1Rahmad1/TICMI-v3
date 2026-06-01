'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

const SUGGESTIONS = [
  { e:'🧮', t:'Jelaskan invers matriks\nseperti saya kelas 9'    },
  { e:'🔍', t:'Kenapa soal 4 saya\nsalah?'                       },
  { e:'🎯', t:'Quiz saya tentang\neksponen negatif'              },
  { e:'📘', t:'Rangkum pelajaran\nmatriks hari ini'              },
];

export default function StudentAIPage() {
  const router = useRouter();

  return (
    <div style={{ paddingTop: 54, paddingBottom: 0, height: '100vh', background: '#0A0A0E', position: 'relative', overflow: 'hidden' }}>
      {/* ambient glow */}
      <div style={{ position: 'absolute', inset: 0, opacity: .8, background: 'radial-gradient(circle at 20% 10%, rgba(91,91,247,.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(138,79,255,.18), transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ padding: '4px 20px 0', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => router.back()} style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            {I.x({ size: 16, stroke: '#fff' })}
          </button>
          <div style={{ flex: 1, color: '#fff' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, opacity: .6, letterSpacing: '.1em' }}>TICMI AI</div>
            <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>Tanya apa saja · tutor matematika</div>
          </div>
          <button style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            {I.more({ size: 16, stroke: '#fff' })}
          </button>
        </div>

        {/* chat area */}
        <div style={{ flex: 1, overflowY: 'auto', marginTop: 18, color: '#fff', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* welcome */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, margin: '8px auto 0', background: 'var(--grad)', display: 'grid', placeItems: 'center', boxShadow: '0 12px 28px -8px rgba(91,91,247,.5)' }}>
              {I.brain({ size: 22, stroke: '#fff' })}
            </div>
            <div style={{ fontFamily: 'var(--f-serif)', fontSize: 24, marginTop: 14, lineHeight: 1.2 }}>
              Bagaimana saya bisa membantu belajarmu?
            </div>
            <div style={{ fontSize: 12, opacity: .6, marginTop: 6, maxWidth: 260, margin: '6px auto 0', lineHeight: 1.5 }}>
              Saya tidak akan langsung memberi jawaban — saya akan membimbingmu.
            </div>
          </div>

          {/* suggestion cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
            {SUGGESTIONS.map((s, i) => (
              <div key={i} style={{ padding: '12px', borderRadius: 14, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: '#fff', cursor: 'pointer' }}>
                <div style={{ fontSize: 18 }}>{s.e}</div>
                <div style={{ fontSize: 12, marginTop: 6, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{s.t}</div>
              </div>
            ))}
          </div>

          {/* example message */}
          <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,.06)', borderRadius: '16px 16px 16px 4px', fontSize: 13.5, lineHeight: 1.5, alignSelf: 'flex-start', maxWidth: 260, border: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, opacity: .55, letterSpacing: '.1em', marginBottom: 6 }}>DISARANKAN</div>
            "Bisa kasih hint untuk soal nomor 4 tanpa kasih tau jawabannya?"
          </div>

          {/* AI response */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ padding: '12px 14px', background: 'var(--grad)', borderRadius: '16px 16px 4px 16px', fontSize: 13.5, lineHeight: 1.5, maxWidth: 260 }}>
              Tentu! Mari kita lihat langkah pertama. Entri mana yang perlu disederhanakan sebelum menghitung determinan?
            </div>
          </div>

          {/* typing indicator */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--grad)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              {I.brain({ size: 14, stroke: '#fff' })}
            </div>
            <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,.08)', borderRadius: '14px 14px 14px 4px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: 999, background: 'rgba(255,255,255,.5)', animation: `pulse-soft 1.2s ease ${i * .15}s infinite` }} />)}
            </div>
          </div>
        </div>

        {/* input */}
        <div style={{ padding: '8px 0 22px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ flex: 1, padding: '12px 14px', background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 22, fontSize: 13.5, color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ flex: 1 }}>Pesan ke TICMI…</span>
            {I.mic({ size: 16, stroke: 'rgba(255,255,255,.6)' })}
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--grad)', color: '#fff', border: 0, display: 'grid', placeItems: 'center', boxShadow: '0 8px 20px -4px rgba(91,91,247,.6)', cursor: 'pointer' }}>
            {I.send({ size: 18, stroke: '#fff' })}
          </button>
        </div>
      </div>
    </div>
  );
}
