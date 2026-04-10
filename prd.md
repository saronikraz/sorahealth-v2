# SoraHealth — PRD
_Generated April 9, 2026_

---



# SoraHealth

## 1. Problem Statement

Health-proactive adults aged 30–70 have real, specific health questions every day. About their labs. About drug interactions. About whether that supplement is doing anything. About GLP-1s. About longevity protocols they heard on a podcast.

They can't get answers from their PCP. The average visit is 12 minutes. No time to explain. No time for follow-up. No way to reach them between appointments.

So they turn to Google and ChatGPT. They get walls of disclaimers, generic answers, and zero personalization. ChatGPT doesn't know they're on metformin. It doesn't know their A1C was 6.2 last month. It doesn't know they're also taking magnesium and considering Ozempic.

**The result:** Millions of people making important health decisions — what to take, what to stop, what to ask their doctor — with no personalized, contextual guidance.

**Why now:**
- GLP-1s, supplements, and longevity protocols are exploding in consumer interest. Demand for guidance far outpaces what PCPs can supply.
- ChatGPT normalized AI for personal questions. Consumer trust in AI-generated health info is at an inflection point.
- FHIR interoperability standards make it technically feasible to pull real medical records into a consumer product.
- The self-pay health market is growing fast. People already pay for quality guidance when insurance-based care fails them.

---

## 2. Goals

1. **Achieve 60% user activation rate** (defined as completing intake + asking ≥3 substantive health questions) within the first 10 minutes of first session — within 6 months of launch.
2. **Reach 50% 90-day retention** among activated users within 9 months of launch.
3. **Drive daily active usage to 30%+ of retained users** (DAU/MAU ratio ≥ 0.30) within 9 months of launch.
4. **Achieve an NPS of 50+** among users who have completed at least 2 weeks of use — measured at 6 months post-launch.
5. **Generate 10,000 paying subscribers** within the first 12 months of public launch. [NEEDS INPUT — what is the target price point and subscription model?]

---

## 3. Non-Goals

- **Not a replacement for a doctor or clinician.** Sora does not diagnose, prescribe, or treat. It provides personalized health information and guidance. Every session must make this boundary clear.
- **Not a telehealth platform.** We facilitate escalation to clinicians and can schedule follow-up virtual calls, but we do not build or operate the video/telehealth infrastructure ourselves in v1. We integrate with an existing partner. [NEEDS INPUT — which telehealth partner?]
- **Not an emergency service.** Sora will not handle acute emergencies. If a user describes symptoms consistent with a medical emergency, Sora directs them to call 911 or go to the ER immediately.
- **Not a pharmacy or fulfillment service.** We do not sell, ship, or fulfill prescriptions or supplements.
- **Not an insurance product.** We may help users understand their Explanation of Benefits (EOB), but we do not act as an insurance broker, claims processor, or benefits administrator.
- **Not building our own EHR.** We pull data from existing records via FHIR. We store a user health profile, but we are not a system of record for clinical data.
- **Not targeting pediatric users or complex specialty care** (oncology treatment plans, surgical planning, etc.) in v1.

---

## 4. Users & Use Cases

### Primary User
Adults aged 30–60 who are proactive about their health. They track things. They read about supplements and longevity. They have a PCP but feel underserved. They are willing to self-pay for quality health guidance.

### Scenario 1: The Lab Results Decoder

Maria is 52. She just got her annual blood work back through her patient portal. Her total cholesterol is 218, her LDL is 142, and her Vitamin D is 22. Her doctor's note says "results reviewed, no action needed." Maria doesn't agree — she's been taking a statin for two years and her LDL hasn't moved. She also started taking Vitamin D3 supplements six months ago and wants to know why her levels are still low. She opens SoraHealth, which already has her medication list and her last three years of lab results pulled from her health records. She asks: "Why isn't my LDL going down if I'm on atorvastatin?" Sora walks her through potential reasons — adherence, dosage, dietary factors, genetic lipid processing — personalized to her specific numbers, her specific medication and dose, and her history. She then asks about her Vitamin D. Sora notes she's on 1,000 IU daily, flags that her level of 22 is still insufficient, and suggests she discuss increasing to 4,000–5,000 IU with her doctor, citing that her current dose is likely too low for her baseline. Maria screenshots the summary and brings it to her next appointment.

### Scenario 2: The GLP-1 Curious

