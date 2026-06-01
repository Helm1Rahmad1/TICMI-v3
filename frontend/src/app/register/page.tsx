'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Role = 'guru' | 'siswa';
type Step = 'role' | 'form' | 'done';

/* ── Icons ──────────────────────────────────────────────────────────── */
const Eye = ({ open }: { open: boolean }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const AtSign  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/></svg>;
const LockIco = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const UserIco = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const HomeIco = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BackIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const CheckIco= () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ── Shared top-bar ─────────────────────────────────────────────────── */
function TopBar({ onBack, step }: { onBack?: () => void; step?: 1 | 2 }) {
  return (
    <div style={{ padding: '20px 22px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
      {onBack ? (
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 11, border: '1.5px solid var(--line)', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--ink)', flexShrink: 0, boxShadow: '0 1px 3px rgba(20,20,26,.06)' }}>
          <BackIco />
        </button>
      ) : null}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{ width: 34, height: 34, borderRadius: 11, background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', display: 'grid', placeItems: 'center', boxShadow: '0 4px 14px -4px rgba(74,71,245,.55)' }}>
          <div style={{ width: 14, height: 14, background: '#fff', borderRadius: 4 }} />
        </div>
        <span style={{ fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 14, letterSpacing: '.14em', color: 'var(--ink)' }}>
          TIC<em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', WebkitBackgroundClip: 'text', color: 'transparent' }}>MI</em>
        </span>
      </Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 5, alignItems: 'center' }}>
        {step !== undefined ? (
          [1, 2].map(n => (
            <div key={n} style={{ height: 6, width: n === step ? 20 : 7, borderRadius: 999, background: n === step ? '#4A47F5' : 'var(--line)', transition: 'width .2s' }} />
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 999, background: 'rgba(74,71,245,.08)', border: '1px solid rgba(74,71,245,.15)' }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: '#4A47F5', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: '#4A47F5', letterSpacing: '.1em', fontWeight: 600 }}>LIDM 2026</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep]         = useState<Step>('role');
  const [role, setRole]         = useState<Role>('siswa');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [school, setSchool]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});

  const pwStrength = !password ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  const pwMeta = ([, ['Lemah','var(--err)'],['Cukup','#F59E0B'],['Sedang','#F59E0B'],['Kuat','var(--ok)']] as const)[pwStrength];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())   e.name     = 'Nama wajib diisi.';
    if (!email.trim())  e.email    = 'Email wajib diisi.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Format email tidak valid.';
    if (!school.trim()) e.school   = 'Nama sekolah wajib diisi.';
    if (!password)      e.password = 'Kata sandi wajib diisi.';
    else if (password.length < 8) e.password = 'Minimal 8 karakter.';
    if (!confirm)       e.confirm  = 'Konfirmasi kata sandi wajib diisi.';
    else if (password !== confirm) e.confirm = 'Kata sandi tidak cocok.';
    if (!agreed)        e.agreed   = 'Setujui syarat & ketentuan terlebih dahulu.';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    setTimeout(() => { setLoading(false); setStep('done'); }, 1400);
  };

  const fieldStyle = (f: string, extra?: React.CSSProperties): React.CSSProperties => ({
    width: '100%', padding: '13px 14px 13px 42px', outline: 'none', boxSizing: 'border-box',
    border: `1.5px solid ${errors[f] ? 'var(--err)' : 'var(--line)'}`,
    borderRadius: 13, fontSize: 14, fontFamily: 'var(--f-sans)',
    background: '#fff', color: 'var(--ink)', transition: 'border-color .15s', ...extra,
  });
  const iconWrap: React.CSSProperties = { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-2)', display: 'flex' };
  const eyeBtn:   React.CSSProperties = { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: 'var(--muted-2)', padding: 0, display: 'flex' };
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = '#4A47F5'; };
  const onBlur  = (f: string) => (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = errors[f] ? 'var(--err)' : 'var(--line)'; };
  const Label   = ({ t }: { t: string }) => <label style={{ display: 'block', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' as const, marginBottom: 6 }}>{t}</label>;
  const Err     = ({ f }: { f: string }) => errors[f] ? <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--err)' }}>{errors[f]}</p> : null;

  /* ── DONE ────────────────────────────────────────────────────── */
  if (step === 'done') return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '32px 24px', textAlign: 'center' }}>
      <div style={{ width: 72, height: 72, borderRadius: 999, background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', display: 'grid', placeItems: 'center', marginBottom: 24, boxShadow: '0 12px 32px -8px rgba(74,71,245,.5)' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style={{ fontFamily: 'var(--f-serif)', fontSize: 34, lineHeight: 1.08, letterSpacing: '-.01em', color: 'var(--ink)', marginBottom: 10 }}>
        Akun berhasil<br />
        <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', WebkitBackgroundClip: 'text', color: 'transparent' }}>dibuat!</em>
      </div>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 260, marginBottom: 32 }}>
        Halo, <strong style={{ color: 'var(--ink)' }}>{name}</strong>! Akunmu sudah siap. Mari mulai belajar.
      </p>
      <button onClick={() => router.push(role === 'guru' ? '/teacher' : '/student')} style={{ width: '100%', maxWidth: 320, padding: '15px', borderRadius: 14, border: 0, background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 28px -6px rgba(74,71,245,.5)' }}>
        Mulai sekarang →
      </button>
    </div>
  );

  /* ── ROLE ────────────────────────────────────────────────────── */
  if (step === 'role') return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <TopBar step={1} />

      <div style={{ padding: '32px 24px 20px' }}>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 34, lineHeight: 1.06, letterSpacing: '-.01em', color: 'var(--ink)' }}>
          Bergabung<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            sebagai siapa?
          </em>
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, lineHeight: 1.55 }}>
          Pilih peranmu untuk pengalaman yang tepat.
        </p>
      </div>

      <div style={{ flex: 1, padding: '4px 20px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {([
          { key: 'siswa' as Role, emoji: '🎒', title: 'Siswa', desc: 'Belajar adaptif, misi harian, dan konsep map AI.', perks: ['Misi harian', 'Teach-me AI', 'Concept map'] },
          { key: 'guru'  as Role, emoji: '📋', title: 'Guru',  desc: 'Pantau kelas secara real-time dengan AI insight.',  perks: ['Heatmap kelas', 'AI insight', 'Analitik'] },
        ]).map(r => (
          <button key={r.key} onClick={() => setRole(r.key)} style={{
            width: '100%', padding: '18px', borderRadius: 18, cursor: 'pointer', textAlign: 'left',
            border: `2px solid ${role === r.key ? '#4A47F5' : 'var(--line)'}`,
            background: role === r.key ? 'rgba(74,71,245,.04)' : '#fff',
            display: 'flex', alignItems: 'flex-start', gap: 14,
            boxShadow: role === r.key ? '0 0 0 4px rgba(74,71,245,.09), 0 2px 8px rgba(20,20,26,.06)' : '0 1px 3px rgba(20,20,26,.06)',
            transition: 'all .15s',
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: role === r.key ? 'rgba(74,71,245,.1)' : 'var(--bg)', display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>
              {r.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15.5, color: role === r.key ? '#4A47F5' : 'var(--ink)', marginBottom: 3 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.45, marginBottom: 10 }}>{r.desc}</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {r.perks.map(p => (
                  <span key={p} style={{ padding: '2px 8px', borderRadius: 999, background: role === r.key ? 'rgba(74,71,245,.09)' : 'var(--bg)', border: `1px solid ${role === r.key ? 'rgba(74,71,245,.18)' : 'var(--line)'}`, fontSize: 10.5, color: role === r.key ? '#4A47F5' : 'var(--muted)', fontFamily: 'var(--f-mono)' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: 999, border: `2px solid ${role === r.key ? '#4A47F5' : 'var(--line)'}`, background: role === r.key ? '#4A47F5' : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 2 }}>
              {role === r.key && <div style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }} />}
            </div>
          </button>
        ))}

        <button onClick={() => setStep('form')} style={{ marginTop: 6, width: '100%', padding: '15px', borderRadius: 14, border: 0, background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 28px -6px rgba(74,71,245,.5)', letterSpacing: '.01em' }}>
          Lanjut sebagai {role === 'guru' ? 'Guru' : 'Siswa'} →
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          Sudah punya akun?{' '}
          <Link href="/login" style={{ color: '#4A47F5', fontWeight: 700 }}>Masuk</Link>
        </div>
      </div>
    </div>
  );

  /* ── FORM ─────────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <TopBar onBack={() => setStep('role')} step={2} />

      <div style={{ padding: '28px 24px 20px' }}>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 34, lineHeight: 1.06, letterSpacing: '-.01em', color: 'var(--ink)' }}>
          Buat akun<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            barumu.
          </em>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 14 }}>{role === 'siswa' ? '🎒' : '📋'}</span>
          <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>
            Daftar sebagai <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{role === 'siswa' ? 'Siswa' : 'Guru'}</strong>
          </span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* nama */}
        <div>
          <Label t="Nama lengkap" />
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><UserIco /></div>
            <input type="text" value={name} placeholder="Devin Pratama"
              onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })); }}
              style={fieldStyle('name')} onFocus={onFocus} onBlur={onBlur('name')} />
          </div>
          <Err f="name" />
        </div>

        {/* email */}
        <div>
          <Label t="Email sekolah" />
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><AtSign /></div>
            <input type="email" value={email} placeholder={role === 'guru' ? 'guru@sekolah.sch.id' : 'siswa@sekolah.sch.id'}
              onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })); }}
              style={fieldStyle('email')} onFocus={onFocus} onBlur={onBlur('email')} />
          </div>
          <Err f="email" />
        </div>

        {/* sekolah */}
        <div>
          <Label t="Nama sekolah" />
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><HomeIco /></div>
            <input type="text" value={school} placeholder="SMA Negeri 8 Jakarta"
              onChange={e => { setSchool(e.target.value); setErrors(v => ({ ...v, school: '' })); }}
              style={fieldStyle('school')} onFocus={onFocus} onBlur={onBlur('school')} />
          </div>
          <Err f="school" />
        </div>

        {/* password */}
        <div>
          <Label t="Kata sandi" />
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><LockIco /></div>
            <input type={showPass ? 'text' : 'password'} value={password} placeholder="Min. 8 karakter"
              onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '', confirm: '' })); }}
              style={fieldStyle('password', { paddingRight: 46 })} onFocus={onFocus} onBlur={onBlur('password')} />
            <button onClick={() => setShowPass(s => !s)} style={eyeBtn}><Eye open={showPass} /></button>
          </div>
          <Err f="password" />
          {password && !errors.password && pwMeta && (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i <= pwStrength ? pwMeta[1] : 'var(--line-2)', transition: 'background .2s' }} />)}
              <span style={{ fontSize: 10.5, color: pwMeta[1], fontFamily: 'var(--f-mono)', marginLeft: 5, minWidth: 40 }}>{pwMeta[0]}</span>
            </div>
          )}
        </div>

        {/* konfirmasi */}
        <div>
          <Label t="Konfirmasi kata sandi" />
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><LockIco /></div>
            <input type={showConf ? 'text' : 'password'} value={confirm} placeholder="Ulangi kata sandi"
              onChange={e => { setConfirm(e.target.value); setErrors(v => ({ ...v, confirm: '' })); }}
              style={fieldStyle('confirm', { paddingRight: confirm && password === confirm ? 68 : 46 })} onFocus={onFocus} onBlur={onBlur('confirm')} />
            {confirm && password === confirm && (
              <div style={{ position: 'absolute', right: 44, top: '50%', transform: 'translateY(-50%)', color: 'var(--ok)', display: 'flex' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            )}
            <button onClick={() => setShowConf(s => !s)} style={eyeBtn}><Eye open={showConf} /></button>
          </div>
          <Err f="confirm" />
        </div>

        {/* terms */}
        <button onClick={() => { setAgreed(a => !a); setErrors(v => ({ ...v, agreed: '' })); }} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, border: `1.5px solid ${errors.agreed ? 'var(--err)' : agreed ? 'rgba(74,71,245,.28)' : 'var(--line)'}`, borderRadius: 13, cursor: 'pointer', padding: '12px 14px', textAlign: 'left', width: '100%', background: agreed ? 'rgba(74,71,245,.04)' : '#fff', transition: 'all .15s', boxShadow: '0 1px 3px rgba(20,20,26,.05)' } as React.CSSProperties}>
          <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1, border: `1.5px solid ${errors.agreed ? 'var(--err)' : agreed ? '#4A47F5' : 'var(--line)'}`, background: agreed ? '#4A47F5' : '#fff', display: 'grid', placeItems: 'center', transition: 'all .15s' }}>
            {agreed && <CheckIco />}
          </div>
          <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
            Saya menyetujui{' '}
            <span style={{ color: '#4A47F5', fontWeight: 600 }}>Syarat & Ketentuan</span>
            {' '}dan{' '}
            <span style={{ color: '#4A47F5', fontWeight: 600 }}>Kebijakan Privasi</span>
            {' '}TICMI.
          </span>
        </button>
        {errors.agreed && <p style={{ margin: '-8px 0 0', fontSize: 12, color: 'var(--err)' }}>{errors.agreed}</p>}

        {/* divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--muted-2)', letterSpacing: '.08em' }}>ATAU</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        {/* google */}
        <button style={{ width: '100%', padding: '13px', borderRadius: 14, border: '1.5px solid var(--line)', background: '#fff', fontSize: 14, fontWeight: 500, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 1px 3px rgba(20,20,26,.06)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
          Daftar dengan Google
        </button>

        {/* submit */}
        <button onClick={submit} disabled={loading} style={{ width: '100%', padding: '15px', borderRadius: 14, border: 0, background: loading ? 'rgba(74,71,245,.45)' : 'linear-gradient(135deg,#4A47F5,#7C3AED)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: loading ? 'none' : '0 10px 28px -6px rgba(74,71,245,.5)', letterSpacing: '.01em' }}>
          {loading
            ? <><span style={{ width: 17, height: 17, border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: 999, animation: 'ring-spin .7s linear infinite', display: 'inline-block' }} />Membuat akun…</>
            : `Buat akun ${role === 'guru' ? 'Guru' : 'Siswa'} →`
          }
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          Sudah punya akun?{' '}
          <Link href="/login" style={{ color: '#4A47F5', fontWeight: 700 }}>Masuk</Link>
        </div>
      </div>
    </div>
  );
}
