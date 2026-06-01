// TEACHER DASHBOARD
function TeacherDashboard({ go }) {
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Tuesday · 26 May 2026 · 09:42 WIB</div>
          <h1 className="page-title">Good morning, <em>Bu Rini.</em></h1>
          <div className="page-sub">3 classes are active today. 14 students need attention before the period 4 quiz.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn--sm" onClick={()=>go('upload')}>{I.upload({size:13})} Upload material</button>
          <button className="btn btn--sm btn--primary" onClick={()=>go('assign')}>{I.plus({size:13})} New assignment</button>
        </div>
      </div>

      {/* AI Insight banner */}
      <div className="card" style={{padding:0, marginBottom:22, overflow:'hidden', position:'relative'}}>
        <div style={{
          background:'linear-gradient(120deg, rgba(91,91,247,.08), rgba(138,79,255,.06) 40%, transparent 70%)',
          padding:'22px 24px', display:'flex', gap:18, alignItems:'flex-start'
        }}>
          <div style={{
            width:42, height:42, borderRadius:14, background:'var(--grad)',
            display:'grid', placeItems:'center', color:'#fff', flexShrink:0,
            boxShadow:'0 8px 24px -10px rgba(91,91,247,.6)'
          }}>{I.brain({size:20, stroke:'#fff'})}</div>
          <div style={{flex:1}}>
            <div className="eyebrow"><span className="dot"/>AI insight · just now</div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:24, lineHeight:1.25, marginTop:6, letterSpacing:'-.005em'}}>
              <em>72%</em> of students in <b>XII-IPA-1</b> are struggling with <em>negative exponent fundamentals</em> before today's matrix lesson.
            </div>
            <div style={{color:'var(--muted)', fontSize:13.5, marginTop:8, maxWidth:780, lineHeight:1.55}}>
              The Diagnostic Agent traced 38 of 53 incorrect responses to the same prerequisite gap.
              Recommend a 10-minute remediation block at the start of period 4.
            </div>
            <div style={{display:'flex', gap:8, marginTop:14}}>
              <button className="btn btn--sm btn--grad" onClick={()=>go('teach')}>Queue remediation</button>
              <button className="btn btn--sm" onClick={()=>go('heatmap')}>Open heatmap</button>
              <button className="btn btn--sm btn--ghost">Dismiss</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{marginBottom:22}}>
        {[
          { l:'Active classes',     v:'4',     d:'+1 this term', icon:'layers' },
          { l:'Students engaged',   v:'128',   d:'94% attendance', icon:'users' },
          { l:'Misconceptions open',v:'17',    d:'−6 vs last week', good:true, icon:'spark' },
          { l:'Class health',       v:'B+',    d:'AI-assessed · stable', icon:'target' },
        ].map(s => (
          <div key={s.l} className="card card--pad stat">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div className="label">{s.l}</div>
              <span className="icon-btn" style={{width:26, height:26, color:'var(--muted)'}}>{I[s.icon]({size:12})}</span>
            </div>
            <div className="value">{s.v}</div>
            <div className={"delta" + (s.good?'':'')}>{s.d}</div>
          </div>
        ))}
      </div>

      <div className="grid-12">
        {/* Class completion chart */}
        <div className="card span-8" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.trend({size:14, stroke:'var(--indigo)'})} Class mastery · last 30 days</h3>
            <div className="tabs">
              <button className="tab is-active">XII-IPA-1</button>
              <button className="tab">XII-IPA-2</button>
              <button className="tab">XI-IPA-1</button>
              <button className="tab">X-IPS</button>
            </div>
          </div>
          <div style={{padding:20}}>
            <MasteryChart/>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginTop:18}}>
              {[
                { l:'Mean mastery', v:'68%', d:'+12% MoM'},
                { l:'Bottom quartile', v:'34%', d:'8 students'},
                { l:'Top quartile',    v:'91%', d:'8 students'},
                { l:'Velocity',        v:'+2.4%/wk', d:'on track'},
              ].map(s => (
                <div key={s.l}>
                  <div style={{fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'.1em', color:'var(--muted)', textTransform:'uppercase'}}>{s.l}</div>
                  <div style={{fontFamily:'var(--f-serif)', fontSize:28, marginTop:4}}>{s.v}</div>
                  <div style={{fontSize:11.5, color:'var(--muted)'}}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today schedule */}
        <div className="card span-4" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.cal({size:14, stroke:'var(--indigo)'})} Today</h3>
            <span className="tag">Tue 26 May</span>
          </div>
          <div style={{padding:'8px 0'}}>
            {[
              { t:'07:15', d:'Period 1 · XII-IPA-1 · Matrices', tag:'active', ti:'var(--ok)'},
              { t:'08:45', d:'Period 2 · X-IPS · Linear func.', tag:'next', ti:'var(--indigo)'},
              { t:'10:30', d:'Office hours · Devin, Anisa', tag:'1:1', ti:'var(--violet)'},
              { t:'12:15', d:'Period 4 · XII-IPA-1 · Quiz', tag:'AI-set', ti:'var(--warn)'},
              { t:'14:00', d:'Faculty review · Math dept', tag:'meet', ti:'var(--muted)'},
            ].map((r,i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'56px 1fr auto', gap:10, padding:'12px 20px', borderBottom:'1px solid var(--line-2)'}}>
                <div style={{fontFamily:'var(--f-mono)', fontSize:11.5, color:'var(--muted)'}}>{r.t}</div>
                <div style={{fontSize:13}}>{r.d}</div>
                <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:r.ti}}>● {r.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Misconception alerts */}
        <div className="card span-7" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.spark({size:14, stroke:'var(--err)'})} Misconception alerts</h3>
            <button className="btn btn--sm btn--ghost" onClick={()=>go('heatmap')}>View all →</button>
          </div>
          <table className="tbl">
            <thead><tr><th>Concept</th><th>Class</th><th>Students</th><th>Severity</th><th></th></tr></thead>
            <tbody>
              {[
                { c:'Negative exponents → reciprocal', cl:'XII-IPA-1', n:23, sev:'severe'},
                { c:'Distributive property over neg.',  cl:'X-IPS',    n:11, sev:'severe'},
                { c:'Order of operations w/ exponents', cl:'XI-IPA-1', n:8,  sev:'warn'},
                { c:'Inverse on both sides',            cl:'XII-IPA-1', n:6,  sev:'warn'},
                { c:'Slope vs y-intercept reading',     cl:'X-IPS',    n:4,  sev:'ok'},
              ].map((r,i) => (
                <tr key={i}>
                  <td style={{fontWeight:500}}>{r.c}</td>
                  <td><span className="tag">{r.cl}</span></td>
                  <td style={{fontFamily:'var(--f-mono)'}}>{r.n} students</td>
                  <td>
                    {r.sev==='severe' && <span className="tag tag--err"><span className="dot"/>severe</span>}
                    {r.sev==='warn'   && <span className="tag tag--warn"><span className="dot"/>unstable</span>}
                    {r.sev==='ok'     && <span className="tag tag--ok"><span className="dot"/>improving</span>}
                  </td>
                  <td style={{textAlign:'right'}}>
                    <button className="btn btn--sm" onClick={()=>go('teach')}>Remediate →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent assignments */}
        <div className="card span-5" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.book({size:14, stroke:'var(--indigo)'})} Recent assignments</h3>
            <button className="btn btn--sm btn--ghost" onClick={()=>go('assign')}>All →</button>
          </div>
          <div style={{padding:'4px 0'}}>
            {[
              { t:'Matriks 2×2 · invers', s:'XII-IPA-1', sub:'28/32', p:78, due:'today 12:00'},
              { t:'Eksponen & logaritma · quiz', s:'XII-IPA-1', sub:'31/32', p:91, due:'closed'},
              { t:'Sistem persamaan linear', s:'XI-IPA-1', sub:'19/29', p:54, due:'tomorrow'},
              { t:'Fungsi kuadrat · diagnostic', s:'X-IPS', sub:'12/28', p:38, due:'Fri 29 May'},
            ].map((r,i) => (
              <div key={i} style={{padding:'14px 20px', borderBottom:'1px solid var(--line-2)'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{fontWeight:500, fontSize:13.5}}>{r.t}</div>
                  <span className="tag" style={{fontSize:10}}>{r.due}</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:10, marginTop:8}}>
                  <span style={{fontSize:12, color:'var(--muted)'}}>{r.s} · {r.sub} submitted</span>
                  <div className="bar" style={{flex:1}}><i style={{width:`${r.p}%`}}/></div>
                  <span style={{fontFamily:'var(--f-mono)', fontSize:11.5}}>{r.p}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: recommendations + activity */}
      <div className="grid-12" style={{marginTop:22}}>
        <div className="card span-7" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.zap({size:14, stroke:'var(--indigo)'})} AI recommendations</h3>
            <span className="tag tag--ind">Personalized</span>
          </div>
          <div style={{padding:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {[
              { tag:'this lesson', t:'Insert 10-min remediation: negative exponents', d:'Closing 38 of 53 open misconceptions. Auto-generates 4 Socratic prompts.'},
              { tag:'this week',   t:'Pair-teach Devin & Hesti on inverse matrices', d:'Hesti is mastered, Devin is one prerequisite away. Predicted lift +18%.'},
              { tag:'next class',  t:'Skip section 3.2 — class already mastered', d:'27/32 already at L3+. Save 40 min for project work.'},
              { tag:'curriculum',  t:'Replace worksheet #4 with adaptive set', d:'Current worksheet over-tests already-mastered skills.'},
            ].map((r,i) => (
              <div key={i} className="card card--quiet" style={{padding:16}}>
                <div className="eyebrow" style={{fontSize:10}}>{r.tag}</div>
                <div style={{fontWeight:600, marginTop:8, fontSize:13.5, lineHeight:1.35}}>{r.t}</div>
                <div style={{color:'var(--muted)', fontSize:12.5, marginTop:6, lineHeight:1.5}}>{r.d}</div>
                <div style={{display:'flex', gap:8, marginTop:12}}>
                  <button className="btn btn--sm btn--primary">Apply</button>
                  <button className="btn btn--sm btn--ghost">Why?</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card span-5" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.users({size:14, stroke:'var(--indigo)'})} Student activity · live</h3>
            <span className="tag tag--ok"><span className="dot"/>17 online</span>
          </div>
          <div style={{padding:'4px 0'}}>
            {[
              { n:'Devin Pradana', a:'Teach-Me · negative exponents', t:'now', col:'red'},
              { n:'Anisa Rahmadani', a:'Quiz · matriks invers · q4/6', t:'now', col:'amber'},
              { n:'Galuh Saputri', a:'Mastered linear func. L3', t:'2m', col:'green'},
              { n:'Bayu Pratama', a:'Hint requested · SPL', t:'4m', col:'amber'},
              { n:'Citra Wijaya', a:'Submitted assignment #14', t:'7m', col:'slate'},
              { n:'Eka Putri', a:'Teach-Me · inverse operation', t:'9m', col:'red'},
            ].map((r,i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 20px', borderBottom:'1px solid var(--line-2)'}}>
                <div className={"avatar avatar--sm avatar--"+r.col}>{r.n[0]}{r.n.split(' ')[1][0]}</div>
                <div style={{flex:1, fontSize:13}}>
                  <div style={{fontWeight:500}}>{r.n}</div>
                  <div style={{color:'var(--muted)', fontSize:12}}>{r.a}</div>
                </div>
                <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--muted)'}}>{r.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// SVG chart for mastery
function MasteryChart() {
  const data = [42,46,44,52,55,58,57,62,60,65,68,67,71,74,72,76,75,78,81,79,82,85,84,86,89,88,90,87,89,91];
  const benchmark = [38,40,42,43,44,46,47,48,50,51,52,54,55,55,56,58,59,60,61,62,63,64,65,65,66,67,68,68,69,70];
  const W = 740, H = 220, P = 30;
  const x = i => P + (W - P*2) * (i / (data.length-1));
  const y = v => H - P - (H - P*2) * (v / 100);
  const path = arr => arr.map((v,i) => `${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ');
  const area = data.map((v,i)=>`${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ') + ` L ${x(data.length-1)} ${H-P} L ${x(0)} ${H-P} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:'auto', display:'block'}}>
      <defs>
        <linearGradient id="mcg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B5BF7" stopOpacity=".35"/>
          <stop offset="1" stopColor="#5B5BF7" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* grid */}
      {[0,25,50,75,100].map(t => (
        <g key={t}>
          <line x1={P} x2={W-P} y1={y(t)} y2={y(t)} stroke="rgba(20,20,26,.06)"/>
          <text x={P-8} y={y(t)+4} textAnchor="end" fontFamily="var(--f-mono)" fontSize="9" fill="rgba(20,20,26,.4)">{t}</text>
        </g>
      ))}
      <path d={area} fill="url(#mcg)"/>
      <path d={path(benchmark)} stroke="rgba(20,20,26,.35)" strokeWidth="1.2" strokeDasharray="3 4" fill="none"/>
      <path d={path(data)} stroke="url(#mcg-line)" strokeWidth="2.2" fill="none"/>
      <defs>
        <linearGradient id="mcg-line" x1="0" x2="1">
          <stop offset="0" stopColor="#5B5BF7"/>
          <stop offset="1" stopColor="#8A4FFF"/>
        </linearGradient>
      </defs>
      {/* end point */}
      <circle cx={x(data.length-1)} cy={y(data[data.length-1])} r="4" fill="#8A4FFF"/>
      <circle cx={x(data.length-1)} cy={y(data[data.length-1])} r="9" fill="#8A4FFF" opacity=".15"/>
      <text x={x(data.length-1)-12} y={y(data[data.length-1])-12} textAnchor="end" fontFamily="var(--f-mono)" fontSize="10" fill="#14141A">91% · today</text>
      <text x={x(0)} y={y(benchmark[0])-10} fontFamily="var(--f-mono)" fontSize="9" fill="rgba(20,20,26,.4)">national avg.</text>
    </svg>
  );
}

Object.assign(window, { TeacherDashboard, MasteryChart });
