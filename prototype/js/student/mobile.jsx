/* ============================================
   TICMI Mobile — native-feeling PWA experience
   ============================================ */

const PHONE_W = 390, PHONE_H = 844;

/* ---------- iPhone frame primitives ---------- */
function IPhoneFrame({ children, label, dark=false, tone }) {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:14}}>
      <div style={{
        width: PHONE_W, height: PHONE_H,
        background: dark ? '#0A0A0E' : '#FFFFFF',
        borderRadius: 54,
        padding: 12,
        position: 'relative',
        boxShadow: '0 50px 100px -40px rgba(20,20,26,.45), 0 16px 32px -16px rgba(20,20,26,.18), inset 0 0 0 2px #1A1A22, inset 0 0 0 5px #2A2A33',
      }}>
        {/* side buttons */}
        <span style={{position:'absolute', left:-3, top:130, width:3, height:34, background:'#1A1A22', borderRadius:'2px 0 0 2px'}}/>
        <span style={{position:'absolute', left:-3, top:200, width:3, height:60, background:'#1A1A22', borderRadius:'2px 0 0 2px'}}/>
        <span style={{position:'absolute', left:-3, top:270, width:3, height:60, background:'#1A1A22', borderRadius:'2px 0 0 2px'}}/>
        <span style={{position:'absolute', right:-3, top:180, width:3, height:90, background:'#1A1A22', borderRadius:'0 2px 2px 0'}}/>

        <div style={{
          width:'100%', height:'100%',
          borderRadius: 42, overflow:'hidden',
          background: tone || (dark ? '#0A0A0E' : '#FFFFFF'),
          position: 'relative'
        }}>
          {children}
        </div>
      </div>
      {label && (
        <div style={{
          fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em',
          color:'var(--muted)', textTransform:'uppercase'
        }}>{label}</div>
      )}
    </div>
  );
}

function StatusBar({ dark=false, time='9:41' }) {
  const c = dark ? '#fff' : '#14141A';
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, zIndex:50,
      height:54, padding:'18px 28px 0', display:'flex',
      alignItems:'flex-start', justifyContent:'space-between',
      color: c, pointerEvents:'none'
    }}>
      <div style={{fontFamily:'-apple-system, "SF Pro Text", system-ui', fontSize:15, fontWeight:600}}>{time}</div>
      {/* Dynamic Island */}
      <div style={{
        position:'absolute', left:'50%', top:11, transform:'translateX(-50%)',
        width:120, height:34, background:'#000', borderRadius:999
      }}/>
      <div style={{display:'flex', alignItems:'center', gap:6}}>
        {/* signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0"  y="7" width="3" height="4" rx="1"/>
          <rect x="4.5" y="5" width="3" height="6" rx="1"/>
          <rect x="9"  y="3" width="3" height="8" rx="1"/>
          <rect x="13.5" y="0" width="3" height="11" rx="1" opacity=".5"/>
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.4 6.5a6.5 6.5 0 0 1 9.2 0l1.2-1.2a8.2 8.2 0 0 0-11.6 0L3.4 6.5zM.7 3.7a10.4 10.4 0 0 1 14.6 0L16.5 2.5a12.1 12.1 0 0 0-17 0L.7 3.7z"/>
        </svg>
        {/* battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x=".5" y=".5" width="22" height="11" rx="3" stroke={c} opacity=".5"/>
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={c}/>
          <rect x="23.5" y="3.5" width="1.5" height="5" rx=".5" fill={c} opacity=".5"/>
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator({ dark=false }) {
  return (
    <div style={{
      position:'absolute', bottom:8, left:0, right:0,
      display:'flex', justifyContent:'center', pointerEvents:'none', zIndex:50
    }}>
      <div style={{width:134, height:5, borderRadius:999, background: dark? '#fff':'#14141A', opacity:.85}}/>
    </div>
  );
}

function BottomNav({ active='home', onNav, mode='student' }) {
  const t = useT();
  const itemsStudent = [
    { k:'home',  l:t('Beranda','Home'),  i:'home'},
    { k:'class', l:t('Kelas','Class'),   i:'layers'},
    { k:'teach', l:t('Ajar','Teach'),    i:'zap', fab:true},
    { k:'map',   l:t('Peta','Map'),      i:'graph'},
    { k:'me',    l:t('Kamu','You'),      i:'star'},
  ];
  const itemsTeacher = [
    { k:'home',  l:t('Beranda','Home'),    i:'home'},
    { k:'class', l:t('Kelas','Class'),     i:'layers'},
    { k:'teach', l:t('Ajar','Teach'),      i:'zap', fab:true},
    { k:'map',   l:'Heatmap',              i:'grid'},
    { k:'me',    l:t('Profil','Profile'),  i:'cog'},
  ];
  const items = mode==='teacher' ? itemsTeacher : itemsStudent;
  return (
    <div style={{
      position:'absolute', left:0, right:0, bottom:0, zIndex:40,
      paddingBottom: 28, paddingTop: 8,
      background:'rgba(255,255,255,.85)',
      backdropFilter:'saturate(1.4) blur(20px)',
      borderTop:'1px solid rgba(20,20,26,.06)',
      display:'flex', justifyContent:'space-around', alignItems:'flex-end'
    }}>
      {items.map(it => {
        if (it.fab) return (
          <div key={it.k} style={{
            transform:'translateY(-22px)',
            display:'flex', flexDirection:'column', alignItems:'center', gap:4
          }} onClick={()=>onNav&&onNav(it.k)}>
            <div style={{
              width:56, height:56, borderRadius:18,
              background:'var(--grad)', display:'grid', placeItems:'center',
              boxShadow:'0 12px 28px -8px rgba(91,91,247,.55), 0 4px 10px -2px rgba(91,91,247,.4)',
              color:'#fff'
            }}>{I[it.i]({size:24, stroke:'#fff', sw:2})}</div>
            <div style={{fontSize:10, fontWeight:600, color:'var(--ink)'}}>{it.l}</div>
          </div>
        );
        const on = active === it.k;
        return (
          <div key={it.k} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:4,
            padding:'4px 12px', minWidth:54
          }} onClick={()=>onNav&&onNav(it.k)}>
            {I[it.i]({size:22, stroke: on?'var(--indigo)':'rgba(20,20,26,.45)', sw: on?2:1.8})}
            <div style={{fontSize:10, fontWeight: on?600:500, color: on?'var(--indigo)':'rgba(20,20,26,.45)'}}>{it.l}</div>
          </div>
        );
      })}
    </div>
  );
}

function ScreenHead({ title, sub, right, dark=false }) {
  return (
    <div style={{padding:'10px 22px 8px', display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}>
      <div>
        {sub && <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em', color: dark?'rgba(255,255,255,.55)':'var(--muted)', textTransform:'uppercase'}}>{sub}</div>}
        <div style={{fontFamily:'var(--f-serif)', fontSize:30, lineHeight:1.05, marginTop:4, letterSpacing:'-.01em', color: dark?'#fff':'var(--ink)'}}>{title}</div>
      </div>
      {right}
    </div>
  );
}

/* ============================================
   MAIN PAGE
   ============================================ */
function MobilePage({ go }) {
  const [activeScreen, setActiveScreen] = React.useState('home');

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><span className="dot"/>Mobile-first PWA · installable</div>
          <h1 className="page-title">TICMI <em>on the phone.</em></h1>
          <div className="page-sub">Rebuilt from scratch for thumbs — bottom nav, sheet modals, swipeable cards, and a FAB for Teach-Me one tap away.</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn--sm">{I.copy({size:13})} Share invite</button>
          <button className="btn btn--sm btn--primary" onClick={()=>{
            alert("Add to Home Screen from your browser's share menu to install TICMI as a PWA.");
          }}>{I.download({size:13})} Install on phone</button>
        </div>
      </div>

      {/* Install banner */}
      <InstallBanner/>

      {/* HERO — interactive phone */}
      <div style={{
        margin:'0 0 32px', padding:'40px 32px 50px',
        background:'radial-gradient(circle at 20% 20%, rgba(91,91,247,.10), transparent 50%), radial-gradient(circle at 80% 70%, rgba(138,79,255,.10), transparent 50%), var(--bg-2)',
        borderRadius: 24, border:'1px solid var(--line)',
        display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:36, alignItems:'center'
      }}>
        <div>
          <div className="eyebrow"><span className="dot"/>Live · interactive</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:38, lineHeight:1.05, marginTop:10, letterSpacing:'-.01em'}}>
            Tap the bottom nav.<br/><em>Switch screens like a real app.</em>
          </div>
          <p style={{color:'var(--muted)', fontSize:14, marginTop:12, lineHeight:1.55, maxWidth:380}}>
            This is a live React mockup running inside the iPhone frame — not a video. Every screen below is also tappable.
          </p>
          <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:18}}>
            {[
              {k:'home',  l:'Home'},
              {k:'class', l:'Class feed'},
              {k:'teach', l:'Teach-Me'},
              {k:'map',   l:'Concept map'},
              {k:'me',    l:'You'},
            ].map(t => (
              <button key={t.k}
                className={"btn btn--sm" + (activeScreen===t.k?' btn--primary':'')}
                onClick={()=>setActiveScreen(t.k)}>{t.l}</button>
            ))}
          </div>
        </div>

        <IPhoneFrame>
          <StatusBar/>
          {activeScreen==='home'  && <ScreenHome  go={go}/>}
          {activeScreen==='class' && <ScreenClass go={go}/>}
          {activeScreen==='teach' && <ScreenTeach go={go}/>}
          {activeScreen==='map'   && <ScreenMap   go={go}/>}
          {activeScreen==='me'    && <ScreenMe    go={go}/>}
          <BottomNav active={activeScreen} onNav={setActiveScreen}/>
          <HomeIndicator/>
        </IPhoneFrame>

        <div>
          <div className="eyebrow"><span className="dot"/>Mobile-first system</div>
          <div style={{display:'flex', flexDirection:'column', gap:12, marginTop:14}}>
            {[
              ['Bottom nav · 5 tabs', 'Thumb-zone reachable. Teach-Me FAB centered.'],
              ['Sheet modals',        'Slide up from the bottom · no full-page navigation.'],
              ['Pull-to-refresh',     'Native gesture on every list.'],
              ['Haptic mocks',        'Subtle scale on tap · transitions under 200ms.'],
              ['Safe areas',          'Respects notch / island and home indicator.'],
              ['Offline first',       'Cached Teach-Me sessions complete on no signal.'],
            ].map(([h,b]) => (
              <div key={h} style={{display:'flex', gap:12}}>
                <span style={{width:6, height:6, borderRadius:999, background:'var(--indigo)', marginTop:8, flexShrink:0, boxShadow:'0 0 0 4px rgba(91,91,247,.16)'}}/>
                <div>
                  <div style={{fontWeight:600, fontSize:13.5}}>{h}</div>
                  <div style={{fontSize:12.5, color:'var(--muted)', marginTop:2, lineHeight:1.5}}>{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery: every screen */}
      <div style={{
        marginBottom: 18, display:'flex', alignItems:'flex-end', justifyContent:'space-between'
      }}>
        <div>
          <div className="eyebrow"><span className="dot"/>Full app · 8 screens</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:32, marginTop:6}}>The whole app, thumb-sized.</div>
        </div>
        <div style={{color:'var(--muted)', fontSize:13, maxWidth:380, lineHeight:1.5}}>
          Each screen is a working React component. Scroll horizontally — long-press to inspect.
        </div>
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(420px,1fr))',
        gap:42, justifyItems:'center', padding:'10px 0 30px'
      }}>
        <IPhoneFrame label="Lock screen · push notifications">
          <ScreenLock/>
        </IPhoneFrame>

        <IPhoneFrame label="Install prompt · A2HS sheet">
          <ScreenInstallPrompt/>
        </IPhoneFrame>

        <IPhoneFrame label="Onboarding · join your class">
          <ScreenOnboarding/>
        </IPhoneFrame>

        <IPhoneFrame label="Teach-Me · immersive chat">
          <ScreenTeach full/>
          <BottomNav active="teach"/>
          <HomeIndicator/>
        </IPhoneFrame>

        <IPhoneFrame label="Assignment · adaptive quiz">
          <ScreenAssignment/>
          <HomeIndicator/>
        </IPhoneFrame>

        <IPhoneFrame label="AI chat sheet · ask anything">
          <ScreenAIChat/>
        </IPhoneFrame>

        <IPhoneFrame label="Concept map · pinch to zoom" tone="#0A0A0E" dark>
          <ScreenMap full dark/>
          <BottomNav active="map"/>
          <HomeIndicator dark/>
        </IPhoneFrame>

        <IPhoneFrame label="Streak celebrate · daily complete">
          <ScreenStreakCelebrate/>
        </IPhoneFrame>
      </div>

      {/* Native behavior */}
      <NativeBehaviorRow/>
    </>
  );
}

