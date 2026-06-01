'use client';

import { I } from '@/components/shared/icons';

const AGENTS = [
  { id:'DIAG',  n:'Diagnostic',      d:'Telusuri akar tiap jawaban salah.',             tint:'#5B5BF7', lat:'124ms', ok:98 },
  { id:'ROUTE', n:'Routing',         d:'Susun rencana remediasi & urutan Bloom.',        tint:'#8A4FFF', lat:'88ms',  ok:99 },
  { id:'SOCR',  n:'Socratic',        d:'Berperan jadi siswa bingung yang harus diajar.', tint:'#3FB37F', lat:'612ms', ok:94 },
  { id:'KNOW',  n:'KnowledgeTracker',d:'Update belief mastery & dorong ke heatmap.',     tint:'#C98A17', lat:'42ms',  ok:100 },
];

export default function AgentsPage() {
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      <div style={{ padding: '10px 22px 6px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>MULTI-AGENT ORCHESTRATION</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4 }}>Otak <em>kelas.</em></div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>Empat agen berbagi satu model siswa. Inspeksi alur pesan, latensi, dan override keputusan.</div>
      </div>

      {/* agent cards */}
      <div style={{ padding: '14px 22px 4px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {AGENTS.map((a, i) => (
          <div key={a.id} style={{ padding: '14px 16px', borderRadius: 18, background: '#fff', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: a.tint + '1f', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: a.tint, boxShadow: `0 0 0 5px ${a.tint}22` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--muted)' }}>{a.id}.AGENT</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{a.n}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4, lineHeight: 1.45 }}>{a.d}</div>
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: a.tint, fontWeight: 600 }}>● LIVE</span>
          </div>
        ))}
      </div>

      {/* live trace */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Live trace · sesi #2417</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {[
            { t:'00:00.0', a:'DIAG',  m:'Gap terdeteksi: eksponen negatif.', tint:'#5B5BF7' },
            { t:'00:00.4', a:'ROUTE', m:'Plan: 3-step Socratic remediasi, Bloom L2→L3.', tint:'#8A4FFF' },
            { t:'00:00.7', a:'SOCR',  m:'Buka: minta siswa ajarkan a⁻ⁿ = 1/aⁿ.', tint:'#3FB37F' },
            { t:'00:14.2', a:'KNOW',  m:'Update belief: resiprokal P=0.41→0.68.', tint:'#C98A17' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 60px 1fr', gap: 10, padding: '10px 14px', borderTop: i ? '1px solid var(--line-2)' : undefined, fontSize: 12 }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)' }}>{r.t}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--f-mono)', fontSize: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: r.tint }} />{r.a}
              </div>
              <div style={{ lineHeight: 1.45 }}>{r.m}</div>
            </div>
          ))}
        </div>
      </div>

      {/* agent health */}
      <div style={{ padding: '18px 22px 30px' }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Agent health</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {AGENTS.map((a, i) => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? '1px solid var(--line-2)' : undefined }}>
              <span style={{ width: 10, height: 10, borderRadius: 999, background: a.tint, boxShadow: `0 0 0 4px ${a.tint}22` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{a.n}</div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>p95 {a.lat}</div>
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12 }}>{a.ok}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
