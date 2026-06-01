// CLASS MANAGEMENT
function ClassesPage({ go }) {
  const classes = [
    { id:'xii-ipa-1', n:'XII IPA 1', sub:'Matematika Wajib · Kelas 12',
      code:'TIC-9M4K', students:32, h:88,
      hue: 'linear-gradient(135deg, #5B5BF7, #8A4FFF)',
      active: true,
      progress: 72, due: 3, alert: 3 },
    { id:'xii-ipa-2', n:'XII IPA 2', sub:'Matematika Wajib · Kelas 12',
      code:'TIC-6J2P', students:30, h:81,
      hue: 'linear-gradient(135deg, #FF7A45, #E45A3A)',
      progress: 64, due: 2, alert: 1 },
    { id:'xi-ipa-1', n:'XI IPA 1', sub:'Matematika Peminatan · Kelas 11',
      code:'TIC-4F8S', students:29, h:76,
      hue: 'linear-gradient(135deg, #1F9E6A, #2DBF82)',
      progress: 58, due: 1, alert: 2 },
    { id:'x-ips', n:'X IPS', sub:'Matematika Umum · Kelas 10',
      code:'TIC-1A7W', students:28, h:62,
      hue: 'linear-gradient(135deg, #C98A17, #E5A535)',
      progress: 41, due: 4, alert: 5 },
  ];
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>4 active classes · 119 students</div>
          <h1 className="page-title">My <em>classes.</em></h1>
          <div className="page-sub">Every class sits on a shared curriculum graph. The AI sees what each cohort needs next.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn--sm">{I.filter({size:13})} Filter</button>
          <button className="btn btn--sm btn--primary">{I.plus({size:13})} Create class</button>
        </div>
      </div>

      <div className="grid-4" style={{marginBottom:22}}>
        {classes.map(c => (
          <div key={c.id} className="card" style={{padding:0, overflow:'hidden'}}>
            <div style={{
              height:96, background:c.hue, position:'relative',
              padding:'14px 16px', display:'flex', flexDirection:'column', justifyContent:'space-between'
            }}>
              <div style={{
                position:'absolute', inset:0, opacity:.5,
                background:'radial-gradient(circle at 80% 20%, rgba(255,255,255,.35), transparent 50%)'
              }}/>
              <div style={{position:'relative', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div style={{color:'#fff'}}>
                  <div style={{fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'.12em', opacity:.85}}>CLASS · {c.code}</div>
                  <div style={{fontFamily:'var(--f-serif)', fontSize:26, marginTop:6, lineHeight:1}}>{c.n}</div>
                </div>
                <button className="icon-btn" style={{background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.2)', color:'#fff'}}>{I.more({size:14})}</button>
              </div>
              <div style={{color:'#fff', fontSize:11.5, opacity:.9, position:'relative'}}>{c.sub}</div>
            </div>
            <div style={{padding:'14px 16px'}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{display:'flex'}}>
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="avatar avatar--sm" style={{
                      marginLeft: i?-8:0, border:'2px solid #fff',
                      background: ['#5B5BF7','#8A4FFF','#3FB37F','#C98A17','#E26F6F'][i]
                    }}>{['A','B','C','D','E'][i]}</div>
                  ))}
                </div>
                <div style={{fontSize:12, color:'var(--muted)'}}>+{c.students-5} students</div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:10, marginTop:14}}>
                <div className="bar" style={{flex:1}}><i style={{width:`${c.progress}%`}}/></div>
                <span style={{fontFamily:'var(--f-mono)', fontSize:11}}>{c.progress}%</span>
              </div>
              <div style={{display:'flex', gap:6, marginTop:12, flexWrap:'wrap'}}>
                <span className="tag"><span className="dot" style={{background:'var(--ind)'}}/>health {c.h}</span>
                {c.due>0 && <span className="tag tag--warn"><span className="dot"/>{c.due} due</span>}
                {c.alert>0 && <span className="tag tag--err"><span className="dot"/>{c.alert} alert</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail view for XII-IPA-1 */}
      <div className="grid-12">
        <div className="card span-8" style={{padding:0}}>
          <div className="card-head">
            <h3>XII IPA 1 · class stream</h3>
            <div style={{display:'flex', gap:8}}>
              <span className="tag tag--ok"><span className="dot"/>32 enrolled</span>
              <span className="tag tag--ind">code TIC-9M4K</span>
              <button className="btn btn--sm">{I.copy({size:12})} Invite</button>
            </div>
          </div>
          <div style={{padding:'20px 22px'}}>
            {/* announcement composer */}
            <div className="card card--quiet" style={{padding:14, marginBottom:18}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div className="avatar">RW</div>
                <input placeholder="Share an announcement with the class…" style={{
                  flex:1, border:0, outline:0, background:'transparent', fontSize:13.5,
                  fontFamily:'var(--f-sans)', color:'var(--ink)'
                }}/>
                <button className="btn btn--sm">{I.paper({size:12})} Attach</button>
                <button className="btn btn--sm btn--primary">Post</button>
              </div>
            </div>
            {[
              { who:'Rini Wulandari', when:'Today · 09:12', kind:'announcement',
                body:'Reminder: kuis matriks 2×2 dimulai jam 12:15 di periode 4. TICMI sudah menyiapkan 10 menit remediasi eksponen di awal — datang on time ya.',
                pill:'announcement', icon:'pin'},
              { who:'TICMI AI · diagnostic agent', when:'Today · 08:40', kind:'ai',
                body:'Detected 38 incorrect responses tracing back to negative exponents. Auto-built 4 Socratic prompts for the period 4 warm-up.',
                pill:'ai insight', icon:'brain'},
              { who:'Rini Wulandari', when:'Yesterday · 16:22', kind:'assignment',
                body:'Posted assignment "Matriks invers 2×2". 28/32 sudah submit. Due hari ini 12:00.',
                pill:'assignment', icon:'book'},
              { who:'Anisa Rahmadani', when:'Yesterday · 14:08', kind:'q',
                body:'Bu, kalau determinannya nol berarti matriksnya nggak punya invers ya?',
                pill:'question', icon:'spark'},
            ].map((p,i) => (
              <div key={i} style={{
                display:'grid', gridTemplateColumns:'40px 1fr', gap:14,
                padding:'16px 0', borderTop:i?'1px solid var(--line-2)':0
              }}>
                <div className={"avatar " + (p.kind==='ai'?'avatar--slate':'')}>
                  {p.kind==='ai' ? I.brain({size:14, stroke:'#fff'}) : p.who.split(' ').map(x=>x[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <div style={{fontWeight:600, fontSize:13.5}}>{p.who}</div>
                    <span className="tag" style={{fontSize:10}}>{p.pill}</span>
                    <span style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)', marginLeft:'auto'}}>{p.when}</span>
                  </div>
                  <div style={{marginTop:8, fontSize:13.5, lineHeight:1.55}}>{p.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side: class health + roster */}
        <div className="col span-4">
          <div className="card" style={{padding:20}}>
            <div className="eyebrow"><span className="dot"/>AI class health</div>
            <div style={{display:'flex', alignItems:'flex-end', gap:14, marginTop:10}}>
              <div style={{fontFamily:'var(--f-serif)', fontSize:64, lineHeight:1}}>88</div>
              <div>
                <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--ok)'}}>+4 this week</div>
                <div style={{fontSize:12, color:'var(--muted)'}}>out of 100</div>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:18}}>
              {[
                ['Mastery velocity', 92],
                ['Engagement',       86],
                ['Equity (top↔bot)', 71],
                ['Misconception decay', 84],
              ].map(([l,v]) => (
                <div key={l}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:12}}>
                    <span style={{color:'var(--muted)'}}>{l}</span>
                    <span style={{fontFamily:'var(--f-mono)'}}>{v}</span>
                  </div>
                  <div className="bar" style={{marginTop:6}}><i style={{width:`${v}%`}}/></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{padding:0}}>
            <div className="card-head">
              <h3>Upcoming</h3>
              <button className="btn btn--sm btn--ghost">All →</button>
            </div>
            <div style={{padding:'4px 0'}}>
              {[
                { i:'book', t:'Kuis matriks 2×2',     d:'Today 12:15', tone:'warn'},
                { i:'paper',t:'Worksheet · invers',   d:'Fri 29 May',  tone:''},
                { i:'cal',  t:'Tryout UTBK · sesi 3', d:'Mon 1 Jun',   tone:''},
                { i:'star', t:'Project: matrix in real life', d:'Jun 12', tone:''},
              ].map((r,i) => (
                <div key={i} style={{display:'flex', gap:12, padding:'12px 20px', borderBottom:'1px solid var(--line-2)', alignItems:'center'}}>
                  <span className="icon-btn" style={{width:28, height:28, color:'var(--muted)'}}>{I[r.i]({size:13})}</span>
                  <div style={{flex:1, fontSize:13}}>
                    <div style={{fontWeight:500}}>{r.t}</div>
                    <div style={{fontSize:11.5, color:'var(--muted)', fontFamily:'var(--f-mono)'}}>{r.d}</div>
                  </div>
                  {r.tone==='warn' && <span className="tag tag--warn">due</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { ClassesPage });