/* ============================================
   SCREENS
   ============================================ */

/* ---- HOME ---- */
function ScreenHome({ go }) {
  const t = useT();
  return (
    <div style={{paddingTop:54, paddingBottom:110, height:'100%', overflow:'auto'}}>
      <ScreenHead title="Halo, Devin" sub={t('SEL 26 MEI · HARI KE-18 🔥','TUE 26 MAY · DAY 18 🔥')}
        right={<div className="avatar avatar--green" style={{width:38, height:38, fontSize:13}}>D</div>}/>

      {/* daily ring */}
      <div style={{padding:'14px 22px 6px'}}>
        <div style={{
          padding:'18px 18px', borderRadius:22,
          background:'linear-gradient(135deg, #5B5BF7, #8A4FFF)',
          color:'#fff', position:'relative', overflow:'hidden',
          boxShadow:'0 14px 32px -10px rgba(91,91,247,.5)'
        }}>
          <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 80% 20%, rgba(255,255,255,.28), transparent 50%)'}}/>
          <div style={{position:'relative', display:'flex', alignItems:'center', gap:16}}>
            <div style={{position:'relative', width:78, height:78, flexShrink:0}}>
              <svg viewBox="0 0 80 80" style={{position:'absolute', inset:0, transform:'rotate(-90deg)'}}>
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="6"/>
                <circle cx="40" cy="40" r="34" fill="none" stroke="#fff" strokeWidth="6"
                        strokeLinecap="round" strokeDasharray={`${2*Math.PI*34*.62} ${2*Math.PI*34}`}/>
              </svg>
              <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center'}}>
                <div style={{textAlign:'center'}}>
                  <div style={{fontFamily:'var(--f-serif)', fontSize:24, lineHeight:1}}>62%</div>
                  <div style={{fontFamily:'var(--f-mono)', fontSize:8, opacity:.75, letterSpacing:'.08em'}}>MASTERED</div>
                </div>
              </div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--f-mono)', fontSize:9.5, opacity:.85, letterSpacing:'.1em'}}>{t('LANJUT TEACH-ME','CONTINUE TEACH-ME')}</div>
              <div style={{fontFamily:'var(--f-serif)', fontSize:18, lineHeight:1.2, marginTop:4}}>
                {t('Eksponen negatif → resiprokal','Negative exponents → reciprocal')}
              </div>
              <div style={{fontSize:11.5, opacity:.85, marginTop:6}}>{t('Kiko butuh satu contoh lagi.','Kiko needs one more example.')}</div>
            </div>
          </div>
          <button style={{
            marginTop:14, width:'100%', padding:'12px 14px',
            background:'rgba(255,255,255,.96)', color:'#5B5BF7',
            borderRadius:14, border:0, fontWeight:600, fontSize:14,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8
          }}>{t('Lanjutkan sesi','Resume session')} {I.arrow({size:14, stroke:'#5B5BF7'})}</button>
        </div>
      </div>

      {/* streak strip */}
      <div style={{padding:'16px 22px 4px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <div style={{fontWeight:600, fontSize:14}}>{t('Minggu ini','This week')}</div>
          <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--muted)'}}>{t('5 / 7 hari','5 / 7 days')}</div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6}}>
          {['M','T','W','T','F','S','S'].map((d,i) => {
            const done = i<5;
            const today = i===4;
            return (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{
                  height:44, borderRadius:14,
                  background: done ? 'linear-gradient(180deg, rgba(91,91,247,.18), rgba(138,79,255,.10))' : 'var(--bg-2)',
                  border:'1px solid '+(today?'var(--indigo)':'var(--line)'),
                  display:'grid', placeItems:'center',
                  position:'relative'
                }}>
                  {done && <span style={{fontSize:20}}>🔥</span>}
                  {today && <span style={{position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:6, height:6, borderRadius:999, background:'var(--indigo)'}}/>}
                </div>
                <div style={{fontFamily:'var(--f-mono)', fontSize:10, color: today?'var(--indigo)':'var(--muted)', marginTop:6, fontWeight: today?600:400}}>{d}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Missions */}
      <div style={{padding:'18px 22px 6px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <div style={{fontWeight:600, fontSize:14}}>{t('Misi hari ini','Today\'s missions')}</div>
          <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, color:'var(--muted)'}}>3 / 5</div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {[
            { d:true,  t:'Review eksponen positif', x:'+40 XP'},
            { d:true,  t:'Quiz matriks 2×2',       x:'+120 XP'},
            { d:false, t:'Teach Kiko · neg. exp.', x:'+180 XP', hot:true},
            { d:false, t:'Apply · 3 word problems', x:'+90 XP'},
            { d:false, t:'Pair-teach with Hesti',   x:'+60 XP'},
          ].map((r,i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:12, padding:'14px',
              border:'1px solid '+(r.hot?'rgba(91,91,247,.35)':'var(--line)'),
              borderRadius:16, background: r.hot?'linear-gradient(180deg, rgba(91,91,247,.04), #fff)':'#fff',
              minHeight:52
            }}>
              <span style={{
                width:28, height:28, borderRadius:999, display:'grid', placeItems:'center', flexShrink:0,
                background: r.d ? 'var(--ok-bg)' : r.hot ? 'rgba(91,91,247,.10)' : 'var(--bg-2)',
                border:'1px solid '+(r.d?'transparent':r.hot?'rgba(91,91,247,.25)':'var(--line)')
              }}>
                {r.d
                  ? I.check({size:14, stroke:'var(--ok)', sw:2.4})
                  : r.hot
                  ? I.zap({size:14, stroke:'var(--indigo)', sw:2})
                  : <span style={{width:6,height:6,borderRadius:999,background:'var(--muted-2)'}}/>}
              </span>
              <div style={{flex:1, fontSize:14, fontWeight:r.hot?600:r.d?400:500, textDecoration:r.d?'line-through':'none', color:r.d?'var(--muted)':'var(--ink)'}}>{r.t}</div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:11, color: r.hot?'var(--indigo)':'var(--muted)', fontWeight:600}}>{r.x}</div>
            </div>
          ))}
        </div>
      </div>

      {/* card pair */}
      <div style={{padding:'16px 22px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <div style={{padding:'14px 14px', border:'1px solid var(--line)', borderRadius:16, background:'#fff'}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            {I.flame({size:18, stroke:'var(--warn)'})}
            <span style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em'}}>STREAK</span>
          </div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:30, marginTop:6, lineHeight:1}}>18 <span style={{fontSize:13, color:'var(--muted)'}}>{t('hari','days')}</span></div>
        </div>
        <div style={{padding:'14px 14px', border:'1px solid var(--line)', borderRadius:16, background:'#fff'}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            {I.bolt({size:18, stroke:'var(--indigo)'})}
            <span style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em'}}>{t('XP HARI INI','XP TODAY')}</span>
          </div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:30, marginTop:6, lineHeight:1}}>320</div>
        </div>
      </div>

      {/* AI suggestion sheet preview */}
      <div style={{padding:'4px 22px 30px'}}>
        <div style={{
          padding:'14px 16px', borderRadius:16,
          background:'linear-gradient(135deg, #14141A, #2A2A33)',
          color:'#fff', display:'flex', alignItems:'center', gap:12
        }}>
          <div style={{width:34, height:34, borderRadius:10, background:'var(--grad)', display:'grid', placeItems:'center', flexShrink:0}}>
            {I.brain({size:18, stroke:'#fff'})}
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:9.5, opacity:.65, letterSpacing:'.1em'}}>{t('AI UNTUKMU','AI FOR YOU')}</div>
            <div style={{fontSize:13, marginTop:3, lineHeight:1.4}}>{t('Hesti baru kuasai invers — pair-teach 10 mnt?','Hesti just mastered invers — pair-teach for 10 min?')}</div>
          </div>
          {I.arrow({size:16, stroke:'#fff'})}
        </div>
      </div>
    </div>
  );
}

