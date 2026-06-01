// ASSIGNMENT — teacher builder + student solver
function AssignmentPage({ go, role }) {
  const [tab, setTab] = React.useState(role === 'student' ? 'solve' : 'build');
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Assignments</div>
          <h1 className="page-title">{tab==='build' ? <>Build an <em>adaptive set.</em></> : <>Solve · <em>matriks invers</em></>}</h1>
          <div className="page-sub">{tab==='build' ? 'Pick the concepts. The AI shapes the difficulty curve and branches for each student.' : 'Six items. Two have prerequisite traps — TICMI is watching for the gap, not just the answer.'}</div>
        </div>
        <div className="tabs">
          <button className={"tab" + (tab==='build'?' is-active':'')} onClick={()=>setTab('build')}>Teacher · build</button>
          <button className={"tab" + (tab==='solve'?' is-active':'')} onClick={()=>setTab('solve')}>Student · solve</button>
        </div>
      </div>

      {tab==='build' ? <BuilderView go={go}/> : <SolverView go={go}/>}
    </>
  );
}

function BuilderView({ go }) {
  return (
    <div className="grid-12">
      <div className="card span-8" style={{padding:0}}>
        <div className="card-head">
          <h3>{I.book({size:14, stroke:'var(--indigo)'})} Assignment composer</h3>
          <span className="tag tag--ind">AI assist</span>
        </div>
        <div style={{padding:22}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:18}}>
            <Field label="Title" v="Matriks invers 2×2 — adaptive set"/>
            <Field label="Class" v="XII IPA 1 · 32 students"/>
            <Field label="Due"   v="Friday 29 May · 23:59"/>
            <Field label="Time limit" v="40 minutes · pauses allowed"/>
          </div>

          <div className="eyebrow" style={{fontSize:10, marginBottom:8}}>Target concepts</div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:18}}>
            {['Determinan 2×2','Invers 2×2','Adjugate','Eksponen negatif (pre)','Operasi pecahan (pre)','+ add'].map((t,i) => (
              <span key={t} className={i<3?'tag tag--ind':i<5?'tag':'tag'} style={{padding:'5px 12px', fontSize:12}}>
                {i===5 && I.plus({size:11})} {t}
              </span>
            ))}
          </div>

          <div className="eyebrow" style={{fontSize:10, marginBottom:8}}>Difficulty curve</div>
          <DifficultyCurve/>

          <div className="eyebrow" style={{fontSize:10, marginTop:18, marginBottom:8}}>Adaptive settings</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            <Toggle l="Branch on diagnostic gap" d="If a wrong answer maps to a prerequisite, switch the next item to that gap." on/>
            <Toggle l="Auto-Teach-Me on misconception" d="Open a Socratic remediation in-place when the same gap fires twice." on/>
            <Toggle l="Confidence rating per item"     d="Student must rate certainty 1–5 before submitting." on/>
            <Toggle l="AI hint system"                 d="Up to 3 graduated hints. Costs no points but is tracked."/>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card span-4" style={{padding:0}}>
        <div className="card-head">
          <h3>{I.spark({size:14, stroke:'var(--indigo)'})} Generated items · 8</h3>
          <button className="btn btn--sm btn--ghost">Regenerate</button>
        </div>
        <div style={{padding:'10px 0'}}>
          {[
            { n:1, b:'L1', t:'Hitung determinan A=[[3,2],[1,4]]', tag:'warmup'},
            { n:2, b:'L1', t:'Tentukan A jika det A = ad−bc dengan a=5,b=−2,c=1,d=3.', tag:'compute'},
            { n:3, b:'L2', t:'Cari invers B=[[2,1],[3,4]]. Beri alasan langkah.', tag:'core'},
            { n:4, b:'L2', t:'Mengapa matriks singular tidak punya invers? Jelaskan.', tag:'explain'},
            { n:5, b:'L3', t:'Aplikasi: pakai matriks invers untuk dekripsi kode pesan.', tag:'apply', branch:true},
            { n:6, b:'L3', t:'Tunjukkan A·A⁻¹ = I untuk pilihanmu sendiri.', tag:'apply'},
            { n:7, b:'L4', t:'Sebuah matriks 2×2 punya entri (1/2⁻¹). Hitung determinannya.', tag:'trap', trap:true},
            { n:8, b:'L4', t:'Buktikan invers dari matriks invers adalah matriks asli.', tag:'analyze'},
          ].map(r => (
            <div key={r.n} style={{padding:'12px 20px', borderBottom:'1px solid var(--line-2)'}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)', width:18}}>{String(r.n).padStart(2,'0')}</span>
                <span className="tag tag--ind" style={{fontSize:10}}>{r.b}</span>
                <span className="tag" style={{fontSize:10}}>{r.tag}</span>
                {r.trap && <span className="tag tag--err" style={{fontSize:10, marginLeft:'auto'}}>prereq trap</span>}
                {r.branch && <span className="tag tag--warn" style={{fontSize:10, marginLeft:'auto'}}>branch</span>}
              </div>
              <div style={{fontSize:12.5, marginTop:6, color:'var(--ink-2)', lineHeight:1.5}}>{r.t}</div>
            </div>
          ))}
        </div>
        <div style={{padding:18, borderTop:'1px solid var(--line)'}}>
          <button className="btn btn--grad" style={{width:'100%'}}>Assign to XII IPA 1 {I.arrow({size:13})}</button>
        </div>
      </div>
    </div>
  );
}