David is 44. His BMI is 31. He's been hearing about Ozempic and Mounjaro everywhere — podcasts, friends, Twitter. He's curious but has no idea if he's a candidate, what the side effects are, how it interacts with the metformin he already takes for pre-diabetes, or what it would cost him. His next PCP appointment is 6 weeks out. He opens SoraHealth. Sora already knows he's on metformin 500mg twice daily, that his A1C was 6.2 last quarter, and that his BMI is 31. David asks: "Am I a good candidate for Ozempic?" Sora explains the general eligibility criteria, maps them against David's profile, flags that his A1C and BMI put him in a range where GLP-1s are commonly prescribed, notes that metformin and semaglutide are frequently used together, and outlines the common side effects. Sora then generates a list of specific questions David should ask his doctor and offers to schedule a virtual consultation with a clinician through the app if he doesn't want to wait 6 weeks.

### Scenario 3: The Supplement Stack Auditor

Priya is 38. She takes 9 supplements daily — a regimen she assembled from podcasts, Reddit, and a naturopath visit two years ago. Magnesium glycinate, Vitamin D3, Omega-3, Ashwagandha, NAC, Berberine, CoQ10, Zinc, and a B-complex. She recently started taking a low-dose SSRI (sertraline) for anxiety and is wondering if any of her supplements interact with it. She also wants to know if she's wasting money on any of them. She opens SoraHealth and asks: "Do any of my supplements interact with sertraline?" Sora flags that Ashwagandha may have serotonergic properties and could theoretically increase serotonin syndrome risk in combination with an SSRI — and recommends she discuss this with her prescriber. It also notes that her NAC and Berberine may affect liver metabolism in ways relevant to SSRI processing. Priya then asks: "Which of these supplements actually have evidence behind them?" Sora gives her a tier-ranked breakdown — strong evidence, moderate evidence, weak/no evidence — personalized to her stated goals (energy, mood, longevity). She drops two supplements and feels more confident about the rest.

---

## 5. User Stories

### Must-have

- As a new user, I want to complete a guided health intake (conditions, medications, supplements, goals) so that Sora has enough context to give me personalized answers from the start.
- As a user, I want to connect my health records via my patient portal so that Sora can access my labs, medications, diagnoses, and visit history without me manually entering everything.
- As a user, I want to ask Sora free-form health questions in natural language so that I get specific, personalized answers based on my health profile — not generic information.
- As a user, I want Sora to know my full medication and supplement list so that it can flag interactions and provide context-aware answers about anything I'm taking or considering.
- As a user, I want Sora to explain my lab results in plain language, referencing my specific values and trends over time, so that I understand what's happening in my body without needing a medical degree.
- As a user, I want Sora to clearly tell me when something is beyond its scope and recommend I speak with a clinician so that I don't mistake AI guidance for a medical diagnosis or prescription.
- As a user, I want Sora to detect emergency-level symptom descriptions and immediately direct me to call 911 or go to the ER so that I'm not delayed in a life-threatening situation.

### Should-have

- As a user, I want Sora to identify patterns across my medical history and surface proactive health insights (e.g., "Your fasting glucose has been trending upward over 3 years") so that I can take action before problems become serious.
- As a user, I want to connect my wearable devices (Apple Watch, Oura, Whoop, Fitbit) so that Sora can incorporate sleep, heart rate, HRV, and activity data into its guidance.
- As a user, I want Sora to escalate my case to a real clinician and schedule a virtual follow-up call when needed so that I have a clear path from AI guidance to human care.
- As a user, I want to receive a shareable summary of a conversation with Sora (formatted for my doctor) so that I can bring informed, specific questions to my next appointment.
- As a user, I want Sora to help me understand my Explanation of Benefits (EOB) documents so that I know what I owe, what was covered, and whether anything looks wrong.

### Nice-to-have

- As a user, I want to set health goals (e.g., "lower my A1C to 5.8," "improve sleep quality") and have Sora track my progress and nudge me so that I stay on track between doctor visits.
- As a user, I want Sora to proactively suggest questions I should ask at my next doctor's appointment based on my profile and recent conversations so that I maximize my 12-minute visit.
- As a user, I want a daily or weekly health briefing from Sora summarizing what's relevant to me (upcoming labs, medication reminders, new research relevant to my conditions) so that I stay engaged without having to initiate every interaction.
- As a user, I want to share my SoraHealth profile with a family member or caregiver so that someone I trust can also ask Sora questions on my behalf. [ASSUMPTION — demand for caregiver access exists in target segment]

---

## 6. Acceptance Criteria

### Story: Complete guided health intake

**Given** a new user opens the app for the first time,
**When** they begin the intake flow,
**Then** they are prompted to provide: current medications (name, dose, frequency), current supplements, known medical conditions, allergies, health goals, and basic demographics (age, sex, weight, height).

