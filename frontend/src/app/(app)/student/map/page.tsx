'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
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

const PATHS: Record<string, string[]> = {
  'f-fungsi-komposisi-invers': ['d-operasi-bilangan', 'd-aljabar-linear', 'd-relasi-fungsi', 'e-fungsi-kuadrat', 'f-fungsi-komposisi-invers'],
  'f-matriks': ['d-operasi-bilangan', 'd-aljabar-linear', 'd-spldv', 'f-matriks'],
  'f-trigonometri-lanjut': ['d-geometri-datar', 'd-pythagoras', 'e-trigonometri-dasar', 'f-trigonometri-lanjut'],
  'f-statistika-inferensial': ['d-statistika-peluang', 'e-statistika-data', 'f-statistika-inferensial'],
  'f-anuitas': ['d-bilangan-berpangkat', 'e-barisan-deret', 'e-eksponen-logaritma', 'f-anuitas'],
  'f-transformasi-lanjut': ['d-transformasi-geometri', 'f-matriks', 'f-transformasi-lanjut']
};

const getEdgeStyle = (srcStatus?: string, tgtStatus?: string) => {
  if (srcStatus === 'red' || tgtStatus === 'red') {
    return { stroke: '#E26F6F', dashed: true, width: '3.2' };
  }
  if (srcStatus === 'green' && tgtStatus === 'green') {
    return { stroke: '#3FB37F', dashed: false, width: '2.6' };
  }
  if (srcStatus === 'yellow' || tgtStatus === 'yellow') {
    return { stroke: '#E5A535', dashed: false, width: '2.6' };
  }
  return { stroke: '#CBD5E0', dashed: false, width: '2.2' };
};

function NodeLabel({ x, y, label, r, locked, focus }: { x: number; y: number; label: string; r: number; locked: boolean; focus: boolean }) {
  const c = '#14141A';
  let lines = [label];
  if (label.length > 20) {
    if (label.includes(' & ')) {
      const parts = label.split(' & ');
      lines = [parts[0] + ' &', parts.slice(1).join(' & ')];
    } else if (label.includes(', ')) {
      const parts = label.split(', ');
      lines = [parts[0] + ',', parts.slice(1).join(', ')];
    } else {
      const words = label.split(' ');
      const mid = Math.ceil(words.length / 2);
      lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
    }
  }

  return (
    <text 
      x={x} 
      y={y + r + 16} 
      textAnchor="middle" 
      fontSize="9.5" 
      fill={c} 
      fontWeight={focus ? 600 : 400} 
      opacity={locked ? 0.6 : 1}
    >
      {lines.map((line, idx) => (
        <tspan key={idx} x={x} dy={idx > 0 ? 11 : 0}>{line}</tspan>
      ))}
    </text>
  );
}

function Node({ 
  x, y, r, fill, label, ring, focus, locked, onClick 
}: { 
  x: number; y: number; r: number; fill: string; label: string; ring?: boolean; focus?: string; locked?: boolean; onClick?: () => void 
}) {
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }} className="concept-node-group">
      <circle cx={x} cy={y} r={r + 6} fill={fill} opacity=".18" className={focus ? "pulse-ring" : ""} />
      <circle cx={x} cy={y} r={r} fill={fill} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' }} />
      {ring && <circle cx={x} cy={y} r={r + 8} fill="none" stroke={fill} strokeWidth="1.5" strokeDasharray="3 4" />}
      {focus && <text x={x} y={y + 3} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fontWeight="700" fill="#fff">{focus}</text>}
      <NodeLabel x={x} y={y} label={label} r={r} locked={!!locked} focus={!!focus} />
    </g>
  );
}

