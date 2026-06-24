'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { I } from '@/components/shared/icons';
import Latex from '@/components/shared/Latex';

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const [showConceptsModal, setShowConceptsModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [conf, setConf] = useState(4);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [startTime] = useState(Date.now());
  const [gapDetected, setGapDetected] = useState(false);
  const [resolvedSessionId, setResolvedSessionId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
    }
    if (e.key === 'Enter') {
      if (gapDetected) {
        router.push(`/student/teach-me?sessionId=${resolvedSessionId}`);
      } else {
        handleSubmit();
      }
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
        // Instead of direct redirect, show notification banner
        setResolvedSessionId(session.id);
        setFeedbackText(data.text);
        setGapDetected(true);
        setIsSubmitting(false);
      });

      socket.on('error', (err: any) => {
        console.error('WS Error:', err);
        socket.disconnect();
        // Fallback show notification banner
        setResolvedSessionId(session.id);
        setGapDetected(true);
        setIsSubmitting(false);
      });

    } catch (err) {
      console.error('Failed to submit answer:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 28, paddingBottom: 0, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden' }}>
      
      {/* progress bar */}
      <div style={{ padding: '4px 22px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--line-2)', flexShrink: 0 }}>
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

      {/* scrollable question content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="eyebrow"><span className="dot" />FUNGSI KOMPOSISI</div>
          <button 
            onClick={() => setShowConceptsModal(true)}
            style={{
              border: 0, background: 'rgba(91,91,247,.08)', color: 'var(--indigo)',
              padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600,
              fontFamily: 'var(--f-mono)', display: 'flex', alignItems: 'center', gap: 4,
              cursor: 'pointer'
            }}
          >
            🔍 Prasyarat
          </button>
        </div>
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: 21, lineHeight: 1.3, marginTop: 14 }}>
          Selesaikan komposisi fungsi berikut:<br />
          Diberikan fungsi <span style={{ fontFamily: 'var(--f-mono)', fontSize: 16, background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4 }}><Latex math="f(x) = \frac{1}{x}" /></span> dan <span style={{ fontFamily: 'var(--f-mono)', fontSize: 16, background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4 }}><Latex math="g(x) = x - 2" /></span>.<br />
          Tentukan persamaan untuk <span style={{ fontWeight: 600 }}><Latex math="(f \circ g)(x)" /></span>.
        </div>

        {/* Text Input */}
        <div style={{ marginTop: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>JAWABAN ANDA</label>
          <input 
            type="text"
            value={answer}
            disabled={gapDetected}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={gapDetected ? "Miskonsepsi terdeteksi. Silakan ikuti remediasi." : "Tuliskan solusi Anda (misal: 1/(x-2) atau 1/x - 2)..."}
            style={{ 
              width: '100%', 
              padding: '14px', 
              fontSize: 14, 
              border: '1.5px solid var(--line)', 
              borderRadius: 16, 
              outline: 'none',
              fontFamily: 'var(--f-mono)',
              boxShadow: 'var(--sh-1)',
              background: gapDetected ? 'var(--bg-2)' : '#fff',
              cursor: gapDetected ? 'not-allowed' : 'text'
            }}
          />
          {gapDetected && (
            <div style={{ 
              marginTop: 16, 
              padding: '16px', 
              borderRadius: 16, 
              background: 'var(--err-bg)', 
              border: '1.5px dashed rgba(209,67,67,.3)',
              animation: 'pageFade .3s ease both'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--err)', fontWeight: 600, fontSize: 13.5 }}>
                ⚠️ Celah Konsep Terdeteksi
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>
                Sistem mendeteksi adanya kelemahan prasyarat dasar pada **Operasi Bilangan & Pecahan**. 
                Bantu AI Murid Anda (**Kiko**) menyelesaikan konsep ini terlebih dahulu.
              </div>
              <button
                onClick={() => router.push(`/student/teach-me?sessionId=${resolvedSessionId}`)}
                style={{
                  marginTop: 12,
                  width: '100%',
                  padding: '12px 14px',
                  background: 'var(--err)',
                  color: '#fff',
                  border: 0,
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(209,67,67,.2)'
                }}
              >
                Mulai Sesi Teach-Me {I.arrow({ size: 13, stroke: '#fff' })}
              </button>
            </div>
          )}
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

      {/* sticky bottom action bar */}
      <div style={{ padding: '14px 22px 22px', background: '#fff', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, zIndex: 20, flexShrink: 0 }}>
        <button onClick={() => setShowHint(true)} className="icon-btn" style={{ width: 48, height: 48, borderRadius: 14, color: 'var(--warn)', background: 'rgba(201,138,23,.10)', border: '1px solid rgba(201,138,23,.2)', flexShrink: 0 }}>
          {I.spark({ size: 18 })}
        </button>
        <button 
          onClick={gapDetected ? () => router.push(`/student/teach-me?sessionId=${resolvedSessionId}`) : handleSubmit}
          disabled={isSubmitting || (!answer.trim() && !gapDetected)}
          style={{ 
            flex: 1, 
            background: gapDetected ? 'var(--err)' : (isSubmitting ? 'var(--muted)' : 'var(--grad)'), 
            color: '#fff', 
            border: 0, 
            borderRadius: 16, 
            fontSize: 15, 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            boxShadow: gapDetected ? '0 10px 24px -8px rgba(209,67,67,.5)' : '0 10px 24px -8px rgba(91,91,247,.5)',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {gapDetected ? 'Mulai Sesi Teach-Me' : (isSubmitting ? 'Mengirim...' : 'Kirim Jawaban')} {I.arrow({ size: 15, stroke: '#fff' })}
        </button>
      </div>

      {/* Prerequisite Concepts Modal */}
      {showConceptsModal && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(20,20,26,.4)',
          backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, width: '100%', maxWidth: 360,
            padding: 20, boxShadow: '0 20px 48px -10px rgba(20,20,26,.28)',
            animation: 'pageFade .25s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--f-serif)', fontSize: 18, fontWeight: 600 }}>Konsep Prasyarat Dipantau</h3>
              <button 
                onClick={() => setShowConceptsModal(false)}
                style={{ border: 0, background: 'none', fontSize: 18, cursor: 'pointer', padding: 4, display: 'flex', color: 'var(--muted)' }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>
              TICMI memantau pemahaman Anda terhadap konsep dasar di bawah ini untuk mendeteksi celah belajar (*learning gap*) secara otomatis jika jawaban Anda salah:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                { t: 'Operasi Aljabar Pecahan', d: 'Menyamakan penyebut dan mengoperasikan pembilang aljabar.' },
                { t: 'Domain Fungsi Pecahan', d: 'Menentukan daerah asal fungsi dengan syarat penyebut ≠ 0.' },
                { t: 'Aturan Substitusi', d: 'Memasukkan fungsi g(x) ke dalam variabel x pada f(x).' }
              ].map(c => (
                <div key={c.t} style={{ padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 12, border: '1px solid var(--line-2)', textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 12.5, color: 'var(--ink)' }}>{c.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.d}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowConceptsModal(false)}
              style={{ width: '100%', padding: '12px', background: 'var(--ink)', color: '#fff', border: 0, borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
