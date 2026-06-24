'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Role = 'guru' | 'siswa';

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

const AtSign = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/>
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole]         = useState<Role>('siswa');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const submit = () => {
    if (!email || !password) { setError('Email dan kata sandi wajib diisi.'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); router.push(role === 'guru' ? '/teacher' : '/student'); }, 1200);
  };

  const iconWrap: React.CSSProperties = {
    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
    color: 'var(--muted-2)', display: 'flex',
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, borderRadius: 11, background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', display: 'grid', placeItems: 'center', boxShadow: '0 4px 14px -4px rgba(74,71,245,.55)' }}>
            <div style={{ width: 14, height: 14, background: '#fff', borderRadius: 4 }} />
          </div>
          <span style={{ fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 14, letterSpacing: '.14em', color: 'var(--ink)' }}>
            TIC<em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', WebkitBackgroundClip: 'text', color: 'transparent' }}>MI</em>
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 999, background: 'rgba(74,71,245,.08)', border: '1px solid rgba(74,71,245,.15)' }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: '#4A47F5', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: '#4A47F5', letterSpacing: '.1em', fontWeight: 600 }}>v3.0.0</span>
        </div>
      </div>

      {/* ── Headline ────────────────────────────────────── */}
      <div style={{ padding: '36px 24px 28px' }}>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 36, lineHeight: 1.06, letterSpacing: '-.01em', color: 'var(--ink)' }}>
          Selamat datang<br />
          <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#4A47F5,#7C3AED)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            kembali.
          </em>
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, lineHeight: 1.55 }}>
          Masuk untuk melanjutkan sesi belajarmu.
        </div>
      </div>

      {/* ── Form ───────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '0 20px 36px', display: 'flex', flexDirection: 'column', gap: 15 }}>

        {/* role toggle */}
        <div style={{ display: 'flex', padding: 3, background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14 }}>
          {(['siswa', 'guru'] as Role[]).map(r => (
            <button key={r} onClick={() => { setRole(r); setError(''); setEmail(''); setPassword(''); }} style={{
              flex: 1, padding: '10px 0', borderRadius: 10, border: 0, cursor: 'pointer',
              background: role === r ? 'linear-gradient(135deg,#4A47F5,#7C3AED)' : 'transparent',
              color: role === r ? '#fff' : 'var(--muted)',
              fontWeight: 600, fontSize: 13.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
              transition: 'all .15s',
              boxShadow: role === r ? '0 4px 14px -4px rgba(74,71,245,.5)' : 'none',
            }}>
              <span style={{ fontSize: 15 }}>{r === 'siswa' ? '🎒' : '📋'}</span>
              {r === 'siswa' ? 'Siswa' : 'Guru'}
            </button>
          ))}
        </div>

        {/* email */}
        <div>
          <label style={{ display: 'block', fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 7 }}>
            Email sekolah
          </label>
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><AtSign /></div>
            <input type="email" value={email}
              placeholder={role === 'guru' ? 'guru@sekolah.sch.id' : 'siswa@sekolah.sch.id'}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              style={{ width: '100%', padding: '13px 14px 13px 42px', outline: 'none', boxSizing: 'border-box', border: `1.5px solid ${error && !email ? 'var(--err)' : 'var(--line)'}`, borderRadius: 13, fontSize: 14, fontFamily: 'var(--f-sans)', background: '#fff', color: 'var(--ink)', transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = '#4A47F5'}
              onBlur={e => e.target.style.borderColor = (error && !email) ? 'var(--err)' : 'var(--line)'}
            />
          </div>
        </div>

        {/* password */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <label style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>Kata sandi</label>
            <span style={{ fontSize: 12, color: '#4A47F5', fontWeight: 600, cursor: 'pointer' }}>Lupa kata sandi?</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={iconWrap}><LockIcon /></div>
            <input type={showPass ? 'text' : 'password'} value={password} placeholder="••••••••"
              onChange={e => { setPassword(e.target.value); setError(''); }}
              style={{ width: '100%', padding: '13px 48px 13px 42px', outline: 'none', boxSizing: 'border-box', border: `1.5px solid ${error && !password ? 'var(--err)' : 'var(--line)'}`, borderRadius: 13, fontSize: 14, fontFamily: 'var(--f-sans)', background: '#fff', color: 'var(--ink)', transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = '#4A47F5'}
              onBlur={e => e.target.style.borderColor = (error && !password) ? 'var(--err)' : 'var(--line)'}
            />
            <button onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 0, cursor: 'pointer', color: 'var(--muted-2)', padding: 0, display: 'flex' }}>
              <Eye open={showPass} />
            </button>
          </div>
        </div>

        {/* error */}
        {error && (
          <div style={{ padding: '11px 14px', borderRadius: 12, background: 'var(--err-bg)', border: '1px solid rgba(209,67,67,.18)', fontSize: 13, color: 'var(--err)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {error}
          </div>
        )}

        {/* CTA */}
        <button onClick={submit} disabled={loading} style={{
          width: '100%', padding: '15px', borderRadius: 14, border: 0,
          background: loading ? 'rgba(74,71,245,.45)' : 'linear-gradient(135deg,#4A47F5 0%,#7C3AED 100%)',
          color: '#fff', fontSize: 15, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: loading ? 'none' : '0 10px 28px -6px rgba(74,71,245,.5)',
          letterSpacing: '.01em', transition: 'all .2s',
        }}>
          {loading
            ? <><span style={{ width: 17, height: 17, border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: 999, animation: 'ring-spin .7s linear infinite', display: 'inline-block' }} />Masuk…</>
            : `Masuk sebagai ${role === 'guru' ? 'Guru' : 'Siswa'} →`
          }
        </button>

        {/* divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: 10.5, color: 'var(--muted-2)', letterSpacing: '.08em' }}>ATAU</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        {/* Google */}
        <button style={{ width: '100%', padding: '13px', borderRadius: 14, border: '1.5px solid var(--line)', background: '#fff', fontSize: 14, fontWeight: 500, color: 'var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 1px 3px rgba(20,20,26,.06)' }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
          Lanjutkan dengan Google
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
          Belum punya akun?{' '}
          <Link href="/register" style={{ color: '#4A47F5', fontWeight: 700 }}>Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}
