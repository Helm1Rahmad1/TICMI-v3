// MOBILE-NATIVE LANDING — paginated intro + app-style CTAs
function MobileLanding({ go }) {
  const [page, setPage] = React.useState(0); // 0..3 onboarding-style intro
  const intros = [
    {
      tint: 'linear-gradient(160deg, #5B5BF7 0%, #8A4FFF 100%)',
      icon: 'brain',
      tag: 'MULTI-AGENT CLASSROOM',
      title: <>AI yang <em>belajar dari pengajaranmu.</em></>,
      body: 'TICMI mendeteksi gap prasyarat di balik tiap jawaban salah, lalu membangun ulang pemahaman lewat dialog Sokrates — di mana siswa yang justru mengajar AI.'
    },
    {
      tint: 'linear-gradient(160deg, #FF7A45 0%, #E45A3A 100%)',
      icon: 'zap',
      tag: 'TEACH-ME MODE',
      title: <>Siswa mengajar. <em>AI yang bingung.</em></>,
      body: 'Kiko, AI tutee-mu, sengaja terlihat bingung. Saat kamu menjelaskan, kami mengukur kedalaman Bloom — bukan sekadar benar/salah.'
    },
    {
      tint: 'linear-gradient(160deg, #1F9E6A 0%, #2DBF82 100%)',
      icon: 'graph',
      tag: 'CONCEPT MAP',
      title: <>Lihat seluruh kurikulum sebagai <em>peta hidup.</em></>,
      body: 'Setiap konsep terhubung ke prasyarat dan dependensinya. Node merah = gap. Hijau = mastered. AI mencari jalan tercepat ke pemahaman.'
    },
    {
      tint: 'linear-gradient(160deg, #C98A17 0%, #E5A535 100%)',
      icon: 'grid',
      tag: 'HEATMAP ANALYTICS',
      title: <>Untuk guru: <em>matriks miskonsepsi.</em></>,
      body: 'Lihat seluruh kelas sebagai grid siswa × kompetensi. Sel merah bukan nilai — itu prasyarat persis yang harus dibahas pelajaran berikutnya.'
    },
  ];
  const it = intros[page];

  return (
    <div style={{minHeight:'100vh', background:'var(--bg)', position:'relative', overflowX:'hidden'}}>
      {/* Top app bar */}
      <div style={{
        position:'sticky', top:0, zIndex:30,
        padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'rgba(247,246,242,.85)', backdropFilter:'saturate(1.4) blur(12px)',
        borderBottom:'1px solid rgba(20,20,26,.04)'
      }}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <div className="brand-mark" style={{width:26, height:26, borderRadius:8}}/>
          <span style={{fontFamily:'var(--f-mono)', fontWeight:600, fontSize:13, letterSpacing:'.14em'}}>
            TIC<em style={{fontStyle:'normal', background:'var(--grad)', WebkitBackgroundClip:'text', color:'transparent'}}>MI</em>
          </span>
        </div>
        <span className="tag tag--ind" style={{fontSize:10}}><span className="dot"/>LIDM 2026</span>
      </div>

      {/* HERO carousel card */}
      <div style={{padding:'18px 18px 12px'}}>
        <div style={{
          borderRadius: 28, position:'relative', overflow:'hidden',
          background: it.tint, color:'#fff',
          padding:'26px 22px 22px',
          minHeight: 420,
          boxShadow:'0 24px 60px -20px rgba(91,91,247,.4), 0 8px 24px -10px rgba(20,20,26,.15)'
        }}>
          {/* ambient glow */}
          <div style={{position:'absolute', inset:0, opacity:.55, background:'radial-gradient(circle at 80% 10%, rgba(255,255,255,.45), transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,.2), transparent 50%)'}}/>
          {/* fine grid */}
          <div style={{position:'absolute', inset:0, opacity:.15,
            backgroundImage:'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize:'24px 24px',
            mask:'radial-gradient(ellipse at center, #000 30%, transparent 75%)',
            WebkitMask:'radial-gradient(ellipse at center, #000 30%, transparent 75%)'
          }}/>

          <div style={{position:'relative'}}>
            <div style={{
              width:54, height:54, borderRadius:16,
              background:'rgba(255,255,255,.18)', backdropFilter:'blur(10px)',
              border:'1px solid rgba(255,255,255,.25)',
              display:'grid', placeItems:'center',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,.3)'
            }}>{I[it.icon]({size:24, stroke:'#fff', sw:1.8})}</div>

            <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.14em', marginTop:22, opacity:.88}}>{it.tag}</div>
            <div style={{
              fontFamily:'var(--f-serif)', fontWeight:400,
              fontSize: 38, lineHeight:1.05, marginTop:8, letterSpacing:'-.01em'
            }}>{it.title}</div>
            <div style={{fontSize:14.5, lineHeight:1.55, marginTop:14, opacity:.92}}>{it.body}</div>
          </div>
        </div>
      </div>

      {/* page dots */}
      <div style={{display:'flex', justifyContent:'center', gap:6, padding:'4px 0 14px'}}>
        {intros.map((_,i) => (
          <button key={i} onClick={()=>setPage(i)} style={{
            width: i===page?22:7, height:7, borderRadius:999,
            background: i===page?'var(--ink)':'rgba(20,20,26,.18)',
            border:0, transition:'width .2s', padding:0
          }} aria-label={`Go to slide ${i+1}`}/>
        ))}
      </div>

      {/* prev / next */}
      <div style={{padding:'0 20px 18px', display:'flex', gap:10}}>
        <button
          disabled={page===0}
          onClick={()=>setPage(p => Math.max(0, p-1))}
          style={{
            width:54, height:54, borderRadius:16, background:'#fff',
            border:'1px solid var(--line)', display:'grid', placeItems:'center',
            opacity: page===0?.4:1
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={() => page < intros.length-1 ? setPage(page+1) : go('student')}
          style={{
            flex:1, height:54, borderRadius:16, border:0,
            background:'var(--ink)', color:'#fff',
            fontSize:15, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8
          }}>
          {page < intros.length-1 ? 'Lanjut' : 'Mulai belajar'} {I.arrow({size:16, stroke:'#fff'})}
        </button>
      </div>

      {/* QUICK CTAs section */}
      <div style={{padding:'24px 20px 8px'}}>
        <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em', color:'var(--muted)', textTransform:'uppercase'}}>Mulai dari sini</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:26, lineHeight:1.1, marginTop:6}}>Pilih peranmu.</div>
      </div>

      <div style={{padding:'10px 20px 4px', display:'flex', flexDirection:'column', gap:10}}>
        <RoleCard
          tint="linear-gradient(135deg, #5B5BF7, #8A4FFF)"
          icon="star"
          title="Saya siswa"
          body="Belajar dengan Kiko · streak · misi harian · concept map"
          cta="Buka dashboard siswa"
          onClick={()=>go('student')}
        />
        <RoleCard
          tint="linear-gradient(135deg, #14141A, #2A2A33)"
          icon="grid"
          title="Saya guru"
          body="Heatmap miskonsepsi · upload materi · AI rekomendasi"
          cta="Buka dashboard guru"
          onClick={()=>go('teacher')}
        />
        <RoleCard
          tint="linear-gradient(135deg, #1F9E6A, #2DBF82)"
          icon="zap"
          title="Coba Teach-Me"
          body="Ajarkan eksponen negatif ke AI tutee · 5 menit demo"
          cta="Mulai sesi demo"
          onClick={()=>go('teach')}
        />
      </div>

      {/* HOW IT WORKS — mobile native vertical */}
      <div style={{padding:'34px 20px 8px'}}>
        <div className="eyebrow"><span className="dot"/>Cara kerjanya</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:26, lineHeight:1.1, marginTop:8}}>
          Enam langkah dari upload ke <em>mastery.</em>
        </div>
      </div>

      <div style={{padding:'14px 20px 4px', position:'relative'}}>
        <div style={{position:'absolute', left:38, top:32, bottom:32, width:2, background:'linear-gradient(180deg, #5B5BF7, #8A4FFF, var(--line) 80%)'}}/>
        {[
          { n:'01', t:'Upload materi', d:'PDF, RPP, foto whiteboard.'},
          { n:'02', t:'AI ekstrak konsep', d:'Topik & rantai prasyarat terpetakan ke kurikulum.'},
          { n:'03', t:'Tugaskan set adaptif', d:'Soal otomatis tersesuaikan dengan kelas.'},
          { n:'04', t:'Deteksi gap', d:'Diagnostic Agent menelusuri akar tiap kesalahan.'},
          { n:'05', t:'Teach-Me remediation', d:'Siswa mengajar AI tutee sampai paham.'},
          { n:'06', t:'Heatmap & coaching', d:'Guru melihat kelas sebagai matriks miskonsepsi.'},
        ].map((s,i) => (
          <div key={s.n} style={{display:'flex', gap:18, padding:'12px 0', position:'relative'}}>
            <div style={{
              width:34, height:34, borderRadius:12, flexShrink:0,
              background: i<2?'var(--grad)':'#fff',
              border: i<2?'0':'1px solid var(--line)',
              color: i<2?'#fff':'var(--ink-2)',
              display:'grid', placeItems:'center',
              fontFamily:'var(--f-mono)', fontSize:11, fontWeight:600,
              boxShadow: i<2?'0 6px 14px -4px rgba(91,91,247,.4)':'var(--sh-1)',
              zIndex:1
            }}>{s.n}</div>
            <div style={{flex:1, paddingTop:4}}>
              <div style={{fontWeight:600, fontSize:15}}>{s.t}</div>
              <div style={{color:'var(--muted)', fontSize:13, marginTop:4, lineHeight:1.5}}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* STATS card row */}
      <div style={{padding:'22px 20px 8px'}}>
        <div style={{
          padding:'20px', borderRadius:22, background:'var(--ink)', color:'#fff', position:'relative', overflow:'hidden'
        }}>
          <div style={{position:'absolute', inset:0, opacity:.55, background:'radial-gradient(circle at 10% 20%, rgba(91,91,247,.45), transparent 40%), radial-gradient(circle at 90% 80%, rgba(138,79,255,.3), transparent 45%)'}}/>
          <div style={{position:'relative'}}>
            <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.12em', opacity:.7}}>BUKTI · PILOT 6 MINGGU</div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:16}}>
              {[
                { v:'+34%', l:'Mastery gain'},
                { v:'72%',  l:'Salah karena prasyarat'},
                { v:'18s',  l:'Latensi deteksi'},
                { v:'4',    l:'Agen aktif'},
              ].map(s => (
                <div key={s.l}>
                  <div style={{fontFamily:'var(--f-serif)', fontSize:36, lineHeight:1, background:'linear-gradient(135deg,#A6A6FF,#D5BFFF)', WebkitBackgroundClip:'text', color:'transparent'}}>{s.v}</div>
                  <div style={{fontSize:11.5, opacity:.8, marginTop:6, lineHeight:1.4}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AGENTS strip — mobile vertical chain */}
      <div style={{padding:'30px 20px 10px'}}>
        <div className="eyebrow"><span className="dot"/>Agent orchestration</div>
        <div style={{fontFamily:'var(--f-serif)', fontSize:26, lineHeight:1.1, marginTop:8}}>
          Empat agen, satu otak kelas.
        </div>
      </div>

      <div style={{padding:'12px 20px 4px', display:'flex', flexDirection:'column', gap:10}}>
        {[
          { id:'DIAG',  n:'Diagnostic',     d:'Telusuri akar tiap jawaban salah.', tint:'#5B5BF7'},
          { id:'ROUTE', n:'Routing',        d:'Susun rencana remediasi & urutan Bloom.', tint:'#8A4FFF'},
          { id:'SOCR',  n:'Socratic',       d:'Berperan jadi siswa bingung yang harus diajar.', tint:'#3FB37F'},
          { id:'KNOW',  n:'KnowledgeTracker',d:'Update belief mastery & dorong kembali ke heatmap.', tint:'#C98A17'},
        ].map((a,i) => (
          <div key={a.id} style={{
            padding:'14px 16px', borderRadius:18, background:'#fff', border:'1px solid var(--line)',
            display:'flex', alignItems:'center', gap:14, position:'relative'
          }}>
            <div style={{
              width:44, height:44, borderRadius:14, background: a.tint+'1f',
              display:'grid', placeItems:'center', flexShrink:0
            }}>
              <span style={{width:10, height:10, borderRadius:999, background:a.tint, boxShadow:`0 0 0 5px ${a.tint}22`}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'.1em', color:'var(--muted)'}}>{a.id}.AGENT</div>
              <div style={{fontWeight:600, fontSize:14, marginTop:2}}>{a.n}</div>
              <div style={{fontSize:12.5, color:'var(--muted)', marginTop:4, lineHeight:1.45}}>{a.d}</div>
            </div>
            <span style={{fontFamily:'var(--f-mono)', fontSize:9, color: a.tint, fontWeight:600}}>● LIVE</span>
          </div>
        ))}
      </div>

      {/* TESTIMONIAL */}
      <div style={{padding:'30px 20px 4px'}}>
        <div style={{
          padding:'22px 20px', borderRadius:22,
          background:'linear-gradient(180deg, #FBFAF7, #fff)',
          border:'1px solid var(--line)'
        }}>
          <div style={{fontSize:34, lineHeight:1, color:'var(--indigo)', fontFamily:'var(--f-serif)', fontStyle:'italic'}}>"</div>
          <div style={{fontFamily:'var(--f-serif)', fontSize:19, lineHeight:1.35, marginTop:4, letterSpacing:'-.005em'}}>
            Pertama kali saya bisa lihat <em>mengapa</em> kelas saya gagal di matriks. Bukan karena materi matriksnya — tapi eksponen negatif tiga bab sebelumnya.
          </div>
          <div style={{display:'flex', alignItems:'center', gap:12, marginTop:18}}>
            <div className="avatar avatar--slate" style={{width:40, height:40, fontSize:13}}>RW</div>
            <div>
              <div style={{fontWeight:600, fontSize:13.5}}>Rini Wulandari</div>
              <div style={{fontSize:11.5, color:'var(--muted)'}}>Guru Matematika · SMA 8 Jakarta</div>
            </div>
          </div>
        </div>
      </div>

      {/* INSTALL CARD */}
      <div style={{padding:'30px 20px 4px'}}>
        <div style={{
          padding:'22px 20px', borderRadius:22,
          background:'var(--ink)', color:'#fff', position:'relative', overflow:'hidden'
        }}>
          <div style={{position:'absolute', inset:0, opacity:.5, background:'radial-gradient(circle at 20% 0%, rgba(91,91,247,.45), transparent 50%)'}}/>
          <div style={{position:'relative'}}>
            <div style={{width:54, height:54, borderRadius:16, background:'var(--grad)', boxShadow:'0 10px 28px -8px rgba(91,91,247,.6)', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(circle at 30% 30%, rgba(255,255,255,.55), transparent 60%)'}}/>
            </div>
            <div style={{fontFamily:'var(--f-serif)', fontSize:28, lineHeight:1.1, marginTop:16}}>Install <em style={{background:'linear-gradient(135deg,#A6A6FF,#D5BFFF)', WebkitBackgroundClip:'text', color:'transparent'}}>TICMI</em></div>
            <div style={{fontSize:13.5, opacity:.7, marginTop:6, lineHeight:1.5}}>Tambahkan ke Home Screen — works offline, push notif, terasa native. 2.1 MB.</div>
            <button onClick={()=>go('mobile')} style={{
              marginTop:18, width:'100%', padding:'14px',
              background:'#fff', color:'var(--ink)', border:0, borderRadius:14,
              fontSize:14.5, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:8
            }}>Lihat cara install {I.arrow({size:14})}</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{padding:'30px 20px 100px', textAlign:'center'}}>
        <div className="brand-mark" style={{width:32, height:32, borderRadius:10, margin:'0 auto'}}/>
        <div style={{fontFamily:'var(--f-mono)', fontSize:10.5, letterSpacing:'.14em', color:'var(--muted)', marginTop:10}}>TICMI · MULTI-AGENT CLASSROOM</div>
        <div style={{fontSize:11.5, color:'var(--muted-2)', marginTop:6}}>Made for LIDM 2026 · Indonesia</div>
      </div>

      {/* Sticky CTA bar */}
      <div style={{
        position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:430, zIndex:40,
        padding:'12px 16px 22px',
        background:'rgba(247,246,242,.92)', backdropFilter:'saturate(1.4) blur(14px)',
        borderTop:'1px solid rgba(20,20,26,.06)',
        display:'flex', gap:8
      }}>
        <button className="btn" style={{flex:1, padding:'14px', borderRadius:14, fontSize:14, fontWeight:600}}
          onClick={()=>go('teacher')}>Guru</button>
        <button style={{
          flex:2, padding:'14px', borderRadius:14, border:0,
          background:'var(--grad)', color:'#fff', fontSize:14, fontWeight:600,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          boxShadow:'0 10px 24px -8px rgba(91,91,247,.5)'
        }} onClick={()=>go('student')}>Mulai belajar {I.arrow({size:14, stroke:'#fff'})}</button>
      </div>
    </div>
  );
}

function RoleCard({ tint, icon, title, body, cta, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:'100%', textAlign:'left', padding:'18px',
      borderRadius:20, background:tint, color:'#fff',
      border:0, position:'relative', overflow:'hidden',
      cursor:'pointer',
      boxShadow:'0 14px 30px -14px rgba(20,20,26,.25)'
    }}>
      <div style={{position:'absolute', inset:0, opacity:.4, background:'radial-gradient(circle at 90% 10%, rgba(255,255,255,.35), transparent 50%)'}}/>
      <div style={{position:'relative', display:'flex', alignItems:'center', gap:14}}>
        <div style={{
          width:48, height:48, borderRadius:14,
          background:'rgba(255,255,255,.18)', border:'1px solid rgba(255,255,255,.2)',
          backdropFilter:'blur(10px)',
          display:'grid', placeItems:'center', flexShrink:0
        }}>{I[icon]({size:22, stroke:'#fff', sw:1.8})}</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontFamily:'var(--f-serif)', fontSize:20, lineHeight:1.1}}>{title}</div>
          <div style={{fontSize:12.5, opacity:.88, marginTop:4, lineHeight:1.4}}>{body}</div>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>
      <div style={{position:'relative', marginTop:14, paddingTop:12, borderTop:'1px solid rgba(255,255,255,.18)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontSize:12.5, fontWeight:500, opacity:.95}}>{cta}</span>
        <span style={{fontFamily:'var(--f-mono)', fontSize:10, opacity:.7, letterSpacing:'.1em'}}>TAP</span>
      </div>
    </button>
  );
}

Object.assign(window, { MobileLanding, RoleCard });
