// HEATMAP ANALYTICS — misconception matrix
function HeatmapPage({ go }) {
  const students = [
    'Anisa R.', 'Bayu P.', 'Citra W.', 'Devin P.', 'Eka P.', 'Farid H.',
    'Galuh S.', 'Hesti M.', 'Indra K.', 'Jihan L.', 'Kanaya T.', 'Luthfi N.',
    'Mira A.', 'Nanda P.', 'Oki S.', 'Putri R.',
  ];
  const cols = [
    'Bil. bulat','Pecahan','Eksp +','Eksp −','Log','Lin eqn','SPL','Polinom',
    'Quadratic','Trig','Vektor','Matriks ops','Det 2×2','Adjugate','Invers 2×2','Aplikasi'
  ];
  // 0 mastered, 1 unstable, 2 misconception, 3 severe; -1 not-tested
  const cell = (s,c) => {
    const seed = (s*7 + c*13) % 100;
    if (c < 2) return 0;
    if (c === 3) return seed < 20 ? 1 : seed < 75 ? 2 : 3; // negative exponents — bottleneck
    if (c === 12) return seed < 35 ? 0 : seed < 70 ? 1 : 2; // det
    if (c === 14) return seed < 25 ? 0 : seed < 55 ? 1 : seed < 85 ? 2 : 3;
    if (c === 15) return -1;
    return seed < 40 ? 0 : seed < 70 ? 1 : seed < 92 ? 2 : 3;
  };
  const palette = ['#E4F4EC','#FBF1DC','#FBE5E5','#F4C8C8'];
  const colCount = (c) => {
    let counts = [0,0,0,0];
    for (let s=0; s<students.length; s++) {
      const v = cell(s,c);
      if (v>=0) counts[v]++;
    }
    return counts;
  };

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>XII IPA 1 · 32 students · 16 competencies</div>
          <h1 className="page-title">Misconception <em>heatmap.</em></h1>
          <div className="page-sub">Red is not a grade. Each cell is the exact prerequisite gap to address next class.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn--sm">{I.filter({size:13})} Filter</button>
          <button className="btn btn--sm">{I.cal({size:13})} Last 14 days</button>
          <button className="btn btn--sm btn--primary">{I.download({size:13})} Export PDF</button>
        </div>
      </div>

      <div className="grid-12">
        {/* Heatmap card */}
        <div className="card span-9" style={{padding:0, overflow:'hidden'}}>
          <div className="card-head">
            <h3>{I.grid({size:14, stroke:'var(--indigo)'})} Class × competency matrix</h3>
            <div style={{display:'flex', gap:6, alignItems:'center'}}>
              <div className="tabs">
                <button className="tab is-active">All</button>
                <button className="tab">Foundations</button>
                <button className="tab">Algebra</button>
                <button className="tab">Matrix</button>
              </div>
              <button className="btn btn--sm">{I.copy({size:12})} Pivot</button>
            </div>
          </div>
          <div style={{padding:'18px 22px 22px', overflowX:'auto'}}>
            <div style={{
              display:'grid',
              gridTemplateColumns:`140px repeat(${cols.length}, minmax(46px,1fr)) 70px`,
              gap:5, alignItems:'center'
            }}>
              <div/>
              {cols.map((c,i) => (
                <div key={c} style={{
                  fontFamily:'var(--f-mono)', fontSize:9.5, textTransform:'uppercase',
                  letterSpacing:'.05em', color:'var(--muted)', textAlign:'center',
                  writingMode:'vertical-rl', transform:'rotate(180deg)',
                  height:80, display:'flex', alignItems:'flex-end', justifyContent:'center'
                }}>{c}</div>
              ))}
              <div style={{fontFamily:'var(--f-mono)', fontSize:9.5, color:'var(--muted)', textAlign:'right'}}>MASTERY</div>

              {students.map((s,sr) => {
                let m = 0; let t = 0;
                for (let c=0; c<cols.length; c++) { const v = cell(sr,c); if (v>=0) { t++; if (v===0) m += 100; else if (v===1) m += 65; else if (v===2) m += 30; else m += 10; } }
                const avg = Math.round(m / t);
                return (
                  <React.Fragment key={s}>
                    <div style={{fontSize:12.5, color:'var(--ink-2)'}}>
                      <span className="avatar avatar--sm" style={{marginRight:8, verticalAlign:'middle', background:['#5B5BF7','#8A4FFF','#3FB37F','#C98A17','#E26F6F'][sr%5]}}>{s.split(' ')[0][0]}</span>
                      {s}
                    </div>
                    {cols.map((c,ci) => {
                      const v = cell(sr,ci);
                      if (v < 0) return <div key={ci} style={{height:30, borderRadius:4, background:'repeating-linear-gradient(135deg, var(--bg-2) 0 4px, #fff 4px 8px)', border:'1px solid var(--line)'}}/>;
                      return (
                        <div key={ci} className="hm-cell" style={{background: palette[v], cursor:'pointer'}}
                             title={`${s} · ${c} · ${['mastered','unstable','misconception','severe'][v]}`}/>
                      );
                    })}
                    <div style={{display:'flex', alignItems:'center', gap:6, justifyContent:'flex-end'}}>
                      <div className="bar" style={{width:46}}><i style={{width:`${avg}%`, background: avg>75?'var(--ok)': avg>55?'var(--warn)':'var(--err)'}}/></div>
                      <span style={{fontFamily:'var(--f-mono)', fontSize:11}}>{avg}</span>
                    </div>
                  </React.Fragment>
                );
              })}

              {/* column counts */}
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', paddingTop:8}}>BOTTLENECK</div>
              {cols.map((c,ci) => {
                const counts = colCount(ci);
                const total = counts.reduce((a,b)=>a+b,0);
                const bad = counts[2]+counts[3];
                return (
                  <div key={ci} style={{paddingTop:8, textAlign:'center'}}>
                    <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color: bad>total/2?'var(--err)':bad>total/3?'var(--warn)':'var(--muted)'}}>{bad}/{total}</div>
                  </div>
                );
              })}
              <div/>
            </div>

            {/* legend */}
            <div style={{display:'flex', gap:18, alignItems:'center', marginTop:22, fontSize:11.5, color:'var(--muted)'}}>
              <span style={{fontFamily:'var(--f-mono)', fontSize:10}}>LEGEND</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#E4F4EC', borderRadius:3}}/> mastered</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#FBF1DC', borderRadius:3}}/> unstable</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#FBE5E5', borderRadius:3}}/> misconception</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'#F4C8C8', borderRadius:3}}/> severe</span>
              <span style={{display:'flex', alignItems:'center', gap:6}}><span style={{width:12, height:12, background:'repeating-linear-gradient(135deg, var(--bg-2) 0 3px, #fff 3px 6px)', border:'1px solid var(--line)', borderRadius:3}}/> not tested</span>
              <span style={{marginLeft:'auto', fontFamily:'var(--f-mono)', fontSize:10}}>Updated 09:42 WIB · auto-refresh 5m</span>
            </div>
          </div>
        </div>

        {/* SIDE — Bottlenecks + recommendations */}
        <div className="col span-3">
          <div className="card" style={{padding:20}}>
            <div className="eyebrow"><span className="dot"/>Class bottlenecks</div>
            <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:14}}>
              {[
                { c:'Eksponen negatif', n:23, sev:'severe'},
                { c:'Invers 2×2',       n:18, sev:'severe'},
                { c:'Determinan 2×2',   n:11, sev:'warn'},
                { c:'Polinom',          n:8,  sev:'warn'},
                { c:'SPL',              n:4,  sev:'ok'},
              ].map(b => (
                <div key={b.c} style={{display:'flex', alignItems:'center', gap:10}}>
                  <span style={{
                    width:10, height:10, borderRadius:999,
                    background: b.sev==='severe'?'var(--err)': b.sev==='warn'?'var(--warn)':'var(--ok)',
                    boxShadow: `0 0 0 4px ${b.sev==='severe'?'rgba(209,67,67,.15)': b.sev==='warn'?'rgba(201,138,23,.15)':'rgba(31,158,106,.15)'}`
                  }}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500, fontSize:13}}>{b.c}</div>
                    <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)'}}>{b.n} students</div>
                  </div>
                  <button className="btn btn--sm btn--ghost" onClick={()=>go('concept')}>{I.arrow({size:12})}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{padding:20}}>
            <div className="eyebrow"><span className="dot"/>AI remediation playbook</div>
            <div style={{fontSize:12.5, color:'var(--muted)', marginTop:8, lineHeight:1.55}}>
              Ordered to maximise unblocking — each step closes ≥10% of downstream gaps.
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:14}}>
              {[
                ['1', 'Period 4 warm-up · negative exp.', '+18% mastery', 'today'],
                ['2', 'Pair-teach: Hesti × Devin · invers', '+12%',         'today'],
                ['3', 'Re-test SPL on Friday',              '+8%',          'Fri'],
                ['4', 'Skip polinom §3.1 (already mastered)', '−40 min',   'Mon'],
              ].map(([n,t,impact,when]) => (
                <div key={n} className="card card--quiet" style={{padding:12}}>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <div style={{
                      width:24, height:24, borderRadius:6,
                      background:'var(--grad)', color:'#fff',
                      display:'grid', placeItems:'center',
                      fontFamily:'var(--f-mono)', fontSize:11
                    }}>{n}</div>
                    <div style={{fontSize:13, fontWeight:500, flex:1}}>{t}</div>
                  </div>
                  <div style={{display:'flex', gap:8, marginTop:8}}>
                    <span className="tag tag--ok" style={{fontSize:10}}>{impact}</span>
                    <span className="tag" style={{fontSize:10}}>{when}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn--grad" style={{width:'100%', marginTop:14}}>Schedule all 4</button>
          </div>
        </div>

        {/* trend strip */}
        <div className="card span-12" style={{padding:0}}>
          <div className="card-head">
            <h3>{I.trend({size:14, stroke:'var(--indigo)'})} Misconception velocity · last 8 weeks</h3>
            <span className="tag tag--ok">decay rate −12% / week</span>
          </div>
          <div style={{padding:'20px 22px'}}>
            <VelocityChart/>
          </div>
        </div>
      </div>
    </>
  );
}

function VelocityChart() {
  const series = [
    { l:'Eksponen negatif',  v:[34,32,30,28,26,25,24,23], c:'#E26F6F'},
    { l:'Invers 2×2',        v:[26,26,24,22,21,20,19,18], c:'#C98A17'},
    { l:'Determinan',        v:[18,17,16,14,13,12,11,11], c:'#5B5BF7'},
    { l:'Polinom',           v:[14,12,11,10,9,8,8,8],    c:'#8A4FFF'},
  ];
  const W = 1200, H = 200, P = 30;
  const x = i => P + (W - P*2) * (i / 7);
  const y = v => H - P - (H - P*2) * (v / 40);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%', height:'auto', display:'block'}}>
        {[0,10,20,30,40].map(t => (
          <g key={t}>
            <line x1={P} x2={W-P} y1={y(t)} y2={y(t)} stroke="rgba(20,20,26,.06)"/>
            <text x={P-8} y={y(t)+4} textAnchor="end" fontFamily="var(--f-mono)" fontSize="10" fill="rgba(20,20,26,.4)">{t}</text>
          </g>
        ))}
        {series.map((s,si) => (
          <g key={s.l}>
            <path d={s.v.map((v,i)=>`${i?'L':'M'} ${x(i)} ${y(v)}`).join(' ')} stroke={s.c} strokeWidth="2.2" fill="none"/>
            {s.v.map((v,i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={s.c}/>)}
            <text x={x(7)+10} y={y(s.v[7])+4} fontFamily="var(--f-mono)" fontSize="10" fill={s.c}>{s.v[7]}</text>
          </g>
        ))}
        {['W−7','W−6','W−5','W−4','W−3','W−2','W−1','this'].map((l,i) => (
          <text key={l} x={x(i)} y={H-10} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="10" fill="rgba(20,20,26,.4)">{l}</text>
        ))}
      </svg>
      <div style={{display:'flex', gap:18, marginTop:8, fontSize:12, flexWrap:'wrap'}}>
        {series.map(s => (
          <span key={s.l} style={{display:'flex', alignItems:'center', gap:6}}>
            <span style={{width:10, height:10, borderRadius:999, background:s.c}}/> {s.l}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HeatmapPage, VelocityChart });
