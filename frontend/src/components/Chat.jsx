import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.DEV ? 'http://localhost:8000' : ''

const EXAMPLES = [
  "Why isn't my LDL going down if I'm on a statin?",
  "Am I a good candidate for GLP-1 medications?",
  "Do any of my supplements interact with my medications?",
]

function GlowRing() {
  return (
    <svg className="glow-ring" width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <filter id="mint-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 48,6 A 42,42 0 1,1 6,48"
        fill="none"
        stroke="#5EFFA0"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#mint-glow)"
      />
    </svg>
  )
}

function ProfilePanel({ profile, onReset, onClose }) {
  const rows = [
    profile.age && `Age: ${profile.age}`,
    profile.sex && `Sex: ${profile.sex}`,
    profile.height && `Height: ${profile.height}`,
    profile.weight && `Weight: ${profile.weight}`,
    ...(profile.conditions?.map(c => `🩺 ${c}`) || []),
    ...(profile.medications?.map(m => `💊 ${m}`) || []),
    ...(profile.supplements?.map(s => `🌿 ${s}`) || []),
    ...(profile.goals?.map(g => `🎯 ${g}`) || []),
    ...Object.entries(profile.labs || {}).map(([k, v]) => `🧪 ${k}: ${v}`),
  ].filter(Boolean)

  return (
    <div className="profile-panel">
      <div className="profile-panel-header">
        <span className="panel-title">Your profile</span>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>
      {rows.length > 0 ? (
        <div className="profile-tags">
          {rows.map((r, i) => <span key={i} className="tag">{r}</span>)}
        </div>
      ) : (
        <p className="panel-empty">No profile data yet.</p>
      )}
      <button className="btn-danger" onClick={onReset}>Reset &amp; restart intake</button>
    </div>
  )
}

export default function Chat({ profile, onUpdateProfile, onReset }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const aiCount = useRef(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const ta = inputRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }, [input])

  const hasProfile = Object.values(profile).some(v =>
    Array.isArray(v) ? v.length > 0 : !!v
  )

  const send = async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')
    setLoading(true)

    const userMsg = { role: 'user', content }
    const history = [...messages, userMsg]
    const isFirst = aiCount.current === 0
    const idx = history.length
    aiCount.current++

    setMessages([...history, { role: 'assistant', content: '', streaming: true, isFirst }])

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
          profile,
        }),
      })
      if (!res.ok) throw new Error(`${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buf = ''
      let full = ''
      let display = ''
      let hidingTag = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            if (parsed.error) throw new Error(parsed.error)
            const chunk = parsed.text || ''
            if (!chunk) continue
            full += chunk
            if (!hidingTag) {
              const ti = full.indexOf('<profile_update>')
              if (ti !== -1) { hidingTag = true; display = full.slice(0, ti).trimEnd() }
              else display = full
            }
            setMessages(prev => {
              const next = [...prev]
              next[idx] = { ...next[idx], content: display }
              return next
            })
          } catch {}
        }
      }

      const match = full.match(/<profile_update>([\s\S]*?)<\/profile_update>/)
      if (match) {
        try { onUpdateProfile(JSON.parse(match[1].trim())) } catch {}
      }

      const final = full.replace(/<profile_update>[\s\S]*?<\/profile_update>/g, '').trimEnd()
      const isEmergency = final.startsWith('This sounds like it could be') ||
                          final.startsWith('This sounds like a mental health')

      setMessages(prev => {
        const next = [...prev]
        next[idx] = { role: 'assistant', content: final, streaming: false, isFirst, isEmergency }
        return next
      })
    } catch {
      setMessages(prev => {
        const next = [...prev]
        next[idx] = {
          role: 'assistant',
          content: "Couldn't reach the server. Please try again.",
          streaming: false,
          isFirst,
          isError: true,
        }
        return next
      })
    }

    setLoading(false)
    inputRef.current?.focus()
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="chat">

      {/* Header */}
      <header className="chat-header">
        <div className="chat-brand">
          <span className="brand-mark">◈</span>
          <span className="brand-name">SoraHealth</span>
          <span className="sora-tag">Sora</span>
        </div>
        <button
          className={`profile-toggle${hasProfile ? ' has-data' : ''}`}
          onClick={() => setShowProfile(p => !p)}
        >
          {hasProfile && <span className="active-dot" />}
          Profile
        </button>
      </header>

      {/* Profile panel */}
      {showProfile && (
        <ProfilePanel
          profile={profile}
          onReset={() => { setShowProfile(false); onReset() }}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Messages */}
      <main className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome">
            <div className="glow-ring-wrap">
              <GlowRing />
              <span className="ring-initial">S</span>
            </div>
            <h2 className="welcome-title">
              {hasProfile ? 'Your profile is ready.' : 'Ask Sora anything.'}
            </h2>
            <p className="welcome-sub">
              {hasProfile
                ? 'Sora knows your medications, conditions, and goals. Ask anything — answers are tailored to you.'
                : 'Ask a health question and Sora will answer it in plain language. No account needed.'}
            </p>
            <div className="examples">
              {EXAMPLES.map(q => (
                <button key={q} className="example-btn" onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`msg-row ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div className="avatar">S</div>
            )}
            <div className="msg-body">
              {msg.isFirst && (
                <p className="disclaimer-inline">
                  Sora is an AI, not a doctor. This is not medical advice.
                </p>
              )}
              <div className={`bubble ${msg.role}${msg.isEmergency ? ' emergency' : ''}${msg.isError ? ' error' : ''}`}>
                {msg.streaming && !msg.content
                  ? <span className="typing"><span /><span /><span /></span>
                  : msg.content
                }
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="avatar user-avatar">You</div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="chat-input-area">
        <div className="input-row">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask Sora about your health…"
            rows={1}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={() => send()}
            disabled={!input.trim() || loading}
          >
            {loading
              ? <span className="send-dots"><span /><span /><span /></span>
              : '↑'
            }
          </button>
        </div>
        <p className="input-note">Not a substitute for professional medical advice.</p>
      </footer>

    </div>
  )
}
