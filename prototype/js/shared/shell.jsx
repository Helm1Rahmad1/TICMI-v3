// Shell: sidebar + topbar shared across teacher app
const NAV = [
  { group: 'Workspace', items: [
    { id: 'teacher',  label: 'Dashboard',   ico: 'home',  role: 'teacher' },
    { id: 'classes',  label: 'My Classes',  ico: 'layers',role: 'teacher', pill: '4' },
    { id: 'upload',   label: 'Materials',   ico: 'file',  role: 'teacher' },
    { id: 'assign',   label: 'Assignments', ico: 'book',  role: 'teacher' },
  ]},
  { group: 'Intelligence', items: [
    { id: 'heatmap',  label: 'Heatmap',     ico: 'grid',  role: 'teacher' },
    { id: 'concept',  label: 'Concept Map', ico: 'graph', role: 'teacher' },
    { id: 'agents',   label: 'AI Agents',   ico: 'brain', role: 'teacher', pill: 'NEW' },
  ]},
  { group: 'Learner', items: [
    { id: 'student',  label: 'Student Home',ico: 'star',  role: 'student' },
    { id: 'teach',    label: 'Teach-Me',    ico: 'zap',   role: 'student', pillAlert: '1' },
    { id: 'mobile',   label: 'Mobile / PWA',ico: 'device',role: 'student' },
  ]},
];

function Brand() {
  return (
    <a className="brand" href="#" onClick={(e)=>{e.preventDefault(); window.__go('landing');}}>
      <div className="brand-mark"></div>
      <div>
        <div className="brand-name">TIC<em>MI</em></div>
        <div className="brand-tag">v0.9 · adaptive</div>
      </div>
    </a>
  );
}

function Sidebar({ route, go }) {
  return (
    <aside className="sidebar">
      <Brand/>
      {NAV.map(g => (
        <div className="nav-group" key={g.group}>
          <div className="nav-label">{g.group}</div>
          {g.items.map(it => (
            <a key={it.id} href="#" className={"nav-item" + (route === it.id ? ' is-active' : '')}
               onClick={(e)=>{e.preventDefault(); go(it.id);}}>
              <span className="ico">{I[it.ico]({size:16})}</span>
              {it.label}
              {it.pill && <span className="pill">{it.pill}</span>}
              {it.pillAlert && <span className="pill pill--alert">{it.pillAlert}</span>}
            </a>
          ))}
        </div>
      ))}
      <div className="sb-foot">
        <div className="avatar">RW</div>
        <div style={{lineHeight:1.2}}>
          <div style={{fontWeight:500}}>Rini Wulandari</div>
          <div style={{fontSize:11, color:'var(--muted)'}}>SMA 8 Jakarta · Math</div>
        </div>
        <button className="icon-btn" style={{marginLeft:'auto', width:28, height:28}} aria-label="settings">
          {I.cog({size:14})}
        </button>
      </div>
    </aside>
  );
}

function Topbar({ crumb, right, role='teacher', onSwitchRole }) {
  return (
    <header className="topbar">
      <div className="tb-crumb">
        {crumb.map((c,i)=>(
          <span key={i}>
            {i>0 && <span style={{margin:'0 8px', color:'var(--muted-2)'}}>/</span>}
            {i===crumb.length-1 ? <b>{c}</b> : c}
          </span>
        ))}
      </div>
      <div className="tb-spacer"/>
      <div className="search">
        {I.search({size:14})}
        <span>Search classes, students, concepts…</span>
        <kbd>⌘K</kbd>
      </div>
      <div className="tabs" style={{padding:3}}>
        <button className={"tab" + (role==='teacher'?' is-active':'')} onClick={()=>onSwitchRole && onSwitchRole('teacher')}>Teacher</button>
        <button className={"tab" + (role==='student'?' is-active':'')} onClick={()=>onSwitchRole && onSwitchRole('student')}>Student</button>
      </div>
      <button className="icon-btn" style={{position:'relative'}} aria-label="notifications">
        {I.bell({size:16})}
        <span className="dot"/>
      </button>
      {right}
    </header>
  );
}

function Shell({ route, go, role, setRole, crumb, children, headRight }) {
  return (
    <div className="app">
      <Sidebar route={route} go={go}/>
      <main style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
        <Topbar crumb={crumb} right={headRight} role={role} onSwitchRole={setRole}/>
        <div className="work page-fade" key={route}>{children}</div>
      </main>
    </div>
  );
}

Object.assign(window, { Shell, Sidebar, Topbar, Brand, NAV });