**Given** a user is in the intake flow,
**When** they skip a section,
**Then** Sora notes the gap, allows them to continue, and reminds them later that completing the section will improve personalization.

**Given** a user completes the intake,
**When** they finish the last step,
**Then** Sora confirms the profile, displays a summary for the user to review and edit, and immediately becomes available for personalized Q&A.

**Given** a user completes intake in under 10 minutes and asks at least 3 questions,
**Then** this session is counted as an "activated" user for metrics purposes.

---

### Story: Connect health records via patient portal

**Given** a user wants to connect their health records,
**When** they navigate to the "Connect Records" section,
**Then** they are presented with a list of supported health systems and patient portals (via FHIR-compatible integrations).

**Given** a user selects their health system and authenticates,
**When** the connection is successful,
**Then** Sora ingests available data (labs, medications, diagnoses, visit summaries) and updates the user's health profile within 60 seconds.

**Given** the connection fails or the health system is not supported,
**When** the user attempts to connect,
**Then** Sora displays a clear error message, offers manual entry as a fallback, and logs the unsupported system for the product team.

---

### Story: Ask free-form health questions with personalized answers

**Given** a user with a completed health profile asks a question (e.g., "Is it safe for me to take ibuprofen?"),
**When** Sora generates a response,
**Then** the response references the user's specific medications, conditions, and relevant history — not a generic answer.

**Given** a user asks a question that requires context Sora does not have,
**When** Sora generates a response,
**Then** Sora states what information is missing, asks the user to provide it, and does not guess or fabricate context.

**Given** a user asks a question,
**When** Sora responds,
**Then** the response is delivered in plain language at an 8th-grade reading level or below, with medical terms defined inline when used.

---

### Story: Medication and supplement interaction awareness

**Given** a user has a medication and supplement list in their profile,
**When** they ask about adding a new medication or supplement,
**Then** Sora checks for known interactions with everything currently in their profile and flags any concerns with severity level (minor, moderate, major).

**Given** a user's profile contains a combination flagged as a major interaction,
**When** the user views their medication/supplement list or asks a related question,
**Then** Sora proactively surfaces the interaction warning without the user needing to ask.

---

### Story: Explain lab results in plain language with trends

**Given** a user has connected health records with lab data,
**When** they ask "What do my labs mean?" or open the labs section,
**Then** Sora displays each result with: the value, the reference range, whether it's normal/high/low, a plain-language explanation of what it means, and the trend vs. prior results if available.

**Given** a lab value has changed significantly from the previous result,
**When** Sora displays the lab,
**Then** it highlights the change and provides context (e.g., "Your LDL went from 128 to 142 over 6 months — this is a 10.9% increase").

---

### Story: Scope boundary and clinician escalation recommendation

**Given** a user asks a question that involves diagnosis, prescription, or treatment decisions,
**When** Sora generates a response,
**Then** Sora provides relevant information but explicitly states: "This is not a diagnosis. Please discuss with your doctor before making changes to your treatment."

**Given** a user describes symptoms or a situation that Sora's model classifies as requiring clinical review,
**When** Sora generates a response,
**Then** Sora recommends speaking with a clinician and offers to initiate the escalation/scheduling flow.

---

### Story: Emergency detection and redirect

**Given** a user describes symptoms consistent with a medical emergency (e.g., chest pain, difficulty breathing, stroke symptoms, suicidal ideation),
**When** Sora processes the message,
**Then** Sora immediately displays a prominent emergency alert: "This sounds like it could be a medical emergency. Please call 911 or go to your nearest emergency room immediately." This message overrides the normal response flow.

**Given** an emergency is detected,
**When** the alert is displayed,
**Then** Sora does not provide any other health guidance in that response — only the emergency redirect and relevant crisis resources (e.g., 988 Suicide & Crisis Lifeline if applicable).

---

## 7. Risks & Assumptions

| Risks | Assumptions |
|---|---|
| **Medical liability.** Even with disclaimers, personalized health guidance from an AI could expose SoraHealth to liability if a user acts on incorrect or incomplete information and is harmed. Legal structure and disclaimers must be airtight. | Users understand and accept that Sora is not a doctor and does not replace clinical care. Disclaimers and UX friction are sufficient to establish this boundary. [ASSUMPTION] |
| **AI hallucination / incorrect medical information.** LLMs can generate confident, plausible-sounding but wrong answers — especially dangerous in health contexts (e.g., missing a critical drug interaction). | Our RAG pipeline and medical knowledge base, combined with guardrails and citation requirements, will reduce hallucination to an acceptable rate. [ASSUMPTION — needs testing and benchmarking] |
| **FHIR integration fragmentation.** While FHIR is a standard, real-world implementations vary wildly across health systems. Some portals may not expose the data we need, or may have slow/unreliable APIs. | At least 60% of our target users' health systems support FHIR data access in a way that provides labs, medications, and diagnoses. [ASSUMPTION] |
| **Regulatory risk.** FDA could classify SoraHealth as a medical device or clinical decision support tool,

