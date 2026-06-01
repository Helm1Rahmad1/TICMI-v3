// TEACH-ME MODE — core feature, student teaches the AI tutee
function TeachMe({ go }) {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState(defaultThread());
  const [thinking, setThinking] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text) => {
    if (!text.trim()) return;
    const newMsgs = [...messages, { role:'student', body:text }];
    setMessages(newMsgs); setInput(''); setThinking(true);
    setTimeout(() => {
      setMessages(m => [...m, aiFollowup(newMsgs.length)]);
      setThinking(false);
    }, 1400);
  };

  return (
    <div style={{
      display:'grid', gridTemplateColumns:'320px 1fr 320px', gap:0,
      height:'calc(100vh - 64px)', marginTop:-28, marginLeft:-32, marginRight:-32,
      borderTop:'1px solid var(--line)', background:'var(--bg-2)'
    }}>
      {/* LEFT — AI tutee state */}
      <aside style={{borderRight:'1px solid var(--line)', padding:'22px 18px', overflow:'auto'}}>
        <div className="eyebrow"><span className="dot"/>Your AI tutee</div>
        <div style={{display:'flex', alignItems:'center', gap:12, marginTop:14, paddingBottom:14, borderBottom:'1px solid var(--line)'}}>
          <div style={{
            width:56, height:56, borderRadius:18, background:'var(--grad)',
            position:'relative', overflow:'hidden', display:'grid', placeItems:'center',
            boxShadow:'0 8px 24px -8px rgba(91,91,247,.5)'
          }}>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 30%, rgba(255,255,255,.55), transparent 55%)'}}/>
            <span style={{color:'#fff', fontFamily:'var(--f-mono)', fontSize:18, fontWeight:600, position:'relative'}}>K</span>
          </div>
          <div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:22, lineHeight:1}}>Kiko</div>
            <div style={{fontSize:11.5, color:'var(--muted)', marginTop:4}}>your confused classmate · age 16</div>
          </div>
        </div>

        <div style={{marginTop:18}}>
          <div className="eyebrow" style={{fontSize:10}}>Cognitive state</div>
          <CognitiveDial value={62}/>
          <div style={{textAlign:'center', fontSize:12, color:'var(--muted)', marginTop:-6}}>
            "I sort of get it… but I'm not sure about edge cases."
          </div>
        </div>

        <div style={{marginTop:22}}>
          <div className="eyebrow" style={{fontSize:10}}>Concept verifier</div>
          <div style={{display:'flex', flexDirection:'column', gap:6, marginTop:10}}>
            {[
              { l:'Reciprocal idea',         s:'ok'},
              { l:'Inverse operation',       s:'ok'},
              { l:'Generalize for any n',    s:'warn'},
              { l:'Zero exponent edge case', s:'err'},
              { l:'Fractional exponents',    s:'pending'},
            ].map(r => (
              <div key={r.l} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', background:'#fff', border:'1px solid var(--line)', borderRadius:10}}>
                <span style={{
                  width:8, height:8, borderRadius:999,
                  background: r.s==='ok'?'var(--ok)': r.s==='warn'?'var(--warn)': r.s==='err'?'var(--err)':'var(--muted-2)',
                  boxShadow: r.s!=='pending' ? `0 0 0 4px ${r.s==='ok'?'rgba(31,158,106,.15)': r.s==='warn'?'rgba(201,138,23,.15)':'rgba(209,67,67,.15)'}` : 'none'
                }}/>
                <span style={{fontSize:12.5}}>{r.l}</span>
                {r.s==='ok' &&    I.check({size:13, stroke:'var(--ok)', style:{marginLeft:'auto'}})}
                {r.s==='warn' &&  I.spark({size:13, stroke:'var(--warn)', style:{marginLeft:'auto'}})}
                {r.s==='err' &&   I.x({size:13, stroke:'var(--err)', style:{marginLeft:'auto'}})}
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:22}}>
          <div className="eyebrow" style={{fontSize:10}}>Bloom level reached</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:4, marginTop:10}}>
            {['Remember','Understand','Apply','Analyze','Evaluate','Create'].map((l,i) => (
              <div key={l} style={{textAlign:'center'}}>
                <div style={{
                  height:36, borderRadius:6,
                  background: i<3?'var(--grad)':'var(--bg-2)',
                  border:'1px solid '+(i<3?'transparent':'var(--line)'),
                  opacity: i===2?1:i<2?.7:1
                }}/>
                <div style={{fontSize:9, color: i<3?'var(--ink)':'var(--muted)', marginTop:4, fontFamily:'var(--f-mono)'}}>L{i+1}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:11.5, color:'var(--muted)', marginTop:8}}>
            Currently working at <b style={{color:'var(--ink)'}}>L3 · Apply</b> — the AI is asking you to use the rule in a new case.
          </div>
        </div>
      </aside>

      {/* CENTER — chat */}
      <section style={{display:'flex', flexDirection:'column', minHeight:0, background:'var(--bg)', position:'relative'}}>
        {/* tab header */}
        <div style={{
          padding:'16px 28px', borderBottom:'1px solid var(--line)', background:'rgba(247,246,242,.85)',
          backdropFilter:'blur(8px)', display:'flex', alignItems:'center', gap:14
        }}>
          <button className="btn btn--sm btn--ghost" onClick={()=>go('student')}>← Back</button>
          <div>
            <div style={{fontWeight:600, fontSize:14}}>Teach-Me · Eksponen negatif → reciprocal</div>
            <div style={{fontSize:11.5, color:'var(--muted)'}}>Session #2417 · 02:14 · routed from quiz attempt</div>
          </div>
          <div style={{marginLeft:'auto', display:'flex', gap:8}}>
            <span className="tag tag--ind"><span className="dot"/>Socratic agent live</span>
            <button className="btn btn--sm">{I.pause({size:12})} Pause</button>
            <button className="btn btn--sm">{I.flag ? 'flag' : I.spark({size:12})} Report</button>
          </div>
        </div>

        {/* messages */}
        <div ref={scrollRef} style={{flex:1, overflow:'auto', padding:'28px 36px'}}>
          <div style={{maxWidth:760, margin:'0 auto', display:'flex', flexDirection:'column', gap:16}}>
            {messages.map((m,i) => <Msg key={i} m={m}/>)}
            {thinking && <ThinkingBubble/>}
          </div>
        </div>

        {/* composer */}
        <div style={{borderTop:'1px solid var(--line)', background:'#fff', padding:'14px 36px 20px'}}>
          <div style={{maxWidth:760, margin:'0 auto'}}>
            <div style={{display:'flex', gap:6, marginBottom:10, flexWrap:'wrap'}}>
              {[
                'Show me with numbers, e.g. 2⁻³',
                'It\'s like dividing repeatedly',
                'Try n = 0 — what happens?',
                'Draw the rule visually',
              ].map(s => (
                <button key={s} className="btn btn--sm" style={{fontSize:12}} onClick={()=>send(s)}>
                  {I.spark({size:12, stroke:'var(--indigo)'})} {s}
                </button>
              ))}
            </div>
            <div style={{
              display:'flex', gap:10, alignItems:'flex-end',
              border:'1px solid var(--line)', borderRadius:14, padding:'10px 12px',
              boxShadow:'var(--sh-1)', background:'#fff'
            }}>
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(input);} }}
                placeholder="Teach Kiko like a friend. Explain step by step, use a number, draw it out…"
                rows={2}
                style={{
                  flex:1, border:0, outline:0, resize:'none', background:'transparent',
                  fontFamily:'var(--f-sans)', fontSize:14, color:'var(--ink)', lineHeight:1.5
                }}
              />
              <div style={{display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end'}}>
                <div style={{display:'flex', gap:6}}>
                  <button className="icon-btn" title="formula" style={{width:30, height:30}}>{I.paper({size:13})}</button>
                  <button className="icon-btn" title="draw" style={{width:30, height:30}}>{I.spark({size:13})}</button>
                  <button className="icon-btn" title="voice" style={{width:30, height:30}}>{I.mic({size:13})}</button>
                </div>
                <button className="btn btn--sm btn--grad" onClick={()=>send(input)}>{I.send({size:13})} Send</button>
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:10, fontSize:11, color:'var(--muted)'}}>
              <span>Press <span className="kbd-key">↵</span> to send · <span className="kbd-key">⇧↵</span> new line</span>
              <span>Your understanding is being measured — not judged.</span>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT — math workspace + prerequisite path */}
      <aside style={{borderLeft:'1px solid var(--line)', padding:'22px 18px', overflow:'auto'}}>
        <div className="eyebrow"><span className="dot"/>Math workspace</div>
        <div className="card paper-grid" style={{padding:16, marginTop:14, background:'#fff'}}>
          <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)'}}>scratch · auto-saved</div>
          <div style={{
            fontFamily:'var(--f-serif)', fontSize:22, marginTop:14, lineHeight:1.6, color:'var(--ink-2)'
          }}>
            <div>a⁻ⁿ = <span style={{borderBottom:'1.5px solid var(--indigo)'}}>1 / aⁿ</span></div>
            <div style={{marginTop:6}}>2⁻³ = 1 / 2³ = 1/8 ✓</div>
            <div style={{marginTop:6, color:'var(--muted)'}}>?  a⁰ = ___</div>
          </div>
          <div style={{display:'flex', gap:6, marginTop:14}}>
            <button className="btn btn--sm">Insert eqn</button>
            <button className="btn btn--sm">Draw</button>
            <button className="btn btn--sm btn--ghost">Clear</button>
          </div>
        </div>

        <div style={{marginTop:22}}>
          <div className="eyebrow" style={{fontSize:10}}>Prerequisite path</div>
          <div style={{position:'relative', marginTop:14, paddingLeft:24}}>
            <div style={{position:'absolute', left:8, top:8, bottom:8, width:2, background:'linear-gradient(180deg, var(--ok), var(--indigo), var(--line))'}}/>
            {[
              { s:'ok',  l:'Pecahan dasar',     d:'P=0.96 · mastered'},
              { s:'ok',  l:'Eksponen positif',  d:'P=0.91 · mastered'},
              { s:'cur', l:'Eksponen negatif',  d:'P=0.62 · current'},
              { s:'pen', l:'Eksponen pecahan',  d:'gated'},
              { s:'pen', l:'Sifat akar',        d:'gated'},
            ].map((n,i) => (
              <div key={i} style={{position:'relative', padding:'6px 0 14px'}}>
                <span style={{
                  position:'absolute', left:-22, top:8, width:14, height:14, borderRadius:999,
                  background: n.s==='ok'?'var(--ok)': n.s==='cur'?'var(--indigo)':'var(--surface)',
                  border:'2px solid '+(n.s==='ok'?'var(--ok)': n.s==='cur'?'var(--indigo)':'var(--line)'),
                  boxShadow: n.s==='cur' ? '0 0 0 6px rgba(91,91,247,.18)' : 'none'
                }}/>
                <div style={{fontWeight:500, fontSize:13}}>{n.l}</div>
                <div style={{fontSize:11, fontFamily:'var(--f-mono)', color: n.s==='cur'?'var(--indigo)':'var(--muted)'}}>{n.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:18}}>
          <div className="eyebrow" style={{fontSize:10}}>Session</div>
          <div className="card card--quiet" style={{padding:14, marginTop:10}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
              <span style={{color:'var(--muted)'}}>Turns</span><span style={{fontFamily:'var(--f-mono)'}}>14</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginTop:6}}>
              <span style={{color:'var(--muted)'}}>Avg explain length</span><span style={{fontFamily:'var(--f-mono)'}}>38 words</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginTop:6}}>
              <span style={{color:'var(--muted)'}}>Highest Bloom</span><span style={{fontFamily:'var(--f-mono)'}}>L3 · Apply</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginTop:6}}>
              <span style={{color:'var(--muted)'}}>Mastery Δ</span><span style={{fontFamily:'var(--f-mono)', color:'var(--ok)'}}>+24%</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

