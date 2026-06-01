'use client';

import { I } from '@/components/shared/icons';

export default function UploadPage() {
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto' }}>
      <div style={{ padding: '10px 22px 8px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>MATERIALS · INTAKE</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 28, lineHeight: 1.05, marginTop: 4, letterSpacing: '-.01em' }}>Upload <em>bahan ajar.</em></div>
      </div>

      {/* drop zone */}
      <div style={{ padding: '8px 22px' }}>
        <div style={{ padding: '28px 18px', borderRadius: 20, border: '1.5px dashed var(--line)', background: 'linear-gradient(180deg,#fff,var(--bg-2))', textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: 18, margin: '0 auto', background: 'var(--grad)', display: 'grid', placeItems: 'center', boxShadow: '0 12px 28px -8px rgba(91,91,247,.5)' }}>
            {I.upload({ size: 24, stroke: '#fff' })}
          </div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 20, marginTop: 14, lineHeight: 1.2 }}>Tarik file ke sini</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>PDF · foto · RPP · worksheet</div>
          <button style={{ marginTop: 16, padding: '12px 20px', borderRadius: 12, border: 0, background: 'var(--ink)', color: '#fff', fontWeight: 600, fontSize: 13 }}>Pilih file</button>
        </div>
      </div>

      {/* recent */}
      <div style={{ padding: '18px 22px 4px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 10 }}>RECENT</div>
        {[
          { t: 'BAB-3 Matriks invers · RPP', sub: '14 pages · analyzed · 12 concepts', s: 'ok'   },
          { t: 'Worksheet eksponen #2',       sub: '4 pages · analyzing 78%',           s: 'go'   },
          { t: 'Whiteboard photo · SPL',      sub: '2 images · queued',                 s: 'wait' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', borderRadius: 14, background: '#fff', border: '1px solid var(--line)', marginBottom: 8 }}>
            <div style={{ width: 34, height: 42, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 6, fontFamily: 'var(--f-mono)', fontSize: 8, fontWeight: 700, color: 'var(--err)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>PDF</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>{r.sub}</div>
            </div>
            {r.s === 'ok'   && <span className="tag tag--ok"  style={{ fontSize: 10 }}>done</span>}
            {r.s === 'go'   && <span className="tag tag--ind" style={{ fontSize: 10 }}>78%</span>}
            {r.s === 'wait' && <span className="tag"          style={{ fontSize: 10 }}>queued</span>}
          </div>
        ))}
      </div>

      {/* AI processing */}
      <div style={{ padding: '14px 22px 4px' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.1em', color: 'var(--muted)', marginBottom: 10 }}>AI PROCESSING TIMELINE</div>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: '#fff' }}>
          {[
            { l: 'Upload & validate',           done: true  },
            { l: 'OCR & layout parse',          done: true,  sub: '34 figur, 18 persamaan' },
            { l: 'Ekstraksi topik & subtopik',  done: true,  sub: '5 topik, 12 subtopik' },
            { l: 'Build prerequisite graph',    done: true,  sub: '34 node terhubung' },
            { l: 'Generate adaptive exercises', done: true,  sub: '18 template soal siap' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, padding: '12px 14px', borderTop: i ? '1px solid var(--line-2)' : undefined }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, background: s.done ? 'var(--ok-bg)' : 'rgba(91,91,247,.12)', color: s.done ? 'var(--ok)' : 'var(--indigo)', display: 'grid', placeItems: 'center' }}>
                {I.check({ size: 12 })}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.l}</div>
                {s.sub && <div style={{ fontSize: 11.5, color: 'var(--muted)', fontFamily: 'var(--f-mono)', marginTop: 3 }}>{s.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 22px 30px' }}>
        <button style={{ width: '100%', padding: '14px', background: 'var(--grad)', color: '#fff', border: 0, borderRadius: 14, fontSize: 14, fontWeight: 600 }}>
          Build & assign 17 items {I.arrow({ size: 14, stroke: '#fff' }) as React.ReactNode}
        </button>
      </div>
    </div>
  );
}
