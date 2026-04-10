# SoraHealth v2

An AI-powered primary care and longevity platform. Helps users manage their health proactively — spanning primary care needs and long-term longevity outcomes.

## What it does

- Guided health intake (conditions, medications, supplements, goals)
- Personalized AI health chat powered by Claude
- Medication and supplement interaction checking
- Emergency detection and redirect
- Scope-aware responses (never diagnoses, always refers to a clinician)

## Stack

- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **AI:** Anthropic Claude API

## Running locally

### Prerequisites

- Node.js
- Python 3.9+
- An Anthropic API key

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:

```
ANTHROPIC_API_KEY=your-key-here
```

Then run:

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## Docs

See [prd.md](./prd.md) for the full product requirements document.