---

## 8. Design System

### Philosophy
Dark luxury wellness. The aesthetic draws from Oura Ring and high-end health dashboards — calm, premium, and data-forward. Every surface should feel like it belongs in a product people trust with their body.

---

### Color Palette

| Role | Token | Hex |
|---|---|---|
| Background | `--bg` | `#0B1A12` |
| Surface 1 | `--surface-1` | `#142A1C` |
| Surface 2 | `--surface-2` | `#1C3526` |
| Accent / Primary | `--accent` | `#5EFFA0` |
| Text Primary | `--text` | `#FFFFFF` |
| Text Muted | `--text-muted` | `#A8C4B0` |
| Semantic: Sleep / Calm | `--blue` | `#6B8FFF` |
| Semantic: Body / Alert | `--coral` | `#E8845A` |

**Rules:**
- `#5EFFA0` (mint green) is used exclusively for glows, highlights, and active states — not for large fills
- No gradients except a single mint glow arc where a score or ring is displayed
- Borders use `1px solid` at low opacity (e.g. `rgba(255,255,255,0.08)`)

---

### Typography

- **Primary font:** System sans-serif stack (`-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`)
- **Labels:** Uppercase, letter-spacing `0.08em`, font-weight `600`, size `11–12px`, color `--text-muted`
- **Body:** `15px`, line-height `1.65`, color `--text`
- **Headings:** font-weight `700`, letter-spacing `-0.3px`
- **Clean and spaced** — generous padding, no cramped layouts

---

### Cards & Surfaces

- `border-radius: 16px` on all cards
- `1px` border at low opacity (`rgba(255,255,255,0.08)`)
- Layered depth: background → Surface 1 → Surface 2 for nested elements
- No drop shadows — depth is achieved through layered background colors only

---

### Glow Effect

Used once per screen maximum — on a score ring, progress arc, or primary metric:

```css
box-shadow: 0 0 24px rgba(94, 255, 160, 0.35);
```

Not applied to buttons, text, or decorative elements.

---

### Interactive States

| State | Treatment |
|---|---|
| Active / Selected | Mint green (`#5EFFA0`) border or text |
| Hover | Subtle surface lift — `--surface-2` background |
| Disabled | `opacity: 0.4` |
| Destructive / Warning | Coral (`#E8845A`) |
| Informational / Calm | Soft blue (`#6B8FFF`) |

---

### Component Rules

- **Buttons (primary):** Mint green text on `--surface-2` background, `border-radius: 99px`, uppercase label
- **Buttons (ghost):** `1px` mint green border, transparent background
- **Input fields:** `--surface-1` background, `1px` low-opacity border, mint green border on focus
- **Tags / Pills:** `--surface-2` background, `--text-muted` text, `border-radius: 99px`

---

## 9. Sprint 1 User Stories

_Scope: Prove the core activation loop — intake completed + 3 substantive questions asked. No FHIR, no wearables, no clinician escalation. Profile stored in localStorage._

---

**Story 1:** As a new user, I want to complete a guided health intake before I start chatting so that Sora has enough context to give me personalized answers from the first message.

**Acceptance Criteria:**
- Given a user opens SoraHealth for the first time, when the app loads, then they see the intake flow — not the chat screen
- Given a user is in the intake flow, when they complete all steps, then they see a summary screen showing everything Sora captured, with the option to edit before continuing
- Given a user skips a section during intake, when they proceed, then Sora allows it and saves what was provided — skipped sections don't block progress
- Given a user completes intake, when they reach the chat, then their profile is pre-loaded and Sora's first message acknowledges what it knows about them
- Given a returning user has already completed intake, when they open the app, then they land directly on the chat screen — intake is not shown again

**Priority:** Must-have
**Effort:** Large (1 week+)

---

**Story 2:** As a user completing intake, I want to move through focused steps for each profile section so that the process feels quick and manageable — not like filling out a medical form.

**Acceptance Criteria:**
- Given a user starts intake, when they progress through it, then the steps are: (1) basic demographics, (2) conditions, (3) medications, (4) supplements, (5) health goals — in that order
- Given a user is on any step, when they want to go back, then they can navigate to the previous step without losing their input
- Given a user is entering medications or supplements, when they type a name, then the field accepts free text (no lookup required for prototype)
- Given a user reaches the summary screen, when they review it, then they can tap any section to edit it inline before confirming

