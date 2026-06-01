// LANDING PAGE — editorial AI EdTech hero
function Landing({ go }) {
  return (
    <div style={{background:'var(--bg)'}}>
      {/* NAV */}
      <nav style={{
        position:'sticky', top:0, zIndex:30,
        background:'rgba(247,246,242,.8)', backdropFilter:'blur(10px)',
        borderBottom:'1px solid var(--line)',
        padding:'14px 36px', display:'flex', alignItems:'center', gap:24
      }}>
        <span onClick={e=>{e.preventDefault(); go('landing');}} style={{cursor:'pointer'}}>
          <Brand/>
        </span>
        <div style={{display:'flex', gap:22, marginLeft:18, fontSize:13.5, color:'var(--muted)'}}>
          <a href="#how">How it works</a>
          <a href="#agents">Agents</a>
          <a href="#teach">Teach-Me</a>
          <a href="#analytics">Analytics</a>
          <a href="#pricing">For schools</a>
        </div>
        <div style={{marginLeft:'auto', display:'flex', gap:8, alignItems:'center'}}>
          <span className="tag tag--ind"><span className="dot"/>LIDM 2026 Finalist</span>
          <button className="btn btn--sm" onClick={()=>go('student')}>Try demo</button>
          <button className="btn btn--sm btn--primary" onClick={()=>go('teacher')}>Teacher dashboard {I.arrow({size:13})}</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero hero-grain" style={{padding:'88px 36px 56px'}}>
        <div className="hero-grid"/>
        <div style={{position:'relative', maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1.05fr .95fr', gap:48, alignItems:'center'}}>
          <div>
            <div className="eyebrow"><span className="dot"/>Multi-agent classroom · Adaptive remediation</div>
            <h1 style={{
              fontFamily:'var(--f-serif)', fontWeight:400,
              fontSize:'clamp(48px,6.2vw,88px)', lineHeight:1.02, letterSpacing:'-.02em',
              margin:'18px 0 18px'
            }}>
              The AI that learns<br/>
              <em style={{
                fontStyle:'italic',
                background:'var(--grad)', WebkitBackgroundClip:'text',
                backgroundClip:'text', color:'transparent'
              }}>through your teaching.</em>
            </h1>
            <p style={{fontSize:18, color:'var(--muted)', maxWidth:560, lineHeight:1.5, margin:0}}>
              TICMI is an adaptive multi-agent classroom platform. It detects the prerequisite
              gaps behind every wrong answer, then rebuilds understanding through Socratic
              dialogue — while the student teaches the AI.
            </p>
            <div style={{display:'flex', gap:10, marginTop:30, alignItems:'center'}}>
              <button className="btn btn--lg btn--grad" onClick={()=>go('student')}>Start learning {I.arrow({size:14})}</button>
              <button className="btn btn--lg" onClick={()=>go('teach')}>{I.play({size:14})} Try Teach-Me</button>
              <button className="btn btn--lg btn--ghost" onClick={()=>go('teacher')}>Teacher dashboard →</button>
            </div>
            <div style={{display:'flex', gap:22, marginTop:36, fontSize:12.5, color:'var(--muted)', alignItems:'center'}}>
              <span style={{display:'flex', alignItems:'center', gap:6}}>{I.check({size:14, stroke:'var(--ok)'})} 4-agent system</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}>{I.check({size:14, stroke:'var(--ok)'})} PDF & RPP intake</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}>{I.check({size:14, stroke:'var(--ok)'})} Installable PWA</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}>{I.check({size:14, stroke:'var(--ok)'})} Bahasa & English</span>
            </div>
          </div>

          {/* Hero composite */}
          <HeroComposite/>
        </div>
      </section>

      {/* MARQUEE schools */}
      <section style={{borderBottom:'1px solid var(--line)', background:'var(--bg-2)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', padding:'20px 36px', display:'flex', alignItems:'center', gap:34, flexWrap:'wrap'}}>
          <div className="eyebrow">Piloted across</div>
          {['SMA 8 Jakarta','SMK Telkom Bandung','SMA Trensains Tebuireng','MAN IC Serpong','UPI Lab School','SMA 3 Yogyakarta'].map(s => (
            <div key={s} style={{fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:20, color:'var(--ink-2)'}}>{s}</div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{padding:'72px 36px', borderBottom:'1px solid var(--line)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24}}>
          {[
            { v:'+34%', l:'Mastery gain in 6 weeks vs control class'},
            { v:'72%',  l:'Of mistakes traced to a prerequisite, not the topic'},
            { v:'18s',  l:'Average detection latency for misconception'},
            { v:'4',    l:'Coordinated agents per learner session'},
          ].map(s => (
            <div key={s.l} className="stat">
              <div className="value" style={{background:'var(--grad)', WebkitBackgroundClip:'text', color:'transparent'}}>{s.v}</div>
              <div style={{color:'var(--muted)', fontSize:13.5, marginTop:10, maxWidth:240}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{padding:'88px 36px', borderBottom:'1px solid var(--line)'}}>
        <div style={{maxWidth:1280, margin:'0 auto'}}>
          <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:36}}>
            <div>
              <div className="eyebrow"><span className="dot"/>How TICMI works</div>
              <h2 style={{fontFamily:'var(--f-serif)', fontWeight:400, fontSize:48, margin:'12px 0 0', letterSpacing:'-.01em'}}>
                Six steps from upload to <em>mastery.</em>
              </h2>
            </div>
            <div style={{maxWidth:340, color:'var(--muted)', fontSize:14}}>
              The teacher never leaves the loop. Every AI action is reviewable, traceable,
              and tied back to a specific concept node in your curriculum.
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:14}}>
            {[
              { n:'01', t:'Upload material', d:'Drop a PDF, RPP, worksheet, or photo of the whiteboard.'},
              { n:'02', t:'AI extracts concepts', d:'Topics and prerequisite chain mapped to your curriculum.'},
              { n:'03', t:'Assign adaptive set', d:'Auto-generated exercises tuned to the cohort.'},
              { n:'04', t:'Detect the gap', d:'Diagnostic agent traces every wrong answer to its root cause.'},
              { n:'05', t:'Teach-Me remediation', d:'Student teaches a confused AI tutee until it gets it.'},
              { n:'06', t:'Heatmap & coach', d:'You see the class as a misconception matrix.'},
            ].map(s => (
              <div key={s.n} className="card card--pad" style={{padding:18}}>
                <div className="eyebrow" style={{fontSize:10.5}}>{s.n}</div>
                <div style={{fontWeight:600, fontSize:14, marginTop:14}}>{s.t}</div>
                <div style={{fontSize:12.5, color:'var(--muted)', marginTop:6, lineHeight:1.5}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE BLOCKS */}
      <section id="teach" style={{padding:'88px 36px', borderBottom:'1px solid var(--line)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center'}}>
          <FeatureCardTeach/>
          <div>
            <div className="eyebrow"><span className="dot"/>Core feature</div>
            <h3 style={{fontFamily:'var(--f-serif)', fontWeight:400, fontSize:44, margin:'12px 0 16px', lineHeight:1.05}}>
              Teach-Me mode flips the desk. <em>The student is the tutor.</em>
            </h3>
            <p style={{color:'var(--muted)', fontSize:15.5, lineHeight:1.6, maxWidth:520}}>
              Our Socratic agent plays a struggling classmate. It asks honest, probing
              questions — “but why does negative become reciprocal?” — and the student
              must explain it back, step by step. We measure Bloom-level depth, not just
              correctness.
            </p>
            <div style={{marginTop:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              {[
                ['Bloom-aware', 'Tracks the cognitive depth of every explanation, not just answers.'],
                ['Concept verifier', 'Cross-checks the student\'s reasoning against the prerequisite graph.'],
                ['Confidence meter', 'Live read on mastery so the agent knows when to step back.'],
                ['Honest failure', 'The AI stays confused until the explanation actually lands.'],
              ].map(([h,b]) => (
                <div key={h} style={{borderLeft:'2px solid var(--indigo)', padding:'4px 0 4px 14px'}}>
                  <div style={{fontWeight:600, fontSize:13.5}}>{h}</div>
                  <div style={{color:'var(--muted)', fontSize:12.5, marginTop:4, lineHeight:1.5}}>{b}</div>
                </div>
              ))}
            </div>
            <button className="btn btn--grad" style={{marginTop:24}} onClick={()=>go('teach')}>Open Teach-Me workspace {I.arrow({size:13})}</button>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" style={{padding:'88px 36px', borderBottom:'1px solid var(--line)', background:'var(--bg-2)'}}>
        <div style={{maxWidth:1280, margin:'0 auto'}}>
          <div className="eyebrow"><span className="dot"/>Agent orchestration</div>
          <h3 style={{fontFamily:'var(--f-serif)', fontWeight:400, fontSize:44, margin:'12px 0 30px', maxWidth:720, lineHeight:1.05}}>
            Four agents share one classroom brain.
          </h3>
          <AgentFlowDiagram/>
        </div>
      </section>

      {/* ANALYTICS */}
      <section id="analytics" style={{padding:'88px 36px', borderBottom:'1px solid var(--line)'}}>
        <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center'}}>
          <div>
            <div className="eyebrow"><span className="dot"/>For teachers</div>
            <h3 style={{fontFamily:'var(--f-serif)', fontWeight:400, fontSize:44, margin:'12px 0 16px', lineHeight:1.05}}>
              See the entire class as <em>a misconception matrix.</em>
            </h3>
            <p style={{color:'var(--muted)', fontSize:15.5, lineHeight:1.6, maxWidth:520}}>
              The heatmap pivots students against competencies. Red cells aren't grades —
              they're the exact prerequisite gap to address next class. Click any cell to
              see the diagnostic chain.
            </p>
            <button className="btn btn--primary" style={{marginTop:22}} onClick={()=>go('heatmap')}>Open analytics {I.arrow({size:13})}</button>
          </div>
          <FeatureCardHeatmap/>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'96px 36px', background:'var(--ink)', color:'#fff', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:.5,
          background:'radial-gradient(circle at 20% 30%, rgba(91,91,247,.5), transparent 40%), radial-gradient(circle at 80% 60%, rgba(138,79,255,.4), transparent 45%)'}}/>
        <div style={{maxWidth:1100, margin:'0 auto', position:'relative', textAlign:'center'}}>
          <div className="eyebrow" style={{color:'rgba(255,255,255,.6)'}}><span className="dot" style={{background:'#fff', boxShadow:'0 0 0 4px rgba(255,255,255,.15)'}}/>Available now in private beta</div>
          <h3 style={{fontFamily:'var(--f-serif)', fontWeight:400, fontSize:64, lineHeight:1.05, margin:'18px 0 22px', letterSpacing:'-.01em'}}>
            Bring TICMI to <em style={{
              background:'linear-gradient(135deg,#A6A6FF,#D5BFFF)',
              WebkitBackgroundClip:'text', color:'transparent'
            }}>your classroom.</em>
          </h3>
          <p style={{color:'rgba(255,255,255,.65)', fontSize:17, maxWidth:620, margin:'0 auto'}}>
            Twelve weeks. One cohort. Real prerequisite mastery, measured every Friday.
          </p>
          <div style={{display:'flex', gap:10, justifyContent:'center', marginTop:32}}>
            <button className="btn btn--lg btn--grad" onClick={()=>go('teacher')}>Open the dashboard {I.arrow({size:14})}</button>
            <button className="btn btn--lg" style={{background:'transparent', color:'#fff', borderColor:'rgba(255,255,255,.2)'}} onClick={()=>go('mobile')}>Install the PWA</button>
          </div>
        </div>
      </section>

      <footer style={{padding:'36px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12.5, color:'var(--muted)'}}>
        <div style={{display:'flex', gap:14, alignItems:'center'}}>
          <div className="brand-mark" style={{width:18, height:18}}/>
          <span style={{fontFamily:'var(--f-mono)', letterSpacing:'.1em'}}>TICMI · MULTI-AGENT CLASSROOM</span>
        </div>
        <div style={{display:'flex', gap:18}}>
          <span>Made for LIDM 2026</span>
          <span>Privacy · Educational data</span>
          <span>id · en</span>
        </div>
      </footer>
    </div>
  );
}

// ----- Hero composite (right-side visual) -----
function HeroComposite() {
  return (
    <div style={{position:'relative', minHeight:520}}>
      {/* main card: chat preview */}
      <div className="card" style={{
        position:'relative', borderRadius:20, overflow:'hidden',
        boxShadow:'var(--sh-3)'
      }}>
        <div style={{
          padding:'14px 18px', borderBottom:'1px solid var(--line-2)',
          display:'flex', alignItems:'center', gap:10
        }}>
          <span className="node" style={{width:10, height:10}}/>
          <div style={{fontFamily:'var(--f-mono)', fontSize:11.5, letterSpacing:'.06em', color:'var(--muted)'}}>TEACH-ME · matriks · Devin, 16</div>
          <span className="tag tag--ind" style={{marginLeft:'auto'}}>Socratic Agent</span>
        </div>
        <div style={{padding:'22px', display:'flex', flexDirection:'column', gap:14}}>
          <div style={{display:'flex', gap:10, alignItems:'flex-start'}}>
            <div className="avatar avatar--slate" style={{width:28, height:28, fontSize:11}}>AI</div>
            <div style={{background:'var(--bg-2)', borderRadius:12, padding:'10px 14px', fontSize:13.5, maxWidth:380, border:'1px solid var(--line)'}}>
              I'm still confused… why does a negative exponent become a <i>reciprocal?</i><br/>
              Can you teach me step by step?
            </div>
          </div>
          <div style={{display:'flex', gap:10, alignItems:'flex-start', justifyContent:'flex-end'}}>
            <div style={{background:'var(--ink)', color:'#fff', borderRadius:12, padding:'10px 14px', fontSize:13.5, maxWidth:380}}>
              Because <span style={{fontFamily:'var(--f-mono)'}}>a⁻ⁿ = 1/aⁿ</span>. We're really just dividing by a, n times.
            </div>
            <div className="avatar" style={{width:28, height:28, fontSize:11, background:'linear-gradient(135deg,#3FB37F,#1F9E6A)'}}>DA</div>
          </div>
          <div style={{display:'flex', gap:10, alignItems:'flex-start'}}>
            <div className="avatar avatar--slate" style={{width:28, height:28, fontSize:11}}>AI</div>
            <div style={{background:'var(--bg-2)', borderRadius:12, padding:'10px 14px', fontSize:13.5, maxWidth:380, border:'1px solid var(--line)'}}>
              Oh! So <span style={{fontFamily:'var(--f-mono)'}}>2⁻³</span> means I divide 1 by 2 three times → <b>1/8</b>?
              <div className="caret" style={{display:'inline-block'}}/>
            </div>
          </div>
          <div className="card card--quiet" style={{padding:14, marginTop:6}}>
            <div className="eyebrow" style={{fontSize:10}}>Concept verifier · live</div>
            <div style={{display:'flex', gap:8, marginTop:10, flexWrap:'wrap'}}>
              <span className="tag tag--ok"><span className="dot"/>Reciprocal idea ✓</span>
              <span className="tag tag--ok"><span className="dot"/>Inverse operation ✓</span>
              <span className="tag tag--warn"><span className="dot"/>Generalize n ↻</span>
              <span className="tag tag--err"><span className="dot"/>Zero exponent ✕</span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginTop:14}}>
              <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)'}}>MASTERY</div>
              <div className="bar" style={{flex:1}}><i style={{width:'62%'}}/></div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:11.5}}>62%</div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div className="card" style={{
        position:'absolute', top:-22, right:-22, padding:'10px 14px',
        background:'#fff', display:'flex', alignItems:'center', gap:10,
        animation:'float-y 5s ease-in-out infinite'
      }}>
        {I.brain({size:16, stroke:'var(--indigo)'})}
        <div>
          <div style={{fontSize:11, color:'var(--muted)', fontFamily:'var(--f-mono)'}}>DIAGNOSTIC</div>
          <div style={{fontSize:12.5, fontWeight:500}}>Gap detected: negative exponent</div>
        </div>
      </div>
      <div className="card" style={{
        position:'absolute', bottom:-18, left:-24, padding:'10px 14px',
        background:'#fff', display:'flex', alignItems:'center', gap:10,
        animation:'float-y 6s ease-in-out infinite'
      }}>
        <div className="node node--ok"/>
        <div>
          <div style={{fontSize:11, color:'var(--muted)', fontFamily:'var(--f-mono)'}}>KNOWLEDGE TRACKER</div>
          <div style={{fontSize:12.5, fontWeight:500}}>Mastery curve updated · +12%</div>
        </div>
      </div>
    </div>
  );
}

// ----- small feature visuals -----
function FeatureCardTeach() {
  return (
    <div className="card paper-grid" style={{borderRadius:20, padding:24, position:'relative', overflow:'hidden'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="eyebrow"><span className="dot"/>Live session · 02:14</div>
        <span className="tag tag--ind">Bloom L3 · Apply</span>
      </div>
      <div style={{fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:28, lineHeight:1.2, margin:'22px 0', maxWidth:420}}>
        "Wait — explain why dividing both sides keeps the equation true?"
      </div>
      <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:18}}>
        {['equality property','inverse operation','linear eqn','one-step','two-step'].map(t => (
          <span key={t} className="tag" style={{background:'var(--bg-2)'}}>{t}</span>
        ))}
      </div>
      <div className="card card--quiet" style={{padding:14}}>
        <div className="eyebrow" style={{fontSize:10}}>Understanding</div>
        <div style={{display:'flex', alignItems:'flex-end', gap:6, height:60, marginTop:10}}>
          {[20,35,28,46,52,58,67,74,82,79].map((h,i) => (
            <div key={i} style={{flex:1, background:'var(--grad)', borderRadius:'4px 4px 0 0', height:`${h}%`, opacity:.4 + i*.06}}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCardHeatmap() {
  const rows = ['Anisa','Bayu','Citra','Devin','Eka','Farid','Galuh','Hesti'];
  const cols = ['Exp','Polynom','SPL','Matrix','Vec','Trig'];
  const grid = [
    [3,3,2,1,1,0],
    [3,2,2,2,1,1],
    [2,2,1,1,0,0],
    [3,3,3,2,2,1],
    [2,1,1,0,0,0],
    [3,3,2,1,1,1],
    [3,2,1,1,0,0],
    [2,2,2,1,1,0],
  ];
  const palette = ['#E4F4EC','#FBF1DC','#FBE5E5','#F4C8C8']; // 0 ok, 1 warn, 2 err, 3 severe
  return (
    <div className="card" style={{padding:22, borderRadius:20}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div className="eyebrow"><span className="dot"/>Class XII-IPA-1 · 32 students</div>
          <div style={{fontWeight:600, marginTop:6}}>Misconception heatmap</div>
        </div>
        <span className="tag tag--err">3 bottlenecks</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:`90px repeat(${cols.length},1fr)`, gap:4, marginTop:18}}>
        <div/>
        {cols.map(c => <div key={c} style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.06em', textAlign:'center', textTransform:'uppercase'}}>{c}</div>)}
        {rows.map((r,ri) => (
          <React.Fragment key={r}>
            <div style={{fontSize:12, color:'var(--ink-2)', display:'flex', alignItems:'center'}}>{r}</div>
            {grid[ri].map((v,ci) => (
              <div key={ci} className="hm-cell" style={{background: palette[v]}}/>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div style={{display:'flex', alignItems:'center', gap:14, marginTop:18, fontSize:11, color:'var(--muted)'}}>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#E4F4EC', borderRadius:3}}/> mastered</span>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#FBF1DC', borderRadius:3}}/> unstable</span>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#FBE5E5', borderRadius:3}}/> misconception</span>
        <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#F4C8C8', borderRadius:3}}/> severe</span>
      </div>
    </div>
  );
}

Object.assign(window, { Landing, HeroComposite, FeatureCardTeach, FeatureCardHeatmap });
