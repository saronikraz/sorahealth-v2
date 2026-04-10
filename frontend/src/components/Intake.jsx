import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  { label: 'About You',    subtitle: 'Basic info helps Sora personalize every answer.' },
  { label: 'Conditions',   subtitle: 'Any diagnosed conditions or chronic issues.' },
  { label: 'Medications',  subtitle: 'Prescription meds — include dose if you know it.' },
  { label: 'Supplements',  subtitle: 'Vitamins, minerals, herbs, anything you take regularly.' },
  { label: 'Goals',        subtitle: 'What do you want to get out of SoraHealth?' },
]

const GOAL_PRESETS = [
  'Longevity', 'Weight management', 'Reduce A1C', 'Improve sleep',
  'Heart health', 'Understand my labs', 'Mental wellness', 'Manage medications',
]

const SEX_OPTIONS = [
  { value: '',        label: 'Prefer not to say' },
  { value: 'male',    label: 'Male' },
  { value: 'female',  label: 'Female' },
  { value: 'other',   label: 'Other' },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

function TagInput({ items, onChange, placeholder }) {
  const [val, setVal] = useState('')

  const commit = () => {
    const trimmed = val.trim()
    if (trimmed && !items.includes(trimmed)) onChange([...items, trimmed])
    setVal('')
  }

  const remove = (item) => onChange(items.filter(i => i !== item))

  return (
    <div className="tag-field">
      <div className="tags">
        {items.map(item => (
          <span key={item} className="tag">
            {item}
            <button className="tag-remove" onClick={() => remove(item)}>×</button>
          </span>
        ))}
      </div>
      <input
        className="tag-input"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commit() } }}
        onBlur={commit}
        placeholder={items.length === 0 ? placeholder : 'Add another…'}
      />
    </div>
  )
}