**Priority:** Must-have
**Effort:** Medium (2–3 days)

---

**Story 3:** As a user with a completed health profile, I want to ask Sora health questions in plain language so that I get specific answers based on my actual medications, conditions, and goals — not generic information.

**Acceptance Criteria:**
- Given a user with at least one medication and one condition in their profile asks a related question, when Sora responds, then the response references those specific items by name
- Given a user asks a question where their profile provides relevant context, when Sora responds, then the response does not contain only disclaimers — it must include at least one specific, actionable insight
- Given a user asks a question that requires context Sora does not have, when Sora responds, then Sora states what's missing and asks for it inline — it does not guess or fabricate
- Given a user has no profile data, when they ask a question, then Sora gives a helpful general answer and notes it can be more specific if the user completes intake

**Priority:** Must-have
**Effort:** Medium (2–3 days)

---

**Story 4:** As a user asking about a new medication or supplement, I want Sora to check it against everything I'm already taking so that I know about any interactions before I start.

**Acceptance Criteria:**
- Given a user has medications or supplements in their profile and asks about adding something new, when Sora responds, then it checks for known interactions and includes any findings in the response
- Given a known interaction exists, when Sora surfaces it, then the response labels the severity — minor, moderate, or major — and does not bury it in a paragraph
- Given a major interaction is identified, when Sora responds, then it explicitly recommends the user speak with their doctor before starting the new substance
- Given a user has no medications or supplements in their profile and asks about an interaction, when Sora responds, then it asks what they're currently taking before answering

**Priority:** Must-have
**Effort:** Small (< 1 day)

---

**Story 5:** As a user describing a potential emergency, I want Sora to immediately redirect me to emergency services so that I am never delayed in a life-threatening situation.

**Acceptance Criteria:**
- Given a user types language indicating a potential emergency (e.g. "chest pain," "stroke," "can't breathe," "I want to hurt myself"), when Sora processes the message, then the first and most prominent content in the response is: "This sounds like it could be a medical emergency. Please call 911 or go to your nearest emergency room immediately."
- Given an emergency response fires, when it displays, then no other health guidance appears in the same response — only the emergency redirect
- Given an emergency response fires and the user is describing a mental health crisis, when Sora responds, then it also includes the 988 Suicide & Crisis Lifeline
- Given a user describes something urgent but not an emergency (e.g. "my knee has been hurting for a week"), when Sora responds, then no emergency alert fires

**Priority:** Must-have
**Effort:** Small (< 1 day)

---

**Story 6:** As a user asking a clinical question, I want Sora to be clear about what it can and cannot do so that I never mistake AI guidance for a medical diagnosis.

**Acceptance Criteria:**
- Given a user asks Sora to diagnose them (e.g., "Do I have diabetes?"), when Sora responds, then it explicitly declines to diagnose, explains why, and reframes the response as information the user can discuss with their doctor
- Given a user asks a question involving prescriptions or treatment changes, when Sora responds, then it includes a clear statement: "This is not a diagnosis. Please discuss with your doctor before making changes to your treatment."
- Given any Sora response, when it displays, then it does not use diagnostic language ("You have X," "This means you are at risk for Y") — it uses informational framing ("This value is often associated with…," "Common causes include…")

**Priority:** Must-have
**Effort:** Small (< 1 day)

---

## Edge Cases to Discuss

- What happens if a user completes intake on mobile, then opens the app on desktop? Profile is in localStorage — it won't transfer. Is that acceptable for the prototype?
- If a user skips all intake sections and goes straight to chat, does Sora treat them the same as a no-profile user from the old flow? Or does it prompt them to go back and complete intake?
- What if a user types both an emergency phrase AND a normal question in the same message (e.g., "I have chest pain sometimes after running — is that normal?")? Does emergency detection fire?
- What does Sora do if the same medication is entered twice in the profile — once during intake and once added via chat? Duplicate handling needs a decision.
- On the intake summary screen, if a user edits and changes a medication name, does Sora re-check for interactions proactively or only when asked?

---

## Open Questions (Sprint 1)

1. Is intake mandatory or skippable in full? The PRD says sections are skippable — but can a user skip the entire intake and go straight to chat? If so, what's the cold-start experience?
2. For the prototype, where is the "activation" event tracked? localStorage flag? Or is this just a metric we observe manually for now?
3. Should the intake summary screen show a "You're activated" / completion state to give the user a sense of accomplishment before entering chat?