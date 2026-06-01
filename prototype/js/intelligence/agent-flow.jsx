// Agent orchestration diagram — used on landing and AI Agents page

function AgentFlowDiagram() {
  const agents = [
    {
      id:'diag', name:'Diagnostic Agent', role:'Detects gaps',
      desc:'Traces every wrong answer to the upstream prerequisite that broke. Reads exercise responses + free-text reasoning.',
      x: 60,  y: 80,  ico:'spark', tint:'var(--indigo)'
    },
    {
      id:'route', name:'Routing Agent', role:'Plans remediation',
      desc:'Decides what to teach next, in what order, and which Bloom level. Talks to the curriculum graph.',
      x: 320, y: 80,  ico:'flow', tint:'var(--violet)'
    },
    {
      id:'socr', name:'Socratic Agent', role:'Teaches via dialogue',
      desc:'Plays the confused student. Asks honest follow-ups, never volunteers the answer. Probes for explanation depth.',
      x: 580, y: 80,  ico:'brain', tint:'#3FB37F'
    },
    {
      id:'know', name:'Knowledge Tracker', role:'Updates mastery',
      desc:'Bayesian belief over every concept node. Pushes mastery deltas back into the heatmap and learning graph.',
      x: 840, y: 80,  ico:'graph', tint:'#C98A17'
    },
  ];

  return (
    <div className="card" style={{padding:30, borderRadius:20, overflow:'hidden', position:'relative'}}>
      <svg viewBox="0 0 1040 360" style={{width:'100%', height:'auto', display:'block'}}>
        {/* grid */}
        <defs>
          <pattern id="agp" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(20,20,26,.04)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="aged" x1="0" x2="1">
            <stop offset="0" stopColor="#5B5BF7"/>
            <stop offset="1" stopColor="#8A4FFF"/>
          </linearGradient>
          <linearGradient id="ageg" x1="0" x2="1">
            <stop offset="0" stopColor="#8A4FFF"/>
            <stop offset="1" stopColor="#3FB37F"/>
          </linearGradient>
          <linearGradient id="ageb" x1="0" x2="1">
            <stop offset="0" stopColor="#3FB37F"/>
            <stop offset="1" stopColor="#C98A17"/>
          </linearGradient>
        </defs>
        <rect width="1040" height="360" fill="url(#agp)"/>

        {/* central student node */}
        <g>
          <circle cx="520" cy="270" r="34" fill="#14141A"/>
          <circle cx="520" cy="270" r="50" fill="none" stroke="rgba(20,20,26,.12)" strokeDasharray="4 6"/>
          <text x="520" y="275" textAnchor="middle" fill="#fff" fontFamily="var(--f-mono)" fontSize="11" fontWeight="600">STUDENT</text>
        </g>

        {/* curved edges between agents */}
        <path d="M 160 130 C 220 130, 260 130, 320 130" stroke="url(#aged)" strokeWidth="1.6" fill="none" markerEnd="url(#arrh)" strokeDasharray="200" style={{animation:'dash 6s linear infinite'}}/>
        <path d="M 420 130 C 480 130, 520 130, 580 130" stroke="url(#ageg)" strokeWidth="1.6" fill="none" markerEnd="url(#arrh)" strokeDasharray="200" style={{animation:'dash 6s linear infinite'}}/>
        <path d="M 680 130 C 740 130, 780 130, 840 130" stroke="url(#ageb)" strokeWidth="1.6" fill="none" markerEnd="url(#arrh)" strokeDasharray="200" style={{animation:'dash 6s linear infinite'}}/>

        {/* loops back to student */}
        <path d="M 110 165 C 180 240, 380 280, 500 280" stroke="rgba(91,91,247,.35)" strokeWidth="1.2" strokeDasharray="3 4" fill="none"/>
        <path d="M 370 165 C 380 240, 460 280, 510 275" stroke="rgba(138,79,255,.35)" strokeWidth="1.2" strokeDasharray="3 4" fill="none"/>
        <path d="M 630 165 C 600 230, 560 270, 535 270" stroke="rgba(63,179,127,.4)" strokeWidth="1.2" strokeDasharray="3 4" fill="none"/>
        <path d="M 890 165 C 800 240, 620 285, 545 275" stroke="rgba(201,138,23,.35)" strokeWidth="1.2" strokeDasharray="3 4" fill="none"/>

        <defs>
          <marker id="arrh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(20,20,26,.55)"/>
          </marker>
        </defs>

        {/* agent cards */}
        {agents.map(a => (
          <g key={a.id} transform={`translate(${a.x},${a.y})`}>
            <rect x="0" y="0" width="160" height="100" rx="14" fill="#fff" stroke="rgba(20,20,26,.08)"/>
            <circle cx="22" cy="22" r="14" fill={a.tint} opacity=".12"/>
            <circle cx="22" cy="22" r="5" fill={a.tint}/>
            <text x="46" y="20" fontFamily="var(--f-mono)" fontSize="10" fill="rgba(20,20,26,.55)" letterSpacing="1.2">{a.id.toUpperCase()}.AGENT</text>
            <text x="46" y="36" fontFamily="var(--f-sans)" fontSize="13" fontWeight="600" fill="#14141A">{a.name.split(' ')[0]}</text>
            <text x="14" y="62" fontFamily="var(--f-sans)" fontSize="11" fill="rgba(20,20,26,.55)">{a.role}</text>
            <text x="14" y="84" fontFamily="var(--f-mono)" fontSize="9" fill={a.tint} opacity=".85" letterSpacing="1">● ACTIVE</text>
          </g>
        ))}
      </svg>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginTop:18}}>
        {agents.map(a => (
          <div key={a.id} style={{padding:'14px 4px 0'}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em'}}>{a.id.toUpperCase()}</div>
            <div style={{fontWeight:600, marginTop:4, fontSize:13.5}}>{a.name}</div>
            <div style={{color:'var(--muted)', fontSize:12.5, marginTop:6, lineHeight:1.5}}>{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Full AI Agents inspector page (sidebar route)
function AgentsPage() {
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Multi-agent orchestration</div>
          <h1 className="page-title">Inside the <em>classroom brain.</em></h1>
          <div className="page-sub">Four cooperating agents share one student model. Inspect message flow, latency, and override any decision.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn--sm">{I.cal({size:13})} Today</button>
          <button className="btn btn--sm btn--primary">{I.download({size:13})} Export trace</button>
        </div>
      </div>

      <AgentFlowDiagram/>

      <div className="grid-12" style={{marginTop:22}}>
        <div className="card span-7" style={{padding:20}}>
          <div className="card-head" style={{padding:0, border:0, marginBottom:14}}>
            <h3>Live agent trace · session #2417</h3>
            <span className="tag tag--ind">Devin · matriks</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:10, fontSize:13}}>
            {[
              { t:'00:00.0', a:'diag', m:'Detected gap on exercise #4 — root concept: negative exponents.', tint:'var(--indigo)'},
              { t:'00:00.4', a:'route',m:'Plan: 3-step Socratic remediation, Bloom L2→L3. Anchor on reciprocal idea.', tint:'var(--violet)'},
              { t:'00:00.7', a:'socr', m:'Opening: ask student to "teach me why a⁻ⁿ = 1/aⁿ" without giving rule.', tint:'#3FB37F'},
              { t:'00:14.2', a:'know', m:'Update belief: reciprocal idea P(mastered) 0.41 → 0.68.', tint:'#C98A17'},
              { t:'00:38.9', a:'socr', m:'Counter-question: "what if n = 0?" — probe edge case.', tint:'#3FB37F'},
              { t:'01:02.1', a:'know', m:'Zero-exponent confidence still low (P=0.28). Flagged for follow-up.', tint:'#C98A17'},
            ].map((r,i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'72px 110px 1fr', gap:12, padding:'10px 0', borderBottom:'1px solid var(--line-2)'}}>
                <div style={{fontFamily:'var(--f-mono)', fontSize:11.5, color:'var(--muted)'}}>{r.t}</div>
                <div style={{display:'flex', alignItems:'center', gap:8, fontFamily:'var(--f-mono)', fontSize:11.5}}>
                  <span style={{width:8, height:8, borderRadius:999, background:r.tint, boxShadow:`0 0 0 4px ${r.tint}22`}}/>
                  {r.a.toUpperCase()}
                </div>
                <div>{r.m}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card span-5" style={{padding:20}}>
          <h3 style={{margin:'0 0 12px', fontSize:14, fontWeight:600}}>Agent health</h3>
          {[
            { n:'Diagnostic', lat:'124ms', ok:0.98, tint:'var(--indigo)'},
            { n:'Routing',    lat:'88ms',  ok:0.99, tint:'var(--violet)'},
            { n:'Socratic',   lat:'612ms', ok:0.94, tint:'#3FB37F'},
            { n:'KnowledgeTr',lat:'42ms',  ok:1.00, tint:'#C98A17'},
          ].map(a => (
            <div key={a.n} style={{display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:'1px solid var(--line-2)'}}>
              <span style={{width:10, height:10, borderRadius:999, background:a.tint, boxShadow:`0 0 0 4px ${a.tint}22`}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:500, fontSize:13.5}}>{a.n}</div>
                <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)'}}>p95 {a.lat} · 12,448 calls / 24h</div>
              </div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:12}}>{(a.ok*100).toFixed(0)}%</div>
            </div>
          ))}
          <div className="card card--quiet" style={{padding:14, marginTop:14}}>
            <div className="eyebrow" style={{fontSize:10}}>Model card</div>
            <div style={{fontSize:13, marginTop:10, lineHeight:1.55}}>
              All agents share a Bayesian student model and read/write to the same concept graph
              (1,284 nodes for Math Kelas X–XII).
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { AgentFlowDiagram, AgentsPage });
