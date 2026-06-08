'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const [answer, setAnswer] = useState('');
  const [conf, setConf] = useState(4);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [startTime] = useState(Date.now());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);
    const dwellTime = Math.round((Date.now() - startTime) / 1000);

    try {
      // 1. Start session on functions composition
      const sessionResponse = await fetch('http://localhost:3001/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: 'std_default_dev',
          nodeId: 'f-fungsi-komposisi-invers',
        }),
      });

      if (!sessionResponse.ok) throw new Error('Failed to start session');
      const session = await sessionResponse.json();

      // 2. Submit learning telemetry
      await fetch(`http://localhost:3001/api/sessions/${session.id}/telemetry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeId: 'f-fungsi-komposisi-invers',
          dwellTimeSeconds: dwellTime,
          backspaceCount: backspaceCount,
          confidenceRating: conf,
          typedCharacters: answer.length,
        }),
      });

      // 3. Connect to WebSocket and submit answer to trigger LangGraph loop
      const socket = require('socket.io-client').io('http://localhost:3001/chat');
      
      socket.on('connect', () => {
        socket.emit('join_session', { sessionId: session.id });
        socket.emit('send_message', { message: answer });
      });

      socket.on('agent_response', (data: { text: string; agentType: string }) => {
        socket.disconnect();
        // Redirect to Teach-Me mode
        router.push(`/student/teach-me?sessionId=${session.id}`);
      });

      socket.on('error', (err: any) => {
        console.error('WS Error:', err);
        socket.disconnect();
        // Fallback redirect
        router.push(`/student/teach-me?sessionId=${session.id}`);
      });

    } catch (err) {
      console.error('Failed to submit answer:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 54, paddingBottom: 100, minHeight: '100vh', overflow: 'auto', background: '#fff' }}>
      {/* progress bar */}
      <div style={{ padding: '4px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => router.back()} className="icon-btn" style={{ width: 36, height: 36, borderRadius: 12, flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em' }}>TUGAS MANDIRI SOAL 1 DARI 3</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ flex: 1, height: 4, background: 'var(--bg-2)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: '33%', height: '100%', background: 'var(--grad)' }} />
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)' }}>Fase F</span>
          </div>
        </div>
      </div>

      {/* question */}
      <div style={{ padding: '22px' }}>
        <div className="eyebrow"><span className="dot" />APPLY · BLOOM L3</div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 21, lineHeight: 1.3, marginTop: 10 }}>
          Selesaikan komposisi fungsi berikut:<br />
          Diberikan fungsi <span style={{ fontFamily: 'var(--f-mono)', fontSize: 16, background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4 }}>f(x) = 1/x</span> dan <span style={{ fontFamily: 'var(--f-mono)', fontSize: 16, background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4 }}>g(x) = x − 2</span>.<br />
          Tentukan persamaan untuk <span style={{ fontWeight: 600 }}>(f ∘ g)(x)</span>.
        </div>

        {/* what TICMI watches */}
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(91,91,247,.05)', borderRadius: 14, border: '1px solid rgba(91,91,247,.15)' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, color: 'var(--indigo)', letterSpacing: '.1em', marginBottom: 8 }}>TICMI MEMANTAU KONSEP PRASYARAT</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Operasi Aljabar Pecahan','Domain Fungsi pecahan','Aturan Substitusi'].map(t => (
              <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div style={{ marginTop: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>JAWABAN ANDA</label>
          <input 
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tuliskan solusi Anda (misal: 1/(x-2) atau 1/x - 2)..."
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: 14, 
              border: '1.5px solid var(--line)', 
              borderRadius: 16, 
              outline: 'none',
              fontFamily: 'var(--f-mono)',
              boxShadow: 'var(--sh-1)'
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
            *Hint: Coba masukkan jawaban salah <code style={{ background: 'var(--bg-2)', padding: '2px 4px', borderRadius: 4 }}>1/x - 2</code> untuk melihat bagaimana sistem mendeteksi celah konsep.
          </div>
        </div>

        {/* confidence */}
        <div style={{ marginTop: 24, padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 16, background: 'var(--bg-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Keyakinanmu dengan solusi ini</div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--indigo)', fontWeight: 600 }}>{conf * 20}%</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4,5].map(n => (
              <div key={n} onClick={() => setConf(n)} style={{ flex: 1, height: 8, borderRadius: 6, background: n <= conf ? 'var(--grad)' : 'var(--line-2)', cursor: 'pointer', transition: 'background .15s' }} />
            ))}
          </div>
        </div>

        {/* hint panel */}
        {showHint && (
          <div style={{ marginTop: 14, padding: '14px', borderRadius: 14, background: 'rgba(251,241,220,.7)', border: '1px solid rgba(201,138,23,.3)' }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>Hint</div>
            <div style={{ fontSize: 13, marginTop: 8, lineHeight: 1.55 }}>
              Substitusikan ekspresi g(x) ke dalam setiap variabel x di fungsi f(x).
            </div>
          </div>
        )}
      </div>

      {/* sticky bottom */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '14px 22px 22px', background: '#fff', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, zIndex: 20 }}>
        <button onClick={() => setShowHint(true)} className="icon-btn" style={{ width: 48, height: 48, borderRadius: 14, color: 'var(--warn)', background: 'rgba(201,138,23,.10)', border: '1px solid rgba(201,138,23,.2)', flexShrink: 0 }}>
          {I.spark({ size: 18 })}
        </button>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || !answer.trim()}
          style={{ 
            flex: 1, 
            background: isSubmitting ? 'var(--muted)' : 'var(--grad)', 
            color: '#fff', 
            border: 0, 
            borderRadius: 16, 
            fontSize: 15, 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            boxShadow: '0 10px 24px -8px rgba(91,91,247,.5)',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'} {I.arrow({ size: 15, stroke: '#fff' })}
        </button>
      </div>
    </div>
  );
}
