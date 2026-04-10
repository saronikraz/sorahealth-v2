const EXAMPLES = [
  { icon: '💊', text: 'Do any of my supplements interact with my medications?' },
  { icon: '🧪', text: "Why isn't my LDL going down if I'm on a statin?" },
  { icon: '⚖️', text: 'Am I a good candidate for GLP-1 medications?' },
  { icon: '😴', text: 'What can I do to improve my sleep quality?' },
]

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <div className="landing-inner">

        <div className="landing-brand">
          <span className="brand-mark">◈</span>
          <span className="brand-name">SoraHealth</span>
        </div>

        <div className="landing-hero">
          <h1 className="landing-tagline">Your AI health companion<br />for a longer, healthier life.</h1>
          <p className="landing-desc">
            Sora answers your health questions using your personal context — your medications,
            conditions, labs, and goals — so you get answers that are actually relevant to you.
            Not generic advice. Your health, explained.
          </p>
        </div>

        <div className="landing-examples">
          <p className="landing-examples-label">People ask Sora things like</p>
          <div className="landing-example-list">
            {EXAMPLES.map(({ icon, text }) => (
              <div key={text} className="landing-example-card">
                <span className="landing-example-icon">{icon}</span>
                <span className="landing-example-text">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="landing-cta">
          <button className="btn-primary btn-large landing-start-btn" onClick={onStart}>
            Get started — it's free →
          </button>
          <p className="landing-cta-note">
            No account needed &nbsp;·&nbsp; Your data stays on your device &nbsp;·&nbsp; Not a substitute for medical care
          </p>
        </div>

      </div>
    </div>
  )
}