export default function StudentMapPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [nodes, setNodes] = useState<ConceptNode[]>([]);
  const [edges, setEdges] = useState<ConceptEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [selectedTrack, setSelectedTrack] = useState('f-fungsi-komposisi-invers');
  const [loading, setLoading] = useState(true);

  // Generate dynamic path layout
  const pathNodeIds = PATHS[selectedTrack] || PATHS['f-fungsi-komposisi-invers'];
  const activeNodeIdFromMemory = nodes.find(n => n.status === 'red' || n.status === 'yellow')?.id;
  const activeNodeId = pathNodeIds.includes(activeNodeIdFromMemory || '') 
    ? (activeNodeIdFromMemory || 'f-fungsi-komposisi-invers')
    : pathNodeIds[pathNodeIds.length - 1];

  const activeIndexInTrack = pathNodeIds.indexOf(activeNodeId);
  const activeIndex = activeIndexInTrack !== -1 ? activeIndexInTrack : pathNodeIds.length - 1;

  const dynamicLayout: Record<string, { x: number; y: number; r: number }> = {};
  pathNodeIds.forEach((nodeId, idx) => {
    const isFocus = nodeId === activeNodeId;
    const y = 80 + idx * 140; // Prerequisite at top (idx 0), Target at bottom (idx 4)
    const x = 175 + Math.sin(idx * (Math.PI / 2)) * 50; // Symmetrical winding path
    const r = isFocus ? 22 : 14;
    dynamicLayout[nodeId] = { x, y, r };
  });

  const svgHeight = 80 + (pathNodeIds.length - 1) * 140 + 80;

  // Auto scroll to center active node inside container
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeNodeLayout = dynamicLayout[activeNodeId] || { y: 250 };
      
      const scrollTop = activeNodeLayout.y - container.clientHeight / 2;
      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  }, [nodes, selectedTrack, activeNodeId]);

  useEffect(() => {
    async function loadMap() {
      try {
        const response = await fetch(`http://localhost:3001/api/sessions/concept-map?studentId=std_default_dev&t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setNodes(data.nodes);
          setEdges(data.edges);
          
          // Set track based on active prerequisite gap or active node
          const activeId = data.studentMemory?.prerequisite_gaps?.[0] || 'f-fungsi-komposisi-invers';
          const containingTrack = Object.keys(PATHS).find(trackId => PATHS[trackId].includes(activeId));
          if (containingTrack) {
            setSelectedTrack(containingTrack);
          }

          const activeNode = data.nodes.find((n: ConceptNode) => n.id === activeId);
          setSelectedNode(activeNode || data.nodes[0] || null);
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
      default: return '#A0AEC0'; // Solid premium gray for unstudied
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

  // Filter edges to only render relations in current path
  const filteredEdges = edges.filter(edge => 
    pathNodeIds.includes(edge.source) && pathNodeIds.includes(edge.target)
  );

  return (
    <div style={{ paddingTop: 54, paddingBottom: 110, minHeight: '100vh', overflow: 'auto', background: 'var(--bg-2)' }}>
      <style>{`
        .concept-node-group {
          cursor: pointer;
        }
        .concept-node-group circle {
          transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
        }
        .concept-node-group:hover circle:first-of-type {
          opacity: 0.35;
        }
        .concept-node-group:hover circle:last-of-type {
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15)) !important;
        }
        .pulse-ring {
          animation: ringPulse 2s infinite;
          transform-origin: center;
        }
        @keyframes ringPulse {
          0% {
            r: 28px;
            opacity: 0.18;
          }
          50% {
            r: 34px;
            opacity: 0.35;
          }
          100% {
            r: 28px;
            opacity: 0.18;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .scroll-container::-webkit-scrollbar {
          width: 5px;
        }
        .scroll-container::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.02);
          border-radius: 999px;
        }
        .scroll-container::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.08);
          border-radius: 999px;
        }
      `}</style>

      <div style={{ padding: '4px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>PETAMU · MATEMATIKA XII</div>
          <div style={{ fontFamily: 'var(--f-serif)', fontSize: 30, marginTop: 4, lineHeight: 1.05 }}>
            {loading ? 'Memuat...' : `${pathNodeIds.length} Konsep`}
          </div>
        </div>
        <button className="icon-btn" style={{ width: 38, height: 38, borderRadius: 12 }}>{I.filter({ size: 16 })}</button>
      </div>

      {/* track selector */}
      <div style={{ padding: '8px 22px', display: 'flex', gap: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="no-scrollbar">
        {[
          { id: 'f-fungsi-komposisi-invers', label: 'Komposisi & Invers' },
          { id: 'f-matriks', label: 'Matriks & Operasi' },
          { id: 'f-trigonometri-lanjut', label: 'Trigonometri Lanjut' },
          { id: 'f-statistika-inferensial', label: 'Statistika Inferensial' },
          { id: 'f-anuitas', label: 'Keuangan & Anuitas' },
          { id: 'f-transformasi-lanjut', label: 'Transformasi Geometri' }
        ].map(track => (
          <button
            key={track.id}
            onClick={() => {
              setSelectedTrack(track.id);
              const trackNodes = PATHS[track.id];
              const tActiveId = trackNodes.includes(activeNodeIdFromMemory || '') 
                ? (activeNodeIdFromMemory || 'f-fungsi-komposisi-invers')
                : trackNodes[trackNodes.length - 1];
              const tNode = nodes.find(n => n.id === tActiveId);
              if (tNode) setSelectedNode(tNode);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: selectedTrack === track.id ? 'none' : '1px solid var(--line)',
              background: selectedTrack === track.id ? 'var(--grad)' : '#fff',
              color: selectedTrack === track.id ? '#fff' : 'var(--ink)',
              fontSize: 11.5,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              boxShadow: selectedTrack === track.id ? '0 4px 12px rgba(91,91,247,0.2)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* legend */}
      <div style={{ padding: '4px 22px 12px', display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11 }}>
        {[
          ['#3FB37F', 'Dikuasai'],
          ['#E5A535', 'Remediasi'],
          ['#E26F6F', 'Celah Kritis'],
          ['#A0AEC0', 'Belum Dipelajari'],
        ].map(([bg, l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: bg }} />{l}
          </span>
        ))}
      </div>

      {/* graph rendering */}
      <div style={{ padding: '4px 18px' }}>
        <div 
          ref={containerRef}
          className="scroll-container"
          style={{ 
            width: '100%', 
            height: '420px',
            overflowY: 'auto',
            overflowX: 'hidden',
            border: '1px solid var(--line)', 
            borderRadius: 20, 
            background: '#fff', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            position: 'relative'
          }}
        >
          <svg viewBox={`0 0 350 ${svgHeight}`} style={{ width: '100%', height: svgHeight, display: 'block' }}>
            {/* Render paths between consecutive nodes in the track */}
            {pathNodeIds.slice(0, -1).map((nodeId, idx) => {
              const nextNodeId = pathNodeIds[idx + 1];
              const srcLayout = dynamicLayout[nodeId];
              const tgtLayout = dynamicLayout[nextNodeId];
              if (!srcLayout || !tgtLayout) return null;
              
              const srcNode = nodes.find(n => n.id === nodeId);
              const tgtNode = nodes.find(n => n.id === nextNodeId);
              
              const { stroke, dashed, width } = getEdgeStyle(srcNode?.status, tgtNode?.status);
              
              // Start at bottom boundary of source, end at top boundary of target
              const x1 = srcLayout.x;
              const y1 = srcLayout.y + srcLayout.r;
              const x2 = tgtLayout.x;
              const y2 = tgtLayout.y - tgtLayout.r;
              
              // Smooth cubic Bezier control points
              const cpY1 = y1 + (y2 - y1) * 0.5;
              const cpY2 = y2 - (y2 - y1) * 0.5;
              
              const d = `M ${x1} ${y1} C ${x1} ${cpY1}, ${x2} ${cpY2}, ${x2} ${y2}`;

              return (
                <path 
                  key={idx}
                  d={d}
                  stroke={stroke}
                  strokeWidth={width}
                  strokeDasharray={dashed ? '4 4' : undefined}
                  fill="none"
                />
              );
            })}

            {/* Render Nodes */}
            {pathNodeIds.map(nodeId => {
              const layout = dynamicLayout[nodeId];
              if (!layout) return null;
              
              const node = nodes.find(n => n.id === nodeId);
              if (!node) return null;

              const isFocus = nodeId === activeNodeId;
              
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
