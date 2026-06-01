// CONCEPT MAP — interactive graph visualization
function ConceptMapPage({ go }) {
  const [focus, setFocus] = React.useState('exp-neg');
  const nodes = ALL_NODES;
  const edges = ALL_EDGES;
  const cur = nodes.find(n => n.id === focus);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Curriculum graph · Matematika Kelas XII</div>
          <h1 className="page-title">Concept <em>map.</em></h1>
          <div className="page-sub">Every concept your class has touched. Click a node to see who's stuck and what unlocks it.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <div className="tabs">
            <button className="tab is-active">Class view</button>
            <button className="tab">Devin's view</button>
            <button className="tab">Curriculum</button>
          </div>
          <button className="btn btn--sm">{I.download({size:13})} Export</button>
        </div>
      </div>

      <div className="grid-12">
        {/* graph canvas */}
        <div className="card span-9" style={{padding:0, overflow:'hidden', position:'relative'}}>
          <div className="card-head">
            <h3>{I.graph({size:14, stroke:'var(--indigo)'})} Learning graph · 34 nodes</h3>
            <div style={{display:'flex', gap:6}}>
              <button className="btn btn--sm">{I.plus({size:12})}</button>
              <button className="btn btn--sm">−</button>
              <button className="btn btn--sm">100%</button>
              <button className="btn btn--sm">{I.spark({size:12})} Reset</button>
            </div>
          </div>
          <div style={{position:'relative', background:'var(--bg)', height:580}}>
            {/* grid */}
            <div style={{
              position:'absolute', inset:0,
              backgroundImage:'linear-gradient(rgba(20,20,26,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(20,20,26,.03) 1px, transparent 1px)',
              backgroundSize:'32px 32px'
            }}/>
            <svg viewBox="0 0 1080 580" style={{width:'100%', height:'100%', position:'relative'}}>
              <defs>
                <radialGradient id="halo">
                  <stop offset="0" stopColor="#5B5BF7" stopOpacity=".45"/>
                  <stop offset="1" stopColor="#5B5BF7" stopOpacity="0"/>
                </radialGradient>
              </defs>
              {/* edges */}
              {edges.map((e,i) => {
                const A = nodes.find(n=>n.id===e[0]); const B = nodes.find(n=>n.id===e[1]);
                const involves = focus && (e[0]===focus || e[1]===focus);
                const stroke = involves ? 'rgba(91,91,247,.7)' : (A.s==='err'||B.s==='err') ? 'rgba(209,67,67,.35)' : 'rgba(20,20,26,.1)';
                return (
                  <path key={i}
                    d={`M ${A.x} ${A.y} C ${(A.x+B.x)/2} ${A.y}, ${(A.x+B.x)/2} ${B.y}, ${B.x} ${B.y}`}
                    stroke={stroke} strokeWidth={involves?2:1.2} fill="none"
                    strokeDasharray={(A.s==='err'||B.s==='err') ? '4 5' : 'none'}
                  />
                );
              })}
              {/* node halos for focus */}
              {focus && (() => {
                const n = nodes.find(x=>x.id===focus);
                return <circle cx={n.x} cy={n.y} r="60" fill="url(#halo)"/>;
              })()}
              {/* nodes */}
              {nodes.map(n => {
                const c = n.s==='ok'?'#3FB37F': n.s==='warn'?'#E5A535': n.s==='err'?'#E26F6F':'#5B5BF7';
                const r = n.s==='hub' ? 16 : 12;
                return (
                  <g key={n.id} style={{cursor:'pointer'}} onClick={()=>setFocus(n.id)}>
                    <circle cx={n.x} cy={n.y} r={r+6} fill={c} opacity=".14"/>
                    <circle cx={n.x} cy={n.y} r={r} fill={c}
                      stroke={focus===n.id?'#fff':'rgba(255,255,255,.7)'} strokeWidth={focus===n.id?3:2}/>
                    {focus===n.id && <circle cx={n.x} cy={n.y} r={r+10} fill="none" stroke={c} strokeDasharray="3 4"/>}
                    <text x={n.x} y={n.y+r+14} textAnchor="middle" fontFamily="var(--f-sans)" fontSize="11"
                          fill={focus===n.id?'#14141A':'rgba(20,20,26,.7)'} fontWeight={focus===n.id?600:400}>{n.l}</text>
                    {n.count != null && (
                      <text x={n.x} y={n.y+3} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fontWeight="600" fill="#fff">{n.count}</text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* legend */}
            <div style={{
              position:'absolute', left:18, bottom:18,
              background:'#fff', border:'1px solid var(--line)', borderRadius:12,
              padding:'10px 14px', display:'flex', gap:14, fontSize:11.5, alignItems:'center'
            }}>
              <span style={{fontFamily:'var(--f-mono)', color:'var(--muted)', fontSize:10}}>LEGEND</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10,height:10,borderRadius:999,background:'#3FB37F'}}/> mastered</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10,height:10,borderRadius:999,background:'#E5A535'}}/> under remediation</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10,height:10,borderRadius:999,background:'#E26F6F'}}/> prerequisite gap</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:10,height:10,borderRadius:999,background:'#5B5BF7'}}/> current focus</span>
            </div>
          </div>
        </div>

        {/* side: focused node */}
        <div className="card span-3" style={{padding:20}}>
          <div className="eyebrow"><span className="dot"/>Focused concept</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:24, marginTop:10, lineHeight:1.1}}>{cur ? cur.full : '—'}</div>
          <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--muted)', marginTop:6}}>
            curriculum.id · {cur ? cur.id : ''}
          </div>
          <div style={{display:'flex', gap:6, marginTop:14, flexWrap:'wrap'}}>
            {cur && cur.s==='err' && <span className="tag tag--err"><span className="dot"/>23 stuck</span>}
            {cur && cur.s==='warn' && <span className="tag tag--warn"><span className="dot"/>under remediation</span>}
            {cur && cur.s==='ok' && <span className="tag tag--ok"><span className="dot"/>mastered by 87%</span>}
            <span className="tag">Bloom L1–L3</span>
            <span className="tag">5 exercises</span>
          </div>

          <div className="hr"/>
          <div className="eyebrow" style={{fontSize:10}}>Prerequisites</div>
          <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:10}}>
            {(cur && cur.prereq ? cur.prereq : ['Eksponen positif','Operasi pecahan']).map(p => (
              <div key={p} style={{padding:'8px 10px', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:8, fontSize:12.5, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                {p}
                <span className="tag tag--ok" style={{fontSize:9.5}}>ok</span>
              </div>
            ))}
          </div>

          <div className="hr"/>
          <div className="eyebrow" style={{fontSize:10}}>Unlocks</div>
          <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:10}}>
            {(cur && cur.unlock ? cur.unlock : ['Determinan 2×2','Invers 2×2']).map(p => (
              <div key={p} style={{padding:'8px 10px', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:8, fontSize:12.5, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                {p}
                <span className="tag" style={{fontSize:9.5, background:'var(--chip)'}}>gated</span>
              </div>
            ))}
          </div>

          <button className="btn btn--grad" style={{width:'100%', marginTop:16}} onClick={()=>go('teach')}>Start remediation {I.arrow({size:13})}</button>
        </div>

        {/* bottom: who is stuck */}
        <div className="card span-12" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.users({size:14, stroke:'var(--err)'})} Students stuck at this node</h3>
            <span className="tag tag--err">23 students</span>
          </div>
          <table className="tbl">
            <thead><tr><th>Student</th><th>Class</th><th>Belief P(mastered)</th><th>Last attempt</th><th>Suggested path</th><th></th></tr></thead>
            <tbody>
              {[
                { n:'Devin Pradana',   c:'XII-IPA-1', p:.41, t:'8 min ago',  path:'Teach-Me · reciprocal'},
                { n:'Eka Putri',       c:'XII-IPA-1', p:.28, t:'14 min ago', path:'Diagnostic re-test'},
                { n:'Bayu Pratama',    c:'XII-IPA-2', p:.34, t:'24 min ago', path:'Pair-teach with Hesti'},
                { n:'Anisa Rahmadani', c:'XII-IPA-1', p:.52, t:'1 h ago',    path:'Apply quiz · 3 items'},
                { n:'Galuh Saputri',   c:'XII-IPA-2', p:.46, t:'2 h ago',    path:'Teach-Me · zero exponent'},
              ].map((r,i) => (
                <tr key={i}>
                  <td style={{fontWeight:500}}>{r.n}</td>
                  <td><span className="tag">{r.c}</span></td>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div className="bar" style={{width:120}}><i style={{width:`${r.p*100}%`, background: r.p<.4?'var(--err)':'var(--warn)'}}/></div>
                      <span style={{fontFamily:'var(--f-mono)', fontSize:11.5}}>{r.p.toFixed(2)}</span>
                    </div>
                  </td>
                  <td style={{fontFamily:'var(--f-mono)', fontSize:11.5, color:'var(--muted)'}}>{r.t}</td>
                  <td style={{fontSize:13}}>{r.path}</td>
                  <td style={{textAlign:'right'}}><button className="btn btn--sm" onClick={()=>go('teach')}>Start →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const ALL_NODES = [
  // foundations
  { id:'int',     x:60,  y:90,  l:'Bilangan bulat',     full:'Bilangan bulat',     s:'ok' },
  { id:'frac',    x:60,  y:200, l:'Pecahan',            full:'Pecahan dasar',      s:'ok' },
  { id:'frac-op', x:60,  y:310, l:'Operasi pecahan',    full:'Operasi pecahan',    s:'ok' },
  { id:'order',   x:60,  y:420, l:'Urutan operasi',     full:'Urutan operasi',     s:'ok' },

  // intermediate
  { id:'linear',  x:240, y:60,  l:'Persamaan linear',   full:'Persamaan linear satu var.', s:'ok' },
  { id:'lin-2',   x:240, y:160, l:'PLDV',               full:'Persamaan linear dua var.',  s:'ok' },
  { id:'spl',     x:240, y:260, l:'SPL',                full:'Sistem persamaan linear',    s:'warn' },
  { id:'exp-pos', x:240, y:370, l:'Eksponen positif',   full:'Eksponen positif',   s:'ok' },
  { id:'exp-neg', x:240, y:470, l:'Eksponen negatif',   full:'Eksponen negatif → reciprocal', s:'err', count:23,
    prereq:['Eksponen positif','Operasi pecahan'], unlock:['Eksponen pecahan','Logaritma','Invers matriks (entries)']},

  // advanced
  { id:'quad',    x:430, y:90,  l:'Fungsi kuadrat',     full:'Fungsi kuadrat',     s:'ok' },
  { id:'poly',    x:430, y:190, l:'Polinom',            full:'Polinom umum',       s:'warn' },
  { id:'log',     x:430, y:290, l:'Logaritma',          full:'Logaritma',          s:'warn' },
  { id:'exp-frac',x:430, y:390, l:'Eksponen pecahan',   full:'Eksponen pecahan',   s:'err', count:14 },
  { id:'root',    x:430, y:490, l:'Sifat akar',         full:'Sifat akar',         s:'warn' },

  { id:'matrix',  x:620, y:80,  l:'Operasi matriks',    full:'Operasi matriks',    s:'warn' },
  { id:'det',     x:620, y:200, l:'Determinan 2×2',     full:'Determinan 2×2',     s:'warn', count:9 },
  { id:'vec',     x:620, y:320, l:'Vektor 2D',          full:'Vektor 2 dimensi',   s:'ok' },
  { id:'trig',    x:620, y:440, l:'Trigonometri dasar', full:'Trigonometri dasar', s:'ok' },

  // target
  { id:'inv',     x:820, y:140, l:'Invers 2×2',         full:'Invers matriks 2×2', s:'hub' },
  { id:'adj',     x:820, y:280, l:'Adjugate',           full:'Adjugate / kofaktor',s:'warn' },
  { id:'trig-id', x:820, y:420, l:'Identitas trig',     full:'Identitas trigonometri', s:'ok' },

  // applications
  { id:'crypto',  x:1000, y:200, l:'Kriptografi matriks', full:'Aplikasi: kriptografi matriks', s:'hub' },
  { id:'lin-prog',x:1000, y:330, l:'Program linear',    full:'Program linear',     s:'hub' },
];

const ALL_EDGES = [
  ['int','linear'],['int','lin-2'],['frac','frac-op'],['frac-op','exp-neg'],['order','exp-pos'],
  ['linear','quad'],['linear','spl'],['lin-2','spl'],['lin-2','quad'],['exp-pos','poly'],
  ['exp-pos','log'],['exp-pos','exp-neg'],['exp-neg','exp-frac'],['exp-neg','log'],['exp-frac','root'],
  ['quad','poly'],['poly','matrix'],['poly','det'],['log','exp-frac'],
  ['matrix','inv'],['det','inv'],['det','adj'],['matrix','adj'],['vec','matrix'],['vec','trig-id'],
  ['trig','trig-id'],['inv','crypto'],['adj','crypto'],['spl','lin-prog'],['matrix','lin-prog'],
  ['exp-neg','inv'], // the dangerous prerequisite
];

Object.assign(window, { ConceptMapPage });