// Message bubble
function Msg({ m }) {
  if (m.role === 'ai') {
    return (
      <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
        <div className="avatar avatar--slate" style={{width:36, height:36}}>K</div>
        <div style={{maxWidth:560}}>
          <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--muted)', letterSpacing:'.08em', marginBottom:4}}>KIKO · YOUR TUTEE</div>
          <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'14px 16px', fontSize:14.5, lineHeight:1.6}}>
            {m.body}
            {m.code && (
              <div style={{marginTop:10, fontFamily:'var(--f-mono)', fontSize:13, background:'var(--bg-2)', padding:'10px 12px', borderRadius:8}}>
                {m.code}
              </div>
            )}
            {m.probe && (
              <div style={{
                marginTop:10, padding:'8px 10px', borderRadius:8,
                background:'rgba(201,138,23,.08)', border:'1px solid rgba(201,138,23,.2)',
                fontSize:12.5, color:'var(--warn)', display:'flex', alignItems:'center', gap:8
              }}>
                {I.spark({size:13, stroke:'var(--warn)'})} edge-case probe: <i style={{color:'var(--ink-2)'}}>{m.probe}</i>
              </div>
            )}
          </div>
          {m.feel && (
            <div style={{fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:12.5, color:'var(--muted)', marginTop:6, marginLeft:2}}>
              ↳ kiko looks {m.feel}.
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div style={{display:'flex', gap:12, alignItems:'flex-start', justifyContent:'flex-end'}}>
      <div style={{maxWidth:520, textAlign:'left'}}>
        <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--muted)', letterSpacing:'.08em', marginBottom:4, textAlign:'right'}}>YOU · DEVIN</div>
        <div style={{background:'var(--ink)', color:'#fff', borderRadius:14, padding:'14px 16px', fontSize:14.5, lineHeight:1.6}}>
          {m.body}
          {m.code && (
            <div style={{marginTop:10, fontFamily:'var(--f-mono)', fontSize:13, background:'rgba(255,255,255,.08)', padding:'10px 12px', borderRadius:8}}>
              {m.code}
            </div>
          )}
        </div>
        {m.conf != null && (
          <div style={{display:'flex', alignItems:'center', gap:8, justifyContent:'flex-end', marginTop:6, fontSize:11, color:'var(--muted)'}}>
            <span>your confidence</span>
            <div className="bar" style={{width:80}}><i style={{width:`${m.conf}%`}}/></div>
            <span style={{fontFamily:'var(--f-mono)'}}>{m.conf}%</span>
          </div>
        )}
      </div>
      <div className="avatar" style={{width:36, height:36, background:'linear-gradient(135deg,#3FB37F,#1F9E6A)'}}>D</div>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div style={{display:'flex', gap:12, alignItems:'flex-start'}}>
      <div className="avatar avatar--slate" style={{width:36, height:36}}>K</div>
      <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'14px 18px', display:'flex', gap:6}}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            width:7, height:7, borderRadius:999, background:'var(--indigo)',
            animation:`pulse-soft 1.2s ease ${i*.15}s infinite`
          }}/>
        ))}
      </div>
    </div>
  );
}

