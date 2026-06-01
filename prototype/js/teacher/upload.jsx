// MATERIAL UPLOAD PAGE
function UploadPage({ go }) {
  const [phase, setPhase] = React.useState('done'); // idle | uploading | analyzing | done
  const [progress, setProgress] = React.useState(100);

  const start = () => {
    setPhase('uploading'); setProgress(0);
    let p = 0;
    const tick = () => {
      p += 4 + Math.random()*6;
      if (p >= 60 && phase !== 'analyzing') setPhase('analyzing');
      if (p >= 100) { p = 100; setPhase('done'); setProgress(100); return; }
      setProgress(p);
      setTimeout(tick, 120);
    };
    tick();
  };

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Materials · AI ingestion</div>
          <h1 className="page-title">Drop the material. <em>We'll map the curriculum.</em></h1>
          <div className="page-sub">PDF, RPP, worksheet, or a photo of the whiteboard. The AI extracts concepts, traces prerequisites, and seeds adaptive exercises.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn--sm">{I.clock({size:13})} Recent uploads</button>
          <button className="btn btn--sm btn--primary" onClick={start}>{I.upload({size:13})} New upload</button>
        </div>
      </div>

      <div className="grid-12">
        {/* DROP ZONE + PREVIEW */}
        <div className="card span-7" style={{padding:0, overflow:'hidden'}}>
          <div className="card-head">
            <h3>{I.upload({size:14, stroke:'var(--indigo)'})} Upload bahan ajar</h3>
            <span className="tag">accepts pdf, jpg, png, docx, rpp</span>
          </div>
          <div style={{padding:22}}>
            {/* drop zone */}
            <div style={{
              border:'1.5px dashed var(--line)', borderRadius:18, padding:'34px 26px',
              background:'linear-gradient(180deg, var(--bg-2), #fff)',
              textAlign:'center', position:'relative', overflow:'hidden'
            }}>
              <div style={{
                width:64, height:64, borderRadius:18, margin:'0 auto',
                background:'var(--grad)', display:'grid', placeItems:'center',
                boxShadow:'0 12px 32px -12px rgba(91,91,247,.55)'
              }}>{I.upload({size:24, stroke:'#fff'})}</div>
              <div style={{fontFamily:'var(--f-serif)', fontSize:24, marginTop:16}}>
                Tarik file ke sini atau <em style={{textDecoration:'underline'}}>pilih dari komputer</em>
              </div>
              <div style={{color:'var(--muted)', fontSize:13, marginTop:6}}>
                Maks 50 MB per file. We OCR scanned PDFs and whiteboard photos automatically.
              </div>
              <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:18}}>
                <button className="btn btn--sm btn--primary" onClick={start}>{I.file({size:13})} Choose file</button>
                <button className="btn btn--sm">{I.device({size:13})} From mobile</button>
                <button className="btn btn--sm">{I.globe({size:13})} Paste URL</button>
              </div>
            </div>

            {/* current file */}
            <div style={{marginTop:22}}>
              <div style={{display:'flex', alignItems:'center', gap:14, padding:'14px 16px', border:'1px solid var(--line)', borderRadius:14, background:'var(--bg-2)'}}>
                <div style={{
                  width:44, height:54, background:'#fff', border:'1px solid var(--line)',
                  borderRadius:6, position:'relative', flexShrink:0
                }}>
                  <div style={{position:'absolute', top:6, left:6, right:6, height:2, background:'var(--err)'}}/>
                  <div style={{position:'absolute', top:12, left:6, right:14, height:1.5, background:'var(--line)'}}/>
                  <div style={{position:'absolute', top:16, left:6, right:10, height:1.5, background:'var(--line)'}}/>
                  <div style={{position:'absolute', top:20, left:6, right:18, height:1.5, background:'var(--line)'}}/>
                  <div style={{position:'absolute', bottom:6, left:6, fontFamily:'var(--f-mono)', fontSize:7, color:'var(--err)', fontWeight:700}}>PDF</div>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500, fontSize:13.5}}>BAB-3 Matriks invers · RPP Kelas XII.pdf</div>
                  <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)', marginTop:4}}>
                    14 pages · 2.4 MB · uploaded 09:38 WIB
                  </div>
                </div>
                {phase==='done'
                  ? <span className="tag tag--ok"><span className="dot"/>analyzed</span>
                  : <span className="tag tag--ind"><span className="dot"/>{phase==='analyzing'?'analyzing':'uploading'} {Math.round(progress)}%</span>}
              </div>

              {/* OCR / processing timeline */}
              <div style={{marginTop:18}}>
                <div className="eyebrow" style={{fontSize:10, marginBottom:10}}>AI processing timeline</div>
                {[
                  { l:'Upload & validate',           done:true, ico:'check'},
                  { l:'OCR & layout parse',          done:true, ico:'check', sub:'34 figures, 18 equations detected'},
                  { l:'Topic & subtopic extraction', done:true, ico:'check', sub:'5 topics, 12 subtopics'},
                  { l:'Prerequisite graph build',    done:phase==='done', ico: phase==='done'?'check':'spark', sub: phase==='done' ? '34 nodes wired to curriculum graph' : 'tracing dependencies…'},
                  { l:'Adaptive exercise seeding',   done:phase==='done', ico: phase==='done'?'check':'spark', sub:'18 problem templates ready'},
                ].map((s,i) => (
                  <div key={i} style={{display:'grid', gridTemplateColumns:'28px 1fr', gap:10, padding:'10px 0', borderBottom:'1px solid var(--line-2)'}}>
                    <div style={{
                      width:22, height:22, borderRadius:999,
                      background: s.done ? 'var(--ok-bg)' : 'rgba(91,91,247,.12)',
                      color: s.done ? 'var(--ok)' : 'var(--indigo)',
                      display:'grid', placeItems:'center'
                    }}>{I[s.ico]({size:12, stroke:'currentColor'})}</div>
                    <div>
                      <div style={{fontSize:13, fontWeight:500}}>{s.l}</div>
                      {s.sub && <div style={{fontSize:11.5, color:'var(--muted)', fontFamily:'var(--f-mono)', marginTop:3}}>{s.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DOCUMENT PREVIEW with OCR scan */}
        <div className="card span-5" style={{padding:0, overflow:'hidden'}}>
          <div className="card-head">
            <h3>{I.file({size:14, stroke:'var(--indigo)'})} Document preview</h3>
            <span className="tag">page 4 / 14</span>
          </div>
          <div style={{padding:20, background:'var(--bg-2)', minHeight:420, position:'relative'}}>
            <div style={{
              background:'#fff', border:'1px solid var(--line)', borderRadius:8,
              padding:'24px 26px', position:'relative', overflow:'hidden',
              boxShadow:'var(--sh-1)'
            }}>
              <div style={{fontFamily:'var(--f-serif)', fontSize:18}}>3.2 Invers matriks 2×2</div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', marginTop:4}}>RPP · Kelas XII · 2 × 45 menit</div>
              <div className="hr"/>
              <div style={{fontSize:12.5, lineHeight:1.6, color:'var(--ink-2)'}}>
                Diberikan matriks <span style={{fontFamily:'var(--f-mono)', background:'var(--bg-2)', padding:'1px 5px', borderRadius:3}}>A = [[a,b],[c,d]]</span>.
                Invers dari A didefinisikan sebagai matriks A⁻¹ sedemikian sehingga A · A⁻¹ = I, di mana I
                adalah matriks identitas.
              </div>
              <div className="img-slot" style={{height:90, marginTop:14}}>FIG 3.2 · matrix multiplication diagram</div>
              <div style={{fontSize:12.5, lineHeight:1.6, marginTop:14, color:'var(--ink-2)'}}>
                Rumus invers: <span style={{fontFamily:'var(--f-mono)', background:'var(--bg-2)', padding:'1px 5px', borderRadius:3}}>A⁻¹ = (1/det A) · adj(A)</span>.
                Determinan dihitung dengan ad − bc. Jika det A = 0, matriks tidak memiliki invers (singular).
              </div>

              {/* scanning highlight bands */}
              <div style={{
                position:'absolute', left:0, right:0, top:'48%', height:34,
                background:'linear-gradient(90deg, rgba(91,91,247,0), rgba(91,91,247,.18), rgba(91,91,247,0))',
                borderTop:'1px solid rgba(91,91,247,.3)', borderBottom:'1px solid rgba(91,91,247,.3)',
                pointerEvents:'none'
              }}/>
              {/* OCR boxes */}
              <div style={{position:'absolute', top:70, left:40, width:180, height:18, border:'1px dashed rgba(91,91,247,.6)', borderRadius:3, pointerEvents:'none'}}/>
              <div style={{position:'absolute', top:212, left:40, width:240, height:18, border:'1px dashed rgba(63,179,127,.6)', borderRadius:3, pointerEvents:'none'}}/>
            </div>

            {/* page strip */}
            <div style={{display:'flex', gap:6, marginTop:14, overflow:'hidden'}}>
              {Array.from({length:14}).map((_,i) => (
                <div key={i} style={{
                  width:24, height:32, background: i===3?'#fff':'var(--surface)',
                  border:'1px solid '+(i===3?'var(--indigo)':'var(--line)'),
                  borderRadius:3, fontFamily:'var(--f-mono)', fontSize:9,
                  color:i===3?'var(--indigo)':'var(--muted)', display:'grid', placeItems:'center'
                }}>{i+1}</div>
              ))}
            </div>
          </div>
        </div>

        {/* EXTRACTED CONCEPTS */}
        <div className="card span-7" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.layers2({size:14, stroke:'var(--indigo)'})} Extracted concepts</h3>
            <div style={{display:'flex', gap:6}}>
              <span className="tag tag--ok">12 detected</span>
              <span className="tag tag--warn">3 need review</span>
            </div>
          </div>
          <div style={{padding:20}}>
            <PrereqGraph/>
            <div style={{display:'flex', gap:14, marginTop:8, fontSize:11, color:'var(--muted)', justifyContent:'center'}}>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span className="node node--err" style={{width:8,height:8}}/> prerequisite gap (class avg)</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span className="node node--warn" style={{width:8,height:8}}/> under remediation</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span className="node node--ok" style={{width:8,height:8}}/> mastered</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span className="node" style={{width:8,height:8}}/> today's lesson</span>
            </div>
          </div>
        </div>

        {/* SMART ASSIGNMENT GENERATOR */}
        <div className="card span-5" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.zap({size:14, stroke:'var(--indigo)'})} Smart assignment generator</h3>
            <span className="tag tag--ind">auto</span>
          </div>
          <div style={{padding:20}}>
            <div style={{fontSize:13, color:'var(--muted)', lineHeight:1.55, marginBottom:14}}>
              Based on this material and the cohort's current mastery, TICMI recommends:
            </div>
            {[
              { tag:'warm-up · 10 min', t:'Diagnostic — negative exponents recap', n:6, d:'Closes the prerequisite for matrix entries with fractional powers.', bloom:'L2'},
              { tag:'core · 25 min', t:'Adaptive set — invers 2×2', n:8, d:'Branches: students who fail det A get a focused fork on multiplication property.', bloom:'L3'},
              { tag:'apply · 15 min', t:'Real-world — encryption with matrix', n:3, d:'Extension for the top quartile. Optional Teach-Me prompts attached.', bloom:'L4'},
            ].map((r,i) => (
              <div key={i} className="card card--quiet" style={{padding:14, marginBottom:10}}>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <span className="tag" style={{fontSize:10}}>{r.tag}</span>
                  <span className="tag tag--ind" style={{fontSize:10}}>Bloom {r.bloom}</span>
                  <span style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)', marginLeft:'auto'}}>{r.n} items</span>
                </div>
                <div style={{fontWeight:600, marginTop:8, fontSize:13.5}}>{r.t}</div>
                <div style={{color:'var(--muted)', fontSize:12.5, marginTop:6, lineHeight:1.5}}>{r.d}</div>
              </div>
            ))}
            <div style={{display:'flex', gap:8, marginTop:6}}>
              <button className="btn btn--primary" style={{flex:1}} onClick={()=>go('assign')}>Build & assign · 17 items {I.arrow({size:13})}</button>
              <button className="btn">Tweak</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Mini prerequisite graph SVG for upload page
function PrereqGraph() {
  const nodes = [
    { id:'A', x:60,  y:60,  l:'Bilangan bulat',     s:'ok'},
    { id:'B', x:60,  y:160, l:'Operasi pecahan',    s:'ok'},
    { id:'C', x:200, y:40,  l:'Persamaan linear',   s:'ok'},
    { id:'D', x:200, y:120, l:'Eksponen positif',   s:'ok'},
    { id:'E', x:200, y:200, l:'Eksponen negatif',   s:'err'},
    { id:'F', x:360, y:80,  l:'Determinan 2×2',     s:'warn'},
    { id:'G', x:360, y:170, l:'Operasi matriks',    s:'warn'},
    { id:'H', x:520, y:60,  l:'Invers 2×2',         s:'cur'},
    { id:'I', x:520, y:160, l:'Adjugate',           s:'cur'},
    { id:'J', x:680, y:110, l:'Aplikasi (kriptografi)', s:'cur'},
  ];
  const edges = [
    ['A','C'],['A','D'],['B','D'],['B','E'],['C','F'],['D','F'],['D','G'],['E','G'],
    ['F','H'],['G','H'],['G','I'],['F','I'],['H','J'],['I','J']
  ];
  const find = id => nodes.find(n=>n.id===id);
  const color = s => s==='ok'?'#3FB37F':s==='warn'?'#E5A535':s==='err'?'#E26F6F':'#5B5BF7';
  return (
    <svg viewBox="0 0 760 260" style={{width:'100%', height:'auto', display:'block'}}>
      {edges.map(([a,b],i) => {
        const A = find(a), B = find(b);
        const isErr = A.s==='err' || B.s==='err';
        return <path key={i}
          d={`M ${A.x} ${A.y} C ${(A.x+B.x)/2} ${A.y}, ${(A.x+B.x)/2} ${B.y}, ${B.x} ${B.y}`}
          className={isErr?'cmap-edge cmap-edge--err':'cmap-edge'}
        />;
      })}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="9" fill={color(n.s)} opacity="0.18"/>
          <circle cx={n.x} cy={n.y} r="5" fill={color(n.s)}/>
          {n.s==='cur' && <circle cx={n.x} cy={n.y} r="13" fill="none" stroke={color(n.s)} strokeDasharray="2 3"/>}
          <text x={n.x+12} y={n.y+4} fontFamily="var(--f-sans)" fontSize="11" fill="#14141A">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

Object.assign(window, { UploadPage, PrereqGraph });