/* ---- CLASS FEED ---- */
function ScreenClass({ go }) {
  const t = useT();
  return (
    <div style={{paddingTop:54, paddingBottom:110, height:'100%', overflow:'auto', background:'var(--bg-2)'}}>
      <ScreenHead title={t('Umpan kelas','Class stream')} sub={t('XII IPA 1 · MATEMATIKA','XII IPA 1 · MATH')}
        right={<button className="icon-btn" style={{width:38, height:38, borderRadius:12}}>{I.search({size:16})}</button>}/>

      <div style={{padding:'8px 22px 0'}}>
        <div style={{
          padding:'14px 16px', borderRadius:18,
          background:'linear-gradient(135deg, #5B5BF7, #8A4FFF)',
          color:'#fff', position:'relative', overflow:'hidden'
        }}>
          <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 80% 0%, rgba(255,255,255,.35), transparent 50%)'}}/>
          <div style={{position:'relative'}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:9.5, opacity:.85, letterSpacing:'.1em'}}>{t('BU RINI · KODE KELAS TIC-9M4K','BU RINI · CLASS CODE TIC-9M4K')}</div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:22, marginTop:4, lineHeight:1.1}}>{t('32 teman · kesehatan 88','32 classmates · 88 health')}</div>
          </div>
        </div>
      </div>

      <div style={{padding:'14px 22px 4px', display:'flex', gap:6, overflowX:'auto'}}>
        {t('Umpan,Tugas,Orang,File,Jadwal','Stream,Assignments,People,Files,Schedule').split(',').map((tab,i) => (
          <button key={t} style={{
            padding:'8px 14px', borderRadius:999,
            border:'1px solid '+(i===0?'var(--ink)':'var(--line)'),
            background: i===0?'var(--ink)':'#fff', color: i===0?'#fff':'var(--ink-2)',
            fontSize:12.5, fontWeight:500, whiteSpace:'nowrap'
          }}>{tab}</button>
        ))}
      </div>

      <div style={{padding:'12px 22px 30px', display:'flex', flexDirection:'column', gap:10}}>
        {[
          { who:'Bu Rini', av:'RW', avc:'slate', body:'Reminder: kuis matriks invers period 4. Datang tepat waktu ya.', t:'09:12', pin:true, attach:null},
          { who:'TICMI AI', av:null, avc:'ai', body:'I detected 38 wrong answers tracing back to negative exponents. Scheduled a 10-min warm-up for period 4.', t:'08:40', kind:'ai'},
          { who:'Bu Rini', av:'RW', avc:'slate', body:'Worksheet "Matriks invers 2×2" — due Friday 23:59.', t:'yesterday', attach:'worksheet'},
          { who:'Anisa R.', av:'AR', avc:'amber', body:'Bu, kalau det = 0 berarti tidak ada invers ya?', t:'yesterday', kind:'q', replies:4},
          { who:'Devin P.', av:'DP', avc:'green', body:'Ada yang mau pair-teach soal #4? Aku stuck di exponent.', t:'2d', replies:2},
        ].map((p,i) => (
          <div key={i} style={{
            padding:'14px', borderRadius:18, background:'#fff', border:'1px solid var(--line)',
            position:'relative'
          }}>
            {p.pin && <div style={{
              position:'absolute', top:-7, left:14, padding:'2px 8px',
              fontFamily:'var(--f-mono)', fontSize:9, letterSpacing:'.1em',
              background:'var(--ink)', color:'#fff', borderRadius:6
            }}>📌 PINNED</div>}
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              {p.kind==='ai' ? (
                <div style={{width:32, height:32, borderRadius:10, background:'var(--grad)', display:'grid', placeItems:'center', flexShrink:0}}>
                  {I.brain({size:16, stroke:'#fff'})}
                </div>
              ) : (
                <div className={"avatar avatar--"+p.avc} style={{width:32, height:32, fontSize:11}}>{p.av}</div>
              )}
              <div style={{flex:1}}>
                <div style={{fontWeight:600, fontSize:13}}>{p.who}</div>
                <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)'}}>{p.t}</div>
              </div>
              {p.kind==='ai' && <span className="tag tag--ind" style={{fontSize:9.5}}>AI insight</span>}
              {p.kind==='q'  && <span className="tag" style={{fontSize:9.5}}>question</span>}
            </div>
            <div style={{fontSize:13.5, marginTop:10, lineHeight:1.5}}>{p.body}</div>
            {p.attach==='worksheet' && (
              <div style={{marginTop:10, padding:'10px 12px', display:'flex', alignItems:'center', gap:10, background:'var(--bg-2)', borderRadius:10, border:'1px solid var(--line)'}}>
                <div style={{width:32, height:38, background:'#fff', border:'1px solid var(--line)', borderRadius:4, fontFamily:'var(--f-mono)', fontSize:8, fontWeight:700, color:'var(--err)', display:'grid', placeItems:'center'}}>PDF</div>
                <div style={{flex:1, fontSize:12}}>
                  <div style={{fontWeight:500}}>matriks-invers-2x2.pdf</div>
                  <div style={{color:'var(--muted)', fontFamily:'var(--f-mono)', fontSize:10}}>4 pages · 1.2 MB</div>
                </div>
              </div>
            )}
            {p.replies && (
              <div style={{marginTop:10, display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'var(--muted)'}}>
                <div style={{display:'flex'}}>
                  {[0,1].map(j => <div key={j} className="avatar avatar--sm" style={{marginLeft: j?-6:0, border:'2px solid #fff', width:18, height:18, fontSize:8}}>{['HM','BP'][j]}</div>)}
                </div>
                {p.replies} replies
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- TEACH-ME (mobile) ---- */
function ScreenTeach({ go, full }) {
  const t = useT();
  return (
    <div style={{
      paddingTop:54, paddingBottom: full?110:0, height:'100%', display:'flex', flexDirection:'column',
      background:'linear-gradient(180deg, #FBFAF7 0%, #fff 30%)'
    }}>
      {/* header bar */}
      <div style={{padding:'4px 16px 12px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid var(--line)'}}>
        <button className="icon-btn" style={{width:36, height:36, borderRadius:12}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="avatar avatar--slate" style={{width:36, height:36, fontSize:13, position:'relative'}}>
          K
          <span style={{position:'absolute', bottom:-2, right:-2, width:12, height:12, borderRadius:999, background:'var(--ok)', border:'2px solid #fff'}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:600, fontSize:14}}>Kiko</div>
          <div style={{fontSize:11, color:'var(--ok)', display:'flex', alignItems:'center', gap:4}}>
            <span style={{display:'flex', gap:2}}>
              {[0,1,2].map(i => <span key={i} style={{width:4, height:4, borderRadius:999, background:'var(--ok)', animation:`pulse-soft 1.2s ease ${i*.15}s infinite`}}/>)}
            </span>
            {t('berpikir…','thinking…')}
          </div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:'var(--f-mono)', fontSize:9, color:'var(--muted)', letterSpacing:'.08em'}}>{t('PENGUASAAN','MASTERY')}</div>
          <div style={{display:'flex', alignItems:'center', gap:6, marginTop:2}}>
            <div style={{width:46, height:6, background:'var(--line-2)', borderRadius:999, overflow:'hidden'}}>
              <div style={{width:'62%', height:'100%', background:'var(--grad)'}}/>
            </div>
            <span style={{fontFamily:'var(--f-mono)', fontSize:11, fontWeight:600}}>62</span>
          </div>
        </div>
      </div>

      {/* progress chip strip */}
      <div style={{padding:'10px 16px 4px', display:'flex', gap:6, overflowX:'auto'}}>
        {[
          { l:t('Resiprokal','Reciprocal'), s:'ok'},
          { l:t('Op. invers','Inverse op'), s:'ok'},
          { l:t('Umum n',   'General n'),  s:'cur'},
          { l:t('Eksp. nol','Zero exp.'),  s:'err'},
        ].map(c => (
          <div key={c.l} style={{
            padding:'5px 10px 5px 8px', borderRadius:999, fontSize:11, whiteSpace:'nowrap',
            background: c.s==='ok'?'var(--ok-bg)': c.s==='cur'?'rgba(91,91,247,.10)': c.s==='err'?'var(--err-bg)':'var(--bg-2)',
            color: c.s==='ok'?'var(--ok)': c.s==='cur'?'var(--indigo)': c.s==='err'?'var(--err)':'var(--muted)',
            display:'flex', alignItems:'center', gap:4, fontWeight:500
          }}>
            <span style={{width:6, height:6, borderRadius:999, background:'currentColor'}}/>
            {c.l}
          </div>
        ))}
      </div>

      {/* messages */}
      <div style={{flex:1, overflowY:'auto', padding:'14px 16px 12px', display:'flex', flexDirection:'column', gap:12}}>
        <div style={{textAlign:'center', fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em', margin:'4px 0'}}>
          {t('SESI DIMULAI 02:14 LALU','SESSION STARTED 02:14 AGO')}
        </div>

        <div style={{display:'flex', gap:8, alignItems:'flex-end'}}>
          <div className="avatar avatar--slate" style={{width:24, height:24, fontSize:10}}>K</div>
          <div style={{
            background:'#fff', border:'1px solid var(--line)', padding:'10px 14px',
            borderRadius:'18px 18px 18px 4px', fontSize:13.5, maxWidth:260, lineHeight:1.5,
            boxShadow:'var(--sh-1)'
          }}>
            {t('Tunggu — jadi 2⁻³ itu bukan negatif? Kenapa minus berarti "bagi"?','Wait — so 2⁻³ is not negative? Why does the minus mean "divide"?')}
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <div style={{
            background:'var(--ink)', color:'#fff', padding:'10px 14px',
            borderRadius:'18px 18px 4px 18px', fontSize:13.5, maxWidth:260, lineHeight:1.5
          }}>
            {t('Bayangkan kali 2 itu naik satu tangga. Eksponen minus berarti turun — jadi kamu bagi.','Think of multiplying by 2 as a step UP. A minus exponent is a step DOWN — so you divide.')}
          </div>
        </div>

        <div style={{display:'flex', gap:8, alignItems:'flex-end'}}>
          <div className="avatar avatar--slate" style={{width:24, height:24, fontSize:10}}>K</div>
          <div style={{
            background:'#fff', border:'1px solid var(--line)', padding:'10px 14px',
            borderRadius:'18px 18px 18px 4px', fontSize:13.5, maxWidth:260, lineHeight:1.5,
            boxShadow:'var(--sh-1)'
          }}>
            {t('Ohh — jadi 2⁻³ = 1/2/2/2 = 1/8?','Ohh — so 2⁻³ = 1/2/2/2 = 1/8?')}
            <div style={{marginTop:8, padding:'8px 10px', background:'var(--bg-2)', borderRadius:8, fontFamily:'var(--f-mono)', fontSize:13}}>
              2⁻³ = 1/8 ✓
            </div>
          </div>
        </div>

        <div style={{
          alignSelf:'center', padding:'8px 12px', borderRadius:14,
          background:'rgba(91,91,247,.08)', border:'1px dashed rgba(91,91,247,.3)',
          fontSize:11.5, color:'var(--indigo)', display:'flex', alignItems:'center', gap:6, fontWeight:500
        }}>
          {I.zap({size:13, stroke:'var(--indigo)'})} {t('Kiko naik level · Bloom L3 · Aplikasi','Kiko leveled up · Bloom L3 · Apply')}
        </div>

        <div style={{display:'flex', gap:8, alignItems:'flex-end'}}>
          <div className="avatar avatar--slate" style={{width:24, height:24, fontSize:10}}>K</div>
          <div style={{
            background:'#fff', border:'1px solid var(--line)', padding:'10px 14px',
            borderRadius:'18px 18px 18px 4px', fontSize:13.5, maxWidth:260, lineHeight:1.5,
            boxShadow:'var(--sh-1)'
          }}>
            {t('Tapi… bagaimana dengan 2⁰? Itu 1 dibagi 2 sebanyak nol kali? Membingungkan.','But… what about 2⁰? Is that 1 over 2 zero times? That\'s confusing.')}
          </div>
        </div>
      </div>

      {/* quick replies */}
      <div style={{padding:'4px 16px 8px', display:'flex', gap:6, overflowX:'auto'}}>
        {t('Nilainya 1,Coba n=0 secara numerik,Gambar polanya','It equals 1,Try n=0 numerically,Draw the pattern').split(',').map(s => (
          <button key={s} style={{
            padding:'8px 12px', borderRadius:999, fontSize:12,
            background:'#fff', border:'1px solid var(--line)', whiteSpace:'nowrap',
            color:'var(--ink-2)', display:'flex', alignItems:'center', gap:5
          }}>
            {I.spark({size:11, stroke:'var(--indigo)'})} {s}
          </button>
        ))}
      </div>

      {/* composer */}
      <div style={{padding:'8px 14px '+(full?'14px':'14px'), borderTop:'1px solid var(--line)', background:'#fff'}}>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <button className="icon-btn" style={{width:38, height:38, borderRadius:14, flexShrink:0}}>{I.plus({size:18, sw:2})}</button>
          <div style={{
            flex:1, padding:'10px 14px', background:'var(--bg-2)',
            borderRadius:22, fontSize:13, color:'var(--muted)', display:'flex', alignItems:'center', gap:8,
            minHeight:42
          }}>
            <span style={{flex:1}}>{t('Ajarkan Kiko…','Teach Kiko…')}</span>
            {I.mic({size:16, stroke:'var(--muted)'})}
          </div>
          <button style={{
            width:42, height:42, borderRadius:14, background:'var(--grad)', color:'#fff',
            border:0, display:'grid', placeItems:'center', flexShrink:0,
            boxShadow:'0 6px 16px -4px rgba(91,91,247,.5)'
          }}>{I.send({size:16, stroke:'#fff', sw:2})}</button>
        </div>
      </div>
    </div>
  );
}

/* ---- CONCEPT MAP ---- */
function ScreenMap({ go, full, dark }) {
  const t = useT();
  const c = dark ? '#fff' : '#14141A';
  const muted = dark ? 'rgba(255,255,255,.55)' : 'var(--muted)';
  return (
    <div style={{
      paddingTop:54, paddingBottom: full?110:0, height:'100%',
      background: dark ? 'radial-gradient(circle at 50% 30%, #1A1A24, #0A0A0E)' : 'var(--bg-2)',
      color: c, overflow:'auto'
    }}>
      <div style={{padding:'4px 22px 8px', display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
        <div>
          <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em', color:muted, textTransform:'uppercase'}}>{t('PETAMU · MATEMATIKA XII','YOUR MAP · MATH XII')}</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:30, marginTop:4, lineHeight:1.05}}>{t('34 simpul','34 nodes')}</div>
        </div>
        <button className="icon-btn" style={{width:38, height:38, borderRadius:12, background: dark?'rgba(255,255,255,.08)':'#fff', border:'1px solid '+(dark?'rgba(255,255,255,.1)':'var(--line)'), color:c}}>{I.filter({size:16})}</button>
      </div>

      {/* legend chips */}
      <div style={{padding:'4px 22px 12px', display:'flex', gap:8, flexWrap:'wrap', fontSize:11}}>
        <span style={{display:'flex', alignItems:'center', gap:6, color:muted}}><span style={{width:8, height:8, borderRadius:999, background:'#3FB37F'}}/>{t('dikuasai','mastered')} 21</span>
        <span style={{display:'flex', alignItems:'center', gap:6, color:muted}}><span style={{width:8, height:8, borderRadius:999, background:'#E5A535'}}/>{t('terbuka','open')} 9</span>
        <span style={{display:'flex', alignItems:'center', gap:6, color:muted}}><span style={{width:8, height:8, borderRadius:999, background:'#E26F6F'}}/>{t('kesenjangan','gap')} 4</span>
      </div>

      {/* graph */}
      <div style={{padding:'4px 18px', position:'relative'}}>
        <svg viewBox="0 0 354 480" style={{width:'100%', height:'auto', display:'block'}}>
          {/* edges */}
          <path d="M 50 50 C 100 70, 110 110, 70 150"   stroke={dark?'rgba(255,255,255,.18)':'rgba(31,158,106,.5)'}  strokeWidth="1.5" fill="none"/>
          <path d="M 70 150 C 140 180, 180 210, 170 260" stroke={dark?'rgba(91,91,247,.7)':'rgba(91,91,247,.7)'}      strokeWidth="2"   fill="none"/>
          <path d="M 170 260 C 220 290, 270 320, 260 370" stroke={dark?'rgba(209,67,67,.7)':'rgba(209,67,67,.6)'}      strokeWidth="1.5" strokeDasharray="4 4" fill="none"/>
          <path d="M 260 370 C 290 410, 270 440, 220 450" stroke={dark?'rgba(255,255,255,.15)':'rgba(20,20,26,.18)'} strokeWidth="1.5" strokeDasharray="3 4" fill="none"/>
          <path d="M 50 50 C 130 80, 200 100, 240 130"   stroke={dark?'rgba(255,255,255,.18)':'rgba(31,158,106,.4)'}  strokeWidth="1.2" fill="none"/>
          <path d="M 240 130 C 270 180, 260 220, 170 260" stroke={dark?'rgba(255,255,255,.18)':'rgba(31,158,106,.4)'}  strokeWidth="1.2" fill="none"/>

          {/* nodes */}
          <Node x={50}  y={50}  r={14} fill="#3FB37F" label="Pecahan"     c={c}/>
          <Node x={240} y={130} r={14} fill="#3FB37F" label="Eksp +"      c={c}/>
          <Node x={70}  y={150} r={14} fill="#3FB37F" label="Persamaan"   c={c}/>
          <Node x={170} y={260} r={22} fill="#5B5BF7" label="Eksp negatif" c={c} ring focus="YOU"/>
          <Node x={260} y={370} r={16} fill="#E26F6F" label="Invers 2×2"  c={c}/>
          <Node x={220} y={450} r={12} fill={dark?'rgba(255,255,255,.2)':'rgba(20,20,26,.18)'} label="Aplikasi" c={c} locked/>
          <Node x={70}  y={400} r={14} fill="#E5A535" label="Determinan"  c={c}/>
        </svg>
      </div>

      {/* selected node card */}
      <div style={{padding:'12px 18px 4px'}}>
        <div style={{
          padding:'14px', borderRadius:18,
          background: dark ? 'rgba(255,255,255,.06)' : '#fff',
          border:'1px solid '+(dark?'rgba(255,255,255,.1)':'var(--line)'),
          backdropFilter:'blur(20px)'
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <span style={{width:14, height:14, borderRadius:999, background:'var(--indigo)', boxShadow:'0 0 0 5px rgba(91,91,247,.18)'}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--f-mono)', fontSize:9.5, letterSpacing:'.1em', color:muted}}>FOCUS</div>
              <div style={{fontFamily:'var(--f-serif)', fontSize:20, lineHeight:1.1, marginTop:2}}>Eksp. negatif</div>
            </div>
            <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--indigo)', fontWeight:600}}>62%</div>
          </div>
          <div style={{fontSize:12, color: dark?'rgba(255,255,255,.7)':'var(--ink-2)', marginTop:10, lineHeight:1.5}}>
            Finish this and <b>invers matriks</b> unlocks. Kiko already gets the reciprocal rule — she's stuck on n=0.
          </div>
          <button style={{
            marginTop:12, width:'100%', padding:'14px',
            background:'var(--grad)', color:'#fff', border:0, borderRadius:14,
            fontSize:14, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow:'0 10px 24px -8px rgba(91,91,247,.5)'
          }}>{t('Lanjut Teach-Me · 8 mnt','Continue Teach-Me · 8 min')} {I.arrow({size:14, stroke:'#fff'})}</button>
        </div>
      </div>
    </div>
  );
}

function Node({ x, y, r, fill, label, c='#14141A', ring, focus, locked }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r+6} fill={fill} opacity=".18"/>
      <circle cx={x} cy={y} r={r} fill={fill}/>
      {ring && <circle cx={x} cy={y} r={r+8} fill="none" stroke={fill} strokeDasharray="3 4"/>}
      {focus && <text x={x} y={y+4} textAnchor="middle" fontFamily="var(--f-mono)" fontSize="10" fontWeight="600" fill="#fff">{focus}</text>}
      <text x={x} y={y+r+18} textAnchor="middle" fontSize="11" fill={c} fontWeight={focus?600:400} opacity={locked?.5:1}>{label}</text>
    </g>
  );
}

/* ---- ME ---- */
function ScreenMe({ go }) {
  const t = useT();
  return (
    <div style={{paddingTop:54, paddingBottom:110, height:'100%', overflow:'auto'}}>
      <ScreenHead title={t('Kamu','You')} sub={t('PROFIL & PROGRES','PROFILE & PROGRESS')}
        right={<button className="icon-btn" style={{width:38, height:38, borderRadius:12}}>{I.cog({size:16})}</button>}/>

      <div style={{padding:'8px 22px 0', textAlign:'center'}}>
        <div className="avatar avatar--green" style={{width:90, height:90, fontSize:30, margin:'8px auto'}}>DP</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:26, marginTop:8, lineHeight:1}}>Devin Pradana</div>
        <div style={{fontSize:13, color:'var(--muted)', marginTop:6}}>SMA 8 Jakarta · XII IPA 1</div>
        <div style={{display:'inline-flex', gap:8, marginTop:14}}>
          <span className="tag tag--ind"><span className="dot"/>Level 14 explorer</span>
          <span className="tag" style={{background:'rgba(201,138,23,.12)', color:'var(--warn)'}}>🔥 18 days</span>
        </div>
      </div>

      <div style={{padding:'18px 22px 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          {[
            [t('Penguasaan','Mastery'),'68%','var(--indigo)'],
            [t('Jam','Hours'), '14.2',  'var(--ok)'],
            [t('Peringkat','Rank'),  '#4',  'var(--warn)']
          ].map(([l,v,t]) => (
            <div key={l} style={{padding:'12px 10px', border:'1px solid var(--line)', borderRadius:14, background:'#fff', textAlign:'center'}}>
              <div style={{fontFamily:'var(--f-serif)', fontSize:24, lineHeight:1, color:t}}>{v}</div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:9, color:'var(--muted)', marginTop:6, letterSpacing:'.1em'}}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'18px 22px 4px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <div style={{fontWeight:600, fontSize:14}}>{t('Lencana · 6 dari 12','Badges · 6 of 12')}</div>
          <span style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--indigo)'}}>{t('LIHAT SEMUA','SEE ALL')}</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10}}>
          {[
            { e:'🧮', l:'Decimal pro', on:true},
            { e:'📐', l:'Geometry',    on:true},
            { e:'🔥', l:'7-day flame', on:true},
            { e:'🧠', l:'Teacher',     on:true},
            { e:'⚡',  l:'Speedrun',    on:true},
            { e:'🌟', l:'Top quartile',on:true},
            { e:'🏆', l:'Matrix master',on:false},
            { e:'🎯', l:'Perfect quiz',on:false},
          ].map((b,i) => (
            <div key={i} style={{
              padding:'10px 6px', border:'1px solid var(--line)', borderRadius:12,
              background: b.on?'#fff':'var(--bg-2)', textAlign:'center', opacity: b.on?1:.4
            }}>
              <div style={{fontSize:26}}>{b.e}</div>
              <div style={{fontSize:9, color:'var(--muted)', marginTop:4, fontWeight:500}}>{b.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'18px 22px 20px'}}>
        <div style={{fontWeight:600, fontSize:14, marginBottom:10}}>{t('Pengaturan','Settings')}</div>
        <div style={{borderRadius:16, overflow:'hidden', border:'1px solid var(--line)', background:'#fff'}}>
          {[
            { i:'bell',   l:t('Notifikasi','Notifications'),   r:'on'},
            { i:'globe',  l:'Bahasa Indonesia',                r:'id'},
            { i:'device', l:t('Install di HP','Install on phone'), r:'A2HS'},
            { i:'cog',    l:t('Akun & privasi','Account & privacy'), r:''},
          ].map((r,i) => (
            <div key={r.l} style={{
              display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
              borderTop: i?'1px solid var(--line-2)':0
            }}>
              <span style={{
                width:30, height:30, borderRadius:8, background:'var(--bg-2)',
                display:'grid', placeItems:'center', color:'var(--ink-2)'
              }}>{I[r.i]({size:16})}</span>
              <div style={{flex:1, fontSize:14}}>{r.l}</div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)'}}>{r.r}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-2)" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- LOCK SCREEN ---- */
function ScreenLock() {
  return (
    <div style={{
      height:'100%', position:'relative',
      background:'linear-gradient(180deg, #1A1A2E 0%, #2A1A3E 40%, #1A1A2E 100%)',
      overflow:'hidden'
    }}>
      <StatusBar dark/>
      {/* abstract bg */}
      <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 20%, rgba(91,91,247,.35), transparent 50%), radial-gradient(circle at 70% 70%, rgba(138,79,255,.25), transparent 50%)'}}/>
      {/* time */}
      <div style={{position:'absolute', top:80, left:0, right:0, textAlign:'center', color:'#fff'}}>
        <div style={{fontFamily:'-apple-system, "SF Pro Display", system-ui', fontSize:14, fontWeight:500, opacity:.85}}>Tuesday, 26 May</div>
        <div style={{fontFamily:'-apple-system, "SF Pro Display", system-ui', fontSize:90, fontWeight:200, lineHeight:1, marginTop:6, letterSpacing:'-.02em'}}>9:41</div>
      </div>

      {/* notifications */}
      <div style={{
        position:'absolute', top:280, left:0, right:0,
        padding:'0 16px', display:'flex', flexDirection:'column', gap:8
      }}>
        <div style={{textAlign:'center', color:'rgba(255,255,255,.5)', fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'.12em', marginBottom:4}}>NOTIFICATION CENTER</div>

        {[
          {
            app:'TICMI', when:'now',
            t:'Kiko is still confused about zero exponents 👀',
            s:'Tap to teach her one more time — should take 5 min.',
            icon:'brain', tint:'var(--grad)'
          },
          {
            app:'TICMI', when:'2h ago',
            t:'🔥 Streak day 18',
            s:"You're one mission away from keeping it. Don't break the chain.",
            icon:'flame', tint:'linear-gradient(135deg, #FF7A45, #E45A3A)'
          },
          {
            app:'TICMI', when:'yesterday',
            t:'New assignment · Matriks invers',
            s:'Bu Rini posted a worksheet — due Friday 23:59.',
            icon:'pin', tint:'linear-gradient(135deg, #3FB37F, #1F9E6A)'
          },
        ].map((n,i) => (
          <div key={i} style={{
            padding:'10px 12px', borderRadius:18,
            background:'rgba(255,255,255,.18)', backdropFilter:'saturate(1.8) blur(20px)',
            border:'1px solid rgba(255,255,255,.15)', color:'#fff',
            display:'flex', gap:10
          }}>
            <div style={{width:38, height:38, borderRadius:10, background:n.tint, display:'grid', placeItems:'center', flexShrink:0, boxShadow:'0 4px 10px -2px rgba(0,0,0,.3)'}}>
              {I[n.icon]({size:18, stroke:'#fff', sw:2})}
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:10.5, opacity:.75, fontFamily:'-apple-system, system-ui', fontWeight:600, letterSpacing:'.02em'}}>
                <span>{n.app}</span>
                <span>{n.when}</span>
              </div>
              <div style={{fontSize:13, fontWeight:600, marginTop:2, lineHeight:1.3}}>{n.t}</div>
              <div style={{fontSize:12, marginTop:3, opacity:.85, lineHeight:1.4}}>{n.s}</div>
            </div>
          </div>
        ))}
      </div>

      {/* bottom controls */}
      <div style={{
        position:'absolute', bottom:46, left:0, right:0,
        display:'flex', justifyContent:'space-between', padding:'0 42px'
      }}>
        <div style={{width:46, height:46, borderRadius:23, background:'rgba(255,255,255,.18)', backdropFilter:'blur(10px)', display:'grid', placeItems:'center', color:'#fff'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/></svg>
        </div>
        <div style={{width:46, height:46, borderRadius:23, background:'rgba(255,255,255,.18)', backdropFilter:'blur(10px)', display:'grid', placeItems:'center', color:'#fff'}}>
          {I.mic({size:18, sw:2})}
        </div>
      </div>
      <HomeIndicator dark/>
    </div>
  );
}

/* ---- INSTALL PROMPT (A2HS sheet) ---- */
function ScreenInstallPrompt() {
  return (
    <div style={{
      height:'100%', background:'rgba(20,20,26,.55)',
      position:'relative', overflow:'hidden'
    }}>
      {/* dimmed underlying app */}
      <div style={{position:'absolute', inset:0, opacity:.35, filter:'blur(2px)'}}>
        <ScreenHome/>
      </div>
      <StatusBar/>

      {/* sheet */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        background:'#fff', borderRadius:'28px 28px 0 0',
        padding:'14px 22px 36px',
        boxShadow:'0 -20px 40px -10px rgba(0,0,0,.25)'
      }}>
        {/* handle */}
        <div style={{width:42, height:5, background:'var(--line)', borderRadius:999, margin:'0 auto 18px'}}/>

        <div style={{textAlign:'center'}}>
          <div style={{
            width:74, height:74, borderRadius:20, margin:'0 auto 14px',
            background:'var(--grad)', position:'relative', overflow:'hidden',
            boxShadow:'0 14px 32px -8px rgba(91,91,247,.55)'
          }}>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 30%, rgba(255,255,255,.55), transparent 55%)'}}/>
            <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center', color:'#fff', fontFamily:'var(--f-mono)', fontSize:22, fontWeight:700, letterSpacing:'.04em'}}>T</div>
          </div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:26, lineHeight:1.15}}>Install <em>TICMI</em></div>
          <div style={{fontSize:13, color:'var(--muted)', marginTop:6, lineHeight:1.5, maxWidth:260, margin:'6px auto 0'}}>
            Add to your Home Screen to learn offline, get push reminders, and feel like a real app.
          </div>
        </div>

        <div style={{
          margin:'20px 0 4px', padding:'14px',
          background:'var(--bg-2)', border:'1px solid var(--line)', borderRadius:16
        }}>
          {[
            ['📲', 'Works like a native app — fullscreen, no browser chrome'],
            ['🔌', 'Lessons cached · finish Teach-Me on the school bus'],
            ['🔔', 'Optional reminders · respects quiet hours'],
            ['🔒', '2.1 MB · no App Store account needed'],
          ].map(([e,l],i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:12,
              padding: i?'10px 0 0':'0', borderTop: i?'1px solid var(--line-2)':0,
              fontSize:13
            }}>
              <span style={{fontSize:20, width:28, textAlign:'center'}}>{e}</span>
              <span style={{lineHeight:1.4}}>{l}</span>
            </div>
          ))}
        </div>

        <button style={{
          marginTop:18, width:'100%', padding:'16px',
          background:'var(--grad)', color:'#fff', border:0, borderRadius:16,
          fontSize:15, fontWeight:600,
          boxShadow:'0 12px 28px -8px rgba(91,91,247,.5)'
        }}>Add to Home Screen</button>

        <div style={{display:'flex', alignItems:'center', gap:8, fontSize:11.5, color:'var(--muted)', marginTop:14, justifyContent:'center'}}>
          <span>or tap</span>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:4, padding:'3px 8px',
            border:'1px solid var(--line)', borderRadius:6, fontFamily:'-apple-system, system-ui',
            background:'#fff'
          }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 1v8M3 4l3-3 3 3M2 9v4h8V9"/></svg>
            Share
          </span>
          <span>→ "Add to Home Screen"</span>
        </div>
      </div>
    </div>
  );
}

/* ---- ONBOARDING ---- */
function ScreenOnboarding() {
  return (
    <div style={{
      height:'100%', overflow:'hidden', position:'relative',
      background:'linear-gradient(180deg, #fff 0%, #FBFAF7 100%)'
    }}>
      <StatusBar/>
      <div style={{paddingTop:64, padding:'64px 26px 0', height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className="brand-mark" style={{width:32, height:32, borderRadius:10}}/>
          <span style={{fontFamily:'var(--f-mono)', fontSize:11, color:'var(--muted)', letterSpacing:'.1em'}}>STEP 3 OF 4</span>
        </div>
        <div style={{height:4, background:'var(--bg-2)', borderRadius:999, marginTop:18, overflow:'hidden'}}>
          <div style={{width:'75%', height:'100%', background:'var(--grad)', borderRadius:999}}/>
        </div>

        <div style={{marginTop:34}}>
          <div className="eyebrow"><span className="dot"/>Join your class</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:32, lineHeight:1.1, marginTop:10, letterSpacing:'-.01em'}}>
            Type the <em>class code</em> your teacher gave you.
          </div>
        </div>

        <div style={{marginTop:30, display:'flex', gap:8, justifyContent:'center'}}>
          {['T','I','C','9','M','4','K'].map((d,i) => (
            <div key={i} style={{
              width:36, height:48, borderRadius:12,
              border:'1.5px solid '+(i===6?'var(--indigo)':'var(--line)'),
              background: d?'#fff':'var(--bg-2)',
              display:'grid', placeItems:'center',
              fontFamily:'var(--f-mono)', fontSize:22, fontWeight:600,
              boxShadow: i===6?'0 0 0 4px rgba(91,91,247,.12)':'none'
            }}>{d}</div>
          ))}
        </div>
        <div style={{textAlign:'center', fontSize:12.5, color:'var(--muted)', marginTop:14}}>
          Found it on the welcome card from <b style={{color:'var(--ink)'}}>Bu Rini</b>.
        </div>

        {/* match card */}
        <div style={{
          marginTop:22, padding:'14px',
          background:'linear-gradient(135deg, rgba(91,91,247,.10), rgba(138,79,255,.06))',
          border:'1px solid rgba(91,91,247,.25)', borderRadius:18,
          display:'flex', alignItems:'center', gap:12
        }}>
          <div className="avatar avatar--slate" style={{width:44, height:44, fontSize:14}}>RW</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600, fontSize:14}}>XII IPA 1 · Matematika</div>
            <div style={{fontSize:11.5, color:'var(--muted)', marginTop:2}}>Bu Rini · 32 students</div>
          </div>
          <span style={{width:24, height:24, borderRadius:999, background:'var(--ok)', display:'grid', placeItems:'center'}}>
            {I.check({size:14, stroke:'#fff', sw:3})}
          </span>
        </div>

        {/* keypad */}
        <div style={{flex:1}}/>
        <div style={{margin:'0 -26px', padding:'14px 22px 4px', background:'var(--bg-2)', borderTop:'1px solid var(--line)'}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8}}>
            {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k,i) => (
              <button key={i} style={{
                height:48, borderRadius:12, fontSize:22, fontWeight:500,
                background: k?'#fff':'transparent', border:'1px solid '+(k?'var(--line)':'transparent'),
                fontFamily:'-apple-system, system-ui', color:'var(--ink)'
              }}>{k}</button>
            ))}
          </div>
        </div>
        <button style={{
          margin:'12px 0 24px',
          padding:'16px', background:'var(--ink)', color:'#fff', border:0, borderRadius:16,
          fontWeight:600, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:8
        }}>Join class · TIC-9M4K {I.arrow({size:14, stroke:'#fff'})}</button>
      </div>
      <HomeIndicator/>
    </div>
  );
}