function SolverView({ go }) {
  const [conf, setConf] = React.useState(70);
  const [hints, setHints] = React.useState(0);
  return (
    <div className="grid-12">
      <div className="card span-8" style={{padding:0}}>
        <div style={{padding:'14px 22px', borderBottom:'1px solid var(--line-2)', display:'flex', alignItems:'center', gap:14}}>
          <div style={{fontFamily:'var(--f-mono)', fontSize:11, letterSpacing:'.08em', color:'var(--muted)'}}>QUESTION 4 OF 6</div>
          <div className="bar" style={{flex:1, height:4}}><i style={{width:'66%'}}/></div>
          <div style={{display:'flex', alignItems:'center', gap:6, fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)'}}>
            {I.clock({size:12})} 24:18
          </div>
        </div>
        <div style={{padding:'26px 32px'}}>
          <div className="eyebrow"><span className="dot"/>Apply · Bloom L3 · matriks invers</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:28, lineHeight:1.25, margin:'14px 0 18px', letterSpacing:'-.005em'}}>
            Diberikan matriks <span style={{fontFamily:'var(--f-mono)', fontSize:24, background:'var(--bg-2)', padding:'2px 8px', borderRadius:4}}>A = [[2, 1/2⁻¹], [3, 4]]</span>.
            Hitung determinan A, lalu invers A.
          </div>
          <div style={{color:'var(--muted)', fontSize:13, lineHeight:1.5, marginBottom:18}}>
            Tunjukkan langkahmu. Jawaban akhir cukup tiga angka penting.
          </div>

          <div className="card paper-grid" style={{padding:'18px 20px', minHeight:200}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)', marginBottom:10}}>Your work · auto-saved</div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:18, color:'var(--ink-2)', lineHeight:1.7}}>
              Step 1 · simplify 1/2⁻¹ = ?
              <div style={{height:18}}/>
              Step 2 · det A = (2)(4) − (1/2⁻¹)(3) = ?
              <div className="caret" style={{display:'inline-block'}}/>
            </div>
          </div>

          {/* answer + confidence */}
          <div style={{marginTop:18, display:'grid', gridTemplateColumns:'1fr 280px', gap:18}}>
            <div>
              <div className="eyebrow" style={{fontSize:10, marginBottom:6}}>Final answer</div>
              <input placeholder="det A = … · A⁻¹ = [[…,…],[…,…]]" style={{
                width:'100%', padding:'12px 14px', border:'1px solid var(--line)', borderRadius:10,
                fontFamily:'var(--f-mono)', fontSize:14, background:'#fff'
              }}/>
            </div>
            <div>
              <div className="eyebrow" style={{fontSize:10, marginBottom:6}}>Confidence · {conf}%</div>
              <input type="range" min="0" max="100" value={conf} onChange={e=>setConf(+e.target.value)} style={{width:'100%'}}/>
              <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)'}}>
                <span>guess</span><span>sure</span>
              </div>
            </div>
          </div>

          <div style={{display:'flex', gap:8, marginTop:22, alignItems:'center'}}>
            <button className="btn">Previous</button>
            <button className="btn btn--ghost" onClick={()=>setHints(h => Math.min(3, h+1))}>{I.spark({size:12, stroke:'var(--warn)'})} Hint ({hints}/3)</button>
            <div style={{marginLeft:'auto', display:'flex', gap:8}}>
              <button className="btn">Save draft</button>
              <button className="btn btn--grad">Submit & next {I.arrow({size:13})}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Side */}
      <div className="col span-4">
        {hints > 0 && (
          <div className="card" style={{padding:18, borderColor:'rgba(201,138,23,.4)', background:'rgba(251,241,220,.4)'}}>
            <div className="eyebrow" style={{fontSize:10}}>Hint {hints} of 3</div>
            <div style={{fontSize:13, marginTop:8, lineHeight:1.55}}>
              {hints===1 && 'Look at the entry 1/2⁻¹ first. A negative exponent in the denominator… what does that flip to?'}
              {hints===2 && '1/2⁻¹ = 1/(1/2) = 2. So the (1,2) entry is just 2. Now apply ad − bc.'}
              {hints===3 && 'det A = (2)(4) − (2)(3) = 2. A⁻¹ = (1/2)·[[4,−2],[−3,2]] = [[2,−1],[−1.5,1]].'}
            </div>
          </div>
        )}

        <div className="card" style={{padding:18}}>
          <div className="eyebrow"><span className="dot"/>What TICMI is watching</div>
          <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:12}}>
            {[
              { l:'Simplify 1/2⁻¹', s:'pending'},
              { l:'Det A computation', s:'pending'},
              { l:'Apply 1/det · adj', s:'pending'},
              { l:'Sign of adj entries', s:'pending'},
            ].map(r => (
              <div key={r.l} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:10}}>
                <span style={{width:8, height:8, borderRadius:999, background:'var(--muted-2)'}}/>
                <span style={{fontSize:12.5, flex:1}}>{r.l}</span>
                <span style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)'}}>WATCHING</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:11.5, color:'var(--muted)', marginTop:12, lineHeight:1.5}}>
            If you stumble on step 1, you'll be routed to a 5-minute negative-exponent Teach-Me — not a deduction.
          </div>
        </div>

        <div className="card card--quiet" style={{padding:14}}>
          <div className="eyebrow" style={{fontSize:10}}>Map · question 4 sits on…</div>
          <div style={{display:'flex', gap:6, marginTop:10, flexWrap:'wrap'}}>
            <span className="tag tag--err"><span className="dot"/>Eksponen negatif (gap)</span>
            <span className="tag">Determinan</span>
            <span className="tag">Invers</span>
            <span className="tag">Adjugate</span>
          </div>
          <button className="btn btn--sm" style={{marginTop:12, width:'100%'}} onClick={()=>go('concept')}>Open concept map →</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, v }) {
  return (
    <div>
      <div className="eyebrow" style={{fontSize:10, marginBottom:6}}>{label}</div>
      <div style={{padding:'10px 14px', border:'1px solid var(--line)', borderRadius:10, background:'var(--bg-2)', fontSize:13.5}}>{v}</div>
    </div>
  );
}

