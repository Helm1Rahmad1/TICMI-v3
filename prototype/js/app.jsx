// APP ROUTER — desktop shell + responsive mobile shell
const ROUTES = {
  landing:  { crumb: ['TICMI'], full: true },
  teacher:  { crumb: ['Workspace','Dashboard'] },
  classes:  { crumb: ['Workspace','Classes'] },
  upload:   { crumb: ['Workspace','Materials','Upload'] },
  assign:   { crumb: ['Workspace','Assignments'] },
  heatmap:  { crumb: ['Intelligence','Heatmap'] },
  concept:  { crumb: ['Intelligence','Concept map'] },
  agents:   { crumb: ['Intelligence','AI Agents'] },
  student:  { crumb: ['Learner','Student home'] },
  teach:    { crumb: ['Learner','Teach-Me'] },
  mobile:   { crumb: ['Learner','Mobile · PWA'] },
  me:       { crumb: ['Learner','You'] },
};

function useIsMobile(bp = 820) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(`(max-width:${bp}px)`).matches;
  const [m, setM] = React.useState(get);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const h = e => setM(e.matches);
    mq.addEventListener ? mq.addEventListener('change', h) : mq.addListener(h);
    return () => mq.removeEventListener ? mq.removeEventListener('change', h) : mq.removeListener(h);
  }, [bp]);
  return m;
}

function App() {
  const initial = location.hash.replace('#','') || 'landing';
  const [route, setRoute] = React.useState(initial && ROUTES[initial] ? initial : 'landing');
  const [role, setRole]   = React.useState('teacher');
  const [lang, setLang]   = React.useState('id');

  const go = (r) => {
    setRoute(r);
    location.hash = r;
    window.scrollTo({ top:0, behavior:'instant' });
    if (r === 'teach' || r === 'student' || r === 'mobile' || r === 'me') setRole('student');
    else setRole('teacher');
  };
  window.__go = go;

  React.useEffect(() => {
    const onHash = () => {
      const r = location.hash.replace('#','') || 'landing';
      if (ROUTES[r]) setRoute(r);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Landing on mobile gets its own native experience
  if (route === 'landing') {
    return (
      <LangCtx.Provider value={lang}>
        <MobileLanding go={go} lang={lang} setLang={setLang}/>
      </LangCtx.Provider>
    );
  }

  // ===== MOBILE =====
  return (
    <LangCtx.Provider value={lang}>
      <MobileResponsiveApp route={route} go={go} role={role} setRole={setRole} lang={lang} setLang={setLang}/>
    </LangCtx.Provider>
  );
}

// ============================================
// RESPONSIVE MOBILE APP
// ============================================
function MobileResponsiveApp({ route, go, role, setRole, lang, setLang }) {
  const isTeacher = role === 'teacher';

  // route → active tab (5 slots)
  const tabOf = (r) => {
    if (r==='teacher' || r==='student') return 'home';
    if (r==='classes') return 'class';
    if (r==='teach')   return 'teach';
    if (r==='concept' || r==='heatmap' || r==='map') return 'map';
    if (r==='me')      return 'me';
    return null; // off-nav routes
  };
  const tab = tabOf(route);

  // tab → navigate to route (role-aware)
  const navTo = isTeacher ? {
    home:'teacher', class:'classes', teach:'teach', map:'heatmap', me:'me'
  } : {
    home:'student', class:'classes', teach:'teach', map:'concept', me:'me'
  };

  // role switch → also navigate home
  const switchRole = (r) => {
    setRole(r);
    go(r === 'teacher' ? 'teacher' : 'student');
  };

  return (
    <div style={{
      position:'relative',
      height:'100vh', maxHeight:'100vh', overflow:'hidden',
      background:'var(--bg)',
    }}>
      <MobileAppBar role={role} setRole={switchRole} route={route} go={go} lang={lang} setLang={setLang}/>
      <div style={{
        position:'absolute', inset:0,
        overflowY:'auto', overflowX:'hidden',
        WebkitOverflowScrolling:'touch'
      }}>
        <MobileRoute route={route} go={go} role={role}/>
      </div>
      {tab && <BottomNav mode={isTeacher?'teacher':'student'} active={tab} onNav={k => go(navTo[k] || 'student')}/>}
    </div>
  );
}

function MobileAppBar({ role, setRole, go, lang, setLang }) {
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, zIndex:30,
      height:54, padding:'0 12px',
      display:'flex', alignItems:'center', gap:8,
      background:'rgba(247,246,242,.85)',
      backdropFilter:'saturate(1.4) blur(12px)',
      borderBottom:'1px solid rgba(20,20,26,.06)'
    }}>
      <a onClick={(e)=>{e.preventDefault(); go('landing');}} style={{display:'flex', alignItems:'center', gap:6, cursor:'pointer'}}>
        <div className="brand-mark" style={{width:24, height:24, borderRadius:7}}/>
        <span style={{fontFamily:'var(--f-mono)', fontWeight:600, fontSize:12.5, letterSpacing:'.12em'}}>
          TIC<em style={{fontStyle:'normal', background:'var(--grad)', WebkitBackgroundClip:'text', color:'transparent'}}>MI</em>
        </span>
      </a>
      <div style={{flex:1}}/>
      {/* lang toggle */}
      <div style={{
        display:'inline-flex', padding:2, background:'#fff',
        border:'1px solid var(--line)', borderRadius:999, fontSize:11
      }}>
        {['id','en'].map(l => (
          <button key={l} onClick={()=>setLang(l)} style={{
            padding:'3px 9px', borderRadius:999, border:0,
            background: lang===l ? 'var(--indigo)' : 'transparent',
            color: lang===l ? '#fff' : 'var(--muted)',
            fontWeight:600, cursor:'pointer', fontFamily:'var(--f-mono)', fontSize:11,
            letterSpacing:'.06em', textTransform:'uppercase'
          }}>{l}</button>
        ))}
      </div>
      {/* role pill */}
      <div style={{
        display:'inline-flex', padding:2, background:'#fff',
        border:'1px solid var(--line)', borderRadius:999, fontSize:11.5
      }}>
        {['teacher','student'].map(r => (
          <button key={r} onClick={()=>setRole(r)} style={{
            padding:'3px 9px', borderRadius:999, border:0,
            background: role===r ? 'var(--ink)' : 'transparent',
            color: role===r ? '#fff' : 'var(--muted)',
            fontWeight: role===r?600:500,
            cursor:'pointer'
          }}>{r==='teacher'?'Guru':'Siswa'}</button>
        ))}
      </div>
      <button className="icon-btn" style={{width:34, height:34, borderRadius:11, position:'relative'}} aria-label="notifikasi">
        {I.bell({size:14})}
        <span style={{position:'absolute', top:7, right:7, width:6, height:6, borderRadius:999, background:'var(--err)'}}/>
      </button>
    </div>
  );
}