// Circular mastery dial
function CognitiveDial({ value }) {
  const R = 50, C = 2*Math.PI*R;
  return (
    <div style={{position:'relative', width:180, height:180, margin:'14px auto'}}>
      <svg viewBox="0 0 120 120" style={{width:'100%', height:'100%', transform:'rotate(-90deg)'}}>
        <defs>
          <linearGradient id="dialg" x1="0" x2="1">
            <stop offset="0" stopColor="#5B5BF7"/>
            <stop offset="1" stopColor="#8A4FFF"/>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="6"/>
        <circle cx="60" cy="60" r={R} fill="none" stroke="url(#dialg)" strokeWidth="6"
                strokeLinecap="round" strokeDasharray={`${C*value/100} ${C}`}
                style={{filter:'drop-shadow(0 4px 10px rgba(91,91,247,.35))'}}/>
      </svg>
      <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', textAlign:'center'}}>
        <div>
          <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.12em'}}>MASTERY</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:44, lineHeight:1, marginTop:4}}>{value}<span style={{fontSize:18, color:'var(--muted)'}}>%</span></div>
        </div>
      </div>
    </div>
  );
}

// Seed thread
function defaultThread() {
  return [
    { role:'ai',
      body:"Hey, our quiz had this problem and I bombed it. The teacher said the answer involves something called a 'negative exponent'…",
      feel:'confused' },
    { role:'ai',
      body:"I memorised 2³ = 8 and 2⁴ = 16. But what does 2⁻³ even mean? Is it a negative number? Can you teach me?",
      feel:'frustrated'},
    { role:'student',
      body:"Don't worry, it's not a negative number. Think of it as dividing instead of multiplying. So 2⁻³ means 1 ÷ 2 ÷ 2 ÷ 2.",
      conf: 78 },
    { role:'ai',
      body:"Ohh okay… so 2⁻³ would be 1/2/2/2 = 1/8?",
      code:"2⁻³ = 1 / (2·2·2) = 1/8",
      feel:'curious'},
    { role:'student',
      body:"Exactly! In general, a⁻ⁿ = 1/aⁿ. The negative sign just flips it into the denominator.",
      conf: 84 },
    { role:'ai',
      body:"I think I see it. So negative exponent → reciprocal, that's the move. But wait…",
      probe:"What if the exponent is zero? Is a⁰ = 1/a⁰ ? That can't be right…"
    },
  ];
}

function aiFollowup(turn) {
  const followups = [
    { role:'ai', body:"Hmm, okay — let me try one. Is 5⁻² = 1/25? Or did I miss something?", feel:'curious'},
    { role:'ai', body:"Wait, why does dividing repeatedly give a fraction? Doesn't that make the number smaller and smaller?", feel:'confused'},
    { role:'ai', body:"Got it. Can you teach me what happens with a fractional exponent like 9^(1/2)?", probe:"Is that even still the same rule?"},
    { role:'ai', body:"I think I understand now. Let me try to teach IT back to you, you correct me if I'm wrong: …", feel:'confident'},
  ];
  return followups[turn % followups.length];
}

Object.assign(window, { TeachMe, Msg, ThinkingBubble, CognitiveDial });
