'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { I } from '@/components/shared/icons';
import Latex from '@/components/shared/Latex';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

function MessageText({ content }: { content: string }) {
  if (!content.includes('$')) return <>{content}</>;
  const parts = content.split(/(\$[^\$]+\$)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <Latex key={index} math={math} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function TeachMePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId') || 'default_session';
  const socketRef = useRef<Socket | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init_1',
      role: 'assistant',
      content: '🤖 [Kiko (AI Murid)]: "Halo Kak! Saya sedang mencoba menyelesaikan limit dan komposisi pecahan, tapi saya bingung kenapa $\\frac{1}{x-2}$ itu tidak sama dengan $\\frac{1}{x} - 2$. Bisa bantu jelaskan cara menyamakan penyebut pecahan aljabar?"'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [masteryProgress, setMasteryProgress] = useState(40);
  const [remNodeId, setRemNodeId] = useState('d-operasi-bilangan');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Connect to NestJS WebSocket Gateway
    const socket = io('http://localhost:3001/chat');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      socket.emit('join_session', { sessionId });
    });

    socket.on('joined', (data) => {
      console.log('Joined session:', data);
      if (data.activeNodeId) {
        setRemNodeId(data.activeNodeId);
      }
    });

    socket.on('agent_response', (data: { text: string; agentType: string; masteryAchieved?: boolean }) => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg_${Date.now()}`,
          role: 'assistant',
          content: data.text,
        }
      ]);

      if (data.masteryAchieved) {
        setMasteryProgress(100);
        // Show success and redirect
        setTimeout(() => {
          router.push('/student/map');
        }, 3000);
      } else {
        setMasteryProgress(prev => Math.min(prev + 15, 85));
      }
    });

    socket.on('concept_status_update', (data: { nodeId: string; status: string }) => {
      console.log('Concept status updated:', data);
    });

    socket.on('error', (err) => {
      console.error('WS Error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId, router]);

  const handleSend = () => {
    if (!inputText.trim() || !socketRef.current) return;

    const userMsg = inputText.trim();
    setMessages(prev => [
      ...prev,
      {
        id: `msg_${Date.now()}`,
        role: 'user',
        content: userMsg
      }
    ]);
    
    setIsTyping(true);
    setInputText('');

    socketRef.current.emit('send_message', { message: userMsg });
  };

  const getRemNodeLabel = (id: string) => {
    if (id === 'd-operasi-bilangan') return 'Operasi Bilangan & Pecahan';
    return id.replace(/-/g, ' ');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 28, paddingBottom: 0, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#FBFAF7 0%,#fff 30%)', overflow: 'hidden' }}>

      {/* Kiko header */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--line)' }}>
        <button onClick={() => router.back()} className="icon-btn" style={{ width: 36, height: 36, borderRadius: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="avatar avatar--slate" style={{ width: 36, height: 36, fontSize: 13, position: 'relative' }}>
          K
          <span style={{ position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: 999, background: 'var(--ok)', border: '2px solid #fff' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Kiko</div>
          <div style={{ fontSize: 11, color: isTyping ? 'var(--indigo)' : 'var(--ok)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {isTyping ? 'Mengetik…' : 'Aktif'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '.08em' }}>PEMAHAMAN</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <div style={{ width: 46, height: 6, background: 'var(--line-2)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${masteryProgress}%`, height: '100%', background: 'var(--grad)' }} />
            </div>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, fontWeight: 600 }}>{masteryProgress}%</span>
          </div>
        </div>
      </div>

      {/* concept chips */}
      <div style={{ padding: '10px 16px 4px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
          { l: getRemNodeLabel(remNodeId), s: 'err' },
          { l: 'Fungsi Komposisi (Fase F)', s: 'cur' }
        ].map(c => (
          <div key={c.l} style={{
            padding: '5px 10px 5px 8px', borderRadius: 999, fontSize: 11, whiteSpace: 'nowrap',
            background: c.s === 'ok' ? 'var(--ok-bg)' : c.s === 'cur' ? 'rgba(91,91,247,.10)' : 'var(--err-bg)',
            color: c.s === 'ok' ? 'var(--ok)' : c.s === 'cur' ? 'var(--indigo)' : 'var(--err)',
            display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />{c.l}
          </div>
        ))}
      </div>

      {/* chat messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
            {msg.role === 'assistant' && (
              <div className="avatar avatar--slate" style={{ width: 24, height: 24, fontSize: 10, flexShrink: 0 }}>K</div>
            )}
            <div style={{ 
              background: msg.role === 'user' ? 'var(--ink)' : '#fff', 
              color: msg.role === 'user' ? '#fff' : 'var(--ink)',
              border: msg.role === 'user' ? 'none' : '1px solid var(--line)', 
              padding: '10px 14px', 
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', 
              fontSize: 13.5, 
              maxWidth: '80%', 
              boxShadow: msg.role === 'user' ? 'none' : 'var(--sh-1)' 
            }}>
              <MessageText content={msg.content} />
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div className="avatar avatar--slate" style={{ width: 24, height: 24, fontSize: 10 }}>K</div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', fontSize: 13.5, boxShadow: 'var(--sh-1)' }}>
              Kiko sedang mengetik…
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* mastery banner */}
      {masteryProgress === 100 && (
        <div style={{ margin: '8px 16px', padding: '12px', borderRadius: 16, background: 'var(--ok-bg)', border: '1px solid var(--ok)', color: 'var(--ok)', textAlign: 'center', fontWeight: 600, fontSize: 13.5 }}>
          🎉 Kiko paham! Penguasaan materi berhasil direkonsiliasi. Kembali ke Peta Konsep...
        </div>
      )}

      {/* quick replies */}
      <div style={{ padding: '4px 16px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['Kita harus menyamakan penyebutnya dahulu', 'Nilai 1/(x-2) adalah bentuk pecahan tunggal', 'Gunakan perkalian silang'].map(s => (
          <button onClick={() => setInputText(s)} key={s} style={{ padding: '8px 12px', borderRadius: 999, fontSize: 12, background: '#fff', border: '1px solid var(--line)', whiteSpace: 'nowrap', color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 5 }}>
            {I.spark({ size: 11, stroke: 'var(--indigo)' })} {s}
          </button>
        ))}
      </div>

      {/* composer */}
      <div style={{ padding: '8px 14px 14px', borderTop: '1px solid var(--line)', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Jelaskan konsep pecahan aljabar pada Kiko..."
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              background: 'var(--bg-2)', 
              borderRadius: 22, 
              fontSize: 13.5, 
              border: '1px solid var(--line)',
              outline: 'none'
            }}
          />
          <button 
            onClick={handleSend}
            style={{ width: 42, height: 42, borderRadius: 14, background: 'var(--grad)', color: '#fff', border: 0, display: 'grid', placeItems: 'center', flexShrink: 0, boxShadow: '0 6px 16px -4px rgba(91,91,247,.5)', cursor: 'pointer' }}
          >
            {I.send({ size: 16, stroke: '#fff' })}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TeachMePage() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Memuat Sesi...</div>}>
      <TeachMePageContent />
    </Suspense>
  );
}