function MobileRoute({ route, go, role }) {
  // TEACHER screens
  if (role === 'teacher') {
    if (route === 'teacher' || route === 'student')        return <TeacherMobileHome go={go}/>;
    if (route === 'classes')                                return <TeacherMobileClasses go={go}/>;
    if (route === 'heatmap' || route === 'concept')         return <TeacherMobileHeatmap go={go}/>;
    if (route === 'me')                                     return <TeacherMobileMe go={go}/>;
    if (route === 'teach')                                  return <ScreenTeach go={go} full/>;
    if (route === 'assign')                                 return <ScreenAssignment/>;
    if (route === 'agents')                                 return <ScreenAIChat/>;
    if (route === 'upload')                                 return <MobileUploadScreen go={go}/>;
    if (route === 'mobile')                                 return <TeacherMobileHome go={go}/>;
    return <TeacherMobileHome go={go}/>;
  }
  // STUDENT screens
  if (route === 'student' || route === 'teacher')  return <ScreenHome go={go}/>;
  if (route === 'classes')  return <ScreenClass go={go}/>;
  if (route === 'teach')    return <ScreenTeach go={go} full/>;
  if (route === 'concept' || route === 'heatmap')  return <ScreenMap go={go} full/>;
  if (route === 'me')       return <ScreenMe go={go}/>;
  if (route === 'assign')   return <ScreenAssignment/>;
  if (route === 'agents')   return <ScreenAIChat/>;
  if (route === 'upload')   return <MobileUploadScreen go={go}/>;
  if (route === 'mobile')   return <ScreenHome go={go}/>;
  return <ScreenHome go={go}/>;
}

// Mobile-friendly upload screen
function MobileUploadScreen({ go }) {
  return (
    <div style={{paddingTop:54, paddingBottom:110, minHeight:'100vh'}}>
      <div style={{padding:'10px 22px 8px'}}>
        <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em', color:'var(--muted)', textTransform:'uppercase'}}>MATERIALS · INTAKE</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:28, lineHeight:1.05, marginTop:4, letterSpacing:'-.01em'}}>Upload <em>bahan ajar.</em></div>
      </div>
      <div style={{padding:'8px 22px'}}>
        <div style={{
          padding:'28px 18px', borderRadius:20,
          border:'1.5px dashed var(--line)',
          background:'linear-gradient(180deg, #fff, var(--bg-2))',
          textAlign:'center'
        }}>
          <div style={{
            width:60, height:60, borderRadius:18, margin:'0 auto',
            background:'var(--grad)', display:'grid', placeItems:'center',
            boxShadow:'0 12px 28px -8px rgba(91,91,247,.5)'
          }}>{I.upload({size:24, stroke:'#fff', sw:2})}</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:20, marginTop:14, lineHeight:1.2}}>Tarik file ke sini</div>
          <div style={{fontSize:12, color:'var(--muted)', marginTop:6}}>PDF · foto · RPP · worksheet</div>
          <button style={{
            marginTop:16, padding:'12px 20px', borderRadius:12, border:0,
            background:'var(--ink)', color:'#fff', fontWeight:600, fontSize:13
          }}>Choose file</button>
        </div>
      </div>
      <div style={{padding:'18px 22px 4px'}}>
        <div style={{fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'.1em', color:'var(--muted)', marginBottom:10}}>RECENT</div>
        {[
          { t:'BAB-3 Matriks invers · RPP', sub:'14 pages · analyzed · 12 concepts', s:'ok'},
          { t:'Worksheet eksponen #2',      sub:'4 pages · analyzing 78%',         s:'go'},
          { t:'Whiteboard photo · SPL',     sub:'2 images · queued',               s:'wait'},
        ].map((r,i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap:12, padding:'14px',
            borderRadius:14, background:'#fff', border:'1px solid var(--line)', marginBottom:8
          }}>
            <div style={{width:34, height:42, background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:6, fontFamily:'var(--f-mono)', fontSize:8, fontWeight:700, color:'var(--err)', display:'grid', placeItems:'center', flexShrink:0}}>PDF</div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontWeight:500, fontSize:13.5, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{r.t}</div>
              <div style={{fontSize:11.5, color:'var(--muted)', marginTop:3}}>{r.sub}</div>
            </div>
            {r.s==='ok'   && <span className="tag tag--ok" style={{fontSize:10}}>done</span>}
            {r.s==='go'   && <span className="tag tag--ind" style={{fontSize:10}}>78%</span>}
            {r.s==='wait' && <span className="tag" style={{fontSize:10}}>queued</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

window.MobileUploadScreen = MobileUploadScreen;

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