/* ---- ASSIGNMENT (solver) ---- */
function ScreenAssignment() {
  const t = useT();
  return (
    <div style={{height:'100%', overflow:'auto', paddingBottom:30, background:'#fff'}}>
      <StatusBar/>
      <div style={{padding:'56px 22px 0'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <button className="icon-btn" style={{width:36, height:36, borderRadius:12}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em'}}>{t('SOAL 4 DARI 6','QUESTION 4 OF 6')}</div>
            <div style={{display:'flex', alignItems:'center', gap:8, marginTop:4}}>
              <div style={{flex:1, height:4, background:'var(--bg-2)', borderRadius:999, overflow:'hidden'}}>
                <div style={{width:'66%', height:'100%', background:'var(--grad)'}}/>
              </div>
              <span style={{fontFamily:'var(--f-mono)', fontSize:11}}>24:18</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:'22px'}}>
        <div className="eyebrow"><span className="dot"/>APPLY · BLOOM L3</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:22, lineHeight:1.3, marginTop:10}}>
          Diberikan matriks{' '}
          <span style={{fontFamily:'var(--f-mono)', fontSize:18, background:'var(--bg-2)', padding:'3px 8px', borderRadius:6}}>A = [[2, 1/2⁻¹], [3, 4]]</span>.
          Hitung determinan A, lalu invers A.
        </div>

        {/* choice cards */}
        <div style={{marginTop:20, display:'flex', flexDirection:'column', gap:8}}>
          {[
            { l:'A', t:'det A = 5 · A⁻¹ = (1/5)·[[4,−2],[−3,2]]', state:''},
            { l:'B', t:'det A = 2 · A⁻¹ = (1/2)·[[4,−2],[−3,2]]', state:'selected'},
            { l:'C', t:'det A = −2 · A⁻¹ = (−1/2)·[[4,−2],[−3,2]]', state:''},
            { l:'D', t:'det A is undefined (1/2⁻¹ is fractional)', state:'trap'},
          ].map(c => (
            <div key={c.l} style={{
              padding:'14px', borderRadius:16,
              border:'1.5px solid '+(c.state==='selected'?'var(--indigo)':'var(--line)'),
              background: c.state==='selected'?'rgba(91,91,247,.05)':'#fff',
              display:'flex', alignItems:'flex-start', gap:12
            }}>
              <span style={{
                width:30, height:30, borderRadius:999, flexShrink:0,
                background: c.state==='selected'?'var(--grad)':'var(--bg-2)',
                border:'1px solid '+(c.state==='selected'?'transparent':'var(--line)'),
                color: c.state==='selected'?'#fff':'var(--ink-2)',
                display:'grid', placeItems:'center', fontFamily:'var(--f-mono)', fontWeight:600, fontSize:13
              }}>{c.l}</span>
              <span style={{flex:1, fontSize:13.5, lineHeight:1.5, fontFamily:'var(--f-mono)'}}>{c.t}</span>
            </div>
          ))}
        </div>

        {/* confidence */}
        <div style={{marginTop:18, padding:'14px 16px', border:'1px solid var(--line)', borderRadius:16, background:'var(--bg-2)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
            <div style={{fontSize:13, fontWeight:500}}>{t('Keyakinanmu','Your confidence')}</div>
            <div style={{fontFamily:'var(--f-mono)', fontSize:13, color:'var(--indigo)', fontWeight:600}}>74%</div>
          </div>
          <div style={{display:'flex', gap:6}}>
            {[1,2,3,4,5].map(n => (
              <div key={n} style={{
                flex:1, height:8, borderRadius:6,
                background: n<=4 ? 'var(--grad)' : 'var(--line-2)'
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* sticky bottom */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'14px 22px 36px', background:'#fff',
        borderTop:'1px solid var(--line)',
        display:'flex', gap:10
      }}>
        <button className="icon-btn" style={{width:48, height:48, borderRadius:14, color:'var(--warn)', background:'rgba(201,138,23,.10)', border:'1px solid rgba(201,138,23,.2)'}}>
          {I.spark({size:18})}
        </button>
        <button style={{
          flex:1, background:'var(--grad)', color:'#fff', border:0, borderRadius:16,
          fontSize:15, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          boxShadow:'0 10px 24px -8px rgba(91,91,247,.5)'
        }}>{t('Kirim & lanjut','Submit & continue')} {I.arrow({size:15, stroke:'#fff'})}</button>
      </div>
    </div>
  );
}

/* ---- AI CHAT SHEET ---- */
function ScreenAIChat() {
  const t = useT();
  return (
    <div style={{height:'100%', background:'#0A0A0E', position:'relative', overflow:'hidden'}}>
      <StatusBar dark/>
      {/* ambient */}
      <div style={{position:'absolute', inset:0, opacity:.8, background:'radial-gradient(circle at 20% 10%, rgba(91,91,247,.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(138,79,255,.18), transparent 50%)'}}/>

      <div style={{padding:'56px 20px 0', position:'relative', height:'100%', display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <button style={{width:34, height:34, borderRadius:10, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', color:'#fff', display:'grid', placeItems:'center'}}>
            {I.x({size:16, stroke:'#fff'})}
          </button>
          <div style={{flex:1, color:'#fff'}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:10, opacity:.6, letterSpacing:'.1em'}}>TICMI AI</div>
            <div style={{fontWeight:600, fontSize:14, marginTop:2}}>{t('Tanya apa saja · tutor matematika','Ask anything · math tutor')}</div>
          </div>
          <button style={{width:34, height:34, borderRadius:10, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', color:'#fff', display:'grid', placeItems:'center'}}>
            {I.more({size:16, stroke:'#fff'})}
          </button>
        </div>

        <div style={{flex:1, overflowY:'auto', marginTop:18, color:'#fff', display:'flex', flexDirection:'column', gap:14}}>
          <div style={{textAlign:'center'}}>
            <div style={{
              width:54, height:54, borderRadius:16, margin:'8px auto 0',
              background:'var(--grad)', display:'grid', placeItems:'center',
              boxShadow:'0 12px 28px -8px rgba(91,91,247,.5)'
            }}>{I.brain({size:22, stroke:'#fff'})}</div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:24, marginTop:14, lineHeight:1.2}}>{t('Bagaimana saya bisa membantu belajarmu?','How can I help you study?')}</div>
            <div style={{fontSize:12, opacity:.6, marginTop:6, maxWidth:260, margin:'6px auto 0', lineHeight:1.5}}>{t('Saya tidak akan langsung memberi jawaban — saya akan membimbingmu.','I won\'t just give you the answer — I\'ll walk you through it.')}</div>
          </div>

          {/* suggestion chips */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:6}}>
            {[
              { e:'🧮', t:'Explain inverse matrix\nlike I\'m 14'},
              { e:'🔍', t:'Why did I get\nquestion 4 wrong?'},
              { e:'🎯', t:'Quiz me on\nnegative exponents'},
              { e:'📘', t:'Summarize today\'s\nmath lesson'},
            ].map((s,i) => (
              <div key={i} style={{
                padding:'12px 12px', borderRadius:14,
                background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)',
                color:'#fff'
              }}>
                <div style={{fontSize:18}}>{s.e}</div>
                <div style={{fontSize:12, marginTop:6, lineHeight:1.4, whiteSpace:'pre-line'}}>{s.t}</div>
              </div>
            ))}
          </div>

          {/* message */}
          <div style={{marginTop:10, padding:'12px 14px', background:'rgba(255,255,255,.06)', borderRadius:'16px 16px 16px 4px', fontSize:13.5, lineHeight:1.5, alignSelf:'flex-start', maxWidth:260, border:'1px solid rgba(255,255,255,.08)'}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:9, opacity:.55, letterSpacing:'.1em', marginBottom:6}}>SUGGESTED</div>
            "Bisa kasih hint untuk soal nomor 4 tanpa kasih tau jawabannya?"
          </div>
        </div>

        {/* input */}
        <div style={{padding:'8px 0 14px', display:'flex', gap:8, alignItems:'center'}}>
          <div style={{
            flex:1, padding:'12px 14px',
            background:'rgba(255,255,255,.08)', backdropFilter:'blur(20px)',
            border:'1px solid rgba(255,255,255,.12)', borderRadius:22,
            fontSize:13.5, color:'rgba(255,255,255,.6)',
            display:'flex', alignItems:'center', gap:8
          }}>
            <span style={{flex:1}}>{t('Pesan ke TICMI…','Message TICMI…')}</span>
            {I.mic({size:16, stroke:'rgba(255,255,255,.6)'})}
          </div>
          <button style={{
            width:44, height:44, borderRadius:14, background:'var(--grad)', color:'#fff', border:0,
            display:'grid', placeItems:'center', boxShadow:'0 8px 20px -4px rgba(91,91,247,.6)'
          }}>{I.send({size:18, stroke:'#fff', sw:2})}</button>
        </div>
      </div>
      <HomeIndicator dark/>
    </div>
  );
}

/* ---- STREAK CELEBRATE ---- */
function ScreenStreakCelebrate() {
  return (
    <div style={{
      height:'100%', position:'relative', overflow:'hidden',
      background:'linear-gradient(180deg, #FFEFD5 0%, #FFC788 40%, #FF7A45 100%)'
    }}>
      <StatusBar/>
      {/* confetti */}
      {[...Array(28)].map((_,i) => {
        const c = ['#fff','#5B5BF7','#8A4FFF','#1F9E6A','#fff'][i%5];
        return (
          <div key={i} style={{
            position:'absolute', top: (i*73)%820, left: (i*47)%PHONE_W,
            width: 6+((i*3)%6), height: 6+((i*3)%6),
            background: c, opacity: .55+((i%5)/12),
            borderRadius: i%3===0 ? 999 : 2,
            transform:`rotate(${i*23}deg)`
          }}/>
        );
      })}

      <div style={{padding:'80px 32px 0', textAlign:'center', position:'relative', color:'#14141A'}}>
        <div style={{fontSize:96, lineHeight:1, filter:'drop-shadow(0 6px 20px rgba(0,0,0,.15))'}}>🔥</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:54, lineHeight:1, marginTop:18, fontWeight:500}}>Day 19</div>
        <div style={{fontFamily:'var(--f-serif)', fontStyle:'italic', fontSize:24, marginTop:8, color:'#5C1A0A'}}>You're on fire, Devin.</div>

        <div style={{
          marginTop:30, padding:'18px', borderRadius:22,
          background:'rgba(255,255,255,.9)', backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,.6)',
          textAlign:'left'
        }}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em'}}>TODAY EARNED</div>
              <div style={{fontFamily:'var(--f-serif)', fontSize:34, lineHeight:1, marginTop:4}}>+320 XP</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--muted)', letterSpacing:'.1em'}}>NEXT LEVEL</div>
              <div style={{fontFamily:'var(--f-mono)', fontSize:13, marginTop:6}}>180 XP →</div>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginTop:16}}>
            {[
              ['🧠','Taught Kiko 14 turns'],
              ['🎯','3 / 5 missions'],
              ['📈','+12% mastery']
            ].map(([e,l],i) => (
              <div key={i} style={{padding:'10px 6px', background:'var(--bg-2)', borderRadius:12, textAlign:'center'}}>
                <div style={{fontSize:22}}>{e}</div>
                <div style={{fontSize:10, color:'var(--muted)', marginTop:4, lineHeight:1.3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <button style={{
          marginTop:24, width:'100%', padding:'16px',
          background:'#14141A', color:'#fff', border:0, borderRadius:16,
          fontSize:15, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8
        }}>Share streak {I.arrow({size:14, stroke:'#fff'})}</button>
      </div>
      <HomeIndicator/>
    </div>
  );
}

/* ============================================
   Page-level helpers
   ============================================ */
function InstallBanner() {
  return (
    <div className="card" style={{padding:0, marginBottom:22, overflow:'hidden'}}>
      <div style={{
        padding:'22px 26px', display:'grid', gridTemplateColumns:'auto 1fr auto', gap:20, alignItems:'center',
        background:'linear-gradient(120deg, rgba(91,91,247,.08), rgba(138,79,255,.06) 50%, transparent)'
      }}>
        <div style={{width:54, height:54, borderRadius:14, background:'var(--grad)', boxShadow:'0 8px 24px -8px rgba(91,91,247,.5)', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 30%, rgba(255,255,255,.5), transparent 60%)'}}/>
        </div>
        <div>
          <div className="eyebrow"><span className="dot"/>Progressive Web App · 2.1 MB</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:22, marginTop:6, lineHeight:1.15}}>
            Install <em>TICMI</em> on any phone — no app store needed.
          </div>
          <div style={{display:'flex', gap:18, marginTop:10, fontSize:12, color:'var(--muted)', flexWrap:'wrap'}}>
            <span style={{display:'flex', gap:6}}>{I.check({size:13, stroke:'var(--ok)'})} Offline lessons</span>
            <span style={{display:'flex', gap:6}}>{I.check({size:13, stroke:'var(--ok)'})} Push notifications</span>
            <span style={{display:'flex', gap:6}}>{I.check({size:13, stroke:'var(--ok)'})} Feels native</span>
            <span style={{display:'flex', gap:6}}>{I.check({size:13, stroke:'var(--ok)'})} iOS & Android</span>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:6}}>
          <button className="btn btn--sm">iOS · Share → "Add to Home Screen"</button>
          <button className="btn btn--sm">Android · ⋮ → "Install app"</button>
        </div>
      </div>
    </div>
  );
}