function Toggle({ l, d, on }) {
  const [v, setV] = React.useState(!!on);
  return (
    <div style={{padding:'14px 16px', border:'1px solid var(--line)', borderRadius:12, background:'#fff', display:'flex', gap:14, alignItems:'flex-start'}}>
      <div style={{flex:1}}>
        <div style={{fontWeight:500, fontSize:13.5}}>{l}</div>
        <div style={{color:'var(--muted)', fontSize:12.5, marginTop:4, lineHeight:1.5}}>{d}</div>
      </div>
      <button onClick={()=>setV(!v)} style={{
        width:34, height:20, borderRadius:999, padding:0,
        background: v ? 'var(--grad)' : 'var(--line)',
        border:0, position:'relative', cursor:'pointer'
      }}>
        <span style={{
          position:'absolute', top:2, left: v ? 16 : 2, width:16, height:16, borderRadius:999, background:'#fff',
          transition:'left .15s', boxShadow:'0 1px 3px rgba(0,0,0,.2)'
        }}/>
      </button>
    </div>
  );
}

function DifficultyCurve() {
  const data = [1,1,2,2,3,3,4,4];
  return (
    <div className="card card--quiet" style={{padding:14}}>
      <svg viewBox="0 0 600 100" style={{width:'100%', height:80, display:'block'}}>
        <defs>
          <linearGradient id="dcg" x1="0" x2="1"><stop offset="0" stopColor="#5B5BF7"/><stop offset="1" stopColor="#8A4FFF"/></linearGradient>
        </defs>
        <path d={data.map((v,i)=>`${i?'L':'M'} ${30 + i*75} ${85 - v*18}`).join(' ')} stroke="url(#dcg)" strokeWidth="2.4" fill="none"/>
        {data.map((v,i) => (
          <g key={i}>
            <circle cx={30 + i*75} cy={85 - v*18} r="5" fill="#fff" stroke="#5B5BF7" strokeWidth="2"/>
            <text x={30 + i*75} y={98} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="9" fill="rgba(20,20,26,.4)">Q{i+1}</text>
          </g>
        ))}
        <text x="585" y="20" textAnchor="end" fontFamily="var(--f-mono)" fontSize="9" fill="rgba(20,20,26,.4)">BLOOM</text>
        <text x="585" y="86" textAnchor="end" fontFamily="var(--f-mono)" fontSize="9" fill="rgba(20,20,26,.4)">L1</text>
        <text x="585" y="32" textAnchor="end" fontFamily="var(--f-mono)" fontSize="9" fill="rgba(20,20,26,.4)">L4</text>
      </svg>
    </div>
  );
}

Object.assign(window, { AssignmentPage, BuilderView, SolverView, DifficultyCurve, Field, Toggle });
