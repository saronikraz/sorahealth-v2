import { useState } from 'react'
import Landing from './components/Landing.jsx'
import Intake from './components/Intake.jsx'
import Chat from './components/Chat.jsx'

const PROFILE_KEY = 'sora-profile'
const ACTIVATED_KEY = 'sora-activated'

function mergeProfile(existing, update) {
  const merged = { ...existing }
  if (update.age != null) merged.age = update.age
  if (update.sex) merged.sex = update.sex
  if (update.height) merged.height = update.height
  if (update.weight) merged.weight = update.weight
  if (update.medications?.length)
    merged.medications = [...new Set([...(existing.medications || []), ...update.medications])]
  if (update.supplements?.length)
    merged.supplements = [...new Set([...(existing.supplements || []), ...update.supplements])]
  if (update.conditions?.length)
    merged.conditions = [...new Set([...(existing.conditions || []), ...update.conditions])]
  if (update.goals?.length)
    merged.goals = [...new Set([...(existing.goals || []), ...update.goals])]
  if (update.labs)
    merged.labs = { ...(existing.labs || {}), ...update.labs }
  return merged
}

export default function App() {
  const [view, setView] = useState(() =>
    localStorage.getItem(ACTIVATED_KEY) === 'true' ? 'chat' : 'landing'
  )
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}') }
    catch { return {} }
  })

  const completeIntake = (profileData) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData))
    localStorage.setItem(ACTIVATED_KEY, 'true')
    setProfile(profileData)
    setView('chat')
  }

  const updateProfile = (update) => {
    setProfile(prev => {
      const merged = mergeProfile(prev, update)
      localStorage.setItem(PROFILE_KEY, JSON.stringify(merged))
      return merged
    })
  }

  const resetApp = () => {
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(ACTIVATED_KEY)
    setProfile({})
    setView('landing')
  }

  return (
    <div className="app">
      {view === 'landing' && <Landing onStart={() => setView('intake')} />}
      {view === 'intake' && <Intake onComplete={completeIntake} savedProfile={profile} />}
      {view === 'chat' && <Chat profile={profile} onUpdateProfile={updateProfile} onReset={resetApp} />}
    </div>
  )
}