function NativeBehaviorRow() {
  return (
    <div className="grid-12" style={{marginTop:24}}>
      <div className="card span-7" style={{padding:24}}>
        <div className="eyebrow"><span className="dot"/>Native-grade behavior</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:26, marginTop:8, lineHeight:1.1}}>Built so it disappears.</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:22}}>
          {[
            ['Service worker', 'All Teach-Me sessions cache; finish them on a slow signal.'],
            ['Background sync', 'Submissions queue and replay when connectivity returns.'],
            ['Web Push', 'Optional. Quiet hours by default. Respect Do-Not-Disturb.'],
            ['A2HS card',   'iOS share menu and Android Install prompt both supported.'],
            ['Safe areas',  'env(safe-area-inset) on top, bottom, and gestures.'],
            ['Reduced motion', 'Listens to prefers-reduced-motion and dials transitions back.'],
          ].map(([h,b]) => (
            <div key={h} style={{borderLeft:'2px solid var(--indigo)', padding:'2px 0 4px 14px'}}>
              <div style={{fontWeight:600, fontSize:13.5}}>{h}</div>
              <div style={{color:'var(--muted)', fontSize:12.5, marginTop:4, lineHeight:1.5}}>{b}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card span-5" style={{padding:0, overflow:'hidden'}}>
        <div className="card-head">
          <h3>{I.bell({size:14, stroke:'var(--indigo)'})} Sample push notifications</h3>
          <span className="tag">opt-in</span>
        </div>
        <div style={{padding:20, display:'flex', flexDirection:'column', gap:10}}>
          {[
            { app:'TICMI', t:'Kiko is still confused about zero exponents 👀', s:'now', img:'brain'},
            { app:'TICMI', t:"Streak 🔥 19 — finish today's 1 mission to keep it", s:'2h ago', img:'flame'},
            { app:'TICMI', t:'Bu Rini posted: kuis matriks pindah ke periode 5', s:'yesterday', img:'pin'},
          ].map((n,i) => (
            <div key={i} style={{
              display:'flex', gap:12, padding:'12px 14px', borderRadius:14,
              background:'rgba(20,20,26,.92)', color:'#fff'
            }}>
              <div style={{width:36, height:36, borderRadius:10, background:'var(--grad)', display:'grid', placeItems:'center', flexShrink:0}}>
                {I[n.img]({size:18, stroke:'#fff'})}
              </div>
              <div style={{flex:1, fontSize:13}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,.6)', fontFamily:'var(--f-mono)'}}>
                  <span>{n.app.toUpperCase()}</span><span>{n.s}</span>
                </div>
                <div style={{marginTop:4, lineHeight:1.45}}>{n.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  MobilePage, IPhoneFrame, StatusBar, HomeIndicator, BottomNav,
  ScreenHome, ScreenClass, ScreenTeach, ScreenMap, ScreenMe,
  ScreenLock, ScreenInstallPrompt, ScreenOnboarding, ScreenAssignment, ScreenAIChat, ScreenStreakCelebrate
});
