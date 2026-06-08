'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { I } from '@/components/shared/icons';

interface ConceptNode {
  id: string;
  label: string;
  phase: string;
  description: string;
  status: string; // 'green' | 'red' | 'yellow' | 'gray'
  score: number;
}

interface ConceptEdge {
  source: string;
  target: string;
}

const LAYOUT_MAP: Record<string, { x: number; y: number; r: number }> = {
  'd-operasi-bilangan': { x: 70, y: 60, r: 14 },
  'e-eksponen-logaritma': { x: 260, y: 120, r: 14 },
  'd-aljabar-dasar': { x: 90, y: 160, r: 14 },
  'f-matriks': { x: 70, y: 400, r: 14 },
  'f-fungsi-komposisi-invers': { x: 170, y: 260, r: 22 },
  'e-fungsi-kuadrat': { x: 260, y: 340, r: 16 },
  'd-persamaan-linear-satu': { x: 200, y: 70, r: 12 },
  'f-limit-fungsi': { x: 220, y: 440, r: 12 },
};

function Node({ 
  x, y, r, fill, label, ring, focus, locked, onClick 
}: { 
  x: number; y: number; r: number; fill: string; label: string; ring?: boolean; focus?: string; locked?: boolean; onClick?: () => void 
}) {
  const c = '#14141A';
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
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
  const [nodes, setNodes] = useState<ConceptNode[]>([]);
  const [edges, setEdges] = useState<ConceptEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMap() {
      try {
        const response = await fetch('http://localhost:3001/api/sessions/concept-map?studentId=std_default_dev');
        if (response.ok) {
          const data = await response.json();
          setNodes(data.nodes);
          setEdges(data.edges);
          
          // Set focus or default selected node
          const compNode = data.nodes.find((n: ConceptNode) => n.id === 'f-fungsi-komposisi-invers');
          setSelectedNode(compNode || data.nodes[0] || null);
        }
      } catch (err) {
        console.error('Failed to load concept map:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMap();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return '#3FB37F';
      case 'red': return '#E26F6F';
      case 'yellow': return '#E5A535';
      default: return 'rgba(20,20,26,.18)';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'green': return 'DIKUASAI';
      case 'red': return 'CELAH KRITIS';
      case 'yellow': return 'REMEDIASI';
      default: return 'TERKUNCI';
    }
  };

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto', background: 'var(--bg-2)' }}>
      <div style={{ padding: '4px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>PETAMU · MATEMATIKA XII</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, marginTop: 4, lineHeight: 1.05 }}>
            {loading ? 'Memuat...' : `${nodes.length} Simpul`}
          </div>
        </div>
        <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 12 }}>{I.filter({ size: 16 })}</button>
      </div>

      {/* legend */}
      <div style={{ padding: '4px 22px 12px', display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 11 }}>
        {[
          ['#3FB37F', `Dikuasai (${nodes.filter(n => n.status === 'green').length})`],
          ['#E5A535', `Remediasi (${nodes.filter(n => n.status === 'yellow').length})`],
          ['#E26F6F', `Celah Kritis (${nodes.filter(n => n.status === 'red').length})`],
        ].map(([bg, l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: bg }} />{l}
          </span>
        ))}
      </div>

      {/* graph rendering */}
      <div style={{ padding: '4px 18px' }}>
        <svg viewBox="0 0 350 480" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Render paths between nodes */}
          {edges.map((edge, idx) => {
            const srcLayout = LAYOUT_MAP[edge.source];
            const tgtLayout = LAYOUT_MAP[edge.target];
            if (!srcLayout || !tgtLayout) return null;
            
            const srcNode = nodes.find(n => n.id === edge.source);
            const tgtNode = nodes.find(n => n.id === edge.target);
            const isGap = srcNode?.status === 'red' || tgtNode?.status === 'red';
            
            return (
              <path 
                key={idx}
                d={`M ${srcLayout.x} ${srcLayout.y} C ${(srcLayout.x + tgtLayout.x)/2} ${(srcLayout.y + tgtLayout.y)/2 - 20}, ${(srcLayout.x + tgtLayout.x)/2} ${(srcLayout.y + tgtLayout.y)/2 + 20}, ${tgtLayout.x} ${tgtLayout.y}`}
                stroke={isGap ? '#E26F6F' : 'rgba(91,91,247,.4)'}
                strokeWidth={isGap ? '2' : '1.2'}
                strokeDasharray={isGap ? '4 4' : undefined}
                fill="none"
              />
            );
          })}

          {/* Render Nodes */}
          {nodes.map(node => {
            const layout = LAYOUT_MAP[node.id];
            if (!layout) return null;
            
            const isFocus = node.id === 'f-fungsi-komposisi-invers';
            
            return (
              <Node 
                key={node.id}
                x={layout.x}
                y={layout.y}
                r={layout.r}
                fill={getStatusColor(node.status)}
                label={node.label}
                ring={isFocus}
                focus={isFocus ? "KAMU" : undefined}
                locked={node.status === 'gray'}
                onClick={() => setSelectedNode(node)}
              />
            );
          })}
        </svg>
      </div>

      {/* selected node card */}
      {selectedNode && (
        <div style={{ padding: '12px 18px 4px' }}>
          <div style={{ padding: '14px', borderRadius: 18, background: '#fff', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 14, height: 14, borderRadius: 999, background: getStatusColor(selectedNode.status), boxShadow: `0 0 0 5px ${getStatusColor(selectedNode.status)}30` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9.5, letterSpacing: '.1em', color: 'var(--muted)' }}>
                  {getStatusLabel(selectedNode.status)}
                </div>
                <div style={{ fontFamily: 'var(--f-serif)', fontSize: 20, lineHeight: 1.1, marginTop: 2 }}>
                  {selectedNode.label}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--indigo)', fontWeight: 600 }}>
                {Math.round(selectedNode.score * 100)}%
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.5 }}>
              {selectedNode.description || 'Tidak ada deskripsi materi.'}
            </div>
            
            {/* If node is in Red (Prerequisite Gap) or Yellow (Remediation) state, offer Teach-Me action */}
            {(selectedNode.status === 'red' || selectedNode.status === 'yellow' || selectedNode.id === 'd-operasi-bilangan') && (
              <button 
                onClick={() => {
                  // In a real flow, start the session and redirect
                  fetch('http://localhost:3001/api/sessions/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentId: 'std_default_dev', nodeId: selectedNode.id })
                  }).then(res => res.json()).then(session => {
                    router.push(`/student/teach-me?sessionId=${session.id}`);
                  });
                }} 
                style={{ marginTop: 12, width: '100%', padding: '14px', background: 'var(--grad)', color: '#fff', border: 0, borderRadius: 14, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 10px 24px -8px rgba(91,91,247,.5)' }}
              >
                Mulai Sesi Teach-Me {I.arrow({ size: 14, stroke: '#fff' })}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
