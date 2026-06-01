// STUDENT DASHBOARD
function StudentDashboard({ go }) {
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Tuesday · day 18 streak 🔥</div>
          <h1 className="page-title">Halo, <em>Devin.</em></h1>
          <div className="page-sub">You're <b style={{color:'var(--ink)'}}>one prerequisite away</b> from unlocking the matrix lesson. Kiko is waiting.</div>
        </div>
        <div style={{display:'flex', gap:10}}>
          <div className="card" style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10}}>
            {I.flame({size:18, stroke:'var(--warn)'})}
            <div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)'}}>STREAK</div>
              <div style={{fontWeight:600, fontSize:14}}>18 days</div>
            </div>
          </div>
          <div className="card" style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10}}>
            {I.bolt({size:18, stroke:'var(--indigo)'})}
            <div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)'}}>XP</div>
              <div style={{fontWeight:600, fontSize:14}}>2,148</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero: continue learning */}
      <div className="card" style={{padding:0, marginBottom:22, overflow:'hidden'}}>
        <div style={{
          padding:'28px 28px 24px',
          background:'linear-gradient(120deg, rgba(91,91,247,.10), rgba(138,79,255,.05) 60%, transparent)',
          display:'grid', gridTemplateColumns:'1fr 280px', gap:24, alignItems:'center'
        }}>
          <div>
            <div className="eyebrow"><span className="dot"/>Pick up where you left off</div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:34, marginTop:8, letterSpacing:'-.005em', lineHeight:1.1}}>
              Teach Kiko about <em>negative exponents.</em>
            </div>
            <div style={{color:'var(--muted)', fontSize:14, marginTop:8, maxWidth:520, lineHeight:1.5}}>
              You stopped mid-thought after the reciprocal rule. Kiko still doesn't get the zero-exponent edge case — see if you can explain it.
            </div>
            <div style={{display:'flex', gap:10, marginTop:18}}>
              <button className="btn btn--lg btn--grad" onClick={()=>go('teach')}>Continue Teach-Me {I.arrow({size:14})}</button>
              <button className="btn btn--lg" onClick={()=>go('concept')}>See concept map</button>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <CognitiveDial value={62}/>
          </div>
        </div>
      </div>

      {/* Today + classes */}
      <div className="grid-12">
        <div className="card span-8" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.target({size:14, stroke:'var(--indigo)'})} Today's missions</h3>
            <span className="tag">3 of 5 done</span>
          </div>
          <div style={{padding:'10px 0'}}>
            {[
              { d:true,  t:'Review eksponen positif', x:'+40 XP · 5 min', bloom:'L1'},
              { d:true,  t:'Quiz: matriks 2×2', x:'+120 XP · 12 min', bloom:'L2'},
              { d:true,  t:'Watch: invers matriks (video)', x:'+30 XP · 4 min', bloom:'L1'},
              { d:false, t:'Teach Kiko: negative exponents', x:'+180 XP · ongoing', bloom:'L3', cta:true},
              { d:false, t:'Apply: 3 word problems', x:'+90 XP · 8 min', bloom:'L3'},
            ].map((r,i) => (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'28px 1fr auto', gap:14,
                padding:'12px 20px', borderBottom:'1px solid var(--line-2)', alignItems:'center'
              }}>
                <span style={{
                  width:22, height:22, borderRadius:999, display:'grid', placeItems:'center',
                  background: r.d ? 'var(--ok-bg)' : 'var(--bg-2)',
                  border:'1px solid '+(r.d?'transparent':'var(--line)')
                }}>
                  {r.d
                    ? I.check({size:12, stroke:'var(--ok)'})
                    : r.cta ? I.zap({size:12, stroke:'var(--indigo)'})
                    : <span style={{width:6, height:6, borderRadius:999, background:'var(--muted-2)'}}/>}
                </span>
                <div>
                  <div style={{fontWeight: r.d?400:500, fontSize:13.5, color: r.d?'var(--muted)':'var(--ink)', textDecoration: r.d?'line-through':'none'}}>{r.t}</div>
                  <div style={{fontSize:11.5, color:'var(--muted)', marginTop:3}}>
                    <span className="tag" style={{fontSize:10, marginRight:6}}>Bloom {r.bloom}</span>
                    {r.x}
                  </div>
                </div>
                {r.cta && !r.d ? <button className="btn btn--sm btn--primary" onClick={()=>go('teach')}>Start →</button>
                  : !r.d ? <button className="btn btn--sm">Start</button> : <span style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--ok)'}}>+done</span>}
              </div>
            ))}
          </div>
        </div>

        {/* concept mastery */}
        <div className="card span-4" style={{padding:20}}>
          <div className="eyebrow"><span className="dot"/>Concept mastery</div>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:14}}>
            {[
              { l:'Pecahan dasar',     v:96, s:'ok'},
              { l:'Eksponen positif',  v:91, s:'ok'},
              { l:'Operasi pecahan',   v:88, s:'ok'},
              { l:'Persamaan linear',  v:82, s:'ok'},
              { l:'Eksponen negatif',  v:62, s:'cur'},
              { l:'Determinan 2×2',    v:34, s:'warn'},
              { l:'Invers 2×2',        v:18, s:'pending'},
              { l:'Kriptografi matriks', v:0, s:'locked'},
            ].map(r => (
              <div key={r.l}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
                  <span>{r.l} {r.s==='locked' && <span style={{color:'var(--muted-2)', fontSize:10}}>· locked</span>}</span>
                  <span style={{fontFamily:'var(--f-mono)', color: r.s==='cur'?'var(--indigo)': r.s==='warn'?'var(--warn)':'var(--muted)'}}>{r.v}%</span>
                </div>
                <div className="bar" style={{marginTop:5}}>
                  <i style={{
                    width:`${r.v}%`,
                    background: r.s==='ok'?'var(--ok)': r.s==='cur'?'var(--grad)': r.s==='warn'?'var(--warn)':'var(--line)'
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* classes joined */}
        <div className="card span-6" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.layers({size:14, stroke:'var(--indigo)'})} My classes</h3>
            <button className="btn btn--sm btn--ghost">{I.plus({size:12})} Join</button>
          </div>
          <div style={{padding:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {[
              { n:'XII IPA 1 · Matematika', t:'Bu Rini', n2:32, hue:'linear-gradient(135deg,#5B5BF7,#8A4FFF)'},
              { n:'XII IPA 1 · Fisika', t:'Pak Yono', n2:32, hue:'linear-gradient(135deg,#1F9E6A,#2DBF82)'},
              { n:'Bimbel UTBK · Matematika', t:'Bu Indah', n2:18, hue:'linear-gradient(135deg,#FF7A45,#E45A3A)'},
              { n:'OSN Math · Tim Inti', t:'Pak Hasan', n2:12, hue:'linear-gradient(135deg,#C98A17,#E5A535)'},
            ].map((c,i) => (
              <div key={i} className="card card--quiet" style={{padding:0, overflow:'hidden'}}>
                <div style={{height:48, background:c.hue}}/>
                <div style={{padding:'12px 14px'}}>
                  <div style={{fontWeight:600, fontSize:13}}>{c.n}</div>
                  <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4}}>{c.t} · {c.n2} students</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI recommendation card */}
        <div className="card span-6" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.brain({size:14, stroke:'var(--indigo)'})} AI for you</h3>
            <span className="tag tag--ind">personalized</span>
          </div>
          <div style={{padding:20, display:'flex', flexDirection:'column', gap:12}}>
            <div className="card card--quiet" style={{padding:14}}>
              <div className="eyebrow" style={{fontSize:10}}>Why you got #4 wrong</div>
              <div style={{fontSize:13, marginTop:8, lineHeight:1.55}}>
                The diagnostic agent thinks it wasn't the matrix step — it was the negative exponent inside the fraction. Want to fix that first?
              </div>
              <div style={{display:'flex', gap:8, marginTop:10}}>
                <button className="btn btn--sm btn--primary" onClick={()=>go('teach')}>Fix it · 8 min</button>
                <button className="btn btn--sm btn--ghost">Why?</button>
              </div>
            </div>
            <div className="card card--quiet" style={{padding:14}}>
              <div className="eyebrow" style={{fontSize:10}}>Pair-teach suggestion</div>
              <div style={{fontSize:13, marginTop:8, lineHeight:1.55}}>
                Hesti just mastered <b>invers 2×2</b>. You're one step away — try a 10-min pair-teach.
              </div>
              <div style={{display:'flex', gap:8, marginTop:10}}>
                <button className="btn btn--sm">Invite Hesti</button>
                <button className="btn btn--sm btn--ghost">Maybe later</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { StudentDashboard });