export default function Intake({ onComplete, savedProfile }) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [fromSummary, setFromSummary] = useState(false)
  const [data, setData] = useState({
    age:         savedProfile?.age         || '',
    sex:         savedProfile?.sex         || '',
    height:      savedProfile?.height      || '',
    weight:      savedProfile?.weight      || '',
    conditions:  savedProfile?.conditions  || [],
    medications: savedProfile?.medications || [],
    supplements: savedProfile?.supplements || [],
    goals:       savedProfile?.goals       || [],
  })

  const SUMMARY_STEP = STEPS.length  // index 5

  const navigate = (delta) => {
    setDir(delta)
    setStep(s => s + delta)
  }

  const next = () => {
    if (fromSummary) {
      setDir(1)
      setFromSummary(false)
      setStep(SUMMARY_STEP)
    } else {
      navigate(1)
    }
  }

  const back = () => {
    if (fromSummary) {
      setDir(-1)
      setFromSummary(false)
      setStep(SUMMARY_STEP)
    } else {
      navigate(-1)
    }
  }

  const editSection = (stepIndex) => {
    setDir(1)
    setFromSummary(true)
    setStep(stepIndex)
  }

  const set = (key, val) => setData(d => ({ ...d, [key]: val }))

  const toggleGoal = (goal) => {
    setData(d => ({
      ...d,
      goals: d.goals.includes(goal)
        ? d.goals.filter(g => g !== goal)
        : [...d.goals, goal],
    }))
  }

  const progress = step >= SUMMARY_STEP ? 1 : (step / STEPS.length)

  const renderStepContent = () => {
    if (step === SUMMARY_STEP) return renderSummary()

    switch (step) {
      case 0: return (
        <div className="step-fields">
          <div className="field-row">
            <div className="field">
              <label className="field-label">Age</label>
              <input
                type="number"
                className="field-input"
                value={data.age}
                onChange={e => set('age', e.target.value)}
                placeholder="42"
                min="1" max="120"
              />
            </div>
            <div className="field">
              <label className="field-label">Biological sex</label>
              <select
                className="field-input"
                value={data.sex}
                onChange={e => set('sex', e.target.value)}
              >
                {SEX_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label className="field-label">Height</label>
              <input
                type="text"
                className="field-input"
                value={data.height}
                onChange={e => set('height', e.target.value)}
                placeholder="5'8&quot; or 172 cm"
              />
            </div>
            <div className="field">
              <label className="field-label">Weight</label>
              <input
                type="text"
                className="field-input"
                value={data.weight}
                onChange={e => set('weight', e.target.value)}
                placeholder="165 lbs or 75 kg"
              />
            </div>
          </div>
        </div>
      )

      case 1: return (
        <TagInput
          items={data.conditions}
          onChange={val => set('conditions', val)}
          placeholder="Type a condition and press Enter…"
        />
      )

      case 2: return (
        <TagInput
          items={data.medications}
          onChange={val => set('medications', val)}
          placeholder="e.g. Metformin 500mg, Lisinopril 10mg…"
        />
      )

      case 3: return (
        <TagInput
          items={data.supplements}
          onChange={val => set('supplements', val)}
          placeholder="e.g. Vitamin D3 2000IU, Magnesium…"
        />
      )

      case 4: return (
        <div className="goals-step">
          <div className="goal-grid">
            {GOAL_PRESETS.map(goal => (
              <button
                key={goal}
                className={`goal-chip${data.goals.includes(goal) ? ' active' : ''}`}
                onClick={() => toggleGoal(goal)}
              >
                {goal}
              </button>
            ))}
          </div>
          <TagInput
            items={data.goals.filter(g => !GOAL_PRESETS.includes(g))}
            onChange={custom =>
              setData(d => ({
                ...d,
                goals: [...d.goals.filter(g => GOAL_PRESETS.includes(g)), ...custom],
              }))
            }
            placeholder="Other goal…"
          />
        </div>
      )

      default: return null
    }
  }

  const renderSummary = () => {
    const sections = [
      {
        stepIndex: 0,
        label: 'About You',
        content: [
          data.age && `Age: ${data.age}`,
          data.sex && `Sex: ${data.sex}`,
          data.height && `Height: ${data.height}`,
          data.weight && `Weight: ${data.weight}`,
        ].filter(Boolean),
        empty: 'Not provided',
      },
      { stepIndex: 1, label: 'Conditions',   content: data.conditions,  empty: 'None added' },
      { stepIndex: 2, label: 'Medications',  content: data.medications, empty: 'None added' },
      { stepIndex: 3, label: 'Supplements',  content: data.supplements, empty: 'None added' },
      { stepIndex: 4, label: 'Goals',        content: data.goals,       empty: 'None selected' },
    ]

    return (
      <div className="summary">
        {sections.map(sec => (
          <div key={sec.label} className="summary-section">
            <div className="summary-section-header">
              <span className="summary-label">{sec.label}</span>
              <button className="edit-link" onClick={() => editSection(sec.stepIndex)}>Edit</button>
            </div>
            {sec.content.length > 0 ? (
              <div className="summary-tags">
                {sec.content.map((item, i) => (
                  <span key={i} className="tag">{item}</span>
                ))}
              </div>
            ) : (
              <span className="summary-empty">{sec.empty}</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  const isSummary = step === SUMMARY_STEP
  const isEditingFromSummary = fromSummary
  const nextLabel = isSummary ? null : (isEditingFromSummary ? 'Save' : (step === STEPS.length - 1 ? 'Review' : 'Next'))

  return (
    <div className="intake">
      <div className="intake-card">

        {/* Header */}
        <div className="intake-header">
          <div className="intake-brand">
            <span className="brand-mark">◈</span>
            <span className="brand-name">SoraHealth</span>
          </div>
          {!isSummary && (
            <span className="step-count">{step + 1} of {STEPS.length}</span>
          )}
        </div>

        {/* Context banner */}
        <div className="intake-context">
          <span className="intake-context-icon">🧬</span>
          <p className="intake-context-text">
            {isSummary
              ? 'Almost there. Review what you\'ve shared — Sora will use this to personalize every answer.'
              : 'To give you relevant, personalized answers, Sora needs to know a bit about you. All steps are optional and your data stays on your device.'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        {/* Step title */}
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={`title-${step}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="step-title-wrap"
          >
            {isSummary ? (
              <>
                <h2 className="step-title">Review your profile</h2>
                <p className="step-subtitle">Sora will use this to personalize every answer. You can always edit it later.</p>
              </>
            ) : (
              <>
                <h2 className="step-title">{STEPS[step].label}</h2>
                <p className="step-subtitle">{STEPS[step].subtitle}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step content */}
        <div className="step-content-wrap">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={`content-${step}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="step-content"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="intake-nav">
          {step > 0 && (
            <button className="btn-ghost" onClick={back}>
              {isEditingFromSummary ? 'Cancel' : 'Back'}
            </button>
          )}

          <div className="nav-right">
            {!isSummary && !isEditingFromSummary && (
              <button className="btn-skip" onClick={next}>Skip</button>
            )}
            {isSummary ? (
              <button className="btn-primary btn-large" onClick={() => onComplete(data)}>
                Start chatting with Sora →
              </button>
            ) : (
              <button className="btn-primary" onClick={next}>
                {nextLabel}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
