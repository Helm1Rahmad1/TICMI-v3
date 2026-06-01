'use client';

import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

function Node({ x, y, r, fill, label, ring, focus, locked }: { x:number; y:number; r:number; fill:string; label:string; ring?:boolean; focus?:string; locked?:boolean }) {
  const c = '#14141A';
  return (
    <g>
      <circle cx={x} cy={y} r={r + 6} fill={fill} opacity=".18" />
      <circle cx={x} cy={y} r={r} fill={fill} />
      {ring && <circle cx={x} cy={y} r={r + 8} fill="none" stroke={fill} strokeDasharray="3 4" />}
      {focus && <text x={x} y={y + 4} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="10" fontWeight="600" fill="#fff">{focus}</text>}
      <text x={x} y={y + r + 18} textAnchor="middle" fontSize="11" fill={c} fontWeight={focus ? 600 : 400} opacity={locked ? 0.5 : 1}>{label}</text>
    </g>
  );
}

export default function ConceptMapPage() {
  const router = useRouter();
  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto', background: 'var(--bg-2)' }}>
      <div style={{ padding: '4px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>PETAMU · MATEMATIKA XII</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, marginTop: 4, lineHeight: 1.05 }}>34 simpul</div>
        </div>
        <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 12 }}>{I.filter({ size: 16 })}</button>
      </div>

      {/* legend */}
      <div style={{ padding: '4px 22px 12px', display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 11 }}>
        {[['#3FB37F','dikuasai 21'],['#E5A535','terbuka 9'],['#E26F6F','kesenjangan 4']].map(([bg,l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: bg }} />{l}
          </span>
        ))}
      </div>

      {/* graph */}
      <div style={{ padding: '4px 18px' }}>
        <svg viewBox="0 0 354 480" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <path d="M 50 50 C 100 70, 110 110, 70 150"    stroke="rgba(31,158,106,.5)"  strokeWidth="1.5" fill="none" />
          <path d="M 70 150 C 140 180, 180 210, 170 260"  stroke="rgba(91,91,247,.7)"   strokeWidth="2"   fill="none" />
          <path d="M 170 260 C 220 290, 270 320, 260 370" stroke="rgba(209,67,67,.6)"   strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <path d="M 50 50 C 130 80, 200 100, 240 130"    stroke="rgba(31,158,106,.4)"  strokeWidth="1.2" fill="none" />
          <path d="M 240 130 C 270 180, 260 220, 170 260" stroke="rgba(31,158,106,.4)"  strokeWidth="1.2" fill="none" />
          <Node x={50}  y={50}  r={14} fill="#3FB37F" label="Pecahan" />
          <Node x={240} y={130} r={14} fill="#3FB37F" label="Eksp +" />
          <Node x={70}  y={150} r={14} fill="#3FB37F" label="Persamaan" />
          <Node x={170} y={260} r={22} fill="#5B5BF7" label="Eksp negatif" ring focus="KAMU" />
          <Node x={260} y={370} r={16} fill="#E26F6F" label="Invers 2×2" />
          <Node x={220} y={450} r={12} fill="rgba(20,20,26,.18)" label="Aplikasi" locked />
          <Node x={70}  y={400} r={14} fill="#E5A535" label="Determinan" />
        </svg>
      </div>

      {/* selected node card */}
      <div style={{ padding: '12px 18px 4px' }}>
        <div style={{ padding: '14px', borderRadius: 18, background: '#fff', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: 'var(--indigo)', boxShadow: '0 0 0 5px rgba(91,91,247,.18)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, letterSpacing: '.1em', color: 'var(--muted)' }}>FOKUS</div>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: 20, lineHeight: 1.1, marginTop: 2 }}>Eksp. negatif</div>
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--indigo)', fontWeight: 600 }}>62%</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.5 }}>
            Selesaikan ini dan <b>invers matriks</b> terbuka. Kiko sudah paham aturan resiprokal — dia stuck di n=0.
          </div>
          <button onClick={() => router.push('/student/teach-me')} style={{ marginTop: 12, width: '100%', padding: '14px', background: 'var(--grad)', color: '#fff', border: 0, borderRadius: 14, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 24px -8px rgba(91,91,247,.5)' }}>
            Lanjut Teach-Me · 8 mnt {I.arrow({ size: 14, stroke: '#fff' })}
          </button>
        </div>
      </div>
    </div>
  );
}
