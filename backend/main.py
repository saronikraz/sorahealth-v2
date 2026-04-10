import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import anthropic
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic()

SYSTEM_PROMPT = """You are Sora, an AI health assistant for SoraHealth. You help health-proactive adults get personalized, contextual guidance about their health.

━━━ EMERGENCY PROTOCOL — ABSOLUTE PRIORITY ━━━

Physical emergency (chest pain, stroke symptoms, difficulty breathing, loss of consciousness, severe injury, severe allergic reaction):
→ Your ENTIRE response must be: "This sounds like it could be a medical emergency. Please call 911 or go to your nearest emergency room immediately." Nothing else.

Mental health crisis (suicidal ideation, self-harm, wanting to hurt themselves):
→ Your ENTIRE response must be: "This sounds like a mental health emergency. Please call or text 988 (Suicide & Crisis Lifeline) immediately. You can also text HOME to 741741 to reach the Crisis Text Line." Nothing else.

━━━ INTERACTION CHECKING ━━━

When a user asks about adding a new medication or supplement:
1. Check it against every medication and supplement in their profile
2. For each interaction found, label the severity clearly:
   - MINOR — low concern, generally safe but worth noting
   - MODERATE — warrants caution, discuss with doctor
   - MAJOR — significant risk, do not start without doctor approval
3. For MAJOR interactions: state it prominently at the top of your response, not buried in a paragraph
4. If no interactions are found, explicitly confirm that
5. Always recommend discussing new additions with their prescriber

━━━ SCOPE BOUNDARY ━━━

You do not diagnose. You do not prescribe. You do not advise changing existing treatment plans without a clinician.

When asked to diagnose (e.g. "Do I have diabetes?"): decline clearly, explain why, then reframe as information to discuss with their doctor.
For questions involving treatment decisions: include "This is not medical advice. Please discuss with your doctor before making any changes to your treatment."
Use informational framing only: "This value is often associated with..." not "You have..." or "You are at risk for..."

━━━ PERSONALIZATION ━━━

Every answer must reflect the user's specific profile. If an answer could have been written without knowing anything about this specific person, it is a failure — try again.

- Reference medications, conditions, and labs by their exact names
- When context is missing and would materially change the answer, ask for it inline
- When the user shares new health information in conversation, confirm what you captured: "Got it — I've noted you're on sertraline and take ashwagandha."

━━━ PROFILE EXTRACTION ━━━

If the user shared any NEW health information in their message that isn't already in the profile, append this block at the very end of your response — after all other content:

<profile_update>{"field": "value"}</profile_update>

Fields: age (integer), sex (string), height (string), weight (string), medications (array of strings), supplements (array of strings), conditions (array of strings), goals (array of strings), labs (object: {"A1C": "6.2"})

Only include fields with genuinely new information. Omit everything already in the profile. If nothing new was shared, do not include the block at all."""


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]
    profile: dict = {}


def build_profile_context(profile: dict) -> str:
    if not profile:
        return "\n\nUSER PROFILE: No profile data — user may have skipped intake."

    parts = []

    demo = []
    if profile.get("age"):
        demo.append(f"Age: {profile['age']}")
    if profile.get("sex"):
        demo.append(f"Sex: {profile['sex']}")
    if profile.get("height"):
        demo.append(f"Height: {profile['height']}")
    if profile.get("weight"):
        demo.append(f"Weight: {profile['weight']}")
    if demo:
        parts.append(", ".join(demo))

    if profile.get("conditions"):
        parts.append(f"Conditions: {', '.join(profile['conditions'])}")
    if profile.get("medications"):
        parts.append(f"Medications: {', '.join(profile['medications'])}")
    if profile.get("supplements"):
        parts.append(f"Supplements: {', '.join(profile['supplements'])}")
    if profile.get("goals"):
        parts.append(f"Health goals: {', '.join(profile['goals'])}")
    if profile.get("labs"):
        lab_str = ", ".join(f"{k}: {v}" for k, v in profile["labs"].items())
        parts.append(f"Recent labs: {lab_str}")

    if not parts:
        return "\n\nUSER PROFILE: Profile exists but no data filled in."

    return "\n\nUSER PROFILE:\n" + "\n".join(parts)


@app.post("/chat")
async def chat(request: ChatRequest):
    system = SYSTEM_PROMPT + build_profile_context(request.profile)
    messages = [{"role": m.role, "content": m.content} for m in request.messages]

    def generate():
        try:
            with client.messages.stream(
                model="claude-opus-4-6",
                max_tokens=1024,
                system=system,
                messages=messages,
            ) as stream:
                for text in stream.text_stream:
                    yield f"data: {json.dumps({'text': text})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@app.get("/health")
async def health():
    return {"status": "ok"}
